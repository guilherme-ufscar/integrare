import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 })

  const { companyName, companyEmail, companyPhone, plan, userName, userEmail, userPassword } = await req.json()

  if (!companyName || !companyEmail || !plan || !userName || !userEmail || !userPassword) {
    return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 })
  }

  if (userPassword.length < 8) {
    return NextResponse.json({ error: "A senha deve ter pelo menos 8 caracteres." }, { status: 400 })
  }

  const slug = companyName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  // Garante slug único
  const existing = await prisma.company.findFirst({ where: { OR: [{ slug }, { email: companyEmail }] } })
  if (existing) {
    if (existing.email === companyEmail) {
      return NextResponse.json({ error: "Já existe uma empresa com este e-mail." }, { status: 409 })
    }
    return NextResponse.json({ error: "Já existe uma empresa com um slug similar. Tente um nome diferente." }, { status: 409 })
  }

  const existingUser = await prisma.companyUser.findUnique({ where: { email: userEmail } })
  if (existingUser) {
    return NextResponse.json({ error: "Já existe um usuário com este e-mail." }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10)

  const company = await prisma.company.create({
    data: {
      name: companyName,
      slug,
      email: companyEmail,
      phone: companyPhone || null,
      plan,
      status: "ACTIVE",
      users: {
        create: {
          name: userName,
          email: userEmail,
          password: hashedPassword,
          role: "MANAGER",
        },
      },
    },
  })

  return NextResponse.json({ success: true, company }, { status: 201 })
}
