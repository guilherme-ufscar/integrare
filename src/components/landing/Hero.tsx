import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Lock, UserX, FileCheck } from "lucide-react"

const WA_HERO_LINK = `https://wa.me/5586999210196?text=${encodeURIComponent("Olá! Gostaria de solicitar uma proposta do Canal de Denúncias da Integrare para a minha empresa.")}`

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-primary text-white pt-24 pb-32">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="max-w-6xl relative z-10 mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-brand-surface text-sm font-medium mb-8">
          <ShieldCheck className="w-4 h-4" />
          <span>Proteja sua empresa. Cumpra a lei.</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
          Canal de Relacionamento Terceirizado, Seguro e 100% Digital
        </h1>

        <p className="text-lg md:text-xl text-brand-surface/90 max-w-2xl mb-10 leading-relaxed">
          Garantia de anonimato, conformidade com a LGPD e respaldo nas Leis 14.457/22, 14.611/23 e NR-01 (riscos psicossociais). Proteja o ambiente corporativo e reduza passivos trabalhistas.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a href={WA_HERO_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white border-0">
              Solicitar Proposta
            </Button>
          </a>
          <Link href="#solucao" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Conheça a Solução
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <Lock className="w-6 h-6 text-brand-surface opacity-80" />
            <span className="text-sm font-medium opacity-90">Criptografia Forte</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <UserX className="w-6 h-6 text-brand-surface opacity-80" />
            <span className="text-sm font-medium opacity-90">Anonimato Real</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-surface opacity-80" />
            <span className="text-sm font-medium opacity-90">Em Conformidade</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FileCheck className="w-6 h-6 text-brand-surface opacity-80" />
            <span className="text-sm font-medium opacity-90">Protocolo Único</span>
          </div>
        </div>
      </div>
    </section>
  )
}
