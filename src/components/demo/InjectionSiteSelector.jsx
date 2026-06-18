'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

// 6 pre-defined zones: 3 per side, arranged upper / middle / lower
// Torso SVG uses viewBox="0 0 300 370", navel at (150, 200)
const ZONES = [
  { id: 'L1', cx: 86,  cy: 138, side: 'L', row: 'Upper'  },
  { id: 'L2', cx: 74,  cy: 200, side: 'L', row: 'Middle' },
  { id: 'L3', cx: 86,  cy: 262, side: 'L', row: 'Lower'  },
  { id: 'R1', cx: 214, cy: 138, side: 'R', row: 'Upper'  },
  { id: 'R2', cx: 226, cy: 200, side: 'R', row: 'Middle' },
  { id: 'R3', cx: 214, cy: 262, side: 'R', row: 'Lower'  },
]

// Demo: last injection was right-middle
const PREV_ZONE_ID = 'R2'
const ZR = 24 // zone circle radius

export default function InjectionSiteSelector({ selectedSite, onSelect }) {
  const [ripple, setRipple] = useState(null)

  const tap = (id) => {
    if (id === PREV_ZONE_ID) return
    setRipple(id)
    setTimeout(() => setRipple(null), 550)
    onSelect(id)
  }

  const sel = ZONES.find(z => z.id === selectedSite)
  const prevZone = ZONES.find(z => z.id === PREV_ZONE_ID)
  const sameSide = sel ? sel.side === prevZone.side : false

  return (
    <div className="flex flex-col items-center">

      <p className="text-xs text-slate-500 text-center leading-relaxed mb-3 px-1">
        Tap any teal zone. Rotate sites each week to protect your skin.
      </p>

      {/* ── SVG Diagram ── */}
      <svg width="300" height="370" viewBox="0 0 300 370" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="torsoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#ecddd5" />
            <stop offset="28%"  stopColor="#fdf1ea" />
            <stop offset="72%"  stopColor="#fdf1ea" />
            <stop offset="100%" stopColor="#ecddd5" />
          </linearGradient>
          <linearGradient id="torsoShade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.04)" />
          </linearGradient>
          <filter id="zGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Torso silhouette ── */}
        {/* Body fill */}
        <path
          d="M 150,16
             Q 240,16 260,105
             L 264,215
             Q 264,308 218,336
             L 82,336
             Q 36,308 36,215
             L 40,105
             Q 60,16 150,16 Z"
          fill="url(#torsoGrad)"
          stroke="#d0b4a6"
          strokeWidth="2"
        />
        {/* Overlay for depth */}
        <path
          d="M 150,16
             Q 240,16 260,105
             L 264,215
             Q 264,308 218,336
             L 82,336
             Q 36,308 36,215
             L 40,105
             Q 60,16 150,16 Z"
          fill="url(#torsoShade)"
        />

        {/* Subtle rib arch */}
        <path d="M 78,72 Q 115,58 150,64 Q 185,58 222,72"
          fill="none" stroke="#c8a898" strokeWidth="1.2" opacity="0.45" />

        {/* Center midline */}
        <line x1="150" y1="36" x2="150" y2="328"
          stroke="#c0a496" strokeWidth="1" strokeDasharray="5,5" opacity="0.45" />

        {/* ── YOUR LEFT / YOUR RIGHT pill labels ── */}
        <rect x="36" y="46" width="68" height="22" rx="11" fill="rgba(15,23,42,0.07)" />
        <text x="70" y="61" fontSize="9.5" fontWeight="800" fill="#475569"
          fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">YOUR LEFT</text>

        <rect x="196" y="46" width="68" height="22" rx="11" fill="rgba(15,23,42,0.07)" />
        <text x="230" y="61" fontSize="9.5" fontWeight="800" fill="#475569"
          fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">YOUR RIGHT</text>

        {/* ── Navel ── */}
        <ellipse cx="150" cy="200" rx="9" ry="11" fill="#c4a090" opacity="0.65" />
        <ellipse cx="150" cy="200" rx="5"  ry="6.5" fill="#b08070" opacity="0.5" />

        {/* 2-inch exclusion zone */}
        <circle cx="150" cy="200" r="52"
          fill="rgba(249,115,22,0.05)"
          stroke="#f97316" strokeWidth="1.5" strokeDasharray="5,4" />
        <text x="150" y="152" fontSize="8" fill="#ea580c" fontWeight="600"
          textAnchor="middle" fontFamily="system-ui, sans-serif" opacity="0.75">
          2 in. from navel
        </text>

        {/* ── Injection Zones ── */}
        {ZONES.map((z) => {
          const isPrev = z.id === PREV_ZONE_ID
          const isSel  = selectedSite === z.id
          const isRip  = ripple === z.id

          if (isPrev) {
            return (
              <g key={z.id}>
                {/* Amber "last week" zone */}
                <circle cx={z.cx} cy={z.cy} r={ZR}
                  fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
                <text x={z.cx} y={z.cy - 3} fontSize="8.5" fill="#92400e"
                  textAnchor="middle" fontWeight="800" fontFamily="system-ui, sans-serif">LAST</text>
                <text x={z.cx} y={z.cy + 9} fontSize="8" fill="#92400e"
                  textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="600">WEEK</text>
              </g>
            )
          }

          return (
            <g key={z.id} onClick={() => tap(z.id)} style={{ cursor: 'pointer' }}>
              {/* Large invisible hit area */}
              <circle cx={z.cx} cy={z.cy} r={38} fill="transparent" />

              {/* Outer pulse ring (selected) */}
              {isSel && (
                <motion.circle
                  cx={z.cx} cy={z.cy} r={ZR + 5}
                  fill="none" stroke="#0d9488" strokeWidth="2.5"
                  initial={{ r: ZR + 4, opacity: 0.75 }}
                  animate={{ r: ZR + 20, opacity: 0 }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              {/* Tap ripple */}
              {isRip && (
                <motion.circle
                  cx={z.cx} cy={z.cy} r={ZR}
                  fill="none" stroke="#0d9488" strokeWidth="3"
                  initial={{ r: ZR, opacity: 0.9 }}
                  animate={{ r: ZR + 22, opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              )}

              {/* Zone circle */}
              <circle
                cx={z.cx} cy={z.cy} r={ZR}
                fill={isSel ? '#0d9488' : '#f0fdfa'}
                stroke={isSel ? '#0a7a70' : '#5eead4'}
                strokeWidth={isSel ? 2.5 : 1.5}
                filter={isSel ? 'url(#zGlow)' : undefined}
              />

              {/* Zone label or checkmark */}
              {isSel ? (
                <path
                  d={`M ${z.cx-8},${z.cy+1} L ${z.cx-2},${z.cy+7} L ${z.cx+9},${z.cy-6}`}
                  stroke="white" strokeWidth="2.5"
                  fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
              ) : (
                <>
                  <text x={z.cx} y={z.cy - 2} fontSize="10" fill="#0d9488"
                    textAnchor="middle" fontWeight="800" fontFamily="system-ui, sans-serif">
                    {z.side}
                  </text>
                  <text x={z.cx} y={z.cy + 10} fontSize="7.5" fill="#0d9488"
                    textAnchor="middle" fontFamily="system-ui, sans-serif">
                    {z.row.slice(0,3)}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </svg>

      {/* ── Legend ── */}
      <div className="flex items-center gap-5 mt-1 mb-3">
        {[
          { bg: '#f0fdfa', border: '#5eead4', label: 'Available' },
          { bg: '#fef3c7', border: '#f59e0b', label: 'Last week' },
          { bg: '#0d9488', border: '#0d9488', label: 'Selected' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full border-[1.5px]"
              style={{ background: item.bg, borderColor: item.border }} />
            <span className="text-xs text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Feedback banner ── */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {sel ? (
            <motion.div
              key="sel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={sameSide
                ? { background: '#fffbeb', border: '1px solid #fde68a' }
                : { background: 'linear-gradient(135deg,#f0fdfa,#ecfeff)', border: '1px solid #99f6e4' }}
            >
              <span className="text-xl">{sameSide ? '⚠️' : '✅'}</span>
              <div>
                <p className={`text-sm font-bold ${sameSide ? 'text-amber-800' : 'text-teal-800'}`}>
                  {sel.side === 'L' ? 'Left' : 'Right'} · {sel.row} zone selected
                </p>
                <p className={`text-xs mt-0.5 ${sameSide ? 'text-amber-600' : 'text-teal-600'}`}>
                  {sameSide
                    ? 'Same side as last week — consider rotating to the other side'
                    : 'Great rotation — opposite side from last week ✓'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl"
              style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
            >
              <RotateCcw className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Rotating sites prevents lipodystrophy — skin thickening from repeated injections in the same spot.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
