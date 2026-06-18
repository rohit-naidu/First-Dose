'use client'
import React from 'react'

export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen flex items-start justify-center py-16 px-4 relative">
      {/* Phone device */}
      <div className="relative" style={{ filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))' }}>
        {/* Phone outer shell */}
        <div
          className="relative w-[390px] rounded-[52px] overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 100%)',
            padding: '14px',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Inner bezel */}
          <div
            className="relative bg-white rounded-[40px] overflow-hidden"
            style={{ minHeight: '820px' }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-50"
              style={{
                width: '126px',
                height: '37px',
                background: '#0a0a0a',
                borderRadius: '20px',
              }}>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.05)' }} />
                <div className="w-5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-7 pt-3 pb-0" style={{ marginTop: '0px' }}>
              <span className="text-[13px] font-semibold text-slate-900" style={{ marginTop: '48px', marginLeft: '2px' }}>9:41</span>
              <div className="flex items-center gap-1.5" style={{ marginTop: '48px' }}>
                {/* Signal bars */}
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <rect x="0" y="8" width="3" height="4" rx="1" fill="#0f172a"/>
                  <rect x="5" y="5" width="3" height="7" rx="1" fill="#0f172a"/>
                  <rect x="10" y="2" width="3" height="10" rx="1" fill="#0f172a"/>
                  <rect x="15" y="0" width="3" height="12" rx="1" fill="#0f172a" opacity="0.3"/>
                </svg>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 10a1 1 0 100-2 1 1 0 000 2z" fill="#0f172a"/>
                  <path d="M5 7.5C5.8 6.7 6.85 6.2 8 6.2s2.2.5 3 1.3" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2.5 5C3.9 3.7 5.85 2.8 8 2.8s4.1.9 5.5 2.2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {/* Battery */}
                <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#0f172a" strokeOpacity="0.35"/>
                  <rect x="2" y="2" width="16" height="8" rx="2" fill="#0f172a"/>
                  <path d="M23 4v4" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Browser address bar */}
            <div className="px-4 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-[10px]" style={{ background: 'rgba(0,0,0,0.06)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                  <path d="M6 1a5 5 0 100 10A5 5 0 006 1zM1 6a5 5 0 1110 0A5 5 0 011 6z" stroke="#3b82f6" strokeWidth="1.2"/>
                  <path d="M4 6c0-1.1.4-2.1 1-2.8M8 6c0 1.1-.4 2.1-1 2.8M2 6h8M6 2.5C5.2 3.3 4.7 4.6 4.7 6s.5 2.7 1.3 3.5" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-[13px] font-medium text-slate-700 flex-1 text-center leading-none" style={{ letterSpacing: '-0.01em' }}>
                  firstdose.health<span className="text-slate-400">/intake</span>
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 opacity-40">
                  <path d="M5 2H3a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V7M7 1h4m0 0v4m0-4L5.5 6.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="phone-scroll overflow-y-auto" style={{ maxHeight: '730px' }}>
              {children}
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1" style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-10 rounded-l-sm" style={{ background: '#2a2a2e' }} />
        <div className="absolute -left-[3px] top-44 w-[3px] h-16 rounded-l-sm" style={{ background: '#2a2a2e' }} />
        <div className="absolute -left-[3px] top-64 w-[3px] h-16 rounded-l-sm" style={{ background: '#2a2a2e' }} />
        <div className="absolute -right-[3px] top-36 w-[3px] h-20 rounded-r-sm" style={{ background: '#2a2a2e' }} />
      </div>
    </div>
  )
}
