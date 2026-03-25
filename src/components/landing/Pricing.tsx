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
      waMessage: "Olá! Tenho interesse no *Plano Básico* da Integrare. Gostaria de falar com um consultor.",
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
      waMessage: "Olá! Tenho interesse no *Plano Intermediário* da Integrare. Gostaria de falar com um consultor.",
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
      waMessage: "Olá! Tenho interesse no *Plano Compliance 360°* da Integrare. Gostaria de falar com um consultor.",
    },
  ]

  return (
    <section className="py-24 bg-white" id="planos">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2421] mb-4">
            A maturidade que o seu negócio exige
          </h2>
          <p className="text-lg text-[#5F6B66]">
            Soluções modeladas para a realidade da sua empresa, escaláveis e projetadas
            para acompanhar o crescimento do seu departamento de compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col rounded-2xl border bg-white overflow-hidden ${
                plan.popular
                  ? "border-[#123C33] shadow-2xl shadow-emerald-900/10 scale-105 z-10"
                  : "border-[#D7E2DD]"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#123C33] text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  O Mais Escolhido
                </div>
              )}

              <div className="p-6 border-b border-[#D7E2DD]">
                <h3 className="text-xl font-bold text-[#1E2421] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#5F6B66] min-h-[40px]">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-xs text-[#5F6B66] uppercase tracking-wider">A partir de</span>
                  <div className="text-3xl font-bold text-[#123C33] mt-1">
                    {plan.priceFrom}
                    <span className="text-base font-normal text-[#5F6B66]">/mês</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 text-sm text-[#1E2421]">
                      <Check className="w-5 h-5 text-[#1E8E5A] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-[#D7E2DD]">
                  <p className="text-xs text-[#5F6B66] italic leading-relaxed">* {plan.obs}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex flex-col gap-3">
                <Link
                  href={`/checkout/${plan.checkoutSlug}`}
                  className={`block w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    plan.popular
                      ? "bg-[#123C33] text-white hover:bg-[#0D2E27]"
                      : "border-2 border-[#123C33] text-[#123C33] hover:bg-[#123C33] hover:text-white"
                  }`}
                >
                  Assinar agora
                </Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(plan.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-sm text-[#5F6B66] hover:text-[#123C33] transition-colors py-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Prefere falar com consultor?
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-lg mx-auto bg-[#EAF4F0] p-6 rounded-2xl border border-[#D7E2DD]">
          <h4 className="font-semibold text-[#1E2421] mb-2">Serviços e Add-ons</h4>
          <p className="text-sm text-[#5F6B66]">
            Integração via API (ERP e RH), Segundo Idioma (EN, ES), Treinamentos Adicionais e
            elaboração do seu Código de Ética e Conduta.
          </p>
        </div>
      </div>
    </section>
  )
}
