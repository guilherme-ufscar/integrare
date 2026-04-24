import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"

// Verify protocol + access key and return report with messages
export async function POST(req: Request, { params }: { params: Promise<{ protocol: string }> }) {
  try {
    const { protocol } = await params
    const body = await req.json()
    const { accessKey } = body

    if (!protocol || !accessKey) {
      return NextResponse.json({ error: "Protocolo e chave são obrigatórios." }, { status: 400 })
    }

    const report = await prisma.report.findUnique({
      where: { protocol },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!report) {
      return NextResponse.json({ error: "Relato não encontrado." }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(accessKey, report.hashKey)
    if (!isMatch) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 })
    }

    // Don't return the hash key to the client
    const { hashKey, ...safeReport } = report

    return NextResponse.json({ success: true, report: safeReport }, { status: 200 })

  } catch (error) {
    console.error("Erro ao buscar denúncia:", error)
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
  }
}

// Post a new message from the denunciante
export async function PUT(req: Request, { params }: { params: Promise<{ protocol: string }> }) {
  try {
    const { protocol } = await params
    const body = await req.json()
    const { accessKey, content } = body

    if (!protocol || !accessKey || !content) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 })
    }

    const report = await prisma.report.findUnique({ where: { protocol } })

    if (!report || !(await bcrypt.compare(accessKey, report.hashKey))) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        role: "DENUNCIANTE",
        reportId: report.id
      }
    })

    return NextResponse.json({ success: true, message }, { status: 201 })
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return NextResponse.json({ error: "Erro ao enviar mensagem." }, { status: 500 })
  }
}
