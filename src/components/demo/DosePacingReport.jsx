'use client'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'

// ── helpers ──────────────────────────────────────────────────────────────────

function levelColor(level) {
  if (level === 'high' || level === 'extreme' || level === 'critical') return '#c97f7f'
  if (level === 'moderate' || level === 'guarded') return '#c9b896'
  return '#7fb5c9'
}

function levelBg(level) {
  if (level === 'high' || level === 'extreme' || level === 'critical') return 'rgba(201,127,127,0.08)'
  if (level === 'moderate' || level === 'guarded') return 'rgba(201,184,150,0.08)'
  return 'rgba(127,181,201,0.08)'
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(240,244,248,0.08)', margin: '0' }} />
}

function SectionHeader({ roman, title }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(240,244,248,0.3)' }}>
        {roman}
      </span>
      <h3 className="text-sm font-bold tracking-tight" style={{ color: '#f0f4f8' }}>{title}</h3>
    </div>
  )
}

function SubSection({ number, title, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="text-xs font-bold mb-2" style={{ color: 'rgba(240,244,248,0.5)' }}>
        {number}. {title}
      </p>
      {children}
    </div>
  )
}

function Bullet({ children }) {
  return (
    <div className="flex items-start gap-2.5 mb-1.5">
      <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'rgba(240,244,248,0.3)' }} />
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.6)' }}>{children}</p>
    </div>
  )
}

