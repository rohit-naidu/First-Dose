'use client'
import { useStore } from '@/lib/store'

export default function PatientTimeline() {
  const {
    intakeCompleted,
    planApproved,
    injectionCompleted,
    checkInCompleted,
    week2Approved,
  } = useStore()

  const items = [
    {
      label: 'Intake completed',
      detail: 'Health questionnaire submitted',
      done: intakeCompleted,
      current: !intakeCompleted,
    },
    {
      label: 'Plan reviewed',
      detail: 'Micro-titration plan shared',
      done: planApproved,
      current: intakeCompleted && !planApproved,
    },
    {
      label: 'Week 1 injection',
      detail: '2.5 mg · 25 units administered',
      done: injectionCompleted,
      current: planApproved && !injectionCompleted,
    },
    {
      label: 'Week 1 check-in',
      detail: 'Mild nausea 1/3 · improving',
      done: checkInCompleted,
      current: injectionCompleted && !checkInCompleted,
      symptom: checkInCompleted,
    },
    {
      label: 'Week 2 approved',
      detail: '3.0 mg · 30 units approved',
      done: week2Approved,
      current: checkInCompleted && !week2Approved,
    },
  ]

  const getColor = (done, current, symptom) => {
    if (done && symptom) return {
      dot: '#c9b896',
      line: 'rgba(201,184,150,0.3)',
      text: '#c9b896',
      bg: 'rgba(201,184,150,0.08)',
      border: '#c9b896',
    }
    if (done) return {
      dot: '#7fb5c9',
      line: 'rgba(127,181,201,0.3)',
      text: '#7fb5c9',
      bg: 'rgba(127,181,201,0.08)',
      border: '#7fb5c9',
    }
    if (current) return {
      dot: '#a99cc4',
      line: 'rgba(169,156,196,0.3)',
      text: '#a99cc4',
      bg: 'rgba(169,156,196,0.08)',
      border: '#a99cc4',
    }
    return {
      dot: 'rgba(240,244,248,0.2)',
      line: 'rgba(240,244,248,0.06)',
      text: 'rgba(240,244,248,0.35)',
      bg: 'rgba(240,244,248,0.04)',
      border: 'rgba(240,244,248,0.2)',
    }
  }

  return (
    <div className="glass border-hairline rounded-2xl p-5">
      <p className="text-sm font-bold mb-4" style={{ color: '#f0f4f8' }}>Patient Timeline</p>
      <div className="space-y-0">
        {items.map((item, i) => {
          const c = getColor(item.done, item.current, item.symptom)
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: c.bg, border: `2px solid ${c.dot}` }}>
                  {item.done && (
                    <div className="w-2 h-2 rounded-full" style={{ background: c.dot }} />
                  )}
                  {item.current && !item.done && (
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: c.dot }} />
                  )}
                </div>
                {i < items.length - 1 && (
                  <div className="w-0.5 h-10 mt-1" style={{ background: c.line }} />
                )}
              </div>
              <div className="pb-4">
                <p className="text-xs font-semibold leading-none mb-0.5" style={{ color: c.text }}>
                  {item.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)' }}>{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
