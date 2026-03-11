import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/auth"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // For MVP demonstration, if admin@integrarecorp.com.br and password "CoderMaster2026", let's allow it 
    // OR create it if it doesn't exist in the database (seeding on the fly)
    
    let admin = await prisma.admin.findUnique({ where: { email } })

    if (!admin && email === "admin@integrarecorp.com.br" && password === "CoderMaster2026") {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash("CoderMaster2026", salt)
      admin = await prisma.admin.create({
        data: {
          email: "admin@integrarecorp.com.br",
          name: "Gestor Integrare",
          password: hashedPassword,
          role: "ADMIN"
        }
      })
    }

    if (!admin) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    const token = await signToken({ id: admin.id, email: admin.email, role: admin.role })
    
    const cookieStore = await cookies()
    cookieStore.set({
      name: "integrare-admin-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
  }
}
