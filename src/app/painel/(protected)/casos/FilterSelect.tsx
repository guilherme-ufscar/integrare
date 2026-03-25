"use client"

export function FilterSelect({ value, options, buildUrl }: {
  value: string
  options: { value: string; label: string }[]
  buildUrl: (v: string) => string
}) {
  return (
    <div className="relative">
      <select
        defaultValue={value}
        onChange={(e) => { window.location.href = buildUrl(e.target.value) }}
        className="appearance-none pl-3 pr-8 py-2 text-sm border border-[#D7E2DD] rounded-lg bg-white text-[#1E2421] focus:outline-none focus:border-[#123C33]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
