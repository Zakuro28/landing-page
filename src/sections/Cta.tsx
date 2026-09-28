import { useState, type ComponentType, type SVGProps } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, ArrowUpRight, CalendarCheck, Check, Copy, Mail, Phone } from 'lucide-react'
import Magnet from '../components/reactbits/Magnet'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../components/BrandIcons'
import { LogoMark } from '../components/Logo'
import { CONTACT_EMAIL, CONTACT_HREF, NAME, PHONE_DISPLAY, PHONE_HREF, SOCIALS } from '../config'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

type Channel = {
  label: string
  value: string
  href: string
  icon: Icon
  action: string
  copy?: string
  external?: boolean
  span: string
}

const channels: Channel[] = [
  { label: 'Email', value: CONTACT_EMAIL, href: CONTACT_HREF, icon: Mail, action: 'Send an email', copy: CONTACT_EMAIL, span: 'sm:col-span-3' },
  { label: 'Phone', value: PHONE_DISPLAY, href: PHONE_HREF, icon: Phone, action: 'Call now', copy: '+639203506666', span: 'sm:col-span-3' },
  { label: 'Facebook', value: 'whyzzky.engkoh', href: SOCIALS.facebook, icon: FacebookIcon, action: 'Message on Facebook', external: true, span: 'sm:col-span-2' },
  { label: 'LinkedIn', value: 'Zacc Bandahala', href: SOCIALS.linkedin, icon: LinkedinIcon, action: 'Connect on LinkedIn', external: true, span: 'sm:col-span-2' },
  { label: 'Instagram', value: '@zakuwrong', href: SOCIALS.instagram, icon: InstagramIcon, action: 'Follow on Instagram', external: true, span: 'sm:col-span-2' },
]

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked: the tile link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      className="relative z-10 flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 text-xs font-medium text-white/80 transition-colors hover:bg-white hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-1.5">
            <Check className="size-3.5" aria-hidden /> Copied
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex items-center gap-1.5">
            <Copy className="size-3.5" aria-hidden /> Copy
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{copied ? `${label} copied` : ''}</span>
    </button>
  )
}

function ChannelTile({ c }: { c: Channel }) {
  const Icon = c.icon
  return (
    <div
      className={`group relative flex items-center gap-4 rounded-3xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] sm:p-5 ${c.span}`}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-peach group-hover:text-ink">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-sm text-white/55">{c.label}</p>
        <a
          href={c.href}
          {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          aria-label={`${c.action}: ${c.value}`}
          className="block truncate font-semibold text-white after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {c.value}
        </a>
      </div>
      {c.copy ? (
        <CopyButton text={c.copy} label={c.label} />
      ) : (
        <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" aria-hidden />
      )}
    </div>
  )
}

const footerSocials = [
  { href: SOCIALS.facebook, label: 'Facebook', icon: FacebookIcon },
  { href: SOCIALS.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
  { href: SOCIALS.instagram, label: 'Instagram', icon: InstagramIcon },
]

export default function Cta() {
  return (
    <section id="contact" className="scroll-mt-4 px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="relative isolate overflow-hidden rounded-[36px] text-white">
        <div className="aura" aria-hidden>
          <div className="aura__blob aura__blob--a" />
          <div className="aura__blob aura__blob--b" />
          <div className="aura__blob aura__blob--d" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-32">
          <LogoMark className="mx-auto size-14" />
          <h2 className="display mx-auto mt-8 max-w-[13ch] text-[clamp(2.8rem,7vw,5.6rem)] font-bold">Let’s build your website</h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-lg text-white/75">
            Tell me about your business on a free 20-minute call. You’ll get a clear quote and timeline afterwards.
          </p>
          <div className="mt-10 flex justify-center">
            <Magnet>
              <a
                href={CONTACT_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink shadow-[0_10px_50px_-10px_rgba(240,195,107,0.7)] transition-transform active:scale-95"
              >
                <CalendarCheck className="size-5" aria-hidden />
                Start your website
              </a>
            </Magnet>
          </div>

          <p className="mt-16 text-white/60">Or reach me directly</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-6">
            {channels.map((c) => (
              <ChannelTile key={c.label} c={c} />
            ))}
          </div>
        </div>

        <footer className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-sm text-white/55 sm:flex-row sm:px-10">
          <span>© {new Date().getFullYear()} {NAME} · Web developer</span>
          <div className="flex items-center gap-2">
            {footerSocials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${NAME} on ${s.label}`}
                  className="grid size-10 place-items-center rounded-full text-white/70 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink"
                >
                  <Icon className="size-4.5" />
                </a>
              )
            })}
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-2 grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink"
            >
              <ArrowUp className="size-4.5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
