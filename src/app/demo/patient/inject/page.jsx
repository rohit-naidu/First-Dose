'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Syringe from '@/components/demo/Syringe'
import InjectionSiteSelector from '@/components/demo/InjectionSiteSelector'
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

// Shared dark-glass palette (matches the clinician dashboard)
const INK = '#f0f4f8'
const INK55 = 'rgba(240,244,248,0.55)'
const INK45 = 'rgba(240,244,248,0.45)'
const INK35 = 'rgba(240,244,248,0.35)'
const HAIR = 'rgba(240,244,248,0.1)'
const HAIR08 = 'rgba(240,244,248,0.08)'
const CLINICAL = '#7fb5c9'

export default function InjectPage() {
  const router = useRouter()
  const { currentUnits, currentDoseMg, currentWeek, completeInjection, showToast } = useStore()

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
    <div className="flex flex-col" style={{ background: '#0a0e14', minHeight: '750px' }}>
      {/* ── Header ── */}
      <div className="px-5 pt-4 pb-4" style={{ borderBottom: `1px solid ${HAIR08}` }}>
        {/* Brand + plan context (mirrors the clinician chrome) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(127,181,201,0.15)', border: '1px solid rgba(127,181,201,0.2)' }}>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: CLINICAL }} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: INK35 }}>Injection Guide</p>
              <p className="text-xs font-semibold" style={{ color: INK }}>First Dose Health</p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: 'rgba(127,181,201,0.1)', color: CLINICAL, border: '1px solid rgba(127,181,201,0.2)' }}>
            Wk {currentWeek} · {currentDoseMg} mg · {currentUnits} u
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-4">
          {step < 4 && (
            <button
              onClick={() => step > 0 ? setStep(step - 1) : router.back()}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${HAIR}`, color: INK45 }}
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
                  background: s < step ? CLINICAL : s === step ? 'linear-gradient(90deg, #7fb5c9, #a99cc4)' : 'rgba(240,244,248,0.1)',
                }}
              />
            ))}
          </div>
          {step < 4 && (
            <span className="text-xs font-semibold w-10 text-right" style={{ color: INK35 }}>
              {step + 1} / 4
            </span>
          )}
        </div>

        {step < 4 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: INK35 }}>Step {step + 1}</p>
            <h2 className="text-lg font-bold" style={{ color: INK }}>{stepTitles[step]}</h2>
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
                <div className="rounded-2xl p-4"
                  style={{ background: 'rgba(127,181,201,0.07)', border: '1px solid rgba(127,181,201,0.2)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: CLINICAL }}>Your medication</p>
                  <p className="text-xl font-bold" style={{ color: INK }}>Tirzepatide</p>
                  <p className="text-sm" style={{ color: 'rgba(127,181,201,0.85)' }}>Demo concentration: 10 mg/mL</p>
                  <p className="text-xs mt-1.5" style={{ color: INK35 }}>Always check your vial label before injecting.</p>
                </div>

                <p className="text-sm" style={{ color: INK55 }}>Gather these supplies before beginning:</p>

                <div className="space-y-2">
                  {[
                    { num: '1', item: 'Medication vial', note: 'At room temp 15–30 min' },
                    { num: '2', item: 'Insulin syringe (1 mL)', note: '100-unit marked' },
                    { num: '3', item: 'Alcohol swabs', note: '2 swabs' },
                    { num: '4', item: 'Sharps container', note: 'For safe disposal' },
                  ].map(({ num, item, note }) => (
                    <div key={num} className="flex items-center gap-3 rounded-2xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${HAIR08}` }}>
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', color: '#0a0e14' }}>
                        {num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: INK }}>{item}</p>
                        <p className="text-xs" style={{ color: INK35 }}>{note}</p>
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
                theme="dark"
              />
            )}

            {/* ── Step 2: Draw ── */}
            {step === 2 && (
              <div className="flex flex-col items-center py-1">
                <Syringe units={currentUnits} label={`${currentDoseMg} mg dose`} animate theme="dark" />
              </div>
            )}

            {/* ── Step 3: Safety check ── */}
            {step === 3 && (
              <div>
                {/* Site reminder */}
                {selectedSite && (
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-4"
                    style={{ background: 'rgba(127,181,201,0.08)', border: '1px solid rgba(127,181,201,0.2)' }}>
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: CLINICAL }} />
                    <p className="text-xs font-medium" style={{ color: 'rgba(127,181,201,0.9)' }}>
                      Site: {selectedSite.startsWith('L') ? 'Left' : 'Right'} ·{' '}
                      {selectedSite.endsWith('1') ? 'Upper' : selectedSite.endsWith('2') ? 'Middle' : 'Lower'} zone
                    </p>
                  </div>
                )}

                <p className="text-sm mb-4 leading-relaxed" style={{ color: INK55 }}>
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
                      className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all"
                      style={{
                        border: `2px solid ${checks[i] ? CLINICAL : 'rgba(240,244,248,0.15)'}`,
                        background: checks[i] ? 'rgba(127,181,201,0.08)' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          border: `2px solid ${checks[i] ? CLINICAL : 'rgba(240,244,248,0.25)'}`,
                          background: checks[i] ? CLINICAL : 'transparent',
                        }}>
                        {checks[i] && <CheckCircle className="w-3.5 h-3.5" style={{ color: '#0a0e14' }} />}
                      </div>
                      <span className="text-sm font-medium" style={{ color: checks[i] ? INK : INK55 }}>
                        {item}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {!allChecked && (
                  <p className="text-xs text-center mt-4" style={{ color: INK35 }}>
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
                  style={{ background: 'rgba(127,181,201,0.12)', border: '3px solid rgba(127,181,201,0.4)' }}
                >
                  <CheckCircle className="w-12 h-12" style={{ color: CLINICAL }} />
                </motion.div>

                <h3 className="text-2xl font-extrabold mb-1" style={{ color: INK }}>Injection logged</h3>
                <p className="text-sm mb-1" style={{ color: INK45 }}>
                  Week {useStore.getState().currentWeek} · {currentDoseMg} mg · {currentUnits} units
                </p>
                {selectedSite && (
                  <p className="text-xs mb-5" style={{ color: CLINICAL }}>
                    Site: {selectedSite.startsWith('L') ? 'Left' : 'Right'} ·{' '}
                    {selectedSite.endsWith('1') ? 'Upper' : selectedSite.endsWith('2') ? 'Middle' : 'Lower'} zone
                  </p>
                )}

                <p className="text-sm mb-6 leading-relaxed max-w-xs mx-auto" style={{ color: INK55 }}>
                  Your 72-hour check-in will be due in 3 days. Your clinician has been notified.
                </p>

                <div className="text-left space-y-2 mb-6">
                  {[
                    { text: 'Dispose of syringe in sharps container', done: true },
                    { text: '72-hour check-in due in 3 days', done: false },
                    { text: 'Stay hydrated this week', done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: item.done ? 'rgba(127,181,201,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${item.done ? 'rgba(127,181,201,0.2)' : HAIR08}`,
                      }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: item.done ? CLINICAL : 'rgba(240,244,248,0.25)' }} />
                      <p className="text-xs" style={{ color: item.done ? 'rgba(127,181,201,0.9)' : INK55 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => router.push('/demo/patient/home')}
                  className="w-full py-4 rounded-2xl font-bold"
                  style={{ background: CLINICAL, color: '#0a0e14', boxShadow: '0 8px 24px rgba(127,181,201,0.25)' }}
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
                  background: CLINICAL,
                  color: '#0a0e14',
                  boxShadow: '0 8px 24px rgba(127,181,201,0.25)',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  color: INK35,
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
                  background: CLINICAL,
                  color: '#0a0e14',
                  boxShadow: '0 8px 24px rgba(127,181,201,0.25)',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  color: INK35,
                  cursor: 'not-allowed',
                }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 rounded-2xl font-medium text-sm transition-colors"
              style={{ border: `1px solid ${HAIR}`, color: INK45 }}
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
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="rounded-t-3xl p-6 w-full"
              style={{ background: 'rgba(11,15,22,0.98)', borderTop: `1px solid rgba(240,244,248,0.12)` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: INK }}>Need Help?</h3>
                <button onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <X className="w-4 h-4" style={{ color: INK45 }} />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: 'rgba(201,184,150,0.08)', border: '1px solid rgba(201,184,150,0.25)' }}>
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c9b896' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#c9b896' }}>Mild symptoms?</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: INK55 }}>
                      Skip the injection and complete your check-in. Your clinician will review and may hold your dose.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: 'rgba(201,127,127,0.08)', border: '1px solid rgba(201,127,127,0.25)' }}>
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c97f7f' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#c97f7f' }}>Severe symptoms — seek care immediately</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: INK55 }}>
                      Severe vomiting, severe abdominal pain, difficulty breathing, fainting, or chest pain require urgent medical attention. Call 911 or go to the ER.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center mb-4" style={{ color: INK35 }}>
                Do not change your dose yourself. Contact your clinician.
              </p>

              <button onClick={() => setShowModal(false)}
                className="w-full py-3.5 rounded-2xl font-semibold"
                style={{ background: CLINICAL, color: '#0a0e14' }}>
                Understood, Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
