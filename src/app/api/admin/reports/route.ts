import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        protocol: true,
        category: true,
        status: true,
        severity: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ success: true, reports })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar denúncias" }, { status: 500 })
  }
}