function Callout({ children, color = 'clinical' }) {
  const colorMap = {
    clinical: { bg: 'rgba(127,181,201,0.07)', border: 'rgba(127,181,201,0.2)', text: 'rgba(127,181,201,0.9)' },
    coral:    { bg: 'rgba(201,127,127,0.07)', border: 'rgba(201,127,127,0.2)', text: 'rgba(201,127,127,0.9)' },
    sand:     { bg: 'rgba(201,184,150,0.07)', border: 'rgba(201,184,150,0.2)', text: 'rgba(201,184,150,0.9)' },
    slate:    { bg: 'rgba(169,156,196,0.07)', border: 'rgba(169,156,196,0.2)', text: 'rgba(169,156,196,0.9)' },
  }
  const c = colorMap[color]
  return (
    <div className="rounded-md px-3.5 py-3 mt-2"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <p className="text-xs leading-relaxed" style={{ color: c.text }}>{children}</p>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export default function DosePacingReport() {
  const { intakeOutputs, patientName, patientAge, patientSex, bmi, deliveryMode } = useStore()
  const {
    velocity, velocityReason, safetyFlags, phenotypeSignals, giRisks,
    hydrationRisk, dizzinessFlag, muscleRisk, moodBaseline, watchItems, doseReadiness,
  } = intakeOutputs

  const reviewFlags  = safetyFlags.filter(f => f.status === 'review')
  const cautionFlags = safetyFlags.filter(f => f.status === 'caution')
  const clearFlags   = safetyFlags.filter(f => f.status === 'clear')

  // Derive overall status label
  const statusLabel =
    doseReadiness === 'SAFETY_REVIEW'  ? 'Safety Review Required' :
    doseReadiness === 'PUSH'           ? 'Strong GLP-1 Candidate' :
    doseReadiness === 'PAUSE'          ? 'Adaptive Pacing Required' :
    doseReadiness === 'SWITCH_PATHWAY' ? 'Pathway Switch Indicated' :
    'Clinician Review Pending'

  // Derive protocol label
  const protocolLabel =
    velocity === 'micro'    ? 'Micro-Titration Hold — Clinician Escalation Only' :
    velocity === 'slow'     ? 'Gradual Adaptive Pacing (8–12 Week Gating)' :
    'Standard Clinician-Reviewed Titration'

  // Build risk index rows from intake data
  const riskRows = [
    {
      index: 'GI Sensitivity Index',
      level: giRisks.some(r => r.level === 'high') ? 'High' : giRisks.some(r => r.level === 'moderate') ? 'Moderate' : 'Low',
      factors: giRisks.map(r => r.reason).join(' + ') || 'No significant GI risk factors identified.',
    },
    {
      index: 'Musculoskeletal Integrity',
      level: muscleRisk === 'high' ? 'High' : muscleRisk === 'moderate' ? 'Moderate' : 'Low',
      factors: muscleRisk === 'high'
        ? `Age ${patientAge} + functional limitation on chair stand — sarcopenia risk.`
        : muscleRisk === 'moderate'
        ? 'Some functional limitation noted. Resistance training and protein floor recommended.'
        : 'No significant functional risk identified.',
    },
    {
      index: 'Autonomic / Hydration Burden',
      level: hydrationRisk === 'high' ? 'High' : hydrationRisk === 'moderate' ? 'Moderate' : 'Low',
      factors: dizzinessFlag
        ? `Dizziness on standing + ${hydrationRisk} hydration risk. Electrolyte plan required before escalation.`
        : `Hydration risk ${hydrationRisk}. Monitor fluid intake throughout titration.`,
    },
    {
      index: 'Reward Pathway Vulnerability',
      level: moodBaseline === 'moderate' ? 'Guarded' : moodBaseline === 'mild' ? 'Mild' : 'Low',
      factors: moodBaseline !== 'clear'
        ? `${moodBaseline === 'moderate' ? 'Moderate PHQ-2 screen' : 'Mild anhedonia signal'}. Monitor for over-suppression; enforce Minimal Effective Dose lock if anhedonia worsens.`
        : 'PHQ-2 screen clear. Baseline recorded for comparison.',
    },
    {
      index: 'Safety Gate Status',
      level: reviewFlags.length > 0 ? 'High' : cautionFlags.length > 0 ? 'Moderate' : 'Low',
      factors: reviewFlags.length > 0
        ? reviewFlags.map(f => `${f.label} — ${f.action}`).join(' | ')
        : cautionFlags.length > 0
        ? cautionFlags.map(f => `${f.label} — ${f.action}`).join(' | ')
        : `All ${clearFlags.length} safety screens clear. Continue as planned.`,
    },
  ]

  const phenotypeStrong   = phenotypeSignals.filter(s => s.strength === 'strong')
  const phenotypeModerate = phenotypeSignals.filter(s => s.strength === 'moderate')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(11,15,22,0.85)', border: '1px solid rgba(240,244,248,0.1)' }}
    >
      {/* ── Report Header ────────────────────────────────────────────────── */}
      <div className="px-7 py-6" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(240,244,248,0.35)' }}>
          Precision Incretin Strategy Report
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-light tracking-tight mb-1" style={{ color: '#f0f4f8' }}>
              {patientName}
            </h2>
            <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>
              Age {patientAge} · {patientSex} · BMI {bmi} · {deliveryMode === 'vial' ? 'Vial / Syringe' : deliveryMode === 'single_dose_pen' ? 'Single-Dose Pen' : 'Prefilled Pen'}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded"
              style={{
                background: doseReadiness === 'SAFETY_REVIEW' ? 'rgba(201,127,127,0.12)'
                  : doseReadiness === 'PUSH' ? 'rgba(127,181,201,0.12)'
                  : 'rgba(201,184,150,0.12)',
                color: doseReadiness === 'SAFETY_REVIEW' ? '#c97f7f'
                  : doseReadiness === 'PUSH' ? '#7fb5c9'
                  : '#c9b896',
                border: `1px solid ${doseReadiness === 'SAFETY_REVIEW' ? 'rgba(201,127,127,0.25)'
                  : doseReadiness === 'PUSH' ? 'rgba(127,181,201,0.25)'
                  : 'rgba(201,184,150,0.25)'}`,
              }}>
              {statusLabel}
            </span>
            <p className="text-[10px] mt-1.5" style={{ color: 'rgba(240,244,248,0.3)' }}>{protocolLabel}</p>
          </div>
        </div>

        <p className="text-xs mt-4 leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)', maxWidth: '560px' }}>
          This report synthesizes physiological brakes with biological accelerators to determine a personalized titration roadmap.
          It moves beyond standard dosing by generating decision-grade clinical intelligence from intake signals.
          The clinician decides — this report flags and suggests.
        </p>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="px-7 py-6 space-y-8">

        {/* I. Biological Risk Indices */}
        <div>
          <SectionHeader roman="I" title="Biological Risk Indices — Quantified Decision Support" />
          <p className="text-xs mb-4" style={{ color: 'rgba(240,244,248,0.35)' }}>
            These indices combine multiple intake signals to predict treatment-limiting events.
          </p>

          {/* Table */}
          <div className="rounded-md overflow-hidden" style={{ border: '1px solid rgba(240,244,248,0.1)' }}>
            {/* Header row */}
            <div className="grid grid-cols-[1.4fr_0.7fr_2.5fr] px-4 py-2.5"
              style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(240,244,248,0.3)' }}>Risk Index</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(240,244,248,0.3)' }}>Level</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(240,244,248,0.3)' }}>Contributing Factors</p>
            </div>
            {riskRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1.4fr_0.7fr_2.5fr] px-4 py-3 items-start"
                style={{ borderBottom: i < riskRows.length - 1 ? '1px solid rgba(240,244,248,0.06)' : 'none' }}>
                <p className="text-xs font-semibold pr-3" style={{ color: '#f0f4f8' }}>{row.index}</p>
                <p className="text-xs font-bold" style={{ color: levelColor(row.level.toLowerCase()) }}>{row.level}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>{row.factors}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* II. Prescribing Intelligence */}
        <div>
          <SectionHeader roman="II" title="Prescribing Intelligence" />

          {/* 1. Titration Roadmap */}
          <SubSection number="1" title={`Titration Roadmap — ${deliveryMode === 'vial' ? 'Vial / Micro-Increase Protocol' : 'Fixed-Pen Duration Strategy'}`}>
            <Bullet>
              <strong style={{ color: '#f0f4f8' }}>Velocity recommendation:</strong>{' '}
              {velocity === 'micro' ? 'Hold current dose. Do not escalate without explicit clinician sign-off at each interval.' :
               velocity === 'slow'  ? 'Slow adaptive pacing. Extend each dose interval to 8–12 weeks minimum before escalating.' :
               'Standard clinician-reviewed pacing. 4-week intervals with symptom-gated escalation.'}
            </Bullet>
            <Bullet>
              <strong style={{ color: '#f0f4f8' }}>Rationale:</strong> {velocityReason}
            </Bullet>
            {deliveryMode !== 'vial' && (
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Fixed-pen constraint:</strong> Velocity must be manipulated through duration, not dose granularity. Hold the starter pen for the full gating window before requesting the next pen strength from the clinician.
              </Bullet>
            )}
            {deliveryMode === 'vial' && (
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Vial advantage:</strong> Clinician may approve sub-step micro-increases (e.g. +0.25 mg) if symptom burden is manageable but escalation is warranted.
              </Bullet>
            )}
            <Callout color="sand">
              Rule: 72-hour check-in after every injection. Hold escalation if nausea, reflux, constipation, or dizziness is moderate or severe at check-in. Resume only after clinician review.
            </Callout>
          </SubSection>

          {/* 2. Phenotype signals */}
          {phenotypeSignals.length > 0 && (
            <SubSection number="2" title="Phenotype Response Map — Efficacy Accelerators">
              {phenotypeStrong.map(s => (
                <Bullet key={s.id}>
                  <strong style={{ color: '#f0f4f8' }}>{s.label} (Strong signal):</strong> {s.detail}
                </Bullet>
              ))}
              {phenotypeModerate.map(s => (
                <Bullet key={s.id}>
                  <strong style={{ color: '#f0f4f8' }}>{s.label} (Moderate signal):</strong> {s.detail}
                </Bullet>
              ))}
              {phenotypeSignals.filter(s => s.strength === 'mild').map(s => (
                <Bullet key={s.id}>
                  <strong style={{ color: '#f0f4f8' }}>{s.label} (Mild signal):</strong> {s.detail}
                </Bullet>
              ))}
              <Callout color="clinical">
                Food noise resolution at starter dose is a clinically meaningful endpoint. If cravings and intrusive food thoughts normalize at 2.5 mg, consider holding at Minimal Effective Dose rather than escalating automatically.
              </Callout>
            </SubSection>
          )}

          {/* 3. Muscle / Strength Floor */}
          {muscleRisk !== 'low' && (
            <SubSection number="3" title="Musculoskeletal Integrity Guard — Strength Floor">
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Risk classification:</strong> {muscleRisk === 'high' ? 'High — functional limitation identified on chair stand.' : 'Moderate — some functional limitation noted.'}
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Protein floor:</strong> Mandate 1.2–1.5 g protein per kg body weight per day before approving the second dose tier.
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Resistance training:</strong> {muscleRisk === 'high' ? '2 supervised sessions per week minimum before escalation.' : 'Beginner resistance program recommended. Monitor adherence at check-ins.'}
              </Bullet>
              <Callout color="coral">
                Dose lock condition: If functional strength declines — even if weight loss is active — hold escalation and trigger clinician review. Scale weight does not override muscle floor.
              </Callout>
            </SubSection>
          )}

          {/* 4. Mood / Reward Pathway */}
          {moodBaseline !== 'clear' && (
            <SubSection number={muscleRisk !== 'low' ? '4' : '3'} title="Neurological Reset Opportunity — Reward Pathway">
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>PHQ-2 baseline:</strong> {moodBaseline === 'moderate' ? 'Moderate screen positive — anhedonia and low mood flagged.' : 'Mild anhedonia signal present.'}
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>GLP-1 mechanism:</strong> GLP-1 receptor agonists stabilize dopamine reward circuits. This patient may experience secondary benefits in compulsive behaviors (food noise, habitual cravings).
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Monitoring instruction:</strong> Track mood and anhedonia at every check-in. If emotional flatness emerges or baseline anhedonia worsens, enforce Minimal Effective Dose lock — do not escalate for scale-weight reasons alone.
              </Bullet>
              <Callout color="slate">
                Dose lock condition: Mood baseline recorded for comparison. If life pleasure and general motivation decline during titration, this takes priority over weight-loss velocity.
              </Callout>
            </SubSection>
          )}
        </div>

        <Divider />

        {/* III. Safety Stack */}
        <div>
          <SectionHeader roman="III" title="Safety Stack &amp; Rescue Protocols" />

          {watchItems.length > 0 && (
            <div className="space-y-2 mb-4">
              {watchItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[10px] font-bold w-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(240,244,248,0.3)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{item}</p>
                </div>
              ))}
            </div>
          )}

          {(dizzinessFlag || hydrationRisk !== 'low') && (
            <Callout color="sand">
              <strong>Hydration mandate:</strong> Set a daily fluid floor of 2.0–2.5 L. If nausea or vomiting occurs, add oral electrolytes. Dizziness on standing is a dehydration signal — do not escalate with active orthostatic symptoms.
            </Callout>
          )}

          {reviewFlags.length > 0 && (
            <div className="mt-3">
              <Callout color="coral">
                <strong>Safety review items require clinician sign-off before any dose change:</strong>{' '}
                {reviewFlags.map(f => `${f.label} (${f.action})`).join(' · ')}
              </Callout>
            </div>
          )}
          {cautionFlags.length > 0 && (
            <div className="mt-2">
              <Callout color="sand">
                <strong>Counseling required before escalation:</strong>{' '}
                {cautionFlags.map(f => `${f.label} — ${f.action}`).join(' · ')}
              </Callout>
            </div>
          )}
        </div>

        <Divider />

        {/* IV. Clinician Action Portal */}
        <div>
          <SectionHeader roman="IV" title="Clinician Action Portal" />
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: 'APPROVE — ADAPTIVE', desc: `Initiate starter dose. ${velocity !== 'standard' ? 'Apply extended gating window before escalation.' : '4-week gating with 72-hour check-in.'}`, color: 'clinical' },
              { label: 'MODIFY — SLOW TITRATION', desc: 'Extend gating to 8–12 weeks. Add safety stack before approving next dose tier.', color: 'sand' },
              { label: 'HOLD — ESCALATION BLOCK', desc: 'Current dose only. Clinician review required at next check-in before any increase.', color: 'coral' },
              { label: 'REVIEW — CONTRAINDICATION', desc: reviewFlags.length > 0 ? reviewFlags.map(f => f.label).join(', ') + ' — in-person review required.' : 'No active contraindications. Proceed per standard protocol.', color: reviewFlags.length > 0 ? 'coral' : 'slate' },
            ].map((action, i) => (
              <div key={i} className="flex items-start gap-4 px-4 py-3 rounded-md"
                style={{
                  background: i === 0 ? 'rgba(127,181,201,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === 0 ? 'rgba(127,181,201,0.15)' : 'rgba(240,244,248,0.07)'}`,
                }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] flex-shrink-0 mt-0.5"
                  style={{ color: levelColor(action.color === 'coral' ? 'high' : action.color === 'sand' ? 'moderate' : 'low') }}>
                  {action.label}
                </span>
                <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{action.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="px-7 py-4 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(240,244,248,0.06)' }}>
        <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.2)' }}>
          Generated by DoseGuide GLP Adaptive Intake · First Dose Health
        </p>
        <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.2)' }}>
          For clinician review only · Not autonomous prescribing
        </p>
      </div>
    </motion.div>
  )
}
