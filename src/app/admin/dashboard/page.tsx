"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/admin/reports")
        const data = await res.json()
        if (data.success) {
          setReports(data.reports)
        }
      } catch (e) {
        console.error("Erro ao carregar relatórios:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const getStatusColor = (status: string) => {
    switch(status) {
      case "NOVO": return "bg-blue-100 text-blue-800"
      case "EM_TRIAGEM": return "bg-orange-100 text-orange-800"
      case "EM_ANALISE": return "bg-purple-100 text-purple-800"
      case "CONCLUIDO": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityBadge = (severity: string) => {
    if (severity === "CRITICO") return <span className="text-danger flex items-center font-bold text-xs"><AlertTriangle className="w-3 h-3 mr-1"/> Crítico</span>
    if (severity === "ALTO") return <span className="text-orange-600 font-bold text-xs">Alto</span>
    return <span className="text-muted text-xs">-</span>
  }

  const stats = {
    total: reports.length,
    novos: reports.filter(r => r.status === "NOVO").length,
    emAndamento: reports.filter(r => ["EM_TRIAGEM", "EM_ANALISE", "EM_APURACAO", "AGUARDANDO_INFO"].includes(r.status)).length,
    concluidos: reports.filter(r => r.status === "CONCLUIDO").length,
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-surface rounded-full flex items-center justify-center text-brand-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total de Relatos</p>
              <h3 className="text-2xl font-bold text-brand-secondary">{loading ? "-" : stats.total}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Novos Casos</p>
              <h3 className="text-2xl font-bold text-brand-secondary">{loading ? "-" : stats.novos}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Em Andamento</p>
              <h3 className="text-2xl font-bold text-brand-secondary">{loading ? "-" : stats.emAndamento}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Concluídos</p>
              <h3 className="text-2xl font-bold text-brand-secondary">{loading ? "-" : stats.concluidos}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="border-b bg-gray-50/50">
          <CardTitle className="text-lg">Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted">Carregando relatos...</div>
          ) : reports.length === 0 ? (
            <div className="p-8 text-center text-muted">Nenhum relato registrado até o momento.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-medium">Protocolo</th>
                    <th className="px-6 py-4 font-medium">Data</th>
                    <th className="px-6 py-4 font-medium">Categoria</th>
                    <th className="px-6 py-4 font-medium">Gravidade</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-brand-primary">{report.protocol}</td>
                      <td className="px-6 py-4">{new Date(report.createdAt).toLocaleDateString("pt-BR")}</td>
                      <td className="px-6 py-4">{report.category}</td>
                      <td className="px-6 py-4">{getSeverityBadge(report.severity)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                          {report.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/casos/${report.id}`} className="text-brand-accent hover:underline font-medium">
                          Analisar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
