"use client"

import { useState, useRef } from "react"
import { Upload, X, Palette } from "lucide-react"

interface BrandingEditorProps {
  companyId: string
  apiUrl: string // "/api/client/branding" ou "/api/admin/companies/:id"
  apiMethod?: "PATCH"
  initialLogo?: string | null
  initialPrimary?: string | null
  initialSecondary?: string | null
}

export function BrandingEditor({
  companyId,
  apiUrl,
  apiMethod = "PATCH",
  initialLogo,
  initialPrimary,
  initialSecondary,
}: BrandingEditorProps) {
  const [logo, setLogo] = useState(initialLogo || "")
  const [primary, setPrimary] = useState(initialPrimary || "#123C33")
  const [secondary, setSecondary] = useState(initialSecondary || "#EAF4F0")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/upload/logo", { method: "POST", body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setLogo(data.url)
    } catch (err: any) {
      setError(err.message || "Erro ao enviar imagem.")
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    setMsg("")
    setError("")
    try {
      const res = await fetch(apiUrl, {
        method: apiMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandLogo: logo || null,
          brandPrimaryColor: primary,
          brandSecondaryColor: secondary,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg("Personalização salva com sucesso.")
    } catch (err: any) {
      setError(err.message || "Erro ao salvar.")
    } finally {
      setSaving(false)
      setTimeout(() => setMsg(""), 3000)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-[#123C33]" />
        <h2 className="font-semibold text-[#1E2421]">Personalização do Canal</h2>
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Logo da empresa</p>
        <div className="flex items-center gap-4">
          <div className="w-24 h-16 rounded-lg border border-[#D7E2DD] bg-[#F8FAF9] flex items-center justify-center overflow-hidden">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="Logo" className="object-contain w-full h-full p-1" />
            ) : (
              <span className="text-xs text-[#5F6B66]">Sem logo</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-[#D7E2DD] text-[#5F6B66] hover:bg-[#F8FAF9] disabled:opacity-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? "Enviando..." : "Enviar logo"}
            </button>
            {logo && (
              <button
                type="button"
                onClick={() => setLogo("")}
                className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remover
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-[#5F6B66]">PNG, JPG, SVG ou WebP — máx. 2MB. Recomendado: fundo transparente.</p>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
      </div>

      {/* Cores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Cor principal</p>
          <p className="text-xs text-[#5F6B66]">Header, botões e destaques</p>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="w-10 h-10 rounded-lg border border-[#D7E2DD] cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              maxLength={7}
              className="w-28 px-3 py-1.5 rounded-lg border border-[#D7E2DD] text-sm font-mono text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Cor de destaque</p>
          <p className="text-xs text-[#5F6B66]">Fundos suaves e hover</p>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              className="w-10 h-10 rounded-lg border border-[#D7E2DD] cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              maxLength={7}
              className="w-28 px-3 py-1.5 rounded-lg border border-[#D7E2DD] text-sm font-mono text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-lg border border-[#D7E2DD] overflow-hidden">
        <div className="px-4 py-2 flex items-center gap-3" style={{ backgroundColor: primary }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="Logo preview" className="object-contain h-6 w-auto max-w-[100px]" />
          ) : (
            <span className="text-sm font-bold text-white">Sua Empresa</span>
          )}
          <span className="text-xs opacity-70 text-white">Canal de Denúncias</span>
        </div>
        <div className="px-4 py-3 flex gap-3" style={{ backgroundColor: secondary }}>
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: primary }}>
            Botão primário
          </div>
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ borderColor: primary, color: primary }}>
            Botão secundário
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {msg && <p className="text-sm text-green-700">{msg}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-60 transition-colors"
        style={{ backgroundColor: primary }}
      >
        {saving ? "Salvando..." : "Salvar personalização"}
      </button>
    </div>
  )
}
