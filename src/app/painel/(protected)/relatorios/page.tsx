import { getClientSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"

export default async function PainelRelatorios() {
  const session = await getClientSession() as any
  if (!session) redirect("/login")

  const companyId = session.companyId as string

  const byCat = await prisma.report.groupBy({
    by: ["category"],
    where: { companyId },
    _count: true,
    orderBy: { _count: { category: "desc" } },
  })

  const bySev = await prisma.report.groupBy({
    by: ["severity"],
    where: { companyId },
    _count: true,
  })

  const byStatus = await prisma.report.groupBy({
    by: ["status"],
    where: { companyId },
    _count: true,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1E2421]">Relatórios</h1>
        <p className="text-sm text-[#5F6B66] mt-1">Análise estatística dos relatos da sua empresa</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatTable title="Por Categoria" rows={byCat.map((r) => ({ label: r.category, count: r._count }))} />
        <StatTable title="Por Gravidade" rows={bySev.map((r) => ({ label: r.severity.replace(/_/g, " "), count: r._count }))} />
        <StatTable title="Por Status" rows={byStatus.map((r) => ({ label: r.status.replace(/_/g, " "), count: r._count }))} />
      </div>
    </div>
  )
}

function StatTable({ title, rows }: { title: string; rows: { label: string; count: number }[] }) {
  const max = Math.max(...rows.map((r) => r.count), 1)
  return (
    <div className="bg-white rounded-xl border border-[#D7E2DD] p-6">
      <h2 className="font-semibold text-[#1E2421] mb-4">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[#5F6B66]">Sem dados ainda.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#1E2421] truncate">{r.label}</span>
                <span className="text-[#5F6B66] font-medium ml-2">{r.count}</span>
              </div>
              <div className="h-1.5 bg-[#EAF4F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#123C33] rounded-full"
                  style={{ width: `${(r.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
