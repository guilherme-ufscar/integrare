import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

// Faixas de colaboradores
// 1: até 50 | 2: 51-150 | 3: 151-300
export function getEmployeeTier(numEmployees: number): 1 | 2 | 3 {
  if (numEmployees <= 50) return 1
  if (numEmployees <= 150) return 2
  return 3
}

// Mapeia plan + tier para priceId do Stripe (configurar IDs reais no .env)
export function getPriceId(plan: string, tier: 1 | 2 | 3): string {
  const key = `STRIPE_PRICE_${plan.toUpperCase().replace("-", "_")}_TIER${tier}` as keyof NodeJS.ProcessEnv
  const priceId = process.env[key]
  if (!priceId) throw new Error(`PriceId não configurado: ${key}`)
  return priceId
}

export const PLAN_INFO: Record<string, {
  label: string
  dbPlan: string
  tiers: { max: number | null; price: number }[]
  features: string[]
  setup: number
}> = {
  basico: {
    label: "Plano Básico",
    dbPlan: "BASICO",
    tiers: [
      { max: 50, price: 290 },
      { max: 150, price: 490 },
      { max: 300, price: 690 },
    ],
    features: [
      "Canal de denúncias white-label",
      "Painel de gestão de casos",
      "Relatórios mensais",
      "Suporte por e-mail",
    ],
    setup: 0,
  },
  intermediario: {
    label: "Plano Intermediário",
    dbPlan: "INTERMEDIARIO",
    tiers: [
      { max: 50, price: 890 },
      { max: 150, price: 1390 },
      { max: 300, price: 1890 },
    ],
    features: [
      "Tudo do Plano Básico",
      "Investigação assistida",
      "Análise de risco",
      "Suporte prioritário",
      "Treinamentos online",
    ],
    setup: 0,
  },
  "compliance-360": {
    label: "Compliance 360°",
    dbPlan: "COMPLIANCE_360",
    tiers: [
      { max: 50, price: 2400 },
      { max: 150, price: 3600 },
      { max: 300, price: 5000 },
    ],
    features: [
      "Tudo do Plano Intermediário",
      "Gestão completa de compliance",
      "DPO como serviço",
      "Assessoria jurídica inclusa",
      "Relatórios regulatórios",
      "SLA garantido 99.9%",
    ],
    setup: 0,
  },
}

export function getPlanPrice(plan: string, numEmployees: number): number {
  const info = PLAN_INFO[plan]
  if (!info) throw new Error("Plano inválido")
  const tier = getEmployeeTier(numEmployees)
  return info.tiers[tier - 1].price
}
