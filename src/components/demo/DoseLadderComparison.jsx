'use client'
import { motion } from 'framer-motion'

const standardSteps = [
  { dose: '2.5 mg', weeks: 'Wk 1–4', jump: null },
  { dose: '5.0 mg', weeks: 'Wk 5–8', jump: '+2.5' },
  { dose: '7.5 mg', weeks: 'Wk 9–12', jump: '+2.5' },
  { dose: '10.0 mg', weeks: 'Wk 13+', jump: '+2.5' },
]

const microSteps = [
  { dose: '2.5 mg', weeks: 'Week 1', jump: null, current: false },
  { dose: '3.0 mg', weeks: 'Week 2', jump: '+0.5', current: true },
  { dose: '3.5 mg', weeks: 'Week 3', jump: '+0.5', current: false },
  { dose: '4.0 mg', weeks: 'Week 4', jump: '+0.5', current: false },
  { dose: '4.5 mg', weeks: 'Week 5', jump: '+0.5', current: false },
  { dose: 'Hold or continue', weeks: 'Week 6+', jump: null, current: false },
]

export default function DoseLadderComparison() {
  return (
    <div className="glass border-hairline rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
        <div>
          <h3 className="text-base font-bold" style={{ color: '#f0f4f8' }}>Dose Escalation Comparison</h3>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.45)' }}>Standard protocol vs. First Dose Health micro-titration</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(127,181,201,0.1)', color: '#7fb5c9', border: '1px solid rgba(127,181,201,0.2)' }}>
          Alex Rivera · Week 2
        </div>
      </div>

      <div className="grid grid-cols-2 p-6 gap-0" style={{ borderTop: '1px solid transparent' }}>
        {/* Standard */}
        <div className="pr-6" style={{ borderRight: '1px solid rgba(240,244,248,0.08)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#c97f7f' }} />
            <p className="text-sm font-semibold" style={{ color: 'rgba(240,244,248,0.7)' }}>Standard Protocol</p>
          </div>
          <p className="text-xs mb-5" style={{ color: 'rgba(240,244,248,0.45)' }}>Large monthly jumps — higher GI risk</p>

          <div className="space-y-2">
            {standardSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                {step.jump && (
                  <div className="flex items-center gap-1.5 py-1 pl-3">
                    <div className="w-px h-4" style={{ background: 'rgba(201,127,127,0.3)' }} />
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(201,127,127,0.1)', color: '#c97f7f', border: '1px solid rgba(201,127,127,0.2)' }}>
                      {step.jump} mg jump
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{
                    background: 'rgba(201,127,127,0.06)',
                    borderColor: 'rgba(201,127,127,0.2)',
                  }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(201,127,127,0.15)', color: '#c97f7f' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold" style={{ color: '#f0f4f8' }}>{step.dose}</span>
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{step.weeks}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 px-3 py-2.5 rounded-xl text-xs leading-relaxed"
            style={{ background: 'rgba(201,127,127,0.08)', color: '#c97f7f', border: '1px solid rgba(201,127,127,0.2)' }}>
            Each jump doubles the dose — common cause of nausea and discontinuation
          </div>
        </div>

        {/* Micro */}
        <div className="pl-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#7fb5c9' }} />
            <p className="text-sm font-semibold" style={{ color: '#7fb5c9' }}>First Dose Health Micro-Titration</p>
          </div>
          <p className="text-xs mb-5" style={{ color: 'rgba(240,244,248,0.45)' }}>Gradual 0.5 mg weekly steps — guided by symptoms</p>

          <div className="space-y-2">
            {microSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                {step.jump && (
                  <div className="flex items-center gap-1.5 py-1 pl-3">
                    <div className="w-px h-4" style={{ background: 'rgba(127,181,201,0.3)' }} />
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(127,181,201,0.1)', color: '#7fb5c9', border: '1px solid rgba(127,181,201,0.2)' }}>
                      {step.jump} mg only
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                  style={{
                    background: step.current
                      ? 'rgba(127,181,201,0.06)'
                      : i === microSteps.length - 1
                        ? 'rgba(255,255,255,0.03)'
                        : 'rgba(127,181,201,0.04)',
                    borderColor: step.current
                      ? '#7fb5c9'
                      : i === microSteps.length - 1
                        ? 'rgba(240,244,248,0.1)'
                        : 'rgba(127,181,201,0.2)',
                    boxShadow: step.current ? '0 0 0 2px rgba(127,181,201,0.15)' : 'none',
                  }}>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step.current
                        ? '#7fb5c9'
                        : i === microSteps.length - 1
                          ? 'rgba(240,244,248,0.06)'
                          : 'rgba(127,181,201,0.15)',
                      color: step.current
                        ? '#0a0e14'
                        : i === microSteps.length - 1
                          ? 'rgba(240,244,248,0.35)'
                          : '#7fb5c9',
                    }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold" style={{
                      color: step.current
                        ? '#7fb5c9'
                        : i === microSteps.length - 1
                          ? 'rgba(240,244,248,0.35)'
                          : '#f0f4f8',
                    }}>
                      {step.dose}
                    </span>
                    {step.current && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: '#7fb5c9', color: '#0a0e14' }}>
                        PROPOSED
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{step.weeks}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 px-3 py-2.5 rounded-xl text-xs leading-relaxed"
            style={{ background: 'rgba(127,181,201,0.08)', color: '#7fb5c9', border: '1px solid rgba(127,181,201,0.2)' }}>
            Goal: find the lowest effective dose, not the maximum tolerated dose
          </div>
        </div>
      </div>
    </div>
  )
}
