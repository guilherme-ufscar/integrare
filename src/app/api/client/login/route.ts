import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { signClientToken } from "@/lib/auth"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha são obrigatórios." }, { status: 400 })
    }

    const user = await prisma.companyUser.findUnique({
      where: { email },
      include: { company: true },
    })

    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    if (user.company.status !== "ACTIVE") {
      return NextResponse.json({
        error: "Sua assinatura está suspensa ou pendente. Regularize para acessar o painel.",
      }, { status: 403 })
    }

    const token = await signClientToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      companyName: user.company.name,
      companyStatus: user.company.status,
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
  } catch (err: any) {
    console.error("[LOGIN ERROR]", err)
    return NextResponse.json({ error: "Erro interno no servidor.", detail: err?.message }, { status: 500 })
  }
}
