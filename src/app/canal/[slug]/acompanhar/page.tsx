"use client"

import { useState, use } from "react"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function AcompanharSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [protocol, setProtocol] = useState("")
  const [accessKey, setAccessKey] = useState("")
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [sendingMsg, setSendingMsg] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setReport(null)
    try {
      const res = await fetch(`/api/reports/track?protocol=${encodeURIComponent(protocol)}&accessKey=${encodeURIComponent(accessKey)}`)
      const data = await res.json()
      if (data.success) {
        setReport(data.report)
      } else {
        setError(data.error || "Relato não encontrado.")
      }
    } catch {
      setError("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !report) return
    setSendingMsg(true)
    try {
      const res = await fetch(`/api/reports/${report.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message, accessKey }),
      })
      const data = await res.json()
      if (data.success) {
        setReport((prev: any) => ({ ...prev, messages: [...(prev.messages || []), data.message] }))
        setMessage("")
      }
    } finally {
      setSendingMsg(false)
    }
  }

  const STATUS_LABEL: Record<string, string> = {
    NOVO: "Novo",
    EM_TRIAGEM: "Em Triagem",
    EM_ANALISE: "Em Análise",
    AGUARDANDO_INFO: "Aguardando Informações",
    EM_APURACAO: "Em Apuração",
    CONCLUIDO: "Concluído",
    ARQUIVADO: "Arquivado",
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <Link href={`/canal/${slug}`} className="flex items-center gap-1 text-sm text-[#5F6B66] hover:text-[#123C33] mb-6">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="bg-white rounded-2xl border border-[#D7E2DD] shadow-xl p-8">
        <h1 className="text-xl font-bold text-[#1E2421] mb-1">Acompanhar Relato</h1>
        <p className="text-sm text-[#5F6B66] mb-6">Insira seu protocolo e chave de acesso para consultar o andamento.</p>

        <form onSubmit={handleSearch} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Número de Protocolo *</label>
            <input
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-[#D7E2DD] rounded-lg text-sm focus:outline-none focus:border-[#123C33]"
              placeholder="Ex: INT-20241201-ABC123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Chave de Acesso *</label>
            <input
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              required
              type="password"
              className="w-full px-3 py-2.5 border border-[#D7E2DD] rounded-lg text-sm focus:outline-none focus:border-[#123C33]"
              placeholder="Chave gerada no momento do relato"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#123C33] text-white font-semibold rounded-lg hover:bg-[#0D2E27] disabled:opacity-60 transition-colors text-sm"
          >
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </form>

        {report && (
          <div className="space-y-5 border-t border-[#D7E2DD] pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#5F6B66]">Protocolo</p>
                <p className="font-mono font-bold text-[#1E2421]">{report.protocol}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#EAF4F0] text-[#123C33] border border-[#D7E2DD]">
                {STATUS_LABEL[report.status] || report.status}
              </span>
            </div>

            <div>
              <p className="text-xs text-[#5F6B66] mb-1">Categoria</p>
              <p className="text-sm text-[#1E2421]">{report.category}</p>
            </div>

            {report.messages?.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-[#1E2421]">Mensagens</p>
                {report.messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl text-sm ${msg.role === "ADMIN" ? "bg-[#EAF4F0] text-[#1E2421]" : "bg-[#F8FAF9] text-[#5F6B66]"}`}
                  >
                    <p className="font-medium text-xs mb-1">{msg.role === "ADMIN" ? "Equipe Integrare" : "Você"}</p>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enviar mensagem..."
                className="flex-1 px-3 py-2 text-sm border border-[#D7E2DD] rounded-lg focus:outline-none focus:border-[#123C33]"
              />
              <button
                type="submit"
                disabled={sendingMsg || !message.trim()}
                className="px-3 py-2 bg-[#123C33] text-white rounded-lg hover:bg-[#0D2E27] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
