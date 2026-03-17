"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Copy, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NovaDenunciaPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [credentials, setCredentials] = useState({ protocol: "", accessKey: "" })
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      category: formData.get("category"),
      title: formData.get("title") || "",
      description: formData.get("description"),
      dateOccurred: formData.get("dateOccurred") || "",
      location: formData.get("location") || ""
    }

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      const result = await res.json()

      if (result.success) {
        setCredentials({ protocol: result.protocol, accessKey: result.accessKey })
        setSuccess(true)
      } else {
        alert(result.error || "Erro ao criar relato")
      }
    } catch (err) {
      alert("Erro de conexão. Tente novamente.")
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
        <Card className="border-brand-primary shadow-lg text-center p-8">
          <div className="w-16 h-16 bg-brand-surface text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-brand-secondary mb-2">Relato Registrado com Sucesso</h2>
          <p className="text-muted mb-8">
            Guarde as informações abaixo em um local seguro. A Chave de Acesso só será exibida esta vez
            e não poderá ser recuperada se for perdida.
          </p>

          <div className="bg-gray-50 border border-border p-6 rounded-xl mb-6 relative">
            <button 
              onClick={copyCredentials}
              className="absolute top-4 right-4 text-muted hover:text-brand-primary transition-colors flex flex-col items-center"
              title="Copiar dados"
            >
              <Copy className="w-5 h-5" />
              {copied && <span className="text-xs text-brand-primary mt-1 font-medium">Copiado!</span>}
            </button>
            <div className="mb-4 text-left">
              <span className="text-sm font-medium text-muted block mb-1">Número do Protocolo</span>
              <span className="text-2xl font-bold text-brand-secondary tracking-widest">{credentials.protocol}</span>
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-muted block mb-1">Chave de Acesso Pessoal</span>
              <span className="text-xl font-bold text-danger tracking-wider">{credentials.accessKey}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-8">
            <Link href="/">
              <Button variant="outline">Voltar ao Início</Button>
            </Link>
            <Link href={`/canal/acompanhar`}>
              <Button>Acessar Meu Relato Agora</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-secondary mb-2">Novo Relato</h1>
        <p className="text-muted">
          Preencha o formulário abaixo com o máximo de detalhes possível.
          Garantimos o seu anonimato. Não registramos dados de identificação do seu dispositivo.
        </p>
      </div>

      <Card>
        <CardHeader className="bg-brand-surface border-b border-border rounded-t-xl pb-4">
          <CardTitle className="flex items-center gap-2 text-brand-primary text-lg">
            <ShieldCheck className="w-5 h-5" /> Seu Ambiente Seguro
          </CardTitle>
          <CardDescription>
            Os campos marcados com asterisco (*) são obrigatórios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-3">
              <Label htmlFor="category" className="font-semibold text-brand-secondary">Categoria do Relato *</Label>
              <select 
                name="category" 
                id="category" 
                required
                className="flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                <option value="">Selecione uma categoria...</option>
                <option value="Assédio Moral">Assédio Moral</option>
                <option value="Assédio Sexual">Assédio Sexual</option>
                <option value="Corrupção / Suborno">Corrupção / Suborno</option>
                <option value="Discriminação">Discriminação (Raça, Gênero, Religião, etc)</option>
                <option value="Fraude">Fraude ou Desvio Financeiro</option>
                <option value="Conduta Inadequada">Conduta Indevida / Violação de Políticas</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="title" className="font-semibold text-brand-secondary">Título Breve</Label>
              <Input name="title" id="title" placeholder="Ex: Situação ocorrida no setor de vendas..." />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="dateOccurred" className="font-semibold text-brand-secondary">Data Aproximada</Label>
                <Input type="date" name="dateOccurred" id="dateOccurred" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="location" className="font-semibold text-brand-secondary">Local / Setor</Label>
                <Input name="location" id="location" placeholder="Ex: Filial Sul, Departamento Pessoal" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="font-semibold text-brand-secondary">Descrição Detalhada *</Label>
              <p className="text-xs text-muted mb-2">Descreva o que ocorreu, quem esteve envolvido, onde e quando aconteceu. Quanto mais dados fáticos, melhor poderemos apurar.</p>
              <Textarea 
                name="description" 
                id="description" 
                required 
                className="h-40 resize-none font-normal" 
                placeholder="Detalhe o ocorrido aqui..."
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 text-amber-900 mt-6">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Aviso Final sobre Identificação</p>
                <p>Se você deseja permanecer 100% anônimo, NÃO insira seu nome ou e-mail na descrição do relato, e exclua os metadados dos arquivos anexados (se houver).</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4 border-t border-border">
              <Link href="/canal">
                <Button variant="ghost" type="button">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={loading} className="px-8 bg-brand-primary hover:bg-brand-secondary text-white">
                {loading ? "Enviando Seguro..." : "Enviar Relato Anonimamente"}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
