'use client'
import { useStore } from '@/lib/store'
import StatusPill from '@/components/demo/StatusPill'

export default function WeeklyDoseTable() {
  const weeklyPlan = useStore((s) => s.weeklyPlan)
  const currentWeek = useStore((s) => s.currentWeek)

  const getStatusType = (status) => {
    if (status === 'completed') return 'completed'
    if (status === 'approved') return 'approved'
    if (status === 'pending approval') return 'pending'
    return 'review'
  }

  return (
    <div className="glass border-hairline rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#f0f4f8' }}>
        Weekly Dose Plan
      </h3>
      <div className="overflow-hidden rounded-xl" style={{ border: '1px solid rgba(240,244,248,0.1)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(240,244,248,0.04)' }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(240,244,248,0.55)' }}>
                Week
              </th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(240,244,248,0.55)' }}>
                Dose (mg)
              </th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(240,244,248,0.55)' }}>
                Units
              </th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(240,244,248,0.55)' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyPlan.map((item) => (
              <tr
                key={item.week}
                style={{
                  borderTop: '1px solid rgba(240,244,248,0.06)',
                  background: item.week === currentWeek ? 'rgba(127,181,201,0.06)' : 'transparent',
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: '#f0f4f8' }}>
                  {item.week === currentWeek && (
                    <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: '#7fb5c9' }} />
                  )}
                  Week {item.week}
                </td>
                <td className="px-4 py-3" style={{ color: 'rgba(240,244,248,0.55)' }}>{item.doseMg} mg</td>
                <td className="px-4 py-3" style={{ color: 'rgba(240,244,248,0.55)' }}>{item.units} units</td>
                <td className="px-4 py-3">
                  <StatusPill
                    status={getStatusType(item.status)}
                    text={item.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
