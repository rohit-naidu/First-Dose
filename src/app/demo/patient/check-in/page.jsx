'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import PatientBottomNav from '@/components/demo/PatientBottomNav'
import Toast from '@/components/demo/Toast'
import { useStore } from '@/lib/store'
import { CheckCircle, ArrowRight, Clock } from 'lucide-react'

// ── Symptom rating ──────────────────────────────────────────────
const symptomLabels = [
  { key: 'nausea',       label: 'Nausea',       desc: 'Feeling sick to your stomach' },
  { key: 'reflux',       label: 'Acid Reflux',  desc: 'Heartburn or regurgitation' },
  { key: 'dizziness',    label: 'Dizziness',    desc: 'Lightheadedness or unsteadiness' },
  { key: 'constipation', label: 'Constipation', desc: 'Difficulty with bowel movements' },
]

// What each severity level means per symptom
const severityContext = {
  nausea: {
    0: 'No queasiness at all.',
    1: 'Slightly queasy — can eat and drink normally.',
    2: 'Noticeably sick — affects eating, no vomiting.',
    3: 'Unable to eat or drink; vomiting present.',
  },
  reflux: {
    0: 'No heartburn or discomfort.',
    1: 'Occasional mild heartburn after meals.',
    2: 'Frequent heartburn that disrupts eating.',
    3: 'Constant burning or difficulty swallowing.',
  },
  dizziness: {
    0: 'No lightheadedness or balance issues.',
    1: 'Brief lightheadedness when standing up.',
    2: 'Dizziness affects normal daily activities.',
    3: 'Unsteady — unsafe to walk or drive.',
  },
  constipation: {
    0: 'Normal, regular bowel movements.',
    1: 'Slightly less frequent than usual.',
    2: 'Difficult — fewer than 3 times this week.',
    3: 'No movement for 4+ days or severe discomfort.',
  },
}

