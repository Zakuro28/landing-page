import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  CalendarCheck,
  CircleCheck,
  Gauge,
  Lock,
  LockOpen,
  MailCheck,
  MailX,
  PencilLine,
  RotateCcw,
  Search,
  SearchX,
  Smartphone,
  Snail,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import BlurText from '../components/reactbits/BlurText'
import Magnet from '../components/reactbits/Magnet'
import { CONTACT_HREF } from '../config'

type Fragment = {
  messy: string
  messyIcon: LucideIcon
  clean: string
  cleanIcon: LucideIcon
  // scattered position inside the panel (percent) + tilt
  x: number
  y: number
  r: number
}

const fragments: Fragment[] = [
  { messy: 'Takes 8 seconds to load', messyIcon: Snail, clean: 'Loads in under a second', cleanIcon: Gauge, x: 4, y: 8, r: -6 },
  { messy: 'Breaks on phones', messyIcon: TriangleAlert, clean: 'Works on every screen', cleanIcon: Smartphone, x: 44, y: 2, r: 5 },
  { messy: 'Nobody finds it on Google', messyIcon: SearchX, clean: 'Built to be found on Google', cleanIcon: Search, x: 20, y: 30, r: -3 },
  { messy: 'Contact form goes nowhere', messyIcon: MailX, clean: 'Every enquiry reaches you', cleanIcon: MailCheck, x: 40, y: 50, r: 7 },
  { messy: '“Not secure” warning', messyIcon: LockOpen, clean: 'Secure, with HTTPS', cleanIcon: Lock, x: 2, y: 66, r: 4 },
  { messy: 'Only the old dev can edit it', messyIcon: TriangleAlert, clean: 'You can edit it yourself', cleanIcon: PencilLine, x: 26, y: 82, r: -5 },
]

function SitePanel() {
  const reduce = useReducedMotion()
  const [rebuilt, setRebuilt] = useState(!!reduce)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setRebuilt(true), 1900)
    return () => clearTimeout(t)
  }, [reduce])

  const spring = { type: 'spring' as const, stiffness: 140, damping: 20 }

  return (
    <div className="relative w-full max-w-[460px] rounded-[28px] border border-white/15 bg-white/[0.07] p-3 shadow-[0_40px_120px_-30px_rgba(2,20,12,0.85)] backdrop-blur-xl">
      <div className="overflow-hidden rounded-[20px] bg-white/[0.06] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-peach/80" />
            <span className="size-2.5 rounded-full bg-orchid/80" />
            <span className="size-2.5 rounded-full bg-mint/80" />
          </div>
          <button
            type="button"
            onClick={() => setRebuilt((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="size-3" aria-hidden />
            {rebuilt ? 'Show the old site' : 'Rebuild it'}
          </button>
        </div>

        <motion.div
          layout
          transition={spring}
          className={`mb-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${
            rebuilt ? 'bg-white text-ink-soft' : 'bg-white/10 text-white/50'
          }`}
        >
          {rebuilt ? <Lock className="size-4 shrink-0 text-emerald-600" aria-hidden /> : <LockOpen className="size-4 shrink-0" aria-hidden />}
          <span className="truncate">{rebuilt ? 'yourbusiness.com' : 'Not secure | yourbusiness.com'}</span>
        </motion.div>

        <div className={rebuilt ? 'flex flex-col gap-1' : 'relative h-[300px] sm:h-[320px]'}>
          {fragments.map((f) => {
            const Icon = rebuilt ? f.cleanIcon : f.messyIcon
            return (
              <motion.div
                key={f.clean}
                layout
                transition={spring}
                animate={{ rotate: rebuilt ? 0 : f.r }}
                style={rebuilt ? undefined : { position: 'absolute', left: `${f.x}%`, top: `${f.y}%` }}
                className={`flex items-center gap-2.5 rounded-xl text-sm whitespace-nowrap ${
                  rebuilt
                    ? 'px-3 py-2.5 text-white hover:bg-white/10'
                    : 'border border-dashed border-white/25 bg-ink/40 px-3 py-2 text-white/70'
                }`}
              >
                <Icon className={`size-4 shrink-0 ${rebuilt ? 'text-mint' : 'text-peach/80'}`} aria-hidden />
                <motion.span layout="position">{rebuilt ? f.clean : f.messy}</motion.span>
                {rebuilt && (
                  <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }} className="ml-auto pl-4">
                    <CircleCheck className="size-4 text-mint" aria-hidden />
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="aura" aria-hidden>
        <div className="aura__blob aura__blob--a" />
        <div className="aura__blob aura__blob--b" />
        <div className="aura__blob aura__blob--c" />
        <div className="aura__blob aura__blob--d" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-32 pb-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-40 lg:pb-32">
        <div>
          <BlurText
            text="A website that brings you customers."
            className="display max-w-[12ch] text-[clamp(3rem,7.6vw,6rem)] font-bold"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-white/75"
          >
            I’m Zacc, a web developer. I design and build fast, mobile-friendly websites for small businesses,
            from a one-page site to a full online store.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnet>
              <a
                href={CONTACT_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(240,195,107,0.7)] transition-transform active:scale-95"
              >
                <CalendarCheck className="size-4.5" aria-hidden />
                Start your website
              </a>
            </Magnet>
            <a href="#process" className="rounded-full px-4 py-3.5 font-medium text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white">
              See how it works
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <SitePanel />
        </div>
      </div>
    </section>
  )
}
