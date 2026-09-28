import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import BlurText from '../components/reactbits/BlurText'
import { EASE, Stagger, item } from '../components/motion'

const faqs = [
  {
    q: 'What do I need to have ready?',
    a: 'Nothing for the first call. Later, your logo, photos and a rough idea of what you want to say help. If you don’t have copy yet, I can help write it.',
  },
  {
    q: 'Can you redesign my current website?',
    a: 'Yes. I’ll keep what works, like your domain and any pages that already rank on Google, and rebuild the rest.',
  },
  {
    q: 'Will I be able to update it myself?',
    a: 'Yes. You’ll be able to change text, photos and prices without touching code, and I’ll show you how at launch.',
  },
  {
    q: 'Who owns the website?',
    a: 'You do. The domain, the design and the code are yours once the project is paid for.',
  },
]

function Question({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <motion.div variants={item} className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 rounded-xl py-6 text-left text-lg font-semibold transition-colors hover:text-peri"
        >
          {q}
          <motion.span
            animate={{ rotate: open ? 135 : 0, backgroundColor: open ? '#0b2a1e' : 'rgba(11,42,30,0)', color: open ? '#ffffff' : '#587062' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line"
          >
            <Plus className="size-4.5" aria-hidden />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -8, filter: 'blur(4px)' }}
              animate={{ y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="max-w-[60ch] pb-6 leading-relaxed text-muted"
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.6fr]">
        <BlurText as="h2" text="Questions people ask first" className="display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold" />
        <Stagger className="border-t border-line">
          {faqs.map((f, i) => (
            <Question key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
