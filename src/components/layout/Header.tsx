import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getClientSession } from "@/lib/auth"
import { LogIn, LayoutDashboard } from "lucide-react"

export async function Header() {
  const session = await getClientSession() as any

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/files/logo.svg"
            alt="Integrare Compliance"
            width={160}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-foreground">
          <Link href="#solucao" className="hover:text-brand-accent transition-colors">A Solução</Link>
          <Link href="#como-funciona" className="hover:text-brand-accent transition-colors">Como Funciona</Link>
          <Link href="#planos" className="hover:text-brand-accent transition-colors">Planos</Link>
          <Link href="/canal" className="text-brand-accent hover:text-brand-primary transition-colors font-semibold">Fazer Relato</Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/5586999210196?text=${encodeURIComponent("Olá! Gostaria de falar com um consultor da Integrare sobre o Canal de Denúncias.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button variant="outline" className="h-9 font-semibold text-brand-primary border-brand-primary/20 hover:bg-brand-primary hover:text-white">
              Falar com Consultor
            </Button>
          </a>

          {session ? (
            <Link href="/painel">
              <Button className="h-9 flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4" />
                Meu Painel
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="h-9 flex items-center gap-1.5 text-brand-primary hover:bg-brand-surface">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
