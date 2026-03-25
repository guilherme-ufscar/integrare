import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { stripe, PLAN_INFO, getPlanPrice } from "@/lib/stripe"
import { signClientToken } from "@/lib/auth"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .substring(0, 40)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, companyName, phone, email, password, employees, plan, paymentMethodId } = body

    if (!name || !companyName || !email || !password || !plan || !paymentMethodId) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Senha deve ter no mínimo 8 caracteres." }, { status: 400 })
    }

    const planInfo = PLAN_INFO[plan]
    if (!planInfo) {
      return NextResponse.json({ error: "Plano inválido." }, { status: 400 })
    }

    // Verificar se e-mail já existe
    const existingUser = await prisma.companyUser.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 })
    }

    // Gerar slug único
    let slug = generateSlug(companyName)
    const existing = await prisma.company.findUnique({ where: { slug } })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    // Criar customer no Stripe
    const customer = await stripe.customers.create({
      name: companyName,
      email,
      metadata: { companyName, contactName: name, phone: phone || "" },
    })

    // Calcular valor dinamicamente com base no plano e número de colaboradores
    const amount = getPlanPrice(plan, Number(employees) || 50)

    const price = await stripe.prices.create({
      currency: "brl",
      unit_amount: amount * 100, // em centavos
      recurring: { interval: "month" },
      product_data: { name: `${planInfo.label} — ${companyName}` },
    })

    // Criar assinatura com payment method
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      default_payment_method: paymentMethodId,
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    })

    const invoice = subscription.latest_invoice as any
    const paymentIntent = invoice?.payment_intent as any

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar Company e CompanyUser no banco
    const company = await prisma.company.create({
      data: {
        name: companyName,
        slug,
        email,
        phone: phone || null,
        plan: planInfo.dbPlan,
        status: "PENDING",
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        users: {
          create: {
            name,
            email,
            password: hashedPassword,
            role: "MANAGER",
          },
        },
      },
      include: { users: true },
    })

    const user = company.users[0]

    // Se pagamento confirmado (não requer 3D Secure), ativar empresa e autenticar
    if (subscription.status === "active" || paymentIntent?.status === "succeeded") {
      await prisma.company.update({
        where: { id: company.id },
        data: { status: "ACTIVE" },
      })

      const token = await signClientToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        companyId: company.id,
        companyName: company.name,
        companyStatus: "ACTIVE",
      })

      const cookieStore = await cookies()
      cookieStore.set({
        name: "integrare-client-token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    // Requer confirmação 3D Secure
    if (paymentIntent?.client_secret) {
      // Autenticar mesmo assim — o webhook irá ativar
      const token = await signClientToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        companyId: company.id,
        companyName: company.name,
        companyStatus: "PENDING",
      })

      const cookieStore = await cookies()
      cookieStore.set({
        name: "integrare-client-token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: "/",
      })

      return NextResponse.json({
        success: false,
        clientSecret: paymentIntent.client_secret,
      })
    }

    return NextResponse.json({ error: "Pagamento não pôde ser processado." }, { status: 402 })
  } catch (err: any) {
    console.error("[CHECKOUT_ERROR]", err)
    return NextResponse.json({ error: err.message || "Erro interno." }, { status: 500 })
  }
}
