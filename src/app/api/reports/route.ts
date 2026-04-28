import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { prisma } from "@/lib/db"

function generateProtocol() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let protocol = "INT-"
  for (let i = 0; i < 8; i++) {
    protocol += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return protocol
}

function generateAccessKey() {
  return crypto.randomBytes(6).toString("hex").toUpperCase()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { category, title, description, dateOccurred, location, companySlug } = body

    if (!category || !description) {
      return NextResponse.json({ error: "Categoria e descrição são obrigatórios." }, { status: 400 })
    }

    // Resolver companyId pelo slug, se informado
    let companyId: string | null = null
    if (companySlug) {
      const company = await prisma.company.findUnique({ where: { slug: companySlug } })
      if (!company) {
        return NextResponse.json({ error: "Canal não encontrado." }, { status: 404 })
      }
      companyId = company.id
    }

    const protocol = generateProtocol()
    const accessKey = generateAccessKey()
    const salt = await bcrypt.genSalt(10)
    const hashKey = await bcrypt.hash(accessKey, salt)

    const report = await prisma.report.create({
      data: {
        protocol,
        hashKey,
        category,
        title: title || null,
        description,
        dateOccurred: dateOccurred || null,
        location: location || null,
        status: "NOVO",
        severity: "NAO_CLASSIFICADO",
        companyId,
      },
    })

    return NextResponse.json(
      { success: true, protocol: report.protocol, accessKey },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao criar denúncia:", error)
    return NextResponse.json({ error: "Erro interno ao processar a denúncia." }, { status: 500 })
  }
}
