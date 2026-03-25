"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShieldCheck, AlertCircle, Info } from "lucide-react"

export default function ClientLoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const searchParams = useSearchParams()
  const blocked = searchParams.get("blocked")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await fetch("/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await res.json()
      if (result.success) {
        window.location.href = "/painel"
      } else {
        setErrorMsg(result.error || "Credenciais inválidas.")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 bg-[#123C33] rounded-xl">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#123C33]">Integrare</span>
          </Link>
        </div>

        {/* Blocked warning */}
        {blocked && (
          <div className="mb-4 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Sua assinatura está suspensa ou com pagamento pendente. Regularize para acessar o painel.</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#D7E2DD] shadow-xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-[#1E2421]">Acesso ao Painel</h1>
            <p className="text-sm text-[#5F6B66] mt-1">Faça login com as credenciais da sua empresa</p>
          </div>

          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1E2421] mb-1.5">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 border border-[#D7E2DD] rounded-lg text-sm text-[#1E2421] placeholder-[#5F6B66] focus:outline-none focus:ring-2 focus:ring-[#123C33]/30 focus:border-[#123C33]"
                placeholder="seu@email.com.br"
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
                autoComplete="current-password"
                className="w-full px-3 py-2.5 border border-[#D7E2DD] rounded-lg text-sm text-[#1E2421] placeholder-[#5F6B66] focus:outline-none focus:ring-2 focus:ring-[#123C33]/30 focus:border-[#123C33]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#123C33] text-white font-semibold rounded-lg hover:bg-[#0D2E27] disabled:opacity-60 transition-colors text-sm"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#5F6B66]">
            Não tem uma conta?{" "}
            <Link href="/#planos" className="text-[#123C33] font-medium hover:underline">
              Conheça os planos
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
