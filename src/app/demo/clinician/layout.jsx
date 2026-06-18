'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Activity,
  Bell,
  Search,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/demo/clinician', icon: LayoutDashboard },
  { label: 'Patients', href: '/demo/clinician', icon: Users },
  { label: 'Reports', href: '#', icon: FileText },
  { label: 'Analytics', href: '#', icon: Activity },
  { label: 'Settings', href: '#', icon: Settings },
]

export default function ClinicianLayout({ children }) {
  const pathname = usePathname()

  const breadcrumbs = () => {
    const parts = [{ label: 'Dashboard', href: '/demo/clinician' }]
    if (pathname.includes('/alex/review')) {
      parts.push({ label: 'Alex Rivera', href: '/demo/clinician/alex' })
      parts.push({ label: 'Dose Review', href: '/demo/clinician/alex/review' })
    } else if (pathname.includes('/alex')) {
      parts.push({ label: 'Alex Rivera', href: '/demo/clinician/alex' })
    } else if (pathname.includes('/maya')) {
      parts.push({ label: 'Maya Patel', href: '/demo/clinician/maya' })
    }
    return parts
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]" style={{ background: '#0a0e14' }}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col flex-shrink-0"
        style={{
          background: 'rgba(11,15,22,0.95)',
          borderRight: '1px solid rgba(240,244,248,0.1)',
        }}>
        {/* Logo */}
        <div className="px-6 py-6" style={{ borderBottom: '1px solid rgba(240,244,248,0.08)' }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(127,181,201,0.15)', border: '1px solid rgba(127,181,201,0.2)' }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: '#7fb5c9' }} />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight tracking-tight">
                <span className="text-ink">First Dose</span>{' '}
                <span style={{ color: '#7fb5c9' }}>Health</span>
              </h1>
              <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>Clinician Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/demo/clinician' && pathname.startsWith(item.href))
            const isClinicianActive = item.href === '/demo/clinician' && pathname.startsWith('/demo/clinician')
            const active = isActive || isClinicianActive
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={active
                  ? { background: 'rgba(127,181,201,0.08)', color: '#7fb5c9', border: '1px solid rgba(127,181,201,0.2)' }
                  : { color: 'rgba(240,244,248,0.45)', border: '1px solid transparent' }}
              >
                <Icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                {item.label}
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#7fb5c9' }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Clinician profile */}
        <div className="px-3 pb-5 pt-4" style={{ borderTop: '1px solid rgba(240,244,248,0.08)' }}>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', color: '#0a0e14' }}>
              EL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">Dr. Emily Lee</p>
              <p className="text-xs truncate" style={{ color: 'rgba(240,244,248,0.4)' }}>Endocrinology</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 px-3 py-2 mt-1 text-xs rounded-lg transition-colors"
            style={{ color: 'rgba(240,244,248,0.3)' }}>
            Exit Demo
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="px-8 py-4 flex items-center gap-4 sticky top-16 z-30"
          style={{
            background: 'rgba(10,14,20,0.95)',
            borderBottom: '1px solid rgba(240,244,248,0.1)',
            boxShadow: '0 1px 16px rgba(0,0,0,0.3)',
          }}>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 flex-1">
            {breadcrumbs().map((crumb, i, arr) => (
              <React.Fragment key={crumb.href}>
                <Link href={crumb.href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: i === arr.length - 1 ? '#f0f4f8' : 'rgba(240,244,248,0.4)' }}>
                  {crumb.label}
                </Link>
                {i < arr.length - 1 && (
                  <ChevronRight className="w-4 h-4" style={{ color: 'rgba(240,244,248,0.2)' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,244,248,0.1)', width: '200px' }}>
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(240,244,248,0.35)' }} />
            <span style={{ color: 'rgba(240,244,248,0.35)' }}>Search patients...</span>
          </div>

          {/* Bell */}
          <button className="relative w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(240,244,248,0.1)' }}>
            <Bell style={{ width: '18px', height: '18px', color: 'rgba(240,244,248,0.45)' }} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: '#7fb5c9', border: '1px solid #0a0e14' }} />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2.5 pl-3" style={{ borderLeft: '1px solid rgba(240,244,248,0.1)' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #7fb5c9, #a99cc4)', color: '#0a0e14' }}>
              EL
            </div>
            <div>
              <p className="text-sm font-semibold text-ink leading-none">Dr. Lee</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.4)' }}>Endocrinology</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
