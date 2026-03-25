import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Building2, ChevronRight, Plus } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminEmpresas() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { reports: true, users: true } },
    },
  })

  const statusColor: Record<string, string> = {
    ACTIVE: "text-green-700 bg-green-50 border-green-200",
    PENDING: "text-yellow-700 bg-yellow-50 border-yellow-200",
    SUSPENDED: "text-red-700 bg-red-50 border-red-200",
    CANCELLED: "text-gray-600 bg-gray-50 border-gray-200",
  }

  const planLabel: Record<string, string> = {
    BASICO: "Básico",
    INTERMEDIARIO: "Intermediário",
    COMPLIANCE_360: "Compliance 360°",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E2421]">Empresas</h1>
          <p className="text-sm text-[#5F6B66] mt-1">{companies.length} empresa{companies.length !== 1 ? "s" : ""} cadastrada{companies.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/empresas/nova"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#123C33] text-white text-sm font-medium hover:bg-[#1a5244] transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Empresa
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAF9]">
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Empresa</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Plano</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Relatos</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Criada em</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D7E2DD]">
            {companies.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#5F6B66]">
                  Nenhuma empresa cadastrada ainda.
                </td>
              </tr>
            ) : (
              companies.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8FAF9] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1E2421]">{c.name}</p>
                    <p className="text-xs text-[#5F6B66] font-mono">{c.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-[#5F6B66]">{planLabel[c.plan] || c.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs border font-medium ${statusColor[c.status] || statusColor.PENDING}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#5F6B66]">{c._count.reports}</td>
                  <td className="px-6 py-4 text-[#5F6B66] text-xs">
                    {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/empresas/${c.id}`}
                      className="flex items-center gap-1 text-xs text-[#123C33] hover:underline"
                    >
                      Detalhes <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
