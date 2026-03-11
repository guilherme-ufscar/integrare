import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: "Conteúdo obrigatório" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        role: "ADMIN",
        reportId: id
      }
    })

    return NextResponse.json({ success: true, message }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 })
  }
}
