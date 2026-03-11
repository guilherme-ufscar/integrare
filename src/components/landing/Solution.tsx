import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, UploadCloud, PieChart, Users, KeyRound } from "lucide-react"

export function Solution() {
  return (
    <section className="py-24 bg-background" id="solucao">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-6">
              A Plataforma Integrare
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Não vendemos apenas um software, mas um instrumento de proteção jurídica e governança. 
              Nossa solução é pensada de ponta a ponta para que o denunciante sinta segurança absoluta 
              e a empresa tenha controle absoluto.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <KeyRound className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-secondary text-lg">Protocolo Seguro</h4>
                  <p className="text-muted">Geração de protocolo criptografado único, permitindo acompanhamento do caso e chat totalmente anônimo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <UploadCloud className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-secondary text-lg">Upload de Evidências</h4>
                  <p className="text-muted">Ambiente protegido para envio de documentos, fotos e áudios com varredura completa.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <PieChart className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-secondary text-lg">Painel Gerencial Executivo</h4>
                  <p className="text-muted">Dashboards inteligentes com categorização, triagem e relatórios que realmente ajudam na tomada de decisão.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="relative">
              {/* Decorative elements representing the software */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-accent opacity-20 blur-lg"></div>
              <Card className="relative bg-white shadow-xl border-border/50">
                <CardHeader className="border-b border-border bg-gray-50/50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-base text-brand-secondary">
                    <MessageSquare className="w-4 h-4" />
                    Chat Anônimo (Visão do Gestor)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-brand-surface p-4 rounded-lg rounded-tl-none inline-block max-w-[85%]">
                    <p className="text-sm font-medium text-brand-primary mb-1">Denunciante #81920</p>
                    <p className="text-sm text-foreground">O assédio ocorreu novamente na filial norte ontem à tarde. Anexei as evidências no chamado inicial.</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-brand-primary text-white p-4 rounded-lg rounded-tr-none inline-block max-w-[85%]">
                      <p className="text-sm font-medium text-white/80 mb-1">Comitê de Ética</p>
                      <p className="text-sm">Recebemos o relato e as evidências. Gostaríamos de saber o horário aproximado para averiguação nas câmeras. Seu anonimato está garantido.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
