import { getClientSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FolderOpen, Settings, LogOut, ShieldCheck, BarChart2 } from "lucide-react"

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const session = await getClientSession() as any
  if (!session) redirect("/login")
  if (session.companyStatus !== "ACTIVE") redirect("/login?blocked=1")

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#123C33] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-5 border-b border-white/10">
          <Link href="/painel/dashboard" className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#EAF4F0]" />
            <span className="font-bold tracking-tight text-sm truncate max-w-[140px]">
              {session.companyName}
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          <SidebarLink href="/painel/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
          <SidebarLink href="/painel/casos" icon={<FolderOpen className="w-4 h-4" />} label="Casos" />
          <SidebarLink href="/painel/relatorios" icon={<BarChart2 className="w-4 h-4" />} label="Relatórios" />
          <SidebarLink href="/painel/configuracoes" icon={<Settings className="w-4 h-4" />} label="Configurações" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm font-medium truncate">{session.name}</p>
            <p className="text-xs text-white/50 truncate">{session.email}</p>
          </div>
          <form action="/api/client/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-300 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-[#D7E2DD] flex items-center px-8 justify-between shrink-0">
          <h2 className="text-base font-semibold text-[#1E2421]">Canal de Denúncias</h2>
          <Link
            href={`/canal/${session.companySlug || ""}`}
            className="text-xs text-[#123C33] hover:underline"
            target="_blank"
          >
            Ver canal público →
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm"
    >
      {icon}
      {label}
    </Link>
  )
}
