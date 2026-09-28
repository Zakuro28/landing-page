import { MousePointerClick, ShoppingBag, Store, Wrench, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import BlurText from '../components/reactbits/BlurText'
import { Reveal, Stagger, item } from '../components/motion'

type Service = {
  icon: LucideIcon
  title: string
  body: string
  deliverables: string[]
  wide?: boolean
  tint: string
  spot: string
}

const services: Service[] = [
  {
    icon: Store,
    title: 'Business websites',
    body: 'A complete site for your business: home, services, about and contact pages, written and designed so visitors know what you do within five seconds.',
    deliverables: ['Custom design', 'Up to 6 pages', 'Contact form', 'Google-ready setup'],
    wide: true,
    tint: 'from-peri/25 via-orchid/15 to-transparent',
    spot: 'rgba(46, 157, 104, 0.16)',
  },
  {
    icon: MousePointerClick,
    title: 'Landing pages',
    body: 'One focused page for a launch, an event or an ad campaign, built to get people to sign up or buy.',
    deliverables: ['One page', 'Sign-up or booking', 'Fast turnaround'],
    tint: 'from-mint/35 to-transparent',
    spot: 'rgba(155, 231, 196, 0.3)',
  },
  {
    icon: ShoppingBag,
    title: 'Online stores',
    body: 'Sell products or bookings online with secure checkout and an admin page to manage orders.',
    deliverables: ['Product pages', 'Checkout', 'Order management'],
    tint: 'from-peach/40 to-transparent',
    spot: 'rgba(240, 195, 107, 0.28)',
  },
  {
    icon: Wrench,
    title: 'Care and updates',
    body: 'After launch, I keep your site fast, secure and up to date. Send me a message when you need a change and it’s done.',
    deliverables: ['Monthly plan', 'Hosting and backups', 'Content changes'],
    wide: true,
    tint: 'from-orchid/25 via-peach/15 to-transparent',
    spot: 'rgba(47, 181, 160, 0.2)',
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <BlurText as="h2" text="Websites I build" className="display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold" />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              Every site is designed from scratch, works on phones first and is set up so customers can find you on Google.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-5">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.div key={s.title} variants={item} className={s.wide ? 'md:col-span-3' : 'md:col-span-2'}>
                <SpotlightCard
                  spotlight={s.spot}
                  className="group h-full rounded-[28px] border border-line bg-card p-7 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-peri/30 hover:shadow-[0_30px_60px_-30px_rgba(11,42,30,0.35)] sm:p-9"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-radial ${s.tint} blur-2xl transition-transform duration-700 group-hover:scale-150`}
                  />
                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl bg-ink text-white transition-all duration-500 group-hover:-rotate-8 group-hover:scale-110 group-hover:bg-peri">
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 max-w-[48ch] leading-relaxed text-muted">{s.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.deliverables.map((d, i) => (
                        <li
                          key={d}
                          style={{ transitionDelay: `${i * 40}ms` }}
                          className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink-soft transition-colors duration-300 group-hover:border-peri/25 group-hover:bg-white"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
