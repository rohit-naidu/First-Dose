'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import {
  ArrowLeft, ShieldCheck, AlertCircle, AlertTriangle, XCircle,
  Clock, Zap, Flame, Coffee, Smile, Meh, Frown, CloudRain,
  Droplets, Wind, Activity, PersonStanding, Dumbbell, HelpCircle,
  Star, CheckCircle2, ThumbsDown, Ban,
  TrendingUp, CheckCircle, ChevronRight,
} from 'lucide-react'

// ── theme palette (dark glass variants) ───────────────────────────────────────
const T = {
  green:  { bg: 'rgba(127,181,201,0.06)', icon: '#7fb5c9', border: 'rgba(127,181,201,0.25)', selected: 'rgba(127,181,201,0.14)' },
  teal:   { bg: 'rgba(127,181,201,0.06)', icon: '#7fb5c9', border: 'rgba(127,181,201,0.25)', selected: 'rgba(127,181,201,0.14)' },
  yellow: { bg: 'rgba(201,184,150,0.06)', icon: '#c9b896', border: 'rgba(201,184,150,0.25)', selected: 'rgba(201,184,150,0.14)' },
  orange: { bg: 'rgba(201,184,150,0.08)', icon: '#c9b896', border: 'rgba(201,184,150,0.3)',  selected: 'rgba(201,184,150,0.16)' },
  red:    { bg: 'rgba(201,127,127,0.06)', icon: '#c97f7f', border: 'rgba(201,127,127,0.25)', selected: 'rgba(201,127,127,0.14)' },
  indigo: { bg: 'rgba(169,156,196,0.06)', icon: '#a99cc4', border: 'rgba(169,156,196,0.25)', selected: 'rgba(169,156,196,0.14)' },
  blue:   { bg: 'rgba(127,181,201,0.06)', icon: '#7fb5c9', border: 'rgba(127,181,201,0.25)', selected: 'rgba(127,181,201,0.14)' },
  purple: { bg: 'rgba(169,156,196,0.06)', icon: '#a99cc4', border: 'rgba(169,156,196,0.25)', selected: 'rgba(169,156,196,0.14)' },
  pink:   { bg: 'rgba(201,127,127,0.06)', icon: '#c97f7f', border: 'rgba(201,127,127,0.25)', selected: 'rgba(201,127,127,0.14)' },
}

