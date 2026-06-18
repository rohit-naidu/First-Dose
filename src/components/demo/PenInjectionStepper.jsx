'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, ChevronRight, Thermometer, Droplets, Calendar, Eye } from 'lucide-react'
import InjectionSiteSelector from '@/components/demo/InjectionSiteSelector'
import { useStore } from '@/lib/store'

const CHECKLIST_ITEMS = [
  { icon: Eye,         label: 'Medication name matches prescription',    key: 'name' },
  { icon: Thermometer, label: 'Pen stored at room temp for 30 min',       key: 'temp' },
  { icon: Droplets,    label: 'Liquid is clear and colorless',            key: 'clear' },
  { icon: Calendar,    label: 'Pen is not expired',                       key: 'expiry' },
]

export default function PenInjectionStepper({ doseMg, medication, onComplete }) {
  const [step, setStep] = useState(0)
  const [checked, setChecked] = useState({})
  const [selectedSite, setSelectedSite] = useState(null)
  const [showSafety, setShowSafety] = useState(false)

  const allChecked = CHECKLIST_ITEMS.every((item) => checked[item.key])
  const canContinue =
    step === 0 ? allChecked :
    step === 1 ? selectedSite !== null :
    true

  const steps = ['Confirm Pen', 'Choose Site', 'Inject', 'Done']

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator */}
      <div className="flex items-center gap-1.5 px-5 py-3">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center gap-1.5 flex-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                i < step ? 'text-white' :
                i === step ? 'bg-indigo-600 text-white' :
                'bg-slate-100 text-slate-400'
              }`}
              style={i < step ? { background: '#7fb5c9' } : {}}
            >
              {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-0.5 flex-1 rounded-full transition-all"
                style={{ background: i < step ? '#a99cc4' : '#f1f5f9' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-bold text-slate-900 mb-1">Confirm your pen</h2>
              <p className="text-xs text-slate-500 mb-4">Check each item before injecting.</p>

              <div className="space-y-2.5">
                {CHECKLIST_ITEMS.map((item) => {
                  const Icon = item.icon
                  const done = !!checked[item.key]
                  return (
                    <button
                      key={item.key}
                      onClick={() => setChecked((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all"
                      style={{
                        background: done ? '#f0fdfa' : '#fff',
                        borderColor: done ? '#7fb5c9' : '#e2e8f0',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: done ? '#e0eff6' : '#f1f5f9' }}
                      >
                        <Icon className="w-4 h-4" style={{ color: done ? '#7fb5c9' : '#94a3b8' }} />
                      </div>
                      <span
                        className="text-sm font-medium flex-1"
                        style={{ color: done ? '#2d6a84' : '#374151' }}
                      >
                        {item.label}
                      </span>
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                        style={done
                          ? { background: '#7fb5c9', borderColor: '#7fb5c9' }
                          : { borderColor: '#cbd5e1' }
                        }
                      >
                        {done && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Pen dose reminder */}
              <div className="mt-4 rounded-2xl p-4" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
                <p className="text-xs text-indigo-300 uppercase font-semibold tracking-wide mb-1">Your prescribed dose</p>
                <p className="text-2xl font-extrabold text-white">{doseMg} mg</p>
                <p className="text-xs text-indigo-300 mt-0.5">{medication}</p>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-bold text-slate-900 mb-1">Choose injection site</h2>
              <p className="text-xs text-slate-500 mb-3">Rotate sites weekly. Avoid the 2-inch zone around your navel.</p>
              <InjectionSiteSelector selectedSite={selectedSite} onSelect={setSelectedSite} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-bold text-slate-900 mb-1">Inject</h2>
              <p className="text-xs text-slate-500 mb-4">Follow these steps for your prefilled pen.</p>

              {/* Site reminder */}
              {selectedSite && (
                <div className="mb-4 rounded-xl px-4 py-3 flex items-center gap-2"
                  style={{ background: '#eef2ff', border: '1px solid #c7d2fe' }}>
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <p className="text-xs font-semibold text-indigo-700">
                    Injecting: {selectedSite.startsWith('L') ? 'Left' : 'Right'} &middot;{' '}
                    {selectedSite.endsWith('1') ? 'Upper' : selectedSite.endsWith('2') ? 'Middle' : 'Lower'} zone
                  </p>
                </div>
              )}

              {[
                { n: 1, text: 'Clean the injection site with an alcohol swab and let it dry for 10 seconds.' },
                { n: 2, text: 'Remove the pen cap. Do not touch the needle.' },
                { n: 3, text: 'Pinch a fold of skin. Insert needle at 90° (or 45° if slim).' },
                { n: 4, text: `Press the button fully. Hold for 10 seconds until you see the dose indicator confirm ${doseMg} mg delivered.` },
                { n: 5, text: 'Withdraw needle. Apply gentle pressure — do not rub.' },
              ].map((inst) => (
                <div key={inst.n} className="flex gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {inst.n}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{inst.text}</p>
                </div>
              ))}

              {/* Fixed-dose disclaimer */}
              <div className="mt-4 rounded-xl p-3" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                <p className="text-xs text-amber-800 leading-relaxed">
                  <span className="font-semibold">Fixed-dose pen:</span> Use only the dose prescribed by your clinician.
                  Do not alter, split, or estimate pen doses unless explicitly instructed.
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col items-center text-center pt-4 pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-xl font-bold text-slate-900 mb-1">Injection logged</h2>
                <p className="text-sm text-slate-500 mb-1">{doseMg} mg &middot; {medication}</p>
                <p className="text-xs text-slate-400 mb-6">A 72-hour check-in reminder has been scheduled.</p>

                {selectedSite && (
                  <div className="rounded-xl px-4 py-2.5 mb-4 text-xs font-medium text-indigo-700"
                    style={{ background: '#eef2ff', border: '1px solid #c7d2fe' }}>
                    Site logged: {selectedSite.startsWith('L') ? 'Left' : 'Right'} &middot;{' '}
                    {selectedSite.endsWith('1') ? 'Upper' : selectedSite.endsWith('2') ? 'Middle' : 'Lower'} zone
                  </div>
                )}

                <div className="w-full rounded-xl p-4" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <p className="text-sm font-semibold text-green-800 mb-1">What&apos;s next</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    If you experience nausea, reflux, or any discomfort in the next 72 hours, submit a check-in.
                    Your clinician will review before your next dose.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {step < 3 && (
        <div className="px-5 pb-4 pt-2 border-t border-slate-100">
          {/* Safety modal trigger */}
          <button
            onClick={() => setShowSafety(true)}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-amber-600 mb-3 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Not feeling well? Tap here before injecting
          </button>

          <button
            onClick={() => step < 2 ? setStep(step + 1) : (onComplete(), setStep(3))}
            disabled={!canContinue}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            style={canContinue
              ? { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }
              : { background: '#f1f5f9', color: '#94a3b8' }
            }
          >
            {step === 2 ? 'Confirm Injection' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Safety modal */}
      <AnimatePresence>
        {showSafety && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-end z-50"
            onClick={() => setShowSafety(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full bg-white rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Not feeling well?</p>
                  <p className="text-xs text-slate-500">Do not inject if experiencing severe symptoms.</p>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                {[
                  'Severe nausea or vomiting (3/3)',
                  'Dizziness that affects balance',
                  'Difficulty swallowing',
                  'Allergic reaction symptoms',
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                If any of these apply, skip today&apos;s injection and submit a check-in. Your clinician will respond within 24 hours.
              </p>
              <button
                onClick={() => setShowSafety(false)}
                className="w-full py-3 rounded-2xl font-semibold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                I feel fine — continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
