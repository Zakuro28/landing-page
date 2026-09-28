import { ChartLine, Lock, MailCheck, Palette, PencilLine, Search, Smartphone, Sparkle, Zap, type LucideIcon } from 'lucide-react'
import ScrollVelocity from '../components/reactbits/ScrollVelocity'

const included: { icon: LucideIcon; label: string }[] = [
  { icon: Smartphone, label: 'Mobile-first' },
  { icon: Zap, label: 'Fast loading' },
  { icon: Search, label: 'Ready for Google' },
  { icon: Palette, label: 'Custom design' },
  { icon: Lock, label: 'Secure HTTPS' },
  { icon: PencilLine, label: 'Easy to edit' },
  { icon: MailCheck, label: 'Working contact forms' },
  { icon: ChartLine, label: 'Visitor analytics' },
]

// What every site includes, drifting faster as you scroll.
export default function Included() {
  return (
    <section aria-label="Included with every website" className="relative border-b border-line bg-paper py-8 sm:py-10">
      <ul className="sr-only">
        {included.map((i) => (
          <li key={i.label}>{i.label}</li>
        ))}
      </ul>
      <ScrollVelocity baseVelocity={-1.6} className="[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {included.map(({ icon: Icon, label }) => (
          <span key={label} aria-hidden className="flex items-center gap-4 pr-10 sm:gap-5 sm:pr-14">
            <span className="grid size-11 place-items-center rounded-2xl bg-ink text-mint sm:size-14">
              <Icon className="size-5 sm:size-6" />
            </span>
            <span className="display text-[clamp(1.9rem,4.6vw,3.6rem)] font-bold text-ink">{label}</span>
            <Sparkle className="ml-6 size-5 fill-peach text-peach sm:ml-9" />
          </span>
        ))}
      </ScrollVelocity>
    </section>
  )
}
