"use client"

import { useState } from "react"
import { Ban, CheckCircle2 } from "lucide-react"

export function CompanyActions({ companyId, currentStatus }: { companyId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const updateStatus = async (newStatus: string) => {
    setLoading(true)
    setMsg("")
    try {
      const res = await fetch(`/api/admin/companies/${companyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus(newStatus)
        setMsg(`Status atualizado para ${newStatus}`)
      } else {
        setMsg(data.error || "Erro ao atualizar.")
      }
    } finally {
      setLoading(false)
      setTimeout(() => setMsg(""), 3000)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#D7E2DD] p-6">
      <h2 className="font-semibold text-[#1E2421] mb-4">Ações Administrativas</h2>
      <div className="flex items-center gap-3">
        {status !== "SUSPENDED" && status !== "CANCELLED" && (
          <button
            onClick={() => updateStatus("SUSPENDED")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            <Ban className="w-4 h-4" /> Suspender empresa
          </button>
        )}
        {status === "SUSPENDED" && (
          <button
            onClick={() => updateStatus("ACTIVE")}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-green-300 text-green-700 rounded-lg hover:bg-green-50 disabled:opacity-50 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Reativar empresa
          </button>
        )}
        {msg && <span className="text-sm text-[#5F6B66]">{msg}</span>}
      </div>
    </div>
  )
}
