'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import DoseLadderComparison from '@/components/demo/DoseLadderComparison'
import AuditTrail from '@/components/demo/AuditTrail'
import StatusPill from '@/components/demo/StatusPill'
import DosePacingReport from '@/components/demo/DosePacingReport'
import { useStore } from '@/lib/store'
import { ArrowLeft, CheckCircle, XCircle, PauseCircle, Shield, TrendingUp, X, Zap } from 'lucide-react'

export default function ReviewPage() {
  const {
    patientName,
    currentDoseMg,
    proposedDoseMg,
    proposedUnits,
    symptoms,
    week2Approved,
    approveWeek2,
    showToast,
  } = useStore()

  const [showApproveModal, setShowApproveModal] = useState(false)

  const handleApprove = () => {
    approveWeek2()
    showToast('Week 2 dose approved: 3.0 mg (30 units)')
    setShowApproveModal(false)
  }

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <Link href="/demo/clinician/alex"
            className="p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(240,244,248,0.45)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(240,244,248,0.1)' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-ink">Dose Review: {patientName}</h1>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(240,244,248,0.55)' }}>Week 2 escalation · Check-in received</p>
          </div>
        </div>
        {week2Approved && <StatusPill status="approved" text="Approved" />}
      </div>

      {/* Approve action bar */}
      <AnimatePresence>
        {!week2Approved ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="rounded-2xl p-5 mb-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #0d2137 100%)',
              border: '1px solid rgba(127,181,201,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(127,181,201,0.2), transparent 70%)' }} />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(127,181,201,0.15)', border: '1px solid rgba(127,181,201,0.3)' }}>
                  <Zap className="w-6 h-6" style={{ color: '#7fb5c9' }} />
                </div>
                <div>
                  <p className="text-ink font-bold text-base">
                    Ready to approve — {patientName} passed all safety checks
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(240,244,248,0.55)' }}>
                    Propose: <span className="font-semibold" style={{ color: '#7fb5c9' }}>{proposedDoseMg} mg · {proposedUnits} units</span>
                    <span className="mx-2" style={{ color: 'rgba(240,244,248,0.3)' }}>·</span>
                    +0.5 mg from {currentDoseMg} mg current
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <button className="font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2 text-sm"
                  style={{ border: '1px solid rgba(240,244,248,0.2)', color: 'rgba(240,244,248,0.55)' }}>
                  <PauseCircle className="w-4 h-4" />
                  Hold
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
                    background: '#7fb5c9',
                    color: '#0a0e14',
                    boxShadow: '0 4px 16px rgba(127,181,201,0.3)',
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve {proposedDoseMg} mg
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
              <p className="font-bold" style={{ color: '#7fb5c9' }}>Week 2 Approved — Patient Notified</p>
              <p className="text-sm" style={{ color: 'rgba(127,181,201,0.7)' }}>
                Escalated to {proposedDoseMg} mg ({proposedUnits} units). Patient will receive dose instructions within 24 hours.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dose Ladder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <DoseLadderComparison />
      </motion.div>

      {/* Patient response + safety rules */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Patient response */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
          style={{ border: '1px solid rgba(240,244,248,0.1)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#7fb5c9' }} />
            <h3 className="text-lg font-semibold text-ink">Patient Response</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgba(240,244,248,0.55)' }}>Week 1 Symptom Summary</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Nausea',       value: symptoms.nausea },
                  { label: 'Reflux',        value: symptoms.reflux },
                  { label: 'Dizziness',     value: symptoms.dizziness },
                  { label: 'Constipation',  value: symptoms.constipation },
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
              style={{ background: 'rgba(127,181,201,0.06)', border: '1px solid rgba(127,181,201,0.2)' }}>
              <p className="text-sm font-semibold" style={{ color: '#7fb5c9' }}>Recommendation: Safe to escalate</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(127,181,201,0.7)' }}>
                All symptom scores ≤ 1/3. No contraindications. Weight loss on track at −2.2 lbs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Safety rules */}
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
              { rule: 'Max symptom score < 2 for all categories', passed: true, detail: 'Highest: Nausea 1/3' },
              { rule: 'No new onset of severe symptoms',           passed: true, detail: 'No severe symptoms' },
              { rule: 'Weight change within expected range',       passed: true, detail: '−2.2 lbs (expected: −1 to −4 lbs)' },
              { rule: 'Patient completed check-in on time',        passed: true, detail: 'Submitted Day 7' },
              { rule: 'No orthostatic symptoms',                   passed: true, detail: 'Dizziness: 0/3' },
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

      {/* Audit trail */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <AuditTrail />
      </motion.div>

      {/* Approve confirmation modal */}
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
              style={{ border: '1px solid rgba(127,181,201,0.2)', boxShadow: '0 0 60px rgba(127,181,201,0.1)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success icon with gradient */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)',
                      boxShadow: '0 0 24px rgba(127,181,201,0.2)',
                    }}>
                    <CheckCircle className="w-6 h-6" style={{ color: '#0a0e14' }} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">Confirm Dose Approval</h3>
                </div>
                <button onClick={() => setShowApproveModal(false)}
                  className="p-1" style={{ color: 'rgba(240,244,248,0.45)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Week 2 badge */}
              <div className="rounded-xl p-4 mb-4 text-center"
                style={{ background: 'rgba(127,181,201,0.08)', border: '1px solid rgba(127,181,201,0.2)' }}>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide mb-2 px-3 py-1 rounded-full"
                  style={{ background: 'rgba(127,181,201,0.15)', color: '#7fb5c9', border: '1px solid rgba(127,181,201,0.2)' }}>
                  Week 2 Approved!
                </span>
                <p className="text-4xl font-extrabold text-ink">{proposedDoseMg} mg</p>
                <p className="font-medium mt-0.5" style={{ color: '#7fb5c9' }}>{proposedUnits} units</p>
              </div>

              <p className="text-sm mb-6" style={{ color: 'rgba(240,244,248,0.55)' }}>
                Approving a dose increase from <strong className="text-ink">{currentDoseMg} mg</strong> to{' '}
                <strong className="text-ink">{proposedDoseMg} mg</strong> for {patientName}.
                The patient will be notified and instructed on the new dose.
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
                  style={{ background: '#7fb5c9', color: '#0a0e14' }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>

              {/* Back to dashboard link */}
              <div className="text-center mt-3">
                <Link href="/demo/clinician"
                  className="text-xs transition-colors"
                  style={{ color: 'rgba(240,244,248,0.35)' }}>
                  Back to dashboard
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
