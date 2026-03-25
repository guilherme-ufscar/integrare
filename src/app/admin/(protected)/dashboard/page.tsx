"use client"

import { useEffect, useState, useMemo } from "react"
import { FileText, AlertTriangle, CheckCircle2, Clock, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts"

export default function DashboardPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((r) => r.json())
      .then((data) => { if (data.success) setReports(data.reports) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NOVO": return "bg-blue-100 text-blue-800"
      case "EM_TRIAGEM": return "bg-orange-100 text-orange-800"
      case "EM_ANALISE": return "bg-purple-100 text-purple-800"
      case "CONCLUIDO": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getSeverityBadge = (severity: string) => {
    if (severity === "CRITICO") return <span className="text-red-600 flex items-center font-bold text-xs"><AlertTriangle className="w-3 h-3 mr-1" /> Crítico</span>
    if (severity === "ALTO") return <span className="text-orange-600 font-bold text-xs">Alto</span>
    return <span className="text-[#5F6B66] text-xs">—</span>
  }

  const stats = useMemo(() => ({
    total: reports.length,
    novos: reports.filter((r) => r.status === "NOVO").length,
    emAndamento: reports.filter((r) => ["EM_TRIAGEM", "EM_ANALISE", "EM_APURACAO", "AGUARDANDO_INFO"].includes(r.status)).length,
    concluidos: reports.filter((r) => r.status === "CONCLUIDO").length,
  }), [reports])

  const categoryData = useMemo(() => {
    const acc: Record<string, number> = {}
    reports.forEach((r) => { acc[r.category] = (acc[r.category] || 0) + 1 })
    return Object.entries(acc).map(([name, value]) => ({ name, value }))
  }, [reports])

  const severityData = useMemo(() => {
    const acc: Record<string, number> = {}
    reports.forEach((r) => { acc[r.severity] = (acc[r.severity] || 0) + 1 })
    return Object.entries(acc).filter(([, v]) => v > 0).map(([name, count]) => ({ name, count }))
  }, [reports])

  const severityColors: Record<string, string> = {
    BAIXO: "#10b981", MEDIO: "#f59e0b", ALTO: "#ef4444", CRITICO: "#7f1d1d", NAO_CLASSIFICADO: "#9ca3af",
  }
  const CATEGORY_COLORS = ["#123C33", "#1F6B57", "#1E8E5A", "#C58A16", "#B94141", "#5F6B66"]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total de Relatos", value: stats.total, icon: <FileText className="w-6 h-6" />, bg: "bg-[#EAF4F0]", color: "text-[#123C33]" },
          { label: "Novos Casos", value: stats.novos, icon: <AlertTriangle className="w-6 h-6" />, bg: "bg-blue-50", color: "text-blue-600" },
          { label: "Em Andamento", value: stats.emAndamento, icon: <Clock className="w-6 h-6" />, bg: "bg-orange-50", color: "text-orange-600" },
          { label: "Concluídos", value: stats.concluidos, icon: <CheckCircle2 className="w-6 h-6" />, bg: "bg-green-50", color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#D7E2DD] p-6 flex items-center gap-4">
            <div className={`w-12 h-12 ${s.bg} rounded-full flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-sm text-[#5F6B66] font-medium">{s.label}</p>
              <h3 className="text-2xl font-bold text-[#1E2421]">{loading ? "—" : s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#D7E2DD] bg-[#F8FAF9]">
            <h2 className="flex items-center gap-2 text-base font-semibold text-[#1E2421]">
              <BarChart3 className="w-5 h-5 text-[#123C33]" /> Relatos por Gravidade
            </h2>
          </div>
          <div className="p-6 h-[280px]">
            {loading || severityData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[#5F6B66] text-sm">
                {loading ? "Carregando..." : "Sem dados suficientes"}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip cursor={{ fill: "#EAF4F0" }} contentStyle={{ borderRadius: "8px", border: "1px solid #D7E2DD" }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {severityData.map((entry, i) => (
                      <Cell key={i} fill={severityColors[entry.name] || "#1E2421"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#D7E2DD] bg-[#F8FAF9]">
            <h2 className="flex items-center gap-2 text-base font-semibold text-[#1E2421]">
              <TrendingUp className="w-5 h-5 text-[#123C33]" /> Incidência por Categoria
            </h2>
          </div>
          <div className="p-6 h-[280px]">
            {loading || categoryData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[#5F6B66] text-sm">
                {loading ? "Carregando..." : "Sem dados suficientes"}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} innerRadius={60} dataKey="value" stroke="none" paddingAngle={3}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #D7E2DD", fontSize: "13px" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Tabela de relatos */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#D7E2DD] bg-[#F8FAF9]">
          <h2 className="text-base font-semibold text-[#1E2421]">Relatos Recentes</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-[#5F6B66] text-sm">Carregando relatos...</div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center text-[#5F6B66] text-sm">Nenhum relato registrado até o momento.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#5F6B66] uppercase bg-[#F8FAF9] border-b border-[#D7E2DD]">
                <tr>
                  <th className="px-6 py-3 font-medium">Protocolo</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                  <th className="px-6 py-3 font-medium">Categoria</th>
                  <th className="px-6 py-3 font-medium">Gravidade</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D7E2DD]">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-[#123C33]">{report.protocol}</td>
                    <td className="px-6 py-4 text-[#5F6B66]">{new Date(report.createdAt).toLocaleDateString("pt-BR")}</td>
                    <td className="px-6 py-4 text-[#1E2421]">{report.category}</td>
                    <td className="px-6 py-4">{getSeverityBadge(report.severity)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {report.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/casos/${report.id}`} className="text-[#123C33] hover:underline font-medium text-sm">
                        Analisar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
