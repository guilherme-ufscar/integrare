import { getClientSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function PainelDashboard() {
  const session = await getClientSession() as any
  if (!session) redirect("/login")

  const companyId = session.companyId as string

  const [total, novo, emAndamento, concluido, criticos, recentes] = await Promise.all([
    prisma.report.count({ where: { companyId } }),
    prisma.report.count({ where: { companyId, status: "NOVO" } }),
    prisma.report.count({ where: { companyId, status: { in: ["EM_TRIAGEM", "EM_ANALISE", "EM_APURACAO"] } } }),
    prisma.report.count({ where: { companyId, status: { in: ["CONCLUIDO", "ARQUIVADO"] } } }),
    prisma.report.count({ where: { companyId, severity: "CRITICO" } }),
    prisma.report.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, protocol: true, category: true, status: true, severity: true, createdAt: true, title: true },
    }),
  ])

  const statusLabel: Record<string, string> = {
    NOVO: "Novo",
    EM_TRIAGEM: "Em Triagem",
    EM_ANALISE: "Em Análise",
    AGUARDANDO_INFO: "Aguardando",
    EM_APURACAO: "Em Apuração",
    CONCLUIDO: "Concluído",
    ARQUIVADO: "Arquivado",
  }

  const severityColor: Record<string, string> = {
    CRITICO: "text-red-600 bg-red-50 border-red-200",
    ALTO: "text-orange-600 bg-orange-50 border-orange-200",
    MEDIO: "text-yellow-700 bg-yellow-50 border-yellow-200",
    BAIXO: "text-green-700 bg-green-50 border-green-200",
    NAO_CLASSIFICADO: "text-gray-500 bg-gray-50 border-gray-200",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1E2421]">Dashboard</h1>
        <p className="text-sm text-[#5F6B66] mt-1">Visão geral dos relatos da sua empresa</p>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total de Relatos" value={total} icon={<FileText className="w-5 h-5" />} color="blue" />
        <MetricCard label="Novos" value={novo} icon={<Clock className="w-5 h-5" />} color="yellow" />
        <MetricCard label="Em Andamento" value={emAndamento} icon={<AlertTriangle className="w-5 h-5" />} color="orange" />
        <MetricCard label="Concluídos" value={concluido} icon={<CheckCircle2 className="w-5 h-5" />} color="green" />
      </div>

      {criticos > 0 && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            <strong>{criticos} relato{criticos > 1 ? "s" : ""} crítico{criticos > 1 ? "s" : ""}</strong> requer{criticos > 1 ? "em" : ""} atenção imediata.{" "}
            <Link href="/painel/casos?severity=CRITICO" className="underline font-medium">Ver agora</Link>
          </span>
        </div>
      )}

      {/* Tabela de recentes */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#D7E2DD] flex items-center justify-between">
          <h2 className="font-semibold text-[#1E2421]">Relatos Recentes</h2>
          <Link href="/painel/casos" className="text-xs text-[#123C33] hover:underline">Ver todos →</Link>
        </div>
        <div className="overflow-x-auto">
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
              {recentes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#5F6B66]">
                    Nenhum relato registrado ainda.
                  </td>
                </tr>
              ) : (
                recentes.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="px-6 py-3">
                      <Link href={`/painel/casos/${r.id}`} className="font-mono text-xs text-[#123C33] hover:underline">
                        {r.protocol}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-[#5F6B66]">{r.category}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-[#EAF4F0] text-[#123C33] border border-[#D7E2DD]">
                        {statusLabel[r.status] || r.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${severityColor[r.severity] || severityColor.NAO_CLASSIFICADO}`}>
                        {r.severity.replace("_", " ")}
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
      </div>
    </div>
  )
}

function MetricCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  }
  return (
    <div className="bg-white rounded-xl border border-[#D7E2DD] p-5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-[#1E2421]">{value}</p>
      <p className="text-xs text-[#5F6B66] mt-0.5">{label}</p>
    </div>
  )
}
