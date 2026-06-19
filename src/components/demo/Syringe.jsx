'use client'
import { motion } from 'framer-motion'

export default function Syringe({ units, maxUnits = 100, label, animate = true, theme = 'light' }) {
  const dark = theme === 'dark'

  // Theme-dependent accents (light = teal/cyan, dark = clinical palette)
  const fillStops = dark
    ? ['#7fb5c9', '#a99cc4', '#7fb5c9']
    : ['#0d9488', '#06b6d4', '#0d9488']
  const badgeGrad = dark
    ? 'linear-gradient(135deg, #7fb5c9, #a99cc4)'
    : 'linear-gradient(135deg, #0d9488, #0891b2)'
  const badgeShadow = dark ? '0 8px 20px rgba(127,181,201,0.25)' : '0 8px 20px rgba(13,148,136,0.3)'
  const badgeText = dark ? '#0a0e14' : '#ffffff'
  const badgeSub = dark ? 'rgba(10,14,20,0.6)' : '#ccfbf1'
  const labelColor = dark ? 'rgba(240,244,248,0.45)' : '#64748b'
  const tickColor = dark ? 'rgba(240,244,248,0.4)' : '#64748b'
  const tickText = dark ? 'rgba(240,244,248,0.5)' : '#64748b'
  const captionColor = dark ? 'rgba(240,244,248,0.35)' : '#94a3b8'
  const target = dark
    ? { box: 'rgba(201,184,150,0.12)', boxStroke: 'rgba(201,184,150,0.4)', t1: '#c9b896', t2: '#c9b896', arrow: '#c9b896' }
    : { box: '#fff7ed', boxStroke: '#fed7aa', t1: '#c2410c', t2: '#ea580c', arrow: '#f97316' }

  // Barrel geometry — all centered at x=100 in a 200-wide viewBox
  const cx = 100          // horizontal center
  const bw = 40           // barrel width
  const bx = cx - bw / 2  // barrel left = 80
  const barrelTop = 100
  const barrelBottom = 360
  const barrelH = barrelBottom - barrelTop

  const fillH = (units / maxUnits) * barrelH
  const fillY = barrelBottom - fillH
  const targetY = fillY

  const ticks = Array.from({ length: 11 }, (_, i) => ({
    val: i * 10,
    y: barrelBottom - (i * 10 / maxUnits) * barrelH,
  }))

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Dose badge */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl"
          style={{ background: badgeGrad, boxShadow: badgeShadow }}
        >
          <span className="text-2xl font-extrabold" style={{ color: badgeText }}>{units}</span>
          <span className="text-sm font-medium" style={{ color: badgeSub }}>units</span>
        </div>
        {label && <p className="text-sm mt-2" style={{ color: labelColor }}>{label}</p>}
      </div>

      <svg width="200" height="480" viewBox="0 0 200 480">
        <defs>
          <linearGradient id="barrelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8edf2" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dde3ea" />
          </linearGradient>
          <linearGradient id="fillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fillStops[0]} stopOpacity="0.8" />
            <stop offset="50%" stopColor={fillStops[1]} stopOpacity="0.9" />
            <stop offset="100%" stopColor={fillStops[2]} stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="plungerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#b8c5d0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="barrelClip">
            <rect x={bx + 1} y={barrelTop} width={bw - 2} height={barrelH} rx="3" />
          </clipPath>
        </defs>

        {/* ── T-handle ── */}
        <rect x={cx - 34} y="18" width="68" height="13" rx="6.5" fill="#475569" />
        <rect x={cx - 5} y="18" width="10" height="5" rx="2" fill="#334155" />

        {/* ── Plunger rod ── */}
        <rect x={cx - 5} y="30" width="10" height={barrelTop - 20} rx="3" fill="url(#plungerGrad)" />

        {/* ── Plunger gasket ── */}
        <rect x={bx + 1} y={barrelTop - 10} width={bw - 2} height="12" rx="3" fill="#cbd5e1" />
        <rect x={bx + 3} y={barrelTop - 8} width={bw - 6} height="8" rx="2" fill="#dde3ea" />

        {/* ── Barrel background ── */}
        <rect x={bx} y={barrelTop} width={bw} height={barrelH} rx="6" fill="url(#barrelGrad)" stroke="#c8d0da" strokeWidth="1.5" />

        {/* ── Liquid fill (animated) ── */}
        <motion.rect
          x={bx + 1}
          y={fillY}
          width={bw - 2}
          height={fillH}
          rx="3"
          fill="url(#fillGrad)"
          clipPath="url(#barrelClip)"
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
          initial={animate ? { scaleY: 0 } : false}
          animate={animate ? { scaleY: 1 } : false}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
          filter="url(#glow)"
        />

        {/* ── Barrel shine ── */}
        <line x1={bx + 7} y1={barrelTop + 8} x2={bx + 7} y2={barrelBottom - 6} stroke="white" strokeWidth="2.5" strokeOpacity="0.55" />
        <line x1={bx + 12} y1={barrelTop + 8} x2={bx + 12} y2={barrelBottom - 6} stroke="white" strokeWidth="1.2" strokeOpacity="0.25" />

        {/* ── Barrel border overlay ── */}
        <rect x={bx} y={barrelTop} width={bw} height={barrelH} rx="6" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

        {/* ── Tick marks (right side) ── */}
        {ticks.map(({ val, y }) => {
          const isMajor = val % 50 === 0
          const isMid = val % 20 === 0
          const tickLen = isMajor ? 16 : isMid ? 12 : 8
          return (
            <g key={val}>
              <line
                x1={bx + bw}
                y1={y}
                x2={bx + bw + tickLen}
                y2={y}
                stroke={tickColor}
                strokeWidth={isMajor ? 2 : 1}
                opacity={isMid ? 1 : 0.5}
              />
              {isMid && (
                <text
                  x={bx + bw + tickLen + 4}
                  y={y + 4}
                  fontSize="10"
                  fill={tickText}
                  fontFamily="system-ui, sans-serif"
                  fontWeight={isMajor ? '700' : '400'}
                >
                  {val}
                </text>
              )}
            </g>
          )
        })}

        {/* ── Target indicator (left side, fades in after fill) ── */}
        <motion.g
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ delay: 2.3, duration: 0.4 }}
        >
          {/* Label box */}
          <rect x="10" y={targetY - 15} width="58" height="30" rx="8" fill={target.box} stroke={target.boxStroke} strokeWidth="1.5" />
          <text x="39" y={targetY - 3} fontSize="8.5" fill={target.t1} fontWeight="700" textAnchor="middle" fontFamily="system-ui, sans-serif">
            FILL TO
          </text>
          <text x="39" y={targetY + 11} fontSize="11" fill={target.t2} fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">
            {units} u
          </text>
          {/* Arrow + dashed line */}
          <line x1="68" y1={targetY} x2={bx - 2} y2={targetY} stroke={target.arrow} strokeWidth="2" strokeDasharray="4,3" />
          <polygon points={`${bx - 2},${targetY - 4} ${bx + 6},${targetY} ${bx - 2},${targetY + 4}`} fill={target.arrow} />
        </motion.g>

        {/* ── Needle hub (trapezoid, centered) ── */}
        <polygon
          points={`${cx - 18},${barrelBottom} ${cx + 18},${barrelBottom} ${cx + 10},${barrelBottom + 14} ${cx - 10},${barrelBottom + 14}`}
          fill="#b0bec5"
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* ── Needle body (tapered rectangle, perfectly centered) ── */}
        <polygon
          points={`${cx - 6},${barrelBottom + 14} ${cx + 6},${barrelBottom + 14} ${cx + 1.5},${barrelBottom + 65} ${cx - 1.5},${barrelBottom + 65}`}
          fill="url(#needleGrad)"
        />

        {/* ── Needle tip (tiny cap) ── */}
        <ellipse cx={cx} cy={barrelBottom + 65} rx="1.5" ry="2" fill="#78909c" />
      </svg>

      <p className="text-xs text-center max-w-[190px] leading-relaxed" style={{ color: captionColor }}>
        Demo only. Actual units depend on your vial concentration.
      </p>
    </div>
  )
}