const questions = [
  // Q1: Sex at birth
  {
    id: 'q1', category: 'Baseline', categoryColor: '#7fb5c9',
    shortQ: 'Sex assigned at birth?', sub: 'Helps identify hormonal context for dose timing',
    type: 'single_select', accentColor: '#7fb5c9', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: ShieldCheck, label: 'Female', sub: 'Female', theme: T.green },
      { icon: ShieldCheck, label: 'Male', sub: 'Male', theme: T.teal },
      { icon: HelpCircle, label: 'Prefer to discuss', sub: 'With clinician', theme: T.indigo },
    ],
  },
  // Q2: Safety gate (multi-select)
  {
    id: 'q2', category: 'Safety Check', categoryColor: '#c97f7f',
    shortQ: 'Medical history check', sub: 'Any of these contraindications?',
    type: 'multi_select', accentColor: '#c97f7f', bgFrom: '#0a0e14', bgTo: '#0d1220',
    multiExclusive: ['None of these', 'Not sure'],
    options: [
      { icon: XCircle, label: 'Medullary thyroid cancer', sub: 'Or MEN2 syndrome', theme: T.red },
      { icon: AlertTriangle, label: 'MEN2 syndrome', sub: 'Family history', theme: T.red },
      { icon: XCircle, label: 'Pancreatitis history', sub: 'Ever diagnosed', theme: T.red },
      { icon: Wind, label: 'Severe gastroparesis', sub: 'Stomach emptying problem', theme: T.orange },
      { icon: AlertCircle, label: 'Severe GLP-1 allergy', sub: 'Anaphylaxis history', theme: T.red },
      { icon: CheckCircle, label: 'None of these', sub: 'Clear history', theme: T.green },
      { icon: HelpCircle, label: 'Not sure', sub: 'Uncertain', theme: T.indigo },
    ],
  },
  // Q3: Cycle nausea (female only)
  {
    id: 'q3', category: 'Cycle Context', categoryColor: '#c97f7f',
    shortQ: 'Cycle-linked symptoms?', sub: 'Nausea, GI changes, or mood shifts before period',
    type: 'single_select', accentColor: '#c97f7f', bgFrom: '#0a0e14', bgTo: '#0d1220',
    showIf: (answers) => answers['q1'] === 'Female',
    options: [
      { icon: ShieldCheck, label: 'No', sub: 'No clear pattern', theme: T.green },
      { icon: AlertCircle, label: 'Sometimes', sub: 'Mild pattern', theme: T.yellow },
      { icon: AlertTriangle, label: 'Often', sub: 'Each cycle', theme: T.orange },
      { icon: Ban, label: 'N/A', sub: 'Skip this', theme: T.teal },
    ],
  },
  // Q4: Oral contraceptive (female only)
  {
    id: 'q4', category: 'Cycle Context', categoryColor: '#c97f7f',
    shortQ: 'Oral contraceptive?', sub: 'May affect medication absorption',
    type: 'single_select', accentColor: '#c97f7f', bgFrom: '#0a0e14', bgTo: '#0d1220',
    showIf: (answers) => answers['q1'] === 'Female',
    options: [
      { icon: ShieldCheck, label: 'No', sub: 'Not using', theme: T.green },
      { icon: AlertCircle, label: 'Yes', sub: 'Active pill/patch/ring', theme: T.orange },
      { icon: HelpCircle, label: 'Not sure', sub: 'Uncertain', theme: T.indigo },
    ],
  },
  // Q5: Diabetes medications
  {
    id: 'q5', category: 'Medication Safety', categoryColor: '#c97f7f',
    shortQ: 'Insulin or sulfonylurea?', sub: 'Current medications that affect blood sugar',
    type: 'single_select', accentColor: '#c97f7f', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: ShieldCheck, label: 'No', sub: 'Not taking', theme: T.green },
      { icon: AlertTriangle, label: 'Yes', sub: 'Active use', theme: T.orange },
      { icon: HelpCircle, label: 'Not sure', sub: 'Uncertain', theme: T.indigo },
    ],
  },
  // Q6: Emetic sensitivity
  {
    id: 'q6', category: 'Nausea Sensitivity', categoryColor: '#c9b896',
    shortQ: 'Prone to nausea?', sub: 'Motion sickness, anesthesia, or medication nausea',
    type: 'single_select', accentColor: '#c9b896', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: ShieldCheck, label: 'No', sub: 'No issues', theme: T.green },
      { icon: AlertCircle, label: 'Mildly', sub: 'Occasional', theme: T.yellow },
      { icon: Wind, label: 'Very prone', sub: 'Strong reaction', theme: T.red },
    ],
  },
  // Q7: Hunger return
  {
    id: 'q7', category: 'Appetite Signal', categoryColor: '#7fb5c9',
    shortQ: 'Hunger after meals?', sub: 'How quickly does it return after eating',
    type: 'single_select', accentColor: '#7fb5c9', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: Clock, label: 'Often (1–2h)', sub: 'Hungry quickly', theme: T.orange },
      { icon: Coffee, label: 'Sometimes (2–3h)', sub: 'Medium', theme: T.yellow },
      { icon: Zap, label: 'Rarely (4+h)', sub: 'Stays full', theme: T.green },
    ],
  },
  // Q8: GI symptoms (multi-select)
  {
    id: 'q8', category: 'GI Baseline', categoryColor: '#c9b896',
    shortQ: 'Baseline GI symptoms?', sub: 'Before any medication',
    type: 'multi_select', accentColor: '#c9b896', bgFrom: '#0a0e14', bgTo: '#0d1220',
    multiExclusive: ['None of these'],
    options: [
      { icon: AlertTriangle, label: 'Reflux or heartburn', sub: 'Acid issues', theme: T.orange },
      { icon: Wind, label: 'Sulfur burps', sub: 'Gas-related', theme: T.yellow },
      { icon: AlertTriangle, label: 'Constipation', sub: 'Fewer than 3×/week', theme: T.orange },
      { icon: Droplets, label: 'Bloating', sub: 'Food sits too long', theme: T.red },
      { icon: CheckCircle, label: 'None of these', sub: 'Clear GI baseline', theme: T.green },
    ],
  },
  // Q9: Dizziness
  {
    id: 'q9', category: 'Autonomic Stability', categoryColor: '#7fb5c9',
    shortQ: 'Dizzy when standing?', sub: 'Lightheadedness or racing heart on quick stand',
    type: 'single_select', accentColor: '#7fb5c9', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: ShieldCheck, label: 'No', sub: 'No issues', theme: T.green },
      { icon: AlertCircle, label: 'Sometimes', sub: 'Occasionally', theme: T.yellow },
      { icon: Wind, label: 'Often', sub: 'Frequent dizziness', theme: T.red },
    ],
  },
  // Q10: Food noise
  {
    id: 'q10', category: 'Reward Baseline', categoryColor: '#a99cc4',
    shortQ: 'Food noise?', sub: 'Cravings make it hard to stop thinking about food',
    type: 'single_select', accentColor: '#a99cc4', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: Smile, label: 'Often', sub: 'High food noise', theme: T.orange },
      { icon: Meh, label: 'Sometimes', sub: 'Moderate', theme: T.yellow },
      { icon: Smile, label: 'Rarely', sub: 'Low food noise', theme: T.green },
    ],
  },
  // Q11: Emotional eating
  {
    id: 'q11', category: 'Reward Baseline', categoryColor: '#a99cc4',
    shortQ: 'Emotional eating?', sub: 'Stress, boredom, or emotions trigger eating when not hungry',
    type: 'single_select', accentColor: '#a99cc4', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: Frown, label: 'Often', sub: 'Common pattern', theme: T.orange },
      { icon: Meh, label: 'Sometimes', sub: 'Occasional', theme: T.yellow },
      { icon: Smile, label: 'Rarely', sub: 'Not a trigger', theme: T.green },
    ],
  },
  // Q12: Anhedonia
  {
    id: 'q12', category: 'Reward Baseline', categoryColor: '#a99cc4',
    shortQ: 'Loss of pleasure?', sub: 'Past 2 weeks — interest in hobbies, socializing, activities',
    type: 'single_select', accentColor: '#a99cc4', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: Star, label: 'Not at all', sub: 'Still enjoy things', theme: T.green },
      { icon: Meh, label: 'Several days', sub: 'Some reduction', theme: T.yellow },
      { icon: Frown, label: 'Half+ the days', sub: 'Much less enjoyment', theme: T.orange },
      { icon: CloudRain, label: 'Nearly every day', sub: 'Very little pleasure', theme: T.red },
    ],
  },
  // Q13: Chair stand
  {
    id: 'q13', category: 'Strength Floor', categoryColor: '#a99cc4',
    shortQ: 'Stand from chair?', sub: 'Without using your arms for support',
    type: 'single_select', accentColor: '#a99cc4', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: PersonStanding, label: 'Yes, easily', sub: 'No problem', theme: T.green },
      { icon: Activity, label: 'Yes, difficult', sub: 'Takes effort', theme: T.orange },
      { icon: Dumbbell, label: 'No', sub: 'Need help', theme: T.red },
    ],
  },
  // Q14: Prior GLP experience
  {
    id: 'q14', category: 'Prior Response', categoryColor: '#7fb5c9',
    shortQ: 'Tried GLP-1 before?', sub: 'Semaglutide, tirzepatide, or similar',
    type: 'single_select', accentColor: '#7fb5c9', bgFrom: '#0a0e14', bgTo: '#0d1220',
    options: [
      { icon: Star, label: 'No', sub: 'First time', theme: T.teal },
      { icon: CheckCircle2, label: 'Yes, tolerated', sub: 'No issues', theme: T.green },
      { icon: ThumbsDown, label: 'Yes, side effects', sub: 'Had to adjust', theme: T.yellow },
      { icon: Ban, label: "Yes, didn't work", sub: 'Low response', theme: T.orange },
      { icon: AlertCircle, label: 'Stopped — cost', sub: 'Access issue', theme: T.red },
    ],
  },
  // Q15: Prior side effects (conditional on Q14)
  {
    id: 'q15', category: 'Prior Response', categoryColor: '#7fb5c9',
    shortQ: 'Which side effect?', sub: 'What bothered you most',
    type: 'multi_select', accentColor: '#7fb5c9', bgFrom: '#0a0e14', bgTo: '#0d1220',
    showIf: (answers) => answers['q14'] === 'Yes, side effects',
    multiExclusive: [],
    options: [
      { icon: Frown, label: 'Nausea', sub: 'Mild or severe', theme: T.orange },
      { icon: Wind, label: 'Vomiting', sub: 'Actual vomiting', theme: T.red },
      { icon: AlertTriangle, label: 'Reflux', sub: 'Heartburn/acid', theme: T.orange },
      { icon: AlertCircle, label: 'Constipation', sub: 'Bowel issues', theme: T.yellow },
      { icon: Droplets, label: 'Dizziness', sub: 'Orthostatic', theme: T.orange },
      { icon: Smile, label: 'Fatigue', sub: 'Low energy', theme: T.yellow },
      { icon: CloudRain, label: 'Mood changes', sub: 'Emotional', theme: T.red },
      { icon: HelpCircle, label: 'Other', sub: 'Something else', theme: T.indigo },
    ],
  },
]

