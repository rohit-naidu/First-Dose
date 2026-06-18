'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function Toast() {
  const toastMessage = useStore((s) => s.toastMessage)
  const clearToast = useStore((s) => s.clearToast)

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(clearToast, 4000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, clearToast])

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{
            background: 'rgba(11,15,22,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(240,244,248,0.1)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          }}
        >
          <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7fb5c9, #7fb5c9cc)' }}>
            <CheckCircle className="w-4 h-4" style={{ color: '#f0f4f8' }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#f0f4f8' }}>{toastMessage}</span>
          <button onClick={clearToast} className="ml-1 opacity-50 hover:opacity-100 transition-opacity">
            <X className="w-3.5 h-3.5" style={{ color: '#f0f4f8' }} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
