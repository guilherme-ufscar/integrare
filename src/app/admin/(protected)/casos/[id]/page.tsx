"use client"

import { useEffect, useState, useRef, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Clock, MessageSquare, Send, Save, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DetalhesCasoPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const reportId = unwrappedParams.id

  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [syncStatus, setSyncStatus] = useState("")

  const [editStatus, setEditStatus] = useState("")
  const [editSeverity, setEditSeverity] = useState("")

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/admin/reports/${reportId}`)
        const data = await res.json()
        if (data.success) {
          setReport(data.report)
          setEditStatus(data.report.status)
          setEditSeverity(data.report.severity)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [reportId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [report?.messages])

  const handleUpdateMeta = async () => {
    setSyncStatus("Salvando...")
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus, severity: editSeverity })
      })
      const data = await res.json()
      if (data.success) {
        setReport({ ...report, status: editStatus, severity: editSeverity })
        setSyncStatus("Salvo com sucesso!")
        setTimeout(() => setSyncStatus(""), 3000)
      }
    } catch {
      setSyncStatus("Erro ao salvar.")
    }
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const content = formData.get("message") as string
    form.reset()

    try {
      const res = await fetch(`/api/admin/reports/${reportId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      })
      const result = await res.json()
      if (result.success) {
        setReport({ ...report, messages: [...report.messages, result.message] })
      }
    } catch (err) {
      alert("Erro ao enviar mensagem.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-muted">Carregando detalhes do caso...</div>
  if (!report) return <div className="p-8 text-center text-danger">Relato não encontrado.</div>

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute:"2-digit"
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/dashboard" className="text-muted hover:text-brand-primary flex items-center text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Dashboard
        </Link>
        <div className="text-sm text-muted">
          Protocolo: <span className="font-mono font-bold text-brand-primary tracking-wider">{report.protocol}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Painel Esquerdo: Detalhes e Controles */}
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-sm border-border">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-base">Gestão do Relato</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Status</label>
                <select 
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                >
                  <option value="NOVO">Novo</option>
                  <option value="EM_TRIAGEM">Em Triagem</option>
                  <option value="EM_ANALISE">Em Análise Técnica</option>
                  <option value="AGUARDANDO_INFO">Aguardando Informações</option>
                  <option value="EM_APURACAO">Em Apuração (Investigação)</option>
                  <option value="CONCLUIDO">Concluído</option>
                  <option value="ARQUIVADO">Arquivado / Improcedente</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted uppercase tracking-wider">Gravidade</label>
                <select 
                  value={editSeverity}
                  onChange={(e) => setEditSeverity(e.target.value)}
                  className="w-full h-9 rounded-md border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                >
                  <option value="NAO_CLASSIFICADO">Não Classificado</option>
                  <option value="BAIXO">Baixo</option>
                  <option value="MEDIO">Médio</option>
                  <option value="ALTO">Alto</option>
                  <option value="CRITICO">Crítico (Risco Alto)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-brand-primary font-medium">{syncStatus}</span>
                <Button size="sm" onClick={handleUpdateMeta} disabled={editStatus === report.status && editSeverity === report.severity}>
                  <Save className="w-4 h-4 mr-2" /> Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-base">Dados Informados</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted uppercase">Categoria</p>
                <p className="text-sm mt-1">{report.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase">Data Ocorrida</p>
                <p className="text-sm mt-1">{report.dateOccurred ? new Date(report.dateOccurred).toLocaleDateString("pt-BR") : "Não informado"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase">Setor / Local</p>
                <p className="text-sm mt-1">{report.location || "Não informado"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase">Data de Registro</p>
                <p className="text-sm mt-1 flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {formatDate(report.createdAt)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Painel Direito: Relato Original e Chat */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card className="shadow-sm border-border flex flex-col overflow-hidden max-h-[800px]">
            <CardHeader className="bg-white border-b py-4 shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-secondary" /> 
                <CardTitle className="text-lg">Linha do Tempo e Comunicação</CardTitle>
              </div>
              <CardDescription>O denunciante permanece anônimo. Trate este caso com sigilo.</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
              
              {/* Relato Inicial */}
              <div className="flex justify-start">
                <div className="bg-white border rounded-2xl p-5 max-w-[90%] shadow-sm relative">
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-brand-accent text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                    Origem
                  </div>
                  <p className="text-xs mb-3 text-muted border-b pb-2 flex justify-between">
                    <span className="font-semibold text-brand-primary">RELATO DO DENUNCIANTE</span>
                    <span>{formatDate(report.createdAt)}</span>
                  </p>
                  {report.title && <p className="font-semibold text-foreground mb-2">{report.title}</p>}
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{report.description}</p>
                </div>
              </div>

              {/* Chat */}
              {report.messages.map((msg: any) => (
                <div key={msg.id} className={`flex ${msg.role === "ADMIN" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${msg.role === "ADMIN" ? "bg-brand-primary text-white" : "bg-white border"}`}>
                    <p className={`text-xs font-medium mb-2 flex justify-between ${msg.role === "ADMIN" ? "text-white/80" : "text-brand-primary"}`}>
                      <span>{msg.role === "ADMIN" ? "SUA MENSAGEM (ADMIN)" : "DENUNCIANTE"}</span>
                      <span className={`ml-4 ${msg.role === "ADMIN" ? "text-white/60" : "text-muted"}`}>{formatDate(msg.createdAt)}</span>
                    </p>
                    <p className={`text-sm whitespace-pre-wrap leading-relaxed ${msg.role === "ADMIN" ? "text-white" : "text-foreground"}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </CardContent>

            <div className="bg-white p-4 border-t shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <Textarea 
                  name="message" 
                  placeholder="Escreva sua mensagem solicitando esclarecimentos ou informando atualizações ao denunciante..." 
                  className="min-h-[60px] max-h-[120px]"
                  required
                />
                <Button type="submit" disabled={submitting} className="h-full px-6 bg-brand-primary">
                  <Send className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Enviar</span>
                </Button>
              </form>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
