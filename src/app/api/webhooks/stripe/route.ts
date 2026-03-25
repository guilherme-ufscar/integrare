import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Sem assinatura Stripe." }, { status: 400 })
  }

  let event: any
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error("[WEBHOOK] Assinatura inválida:", err.message)
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object
        const customerId = sub.customer as string
        const status = sub.status // active, past_due, canceled, etc.

        let companyStatus: string
        if (status === "active" || status === "trialing") {
          companyStatus = "ACTIVE"
        } else if (status === "past_due" || status === "incomplete") {
          companyStatus = "SUSPENDED"
        } else if (status === "canceled" || status === "incomplete_expired") {
          companyStatus = "CANCELLED"
        } else {
          break
        }

        await prisma.company.updateMany({
          where: { stripeCustomerId: customerId },
          data: { status: companyStatus },
        })
        break
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object
        const customerId = sub.customer as string
        await prisma.company.updateMany({
          where: { stripeCustomerId: customerId },
          data: { status: "CANCELLED" },
        })
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object
        const customerId = invoice.customer as string
        await prisma.company.updateMany({
          where: { stripeCustomerId: customerId },
          data: { status: "ACTIVE" },
        })
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        const customerId = invoice.customer as string
        // Bloquear acesso automaticamente
        await prisma.company.updateMany({
          where: { stripeCustomerId: customerId },
          data: { status: "SUSPENDED" },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error("[WEBHOOK_ERROR]", err)
    return NextResponse.json({ error: "Erro interno." }, { status: 500 })
  }
}

