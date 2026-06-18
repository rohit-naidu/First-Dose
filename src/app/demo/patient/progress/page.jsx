'use client'
import { motion } from 'framer-motion'
import PatientBottomNav from '@/components/demo/PatientBottomNav'
import ProgressChart from '@/components/demo/ProgressChart'
import WeeklyDoseTable from '@/components/demo/WeeklyDoseTable'
import Toast from '@/components/demo/Toast'
import { useStore } from '@/lib/store'
import { Info } from 'lucide-react'

const symptomData = [
  { label: 'Day 1', value: 0 },
  { label: 'Day 2', value: 1 },
  { label: 'Day 3', value: 2 },
  { label: 'Day 4', value: 1 },
  { label: 'Day 5', value: 1 },
  { label: 'Day 6', value: 0 },
  { label: 'Day 7', value: 1 },
]

export default function ProgressPage() {
  const currentWeek = useStore((s) => s.currentWeek)
  const startingWeight = useStore((s) => s.startingWeight)
  const currentWeight = useStore((s) => s.currentWeight)
  const weightLog = useStore((s) => s.weightLog)
  const weightLost = (startingWeight - currentWeight).toFixed(1)

  // Map weight log to chart format
  const weightData = weightLog.map((e) => ({ label: e.label, value: e.weight }))

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1"
        >
          <h1 className="text-xl font-bold text-slate-900 mb-1">Your Progress</h1>
          <p className="text-sm text-slate-500">
            Week {currentWeek} · <span className="text-green-600 font-semibold">↓ {weightLost} lbs lost</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProgressChart
            title="Weight Trend"
            data={weightData}
            color="#0d9488"
            unit=" lbs"
            height={180}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProgressChart
            title="Nausea Level"
            data={symptomData}
            color="#f59e0b"
            height={150}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <WeeklyDoseTable />
        </motion.div>

        {/* Micro-titration explainer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 mb-4 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #0f172a, #0d1f35)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative">
            <Info className="w-5 h-5 mb-2" style={{ color: '#7fb5c9' }} />
            <h3 className="text-sm font-bold text-white mb-2">Why micro-titration works</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard protocols jump from 2.5 mg to 5.0 mg after 4 weeks — a doubling that causes nausea in many patients.
              First Dose Health increases your dose by just 0.5 mg per week, giving your body time to adjust and keeping you on track longer.
            </p>
          </div>
        </motion.div>
      </div>

      <PatientBottomNav />
    </div>
  )
}
