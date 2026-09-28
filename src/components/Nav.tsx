import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CONTACT_HREF } from '../config'
import Logo from './Logo'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How it works' },
  { href: '#work', label: 'Why switch' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-5 transition-all duration-500 ${
          scrolled ? 'bg-ink/75 shadow-lg shadow-ink/20 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={CONTACT_HREF} className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform active:scale-95 sm:inline-flex">
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
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-6xl rounded-3xl bg-ink/90 p-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-white/85 hover:bg-white/10">
              {l.label}
            </a>
          ))}
          <a href={CONTACT_HREF} className="mt-2 block rounded-2xl bg-white px-4 py-3 text-center font-semibold text-ink">
            Book a call
          </a>
        </div>
      )}
    </header>
  )
}
