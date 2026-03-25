import { PrismaClient } from "@prisma/client"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export default async function CanalSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const company = await prisma.company.findUnique({ where: { slug } })

  if (!company) notFound()

  if (company.status !== "ACTIVE") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAF9] px-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-[#123C33] rounded-2xl">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-[#1E2421] mb-2">Canal temporariamente indisponível</h1>
          <p className="text-sm text-[#5F6B66]">
            O canal de denúncias de <strong>{company.name}</strong> está temporariamente fora do ar.
            Entre em contato com o RH ou compliance da sua empresa.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
      <header className="bg-white border-b border-[#D7E2DD]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1.5 bg-[#123C33] rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#123C33] block leading-tight">Integrare</span>
              <span className="text-xs text-[#5F6B66] leading-tight">Canal de Denúncias — {company.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5F6B66]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1F6B57]" />
            Ambiente Seguro e Anônimo
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-5 border-t border-[#D7E2DD] bg-white text-center text-xs text-[#5F6B66]">
        Canal operado por{" "}
        <Link href="/" className="text-[#123C33] hover:underline">Integrare Compliance</Link>{" "}
        em adequação à LGPD.
      </footer>
    </div>
  )
}
