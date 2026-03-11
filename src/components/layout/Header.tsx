import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center p-1.5 bg-brand-primary rounded-lg">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-primary">Integrare</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-foreground">
          <Link href="#solucao" className="hover:text-brand-accent transition-colors">A Solução</Link>
          <Link href="#como-funciona" className="hover:text-brand-accent transition-colors">Como Funciona</Link>
          <Link href="#planos" className="hover:text-brand-accent transition-colors">Planos</Link>
          <Link href="/canal" className="text-brand-accent hover:text-brand-primary transition-colors font-semibold">Fazer Denúncia</Link>
        </nav>
        <div className="flex items-center gap-4 shrink-0">
          <Link href="#contato" className="hidden md:inline-flex">
            <Button variant="outline" className="h-9 font-semibold text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-white">Falar com Consultor</Button>
          </Link>
          <Link href="/canal/acompanhar">
            <Button className="h-9">Acompanhar Relato</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
