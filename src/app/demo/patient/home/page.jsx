'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import PatientBottomNav from '@/components/demo/PatientBottomNav'
import Toast from '@/components/demo/Toast'
import { useStore } from '@/lib/store'
import {
  Syringe, ArrowRight, Bell, TrendingDown, Calendar,
  Activity, X, ChevronRight, Minus, Plus, Scale,
} from 'lucide-react'

export default function PatientHomePage() {
  const {
    patientName, currentWeek, currentDoseMg, currentUnits,
    currentWeight, startingWeight, medication,
    week2Approved, checkInCompleted, symptoms,
    injectionCompleted, logWeight, showToast,
  } = useStore()

  const [showWeightModal, setShowWeightModal] = useState(false)
  const [weightInput, setWeightInput] = useState(currentWeight)

  const weightLost = (startingWeight - currentWeight).toFixed(1)
  const firstName = patientName.split(' ')[0]

  const adjust = (delta) => {
    setWeightInput((w) => Math.round((w + delta) * 10) / 10)
  }

  const saveWeight = () => {
    logWeight(weightInput)
    showToast(`Weight logged: ${weightInput} lbs`)
    setShowWeightModal(false)
  }

  const openWeightModal = () => {
    setWeightInput(currentWeight)
    setShowWeightModal(true)
  }

  // Injection status
  const injectionDue = !injectionCompleted
  const daysUntilNext = injectionCompleted ? 5 : 0

  // Side effect status
  const sideEffectStatus = checkInCompleted && symptoms.nausea > 0
    ? { label: symptoms.nausea >= 2 ? 'Moderate nausea' : 'Mild nausea', ok: false }
    : { label: 'All clear', ok: true }

  return (
    <div className="flex flex-col" style={{ minHeight: '750px' }}>
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-5 pt-3 pb-4">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-5"
          >
            <div>
              <p className="text-xs text-slate-400 font-medium">Good morning</p>
              <h1 className="text-2xl font-extrabold text-slate-900">{firstName}</h1>
            </div>
            <button
              className="relative w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <Bell className="w-5 h-5 text-slate-500" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-500 border-2 border-white" />
            </button>
          </motion.div>

          {/* ── Dose hero card ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="relative rounded-3xl p-5 mb-4 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #7fb5c9 0%, #a99cc4 100%)',
              boxShadow: '0 16px 40px rgba(13,148,136,0.28)',
            }}
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-10" style={{ background: 'white' }} />
            <div className="absolute -bottom-4 right-8 w-20 h-20 rounded-full opacity-10" style={{ background: 'white' }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-xs text-white/90 font-medium">Week {currentWeek} · {medication}</span>
                </div>
                {week2Approved && (
                  <div className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.25)', color: 'white' }}>
                    Dose updated
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-white">{currentDoseMg}</span>
                <span className="text-xl font-semibold text-teal-200">mg</span>
                <span className="text-base text-teal-200 ml-1">· {currentUnits} units</span>
              </div>
              <p className="text-teal-100 text-sm mb-4">
                {week2Approved
                  ? `Clinician approved: draw to ${currentUnits} unit line`
                  : injectionDue
                    ? 'Your dose is ready — follow the injection guide'
                    : 'Injection complete — next dose in 5 days'}
              </p>
              <Link href="/demo/patient/inject">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <Syringe className="w-4 h-4" />
                  {injectionDue ? 'Start injection guide' : 'View injection guide'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* ── Weight + Next Dose row ── */}
          <div className="grid grid-cols-2 gap-3 mb-4">

            {/* Weight card — tappable */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              onClick={openWeightModal}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm cursor-pointer active:scale-[0.97] transition-transform"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                  <Scale className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-xs text-slate-400">Weight</span>
              </div>
              <p className="text-xl font-bold text-slate-900">{currentWeight} lbs</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-green-600 font-semibold">↓ {weightLost} lbs</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: '#f0fdfa', color: '#0d9488' }}>
                  + Log
                </span>
              </div>
            </motion.div>

            {/* Next injection card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: injectionDue ? '#fef2f2' : '#eef2ff' }}>
                  <Calendar className={`w-3.5 h-3.5 ${injectionDue ? 'text-red-500' : 'text-indigo-600'}`} />
                </div>
                <span className="text-xs text-slate-400">Next dose</span>
              </div>
              {injectionDue ? (
                <>
                  <p className="text-base font-extrabold text-red-600">Due today</p>
                  <p className="text-xs text-red-500 font-medium mt-1">Tap to start ↑</p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-slate-900">In {daysUntilNext} days</p>
                  <p className="text-xs text-indigo-600 font-medium mt-1">Week {currentWeek} on track</p>
                </>
              )}
            </motion.div>
          </div>

          {/* ── Progress banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Link href="/demo/patient/progress">
              <div
                className="rounded-2xl p-4 mb-4 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #0f172a, #0d1f35)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Total progress</p>
                  <p className="text-lg font-extrabold text-white">↓ {weightLost} lbs lost 🎉</p>
                  <p className="text-xs text-slate-500 mt-0.5">Since starting · {medication} Week {currentWeek}</p>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="text-xs font-medium">View chart</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── Side effects status ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-4 mb-4"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700">Side effects</p>
              </div>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={sideEffectStatus.ok
                  ? { background: '#f0fdf4', color: '#16a34a' }
                  : { background: '#fffbeb', color: '#b45309' }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${sideEffectStatus.ok ? 'bg-green-500' : 'bg-amber-400'}`} />
                {sideEffectStatus.label}
              </div>
            </div>
            {checkInCompleted && !sideEffectStatus.ok && (
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Your clinician is reviewing — response expected within 24 hours.
              </p>
            )}
            {!checkInCompleted && (
              <p className="text-xs text-slate-400 mt-2">
                Feeling unwell?{' '}
                <Link href="/demo/patient/check-in" className="text-teal-600 font-semibold underline">
                  Submit a report →
                </Link>
              </p>
            )}
          </motion.div>

          {/* ── Practical tips ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl p-4"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Tips for this week</p>
            <div className="space-y-2.5">
              {[
                { dot: 'bg-teal-400',   text: 'Inject on the same day every week' },
                { dot: 'bg-amber-400',  text: 'Eat smaller portions on injection day to reduce nausea' },
                { dot: 'bg-indigo-400', text: 'Weigh yourself each morning before eating' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${item.dot}`} />
                  <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <PatientBottomNav />

      {/* ── Weight log bottom sheet ── */}
      <AnimatePresence>
        {showWeightModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-end z-50"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowWeightModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full px-6 pt-5 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-5" />

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">Log Today's Weight</h3>
                <button
                  onClick={() => setShowWeightModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Weight input */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => adjust(-0.2)}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-slate-200 active:bg-slate-100 transition-colors"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>

                <div className="text-center">
                  <input
                    type="number"
                    value={weightInput}
                    onChange={(e) => setWeightInput(parseFloat(e.target.value) || 0)}
                    className="text-5xl font-extrabold text-slate-900 w-36 text-center bg-transparent focus:outline-none"
                    step="0.1"
                  />
                  <p className="text-sm text-slate-400 font-medium -mt-1">lbs</p>
                </div>

                <button
                  onClick={() => adjust(0.2)}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-slate-200 active:bg-slate-100 transition-colors"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Preview */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-2xl mb-5"
                style={{
                  background: weightInput < startingWeight ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${weightInput < startingWeight ? '#bbf7d0' : '#fca5a5'}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className={`w-4 h-4 ${weightInput < startingWeight ? 'text-green-600' : 'text-red-500'}`} />
                  <span className={`text-sm font-semibold ${weightInput < startingWeight ? 'text-green-800' : 'text-red-700'}`}>
                    {weightInput < startingWeight
                      ? `↓ ${(startingWeight - weightInput).toFixed(1)} lbs from start`
                      : `↑ ${(weightInput - startingWeight).toFixed(1)} lbs above start`}
                  </span>
                </div>
                <span className="text-xs text-slate-500">Started: {startingWeight} lbs</span>
              </div>

              <button
                onClick={saveWeight}
                className="w-full py-4 rounded-2xl font-bold text-white text-base"
                style={{
                  background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                  boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
                }}
              >
                Save Weight
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
