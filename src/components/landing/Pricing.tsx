import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, MessageCircle } from "lucide-react"
import Link from "next/link"

const WA_NUMBER = "5586999210196"

export function Pricing() {
  const plans = [
    {
      name: "Plano Básico",
      description: "Ideal para empresas com RH ou Jurídico já estruturado.",
      features: [
        "Portal anônimo criptografado",
        "Protocolo único por relato",
        "Painel do cliente — Gestão de Casos",
        "Chat assíncrono para apuração",
        "Upload protegido de evidências",
        "Relatório mensal",
      ],
      obs: "Caberá à sua empresa a triagem, investigação e decisão.",
      priceFrom: "R$ 290",
      checkoutSlug: "basico",
      popular: false,
      waMessage: "Olá! Tenho interesse no *Plano Básico* da Integrare. Gostaria de falar com um consultor."
    },
    {
      name: "Plano Intermediário",
      description: "Perfeito para médias empresas que precisam de apoio na triagem.",
      features: [
        "Tudo do Plano Básico",
        "Triagem e categorização dos casos",
        "Classificação técnica da gravidade",
        "Indicação primária de encaminhamento",
        "Relatório analítico com gráficos e alertas",
        "Reuniões de Governança mensais",
      ],
      obs: "Triagem pela Integrare. Decisão permanece no cliente.",
      priceFrom: "R$ 890",
      checkoutSlug: "intermediario",
      popular: true,
      waMessage: "Olá! Tenho interesse no *Plano Intermediário* da Integrare. Gostaria de falar com um consultor."
    },
    {
      name: "Compliance 360°",
      description: "Para governança completa com apoio estratégico.",
      features: [
        "Tudo do Plano Intermediário",
        "Gestão superior de casos",
        "Parecer jurídico-trabalhista nos relatos",
        "Recomendação formal de medidas corretivas",
        "Desenvolvimento do Código de Ética",
        "Relatório trimestral executivo",
        "Relatos ilimitados",
      ],
      obs: "Suporte constante para redução ativa do passivo.",
      priceFrom: "R$ 2.400",
      checkoutSlug: "compliance-360",
      popular: false,
      waMessage: "Olá! Tenho interesse no *Plano Compliance 360°* da Integrare. Gostaria de falar com um consultor."
    }
  ]

  return (
    <section className="py-24 bg-white" id="planos">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">
            A maturidade que o seu negócio exige
          </h2>
          <p className="text-lg text-muted">
            Soluções modeladas para a realidade da sua empresa, escaláveis e projetadas
            para acompanhar o crescimento do seu departamento de compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative flex flex-col h-full ${
                plan.popular
                  ? "border-brand-primary shadow-emerald-900/10 shadow-2xl scale-105 z-10"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  O Mais Escolhido
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="h-10 text-brand-secondary/80">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-xs text-muted uppercase tracking-wider">A partir de</span>
                  <div className="text-3xl font-bold text-brand-primary mt-1">
                    {plan.priceFrom}
                    <span className="text-base font-normal text-muted">/mês</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4 mt-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 text-sm text-foreground">
                      <Check className="w-5 h-5 text-brand-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted mb-4 italic leading-relaxed">* {plan.obs}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {/* Botão principal — checkout */}
                <Link href={`/checkout/${plan.checkoutSlug}`} className="block w-full">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Assinar agora
                  </Button>
                </Link>
                {/* Botão secundário — WhatsApp */}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(plan.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-sm text-muted hover:text-brand-primary transition-colors py-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Prefere falar com consultor?
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center max-w-lg mx-auto bg-brand-surface p-6 rounded-2xl border border-border">
          <h4 className="font-semibold text-brand-secondary mb-2">Serviços e Add-ons</h4>
          <p className="text-sm text-muted">
            Integração via API (ERP e RH), Segundo Idioma (EN, ES), Treinamentos Adicionais e
            elaboração do seu Código de Ética e Conduta.
          </p>
        </div>
      </div>
    </section>
  )
}