const analyzeSteps = [
  'Running safety screening…',
  'Processing biological baseline…',
  'Evaluating emetic sensitivity…',
  'Mapping GI motility brakes…',
  'Assessing autonomic stability…',
  'Reading appetite response signal…',
  'Analyzing reward and food noise…',
  'Evaluating mood baseline…',
  'Checking strength floor…',
  'Reviewing prior GLP response…',
  'Generating Dose Readiness Report…',
]

export default function IntakeFormCore({ onComplete, mode = 'patient' }) {
  const { completeIntake, showToast, setIntakeOutputs, setPatientInfo } = useStore()
  const store = useStore()

  const [screen, setScreen] = useState('welcome')
  const [infoName, setInfoName] = useState('Sarah Johnson')
  const [infoDOB, setInfoDOB] = useState('03 / 14 / 1989')
  const [direction, setDirection] = useState(1)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState({})
  const [multiSelected, setMultiSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [analyzeStep, setAnalyzeStep] = useState(0)
  const [analyzeProgress, setAnalyzeProgress] = useState(0)
  const topRef = useRef(null)

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [screen])

  const visibleQuestions = useMemo(() =>
    questions.filter(q => !q.showIf || q.showIf(answers)),
    [answers]
  )
  const totalQ = visibleQuestions.length
  const currentQ = typeof screen === 'number' ? screen : 0
  const q = visibleQuestions[currentQ]

  const handleAnswer = (i) => {
    if (selected !== null) return
    setSelected(i)
    setTimeout(() => {
      const newAnswers = { ...answers, [q.id]: q.options[i].label }
      setAnswers(newAnswers)
      if (typeof screen === 'number' && screen < totalQ - 1) {
        setDirection(1)
        setSelected(null)
        setScreen(screen + 1)
      } else {
        setLoading(true)
        setScreen('analyze')
      }
    }, 520)
  }

  const handleMultiSelect = (label) => {
    const exclusive = q.multiExclusive || []
    const isExclusive = exclusive.includes(label)
    const otherExclusive = exclusive.filter(e => e !== label)

    setMultiSelected((prev) => {
      if (prev.includes(label)) {
        return prev.filter(l => l !== label)
      } else {
        const updated = [...prev, label]
        if (isExclusive) {
          return updated.filter(l => !otherExclusive.includes(l))
        } else {
          return updated.filter(l => !exclusive.includes(l)).concat([label])
        }
      }
    })
  }

  const handleMultiContinue = () => {
    if (multiSelected.length > 0) {
      const newAnswers = { ...answers, [q.id]: multiSelected }
      setAnswers(newAnswers)
      if (typeof screen === 'number' && screen < totalQ - 1) {
        setDirection(1)
        setMultiSelected([])
        setScreen(screen + 1)
      } else {
        setLoading(true)
        setScreen('analyze')
      }
    }
  }

  const goBack = () => {
    if (selected !== null || multiSelected.length > 0) return
    if (typeof screen === 'number') {
      if (screen > 0) {
        setDirection(-1)
        setScreen(screen - 1)
      } else {
        setDirection(-1)
        setScreen('welcome')
      }
    }
  }

  useEffect(() => {
    if (!loading) return
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step < analyzeSteps.length) {
        setAnalyzeStep(step)
        setAnalyzeProgress((step / analyzeSteps.length) * 100)
      } else {
        clearInterval(timer)
        setAnalyzeProgress(100)
        setTimeout(() => {
          // Compute dose readiness
          const safetyTriggered =
            (Array.isArray(answers['q2']) && answers['q2'].some(a => !['None of these', 'Not sure'].includes(a))) ||
            answers['q5'] !== 'No'

          const pauseCount = [
            answers['q6'] === 'Very prone',
            answers['q9'] === 'Often',
            Array.isArray(answers['q8']) && answers['q8'].some(a => a.includes('Bloating')),
            answers['q13'] === 'No',
            typeof answers['q14'] === 'string' && answers['q14'].includes('side effects'),
          ].filter(Boolean).length

          let doseReadiness = 'PAUSE'
          if (safetyTriggered) doseReadiness = 'SAFETY_REVIEW'
          else if (answers['q7'] === 'Rarely' && pauseCount === 0) doseReadiness = 'PUSH'
          else if (pauseCount >= 2) doseReadiness = 'PAUSE'

          setIntakeOutputs({ ...store.intakeOutputs, doseReadiness })
          setPatientInfo(infoName.trim() || 'Patient', infoDOB.trim())
          completeIntake()
          showToast('Dose Readiness Report ready!')
          onComplete()
        }, 700)
      }
    }, 430)
    return () => clearInterval(timer)
  }, [loading])

  // ── Analyze screen ──────────────────────────────────────────────────────────
  if (screen === 'analyze') {
    return (
      <div ref={topRef} className="flex flex-col items-center justify-center px-8 py-16 min-h-screen" style={{ background: 'rgba(10,14,20,0.92)' }}>
        <div className="relative w-28 h-28 mx-auto mb-10">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="absolute inset-0 rounded-full"
              style={{ border: `2px solid rgba(127,181,201,${0.35 - i * 0.1})` }}
              animate={{ scale: [1, 1.5 + i * 0.2], opacity: [1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }} />
          ))}
          <motion.div className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <TrendingUp className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={analyzeStep}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-base font-bold text-white mb-2 text-center"
            style={{ textShadow: '0 0 24px rgba(127,181,201,0.25)' }}>
            {analyzeSteps[analyzeStep]}
          </motion.p>
        </AnimatePresence>
        <p className="text-sm mb-10" style={{ color: 'rgba(240,244,248,0.45)' }}>Building your Dose Readiness Report</p>

        <div className="w-full max-w-xs">
          <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7fb5c9, #a99cc4)' }}
              animate={{ width: `${analyzeProgress}%` }}
              transition={{ duration: 0.35 }} />
          </div>
          <div className="flex justify-between">
            <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>Generating Dose Readiness Report</span>
            <span className="text-xs font-bold" style={{ color: '#7fb5c9' }}>{Math.round(analyzeProgress)}%</span>
          </div>
        </div>

        <div className="flex gap-1.5 mt-8">
          {analyzeSteps.map((_, i) => (
            <motion.div key={i} className="h-1.5 rounded-full"
              animate={{
                width: i <= analyzeStep ? 18 : 6,
                background: i <= analyzeStep ? '#7fb5c9' : 'rgba(255,255,255,0.08)',
              }}
              transition={{ duration: 0.3 }} />
          ))}
        </div>
      </div>
    )
  }

  // ── Info screen ─────────────────────────────────────────────────────────────
  if (screen === 'info') {
    const canContinue = infoName.trim().length > 0 && infoDOB.trim().length > 0
    return (
      <div ref={topRef} className="flex flex-col min-h-screen px-6" style={{ background: 'linear-gradient(160deg, #0a0e14 0%, #0d1220 60%, #0a0e14 100%)' }}>
        <div className="flex-1" />
        <div className="flex flex-col">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#7fb5c9' }}>
            Patient Info
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className="text-2xl font-extrabold text-white mb-6 leading-snug">
            Who is this intake for?
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3 mb-8">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'rgba(240,244,248,0.45)' }}>Full name</label>
              <input
                type="text"
                value={infoName}
                onChange={e => setInfoName(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7fb5c9' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'rgba(240,244,248,0.45)' }}>Date of birth</label>
              <input
                type="text"
                value={infoDOB}
                onChange={e => setInfoDOB(e.target.value)}
                placeholder="MM / DD / YYYY"
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => { e.currentTarget.style.borderColor = '#7fb5c9' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            onClick={() => { if (canContinue) setScreen(0) }}
            className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-opacity"
            style={{
              background: canContinue ? 'linear-gradient(135deg, #7fb5c9, #a99cc4)' : 'rgba(255,255,255,0.08)',
              color: canContinue ? 'white' : 'rgba(240,244,248,0.35)',
              boxShadow: canContinue ? '0 8px 24px rgba(127,181,201,0.25)' : 'none',
              cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="flex-1" />
      </div>
    )
  }

  // ── Welcome screen ──────────────────────────────────────────────────────────
  if (screen === 'welcome') {
    return (
      <div ref={topRef} className="flex flex-col min-h-screen px-6" style={{ background: 'linear-gradient(160deg, #0a0e14 0%, #0d1220 60%, #0a0e14 100%)' }}>
        <div className="flex-1" />

        <div className="flex flex-col items-start">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)' }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#7fb5c9' }}
          >
            {mode === 'clinician' ? 'Clinician-Led' : 'Patient Intake'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-3xl font-extrabold text-white leading-tight mb-4"
          >
            {mode === 'clinician' ? 'Patient\nIntake' : 'Dose Readiness\nAssessment'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'rgba(240,244,248,0.45)' }}
          >
            {mode === 'clinician'
              ? "Read each question aloud and tap the patient's answer. Takes about 5–10 minutes."
              : 'A short adaptive assessment to personalize your dose pacing. Takes about 2–3 minutes.'}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            onClick={() => setScreen('info')}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', boxShadow: '0 8px 24px rgba(127,181,201,0.25)' }}
          >
            Start intake
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex-1" />
      </div>
    )
  }

  // ── Card question screen ─────────────────────────────────────────────────────
  return (
    <div ref={topRef} className="flex flex-col min-h-screen" style={{ background: `linear-gradient(160deg, ${q.bgFrom} 0%, ${q.bgTo} 100%)` }}>

      {/* Top bar */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} disabled={selected !== null || multiSelected.length > 0}
            className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ArrowLeft className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.7)' }} />
          </button>

          <div className="flex-1 flex items-center gap-0.5">
            {visibleQuestions.map((_, i) => (
              <motion.div key={i} className="flex-1 h-1 rounded-full"
                animate={{
                  background: i < currentQ ? q.accentColor : i === currentQ ? q.accentColor : 'rgba(255,255,255,0.08)',
                  opacity: i <= currentQ ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }} />
            ))}
          </div>

          <span className="text-xs font-bold w-10 text-right" style={{ color: q.accentColor }}>
            {currentQ + 1}<span style={{ color: 'rgba(240,244,248,0.45)', fontWeight: 400 }}>/{totalQ}</span>
          </span>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={`${q.id}-view`} custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1 flex flex-col px-5">

          <div className="mb-5">
            {/* Category badge */}
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ background: `${q.categoryColor}18`, color: q.categoryColor }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: q.categoryColor }} />
              {q.category}
            </motion.div>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 320, delay: 0.05 }}
              className="w-7 h-7 rounded-xl flex items-center justify-center text-sm font-extrabold text-white mb-2"
              style={{ background: q.accentColor }}>
              {currentQ + 1}
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
              className="text-xs font-medium mb-1" style={{ color: 'rgba(240,244,248,0.45)' }}>{q.sub}</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-2xl font-extrabold leading-tight" style={{ color: '#f0f4f8' }}>
              {q.shortQ}
            </motion.h2>
          </div>

          {q.type === 'single_select' ? (
            <div className={`grid ${q.options.length === 3 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 pb-8`}>
              {q.options.map((opt, i) => {
                const Icon = opt.icon
                const isSelected = selected === i
                return (
                  <motion.button key={i}
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={{
                      opacity: 1, y: 0,
                      scale: isSelected ? 1.04 : 1,
                      background: isSelected ? opt.theme.selected : 'rgba(255,255,255,0.04)',
                    }}
                    transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 280, damping: 24 }}
                    onClick={() => handleAnswer(i)}
                    className="relative flex flex-col items-center justify-center rounded-3xl py-7 px-3 text-center overflow-hidden"
                    style={{
                      border: isSelected ? `2px solid ${opt.theme.border}` : '1px solid rgba(240,244,248,0.08)',
                      boxShadow: isSelected
                        ? `0 0 0 2px ${opt.theme.border}, 0 8px 20px rgba(0,0,0,0.3)`
                        : 'none',
                    }}
                    whileTap={{ scale: 0.91 }}>

                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: opt.theme.bg, border: `1.5px solid ${opt.theme.border}` }}
                      animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.35 }}>
                      <Icon style={{ width: 28, height: 28, color: opt.theme.icon }} />
                    </motion.div>

                    <p className="text-sm font-bold leading-tight" style={{ color: '#f0f4f8' }}>{opt.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.45)' }}>{opt.sub}</p>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: opt.theme.icon }}>
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1 4.5l3 3L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {q.options.map((opt, i) => {
                  const Icon = opt.icon
                  const isSelected = multiSelected.includes(opt.label)
                  return (
                    <motion.button key={i}
                      initial={{ opacity: 0, y: 16, scale: 0.94 }}
                      animate={{
                        opacity: 1, y: 0,
                        scale: isSelected ? 1.02 : 1,
                        background: isSelected ? opt.theme.selected : 'rgba(255,255,255,0.04)',
                      }}
                      transition={{ delay: 0.12 + i * 0.06, type: 'spring', stiffness: 280, damping: 24 }}
                      onClick={() => handleMultiSelect(opt.label)}
                      className="relative flex items-center gap-3 rounded-2xl py-4 px-4 text-left overflow-hidden"
                      style={{
                        border: isSelected ? `2px solid ${opt.theme.border}` : '1px solid rgba(240,244,248,0.08)',
                        boxShadow: isSelected
                          ? `0 0 0 2px ${opt.theme.border}, 0 8px 20px rgba(0,0,0,0.3)`
                          : 'none',
                      }}
                      whileTap={{ scale: 0.98 }}>

                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: opt.theme.bg, border: `1.5px solid ${opt.theme.border}` }}>
                        <Icon style={{ width: 20, height: 20, color: opt.theme.icon }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold" style={{ color: '#f0f4f8' }}>{opt.label}</p>
                        <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{opt.sub}</p>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: opt.theme.icon }}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4l3 3L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={handleMultiContinue}
                disabled={multiSelected.length === 0}
                className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                style={multiSelected.length > 0
                  ? { background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', color: 'white', boxShadow: '0 8px 24px rgba(127,181,201,0.25)' }
                  : { background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,248,0.35)' }
                }
              >
                Continue
                {multiSelected.length > 0 && <ChevronRight className="w-5 h-5" />}
              </motion.button>
            </>
          )}

          {q.type === 'single_select' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} transition={{ delay: 0.5 }}
              className="text-center text-xs pb-6 px-5" style={{ color: 'rgba(240,244,248,0.45)' }}>
              Tap an answer to continue
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
