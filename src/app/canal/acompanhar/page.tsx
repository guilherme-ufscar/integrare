"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { KeyRound, Send, ArrowLeft, Clock, MessageSquare, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AcompanharPage() {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [accessKey, setAccessKey] = useState("")

  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    const formData = new FormData(e.currentTarget)
    const formProtocol = formData.get("protocol") as string
    const formKey = formData.get("accessKey") as string

    try {
      const res = await fetch(`/api/reports/${formProtocol}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey: formKey })
      })

      const result = await res.json()
      if (result.success) {
        setReport(result.report)
        setAccessKey(formKey) // store key in memory to authenticate chat messages
      } else {
        setErrorMsg(result.error || "Credenciais inválidas.")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const content = formData.get("message") as string
    
    // Clear textarea immediately for better UX
    const form = e.currentTarget
    form.reset()

    try {
      const res = await fetch(`/api/reports/${report.protocol}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey, content })
      })

      const result = await res.json()
      if (result.success) {
        // Optimistic append, but let's just update from state
        setReport({ ...report, messages: [...report.messages, result.message] })
      }
    } catch (err) {
      alert("Erro ao enviar mensagem.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Scroll to bottom of chat
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [report?.messages])

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md">
        <div className="mb-6">
          <Link href="/canal" className="text-muted hover:text-brand-primary flex items-center text-sm font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </Link>
          <h1 className="text-3xl font-bold text-brand-secondary mb-2">Acompanhe seu Relato</h1>
          <p className="text-muted text-sm">Insira suas credenciais geradas no momento da denúncia.</p>
        </div>

        <Card className="border-border shadow-md">
          <CardHeader className="bg-brand-surface rounded-t-xl pb-4">
            <CardTitle className="text-lg text-brand-primary flex items-center gap-2">
              <KeyRound className="w-5 h-5" /> Autenticação Segura
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {errorMsg && (
              <div className="bg-danger/10 text-danger p-3 rounded-lg text-sm flex gap-2 items-center mb-6">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="protocol">Número do Protocolo</Label>
                <Input id="protocol" name="protocol" required placeholder="Ex: INT-ABCD1234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessKey">Chave de Acesso</Label>
                <Input id="accessKey" name="accessKey" type="password" required placeholder="Insira sua chave" />
              </div>
              <Button type="submit" disabled={loading} className="w-full mt-2 h-11 bg-brand-primary">
                {loading ? "Validando..." : "Acessar Caso"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Formatting date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute:"2-digit"
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
       <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Info */}
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="border-b bg-brand-surface rounded-t-xl pb-4">
              <CardTitle className="text-base">Detalhes do Relato</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs text-muted mb-1">Protocolo</p>
                <p className="font-mono font-semibold text-brand-primary tracking-wider">{report.protocol}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Categoria</p>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  {report.category}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Status Atual</p>
                <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary">
                  {report.status.replace("_", " ")}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">Data de Registro</p>
                <p className="text-sm font-medium flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-50"/> {new Date(report.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content (Chat) */}
        <div className="md:w-2/3 flex flex-col gap-6">
          <Card className="flex-1 flex flex-col overflow-hidden border-border bg-gray-50/30">
            <CardHeader className="bg-white border-b py-4">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-accent" /> Troca de Mensagens e Andamento
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px]">
              
              {/* Initial Report Message */}
              <div className="flex">
                <div className="bg-white border rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm">
                  <p className="text-xs font-semibold text-brand-primary mb-2 flex items-center justify-between">
                    <span>SEU RELATO INICIAL</span>
                    <span className="text-muted font-normal text-[10px] ml-4">{formatDate(report.createdAt)}</span>
                  </p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{report.description}</p>
                </div>
              </div>

              {/* Chat Messages */}
              {report.messages.map((msg: any) => (
                <div key={msg.id} className={`flex ${msg.role === "DENUNCIANTE" ? "justify-start" : "justify-end"}`}>
                  <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${msg.role === "DENUNCIANTE" ? "bg-white border border-border rounded-tl-none" : "bg-brand-primary text-white rounded-tr-none"}`}>
                    <p className={`text-xs font-medium mb-2 flex items-center justify-between ${msg.role === "DENUNCIANTE" ? "text-brand-primary" : "text-white/80"}`}>
                      <span>{msg.role === "DENUNCIANTE" ? "SUA MENSAGEM" : "COMITÊ DE ÉTICA"}</span>
                      <span className={`font-normal text-[10px] ml-4 ${msg.role === "DENUNCIANTE" ? "text-muted" : "text-white/60"}`}>{formatDate(msg.createdAt)}</span>
                    </p>
                    <p className={`text-sm whitespace-pre-wrap ${msg.role === "DENUNCIANTE" ? "text-foreground" : "text-white"}`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </CardContent>
            
            <div className="bg-white p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <Textarea 
                  name="message" 
                  placeholder="Escreva sua mensagem com segurança..." 
                  className="min-h-[60px] max-h-[120px]"
                  required
                />
                <Button type="submit" disabled={loading} className="h-full px-6 bg-brand-primary">
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
