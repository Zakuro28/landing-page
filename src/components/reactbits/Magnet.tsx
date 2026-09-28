// Adapted from React Bits "Magnet" (reactbits.dev, MIT)
import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { useReducedMotion } from 'motion/react'

type Props = { children: ReactNode; strength?: number; className?: string }

export default function Magnet({ children, strength = 4, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) / strength,
      y: (e.clientY - (r.top + r.height / 2)) / strength,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.x === 0 && pos.y === 0 ? 'transform .5s cubic-bezier(.22,1,.36,1)' : 'transform .15s ease-out',
      }}
    >
      {children}
    </div>
  )
}
