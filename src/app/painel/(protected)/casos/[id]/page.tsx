"use client"

import { useEffect, useState, useRef, use } from "react"
import { ArrowLeft, Send, Save, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"

export default function PainelCasoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
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
    fetch(`/api/painel/casos/${reportId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setReport(data.report)
          setEditStatus(data.report.status)
          setEditSeverity(data.report.severity)
        }
      })
      .finally(() => setLoading(false))
  }, [reportId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [report?.messages])

  const handleUpdateMeta = async () => {
    setSyncStatus("Salvando...")
    try {
      await fetch(`/api/painel/casos/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus, severity: editSeverity }),
      })
      setReport((prev: any) => ({ ...prev, status: editStatus, severity: editSeverity }))
      setSyncStatus("Salvo!")
    } catch {
      setSyncStatus("Erro ao salvar.")
    }
    setTimeout(() => setSyncStatus(""), 2000)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/painel/casos/${reportId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      })
      const data = await res.json()
      if (data.success) {
        setReport((prev: any) => ({
          ...prev,
          messages: [...(prev.messages || []), data.message],
        }))
        setMessage("")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="py-20 text-center text-[#5F6B66]">Carregando...</div>
  if (!report) return <div className="py-20 text-center text-red-600">Caso não encontrado.</div>

  const STATUS_OPTIONS = ["NOVO", "EM_TRIAGEM", "EM_ANALISE", "AGUARDANDO_INFO", "EM_APURACAO", "CONCLUIDO", "ARQUIVADO"]
  const SEVERITY_OPTIONS = ["NAO_CLASSIFICADO", "BAIXO", "MEDIO", "ALTO", "CRITICO"]

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/painel/casos" className="flex items-center gap-1 text-sm text-[#5F6B66] hover:text-[#123C33]">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <span className="text-[#D7E2DD]">/</span>
        <span className="text-sm font-mono text-[#123C33]">{report.protocol}</span>
      </div>

      <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-[#1E2421]">{report.title || report.category}</h1>
          <p className="text-sm text-[#5F6B66] mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {new Date(report.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#5F6B66] mb-1">Descrição</p>
          <p className="text-sm text-[#1E2421] whitespace-pre-wrap">{report.description}</p>
        </div>

        {(report.dateOccurred || report.location) && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            {report.dateOccurred && (
              <div>
                <p className="text-[#5F6B66] text-xs mb-0.5">Data do ocorrido</p>
                <p className="text-[#1E2421]">
                  {report.dateOccurred
                    ? new Date(report.dateOccurred + "T12:00:00").toLocaleDateString("pt-BR")
                    : "—"}
                </p>
              </div>
            )}
            {report.location && (
              <div>
                <p className="text-[#5F6B66] text-xs mb-0.5">Local</p>
                <p className="text-[#1E2421]">{report.location}</p>
              </div>
            )}
          </div>
        )}

        {/* Controles de status e gravidade */}
        <div className="border-t border-[#D7E2DD] pt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5F6B66] mb-1.5">Status</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full text-sm text-[#1E2421] border border-[#D7E2DD] rounded-lg px-3 py-2 focus:outline-none focus:border-[#123C33]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#5F6B66] mb-1.5">Gravidade</label>
            <select
              value={editSeverity}
              onChange={(e) => setEditSeverity(e.target.value)}
              className="w-full text-sm text-[#1E2421] border border-[#D7E2DD] rounded-lg px-3 py-2 focus:outline-none focus:border-[#123C33]"
            >
              {SEVERITY_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUpdateMeta}
            className="flex items-center gap-2 px-4 py-2 bg-[#123C33] text-white text-sm font-medium rounded-lg hover:bg-[#0D2E27] transition-colors"
          >
            <Save className="w-4 h-4" /> Salvar alterações
          </button>
          {syncStatus && <span className="text-sm text-[#5F6B66]">{syncStatus}</span>}
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white rounded-xl border border-[#D7E2DD]">
        <div className="px-6 py-4 border-b border-[#D7E2DD]">
          <h2 className="font-semibold text-[#1E2421]">Comunicação segura</h2>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {!report.messages?.length ? (
            <p className="text-sm text-center text-[#5F6B66] py-8">Nenhuma mensagem ainda.</p>
          ) : (
            report.messages.map((msg: any) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "ADMIN" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-sm px-4 py-2.5 rounded-xl text-sm ${
                    msg.role === "ADMIN"
                      ? "bg-[#123C33] text-white"
                      : "bg-[#EAF4F0] text-[#1E2421]"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === "ADMIN" ? "text-white/50" : "text-[#5F6B66]"}`}>
                    {msg.role === "ADMIN" ? "Equipe Integrare" : "Denunciante"} ·{" "}
                    {new Date(msg.createdAt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="px-6 pb-6 flex gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite uma mensagem para o denunciante..."
            rows={2}
            className="flex-1 text-sm text-[#1E2421] placeholder-[#9BA8A3] border border-[#D7E2DD] rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-[#123C33]"
          />
          <button
            type="submit"
            disabled={submitting || !message.trim()}
            className="px-4 py-2 bg-[#123C33] text-white rounded-lg hover:bg-[#0D2E27] disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
