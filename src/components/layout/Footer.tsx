import Link from "next/link"
import Image from "next/image"
import { Lock, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-brand-primary text-brand-surface py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image 
                src="/files/logo.svg" 
                alt="Integrare Compliance" 
                width={160} 
                height={40} 
                className="h-8 w-auto brightness-0 invert" // This CSS trick forces any colored SVG to render as pure white!
              />
            </Link>
            <p className="text-sm text-brand-surface/80 leading-relaxed mb-6">
              Plataforma digital especializada em Canais de Denúncias parcerias corporativas, com foco em segurança, compliance e adequação legal.
            </p>
            <div className="flex items-center gap-2 text-sm text-brand-surface/80">
              <Lock className="w-4 h-4 text-brand-accent" />
              <span>Ambiente 100% Seguro</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Plataforma</h4>
            <ul className="space-y-3 text-sm text-brand-surface/80">
              <li><Link href="#solucao" className="hover:text-white transition-colors">A Solução</Link></li>
              <li><Link href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link></li>
              <li><Link href="#planos" className="hover:text-white transition-colors">Planos e Preços</Link></li>
              <li><Link href="/admin/login" className="hover:text-white transition-colors">Painel Administrativo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Canal de Denúncias</h4>
            <ul className="space-y-3 text-sm text-brand-surface/80">
              <li><Link href="/canal" className="text-brand-surface font-semibold hover:text-white transition-colors">Relatar um Incidente</Link></li>
              <li><Link href="/canal/acompanhar" className="hover:text-white transition-colors">Acompanhar Protocolo</Link></li>
              <li><Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contato Comercial</h4>
            <ul className="space-y-3 text-sm text-brand-surface/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@integrarecorp.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(11) 4000-0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-brand-surface/60">
          <p>© {new Date().getFullYear()} Integrare Compliance. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/termos" className="hover:text-white transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
