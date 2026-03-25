"use client"

import { useState } from "react"
import { ShieldCheck, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await res.json()
      if (result.success) {
        window.location.href = "/admin/dashboard"
      } else {
        setErrorMsg(result.error || "Acesso negado")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <img src="/files/logo.svg" alt="Integrare" className="h-10" />
        </div>

        <div className="bg-white rounded-2xl border border-[#D7E2DD] shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#1E2421]">Painel Administrativo</h1>
            <p className="text-sm text-[#5F6B66] mt-1">Acesso restrito ao comitê de ética.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex gap-2 items-center mb-6 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1E2421] mb-1.5">
                E-mail Corporativo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@integrarecorp.com.br"
                className="w-full px-3 py-2.5 border border-[#D7E2DD] rounded-lg text-sm text-[#1E2421] placeholder-[#9BA8A3] focus:outline-none focus:ring-2 focus:ring-[#123C33]/30 focus:border-[#123C33]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1E2421] mb-1.5">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-[#D7E2DD] rounded-lg text-sm text-[#1E2421] placeholder-[#9BA8A3] focus:outline-none focus:ring-2 focus:ring-[#123C33]/30 focus:border-[#123C33]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#123C33] text-white font-semibold rounded-lg hover:bg-[#0D2E27] disabled:opacity-60 transition-colors text-sm mt-2"
            >
              {loading ? "Autenticando..." : "Entrar no Painel"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#5F6B66] border-t border-[#D7E2DD] pt-4">
            Protegido por criptografia forte e controle de acesso estrito.
          </p>
        </div>
      </div>
    </div>
  )
}
