'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Syringe, ClipboardCheck, TrendingUp } from 'lucide-react'

export default function PatientBottomNav({ basePath = '/demo/patient' }) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home',     href: `/demo/patient/home`,     icon: Home },
    { label: 'Inject',   href: `/demo/patient/inject`,   icon: Syringe },
    { label: 'Check-in', href: '/demo/patient/check-in', icon: ClipboardCheck },
    { label: 'Progress', href: `/demo/patient/progress`, icon: TrendingUp },
  ]

  const activeColor = basePath.includes('maya')
    ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
    : 'linear-gradient(135deg, #0d9488, #0891b2)'
  const activeShadow = basePath.includes('maya')
    ? '0 4px 12px rgba(79,70,229,0.35)'
    : '0 4px 12px rgba(13,148,136,0.35)'
  const activeText = basePath.includes('maya') ? 'text-indigo-600' : 'text-teal-600'

  return (
    <div className="sticky bottom-0 px-4 pb-4 pt-2"
      style={{ background: 'linear-gradient(to top, white 70%, transparent)' }}>
      <div className="flex items-center justify-around bg-white rounded-2xl py-2 px-1"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                style={isActive ? { background: activeColor, boxShadow: activeShadow } : {}}
              >
                <Icon style={{ width: '17px', height: '17px', color: isActive ? 'white' : '#94a3b8' }} />
              </div>
              <span className={`text-[10px] font-semibold transition-colors ${isActive ? activeText : 'text-slate-400'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
