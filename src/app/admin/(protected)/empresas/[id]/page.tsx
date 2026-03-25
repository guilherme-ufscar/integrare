import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CompanyActions } from "./CompanyActions"

const prisma = new PrismaClient()

export default async function AdminEmpresaDetalhe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      users: true,
      _count: { select: { reports: true } },
      reports: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, protocol: true, category: true, status: true, severity: true, createdAt: true },
      },
    },
  })

  if (!company) notFound()

  const statusColor: Record<string, string> = {
    ACTIVE: "text-green-700 bg-green-50 border-green-200",
    PENDING: "text-yellow-700 bg-yellow-50 border-yellow-200",
    SUSPENDED: "text-red-700 bg-red-50 border-red-200",
    CANCELLED: "text-gray-600 bg-gray-50 border-gray-200",
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/empresas" className="flex items-center gap-1 text-sm text-[#5F6B66] hover:text-[#123C33]">
          <ArrowLeft className="w-4 h-4" /> Empresas
        </Link>
        <span className="text-[#D7E2DD]">/</span>
        <span className="text-sm font-medium text-[#1E2421]">{company.name}</span>
      </div>

      {/* Info da empresa */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-[#1E2421]">{company.name}</h1>
            <p className="text-sm text-[#5F6B66] font-mono mt-0.5">{company.slug}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor[company.status] || statusColor.PENDING}`}>
            {company.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-xs text-[#5F6B66]">E-mail</p><p>{company.email}</p></div>
          <div><p className="text-xs text-[#5F6B66]">Telefone</p><p>{company.phone || "—"}</p></div>
          <div><p className="text-xs text-[#5F6B66]">Plano</p><p>{company.plan}</p></div>
          <div><p className="text-xs text-[#5F6B66]">Total de relatos</p><p>{company._count.reports}</p></div>
          <div><p className="text-xs text-[#5F6B66]">Stripe Customer</p><p className="font-mono text-xs">{company.stripeCustomerId || "—"}</p></div>
          <div><p className="text-xs text-[#5F6B66]">Stripe Subscription</p><p className="font-mono text-xs">{company.stripeSubscriptionId || "—"}</p></div>
        </div>
      </div>

      {/* Ações */}
      <CompanyActions companyId={company.id} currentStatus={company.status} />

      {/* Usuários */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] p-6">
        <h2 className="font-semibold text-[#1E2421] mb-4">Usuários</h2>
        {company.users.length === 0 ? (
          <p className="text-sm text-[#5F6B66]">Nenhum usuário.</p>
        ) : (
          <div className="space-y-2">
            {company.users.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-2 border-b border-[#D7E2DD] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#1E2421]">{u.name}</p>
                  <p className="text-xs text-[#5F6B66]">{u.email}</p>
                </div>
                <span className="text-xs text-[#5F6B66]">{u.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relatos recentes */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#D7E2DD]">
          <h2 className="font-semibold text-[#1E2421]">Relatos Recentes</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAF9]">
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase">Protocolo</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase">Categoria</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D7E2DD]">
            {company.reports.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#5F6B66]">Nenhum relato ainda.</td>
              </tr>
            ) : (
              company.reports.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-3 font-mono text-xs text-[#123C33]">{r.protocol}</td>
                  <td className="px-6 py-3 text-[#5F6B66]">{r.category}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#EAF4F0] text-[#123C33] border border-[#D7E2DD]">
                      {r.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-[#5F6B66]">
                    {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
