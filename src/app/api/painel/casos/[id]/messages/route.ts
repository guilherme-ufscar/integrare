import { NextResponse } from "next/server"
import { getClientSession } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getClientSession() as any
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 })

  const { id } = await params
  const { content } = await req.json()

  if (!content?.trim()) return NextResponse.json({ error: "Mensagem vazia." }, { status: 400 })

  const report = await prisma.report.findUnique({ where: { id } })
  if (!report) return NextResponse.json({ error: "Não encontrado." }, { status: 404 })
  if (report.companyId !== session.companyId) return NextResponse.json({ error: "Acesso negado." }, { status: 403 })

  const message = await prisma.message.create({
    data: { content: content.trim(), role: "ADMIN", reportId: id },
  })

  return NextResponse.json({ success: true, message })
}
