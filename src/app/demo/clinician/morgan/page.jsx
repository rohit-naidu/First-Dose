'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import StatusPill from '@/components/demo/StatusPill'
import ReportPlaceholder from '@/components/demo/ReportPlaceholder'
import { ArrowLeft } from 'lucide-react'

const patient = {
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
  weightChange: '-1.8 lb',
  lastCheckin: '2 days ago',
  avatarColor: 'linear-gradient(135deg, #f59e0b, #f97316)',
}

export default function MorganPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/demo/clinician"
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: 'rgba(240,244,248,0.45)' }}>
          <ArrowLeft className="w-3.5 h-3.5" />
          All patients
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold text-white flex-shrink-0"
          style={{ background: patient.avatarColor }}>
          {patient.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-0.5">
            <h1 className="text-xl font-light text-ink">{patient.name}</h1>
            <StatusPill status={patient.status} text={patient.statusText} />
          </div>
          <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>
            {patient.age}{patient.sex} · {patient.medication} · Week {patient.week} · {patient.dose} ({patient.units})
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,244,248,0.08)' }}>
        {[{ id: 'overview', label: 'Overview' }, { id: 'intake-report', label: 'Intake Report' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? 'rgba(201,127,127,0.12)' : 'transparent',
              color: activeTab === tab.id ? '#c97f7f' : 'rgba(240,244,248,0.45)',
              border: activeTab === tab.id ? '1px solid rgba(201,127,127,0.25)' : '1px solid transparent',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'intake-report' && (
        <ReportPlaceholder patientName={patient.name} reason="Intake questionnaire not yet administered for this patient." />
      )}

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6"
          style={{ background: 'rgba(11,15,22,0.85)', border: '1px solid rgba(240,244,248,0.1)' }}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Current week', value: `Week ${patient.week}` },
              { label: 'Dose', value: patient.dose },
              { label: 'Weight change', value: patient.weightChange, positive: true },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-lg text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,244,248,0.08)' }}>
                <p className="text-xs mb-1" style={{ color: 'rgba(240,244,248,0.35)' }}>{m.label}</p>
                <p className="text-base font-semibold" style={{ color: m.positive ? '#7fb5c9' : '#f0f4f8' }}>{m.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg px-4 py-3 mb-3"
            style={{ background: 'rgba(201,127,127,0.06)', border: '1px solid rgba(201,127,127,0.2)' }}>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#c97f7f' }}>Dose held — moderate nausea</p>
            <p className="text-xs" style={{ color: 'rgba(201,127,127,0.8)' }}>
              {patient.symptom} reported at Week 3 check-in. Escalation blocked pending clinician review.
              Last check-in: {patient.lastCheckin}.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
