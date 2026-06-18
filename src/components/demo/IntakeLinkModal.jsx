'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function IntakeLinkModal({ open, onClose }) {
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const intakeUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/demo/intake`
    : '/demo/intake'

  const handleCopy = () => {
    navigator.clipboard.writeText(intakeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="glass rounded-3xl p-8 w-[420px] shadow-2xl"
          style={{ border: '1px solid rgba(240,244,248,0.1)' }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#f0f4f8' }}>Share Intake Link</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(240,244,248,0.55)' }}>
            Send this link to your patient to complete at home on their device.
          </p>

          {/* Link box */}
          <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,244,248,0.1)' }}>
            <input
              type="text"
              readOnly
              value={intakeUrl}
              className="w-full bg-transparent font-mono text-xs outline-none"
              style={{ color: 'rgba(240,244,248,0.7)' }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-colors"
              style={{ background: 'rgba(127,181,201,0.1)', color: '#7fb5c9' }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(240,244,248,0.7)' }}
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
