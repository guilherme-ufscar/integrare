import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  try {
    const { id } = await params
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })
    
    if (!report) return NextResponse.json({ error: "Não encontrado" }, { status: 404 })

    const { hashKey, ...safeReport } = report
    return NextResponse.json({ success: true, report: safeReport })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const { status, severity } = body

    const updateData: any = {}
    if (status) updateData.status = status
    if (severity) updateData.severity = severity

    const updated = await prisma.report.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ success: true, report: updated })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
