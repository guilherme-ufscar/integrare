import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { status, brandLogo, brandPrimaryColor, brandSecondaryColor } = body

  const updateData: Record<string, any> = {}

  if (status !== undefined) {
    const VALID = ["ACTIVE", "SUSPENDED", "CANCELLED", "PENDING"]
    if (!VALID.includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 })
    }
    updateData.status = status
  }

  if (brandLogo !== undefined) updateData.brandLogo = brandLogo
  if (brandPrimaryColor) updateData.brandPrimaryColor = brandPrimaryColor
  if (brandSecondaryColor) updateData.brandSecondaryColor = brandSecondaryColor

  const company = await prisma.company.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json({ success: true, company })
}
