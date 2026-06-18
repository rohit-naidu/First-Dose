'use client'
import { Shield, User, Bot } from 'lucide-react'

const auditEntries = [
  {
    time: '10:32 AM',
    actor: 'System',
    icon: 'bot',
    action: 'Intake form received from Alex Rivera',
  },
  {
    time: '10:32 AM',
    actor: 'System',
    icon: 'bot',
    action: 'Risk assessment generated: 3 flags identified',
  },
  {
    time: '10:33 AM',
    actor: 'System',
    icon: 'bot',
    action: 'Micro-titration plan drafted: 2.5 mg start, 0.5 mg weekly steps',
  },
  {
    time: '10:45 AM',
    actor: 'Dr. Kim',
    icon: 'user',
    action: 'Reviewed plan, approved Week 1 dose (2.5 mg / 25 units)',
  },
  {
    time: 'Day 7',
    actor: 'Alex Rivera',
    icon: 'user',
    action: 'Completed injection and symptom check-in',
  },
  {
    time: 'Day 7',
    actor: 'System',
    icon: 'bot',
    action: 'Symptom analysis: Nausea mild (1/3), all others 0. Safe to escalate.',
  },
  {
    time: 'Day 7',
    actor: 'System',
    icon: 'bot',
    action: 'Proposed Week 2 dose: 3.0 mg / 30 units -- awaiting clinician review',
  },
]

export default function AuditTrail() {
  return (
    <div className="glass border-hairline rounded-2xl overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-2.5" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(240,244,248,0.06)' }}>
          <Shield className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.55)' }} />
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: '#f0f4f8' }}>Audit Trail</h3>
          <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>Complete clinical activity log</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid transparent' }}>
        {auditEntries.map((entry, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5" style={{ borderTop: i > 0 ? '1px solid rgba(240,244,248,0.05)' : 'none' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: entry.icon === 'bot' ? 'rgba(169,156,196,0.12)' : 'rgba(127,181,201,0.12)' }}>
              {entry.icon === 'bot' ? (
                <Bot className="w-3.5 h-3.5" style={{ color: '#a99cc4' }} />
              ) : (
                <User className="w-3.5 h-3.5" style={{ color: '#7fb5c9' }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.7)' }}>{entry.actor}</span>
                <span className="text-xs" style={{ color: 'rgba(240,244,248,0.2)' }}>·</span>
                <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{entry.time}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{entry.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
