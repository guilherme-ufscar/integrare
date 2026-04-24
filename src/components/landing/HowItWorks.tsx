import { Laptop, PenLine, Key, Search, FileBarChart } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Acesso ao Portal",
      description: "O colaborador entra pelo link ou QR Code fornecido e entende as garantias de sigilo do canal."
    },
    {
      icon: <PenLine className="w-6 h-6" />,
      title: "Formulário Protegido",
      description: "Preenchimento do relato e envio de provas de forma anônima, sem rastros impeditivos."
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Protocolo Único",
      description: "Um protocolo seguro é gerado em tela, fundamental para o prosseguimento da conversa."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Triagem e Gestão",
      description: "O caso é classificado por gravidade, e a equipe atua usando o painel gerencial."
    },
    {
      icon: <FileBarChart className="w-6 h-6" />,
      title: "Resolução e Relatório",
      description: "Análise concluída com registro documentado para evidência de compliance e defesa."
    }
  ]

  return (
    <section className="py-24 bg-white" id="como-funciona">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">
            Como funciona o fluxo?
          </h2>
          <p className="text-lg text-muted">
            Uma experiência quase autoexplicativa. O colaborador relata com facilidade e o gestor decide com clareza.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center mb-6 shadow-lg border-4 border-white">
                  {step.icon}
                </div>
                <h4 className="font-bold text-brand-secondary text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
