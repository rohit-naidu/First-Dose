'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Syringe from '@/components/demo/Syringe'
import InjectionSiteSelector from '@/components/demo/InjectionSiteSelector'
import PatientBottomNav from '@/components/demo/PatientBottomNav'
import Toast from '@/components/demo/Toast'
import { useStore } from '@/lib/store'
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Phone, X, MapPin } from 'lucide-react'

// Steps: 0 Prepare → 1 Choose Site → 2 Draw → 3 Safety → 4 Done
const stepTitles = ['Prepare Supplies', 'Choose Site', 'Draw Your Dose', 'Safety Check', 'Done']

const safetyItems = [
  'Medication label matches my plan',
  'Liquid is clear — no particles or discoloration',
  'I am drawing to the correct unit line',
  'I feel well enough to inject today',
]

export default function InjectPage() {
  const router = useRouter()
  const { currentUnits, currentDoseMg, completeInjection, showToast } = useStore()

  const [step, setStep] = useState(0)
  const [selectedSite, setSelectedSite] = useState(null)
  const [checks, setChecks] = useState(new Array(safetyItems.length).fill(false))
  const [showModal, setShowModal] = useState(false)

  const allChecked = checks.every(Boolean)

  const handleComplete = () => {
    completeInjection()
    showToast('Injection recorded — great work!')
    setStep(4)
  }

  const toggleCheck = (i) => {
    const next = [...checks]
    next[i] = !next[i]
    setChecks(next)
  }

  // Step 1 continue is gated on site selection
  const canContinue = step !== 1 || selectedSite !== null

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-slate-100">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-4">
          {step < 4 && (
            <button
              onClick={() => step > 0 ? setStep(step - 1) : router.back()}
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="flex-1 flex items-center gap-1.5">
            {[0, 1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 h-1.5 rounded-full transition-all duration-500"
                style={{
                  background: s < step ? '#0d9488' : s === step ? 'linear-gradient(90deg, #0d9488, #0891b2)' : '#e2e8f0',
                }}
              />
            ))}
          </div>
          {step < 4 && (
            <span className="text-xs font-semibold text-slate-400 w-10 text-right">
              {step + 1} / 4
            </span>
          )}
        </div>

        {step < 4 && (
          <div>
            <p className="text-xs text-slate-400 font-medium">Step {step + 1}</p>
            <h2 className="text-lg font-bold text-slate-900">{stepTitles[step]}</h2>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="px-5 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >

            {/* ── Step 0: Prepare ── */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="rounded-2xl p-4 border"
                  style={{ background: 'linear-gradient(135deg, #f0fdfa, #ecfeff)', borderColor: '#99f6e4' }}>
                  <p className="text-xs font-semibold text-teal-500 uppercase tracking-wide mb-1">Your medication</p>
                  <p className="text-xl font-bold text-slate-900">Tirzepatide</p>
                  <p className="text-sm text-teal-700">Demo concentration: 10 mg/mL</p>
                  <p className="text-xs text-teal-600/70 mt-1.5">Always check your vial label before injecting.</p>
                </div>

                <p className="text-sm text-slate-600">Gather these supplies before beginning:</p>

                <div className="space-y-2">
                  {[
                    { num: '1', item: 'Medication vial', note: 'At room temp 15–30 min' },
                    { num: '2', item: 'Insulin syringe (1 mL)', note: '100-unit marked' },
                    { num: '3', item: 'Alcohol swabs', note: '2 swabs' },
                    { num: '4', item: 'Sharps container', note: 'For safe disposal' },
                  ].map(({ num, item, note }) => (
                    <div key={num} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm">
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}>
                        {num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item}</p>
                        <p className="text-xs text-slate-400">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 1: Choose Site ── */}
            {step === 1 && (
              <InjectionSiteSelector
                selectedSite={selectedSite}
                onSelect={setSelectedSite}
              />
            )}

            {/* ── Step 2: Draw ── */}
            {step === 2 && (
              <div className="flex flex-col items-center py-1">
                <Syringe units={currentUnits} label={`${currentDoseMg} mg dose`} animate />
              </div>
            )}

            {/* ── Step 3: Safety check ── */}
            {step === 3 && (
              <div>
                {/* Site reminder */}
                {selectedSite && (
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-4"
                    style={{ background: '#f0fdfa', border: '1px solid #99f6e4' }}>
                    <MapPin className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    <p className="text-xs text-teal-700 font-medium">
                      Site: {selectedSite.startsWith('L') ? 'Left' : 'Right'} ·{' '}
                      {selectedSite.endsWith('1') ? 'Upper' : selectedSite.endsWith('2') ? 'Middle' : 'Lower'} zone
                    </p>
                  </div>
                )}

                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Confirm each item before injecting. All must be checked to proceed.
                </p>

                <div className="space-y-2.5">
                  {safetyItems.map((item, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => toggleCheck(i)}
                      className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 transition-all"
                      style={{
                        borderColor: checks[i] ? '#22c55e' : '#e2e8f0',
                        background: checks[i] ? '#f0fdf4' : 'white',
                      }}
                    >
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all border-2 ${
                        checks[i] ? 'border-green-500 bg-green-500' : 'border-slate-300'
                      }`}>
                        {checks[i] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${checks[i] ? 'text-green-800' : 'text-slate-700'}`}>
                        {item}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {!allChecked && (
                  <p className="text-xs text-center text-slate-400 mt-4">
                    {checks.filter(Boolean).length} of {safetyItems.length} confirmed
                  </p>
                )}
              </div>
            )}

            {/* ── Step 4: Done ── */}
            {step === 4 && (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '3px solid #86efac' }}
                >
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Injection logged</h3>
                <p className="text-sm text-slate-500 mb-1">
                  Week {useStore.getState().currentWeek} · {currentDoseMg} mg · {currentUnits} units
                </p>
                {selectedSite && (
                  <p className="text-xs text-teal-600 mb-5">
                    Site: {selectedSite.startsWith('L') ? 'Left' : 'Right'} ·{' '}
                    {selectedSite.endsWith('1') ? 'Upper' : selectedSite.endsWith('2') ? 'Middle' : 'Lower'} zone
                  </p>
                )}

                <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-xs mx-auto">
                  Your 72-hour check-in will be due in 3 days. Your clinician has been notified.
                </p>

                <div className="text-left space-y-2 mb-6">
                  {[
                    { text: 'Dispose of syringe in sharps container', done: true },
                    { text: '72-hour check-in due in 3 days', done: false },
                    { text: 'Stay hydrated this week', done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: item.done ? '#f0fdf4' : '#f8fafc', border: `1px solid ${item.done ? '#bbf7d0' : '#e2e8f0'}` }}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.done ? 'bg-green-500' : 'bg-slate-300'}`} />
                      <p className={`text-xs ${item.done ? 'text-green-700' : 'text-slate-600'}`}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => router.push('/demo/patient/home')}
                  className="w-full py-4 rounded-2xl font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)', boxShadow: '0 8px 24px rgba(13,148,136,0.3)' }}
                >
                  Return to Home
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── Action buttons ── */}
        {step < 4 && (
          <div className="mt-5 space-y-2.5 pb-6">
            {step === 3 ? (
              <button
                onClick={handleComplete}
                disabled={!allChecked}
                className="w-full py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                style={allChecked ? {
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(22,163,74,0.3)',
                } : {
                  background: '#f1f5f9',
                  color: '#94a3b8',
                  cursor: 'not-allowed',
                }}
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Injection Done
              </button>
            ) : (
              <button
                onClick={() => canContinue && setStep(step + 1)}
                disabled={!canContinue}
                className="w-full py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                style={canContinue ? {
                  background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
                } : {
                  background: '#f1f5f9',
                  color: '#94a3b8',
                  cursor: 'not-allowed',
                }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 rounded-2xl font-medium text-sm border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Not feeling well today?
            </button>
          </div>
        )}
      </div>

      {/* ── Safety modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-end z-50"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-white rounded-t-3xl p-6 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Need Help?</h3>
                <button onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Mild symptoms?</p>
                    <p className="text-xs text-amber-600 mt-1 leading-relaxed">
                      Skip the injection and complete your check-in. Your clinician will review and may hold your dose.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                  <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Severe symptoms — seek care immediately</p>
                    <p className="text-xs text-red-600 mt-1 leading-relaxed">
                      Severe vomiting, severe abdominal pain, difficulty breathing, fainting, or chest pain require urgent medical attention. Call 911 or go to the ER.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center text-slate-400 mb-4">
                Do not change your dose yourself. Contact your clinician.
              </p>

              <button onClick={() => setShowModal(false)}
                className="w-full py-3.5 rounded-2xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}>
                Understood, Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
