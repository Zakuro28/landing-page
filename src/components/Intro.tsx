import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE, SHOW_INTRO } from './motion'
import { BRAND } from '../config'

// Logo draws itself, then the curtain lifts to reveal the hero.
export default function Intro() {
  const [visible, setVisible] = useState(SHOW_INTRO)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setVisible(false), 1150)
    return () => clearTimeout(t)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <svg viewBox="0 0 64 64" className="size-20">
              <motion.rect
                width="64" height="64" rx="18"
                fill="#1a6b48"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ transformOrigin: '32px 32px' }}
              />
              <motion.path
                d="M20 20h22L20 44h18"
                fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="45.5" cy="44" r="3.6" fill="#f0c36b"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.8 }}
                style={{ transformOrigin: '45.5px 44px' }}
              />
            </svg>
            <motion.p
              className="text-lg font-semibold text-white/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
            >
              {BRAND}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
