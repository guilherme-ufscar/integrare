"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
        body: JSON.stringify({ email, password })
      })

      const result = await res.json()
      if (result.success) {
        window.location.href = "/admin/dashboard"
      } else {
        setErrorMsg(result.error || "Acesso negado")
      }
    } catch (err) {
      setErrorMsg("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center p-2 bg-brand-primary rounded-xl">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-brand-primary">Integrare</span>
          </div>
        </div>
        
        <Card className="border-border shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-brand-secondary">Painel Administrativo</CardTitle>
            <CardDescription>Acesso restrito ao comitê de ética.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {errorMsg && (
              <div className="bg-danger/10 text-danger p-3 rounded-lg text-sm flex gap-2 items-center mb-6">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail Corporativo</Label>
                <Input id="email" name="email" type="email" required placeholder="admin@integrarecorp.com.br" />
              </div>
              <div className="space-y-2 text-right">
                <div className="flex justify-between items-center text-sm">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-brand-accent hover:underline text-xs">Esqueceu a senha?</a>
                </div>
                <Input id="password" name="password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-4 h-11 bg-brand-primary">
                {loading ? "Autenticando..." : "Entrar no Painel"}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted">
              Para acessar o MVP em produção, use:<br/>
              <b>admin@integrarecorp.com.br</b> / <b>CoderMaster2026</b>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
