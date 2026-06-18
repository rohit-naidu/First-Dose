'use client'
import { useStore } from '@/lib/store'
import { TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react'

export default function RiskReportCard() {
  const riskFlags = useStore((s) => s.riskFlags)

  const accelerators = [
    { key: 'hungryGut', label: 'Hungry gut pattern', desc: 'Persistent hunger despite meals', active: riskFlags.hungryGut },
    { key: 'emotionalEating', label: 'Emotional eating', desc: 'Stress/emotion-triggered eating', active: riskFlags.emotionalEating },
    { key: 'largeMealCapacity', label: 'Large meal capacity', desc: 'High satiety threshold', active: riskFlags.largeMealCapacity },
  ]

  const brakes = [
    { key: 'refluxHistory', label: 'Reflux history', desc: 'Prior GERD increases GI risk', active: riskFlags.refluxHistory },
    { key: 'orthostatic', label: 'Orthostatic risk', desc: 'Dizziness on standing', active: riskFlags.orthostatic },
    { key: 'chairStandRisk', label: 'Muscle strength concern', desc: 'Chair stand difficulty', active: riskFlags.chairStandRisk },
    { key: 'slowBurn', label: 'Slow metabolizer', desc: 'Slower dose response', active: riskFlags.slowBurn },
  ]

  const activeAccelerators = accelerators.filter((a) => a.active)
  const activeBrakes = brakes.filter((b) => b.active)

  return (
    <div className="glass border-hairline rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(240,244,248,0.1)' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-2.5"
        style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(127,181,201,0.12)' }}>
          <ShieldCheck className="w-4 h-4" style={{ color: '#7fb5c9' }} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ink">Risk Profile</h3>
          <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>Intake-derived clinical flags</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Accelerators */}
        {activeAccelerators.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: '#7fb5c9' }} />
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(240,244,248,0.55)' }}>Response Accelerators</p>
            </div>
            <div className="space-y-1.5">
              {activeAccelerators.map((flag) => (
                <div key={flag.key} className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(127,181,201,0.06)', border: '1px solid rgba(127,181,201,0.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#7fb5c9' }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#7fb5c9' }}>{flag.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(127,181,201,0.7)' }}>{flag.desc}</p>
                  </div>
                </div>
              ))}
              {accelerators.filter((a) => !a.active).map((flag) => (
                <div key={flag.key} className="flex items-start gap-2.5 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(240,244,248,0.03)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: 'rgba(240,244,248,0.2)' }} />
                  <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>{flag.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brakes / Caution factors */}
        {activeBrakes.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <TrendingDown className="w-3.5 h-3.5" style={{ color: '#c97f7f' }} />
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(240,244,248,0.55)' }}>Caution Factors</p>
            </div>
            <div className="space-y-1.5">
              {activeBrakes.map((flag) => (
                <div key={flag.key} className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(201,127,127,0.06)', border: '1px solid rgba(201,127,127,0.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#c97f7f' }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#c97f7f' }}>{flag.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(201,127,127,0.7)' }}>{flag.desc}</p>
                  </div>
                </div>
              ))}
              {brakes.filter((b) => !b.active).map((flag) => (
                <div key={flag.key} className="flex items-start gap-2.5 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(240,244,248,0.03)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: 'rgba(240,244,248,0.2)' }} />
                  <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>{flag.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rationale */}
        <div className="px-4 py-3 rounded-xl"
          style={{ background: 'rgba(127,181,201,0.06)', border: '1px solid rgba(127,181,201,0.15)' }}>
          <p className="text-xs font-semibold mb-1.5" style={{ color: '#7fb5c9' }}>Algorithm rationale</p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(127,181,201,0.8)' }}>
            Alex tolerated Week 1 with mild nausea only. No reflux, dizziness, or injection issues.
            Weight trending down (-2.2 lb). A 0.5 mg increase to 3.0 mg is recommended — smaller than standard protocol — to maintain momentum with lower GI risk.
          </p>
        </div>
      </div>
    </div>
  )
}
