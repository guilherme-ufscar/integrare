import { NextResponse } from "next/server"
import { getClientSession } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getClientSession() as any
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 })

  const { id } = await params
  const report = await prisma.report.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      attachments: true,
    },
  })

  if (!report) return NextResponse.json({ error: "Não encontrado." }, { status: 404 })

  // IDOR protection — verificar se o relato pertence à empresa do usuário
  if (report.companyId !== session.companyId) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 })
  }

  // Nunca expor hashKey
  const { hashKey, ...safeReport } = report as any
  return NextResponse.json({ success: true, report: safeReport })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getClientSession() as any
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const report = await prisma.report.findUnique({ where: { id } })
  if (!report) return NextResponse.json({ error: "Não encontrado." }, { status: 404 })
  if (report.companyId !== session.companyId) return NextResponse.json({ error: "Acesso negado." }, { status: 403 })

  const updates: any = {}
  const VALID_STATUSES = ["NOVO", "EM_TRIAGEM", "EM_ANALISE", "AGUARDANDO_INFO", "EM_APURACAO", "CONCLUIDO", "ARQUIVADO"]
  const VALID_SEVERITIES = ["NAO_CLASSIFICADO", "BAIXO", "MEDIO", "ALTO", "CRITICO"]

  if (body.status && VALID_STATUSES.includes(body.status)) updates.status = body.status
  if (body.severity && VALID_SEVERITIES.includes(body.severity)) updates.severity = body.severity

  const updated = await prisma.report.update({ where: { id }, data: updates })
  const { hashKey, ...safe } = updated as any
  return NextResponse.json({ success: true, report: safe })
}
