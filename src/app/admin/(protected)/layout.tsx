import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, LogOut, ShieldCheck, FileText } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession() as any
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-primary text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            <span className="font-bold tracking-tight">Comitê de Ética</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white font-medium">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-surface/40 cursor-not-allowed">
            <FileText className="w-4 h-4" /> Relatórios (Em Breve)
          </div>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-sm font-bold">
              {session.name?.charAt(0) || "A"}
            </div>
            <div className="text-sm">
              <p className="font-medium truncate max-w-[140px]">{session.email}</p>
              <p className="text-xs text-white/60">{session.role}</p>
            </div>
          </div>
          <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-danger/20 text-danger hover:text-danger-foreground transition-colors w-full text-left">
            <LogOut className="w-4 h-4" /> Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-border flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-semibold text-brand-secondary">Visão Geral</h2>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>Integrare Compliance</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
