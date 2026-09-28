import { Code, Palette, Phone, Rocket } from 'lucide-react'

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
  return (
    <section id="process" className="scroll-mt-24 bg-ink px-4 py-24 text-white sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-[14ch] text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold">From first call to launch in about four weeks</h2>
          <p className="max-w-[40ch] text-white/65">
            That’s for a typical business site. A landing page can be live in about a week.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div aria-hidden className="absolute top-6 right-0 left-6 hidden h-px bg-gradient-to-r from-peri via-orchid to-peach md:block" />
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="relative flex gap-5 md:block">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-white/15 bg-ink-soft text-white">
                  <Icon className="size-5" aria-hidden />
                  <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-peach text-[11px] font-bold text-ink">
                    {i + 1}
                  </span>
                </span>
                <div className="md:mt-7">
                  <p className="text-sm text-mint">{s.time}</p>
                  <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-[34ch] leading-relaxed text-white/65">{s.body}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
