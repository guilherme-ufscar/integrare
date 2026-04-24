"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Building2 } from "lucide-react"

export default function NovaEmpresa() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    plan: "BASICO",
    userName: "",
    userEmail: "",
    userPassword: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Erro ao criar empresa.")
        return
      }

      router.push(`/admin/empresas/${data.company.id}`)
    } catch {
      setError("Erro ao conectar com o servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/empresas" className="flex items-center gap-1 text-sm text-[#5F6B66] hover:text-[#123C33]">
          <ArrowLeft className="w-4 h-4" /> Empresas
        </Link>
        <span className="text-[#D7E2DD]">/</span>
        <span className="text-sm font-medium text-[#1E2421]">Nova Empresa</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#EAF4F0] flex items-center justify-center">
          <Building2 className="w-5 h-5 text-[#123C33]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E2421]">Nova Empresa</h1>
          <p className="text-sm text-[#5F6B66]">Crie uma empresa e seu primeiro usuário administrador</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Dados da empresa */}
        <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-4">
          <h2 className="font-semibold text-[#1E2421]">Dados da Empresa</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Nome da empresa *</label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
              placeholder="Ex: Acme Ltda"
              className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">E-mail corporativo *</label>
              <input
                name="companyEmail"
                type="email"
                value={form.companyEmail}
                onChange={handleChange}
                required
                placeholder="contato@empresa.com"
                className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Telefone</label>
              <input
                name="companyPhone"
                value={form.companyPhone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Plano *</label>
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33] bg-white"
            >
              <option value="BASICO">Básico</option>
              <option value="INTERMEDIARIO">Intermediário</option>
              <option value="COMPLIANCE_360">Compliance 360°</option>
            </select>
          </div>
        </div>

        {/* Usuário administrador */}
        <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-[#1E2421]">Usuário Administrador</h2>
            <p className="text-xs text-[#5F6B66] mt-0.5">Este usuário terá perfil MANAGER e poderá acessar o painel da empresa.</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Nome completo *</label>
            <input
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
              placeholder="João Silva"
              className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">E-mail de acesso *</label>
              <input
                name="userEmail"
                type="email"
                value={form.userEmail}
                onChange={handleChange}
                required
                placeholder="joao@empresa.com"
                className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-[#5F6B66] uppercase tracking-wide">Senha *</label>
              <input
                name="userPassword"
                type="password"
                value={form.userPassword}
                onChange={handleChange}
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full px-3 py-2 rounded-lg border border-[#D7E2DD] text-sm text-[#1E2421] focus:outline-none focus:ring-2 focus:ring-[#123C33]/20 focus:border-[#123C33]"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-[#123C33] text-white text-sm font-medium hover:bg-[#1a5244] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Criando..." : "Criar empresa"}
          </button>
          <Link
            href="/admin/empresas"
            className="px-6 py-2.5 rounded-lg border border-[#D7E2DD] text-sm text-[#5F6B66] hover:bg-[#F8FAF9] transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
