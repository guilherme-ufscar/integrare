import { AlertTriangle, Scale, ShieldAlert } from "lucide-react"

export function Problem() {
  return (
    <section className="py-24 bg-white" id="problema">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">
            Por que sua empresa precisa de um canal externo?
          </h2>
          <p className="text-lg text-muted">
            A ausência de um canal estruturado gera riscos silenciosos e passivos trabalhistas. Canais internos (como e-mail ou urna) não garantem o anonimato real e inibem relatos fundamentais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-brand-surface border border-border">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-border/50">
              <Scale className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-brand-secondary mb-3">Obrigatoriedade Legal</h3>
            <p className="text-muted leading-relaxed">
              Leis como a 14.457/22, 14.611/23 e a NR-01 (riscos psicossociais) estabelecem novas exigências. Um canal estruturado ajuda você a manter a empresa em conformidade, prevenindo passivos trabalhistas.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-surface border border-border">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-border/50">
              <ShieldAlert className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-brand-secondary mb-3">O Risco da Omissão</h3>
            <p className="text-muted leading-relaxed">
              Omissões diante de assédio, fraudes e desvios impactam o clima organizacional e aumentam multas severas. Você precisa descobrir os problemas antes que eles virem processos.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-surface border border-border">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm border border-border/50">
              <AlertTriangle className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-bold text-brand-secondary mb-3">Falha do Canal Interno</h3>
            <p className="text-muted leading-relaxed">
              Quando a própria empresa gerencia o canal sem uma plataforma blindada, os colaboradores temem retaliações. Um canal terceirizado é a garantia de impessoalidade e sigilo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
