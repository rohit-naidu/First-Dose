'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import DeliveryModeBadge from '@/components/demo/DeliveryModeBadge'
import PenDosePacingTable from '@/components/demo/PenDosePacingTable'
import StatusPill from '@/components/demo/StatusPill'
import AuditTrail from '@/components/demo/AuditTrail'
import ReportPlaceholder from '@/components/demo/ReportPlaceholder'
import { useStore } from '@/lib/store'
import {
  ArrowLeft, CheckCircle, XCircle, PauseCircle,
  Shield, TrendingUp, X, AlertTriangle,
} from 'lucide-react'

export default function MayaClinicianPage() {
  const { maya, approveMayaWeek3, showToast } = useStore()
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleApprove = () => {
    approveMayaWeek3()
    showToast('Week 3 dose approved: 5.0 mg pen')
    setShowApproveModal(false)
  }

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <Link href="/demo/clinician"
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(240,244,248,0.45)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,244,248,0.1)' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-ink">Dose Review: {maya.patientName}</h1>
              <DeliveryModeBadge mode={maya.deliveryMode} size="md" />
            </div>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(240,244,248,0.55)' }}>
              Week 3 escalation · Dose held Week 2 due to nausea
            </p>
          </div>
        </div>
        {maya.week3Approved && <StatusPill status="approved" text="Approved" />}
      </div>

      {/* Action bar */}
      <AnimatePresence>
        {!maya.week3Approved ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="rounded-2xl p-5 mb-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1a1030 100%)',
              border: '1px solid rgba(169,156,196,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(169,156,196,0.2), transparent 70%)' }} />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(169,156,196,0.15)', border: '1px solid rgba(169,156,196,0.3)' }}>
                  <AlertTriangle className="w-6 h-6" style={{ color: '#a99cc4' }} />
                </div>
                <div>
                  <p className="text-ink font-bold text-base">
                    Held at 2.5 mg — Week 3 escalation pending review
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(240,244,248,0.55)' }}>
                    Propose: <span className="font-semibold" style={{ color: '#a99cc4' }}>{maya.proposedDoseMg} mg pen</span>
                    <span className="mx-2" style={{ color: 'rgba(240,244,248,0.3)' }}>·</span>
                    +{(maya.proposedDoseMg - maya.currentDoseMg).toFixed(1)} mg from {maya.currentDoseMg} mg current
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <button className="font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2 text-sm"
                  style={{ border: '1px solid rgba(240,244,248,0.2)', color: 'rgba(240,244,248,0.55)' }}>
                  <PauseCircle className="w-4 h-4" />
                  Hold again
                </button>
                <button className="font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2 text-sm"
                  style={{ border: '1px solid rgba(201,127,127,0.3)', color: '#c97f7f', background: 'rgba(201,127,127,0.05)' }}>
                  <XCircle className="w-4 h-4" />
                  Decrease
                </button>
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="font-semibold py-2.5 px-5 rounded-xl transition-all flex items-center gap-2 text-sm"
                  style={{
                    background: '#a99cc4',
                    color: '#0a0e14',
                    boxShadow: '0 4px 16px rgba(169,156,196,0.3)',
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve {maya.proposedDoseMg} mg
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-5 mb-6 flex items-center gap-4"
            style={{ border: '1px solid rgba(127,181,201,0.3)', boxShadow: '0 0 0 4px rgba(127,181,201,0.08)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(127,181,201,0.1)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#7fb5c9' }} />
            </div>
            <div>
              <p className="font-bold" style={{ color: '#7fb5c9' }}>Week 3 Approved — Patient Notified</p>
              <p className="text-sm" style={{ color: 'rgba(127,181,201,0.7)' }}>
                Escalated to {maya.proposedDoseMg} mg pen. Patient will receive pen instructions within 24 hours.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,244,248,0.08)' }}>
        {[{ id: 'overview', label: 'Overview' }, { id: 'intake-report', label: 'Intake Report' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab.id ? 'rgba(169,156,196,0.15)' : 'transparent',
              color: activeTab === tab.id ? '#a99cc4' : 'rgba(240,244,248,0.45)',
              border: activeTab === tab.id ? '1px solid rgba(169,156,196,0.3)' : '1px solid transparent',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'intake-report' && (
        <ReportPlaceholder patientName={maya.patientName} reason="Intake completed via prefilled pen pathway — full report available after next check-in cycle." />
      )}

      {activeTab === 'overview' && <>

      {/* Pen dose pacing table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <PenDosePacingTable weeklyPlan={maya.weeklyPlan} patientName={maya.patientName.split(' ')[0]} />
      </motion.div>

      {/* Patient response + safety */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
          style={{ border: '1px solid rgba(240,244,248,0.1)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#a99cc4' }} />
            <h3 className="text-lg font-semibold text-ink">Patient Response</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.55)' }}>Week 2 Symptom Summary</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Nausea',       value: maya.symptoms.nausea },
                  { label: 'Reflux',        value: maya.symptoms.reflux },
                  { label: 'Dizziness',     value: maya.symptoms.dizziness },
                  { label: 'Constipation',  value: maya.symptoms.constipation },
                ].map((s) => (
                  <div key={s.label}
                    className="p-3 rounded-xl text-center"
                    style={{
                      background: s.value === 0 ? 'rgba(127,181,201,0.06)' : s.value === 1 ? 'rgba(201,184,150,0.06)' : 'rgba(201,127,127,0.06)',
                      border: `1px solid ${s.value === 0 ? 'rgba(127,181,201,0.2)' : s.value === 1 ? 'rgba(201,184,150,0.2)' : 'rgba(201,127,127,0.2)'}`,
                    }}>
                    <p className="text-xs" style={{ color: 'rgba(240,244,248,0.45)' }}>{s.label}</p>
                    <p className="text-lg font-bold text-ink">{s.value}/3</p>
                    <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>
                      {s.value === 0 ? 'None' : s.value === 1 ? 'Mild' : s.value === 2 ? 'Moderate' : 'Severe'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(201,184,150,0.06)', border: '1px solid rgba(201,184,150,0.2)' }}>
              <p className="text-sm font-semibold" style={{ color: '#c9b896' }}>Held Week 2 — reassess for Week 3</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(201,184,150,0.7)' }}>
                Nausea 1/3 resolved by Day 14. Weight loss on track at −{(maya.startingWeight - maya.currentWeight).toFixed(1)} lbs.
                Safe to escalate to 5.0 mg pen.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-6"
          style={{ border: '1px solid rgba(240,244,248,0.1)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5" style={{ color: '#a99cc4' }} />
            <h3 className="text-lg font-semibold text-ink">Safety Rules</h3>
          </div>
          <div className="space-y-2.5">
            {[
              { rule: 'Nausea resolved to ≤ 1/3',                         passed: true, detail: 'Was 1/3, resolved by Wk2 end' },
              { rule: 'No new onset of severe symptoms',                   passed: true, detail: 'No severe symptoms' },
              { rule: 'Weight change within expected range',               passed: true, detail: `−${(maya.startingWeight - maya.currentWeight).toFixed(1)} lbs (expected: −1 to −4 lbs)` },
              { rule: 'Patient completed check-in on time',                passed: true, detail: 'Submitted Day 14' },
              { rule: 'Fixed-dose pen — no unit calculation required',     passed: true, detail: '5.0 mg pen (single-dose prefilled)' },
            ].map((item, i) => (
              <div key={i}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: item.passed ? 'rgba(127,181,201,0.06)' : 'rgba(201,127,127,0.06)' }}>
                {item.passed
                  ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#7fb5c9' }} />
                  : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#c97f7f' }} />}
                <div>
                  <p className="text-sm font-medium" style={{ color: 'rgba(240,244,248,0.8)' }}>{item.rule}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.45)' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pen vs vial comparison note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 mb-6"
        style={{ border: '1px solid rgba(169,156,196,0.2)' }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: '#a99cc4' }}>Pen patient note</p>
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(169,156,196,0.8)' }}>
          Maya uses a prefilled single-dose 5.0 mg pen. Unlike vial patients, no unit calculation is required —
          the dose is fixed. Approval here authorizes use of the next pen tier (5.0 mg).
          No syringe or concentration data applies.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <AuditTrail />
      </motion.div>

      </> }

      {/* Approve modal */}
      <AnimatePresence>
        {showApproveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setShowApproveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl shadow-xl p-6 max-w-md w-full mx-4"
              style={{ border: '1px solid rgba(169,156,196,0.2)', boxShadow: '0 0 60px rgba(169,156,196,0.1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ink">Confirm Dose Approval</h3>
                <button onClick={() => setShowApproveModal(false)}
                  className="p-1" style={{ color: 'rgba(240,244,248,0.45)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="rounded-xl p-4 mb-4 text-center"
                style={{ background: 'rgba(169,156,196,0.08)', border: '1px solid rgba(169,156,196,0.2)' }}>
                <p className="text-xs uppercase font-semibold tracking-wide mb-1" style={{ color: '#a99cc4' }}>Week 3 Pen Dose</p>
                <p className="text-4xl font-extrabold text-ink">{maya.proposedDoseMg} mg</p>
                <p className="font-medium mt-0.5" style={{ color: '#a99cc4' }}>Single-dose prefilled pen</p>
              </div>
              <p className="text-sm mb-6" style={{ color: 'rgba(240,244,248,0.55)' }}>
                Approving escalation from <strong className="text-ink">{maya.currentDoseMg} mg</strong> to{' '}
                <strong className="text-ink">{maya.proposedDoseMg} mg</strong> for {maya.patientName}.
                Patient will receive the next pen tier and injection instructions.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 font-medium py-3 rounded-xl transition-colors"
                  style={{ border: '1px solid rgba(240,244,248,0.1)', color: 'rgba(240,244,248,0.55)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{ background: '#a99cc4', color: '#0a0e14' }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
