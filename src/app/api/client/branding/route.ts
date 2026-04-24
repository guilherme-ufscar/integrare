import { NextResponse } from "next/server"
import { getClientSession } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PATCH(req: Request) {
  const session = await getClientSession() as any
  if (!session) return NextResponse.json({ error: "Não autenticado." }, { status: 401 })

  const { brandLogo, brandPrimaryColor, brandSecondaryColor } = await req.json()

  const company = await prisma.company.update({
    where: { id: session.companyId },
    data: {
      ...(brandLogo !== undefined && { brandLogo }),
      ...(brandPrimaryColor && { brandPrimaryColor }),
      ...(brandSecondaryColor && { brandSecondaryColor }),
    },
  })

  return NextResponse.json({ success: true, company })
}
