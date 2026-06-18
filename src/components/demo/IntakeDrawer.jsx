'use client'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import IntakeFormCore from '@/components/demo/IntakeFormCore'
import { useStore } from '@/lib/store'

export default function IntakeDrawer({ open, onClose }) {
  const showToast = useStore((state) => state.showToast)

  const handleComplete = () => {
    showToast('Dose Readiness Report generated!')
    onClose()
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* Centered card modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-5"
      >
        <div className="relative w-full max-w-[480px] flex flex-col" style={{ maxHeight: 'calc(100vh - 40px)' }}>
          {/* Close button floats above the card, top-right */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-colors backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              aria-label="Close"
            >
              <X className="w-5 h-5" style={{ color: 'rgba(240,244,248,0.7)' }} />
            </button>
          </div>

          {/* Form card */}
          <div
            className="flex-1 rounded-3xl shadow-2xl overflow-hidden overflow-y-auto"
            style={{ background: 'rgba(11,15,22,0.98)' }}
          >
            <IntakeFormCore onComplete={handleComplete} mode="clinician" />
          </div>
        </div>
      </motion.div>
    </>
  )
}
