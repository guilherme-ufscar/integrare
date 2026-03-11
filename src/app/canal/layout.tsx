import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default function CanalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center p-1.5 bg-brand-primary rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-primary">Integrare</span>
          </Link>
          <div className="flex items-center text-sm font-medium text-muted">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-brand-accent" />
            <span>Ambiente Seguro e Anônimo</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t border-border bg-white text-center text-xs text-muted">
        <p>Plataforma operada de forma independente por Integrare Compliance. Em adequação à LGPD.</p>
      </footer>
    </div>
  )
}
