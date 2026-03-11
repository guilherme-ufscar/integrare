"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from "lucide-react"

import { useState } from "react"

export function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        alert("Mensagem enviada com sucesso! Um consultor entrará em contato.")
        e.currentTarget.reset()
      } else {
        alert("Houve um erro no envio. Tente novamente mais tarde.")
      }
    } catch {
      alert("Houve um erro crítico. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-background border-t border-border" id="contato">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 justify-between max-w-6xl mx-auto">
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4 leading-tight">
              Fale com a Equipe de Atendimento Integrare
            </h2>
            <p className="text-lg text-muted mb-8">
              Converse com especialistas. Vamos avaliar o momento jurídico da sua empresa e propor 
              o melhor setup do Canal de Denúncias, protegendo seu ambiente e minimizando riscos 
              regulatórios.
            </p>
            <div className="flex gap-4 items-start mb-6">
              <ShieldCheck className="w-6 h-6 text-brand-accent shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-brand-secondary">Seus dados estão seguros</h4>
                <p className="text-sm text-muted">A Integrare nunca compartilhará suas informações. O tratamento obedece nossa Política de Privacidade segundo a LGPD.</p>
              </div>
            </div>
          </div>

          <div className="md:w-[45%]">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-border">
              <h3 className="text-xl font-bold text-brand-secondary mb-6">Solicitar Demonstração</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" required placeholder="João da Silva" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" name="company" required placeholder="Sua Empresa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Colaboradores</Label>
                    <Input id="size" name="size" type="number" min="1" placeholder="Ex: 50" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail Corporativo</Label>
                    <Input id="email" name="email" type="email" required placeholder="joao@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone / WhatsApp</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="(11) 90000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Como podemos ajudar?</Label>
                  <Textarea id="message" name="message" required placeholder="Gostaria de conhecer os planos..." className="h-24 resize-none" />
                </div>

                <Button type="submit" className="w-full h-11 text-base mt-4" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </Button>
                
                <p className="text-xs text-muted text-center pt-2">
                  Ao enviar, concordo com os Termos de Uso.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
