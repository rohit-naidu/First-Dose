'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import {
  ArrowLeft, CheckCircle, XCircle, PauseCircle, Clock,
  ChevronRight, X, AlertTriangle,
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
    <div className="max-w-4xl">
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

      {/* ═══════════ THE REPORT ═══════════ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="rounded-xl overflow-hidden mb-6"
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

        {/* Report Body */}
        <div className="px-7 py-6 space-y-8">

          {/* ═══ I. BIOLOGICAL RISK INDICES ═══ */}
          <div>
            <SectionHeader roman="I" title="Biological Risk Indices — Quantified Decision Support" />
            <p className="text-xs mb-4" style={{ color: 'rgba(240,244,248,0.35)' }}>
              These indices combine multiple intake signals to predict treatment-limiting events before the first injection.
            </p>

            <div className="rounded-md overflow-hidden" style={{ border: '1px solid rgba(240,244,248,0.1)' }}>
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

          {/* ═══ II. PRESCRIBING INTELLIGENCE ═══ */}
          <div>
            <SectionHeader roman="II" title="Novel Clinical Prescribing Intelligence" />

            {/* 1. Resilient Titration */}
            <div className="mb-7">
              <p className="text-xs font-bold mb-3" style={{ color: 'rgba(240,244,248,0.5)' }}>
                1. The "Resilient Titration" Roadmap — Fixed-Pen Logistics
              </p>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>8-Week "Ileal Brake" Adaptation:</strong>{' '}
                Casey is a "Hungry Gut" type (hunger return &lt; 2 hours), making her a prime GLP-1 responder — but she faces extreme GI shock risk.
                Hold the 2.5 mg starter pen for <strong style={{ color: '#c9b896' }}>8–12 weeks</strong> to allow the ileal brake reflex to adapt to slowed gastric emptying.
                Standard 4-week jumps will trigger severe nausea in this phenotype.
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Hormonal Hold Window:</strong>{' '}
                Based on Casey&apos;s cycle data (LMP 12 days ago, 28-day cycle), she will enter a high-estrogen peak during Week 1.
                <strong style={{ color: '#c97f7f' }}> Delay initiation by 7 days</strong> to avoid the 2.5× emetic sensitivity multiplier associated with periovulatory estrogen peaks.
              </Bullet>
              <Callout color="sand">
                Fixed-pen constraint: Velocity is manipulated through duration, not dose granularity. Casey must remain on 2.5 mg for the full gating window. Do not request the 5.0 mg pen until the clinician confirms GI tolerance at the 8-week mark.
              </Callout>
            </div>

            {/* 2. Musculoskeletal */}
            <div className="mb-7">
              <p className="text-xs font-bold mb-3" style={{ color: 'rgba(240,244,248,0.5)' }}>
                2. Musculoskeletal Integrity Guard — The "Strength Floor"
              </p>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Depletive Metabotype:</strong>{' '}
                Casey&apos;s failed Chair Stand Test combined with age 75 places her in the highest risk tier for lean mass depletion.
                Without intervention, up to <strong style={{ color: '#c97f7f' }}>39% of weight lost may come from muscle</strong> rather than fat.
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Paradox — Musculoskeletal Super-Responder:</strong>{' '}
                This demographic (older female, high BMI, joint pain history) is statistically 2× more likely to achieve &gt;15% total body weight loss.
                The opportunity is large, but the structural guardrails must be absolute.
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Action:</strong>{' '}
                Mandate a <strong style={{ color: '#7fb5c9' }}>Protein Floor of 1.5 g/kg/day</strong> and 2 days of supervised resistance training per week.
                Do not approve the second pen strength until functional strength is verified.
                Lock the dose if chair stand performance declines — even if weight loss is active.
              </Bullet>
              <Callout color="coral">
                Dose lock condition: Scale weight does not override muscle floor. If functional strength declines at any dose, hold escalation and trigger clinician review.
              </Callout>
            </div>

            {/* 3. Neurologic Reset */}
            <div className="mb-7">
              <p className="text-xs font-bold mb-3" style={{ color: 'rgba(240,244,248,0.5)' }}>
                3. The "Neurologic Reset" Opportunity — Compulsive Behavior Pathway
              </p>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Reward Circuit Signal:</strong>{' '}
                Casey&apos;s "Often" emotional eating score combined with high food noise suggests her hypothalamic reward circuitry is chronically over-activated.
                GLP-1 agonists stabilize central dopamine tone — this patient has a high probability of <strong style={{ color: '#7fb5c9' }}>Secondary Habit Freedom</strong> (reduced cravings for alcohol, habitual snacking, compulsive behaviors).
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Hedonic Tone Risk:</strong>{' '}
                Baseline anhedonia is elevated ("Nearly every day" on PHQ-2). GLP-1 therapy can further suppress dopamine.
                If life pleasure flattens while weight declines, this is a <strong style={{ color: '#c97f7f' }}>neurological emergency</strong> — not a side effect to tolerate.
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Clinician Action:</strong>{' '}
                Frame the medication as a "Neurologic Reset" tool. Monitor anhedonia at every check-in.
                If mood flatness emerges, enforce an absolute <strong style={{ color: '#c9b896' }}>Minimal Effective Dose lock</strong> — prioritize "life joy" over "scale weight."
              </Bullet>
              <Callout color="slate">
                Hedonic Tone Protection: Central dopamine downregulation is the hidden cost of aggressive titration in anhedonia-positive patients. Do not escalate past the dose where food noise resolves unless mood is verified as stable or improving.
              </Callout>
            </div>

            {/* 4. Pharmacological Audit */}
            <div className="mb-0">
              <p className="text-xs font-bold mb-3" style={{ color: 'rgba(240,244,248,0.5)' }}>
                4. Pharmacological Audit &amp; Facial Architecture Risk
              </p>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>Weight-Promoting Medication Check:</strong>{' '}
                Based on Casey&apos;s mood history, evaluate current SSRIs. If depression is stable, consider withdrawing weight-promoting agents
                (e.g., sertraline, mirtazapine) to avoid dual-agent metabolic interference. Coordinate with prescribing psychiatrist.
              </Bullet>
              <Bullet>
                <strong style={{ color: '#f0f4f8' }}>"Ozempic Face" Risk — Facial Architecture:</strong>{' '}
                Age 75 + high BMI + aggressive weight-loss trajectory = extreme risk for facial volume depletion and skin laxity.
                Proactively discuss cosmetic expectations. Consider early referral for dermal filler planning or skin-elasticity support if weight loss exceeds 10% TBWL.
              </Bullet>
            </div>
          </div>

          <Divider />

          {/* ═══ III. SAFETY STACK ═══ */}
          <div>
            <SectionHeader roman="III" title="Proactive Safety Stack &amp; Rescue Protocols" />

            <div className="space-y-1 mb-4">
              {[
                {
                  label: 'Nausea Shield',
                  detail: 'Proactively prescribe South Indian Ginger extract (500 mg) pre-injection. Consider Domperidone (10 mg TID) 30 minutes before the first injection to physically clear the stomach and lower emetic threshold.',
                },
                {
                  label: 'Skip-Dose Safety Valve',
                  detail: 'If a GI flare occurs post-injection, instruct Casey to delay her next pen injection by 24–48 hours to allow drug levels to decay slightly (the "Decay Delay" protocol). Do not skip a full week.',
                },
                {
                  label: 'Hydration Mandate',
                  detail: 'Dizziness on standing + baseline fluid intake < 1 L/day. Set a mandatory 2.5 L Hydration/Electrolyte Floor. Add oral electrolytes if nausea or vomiting occurs. Monitor for syncopal events.',
                },
                {
                  label: 'Constipation Prophylaxis',
                  detail: 'GLP-1 slowed motility on top of age-related slowing. Begin Magnesium Citrate (400 mg nightly) + fiber supplement pre-treatment. Titrate up before escalating the pen.',
                },
                {
                  label: 'Orthostatic Protocol',
                  detail: 'Instruct Casey to rise from sitting in two stages (sit → stand, pause 5 seconds). Relevant to fall risk given age + dizziness baseline + appetite suppression.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <span className="text-[10px] font-bold w-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(240,244,248,0.3)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: '#f0f4f8' }}>{item.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <Callout color="coral">
              <strong>Critical age-related compound risk:</strong> Casey is 75 with orthostatic symptoms, low hydration, failed chair stand, and extreme GI sensitivity.
              Any single factor is manageable — combined, they create a cascading depletion risk during the first 4 weeks. Do not escalate without confirming all safety stack items are in place and functional strength is preserved.
            </Callout>
          </div>

          <Divider />

          {/* ═══ IV. CLINICIAN ACTION PORTAL ═══ */}
          <div>
            <SectionHeader roman="IV" title="Clinician Action Portal" />

            {decision ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-5 flex items-center gap-4"
                style={{
                  background: decision === 'approved' ? 'rgba(127,181,201,0.08)' : decision === 'modified' ? 'rgba(201,184,150,0.08)' : 'rgba(201,127,127,0.08)',
                  border: `1px solid ${decision === 'approved' ? 'rgba(127,181,201,0.2)' : decision === 'modified' ? 'rgba(201,184,150,0.2)' : 'rgba(201,127,127,0.2)'}`,
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: decision === 'approved' ? 'rgba(127,181,201,0.12)' : decision === 'modified' ? 'rgba(201,184,150,0.12)' : 'rgba(201,127,127,0.12)' }}>
                  {decision === 'approved' ? <CheckCircle className="w-5 h-5" style={{ color: '#7fb5c9' }} /> :
                   decision === 'modified' ? <Clock className="w-5 h-5" style={{ color: '#c9b896' }} /> :
                   <XCircle className="w-5 h-5" style={{ color: '#c97f7f' }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: decision === 'approved' ? '#7fb5c9' : decision === 'modified' ? '#c9b896' : '#c97f7f' }}>
                    {decision === 'approved' ? 'Adaptive Plan Approved' : decision === 'modified' ? 'Plan Modified — Safety Stack Added' : 'Rejected — In-Person Review Required'}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.45)' }}>
                    {decision === 'approved' ? 'Starter pen initiated. 8-week hold. Initiation delayed 7 days for cycle window. Safety stack active.' :
                     decision === 'modified' ? 'Domperidone + Magnesium added. Protein floor set. Awaiting pharmacy confirmation before first injection.' :
                     'Clinician determined in-person review is required before initiating GLP-1 therapy for this patient.'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {[
                  {
                    id: 'approved',
                    label: 'APPROVE — ADAPTIVE',
                    desc: 'Initiate 2.5 mg starter pen. Set 8-week hold at current dose. Delay initiation 7 days for hormonal window. Activate full safety stack.',
                    color: '#7fb5c9',
                    bg: 'rgba(127,181,201,0.06)',
                    border: 'rgba(127,181,201,0.2)',
                    icon: CheckCircle,
                  },
                  {
                    id: 'modified',
                    label: 'MODIFY — ADD SAFETY STACK',
                    desc: 'Approve adaptive plan + add prokinetic (Domperidone 10 mg TID) and Magnesium Citrate (400 mg nightly). Protein floor 1.5 g/kg/day. Require follow-up before first injection.',
                    color: '#c9b896',
                    bg: 'rgba(201,184,150,0.06)',
                    border: 'rgba(201,184,150,0.2)',
                    icon: PauseCircle,
                  },
                  {
                    id: 'rejected',
                    label: 'REJECT — IN-PERSON REVIEW',
                    desc: 'Compound risk profile (age + orthostatic + GI extreme + failed chair stand) requires in-person clinical assessment before initiating GLP-1 therapy.',
                    color: '#c97f7f',
                    bg: 'rgba(201,127,127,0.06)',
                    border: 'rgba(201,127,127,0.2)',
                    icon: XCircle,
                  },
                ].map((action) => {
                  const Icon = action.icon
                  return (
                    <button key={action.id}
                      onClick={() => handleDecision(action.id)}
                      className="w-full flex items-start gap-4 px-5 py-4 rounded-lg text-left transition-all duration-200 group"
                      style={{ background: action.bg, border: `1px solid ${action.border}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = action.color }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = action.border }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: action.color }} />
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-[0.1em] mb-1" style={{ color: action.color }}>{action.label}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>{action.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: action.color }} />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(240,244,248,0.06)' }}>
          <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.2)' }}>Generated by DoseGuide GLP Adaptive Intake · First Dose Health</p>
          <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.2)' }}>For clinician review only · Not autonomous prescribing</p>
        </div>
      </motion.div>

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
