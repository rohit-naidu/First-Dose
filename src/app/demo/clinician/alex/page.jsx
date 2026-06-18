'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PatientTimeline from '@/components/demo/PatientTimeline'
import RiskReportCard from '@/components/demo/RiskReportCard'
import ProgressChart from '@/components/demo/ProgressChart'
import StatusPill from '@/components/demo/StatusPill'
import DosePacingReport from '@/components/demo/DosePacingReport'
import DeliveryModeBadge from '@/components/demo/DeliveryModeBadge'
import { useStore } from '@/lib/store'
import { ArrowLeft, FileText, Scale, TrendingDown, Syringe, ClipboardCheck, CheckCircle, PauseCircle } from 'lucide-react'

const weightData = [
  { label: 'Start', value: 212 },
  { label: 'Day 3', value: 211.2 },
  { label: 'Day 5', value: 210.5 },
  { label: 'Day 7', value: 209.8 },
]

const symptomData = [
  { label: 'Day 1', value: 0 },
  { label: 'Day 3', value: 1 },
  { label: 'Day 5', value: 1 },
  { label: 'Day 7', value: 1 },
]

export default function AlexDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const {
    patientName,
    patientAge,
    patientSex,
    patientHeight,
    startingWeight,
    currentWeight,
    bmi,
    medication,
    vialConcentration,
    currentWeek,
    currentDoseMg,
    currentUnits,
    proposedDoseMg,
    proposedUnits,
    symptoms,
    checkInCompleted,
    week2Approved,
  } = useStore()

  const weightLost = (startingWeight - currentWeight).toFixed(1)

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/demo/clinician"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              color: 'rgba(240,244,248,0.45)',
              border: '1px solid rgba(240,244,248,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', color: '#0a0e14' }}>
                AR
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-ink">{patientName}</h1>
                  {week2Approved ? (
                    <StatusPill status="approved" text="Week 2 approved" />
                  ) : checkInCompleted ? (
                    <StatusPill status="review" text="Review needed" />
                  ) : (
                    <StatusPill status="pending" text="Week 1 active" />
                  )}
                </div>
                <p className="text-sm" style={{ color: 'rgba(240,244,248,0.55)' }}>
                  {patientAge}{patientSex} · {patientHeight} · {medication} · Week {currentWeek}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link href="/demo/clinician/alex/review"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: '#7fb5c9', color: '#0a0e14', boxShadow: '0 4px 12px rgba(127,181,201,0.3)' }}>
          <FileText className="w-4 h-4" />
          Open Dose Review
        </Link>
      </div>

      {/* Tab strip */}
      <div className="flex gap-1 mb-6 rounded-xl p-1 w-fit"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,244,248,0.08)' }}>
        {['overview', 'intake-report'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={activeTab === tab
              ? { background: 'rgba(127,181,201,0.1)', color: '#7fb5c9', border: '1px solid rgba(127,181,201,0.2)' }
              : { color: 'rgba(240,244,248,0.45)', border: '1px solid transparent' }}
          >
            {tab === 'overview' ? 'Overview' : 'Dose Pacing Report'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* KPI strip */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[
              { icon: Scale,         label: 'Start weight',   value: `${startingWeight} lbs`, color: 'rgba(240,244,248,0.55)', bg: 'rgba(255,255,255,0.04)' },
              { icon: TrendingDown,  label: 'Current weight', value: `${currentWeight} lbs`,  color: '#7fb5c9',                bg: 'rgba(127,181,201,0.08)' },
              { icon: TrendingDown,  label: 'Weight lost',    value: `-${weightLost} lbs`,    color: '#7fb5c9',                bg: 'rgba(127,181,201,0.08)' },
              { icon: Syringe,       label: 'Current dose',   value: `${currentDoseMg} mg · ${currentUnits}u`, color: '#7fb5c9', bg: 'rgba(127,181,201,0.08)' },
              { icon: ClipboardCheck, label: 'Adherence',     value: '1/1 doses',             color: '#a99cc4',                bg: 'rgba(169,156,196,0.08)' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-2xl px-4 py-3.5"
                  style={{ border: '1px solid rgba(240,244,248,0.1)' }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: item.bg }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                  </div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(240,244,248,0.45)' }}>{item.label}</p>
                  <p className="text-sm font-bold text-ink">{item.value}</p>
                </motion.div>
              )
            })}
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-3 gap-5">
            {/* Col 1: Timeline */}
            <div className="space-y-5">
              <PatientTimeline />

              {/* Vial info */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass rounded-2xl p-5"
                style={{ border: '1px solid rgba(240,244,248,0.1)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: 'rgba(240,244,248,0.45)' }}>Prescription</p>
                <div className="space-y-2">
                  {[
                    { label: 'Medication',    value: medication },
                    { label: 'Concentration', value: vialConcentration },
                    { label: 'Syringe',       value: '100u insulin' },
                    { label: 'BMI',           value: `${bmi} kg/m²` },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5"
                      style={{ borderBottom: '1px solid rgba(240,244,248,0.05)' }}>
                      <span className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{item.label}</span>
                      <span className="text-xs font-semibold text-ink">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Col 2: Charts */}
            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <ProgressChart title="Weight Trend (lbs)" data={weightData} color="#7fb5c9" unit=" lbs" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <ProgressChart title="Nausea Score (0–3)" data={symptomData} color="#c9b896" height={150} />
              </motion.div>

              {/* Symptom grid */}
              {checkInCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                  className="glass rounded-2xl p-5"
                  style={{ border: '1px solid rgba(240,244,248,0.1)' }}
                >
                  <p className="text-sm font-semibold text-ink mb-3">Latest Symptom Report</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Nausea',       value: symptoms.nausea },
                      { label: 'Reflux',        value: symptoms.reflux },
                      { label: 'Dizziness',     value: symptoms.dizziness },
                      { label: 'Constipation',  value: symptoms.constipation },
                    ].map((s) => (
                      <div key={s.label} className="text-center py-3 rounded-xl"
                        style={{
                          background: s.value > 1 ? 'rgba(201,127,127,0.08)' : s.value > 0 ? 'rgba(201,184,150,0.08)' : 'rgba(127,181,201,0.08)',
                          border: `1px solid ${s.value > 1 ? 'rgba(201,127,127,0.2)' : s.value > 0 ? 'rgba(201,184,150,0.2)' : 'rgba(127,181,201,0.2)'}`,
                        }}>
                        <p className="text-xl font-extrabold"
                          style={{ color: s.value > 1 ? '#c97f7f' : s.value > 0 ? '#c9b896' : '#7fb5c9' }}>
                          {s.value}<span className="text-sm font-normal" style={{ color: 'rgba(240,244,248,0.35)' }}>/3</span>
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.55)' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Col 3: Risk + actions */}
            <div className="space-y-5">
              <RiskReportCard />

              {/* Proposed dose action card */}
              {checkInCompleted && !week2Approved && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-5 overflow-hidden relative"
                  style={{ border: '1px solid rgba(127,181,201,0.2)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#7fb5c9' }}>Proposed next dose</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-extrabold text-ink">{proposedDoseMg} mg</span>
                    <span className="font-medium" style={{ color: '#7fb5c9' }}>· {proposedUnits} units</span>
                  </div>
                  <p className="text-xs mb-4" style={{ color: 'rgba(127,181,201,0.7)' }}>+0.5 mg from current · All safety checks passed</p>
                  <div className="flex gap-2">
                    <Link href="/demo/clinician/alex/review"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold"
                      style={{ background: '#7fb5c9', color: '#0a0e14' }}>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Review & Approve
                    </Link>
                    <button className="px-3 py-2.5 rounded-xl transition-colors"
                      style={{ background: 'rgba(201,127,127,0.1)', color: '#c97f7f', border: '1px solid rgba(201,127,127,0.2)' }}>
                      <PauseCircle className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {week2Approved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-5"
                  style={{ border: '1px solid rgba(127,181,201,0.3)', boxShadow: '0 0 0 4px rgba(127,181,201,0.08)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(127,181,201,0.1)' }}>
                      <CheckCircle className="w-5 h-5" style={{ color: '#7fb5c9' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#7fb5c9' }}>Week 2 Approved</p>
                      <p className="text-xs" style={{ color: 'rgba(127,181,201,0.7)' }}>{proposedDoseMg} mg · {proposedUnits} units · Patient notified</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === 'intake-report' && <DosePacingReport />}
    </div>
  )
}
