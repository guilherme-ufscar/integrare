import { NextResponse } from "next/server"
import { getSession, getClientSession } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(req: Request) {
  const adminSession = await getSession()
  const clientSession = await getClientSession()

  if (!adminSession && !clientSession) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 })
  }

  const ALLOWED = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"]
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Formato inválido. Use PNG, JPG, SVG ou WebP." }, { status: 400 })
  }

  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: "Arquivo muito grande. Máximo 2MB." }, { status: 400 })
  }

  const ext = file.name.split(".").pop()
  const fileName = `logo-${Date.now()}.${ext}`
  const uploadDir = join(process.cwd(), "public", "uploads", "logos")

  await mkdir(uploadDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  await writeFile(join(uploadDir, fileName), Buffer.from(bytes))

  return NextResponse.json({ url: `/uploads/logos/${fileName}` })
}
