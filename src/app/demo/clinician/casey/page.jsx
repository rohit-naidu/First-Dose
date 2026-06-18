'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import {
  ArrowLeft, CheckCircle, XCircle, PauseCircle, Clock,
  ChevronRight, X, AlertTriangle, Shield, Dumbbell,
  Droplets, Brain, Pill, Timer, Flame, Heart,
  Zap, Eye,
} from 'lucide-react'

// ── helpers ──────────────────────────────────────────────────────────────────

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(240,244,248,0.08)' }} />
}

function SectionHeader({ roman, title }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(240,244,248,0.3)' }}>{roman}</span>
      <h3 className="text-sm font-bold tracking-tight" style={{ color: '#f0f4f8' }}>{title}</h3>
    </div>
  )
}

function Bullet({ children }) {
  return (
    <div className="flex items-start gap-2.5 mb-2">
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
    <div className="rounded-md px-3.5 py-3 mt-2" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <p className="text-xs leading-relaxed" style={{ color: c.text }}>{children}</p>
    </div>
  )
}

function levelColor(level) {
  if (level === 'extreme' || level === 'critical' || level === 'high') return '#c97f7f'
  if (level === 'guarded' || level === 'moderate') return '#c9b896'
  return '#7fb5c9'
}

// ── risk indices ─────────────────────────────────────────────────────────────

const riskRows = [
  {
    index: 'GI Sensitivity Index',
    level: 'Extreme',
    factors: '"Very Prone" motion sickness + prior nausea + "Hungry Gut" phenotype (hunger < 2h). Combined emetic burden is 3× population baseline.',
  },
  {
    index: 'Depletive Metabotype Risk',
    level: 'Critical',
    factors: 'Age 75 + failed Chair Stand Test + gallstone history. Up to 39% of weight loss may come from lean mass without intervention.',
  },
  {
    index: 'Autonomic / Hydration Burden',
    level: 'High',
    factors: '"Often" dizzy upon standing + baseline fluid intake < 1 L/day. Syncopal event risk during initial appetite suppression.',
  },
  {
    index: 'Reward Pathway Vulnerability',
    level: 'Guarded',
    factors: '"Nearly every day" anhedonia (PHQ-2) + "Often" emotional eating. Dopaminergic brake active — dose lock rule applies.',
  },
]

// ── main component ────────────────────────────────────────────────────────────

