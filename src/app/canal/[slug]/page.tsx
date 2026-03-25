import { PrismaClient } from "@prisma/client"
import { ShieldAlert, Search } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export default async function CanalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const company = await prisma.company.findUnique({ where: { slug } })
  if (!company || company.status !== "ACTIVE") notFound()

  const primary = company.brandPrimaryColor || "#123C33"
  const secondary = company.brandSecondaryColor || "#EAF4F0"

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E2421] mb-4">Canal de Denúncias</h1>
        <p className="text-base text-[#5F6B66] max-w-2xl mx-auto">
          Canal oficial de denúncias de <strong>{company.name}</strong>. Ambiente seguro, confidencial
          e operado de forma independente pela Integrare Compliance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-[#D7E2DD] p-8 flex flex-col transition-colors" style={{ ["--hover-border" as any]: primary }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: secondary, color: primary }}>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1E2421] mb-2">Fazer um Relato</h2>
          <p className="text-sm text-[#5F6B66] mb-5 flex-1">
            Relate condutas antiéticas, assédio, fraudes, corrupção ou qualquer descumprimento de normas.
          </p>
          <ul className="text-sm text-[#5F6B66] space-y-2 mb-6 ml-4 list-disc" style={{ ["--tw-prose-bullets" as any]: primary }}>
            <li>Pode ser feito de forma 100% anônima</li>
            <li>Não rastreamos seu IP ou dispositivo</li>
            <li>Você receberá um protocolo único ao final</li>
          </ul>
          <Link
            href={`/canal/${slug}/nova-denuncia`}
            className="w-full py-3 text-white text-center font-semibold rounded-xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: primary }}
          >
            Iniciar Novo Relato
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#D7E2DD] p-8 flex flex-col transition-colors">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: secondary, color: primary }}>
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1E2421] mb-2">Acompanhar Relato</h2>
          <p className="text-sm text-[#5F6B66] mb-5 flex-1">
            Verifique o andamento do seu relato usando o protocolo e a chave de acesso recebidos.
          </p>
          <ul className="text-sm text-[#5F6B66] space-y-2 mb-6 ml-4 list-disc">
            <li>Acesso protegido por código exclusivo</li>
            <li>Visualize o status e responda perguntas</li>
            <li>Comunicação bidirecional e segura</li>
          </ul>
          <Link
            href={`/canal/${slug}/acompanhar`}
            className="w-full py-3 border text-center font-semibold rounded-xl transition-opacity hover:opacity-80"
            style={{ borderColor: primary, color: primary, backgroundColor: secondary }}
          >
            Consultar Protocolo
          </Link>
        </div>
      </div>
    </div>
  )
}
