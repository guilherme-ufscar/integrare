import { getClientSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { FilterSelect } from "./FilterSelect"

const prisma = new PrismaClient()

export default async function PainelCasos({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; severity?: string; category?: string; page?: string }>
}) {
  const session = await getClientSession() as any
  if (!session) redirect("/login")

  const sp = await searchParams
  const companyId = session.companyId as string
  const page = Number(sp.page) || 1
  const take = 20
  const skip = (page - 1) * take

  const where: any = { companyId }
  if (sp.status) where.status = sp.status
  if (sp.severity) where.severity = sp.severity
  if (sp.category) where.category = sp.category

  const [reports, total] = await Promise.all([
    prisma.report.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      skip,
      select: {
        id: true, protocol: true, category: true, title: true,
        status: true, severity: true, createdAt: true,
      },
    }),
    prisma.report.count({ where }),
  ])

  const categories = await prisma.report.findMany({
    where: { companyId },
    distinct: ["category"],
    select: { category: true },
  })

  const totalPages = Math.ceil(total / take)

  const STATUS_OPTIONS = [
    { value: "", label: "Todos os status" },
    { value: "NOVO", label: "Novo" },
    { value: "EM_TRIAGEM", label: "Em Triagem" },
    { value: "EM_ANALISE", label: "Em Análise" },
    { value: "AGUARDANDO_INFO", label: "Aguardando Info" },
    { value: "EM_APURACAO", label: "Em Apuração" },
    { value: "CONCLUIDO", label: "Concluído" },
    { value: "ARQUIVADO", label: "Arquivado" },
  ]

  const SEVERITY_OPTIONS = [
    { value: "", label: "Todas gravidades" },
    { value: "CRITICO", label: "Crítico" },
    { value: "ALTO", label: "Alto" },
    { value: "MEDIO", label: "Médio" },
    { value: "BAIXO", label: "Baixo" },
    { value: "NAO_CLASSIFICADO", label: "Não Classificado" },
  ]

  const severityColor: Record<string, string> = {
    CRITICO: "text-red-600 bg-red-50 border-red-200",
    ALTO: "text-orange-600 bg-orange-50 border-orange-200",
    MEDIO: "text-yellow-700 bg-yellow-50 border-yellow-200",
    BAIXO: "text-green-700 bg-green-50 border-green-200",
    NAO_CLASSIFICADO: "text-gray-500 bg-gray-50 border-gray-200",
  }

  function buildUrl(overrides: Record<string, string>) {
    const params = new URLSearchParams()
    const merged = { status: sp.status || "", severity: sp.severity || "", category: sp.category || "", ...overrides }
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v) })
    return `/painel/casos?${params.toString()}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E2421]">Casos</h1>
        <p className="text-sm text-[#5F6B66] mt-1">{total} relato{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <FilterSelect value={sp.status || ""} options={STATUS_OPTIONS} buildUrl={(v) => buildUrl({ status: v, page: "1" })} />
        <FilterSelect value={sp.severity || ""} options={SEVERITY_OPTIONS} buildUrl={(v) => buildUrl({ severity: v, page: "1" })} />
        <FilterSelect
          value={sp.category || ""}
          options={[{ value: "", label: "Todas categorias" }, ...categories.map((c) => ({ value: c.category, label: c.category }))]}
          buildUrl={(v) => buildUrl({ category: v, page: "1" })}
        />
      </div>

      <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAF9]">
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Protocolo</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Categoria</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Gravidade</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-[#5F6B66] uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D7E2DD]">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#5F6B66]">
                  Nenhum relato encontrado com esses filtros.
                </td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8FAF9] transition-colors">
                  <td className="px-6 py-3">
                    <Link href={`/painel/casos/${r.id}`} className="font-mono text-xs text-[#123C33] hover:underline">
                      {r.protocol}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-[#5F6B66]">{r.category}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#EAF4F0] text-[#123C33] border border-[#D7E2DD]">
                      {r.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${severityColor[r.severity] || severityColor.NAO_CLASSIFICADO}`}>
                      {r.severity.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[#5F6B66] text-xs">
                    {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {page > 1 && (
            <Link href={buildUrl({ page: String(page - 1) })} className="px-3 py-1.5 text-sm border border-[#D7E2DD] rounded-lg hover:bg-[#EAF4F0]">
              ← Anterior
            </Link>
          )}
          <span className="text-sm text-[#5F6B66]">Página {page} de {totalPages}</span>
          {page < totalPages && (
            <Link href={buildUrl({ page: String(page + 1) })} className="px-3 py-1.5 text-sm border border-[#D7E2DD] rounded-lg hover:bg-[#EAF4F0]">
              Próxima →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

