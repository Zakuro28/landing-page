import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Code, Palette, Phone, Rocket } from 'lucide-react'
import BlurText from '../components/reactbits/BlurText'
import { EASE, Reveal } from '../components/motion'

const steps = [
  {
    icon: Phone,
    title: 'Free 20-minute call',
    body: 'Tell me about your business and what the site needs to do. You get a clear quote after the call.',
    time: 'Day 1',
  },
  {
    icon: Palette,
    title: 'Design',
    body: 'I design the key pages and share a clickable preview. You give feedback before any code is written.',
    time: 'Week 1',
  },
  {
    icon: Code,
    title: 'Build',
    body: 'I build the site and share a live preview link, so you can check it on your own phone as it comes together.',
    time: 'Weeks 2–3',
  },
  {
    icon: Rocket,
    title: 'Launch',
    body: 'Your site goes live on your domain. I show you how to edit it and stay on call for fixes.',
    time: 'Week 4',
  },
]

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const [reached, setReached] = useState(0)

  // A step lights up once the line gets to it
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setReached(Math.min(steps.length, Math.floor(v * (steps.length - 0.4)) + 1))
  })

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-radial from-peri/25 to-transparent blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <BlurText as="h2" text="From first call to launch in about four weeks" stagger={0.05} className="display max-w-[14ch] text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold" />
          <Reveal delay={0.3}>
            <p className="max-w-[40ch] text-white/65">That’s for a typical business site. A landing page can be live in about a week.</p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Track and the line that draws along it: across on desktop, down on mobile */}
          <div aria-hidden className="absolute top-6 right-0 left-6 hidden h-px bg-white/10 md:block" />
          <motion.div aria-hidden style={{ scaleX: progress }} className="absolute top-6 right-0 left-6 hidden h-0.5 origin-left bg-gradient-to-r from-peri via-orchid to-peach md:block" />
          <div aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-white/10 md:hidden" />
          <motion.div aria-hidden style={{ scaleY: progress }} className="absolute top-6 bottom-6 left-6 w-0.5 origin-top bg-gradient-to-b from-peri via-orchid to-peach md:hidden" />

          {steps.map((s, i) => {
            const Icon = s.icon
            const on = i < reached
            return (
              <motion.li
                key={s.title}
                className="relative flex gap-5 md:block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              >
                <span
                  className={`relative grid size-12 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    on ? 'border-mint/60 bg-peri text-white shadow-[0_0_0_6px_rgba(46,157,104,0.18),0_0_30px_rgba(155,231,196,0.35)]' : 'border-white/15 bg-ink-soft text-white/60'
                  }`}
                >
                  <Icon className="size-5" aria-hidden />
                  <motion.span
                    animate={on ? { scale: [0.4, 1.25, 1], opacity: 1 } : { scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-peach text-[11px] font-bold text-ink"
                  >
                    {i + 1}
                  </motion.span>
                </span>
                <div className={`transition-opacity duration-500 md:mt-7 ${on ? 'opacity-100' : 'opacity-55'}`}>
                  <p className="text-sm text-mint">{s.time}</p>
                  <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-[34ch] leading-relaxed text-white/65">{s.body}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
