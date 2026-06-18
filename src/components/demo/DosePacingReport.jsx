'use client'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import {
  CheckCircle, AlertTriangle, XCircle, Shield, TrendingUp,
  Activity, Droplets, Dumbbell, Heart, Pill, ChevronRight,
  Info,
} from 'lucide-react'

function VelocityBadge({ velocity }) {
  const config = {
    standard: { label: 'Standard progression', color: '#7fb5c9', bg: 'rgba(127,181,201,0.1)', border: 'rgba(127,181,201,0.3)', dot: '#7fb5c9' },
    slow:     { label: 'Slow / symptom-aware', color: '#c9b896', bg: 'rgba(201,184,150,0.1)', border: 'rgba(201,184,150,0.3)', dot: '#c9b896' },
    micro:    { label: 'Micro-titration hold', color: '#c97f7f', bg: 'rgba(201,127,127,0.1)', border: 'rgba(201,127,127,0.3)', dot: '#c97f7f' },
  }
  const c = config[velocity]
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      {c.label}
    </span>
  )
}

function RiskLevel({ level }) {
  const config = {
    low:      { label: 'Low',      color: '#7fb5c9', bg: 'rgba(127,181,201,0.1)', border: 'rgba(127,181,201,0.3)' },
    moderate: { label: 'Moderate', color: '#c9b896', bg: 'rgba(201,184,150,0.1)', border: 'rgba(201,184,150,0.3)' },
    high:     { label: 'High',     color: '#c97f7f', bg: 'rgba(201,127,127,0.1)', border: 'rgba(201,127,127,0.3)' },
  }
  const c = config[level]
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
      {c.label}
    </span>
  )
}

function StrengthDots({ strength }) {
  const filled = strength === 'strong' ? 3 : strength === 'moderate' ? 2 : 1
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-2 h-2 rounded-full"
          style={{ background: i <= filled ? '#a99cc4' : 'rgba(240,244,248,0.15)' }} />
      ))}
    </div>
  )
}

