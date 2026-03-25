"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { ShieldCheck, Check, ChevronRight, AlertCircle, Lock } from "lucide-react"
import { PLAN_INFO, getPlanPrice } from "@/lib/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: "#1E2421",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: { color: "#B94141" },
  },
}

function CheckoutForm({ plan, planInfo }: { plan: string; planInfo: typeof PLAN_INFO[string] }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [employees, setEmployees] = useState(50)
  const [currentPrice, setCurrentPrice] = useState(planInfo.tiers[0].price)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    setCurrentPrice(getPlanPrice(plan, employees))
  }, [employees, plan])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!stripe || !elements) return
    if (!accepted) {
      setError("Aceite os Termos de Uso e a Política de Privacidade para continuar.")
      return
    }

    setLoading(true)
    setError("")

    const form = e.currentTarget
    const data = {
      name: (form.querySelector('[name="name"]') as HTMLInputElement).value,
      companyName: (form.querySelector('[name="companyName"]') as HTMLInputElement).value,
      phone: (form.querySelector('[name="phone"]') as HTMLInputElement).value,
      email: (form.querySelector('[name="email"]') as HTMLInputElement).value,
      password: (form.querySelector('[name="password"]') as HTMLInputElement).value,
      employees: Number(employees),
      plan,
    }

    try {
      // 1. Criar PaymentMethod com os dados do cartão
      const cardNumber = elements.getElement(CardNumberElement)
      if (!cardNumber) throw new Error("Erro nos campos do cartão.")

      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: { name: data.name, email: data.email },
      })

      if (pmError) {
        setError(pmError.message || "Erro no cartão.")
        setLoading(false)
        return
      }

      // 2. Enviar para API de checkout
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, paymentMethodId: paymentMethod!.id }),
      })

      const result = await res.json()
      if (!res.ok) {
        setError(result.error || "Erro ao processar assinatura.")
        setLoading(false)
        return
      }

      // 3. Confirmar pagamento se necessário (3D Secure)
      if (result.clientSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(result.clientSecret)
        if (confirmError) {
          setError(confirmError.message || "Pagamento recusado.")
          setLoading(false)
          return
        }
      }

      // 4. Redirecionar para o painel autenticado
      window.location.href = "/painel"
    } catch (err: any) {
      setError(err.message || "Erro inesperado. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const tierLabel = employees <= 50 ? "até 50 func." : employees <= 150 ? "51–150 func." : "151–300 func."

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Coluna esquerda — resumo do plano */}
      <div className="bg-[#123C33] rounded-2xl p-8 text-white space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-white/50 font-medium">Plano selecionado</span>
          <h2 className="text-2xl font-bold mt-1">{planInfo.label}</h2>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-sm text-white/60 mb-1">Cobrança mensal — {tierLabel}</p>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold">
              R$ {currentPrice.toLocaleString("pt-BR")}
            </span>
            <span className="text-white/60 text-sm mb-1">/mês</span>
          </div>
        </div>

        <ul className="space-y-2.5">
          {planInfo.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
              <Check className="w-4 h-4 text-[#1F6B57] shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {planInfo.setup > 0 && (
          <div className="border-t border-white/10 pt-4 text-sm text-white/60">
            Taxa de setup: R$ {planInfo.setup.toLocaleString("pt-BR")}
          </div>
        )}

        <div className="border-t border-white/10 pt-4 flex items-center gap-2 text-xs text-white/40">
          <Lock className="w-3.5 h-3.5" />
          Pagamento seguro via Stripe. Cancele quando quiser.
        </div>
      </div>

      {/* Coluna direita — formulário */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-[#1E2421]">Dados do responsável</h3>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Nome completo *</label>
            <input name="name" required className="input-field" placeholder="João Silva" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Nome da empresa *</label>
            <input name="companyName" required className="input-field" placeholder="Empresa Ltda." />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Telefone *</label>
            <input name="phone" required type="tel" className="input-field" placeholder="(11) 99999-0000" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Nº de colaboradores *</label>
            <select
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="input-field"
            >
              <option value={50}>Até 50</option>
              <option value={150}>51 a 150</option>
              <option value={300}>151 a 300</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">E-mail (será seu login) *</label>
            <input name="email" required type="email" className="input-field" placeholder="voce@empresa.com.br" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1E2421] mb-1.5">Senha (mín. 8 caracteres) *</label>
            <input name="password" required type="password" minLength={8} className="input-field" placeholder="••••••••" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#1E2421] mb-3">Dados do cartão</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-[#5F6B66] mb-1.5">Número do cartão</label>
              <div className="input-field">
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#5F6B66] mb-1.5">Validade</label>
                <div className="input-field">
                  <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#5F6B66] mb-1.5">CVC</label>
                <div className="input-field">
                  <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 accent-[#123C33]"
          />
          <span className="text-xs text-[#5F6B66] leading-relaxed">
            Li e aceito os{" "}
            <Link href="/termos" target="_blank" className="text-[#123C33] underline">Termos de Uso</Link>{" "}
            e a{" "}
            <Link href="/privacidade" target="_blank" className="text-[#123C33] underline">Política de Privacidade</Link>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full py-3 bg-[#123C33] text-white font-semibold rounded-lg hover:bg-[#0D2E27] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            "Processando..."
          ) : (
            <>
              Assinar por R$ {currentPrice.toLocaleString("pt-BR")}/mês
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-xs text-center text-[#5F6B66]">
          Cobrança mensal recorrente. Cancele quando quiser pelo painel.
        </p>
      </div>
    </form>
  )
}

export default function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = use(params)
  const planInfo = PLAN_INFO[plan]

  if (!planInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E2421]">Plano não encontrado</h1>
          <Link href="/#planos" className="mt-4 inline-block text-[#123C33] underline">
            Ver planos disponíveis
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center p-1.5 bg-[#123C33] rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#123C33] text-lg">Integrare</span>
          </Link>
          <div className="flex items-center gap-1 text-xs text-[#5F6B66]">
            <Lock className="w-3.5 h-3.5" />
            Checkout seguro
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#D7E2DD] shadow-xl p-8">
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} planInfo={planInfo} />
          </Elements>
        </div>
      </div>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #D7E2DD;
          border-radius: 8px;
          font-size: 14px;
          color: #1E2421;
          background: white;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input-field:focus {
          border-color: #123C33;
          box-shadow: 0 0 0 3px rgba(18, 60, 51, 0.1);
        }
        select.input-field {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235F6B66' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 36px;
        }
      `}</style>
    </div>
  )
}