const severityOptions = [
  { value: 0, label: 'None',     bg: '#f0fdf4', color: '#15803d', border: '#86efac' },
  { value: 1, label: 'Mild',     bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
  { value: 2, label: 'Moderate', bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  { value: 3, label: 'Severe',   bg: '#fef2f2', color: '#b91c1c', border: '#fca5a5' },
]

export default function CheckInPage() {
  const router = useRouter()
  const { completeCheckIn, showToast } = useStore()

  const [screen, setScreen] = useState('gate')
  const [symptoms, setSymptoms] = useState({ nausea: 0, reflux: 0, dizziness: 0, constipation: 0 })
  const [notes, setNotes] = useState('')

  const handleAllGood = () => {
    completeCheckIn({ nausea: 0, reflux: 0, dizziness: 0, constipation: 0 })
    showToast('Check-in submitted — all clear!')
    setScreen('done-ok')
  }

  const handleSymptomSubmit = () => {
    completeCheckIn(symptoms)
    showToast('Check-in submitted — clinician notified')
    setScreen('done-symptoms')
  }

  // ── Gate screen ──────────────────────────────────────────────
  if (screen === 'gate') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl"
              style={{ background: 'linear-gradient(135deg, #f0fdfa, #ecfeff)', border: '1px solid #99f6e4' }}>
              💊
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
              72-hour check-in
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              How have you been feeling since your last dose?
            </p>
          </motion.div>

          <div className="space-y-3">
            {/* All good option */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleAllGood}
              className="w-full text-left flex items-center gap-4 px-5 py-5 rounded-2xl border-2 transition-all active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderColor: '#86efac' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'white', border: '1px solid #bbf7d0' }}>
                😊
              </div>
              <div>
                <p className="text-base font-bold text-green-900">Feeling great — no issues</p>
                <p className="text-xs text-green-700 mt-0.5">Continue my plan as scheduled</p>
              </div>
              <ArrowRight className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
            </motion.button>

            {/* Have symptoms option */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              onClick={() => setScreen('symptoms')}
              className="w-full text-left flex items-center gap-4 px-5 py-5 rounded-2xl border-2 transition-all active:scale-[0.98]"
              style={{ background: '#fffbeb', borderColor: '#fde68a' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'white', border: '1px solid #fde68a' }}>
                🤢
              </div>
              <div>
                <p className="text-base font-bold text-amber-900">I have some symptoms</p>
                <p className="text-xs text-amber-700 mt-0.5">Report to my clinician for review</p>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-500 ml-auto flex-shrink-0" />
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-xs text-slate-400 text-center mt-6 leading-relaxed"
          >
            If no symptoms, your dose will continue as planned.{'\n'}No action needed from your clinician.
          </motion.p>
        </div>
        <PatientBottomNav />
      </div>
    )
  }

  // ── Symptom detail screen ─────────────────────────────────────
  if (screen === 'symptoms') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 px-5 py-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <button
              onClick={() => setScreen('gate')}
              className="text-xs text-slate-400 mb-3 flex items-center gap-1 hover:text-slate-600"
            >
              ← Back
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}>
              Symptom report
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Rate each symptom</h1>
            <p className="text-sm text-slate-500">
              Your clinician will review and confirm your next dose.
            </p>
          </motion.div>

          <div className="space-y-3">
            {symptomLabels.map((symptom, idx) => (
              <motion.div
                key={symptom.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{symptom.label}</h3>
                    <p className="text-xs text-slate-400">{symptom.desc}</p>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: severityOptions[symptoms[symptom.key]].bg,
                      color:      severityOptions[symptoms[symptom.key]].color,
                      border:     `1px solid ${severityOptions[symptoms[symptom.key]].border}`,
                    }}>
                    {severityOptions[symptoms[symptom.key]].label}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {severityOptions.map((opt) => {
                    const isSelected = symptoms[symptom.key] === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSymptoms({ ...symptoms, [symptom.key]: opt.value })}
                        className="py-2 px-1 rounded-xl border text-xs font-bold transition-all"
                        style={isSelected ? {
                          background:  opt.bg,
                          color:       opt.color,
                          borderColor: opt.border,
                          boxShadow:   `0 0 0 2px ${opt.border}`,
                        } : {
                          background:  '#f8fafc',
                          color:       '#94a3b8',
                          borderColor: '#e2e8f0',
                        }}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>

                {/* Context line — updates on tap */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={symptoms[symptom.key]}
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-xs mt-2.5 leading-relaxed"
                    style={{
                      color: severityOptions[symptoms[symptom.key]].color,
                    }}
                  >
                    {severityContext[symptom.key]?.[symptoms[symptom.key]]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5"
          >
            <label className="text-sm font-semibold text-slate-800 block mb-2">
              Additional Notes <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any other observations to share..."
              className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-300 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 mb-4"
          >
            <button
              onClick={handleSymptomSubmit}
              className="w-full font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 text-white"
              style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)', boxShadow: '0 8px 24px rgba(13,148,136,0.3)' }}
            >
              Submit Report
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
        <PatientBottomNav />
      </div>
    )
  }

  // ── Done: all good ────────────────────────────────────────────
  if (screen === 'done-ok') {
    return (
      <div className="flex flex-col" style={{ minHeight: '700px' }}>
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '3px solid #86efac' }}
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">All good!</h2>
          <p className="text-sm text-slate-500 text-center mb-6 leading-relaxed max-w-xs">
            Great news — your dose will continue on schedule. No action needed from your clinician.
          </p>

          <div className="w-full px-4 py-4 rounded-2xl mb-6"
            style={{ background: 'linear-gradient(135deg, #f0fdfa, #ecfeff)', border: '1px solid #99f6e4' }}>
            <p className="text-xs font-semibold text-teal-600 mb-1">Your next injection</p>
            <p className="text-sm font-bold text-teal-900">Same dose — no changes needed</p>
            <p className="text-xs text-teal-700 mt-0.5">Follow your regular weekly schedule</p>
          </div>

          <button
            onClick={() => router.push('/demo/patient/home')}
            className="w-full py-4 rounded-2xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)', boxShadow: '0 8px 24px rgba(13,148,136,0.3)' }}
          >
            Back to Home
          </button>
        </div>
        <PatientBottomNav />
      </div>
    )
  }

  // ── Done: symptoms submitted ──────────────────────────────────
  return (
    <div className="flex flex-col" style={{ minHeight: '700px' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 15 }}
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '3px solid #86efac' }}
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2 text-center">Report submitted</h2>
        <p className="text-sm text-slate-500 text-center mb-6 leading-relaxed max-w-xs">
          {symptoms.nausea <= 1
            ? 'Mild symptoms noted — your clinician will review your report.'
            : 'Your symptoms have been flagged. Your clinician will review shortly.'}
        </p>

        {/* 24h response card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full px-4 py-4 rounded-2xl mb-3"
          style={{ background: 'linear-gradient(135deg, #eff6ff, #eef2ff)', border: '1px solid #bfdbfe' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#dbeafe' }}>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900">Response within 24 hours</p>
              <p className="text-xs text-blue-700 mt-0.5">
                Your clinician will review and confirm your next dose. You'll receive a notification here.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full px-4 py-3.5 rounded-2xl mb-6"
          style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
        >
          <p className="text-xs font-semibold text-amber-700 mb-0.5">While you wait</p>
          <p className="text-xs text-amber-600">Do not change your dose yourself. Stay hydrated and rest if needed.</p>
        </motion.div>

        <button
          onClick={() => router.push('/demo/patient/progress')}
          className="w-full py-4 rounded-2xl font-semibold text-white mb-3"
          style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)', boxShadow: '0 8px 24px rgba(13,148,136,0.3)' }}
        >
          View Progress <ArrowRight className="inline w-4 h-4 ml-1" />
        </button>
        <button
          onClick={() => router.push('/demo/patient/home')}
          className="w-full py-3 rounded-2xl font-medium text-slate-600 border border-slate-200"
        >
          Go Home
        </button>
      </div>
      <PatientBottomNav />
    </div>
  )
}