export default function DosePacingReport() {
  const { intakeOutputs, patientName, patientAge, patientSex, bmi, deliveryMode } = useStore()
  const {
    velocity, velocityReason, safetyFlags, phenotypeSignals, giRisks,
    hydrationRisk, dizzinessFlag, muscleRisk, moodBaseline, deliveryConfidence, watchItems,
  } = intakeOutputs

  void deliveryMode
  void deliveryConfidence

  const reviewCount = safetyFlags.filter((f) => f.status === 'review').length
  const cautionCount = safetyFlags.filter((f) => f.status === 'caution').length

  const velocityBorderColor = velocity === 'standard'
    ? 'rgba(127,181,201,0.3)'
    : velocity === 'slow'
    ? 'rgba(201,184,150,0.3)'
    : 'rgba(201,127,127,0.3)'

  const velocityGlowColor = velocity === 'standard'
    ? 'rgba(127,181,201,0.15)'
    : velocity === 'slow'
    ? 'rgba(201,184,150,0.15)'
    : 'rgba(201,127,127,0.15)'

  const velocityTextColor = velocity === 'standard' ? '#7fb5c9' : velocity === 'slow' ? '#c9b896' : '#c97f7f'
  const velocitySubColor = velocity === 'standard'
    ? 'rgba(127,181,201,0.7)'
    : velocity === 'slow'
    ? 'rgba(201,184,150,0.7)'
    : 'rgba(201,127,127,0.7)'

  return (
    <div className="space-y-5">
      {/* Main recommendation card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0d2137 100%)',
          border: `1px solid ${velocityBorderColor}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${velocityGlowColor}, transparent 70%)` }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(240,244,248,0.5)' }}>Dose Pacing Report</p>
            <VelocityBadge velocity={velocity} />
          </div>
          <h3 className="text-lg font-bold text-ink mb-1">
            {patientName} · {patientAge}{patientSex[0]} · BMI {bmi}
          </h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(240,244,248,0.55)' }}>{velocityReason}</p>

          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl px-3 py-2.5 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-xl font-extrabold text-ink">{cautionCount}</p>
              <p className="text-xs font-medium" style={{ color: '#c9b896' }}>Safety cautions</p>
            </div>
            <div className="rounded-xl px-3 py-2.5 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-xl font-extrabold text-ink">{phenotypeSignals.length}</p>
              <p className="text-xs font-medium" style={{ color: '#a99cc4' }}>Phenotype signals</p>
            </div>
            <div className="rounded-xl px-3 py-2.5 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-xl font-extrabold text-ink">{giRisks.filter(r => r.level !== 'low').length}</p>
              <p className="text-xs font-medium" style={{ color: '#7fb5c9' }}>GI watch items</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section A: Safety gates */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
          <Shield className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">A — Safety Gates</h3>
          {reviewCount > 0 && (
            <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(201,127,127,0.1)', color: '#c97f7f', border: '1px solid rgba(201,127,127,0.3)' }}>
              {reviewCount} needs review
            </span>
          )}
        </div>
        <div style={{ borderTop: 'none' }}>
          {safetyFlags.map((flag) => (
            <div key={flag.id} className="px-5 py-3 flex items-start gap-3"
              style={{ borderBottom: '1px solid rgba(240,244,248,0.05)' }}>
              <div className="flex-shrink-0 mt-0.5">
                {flag.status === 'clear'
                  ? <CheckCircle className="w-4 h-4" style={{ color: '#7fb5c9' }} />
                  : flag.status === 'caution'
                  ? <AlertTriangle className="w-4 h-4" style={{ color: '#c9b896' }} />
                  : <XCircle className="w-4 h-4" style={{ color: '#c97f7f' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-ink">{flag.label}</p>
                  <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{flag.answer}</span>
                </div>
                {flag.status !== 'clear' && (
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#c9b896' }}>{flag.action}</p>
                )}
              </div>
              {flag.status === 'clear' && (
                <span className="text-xs flex-shrink-0" style={{ color: 'rgba(240,244,248,0.35)' }}>Continue</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section B: Titration velocity */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">B — Titration Velocity</h3>
        </div>
        <div className="rounded-xl p-4 mb-4"
          style={{
            background: velocity === 'standard' ? 'rgba(127,181,201,0.06)' : velocity === 'slow' ? 'rgba(201,184,150,0.06)' : 'rgba(201,127,127,0.06)',
            border: `1px solid ${velocityBorderColor}`,
          }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold" style={{ color: velocityTextColor }}>
              {velocity === 'standard' ? 'Standard clinician-reviewed pacing' : velocity === 'slow' ? 'Slow / symptom-aware micro-titration' : 'Hold — clinician review required'}
            </p>
            <VelocityBadge velocity={velocity} />
          </div>
          <p className="text-xs leading-relaxed" style={{ color: velocitySubColor }}>
            {velocityReason}
          </p>
        </div>
        <div className="space-y-2">
          {[
            'Start at clinician-selected starter dose',
            '72-hour check-in after first injection',
            'Hold escalation if nausea, reflux, constipation, or dizziness is moderate or severe',
            'If mild symptoms improving, clinician may micro-increase (+0.5 mg)',
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(240,244,248,0.35)' }} />
              <p className="text-xs" style={{ color: 'rgba(240,244,248,0.55)' }}>{rule}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section C: Phenotype map */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">C — Phenotype Signals</h3>
        </div>
        <p className="text-xs mb-4" style={{ color: 'rgba(240,244,248,0.35)' }}>Research-inspired signals — not clinical diagnoses. Use as context.</p>
        <div className="space-y-2.5">
          {phenotypeSignals.map((sig) => (
            <div key={sig.id} className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,244,248,0.1)' }}>
              <StrengthDots strength={sig.strength} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-bold text-ink">{sig.label}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#a99cc4' }}>{sig.strength}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{sig.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 px-3 py-2.5 rounded-xl"
          style={{ background: 'rgba(169,156,196,0.08)', border: '1px solid rgba(169,156,196,0.2)' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(169,156,196,0.9)' }}>
            <span className="font-semibold">Food noise as endpoint:</span> Track whether food noise improves at the starter dose before escalating. A clinician who observes food noise resolution at 2.5 mg has a reason to hold rather than escalate automatically.
          </p>
        </div>
      </motion.div>

      {/* Section D: GI risk map */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Pill className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">D — GI Risk Map</h3>
        </div>
        <div className="space-y-2.5">
          {giRisks.map((risk, i) => (
            <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-xl"
              style={{
                background: risk.level === 'high' ? 'rgba(201,127,127,0.06)' : risk.level === 'moderate' ? 'rgba(201,184,150,0.06)' : 'rgba(127,181,201,0.06)',
                border: `1px solid ${risk.level === 'high' ? 'rgba(201,127,127,0.2)' : risk.level === 'moderate' ? 'rgba(201,184,150,0.2)' : 'rgba(127,181,201,0.2)'}`,
              }}>
              <div>
                <p className="text-xs font-bold text-ink mb-0.5">{risk.label}</p>
                <p className="text-xs" style={{ color: 'rgba(240,244,248,0.55)' }}>{risk.reason}</p>
              </div>
              <RiskLevel level={risk.level} />
            </div>
          ))}
        </div>
        <div className="mt-3 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,244,248,0.1)' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)' }}>
            Pre-start guidance: smaller meals on injection day, fiber + hydration for constipation, no large meals within 2h of injection for reflux.
          </p>
        </div>
      </motion.div>

      {/* Section E + F: Hydration + autonomic */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">E — Hydration / Autonomic Risk</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl text-center"
            style={{
              background: dizzinessFlag ? 'rgba(201,184,150,0.06)' : 'rgba(127,181,201,0.06)',
              border: `1px solid ${dizzinessFlag ? 'rgba(201,184,150,0.2)' : 'rgba(127,181,201,0.2)'}`,
            }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(240,244,248,0.45)' }}>Dizziness on standing</p>
            <p className="text-sm font-bold" style={{ color: dizzinessFlag ? '#c9b896' : '#7fb5c9' }}>
              {dizzinessFlag ? 'Flagged' : 'None reported'}
            </p>
          </div>
          <div className="p-3 rounded-xl text-center"
            style={{
              background: hydrationRisk === 'high' ? 'rgba(201,127,127,0.06)' : hydrationRisk === 'moderate' ? 'rgba(201,184,150,0.06)' : 'rgba(127,181,201,0.06)',
              border: `1px solid ${hydrationRisk === 'high' ? 'rgba(201,127,127,0.2)' : hydrationRisk === 'moderate' ? 'rgba(201,184,150,0.2)' : 'rgba(127,181,201,0.2)'}`,
            }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(240,244,248,0.45)' }}>Hydration risk</p>
            <p className="text-sm font-bold capitalize"
              style={{ color: hydrationRisk === 'high' ? '#c97f7f' : hydrationRisk === 'moderate' ? '#c9b896' : '#7fb5c9' }}>
              {hydrationRisk}
            </p>
          </div>
        </div>
        {(dizzinessFlag || hydrationRisk !== 'low') && (
          <div className="mt-3 text-xs px-3 py-2 rounded-xl"
            style={{ background: 'rgba(201,184,150,0.06)', border: '1px solid rgba(201,184,150,0.2)', color: '#c9b896' }}>
            Monitor: dizziness on standing, urine color, adequate fluid intake. Volume depletion risk if nausea or vomiting occurs. Relevant to renal monitoring per label guidance.
          </div>
        )}
      </motion.div>

      {/* Section G: Muscle/function floor */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">G — Muscle &amp; Function Floor</h3>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl mb-2"
          style={{
            background: muscleRisk === 'high' ? 'rgba(201,127,127,0.06)' : muscleRisk === 'moderate' ? 'rgba(201,184,150,0.06)' : 'rgba(127,181,201,0.06)',
            border: `1px solid ${muscleRisk === 'high' ? 'rgba(201,127,127,0.2)' : muscleRisk === 'moderate' ? 'rgba(201,184,150,0.2)' : 'rgba(127,181,201,0.2)'}`,
          }}>
          <p className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.7)' }}>Muscle-protection plan needed</p>
          <RiskLevel level={muscleRisk} />
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>
          {muscleRisk === 'low'
            ? 'Chair stand easy. Encourage maintenance of current activity and adequate protein intake during weight loss.'
            : muscleRisk === 'moderate'
            ? 'Some functional limitation noted. Recommend beginner resistance training and protein goal. Monitor fatigue and excessive appetite suppression.'
            : 'Functional risk identified. Consider dietitian referral, beginner resistance plan, and close monitoring for weakness or falls.'}
        </p>
      </motion.div>

      {/* Section H: Mood baseline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.33 }}
        className="glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(240,244,248,0.1)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.45)' }} />
          <h3 className="text-sm font-bold text-ink">H — Mood Baseline (PHQ-2 style)</h3>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl"
          style={{
            background: moodBaseline === 'clear' ? 'rgba(127,181,201,0.06)' : moodBaseline === 'mild' ? 'rgba(201,184,150,0.06)' : 'rgba(201,127,127,0.06)',
            border: `1px solid ${moodBaseline === 'clear' ? 'rgba(127,181,201,0.2)' : moodBaseline === 'mild' ? 'rgba(201,184,150,0.2)' : 'rgba(201,127,127,0.2)'}`,
          }}>
          <p className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.7)' }}>PHQ-2 style screen</p>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: moodBaseline === 'clear' ? 'rgba(127,181,201,0.1)' : moodBaseline === 'mild' ? 'rgba(201,184,150,0.1)' : 'rgba(201,127,127,0.1)',
              color: moodBaseline === 'clear' ? '#7fb5c9' : moodBaseline === 'mild' ? '#c9b896' : '#c97f7f',
              border: `1px solid ${moodBaseline === 'clear' ? 'rgba(127,181,201,0.3)' : moodBaseline === 'mild' ? 'rgba(201,184,150,0.3)' : 'rgba(201,127,127,0.3)'}`,
            }}>
            {moodBaseline === 'clear' ? 'Baseline clear' : moodBaseline === 'mild' ? 'Mild signal' : 'Moderate screen'}
          </span>
        </div>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(240,244,248,0.35)' }}>
          Baseline recorded for future comparison. If fatigue, emotional flattening, or anhedonia emerge during treatment, compare against this baseline before attributing to medication.
        </p>
      </motion.div>

      {/* Top watch items */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36 }}
        className="rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg, #0f172a, #0d1f35)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4" style={{ color: '#7fb5c9' }} />
          <h3 className="text-sm font-bold text-ink">Top Watch Items for This Patient</h3>
        </div>
        <div className="space-y-2">
          {watchItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                style={{ background: 'rgba(127,181,201,0.12)', color: '#7fb5c9' }}>
                {i + 1}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
