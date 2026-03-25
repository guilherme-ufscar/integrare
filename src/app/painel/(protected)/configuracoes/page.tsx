import { getClientSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { stripe, PLAN_INFO } from "@/lib/stripe"

const prisma = new PrismaClient()

export default async function PainelConfiguracoes() {
  const session = await getClientSession() as any
  if (!session) redirect("/login")

  const company = await prisma.company.findUnique({
    where: { id: session.companyId },
    include: { users: { where: { id: session.id } } },
  })
  if (!company) redirect("/login")

  // Buscar status da assinatura no Stripe
  let stripeSubStatus = "—"
  let stripeNextBilling: string | null = null
  if (company.stripeSubscriptionId) {
    try {
      const sub = await stripe.subscriptions.retrieve(company.stripeSubscriptionId) as any
      stripeSubStatus = sub.status
      stripeNextBilling = sub.current_period_end
        ? new Date(sub.current_period_end * 1000).toLocaleDateString("pt-BR")
        : null
    } catch {
      stripeSubStatus = "erro ao buscar"
    }
  }

  const planInfo = Object.values(PLAN_INFO).find((p) => p.dbPlan === company.plan)

  const statusColor: Record<string, string> = {
    ACTIVE: "text-green-700 bg-green-50 border-green-200",
    PENDING: "text-yellow-700 bg-yellow-50 border-yellow-200",
    SUSPENDED: "text-red-700 bg-red-50 border-red-200",
    CANCELLED: "text-gray-600 bg-gray-50 border-gray-200",
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1E2421]">Configurações</h1>
        <p className="text-sm text-[#5F6B66] mt-1">Dados da empresa e informações do plano</p>
      </div>

      {/* Dados da empresa */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-4">
        <h2 className="font-semibold text-[#1E2421]">Dados da Empresa</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Nome" value={company.name} />
          <Info label="Slug do canal" value={company.slug} mono />
          <Info label="E-mail" value={company.email} />
          <Info label="Telefone" value={company.phone || "—"} />
        </div>
        <div className="pt-2">
          <p className="text-xs text-[#5F6B66]">
            Para alterar os dados da empresa, entre em contato com{" "}
            <a href="mailto:suporte@integrarecorp.com.br" className="text-[#123C33] underline">
              suporte@integrarecorp.com.br
            </a>
          </p>
        </div>
      </div>

      {/* Dados do usuário */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-4">
        <h2 className="font-semibold text-[#1E2421]">Meu Usuário</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Nome" value={company.users[0]?.name || session.name} />
          <Info label="E-mail" value={company.users[0]?.email || session.email} />
          <Info label="Perfil" value={company.users[0]?.role || session.role} />
        </div>
      </div>

      {/* Plano e assinatura */}
      <div className="bg-white rounded-xl border border-[#D7E2DD] p-6 space-y-4">
        <h2 className="font-semibold text-[#1E2421]">Plano e Assinatura</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Plano atual" value={planInfo?.label || company.plan} />
          <div>
            <p className="text-xs text-[#5F6B66] mb-1">Status</p>
            <span className={`px-2 py-0.5 rounded-full text-xs border font-medium ${statusColor[company.status] || statusColor.PENDING}`}>
              {company.status}
            </span>
          </div>
          <Info label="Status no Stripe" value={stripeSubStatus} />
          {stripeNextBilling && <Info label="Próxima cobrança" value={stripeNextBilling} />}
        </div>
        <div className="pt-2 border-t border-[#D7E2DD]">
          <p className="text-xs text-[#5F6B66]">
            Para cancelar ou alterar seu plano, entre em contato:{" "}
            <a href="mailto:financeiro@integrarecorp.com.br" className="text-[#123C33] underline">
              financeiro@integrarecorp.com.br
            </a>
          </p>
        </div>
      </div>

      {/* URL do canal */}
      <div className="bg-[#EAF4F0] rounded-xl border border-[#D7E2DD] p-6">
        <h2 className="font-semibold text-[#1E2421] mb-2">URL do seu Canal de Denúncias</h2>
        <code className="text-sm text-[#123C33] bg-white border border-[#D7E2DD] px-3 py-1.5 rounded-lg block w-full">
          {typeof window !== "undefined" ? window.location.origin : "https://integrarecorp.com.br"}/canal/{company.slug}
        </code>
        <p className="text-xs text-[#5F6B66] mt-2">
          Compartilhe esse link com seus colaboradores para que possam fazer denúncias de forma segura e anônima.
        </p>
      </div>
    </div>
  )
}

function Info({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-[#5F6B66] mb-0.5">{label}</p>
      <p className={`text-[#1E2421] ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
    </div>
  )
}
