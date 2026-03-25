import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, LogOut, ShieldCheck, Building2 } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession() as any
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#123C33] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4ADE80]" />
            <span className="font-bold tracking-tight">Admin Master</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link
            href="/admin/empresas"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm transition-colors"
          >
            <Building2 className="w-4 h-4" /> Empresas
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#4ADE80] flex items-center justify-center text-sm font-bold text-[#123C33]">
              {session.name?.charAt(0) || "A"}
            </div>
            <div className="text-sm">
              <p className="font-medium truncate max-w-[140px]">{session.email}</p>
              <p className="text-xs text-white/60">{session.role}</p>
            </div>
          </div>
          <Link
            href="/api/admin/logout"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-[#D7E2DD] flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-semibold text-[#1E2421]">Painel Administrativo</h2>
          <span className="text-sm text-[#5F6B66]">Integrare</span>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
