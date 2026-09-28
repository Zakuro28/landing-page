// Adapted from React Bits "SpotlightCard" (reactbits.dev, MIT)
import { useRef, type ReactNode, type MouseEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  spotlight?: string
}

export default function SpotlightCard({ children, className = '', spotlight = 'rgba(46, 157, 104, 0.2)' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
    el.style.setProperty('--o', '1')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => ref.current?.style.setProperty('--o', '0')}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--o, 0)',
          background: `radial-gradient(420px circle at var(--x) var(--y), ${spotlight}, transparent 60%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
