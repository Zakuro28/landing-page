import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { CONTACT_HREF } from '../config'
import Logo from './Logo'
import { EASE, INTRO_DELAY } from './motion'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How it works' },
  { href: '#work', label: 'Why switch' },
  { href: '#contact', label: 'Contact' },
]

// Which section is in the middle of the screen
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 200 && setActive(null)
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])
  return active
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const active = useActiveSection()
  const { scrollY } = useScroll()

  // Tuck the bar away while reading down, bring it back on any upward scroll
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > prev && y > 500 && !open)
  })

  const pill = hovered ?? active

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: hidden ? 0 : INTRO_DELAY * 0.9 }}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500 ${
          scrolled || open ? 'bg-ink/80 shadow-lg shadow-ink/25 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <Logo />

        <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((l) => (
            <li key={l.href} className="relative">
              {pill === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/12"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <a
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                aria-current={active === l.href ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${active === l.href ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-mint" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={CONTACT_HREF} className="shine hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex">
            Book a call
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl bg-ink/90 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: EASE }}
                className="block rounded-2xl px-4 py-3 text-white/85 hover:bg-white/10"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={CONTACT_HREF}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.35, ease: EASE }}
              className="shine mt-2 block rounded-2xl bg-white px-4 py-3 text-center font-semibold text-ink"
            >
              Book a call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
