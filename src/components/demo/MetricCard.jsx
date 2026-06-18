'use client'
import { motion } from 'framer-motion'

export default function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border-hairline rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className="w-4 h-4"
          style={{ color: color || '#7fb5c9' }}
        />
        <span className="text-xs font-medium" style={{ color: 'rgba(240,244,248,0.55)' }}>{label}</span>
      </div>
      <p className="text-xl font-bold" style={{ color: '#f0f4f8' }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'rgba(240,244,248,0.45)' }}>{sub}</p>}
    </motion.div>
  )
}
