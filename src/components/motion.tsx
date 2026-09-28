// Shared motion building blocks: one easing, one reveal, one stagger.
import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const

// Plays the intro once per browser session, never for reduced-motion users.
export const SHOW_INTRO = (() => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem('intro-seen')) return false
    sessionStorage.setItem('intro-seen', '1')
    return true
  } catch {
    return false
  }
})()

// Hero animations wait for the intro curtain to lift.
export const INTRO_DELAY = SHOW_INTRO ? 1.35 : 0

const viewport = { once: true, margin: '0px 0px -12% 0px' }

export function Reveal({ children, delay = 0, y = 32, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={viewport}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </motion.div>
  )
}
