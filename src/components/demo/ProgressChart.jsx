'use client'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function ProgressChart({
  title,
  data,
  color = '#7fb5c9',
  unit = '',
  height = 200,
}) {
  return (
    <div className="glass border-hairline rounded-2xl p-5">
      <h3 className="text-sm font-semibold mb-4" style={{ color: '#f0f4f8' }}>{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(240,244,248,0.06)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: 'rgba(240,244,248,0.35)' }}
            axisLine={false}
            tickLine={false}
            stroke="transparent"
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'rgba(240,244,248,0.35)' }}
            axisLine={false}
            tickLine={false}
            stroke="transparent"
            unit={unit}
            width={45}
          />
          <Tooltip
            contentStyle={{
              background: '#0a0e14',
              border: '1px solid rgba(240,244,248,0.1)',
              borderRadius: '6px',
              color: '#f0f4f8',
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ fill: '#0a0e14', stroke: color, strokeWidth: 2.5, r: 4 }}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
