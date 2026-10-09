import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Check, X } from 'lucide-react'
import BlurText from '../components/reactbits/BlurText'
import { EASE, Reveal } from '../components/motion'

const cases = [
  {
    title: 'What your customers notice',
    context: 'Look and feel',
    before: [
      'Template that looks like every other site',
      'Hard to read on a phone',
      'Visitors can’t tell what you offer',
    ],
    after: [
      'Design made for your brand',
      'Built for phones first',
      'What you do and how to contact you, up front',
    ],
  },
  {
    title: 'What happens behind the scenes',
    context: 'Speed and search',
    before: [
      'Slow pages that people leave',
      'Missing from Google results',
      'Enquiries lost in a broken form',
    ],
    after: [
      'Pages that load in about a second',
      'Search-ready titles, descriptions and sitemap',
      'Every enquiry lands in your inbox',
    ],
  },
]

function Comparison({ c }: { c: (typeof cases)[number] }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const strikeEnd = 0.35 + c.before.length * 0.22 // "after" starts once strikes finish

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="overflow-hidden rounded-[32px] border border-line bg-card"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 px-7 pt-7 sm:px-10 sm:pt-9">
        <h3 className="max-w-[26ch] text-2xl font-semibold tracking-tight sm:text-3xl">{c.title}</h3>
        <span className="rounded-full bg-paper px-3 py-1 text-sm text-muted">{c.context}</span>
      </header>

      <div className="mt-7 grid md:grid-cols-2">
        <div className="px-7 py-8 sm:px-10">
          <p className="font-semibold text-muted">Before</p>
          <ul className="mt-4 space-y-3">
            {c.before.map((b, i) => (
              <li key={b} className="flex gap-3 text-ink-soft">
                <motion.span
                  initial={{ rotate: -90, scale: 0 }}
                  animate={inView ? { rotate: 0, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.35 + i * 0.22 }}
                  className="mt-0.5 shrink-0"
                >
                  <X className="size-5 text-red-400/80" aria-hidden />
                </motion.span>
                <span className="relative">
                  <motion.span
                    animate={inView ? { opacity: 0.55 } : {}}
                    transition={{ delay: 0.5 + i * 0.22, duration: 0.3 }}
                  >
                    {b}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.22, duration: 0.35, ease: 'easeOut' }}
                    className="absolute top-1/2 left-0 h-[1.5px] w-full origin-left bg-muted/60"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ clipPath: 'inset(0 0 0 100%)' }}
          animate={inView ? { clipPath: 'inset(0 0 0 0%)' } : {}}
          transition={{ delay: strikeEnd, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="relative overflow-hidden bg-ink px-7 py-8 text-white sm:px-10"
        >
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full bg-radial from-orchid/50 via-peri/25 to-transparent blur-2xl"
          />
          <p className="relative flex items-center gap-1.5 font-semibold text-peach">
            After <ArrowDownRight className="size-4" aria-hidden />
          </p>
          <ul className="relative mt-4 space-y-3">
            {c.after.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: strikeEnd + 0.45 + i * 0.15, duration: 0.5, ease: EASE }}
                className="flex gap-3"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: [0, 1.35, 1] } : {}}
                  transition={{ delay: strikeEnd + 0.55 + i * 0.15, duration: 0.45 }}
                  className="mt-0.5 shrink-0"
                >
                  <Check className="size-5 text-mint" aria-hidden />
                </motion.span>
                {a}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <BlurText as="h2" text="Your old site vs. your new one" className="display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold" />
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">What changes for your customers, and for you, when you switch.</p>
        </Reveal>

        <div className="mt-14 space-y-6">
          {cases.map((c) => (
            <Comparison key={c.title} c={c} />
          ))}
        </div>

        {/* Latest personal build */}
        <Reveal delay={0.1}>
          <a
            href="https://github.com/Zakuro28/glyph"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-line bg-card px-7 py-6 transition-colors hover:border-ink/25 sm:px-10"
          >
            <span>
              <span className="text-sm font-semibold text-muted">Latest build</span>
              <span className="mt-1 block text-2xl font-semibold tracking-tight">Glyph</span>
              <span className="mt-1 block max-w-[52ch] text-ink-soft">Four daily word games with timers and a public leaderboard.</span>
            </span>
            <span className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
              View on GitHub <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
