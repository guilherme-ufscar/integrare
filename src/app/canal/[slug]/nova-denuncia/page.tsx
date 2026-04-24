"use client"

import { useState, use } from "react"
import { ShieldCheck, Copy, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const CATEGORIAS = [
  "Assédio moral ou sexual",
  "Fraude ou corrupção",
  "Desvio de conduta",
  "Violação de dados ou privacidade",
  "Conflito de interesses",
  "Descumprimento de normas",
  "Discriminação",
  "Segurança do trabalho",
  "Outro",
]

export default function NovaDenunciaSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [credentials, setCredentials] = useState({ protocol: "", accessKey: "" })
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      category: formData.get("category"),
      title: formData.get("title") || "",
      description: formData.get("description"),
      dateOccurred: formData.get("dateOccurred") || "",
      location: formData.get("location") || "",
      companySlug: slug,
    }

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        setCredentials({ protocol: result.protocol, accessKey: result.accessKey })
        setSuccess(true)
      } else {
        setError(result.error || "Erro ao registrar relato.")
      }
    } catch {
      setError("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Protocolo: ${credentials.protocol}\nChave de Acesso: ${credentials.accessKey}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-2xl border border-[#D7E2DD] shadow-xl p-10 text-center">
          <div className="w-16 h-16 bg-[#EAF4F0] text-[#123C33] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E2421] mb-2">Relato Registrado</h2>
          <p className="text-sm text-[#5F6B66] mb-8">
            Guarde as informações abaixo em local seguro. A chave de acesso só é exibida uma vez.
          </p>

          <div className="bg-[#F8FAF9] border border-[#D7E2DD] p-6 rounded-xl mb-6 relative text-left">
            <button
              onClick={copyCredentials}
              className="absolute top-4 right-4 text-[#5F6B66] hover:text-[#123C33] transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied && <span className="block text-xs text-[#123C33] mt-1">Copiado!</span>}
            </button>
            <div className="mb-3">
              <p className="text-xs text-[#5F6B66] mb-0.5">Protocolo</p>
              <p className="font-mono font-bold text-[#1E2421]">{credentials.protocol}</p>
            </div>
            <div>
              <p className="text-xs text-[#5F6B66] mb-0.5">Chave de Acesso</p>
              <p className="font-mono font-bold text-[#1E2421] break-all">{credentials.accessKey}</p>
            </div>
          </div>

          <Link
            href={`/canal/${slug}/acompanhar`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#123C33] text-white text-sm font-semibold rounded-lg hover:bg-[#0D2E27] transition-colors"
          >
            Acompanhar meu relato
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <Link href={`/canal/${slug}`} className="flex items-center gap-1 text-sm text-[#5F6B66] hover:text-[#123C33] mb-6">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="bg-white rounded-2xl border border-[#D7E2DD] shadow-xl p-8">
        <h1 className="text-xl font-bold text-[#1E2421] mb-1">Novo Relato</h1>
        <p className="text-sm text-[#5F6B66] mb-6">
          Sua identidade é protegida. Forneça o máximo de detalhes possível para facilitar a investigação.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Categoria *</label>
            <select name="category" required className="input-canal">
              <option value="">Selecione uma categoria</option>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Título (opcional)</label>
            <input name="title" type="text" className="input-canal" placeholder="Resumo breve do ocorrido" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Descrição detalhada *</label>
            <textarea
              name="description"
              required
              rows={5}
              className="input-canal resize-none"
              placeholder="Descreva o ocorrido com o máximo de detalhes: o que aconteceu, quem estava envolvido, quando e onde."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Data do ocorrido</label>
              <input name="dateOccurred" type="date" className="input-canal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Local</label>
              <input name="location" type="text" className="input-canal" placeholder="Ex: Filial SP" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#123C33] text-white font-semibold rounded-lg hover:bg-[#0D2E27] disabled:opacity-60 transition-colors"
          >
            {loading ? "Registrando..." : "Registrar Relato com Segurança"}
          </button>
        </form>
      </div>

      <style jsx global>{`
        .input-canal {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #D7E2DD;
          border-radius: 8px;
          font-size: 14px;
          color: #1E2421;
          background: white;
          outline: none;
        }
        .input-canal:focus {
          border-color: #123C33;
          box-shadow: 0 0 0 3px rgba(18, 60, 51, 0.1);
        }
        select.input-canal {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235F6B66' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 36px;
        }
      `}</style>
    </div>
  )
}
