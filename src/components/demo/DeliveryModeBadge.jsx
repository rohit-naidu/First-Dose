'use client'
import { Syringe, Pill } from 'lucide-react'

export default function DeliveryModeBadge({ mode, size = 'sm' }) {
  const isPen = mode !== 'vial'
  const label = mode === 'vial' ? 'Vial + Syringe' : mode === 'single_dose_pen' ? 'Injection Pen' : 'Multi-dose Pen'

  const Icon = isPen ? Pill : Syringe
  const px = size === 'md' ? 'px-3 py-1.5' : 'px-2 py-0.5'
  const text = size === 'md' ? 'text-xs' : 'text-[11px]'
  const iconSize = size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${px} ${text}`}
      style={{
        background: 'rgba(127,181,201,0.08)',
        border: '1px solid rgba(127,181,201,0.2)',
        color: '#7fb5c9',
      }}
    >
      <Icon className={iconSize} />
      {label}
    </span>
  )
}