export default function CaseyClinicianPage() {
  const { casey, approveCasey, showToast } = useStore()
  const [decision, setDecision] = useState(null) // 'approved' | 'modified' | 'rejected'
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState(null)

  const handleDecision = (type) => {
    setModalAction(type)
    setShowModal(true)
  }

  const confirmDecision = () => {
    setDecision(modalAction)
    setShowModal(false)
    if (modalAction === 'approved') {
      approveCasey()
      showToast('Casey Rodriguez — Adaptive plan approved. 8-week hold initiated.')
    } else if (modalAction === 'modified') {
      showToast('Casey Rodriguez — Plan modified with safety stack. Awaiting pharmacy.')
    } else {
      showToast('Casey Rodriguez — Plan rejected. In-person review required.')
    }
  }

  return (
    <div className="max-w-6xl">
      {/* Nav */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/demo/clinician" className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: 'rgba(240,244,248,0.45)' }}>
          <ArrowLeft className="w-3.5 h-3.5" /> All patients
        </Link>
      </div>

      {/* Patient header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #c97f7f, #c9b896)' }}>
          CR
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-light text-ink mb-0.5">Casey Rodriguez</h1>
          <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>75F · BMI 38.2 · Tirzepatide pen · Pre-treatment</p>
        </div>
        {decision && (
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded"
            style={{
              background: decision === 'approved' ? 'rgba(127,181,201,0.12)' : decision === 'modified' ? 'rgba(201,184,150,0.12)' : 'rgba(201,127,127,0.12)',
              color: decision === 'approved' ? '#7fb5c9' : decision === 'modified' ? '#c9b896' : '#c97f7f',
              border: `1px solid ${decision === 'approved' ? 'rgba(127,181,201,0.25)' : decision === 'modified' ? 'rgba(201,184,150,0.25)' : 'rgba(201,127,127,0.25)'}`,
            }}>
            {decision === 'approved' ? 'Plan Approved' : decision === 'modified' ? 'Modified' : 'Rejected — Review Required'}
          </span>
        )}
      </motion.div>

      {/* ═══════════ REPORT + ACTION SIDEBAR ═══════════ */}
      <div className="flex gap-5 items-start mb-6">

      {/* ── Report (left) ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="rounded-xl overflow-hidden flex-1 min-w-0"
        style={{ background: 'rgba(11,15,22,0.85)', border: '1px solid rgba(240,244,248,0.1)' }}
      >
        {/* Report Header */}
        <div className="px-7 py-6" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(240,244,248,0.35)' }}>
            Precision Incretin Strategy Report
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-light tracking-tight mb-1" style={{ color: '#f0f4f8' }}>Casey Rodriguez</h2>
              <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>
                Age 75 · Female · BMI 38.2 · Prefilled Pen
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded"
                style={{ background: 'rgba(201,127,127,0.12)', color: '#c97f7f', border: '1px solid rgba(201,127,127,0.25)' }}>
                Hyper-Sensitive Super-Responder Candidate
              </span>
              <p className="text-[10px] mt-1.5" style={{ color: 'rgba(240,244,248,0.3)' }}>
                Gradual Adaptive Pacing (8–12 Week Gating)
              </p>
            </div>
          </div>
          <p className="text-xs mt-4 leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)', maxWidth: '580px' }}>
            This report synthesizes physiological brakes with biological accelerators to determine a personalized titration roadmap.
            Standard 4-week dose jumps are contraindicated for this patient. Velocity must be manipulated through duration, not dose granularity.
          </p>
        </div>

        {/* Key Action Items + Dosing Curve */}
        <div className="px-7 py-6" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
          <div className="grid grid-cols-[1fr_1.1fr] gap-6">

            {/* Left: Key Action Items */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: 'rgba(240,244,248,0.35)' }}>
                Key Action Items
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Delay initiation 7 days', detail: 'Hormonal hold — avoid periovulatory estrogen peak', color: '#c97f7f' },
                  { label: 'Hold 2.5 mg for 8–12 weeks', detail: 'Ileal brake adaptation before escalation', color: '#c9b896' },
                  { label: 'Protein floor 1.5 g/kg/day', detail: 'Musculoskeletal integrity — failed chair stand', color: '#c9b896' },
                  { label: 'Hydration floor 2.5 L/day', detail: 'Orthostatic + low baseline fluid intake', color: '#c9b896' },
                  { label: 'Monitor anhedonia at every check-in', detail: 'Hedonic tone lock — PHQ-2 baseline elevated', color: '#a99cc4' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: item.color }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#f0f4f8' }}>{item.label}</p>
                      <p className="text-[10px] leading-snug" style={{ color: 'rgba(240,244,248,0.4)' }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dosing Curve */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: 'rgba(240,244,248,0.35)' }}>
                Recommended Dosing Curve — Prefilled Pen
              </p>
              <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(240,244,248,0.08)' }}>
                {/* Column headers */}
                <div className="grid grid-cols-[0.6fr_1fr_0.7fr_1.4fr] px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(240,244,248,0.06)' }}>
                  {['Week', 'Dose', 'Duration', 'Gate'].map(h => (
                    <p key={h} className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(240,244,248,0.3)' }}>{h}</p>
                  ))}
                </div>
                {[
                  { week: '1–12', dose: '2.5 mg', duration: '8–12 wk', gate: 'GI tolerance confirmed', active: true, color: '#7fb5c9' },
                  { week: '13–20', dose: '5.0 mg', duration: '8 wk', gate: 'Strength floor verified', active: false, color: 'rgba(240,244,248,0.25)' },
                  { week: '21–28', dose: '7.5 mg', duration: '8 wk', gate: 'Mood + weight trajectory', active: false, color: 'rgba(240,244,248,0.2)' },
                  { week: '29+', dose: '10 mg', duration: 'Maintain', gate: 'Clinician MED assessment', active: false, color: 'rgba(240,244,248,0.15)' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-[0.6fr_1fr_0.7fr_1.4fr] px-3 py-2.5 items-center"
                    style={{
                      borderBottom: i < 3 ? '1px solid rgba(240,244,248,0.04)' : 'none',
                      background: row.active ? 'rgba(127,181,201,0.06)' : 'transparent',
                    }}>
                    <p className="text-xs font-semibold" style={{ color: row.color }}>{row.week}</p>
                    <p className="text-xs font-bold" style={{ color: row.active ? '#f0f4f8' : row.color }}>{row.dose}</p>
                    <p className="text-[10px]" style={{ color: row.active ? 'rgba(240,244,248,0.55)' : row.color }}>{row.duration}</p>
                    <p className="text-[10px]" style={{ color: row.active ? 'rgba(127,181,201,0.8)' : row.color }}>{row.gate}</p>
                  </div>
                ))}
              </div>
              {/* Visual dose curve bar */}
              <div className="mt-3 flex items-end gap-1 h-10">
                {[
                  { h: '25%', w: 'flex-[3]', color: '#7fb5c9', label: '2.5' },
                  { h: '50%', w: 'flex-[2]', color: 'rgba(127,181,201,0.5)', label: '5.0' },
                  { h: '75%', w: 'flex-[2]', color: 'rgba(127,181,201,0.3)', label: '7.5' },
                  { h: '100%', w: 'flex-[1.5]', color: 'rgba(127,181,201,0.15)', label: '10' },
                ].map((bar, i) => (
                  <div key={i} className={bar.w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p className="text-[8px] font-bold mb-0.5" style={{ color: bar.color }}>{bar.label} mg</p>
                    <div className="w-full rounded-sm" style={{ height: bar.h, background: bar.color, minHeight: '4px' }} />
                  </div>
                ))}
              </div>
              <p className="text-[9px] mt-2 text-center" style={{ color: 'rgba(240,244,248,0.25)' }}>
                Standard protocol: 4-week jumps · This patient: 8–12 week gated escalation
              </p>
            </div>
          </div>
        </div>

        {/* Report Body */}
        <div className="px-7 py-6 space-y-7">

          {/* ═══ I. RISK INDICES ═══ */}
          <div>
            <SectionHeader roman="I" title="Biological Risk Indices" />
            <div className="grid grid-cols-2 gap-2.5">
              {riskRows.map((row, i) => {
                const c = levelColor(row.level.toLowerCase())
                const icons = [Shield, Dumbbell, Droplets, Brain]
                const Icon = icons[i] || Shield
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background: `${c}0a`, border: `1px solid ${c}25` }}>
                    <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: c }} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[11px] font-semibold" style={{ color: '#f0f4f8' }}>{row.index}</p>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: `${c}18`, color: c }}>{row.level}</span>
                      </div>
                      <p className="text-[10px] leading-snug" style={{ color: 'rgba(240,244,248,0.45)' }}>{row.factors}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Divider />

          {/* ═══ II. PRESCRIBING INTELLIGENCE ═══ */}
          <div>
            <SectionHeader roman="II" title="Prescribing Intelligence" />

            {/* 1. Titration */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-3.5 h-3.5" style={{ color: '#c9b896' }} />
                <p className="text-xs font-bold" style={{ color: 'rgba(240,244,248,0.55)' }}>1. Resilient Titration — Fixed-Pen Logistics</p>
              </div>
              <div className="space-y-1.5">
                {[
                  { icon: Flame, color: '#c9b896', text: '"Hungry Gut" phenotype — prime responder but extreme GI shock risk' },
                  { icon: Timer, color: '#c9b896', text: 'Hold 2.5 mg starter pen for 8–12 weeks (not standard 4-week jump)' },
                  { icon: AlertTriangle, color: '#c97f7f', text: 'Delay initiation 7 days — avoid periovulatory estrogen peak (2.5× nausea multiplier)' },
                  { icon: Shield, color: 'rgba(240,244,248,0.35)', text: 'Pen constraint: velocity through duration, not dose. No 5.0 mg pen until 8-week GI clear.' },
                ].map((item, i) => {
                  const I = item.icon
                  return (
                    <div key={i} className="flex items-start gap-2.5 py-1">
                      <I className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 2. Musculoskeletal */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell className="w-3.5 h-3.5" style={{ color: '#c97f7f' }} />
                <p className="text-xs font-bold" style={{ color: 'rgba(240,244,248,0.55)' }}>2. Musculoskeletal Integrity — Strength Floor</p>
              </div>
              <div className="space-y-1.5">
                {[
                  { icon: AlertTriangle, color: '#c97f7f', text: 'Failed Chair Stand + age 75 → up to 39% of weight loss from muscle without intervention' },
                  { icon: Zap, color: '#7fb5c9', text: 'Paradox: this demographic is 2× more likely to reach >15% TBWL (Super-Responder)' },
                  { icon: CheckCircle, color: '#7fb5c9', text: 'Mandate: Protein 1.5 g/kg/day + 2 days resistance training before approving next pen tier' },
                  { icon: XCircle, color: '#c97f7f', text: 'Dose lock: hold escalation if chair stand declines — even if weight loss is active' },
                ].map((item, i) => {
                  const I = item.icon
                  return (
                    <div key={i} className="flex items-start gap-2.5 py-1">
                      <I className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 3. Neurologic */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-3.5 h-3.5" style={{ color: '#a99cc4' }} />
                <p className="text-xs font-bold" style={{ color: 'rgba(240,244,248,0.55)' }}>3. Neurologic Reset — Reward Pathway</p>
              </div>
              <div className="space-y-1.5">
                {[
                  { icon: Zap, color: '#7fb5c9', text: 'High food noise + emotional eating → strong candidate for Secondary Habit Freedom' },
                  { icon: Heart, color: '#a99cc4', text: 'PHQ-2 anhedonia baseline elevated ("Nearly every day") — dopaminergic brake active' },
                  { icon: Eye, color: '#c9b896', text: 'Monitor mood at every check-in — if pleasure flattens, enforce Minimal Effective Dose lock' },
                  { icon: AlertTriangle, color: '#c97f7f', text: 'Do not prioritize scale weight over hedonic tone — anhedonia worsening is a dose-lock trigger' },
                ].map((item, i) => {
                  const I = item.icon
                  return (
                    <div key={i} className="flex items-start gap-2.5 py-1">
                      <I className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 4. Pharmacological */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Pill className="w-3.5 h-3.5" style={{ color: '#c9b896' }} />
                <p className="text-xs font-bold" style={{ color: 'rgba(240,244,248,0.55)' }}>4. Pharmacological Audit</p>
              </div>
              <div className="space-y-1.5">
                {[
                  { icon: Pill, color: '#c9b896', text: 'Evaluate current SSRIs — if depression stable, consider withdrawing weight-promoting agents' },
                  { icon: Eye, color: '#c9b896', text: '"Ozempic Face" risk — age 75 + high TBWL goal → proactive skin-elasticity referral if >10% loss' },
                ].map((item, i) => {
                  const I = item.icon
                  return (
                    <div key={i} className="flex items-start gap-2.5 py-1">
                      <I className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                      <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <Divider />

          {/* ═══ III. SAFETY STACK ═══ */}
          <div>
            <SectionHeader roman="III" title="Safety Stack" />
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Shield, label: 'Nausea Shield', detail: 'Ginger 500 mg + Domperidone 10 mg TID pre-injection', color: '#7fb5c9' },
                { icon: Timer, label: 'Decay Delay', detail: 'If GI flare → delay next pen 24–48h (do not skip full week)', color: '#c9b896' },
                { icon: Droplets, label: 'Hydration Floor', detail: '2.5 L/day mandatory + oral electrolytes if vomiting', color: '#7fb5c9' },
                { icon: Pill, label: 'Motility Guard', detail: 'Magnesium Citrate 400 mg nightly + fiber pre-treatment', color: '#a99cc4' },
                { icon: Dumbbell, label: 'Orthostatic Protocol', detail: 'Two-stage rise (sit → pause 5s → stand). Fall risk: age + dizziness', color: '#c9b896' },
                { icon: AlertTriangle, label: 'Compound Risk', detail: 'All 5 factors combined → cascading depletion risk in weeks 1–4', color: '#c97f7f' },
              ].map((item, i) => {
                const I = item.icon
                return (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(240,244,248,0.06)' }}>
                    <I className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: item.color }} />
                    <div>
                      <p className="text-[11px] font-semibold" style={{ color: '#f0f4f8' }}>{item.label}</p>
                      <p className="text-[10px] leading-snug" style={{ color: 'rgba(240,244,248,0.4)' }}>{item.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-7 py-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(240,244,248,0.06)' }}>
          <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.2)' }}>Generated by DoseGuide GLP Adaptive Intake · First Dose Health</p>
          <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.2)' }}>For clinician review only · Not autonomous prescribing</p>
        </div>
      </motion.div>

      {/* ── Action Panel (right sidebar) ── */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-56 flex-shrink-0 sticky top-20"
      >
        <div className="rounded-xl overflow-hidden"
          style={{ background: 'rgba(11,15,22,0.85)', border: '1px solid rgba(240,244,248,0.1)' }}>

          <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: 'rgba(240,244,248,0.35)' }}>
              Clinician Decision
            </p>
          </div>

          {decision ? (
            <div className="p-4">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: decision === 'approved' ? 'rgba(127,181,201,0.12)' : decision === 'modified' ? 'rgba(201,184,150,0.12)' : 'rgba(201,127,127,0.12)' }}>
                  {decision === 'approved' ? <CheckCircle className="w-5 h-5" style={{ color: '#7fb5c9' }} /> :
                   decision === 'modified' ? <Clock className="w-5 h-5" style={{ color: '#c9b896' }} /> :
                   <XCircle className="w-5 h-5" style={{ color: '#c97f7f' }} />}
                </div>
                <p className="text-xs font-bold mb-1" style={{ color: decision === 'approved' ? '#7fb5c9' : decision === 'modified' ? '#c9b896' : '#c97f7f' }}>
                  {decision === 'approved' ? 'Approved' : decision === 'modified' ? 'Modified' : 'Rejected'}
                </p>
                <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(240,244,248,0.4)' }}>
                  {decision === 'approved' ? '8-week hold initiated. Safety stack active.' :
                   decision === 'modified' ? 'Safety stack added. Awaiting pharmacy.' :
                   'In-person review required.'}
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {[
                {
                  id: 'approved',
                  label: 'Approve',
                  sublabel: 'Adaptive plan',
                  color: '#7fb5c9',
                  bg: 'rgba(127,181,201,0.08)',
                  border: 'rgba(127,181,201,0.25)',
                  icon: CheckCircle,
                },
                {
                  id: 'modified',
                  label: 'Modify',
                  sublabel: 'Add safety stack',
                  color: '#c9b896',
                  bg: 'rgba(201,184,150,0.06)',
                  border: 'rgba(201,184,150,0.15)',
                  icon: PauseCircle,
                },
                {
                  id: 'rejected',
                  label: 'Reject',
                  sublabel: 'In-person review',
                  color: '#c97f7f',
                  bg: 'rgba(201,127,127,0.06)',
                  border: 'rgba(201,127,127,0.15)',
                  icon: XCircle,
                },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <button key={action.id}
                    onClick={() => handleDecision(action.id)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200"
                    style={{ background: action.bg, border: `1px solid ${action.border}` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = action.color }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = action.border }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: action.color }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: action.color }}>{action.label}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.35)' }}>{action.sublabel}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>

      </div> {/* end flex row */}

      {/* ═══════════ CONFIRMATION MODAL ═══════════ */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)' }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-xl overflow-hidden"
              style={{ background: 'rgba(11,15,22,0.98)', border: '1px solid rgba(240,244,248,0.12)' }}
            >
              <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(240,244,248,0.4)' }}>Confirm Decision</p>
                  <button onClick={() => setShowModal(false)} className="p-1 rounded-lg transition-colors" style={{ color: 'rgba(240,244,248,0.4)' }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-semibold text-ink mb-2">
                  {modalAction === 'approved' ? 'Approve Adaptive Plan for Casey Rodriguez?' :
                   modalAction === 'modified' ? 'Approve Modified Plan with Safety Stack?' :
                   'Reject Plan — Require In-Person Review?'}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>
                  {modalAction === 'approved' ? 'This will initiate the 2.5 mg starter pen with an 8-week hold, delayed 7 days for the hormonal window. The patient will be notified and the safety stack activated.' :
                   modalAction === 'modified' ? 'This adds Domperidone (10 mg TID), Magnesium Citrate (400 mg nightly), and a 1.5 g/kg protein floor to the adaptive plan. Pharmacy will be notified.' :
                   'This flags the patient for in-person review. No GLP-1 therapy will be initiated until the clinician completes a face-to-face assessment.'}
                </p>
              </div>
              <div className="px-6 py-4 flex gap-3">
                <button onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{ border: '1px solid rgba(240,244,248,0.1)', color: 'rgba(240,244,248,0.55)' }}>
                  Cancel
                </button>
                <button onClick={confirmDecision}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{
                    background: modalAction === 'approved' ? '#7fb5c9' : modalAction === 'modified' ? '#c9b896' : '#c97f7f',
                    color: '#0a0e14',
                  }}>
                  {modalAction === 'approved' ? <><CheckCircle className="w-4 h-4" /> Approve</> :
                   modalAction === 'modified' ? <><PauseCircle className="w-4 h-4" /> Modify &amp; Approve</> :
                   <><XCircle className="w-4 h-4" /> Reject</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
