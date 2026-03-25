import Link from "next/link"
import Image from "next/image"
import { ShieldCheck } from "lucide-react"

export default function CanalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-[#123C33]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/">
            <Image src="/files/logo.svg" alt="Integrare" width={120} height={32} className="brightness-0 invert" priority />
          </Link>
          <div className="flex items-center text-sm font-medium text-white/80">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
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
