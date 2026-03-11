import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import crypto from "crypto"

const prisma = new PrismaClient()

function generateProtocol() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let protocol = "INT-"
  for (let i = 0; i < 8; i++) {
    protocol += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return protocol
}

function generateAccessKey() {
  return crypto.randomBytes(6).toString("hex").toUpperCase() // 12 chars
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { category, title, description, dateOccurred, location } = body

    if (!category || !description) {
      return NextResponse.json({ error: "Categoria e descrição são obrigatórios." }, { status: 400 })
    }

    const protocol = generateProtocol()
    const accessKey = generateAccessKey()
    
    // Hash the access key so the server doesn't know the raw key
    const salt = await bcrypt.genSalt(10)
    const hashKey = await bcrypt.hash(accessKey, salt)

    const report = await prisma.report.create({
      data: {
        protocol,
        hashKey,
        category,
        title,
        description,
        dateOccurred,
        location,
        status: "NOVO",
        severity: "NAO_CLASSIFICADO"
      }
    })

    return NextResponse.json({
      success: true,
      protocol: report.protocol,
      accessKey: accessKey // the plain key is returned ONCE to the user
    }, { status: 201 })

  } catch (error) {
    console.error("Erro ao criar denúncia:", error)
    return NextResponse.json({ error: "Erro interno ao processar a denúncia." }, { status: 500 })
  }
}
