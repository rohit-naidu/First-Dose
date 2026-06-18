'use client'
import { useRouter } from 'next/navigation'
import PenInjectionStepper from '@/components/demo/PenInjectionStepper'
import { useStore } from '@/lib/store'
import { ArrowLeft } from 'lucide-react'

export default function MayaInjectPage() {
  const router = useRouter()
  const { maya, completeMayaInjection, showToast } = useStore()

  const handleComplete = () => {
    completeMayaInjection()
    showToast('Pen injection logged — great work!')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <p className="text-xs text-slate-400">Injection guide</p>
          <h2 className="text-base font-bold text-slate-900">Pen Walkthrough</h2>
        </div>
      </div>

      {/* Stepper fills remaining height */}
      <div className="flex-1 overflow-hidden relative">
        <PenInjectionStepper
          doseMg={maya.currentDoseMg}
          medication={maya.medication}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
