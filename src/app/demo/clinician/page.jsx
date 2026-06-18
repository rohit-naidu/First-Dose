'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import StatusPill from '@/components/demo/StatusPill'
import DeliveryModeBadge from '@/components/demo/DeliveryModeBadge'
import IntakeDrawer from '@/components/demo/IntakeDrawer'
import IntakeLinkModal from '@/components/demo/IntakeLinkModal'
import { Users, AlertCircle, CheckCircle, Clock, ArrowRight, TrendingDown, Activity, ClipboardList, Link2 } from 'lucide-react'

const patients = [
  {
    name: 'Casey Rodriguez',
    initials: 'CR',
    age: 75,
    sex: 'F',
    medication: 'Tirzepatide pen',
    week: 0,
    dose: 'Pending',
    deliveryMode: 'single_dose_pen',
    status: 'review',
    statusText: 'Intake complete — approve plan',
    symptom: 'Pre-treatment',
    symptomLevel: 0,
    weightChange: '—',
    lastCheckin: 'Today, 8:15 AM',
    href: '/demo/clinician/casey',
    highlight: true,
    avatarColor: 'linear-gradient(135deg, #c97f7f, #c9b896)',
  },
  {
    name: 'Alex Rivera',
    initials: 'AR',
    age: 38,
    sex: 'F',
    medication: 'Tirzepatide',
    week: 2,
    dose: '2.5 mg',
    units: '25 units',
    deliveryMode: 'vial',
    status: 'review',
    statusText: 'Review needed',
    symptom: 'Mild nausea',
    symptomLevel: 1,
    weightChange: '-2.2 lb',
    lastCheckin: 'Today, 9:30 AM',
    href: '/demo/clinician/alex',
    highlight: true,
    avatarColor: 'linear-gradient(135deg, #7fb5c9, #a99cc4)',
  },
  {
    name: 'Maya Patel',
    initials: 'MP',
    age: 34,
    sex: 'F',
    medication: 'Tirzepatide pen',
    week: 2,
    dose: '2.5 mg',
    deliveryMode: 'single_dose_pen',
    status: 'warning',
    statusText: 'Dose held',
    symptom: 'Mild nausea',
    symptomLevel: 1,
    weightChange: '-1.6 lb',
    lastCheckin: 'Today, 11:15 AM',
    href: '/demo/clinician/maya',
    highlight: true,
    avatarColor: 'linear-gradient(135deg, #a99cc4, #7fb5c9)',
  },
  {
    name: 'Jordan Chen',
    initials: 'JC',
    age: 52,
    sex: 'M',
    medication: 'Semaglutide',
    week: 4,
    dose: '1.0 mg',
    units: '100 units',
    deliveryMode: 'vial',
    status: 'stable',
    statusText: 'On track',
    symptom: 'None',
    symptomLevel: 0,
    weightChange: '-4.1 lb',
    lastCheckin: 'Yesterday',
    href: '/demo/clinician/jordan',
    highlight: false,
    avatarColor: 'linear-gradient(135deg, rgba(240,244,248,0.3), rgba(240,244,248,0.15))',
  },
  {
    name: 'Morgan Taylor',
    initials: 'MT',
    age: 45,
    sex: 'F',
    medication: 'Tirzepatide',
    week: 3,
    dose: '5.0 mg',
    units: '50 units',
    deliveryMode: 'vial',
    status: 'warning',
    statusText: 'Dose held',
    symptom: 'Moderate nausea',
    symptomLevel: 2,
    weightChange: '-1.8 lb',
    lastCheckin: '2 days ago',
    href: '/demo/clinician/morgan',
    highlight: false,
    avatarColor: 'linear-gradient(135deg, #c9b896, #c97f7f)',
  },
]

const statCards = [
  { icon: Users,         label: 'Active Patients', value: '5', color: '#7fb5c9', bg: 'rgba(127,181,201,0.08)', border: 'rgba(127,181,201,0.2)' },
  { icon: AlertCircle,   label: 'Needs Review',   value: '3', color: '#c9b896', bg: 'rgba(201,184,150,0.08)', border: 'rgba(201,184,150,0.2)' },
  { icon: CheckCircle,   label: 'On Track',        value: '1', color: '#7fb5c9', bg: 'rgba(127,181,201,0.08)', border: 'rgba(127,181,201,0.2)' },
  { icon: Clock,         label: 'Dose Held',       value: '2', color: '#c97f7f', bg: 'rgba(201,127,127,0.08)', border: 'rgba(201,127,127,0.2)' },
]

