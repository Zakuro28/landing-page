// Adapted from React Bits "TiltedCard" (reactbits.dev, MIT)
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

export default function TiltCard({ children, max = 10, className = '' }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])

  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={`[perspective:1100px] ${className}`}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-60 mix-blend-soft-light"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 55%)`,
            ),
          }}
        />
      </motion.div>
    </div>
  )
}
