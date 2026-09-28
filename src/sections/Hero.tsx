import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import TiltCard from '../components/reactbits/TiltCard'
import { EASE, INTRO_DELAY } from '../components/motion'
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
    const t = setTimeout(() => setRebuilt(true), 2100 + INTRO_DELAY * 1000)
    return () => clearTimeout(t)
  }, [reduce])

  const spring = { type: 'spring' as const, stiffness: 140, damping: 20 }

  return (
    <div className="relative rounded-[28px] border border-white/15 bg-white/[0.07] p-3 shadow-[0_40px_120px_-30px_rgba(2,20,12,0.85)] backdrop-blur-xl">
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
  const ref = useRef<HTMLElement>(null)
  const d = INTRO_DELAY

  // Glow leans toward the cursor
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const auraX = useSpring(mx, { stiffness: 40, damping: 20 })
  const auraY = useSpring(my, { stiffness: 40, damping: 20 })
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 80)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 60)
  }

  // Scrolling away: copy drifts down and fades, panel lifts, glow sinks
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const auraScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])

  return (
    <section ref={ref} onMouseMove={onMove} className="relative isolate overflow-hidden text-white">
      <motion.div className="aura" aria-hidden style={{ scale: auraScale }}>
        <motion.div className="absolute inset-0" style={{ x: auraX, y: auraY }}>
          <div className="aura__blob aura__blob--a" />
          <div className="aura__blob aura__blob--b" />
          <div className="aura__blob aura__blob--c" />
          <div className="aura__blob aura__blob--d" />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-28 pb-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pt-32 lg:pb-28">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d, duration: 0.7, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pr-4 pl-2 text-sm text-white/80 backdrop-blur"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint/70" />
              <span className="relative size-2.5 rounded-full bg-mint" />
            </span>
            Taking new projects this month
          </motion.p>
          <BlurText
            text="A website that brings you customers."
            delay={d + 0.1}
            className="display max-w-[12ch] text-[clamp(3rem,7.6vw,6rem)] font-bold"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.65, duration: 0.8, ease: EASE }}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-white/75"
          >
            I’m Zacc, a web developer. I design and build fast, mobile-friendly websites for small businesses,
            from a one-page site to a full online store.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: d + 0.85, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnet>
              <a
                href={CONTACT_HREF}
                className="shine group/cta inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(240,195,107,0.7)] transition-transform active:scale-95"
              >
                <CalendarCheck className="size-4.5 transition-transform duration-300 group-hover/cta:-rotate-12" aria-hidden />
                Start your website
              </a>
            </Magnet>
            <a href="#process" className="group/link relative rounded-full px-4 py-3.5 font-medium text-white/80 hover:text-white">
              See how it works
              <span className="absolute inset-x-4 bottom-2.5 h-px origin-left bg-white/30 transition-all duration-500 group-hover/link:bg-mint" />
              <span className="absolute inset-x-4 bottom-2.5 h-px origin-left scale-x-0 bg-mint transition-transform duration-500 group-hover/link:scale-x-100" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: panelY }} className="flex justify-center [perspective:1100px] lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ delay: d + 0.3, duration: 1.1, ease: EASE }}
            className="w-full max-w-[460px]"
          >
            <TiltCard max={8}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: d + 1.4 }}>
                <SitePanel />
              </motion.div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
