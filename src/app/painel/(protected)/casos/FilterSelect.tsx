"use client"

export function FilterSelect({ value, options, paramName, currentParams }: {
  value: string
  options: { value: string; label: string }[]
  paramName: string
  currentParams: Record<string, string>
}) {
  function handleChange(v: string) {
    const params = new URLSearchParams()
    const merged = { ...currentParams, [paramName]: v, page: "1" }
    Object.entries(merged).forEach(([k, val]) => { if (val) params.set(k, val) })
    window.location.href = `/painel/casos?${params.toString()}`
  }

  return (
    <div className="relative">
      <select
        defaultValue={value}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2 text-sm border border-[#D7E2DD] rounded-lg bg-white text-[#1E2421] focus:outline-none focus:border-[#123C33]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
