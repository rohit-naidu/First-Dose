'use client'

const styleMap = {
  pending:   {
    background: 'rgba(201,184,150,0.1)',
    color: '#c9b896',
    border: '1px solid rgba(201,184,150,0.2)',
    dot: '#c9b896',
  },
  approved:  {
    background: 'rgba(127,181,201,0.1)',
    color: '#7fb5c9',
    border: '1px solid rgba(127,181,201,0.2)',
    dot: '#7fb5c9',
  },
  completed: {
    background: 'rgba(127,181,201,0.1)',
    color: '#7fb5c9',
    border: '1px solid rgba(127,181,201,0.2)',
    dot: '#7fb5c9',
  },
  held:      {
    background: 'rgba(201,127,127,0.1)',
    color: '#c97f7f',
    border: '1px solid rgba(201,127,127,0.2)',
    dot: '#c97f7f',
  },
  review:    {
    background: 'rgba(201,127,127,0.1)',
    color: '#c97f7f',
    border: '1px solid rgba(201,127,127,0.2)',
    dot: '#c97f7f',
  },
  stable:    {
    background: 'rgba(127,181,201,0.1)',
    color: '#7fb5c9',
    border: '1px solid rgba(127,181,201,0.2)',
    dot: '#7fb5c9',
  },
  warning:   {
    background: 'rgba(201,184,150,0.1)',
    color: '#c9b896',
    border: '1px solid rgba(201,184,150,0.2)',
    dot: '#c9b896',
  },
}

export default function StatusPill({ status, text }) {
  const s = styleMap[status] || styleMap.pending
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: s.background, color: s.color, border: s.border }}
    >
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {text}
    </div>
  )
}
