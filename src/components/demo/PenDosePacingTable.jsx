'use client'
import { CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react'

function statusIcon(status) {
  if (status === 'completed') return <CheckCircle className="w-4 h-4" style={{ color: '#7fb5c9' }} />
  if (status === 'approved') return <CheckCircle className="w-4 h-4" style={{ color: '#7fb5c9' }} />
  if (status.includes('hold')) return <AlertCircle className="w-4 h-4" style={{ color: '#c9b896' }} />
  if (status.includes('pending')) return <Clock className="w-4 h-4" style={{ color: '#a99cc4' }} />
  return <Clock className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.35)' }} />
}

function statusColor(status) {
  if (status === 'completed') return {
    bg: 'rgba(127,181,201,0.08)',
    border: 'rgba(127,181,201,0.2)',
    text: '#7fb5c9',
  }
  if (status === 'approved') return {
    bg: 'rgba(127,181,201,0.08)',
    border: 'rgba(127,181,201,0.2)',
    text: '#7fb5c9',
  }
  if (status.includes('hold')) return {
    bg: 'rgba(201,184,150,0.08)',
    border: 'rgba(201,184,150,0.2)',
    text: '#c9b896',
  }
  if (status.includes('pending')) return {
    bg: 'rgba(169,156,196,0.08)',
    border: 'rgba(169,156,196,0.2)',
    text: '#a99cc4',
  }
  return {
    bg: 'rgba(240,244,248,0.04)',
    border: 'rgba(240,244,248,0.1)',
    text: 'rgba(240,244,248,0.45)',
  }
}

export default function PenDosePacingTable({ weeklyPlan, patientName = 'Patient' }) {
  return (
    <div className="glass border-hairline rounded-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-base font-semibold mb-0.5" style={{ color: '#f0f4f8' }}>Pen Dose Schedule</h3>
        <p className="text-xs" style={{ color: 'rgba(240,244,248,0.55)' }}>
          {patientName} is using a fixed-dose prefilled pen — no unit math required.
        </p>
      </div>

      {/* Comparison header */}
      <div className="mx-4 mb-3 rounded-xl overflow-hidden grid grid-cols-2 text-center text-xs font-semibold"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}>
        <div className="py-2 px-3" style={{ background: 'rgba(127,181,201,0.08)', color: '#7fb5c9' }}>First Dose Health Pacing</div>
        <div className="py-2 px-3" style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(240,244,248,0.45)', borderLeft: '1px solid rgba(240,244,248,0.1)' }}>Standard Protocol</div>
      </div>

      {weeklyPlan.map((row, i) => {
        const c = statusColor(row.status)
        const standardDose = i === 0 ? 2.5 : i === 1 ? 5.0 : i === 2 ? 5.0 : 10.0
        const hasHold = row.status.includes('hold')
        return (
          <div key={i} className="mx-4 mb-2 rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${c.border}`,
              boxShadow: hasHold ? `0 0 0 1px rgba(201,184,150,0.3)` : 'none',
            }}>
            <div className="grid grid-cols-2">
              {/* First Dose Health column */}
              <div className="p-3" style={{ background: c.bg }}>
                <div className="flex items-center gap-2 mb-1">
                  {statusIcon(row.status)}
                  <span className="text-xs font-bold" style={{ color: c.text }}>Wk {row.week}</span>
                </div>
                <p className="text-lg font-extrabold" style={{ color: '#f0f4f8' }}>{row.doseMg} mg</p>
                <p className="text-[10px] mt-0.5" style={{ color: c.text }}>{row.status}</p>
              </div>

              {/* Standard column */}
              <div className="p-3" style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(240,244,248,0.08)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: 'rgba(240,244,248,0.2)' }} />
                  <span className="text-xs font-bold" style={{ color: 'rgba(240,244,248,0.35)' }}>Wk {row.week}</span>
                </div>
                <p className="text-lg font-extrabold" style={{
                  color: hasHold && standardDose !== row.doseMg ? '#c97f7f' : 'rgba(240,244,248,0.35)',
                }}>
                  {standardDose} mg
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: 'rgba(240,244,248,0.35)' }}>
                  {hasHold && standardDose !== row.doseMg ? 'jumps — may cause nausea' : 'on schedule'}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Explainer */}
      <div className="mx-4 mb-4 mt-1 rounded-xl p-3" style={{ background: 'rgba(169,156,196,0.08)', border: '1px solid rgba(169,156,196,0.2)' }}>
        <p className="text-xs leading-relaxed" style={{ color: '#a99cc4' }}>
          <span className="font-semibold">Why hold at 2.5 mg?</span> Standard protocols jump from 2.5 mg directly to 5.0 mg.
          First Dose Health holds the dose when mild nausea is detected, giving the body time to adjust before escalating —
          keeping patients on track longer.
        </p>
      </div>
    </div>
  )
}
