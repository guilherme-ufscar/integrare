import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Search } from "lucide-react"
import Link from "next/link"

export default function CanalEntryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">Canal de Relacionamento</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Este é um ambiente isolado, seguro e operado por especialistas independentes. 
          Garantimos o sigilo absoluto da sua identidade, caso deseje relatar de forma anônima.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col h-full border-border hover:border-brand-accent transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-danger/10 text-danger rounded-lg flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Fazer um Relato</CardTitle>
            <CardDescription className="text-base mt-2">
              Utilize esta opção para relatar condutas antiéticas, assédio, fraudes, corrupção ou descumprimento de normas.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end">
            <ul className="text-sm text-muted space-y-2 mb-6 ml-4 list-disc marker:text-brand-accent">
              <li>Pode ser feito 100% de forma anônima.</li>
              <li>Não rastreamos seu IP ou dispositivo.</li>
              <li>Você receberá um protocolo único no final.</li>
            </ul>
            <Link href="/canal/nova-denuncia">
              <Button className="w-full h-12 text-base" variant="default">
                Iniciar Novo Relato
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full border-border hover:border-brand-accent transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-brand-surface text-brand-primary rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Acompanhar Relato</CardTitle>
            <CardDescription className="text-base mt-2">
              Utilize esta opção se você já fez um relato e possui o número do protocolo e a chave de acesso.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end">
            <ul className="text-sm text-muted space-y-2 mb-6 ml-4 list-disc marker:text-brand-accent">
              <li>Veja o andamento e o status do caso.</li>
              <li>Responda perguntas do comitê de forma segura.</li>
              <li>Anexe novas evidências se necessário.</li>
            </ul>
            <Link href="/canal/acompanhar">
              <Button className="w-full h-12 text-base" variant="outline">
                Acompanhar Protocolo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
