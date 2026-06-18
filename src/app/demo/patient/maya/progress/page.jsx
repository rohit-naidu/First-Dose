'use client'
import { motion } from 'framer-motion'
import PatientBottomNav from '@/components/demo/PatientBottomNav'
import ProgressChart from '@/components/demo/ProgressChart'
import PenDosePacingTable from '@/components/demo/PenDosePacingTable'
import DeliveryModeBadge from '@/components/demo/DeliveryModeBadge'
import { useStore } from '@/lib/store'

export default function MayaProgressPage() {
  const { maya } = useStore()

  const weightLost = (maya.startingWeight - maya.currentWeight).toFixed(1)
  const weightData = maya.weightLog.map((e) => ({ label: e.label, value: e.weight }))

  const symptomData = [
    { label: 'Day 1', value: 0 },
    { label: 'Day 4', value: 1 },
    { label: 'Day 7', value: 1 },
    { label: 'Day 10', value: 1 },
    { label: 'Day 14', value: 0 },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-5 py-4 overflow-y-auto space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1"
        >
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-900">Your Progress</h1>
            <DeliveryModeBadge mode={maya.deliveryMode} />
          </div>
          <p className="text-sm text-slate-500">
            Week {maya.currentWeek} · <span className="text-green-600 font-semibold">↓ {weightLost} lbs lost</span>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <ProgressChart
            title="Weight Trend"
            data={weightData}
            color="#4f46e5"
            unit=" lbs"
            height={180}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ProgressChart
            title="Nausea Level"
            data={symptomData}
            color="#f59e0b"
            height={150}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <PenDosePacingTable
            weeklyPlan={maya.weeklyPlan}
            patientName={maya.patientName.split(' ')[0]}
          />
        </motion.div>

        {/* Pen pacing explainer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 mb-4 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative">
            <h3 className="text-sm font-bold text-white mb-2">Why hold at 2.5 mg?</h3>
            <p className="text-xs text-indigo-300 leading-relaxed">
              Standard pen protocols jump from 2.5 mg directly to 5 mg after 4 weeks — a doubling that often
              causes nausea. First Dose Health detects your mild nausea score (1/3) and holds your dose one additional
              week, giving your body time to adjust before escalating.
            </p>
          </div>
        </motion.div>
      </div>

      <PatientBottomNav basePath="/demo/patient/maya" />
    </div>
  )
}
