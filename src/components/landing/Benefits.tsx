import { CheckCircle2 } from "lucide-react"

export function Benefits() {
  const benefits = [
    "Assessoria e especialização em compliance e leis trabalhistas.",
    "Adequação rigorosa aos princípios de Privacy by Design (LGPD).",
    "Implantação rápida com URL exclusiva e identidade da sua empresa.",
    "Relatórios que orientam a liderança, em vez de apenas listar dados.",
    "Parceiro consultivo experiente focado no relacionamento de longo prazo.",
    "Eliminação completa do conflito de interesses na triagem dos relatos."
  ]

  return (
    <section className="py-24 bg-brand-surface border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-6 leading-tight">
              Os diferenciais competitivos da Integrare.
            </h2>
            <p className="text-lg text-muted mb-8">
              Contratar a Integrare não é assinar um software genérico. É contar com uma 
              operação jurídica madura e especialistas que preparam a base de governança 
              que sua empresa necessita.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-3 text-brand-secondary items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="rounded-2xl overflow-hidden bg-brand-primary p-12 text-center text-white relative shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-bold mb-4">Mais Segurança para o Denunciante</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                Colaboradores preferem canais externos. Um estudo aponta que plataformas independentes 
                aumentam a taxa de incidentes reportados em até 50%, antecipando ações judiciais e 
                cortando custos ocultos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
