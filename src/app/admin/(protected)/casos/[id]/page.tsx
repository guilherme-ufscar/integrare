"use client"

import { useEffect, useState, useRef, use } from "react"
import { ArrowLeft, Clock, MessageSquare, Send, Save } from "lucide-react"
import Link from "next/link"

export default function DetalhesCasoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: reportId } = use(params)

  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [syncStatus, setSyncStatus] = useState("")
  const [editStatus, setEditStatus] = useState("")
  const [editSeverity, setEditSeverity] = useState("")
  const [message, setMessage] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`/api/admin/reports/${reportId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setReport(data.report)
          setEditStatus(data.report.status)
          setEditSeverity(data.report.severity)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
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
        body: JSON.stringify({ status: editStatus, severity: editSeverity }),
      })
      const data = await res.json()
      if (data.success) {
        setReport((prev: any) => ({ ...prev, status: editStatus, severity: editSeverity }))
        setSyncStatus("Salvo!")
        setTimeout(() => setSyncStatus(""), 2000)
      }
    } catch {
      setSyncStatus("Erro ao salvar.")
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      })
      const result = await res.json()
      if (result.success) {
        setReport((prev: any) => ({ ...prev, messages: [...(prev.messages || []), result.message] }))
        setMessage("")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })

  if (loading) return <div className="p-8 text-center text-[#5F6B66]">Carregando detalhes do caso...</div>
  if (!report) return <div className="p-8 text-center text-red-600">Relato não encontrado.</div>

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-1 text-sm text-[#5F6B66] hover:text-[#123C33]">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
        </Link>
        <span className="text-sm text-[#5F6B66]">
          Protocolo: <span className="font-mono font-bold text-[#123C33]">{report.protocol}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Painel Esquerdo */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#D7E2DD] bg-[#F8FAF9]">
              <h2 className="text-sm font-semibold text-[#1E2421]">Gestão do Relato</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5F6B66] uppercase tracking-wider mb-1.5">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full border border-[#D7E2DD] rounded-lg px-3 py-2 text-sm text-[#1E2421] focus:outline-none focus:border-[#123C33]"
                >
                  <option value="NOVO">Novo</option>
                  <option value="EM_TRIAGEM">Em Triagem</option>
                  <option value="EM_ANALISE">Em Análise Técnica</option>
                  <option value="AGUARDANDO_INFO">Aguardando Informações</option>
                  <option value="EM_APURACAO">Em Apuração</option>
                  <option value="CONCLUIDO">Concluído</option>
                  <option value="ARQUIVADO">Arquivado / Improcedente</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5F6B66] uppercase tracking-wider mb-1.5">Gravidade</label>
                <select
                  value={editSeverity}
                  onChange={(e) => setEditSeverity(e.target.value)}
                  className="w-full border border-[#D7E2DD] rounded-lg px-3 py-2 text-sm text-[#1E2421] focus:outline-none focus:border-[#123C33]"
                >
                  <option value="NAO_CLASSIFICADO">Não Classificado</option>
                  <option value="BAIXO">Baixo</option>
                  <option value="MEDIO">Médio</option>
                  <option value="ALTO">Alto</option>
                  <option value="CRITICO">Crítico</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-1">
                {syncStatus && <span className="text-xs text-[#123C33] font-medium">{syncStatus}</span>}
                <button
                  onClick={handleUpdateMeta}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#123C33] text-white text-sm font-medium rounded-lg hover:bg-[#0D2E27] transition-colors"
                >
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#D7E2DD] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#D7E2DD] bg-[#F8FAF9]">
              <h2 className="text-sm font-semibold text-[#1E2421]">Dados Informados</h2>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-[#5F6B66] uppercase mb-0.5">Categoria</p>
                <p className="text-[#1E2421]">{report.category}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5F6B66] uppercase mb-0.5">Data Ocorrida</p>
                <p className="text-[#1E2421]">{report.dateOccurred ? new Date(report.dateOccurred + "T12:00:00").toLocaleDateString("pt-BR") : "Não informado"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5F6B66] uppercase mb-0.5">Setor / Local</p>
                <p className="text-[#1E2421]">{report.location || "Não informado"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5F6B66] uppercase mb-0.5">Data de Registro</p>
                <p className="text-[#1E2421] flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDate(report.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Painel Direito: Chat */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-[#D7E2DD] flex flex-col" style={{ maxHeight: "78vh" }}>
            <div className="px-6 py-4 border-b border-[#D7E2DD] shrink-0">
              <h2 className="flex items-center gap-2 font-semibold text-[#1E2421]">
                <MessageSquare className="w-5 h-5 text-[#123C33]" /> Linha do Tempo e Comunicação
              </h2>
              <p className="text-xs text-[#5F6B66] mt-0.5">O denunciante permanece anônimo. Trate este caso com sigilo.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F8FAF9]">
              {/* Relato original */}
              <div className="flex justify-start">
                <div className="bg-white border border-[#D7E2DD] rounded-2xl p-5 max-w-[90%] shadow-sm relative">
                  <span className="absolute -top-2 -right-2 bg-[#123C33] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Origem</span>
                  <p className="text-xs text-[#5F6B66] border-b border-[#D7E2DD] pb-2 mb-3 flex justify-between">
                    <span className="font-semibold text-[#123C33]">RELATO DO DENUNCIANTE</span>
                    <span>{formatDate(report.createdAt)}</span>
                  </p>
                  {report.title && <p className="font-semibold text-[#1E2421] mb-2">{report.title}</p>}
                  <p className="text-sm text-[#1E2421] whitespace-pre-wrap leading-relaxed">{report.description}</p>
                </div>
              </div>

              {/* Mensagens */}
              {(report.messages || []).map((msg: any) => (
                <div key={msg.id} className={`flex ${msg.role === "ADMIN" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${msg.role === "ADMIN" ? "bg-[#123C33] text-white" : "bg-white border border-[#D7E2DD]"}`}>
                    <p className={`text-xs font-medium mb-1.5 flex justify-between gap-4 ${msg.role === "ADMIN" ? "text-white/70" : "text-[#123C33]"}`}>
                      <span>{msg.role === "ADMIN" ? "SUA MENSAGEM" : "DENUNCIANTE"}</span>
                      <span className={msg.role === "ADMIN" ? "text-white/50" : "text-[#5F6B66]"}>{formatDate(msg.createdAt)}</span>
                    </p>
                    <p className={`text-sm whitespace-pre-wrap leading-relaxed ${msg.role === "ADMIN" ? "text-white" : "text-[#1E2421]"}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-[#D7E2DD] flex gap-3 shrink-0 bg-white">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva sua mensagem ao denunciante..."
                rows={2}
                className="flex-1 text-sm text-[#1E2421] placeholder-[#9BA8A3] border border-[#D7E2DD] rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-[#123C33]"
              />
              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="px-4 bg-[#123C33] text-white rounded-lg hover:bg-[#0D2E27] disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">Enviar</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