export default function ClinicianDashboardPage() {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)

  return (
    <div className="max-w-5xl">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-ink mb-1">Good morning, Dr. Lee</h1>
        <p className="text-sm" style={{ color: 'rgba(240,244,248,0.55)' }}>
          2 patients require dose review — vial and pen workflows both active.
        </p>
      </motion.div>

      {/* Patient Intake section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 glass rounded-2xl p-5"
        style={{ border: '1px solid rgba(127,181,201,0.2)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-ink">Patient Intake</h3>
            <p className="text-sm" style={{ color: 'rgba(240,244,248,0.55)' }}>Fill out in-person or send a self-serve link.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLinkModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors"
              style={{
                background: 'rgba(127,181,201,0.1)',
                color: '#7fb5c9',
                border: '1px solid rgba(127,181,201,0.2)',
              }}
            >
              <Link2 className="w-4 h-4" />
              Generate Link
            </button>
            <button
              onClick={() => setShowDrawer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors"
              style={{ background: '#7fb5c9', color: '#0a0e14' }}
            >
              <ClipboardList className="w-4 h-4" />
              Clinician-Led Intake
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl p-5"
              style={{ border: `1px solid ${card.border}` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: card.bg }}>
                  <Icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
                <span className="text-3xl font-extrabold text-ink">{card.value}</span>
              </div>
              <p className="text-xs font-medium" style={{ color: 'rgba(240,244,248,0.55)' }}>{card.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Patient cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink">Patient Overview</h2>
          <span className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>{patients.length} patients</span>
        </div>

        <div className="space-y-3">
          {patients.map((patient, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <Link href={patient.href}>
                <div
                  className="glass rounded-2xl p-5 transition-all hover:brightness-110 cursor-pointer group"
                  style={{
                    border: patient.highlight
                      ? '1px solid rgba(201,127,127,0.2)'
                      : '1px solid rgba(240,244,248,0.1)',
                    boxShadow: patient.highlight
                      ? '0 0 0 1px rgba(201,127,127,0.08), 0 4px 16px rgba(0,0,0,0.2)'
                      : '0 1px 3px rgba(0,0,0,0.15)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: patient.avatarColor, color: '#0a0e14' }}>
                      {patient.initials}
                    </div>

                    {/* Patient info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-ink">{patient.name}</p>
                        <StatusPill status={patient.status} text={patient.statusText} />
                        <DeliveryModeBadge mode={patient.deliveryMode} />
                      </div>
                      <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>
                        {patient.age}{patient.sex} · {patient.medication} · Week {patient.week} · {patient.dose}
                        {patient.units ? ` (${patient.units})` : ' pen'}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-0.5">
                          <TrendingDown className="w-3.5 h-3.5" style={{ color: '#7fb5c9' }} />
                          <span className="text-sm font-bold text-ink">{patient.weightChange}</span>
                        </div>
                        <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>Weight</p>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-0.5">
                          <Activity className="w-3.5 h-3.5" style={{
                            color: patient.symptomLevel > 1 ? '#c97f7f' : patient.symptomLevel > 0 ? '#c9b896' : '#7fb5c9'
                          }} />
                          <span className="text-sm font-bold" style={{
                            color: patient.symptomLevel > 1 ? '#c97f7f' : patient.symptomLevel > 0 ? '#c9b896' : '#f0f4f8'
                          }}>
                            {patient.symptom}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>Symptoms</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs mb-0.5" style={{ color: 'rgba(240,244,248,0.35)' }}>Last check-in</p>
                        <p className="text-xs font-medium" style={{ color: 'rgba(240,244,248,0.55)' }}>{patient.lastCheckin}</p>
                      </div>

                      <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: patient.highlight ? '#7fb5c9' : 'rgba(240,244,248,0.2)' }} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <IntakeDrawer open={showDrawer} onClose={() => setShowDrawer(false)} />
      <IntakeLinkModal open={showLinkModal} onClose={() => setShowLinkModal(false)} />
    </div>
  )
}
