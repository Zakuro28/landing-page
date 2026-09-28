import { ArrowDownRight, Check, X } from 'lucide-react'

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

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold">Your old site vs. your new one</h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">What changes for your customers, and for you, when you switch.</p>

        <div className="mt-14 space-y-6">
          {cases.map((c) => (
            <article key={c.title} className="overflow-hidden rounded-[32px] border border-line bg-card">
              <header className="flex flex-wrap items-center justify-between gap-3 px-7 pt-7 sm:px-10 sm:pt-9">
                <h3 className="max-w-[26ch] text-2xl font-semibold tracking-tight sm:text-3xl">{c.title}</h3>
                <span className="rounded-full bg-paper px-3 py-1 text-sm text-muted">{c.context}</span>
              </header>

              <div className="mt-7 grid md:grid-cols-2">
                <div className="px-7 py-8 sm:px-10">
                  <p className="font-semibold text-muted">Before</p>
                  <ul className="mt-4 space-y-3">
                    {c.before.map((b) => (
                      <li key={b} className="flex gap-3 text-ink-soft">
                        <X className="mt-0.5 size-5 shrink-0 text-muted/60" aria-hidden />
                        <span className="line-through decoration-muted/40">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative overflow-hidden bg-ink px-7 py-8 text-white sm:px-10">
                  <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full bg-radial from-orchid/50 via-peri/25 to-transparent blur-2xl" />
                  <p className="relative flex items-center gap-1.5 font-semibold text-peach">
                    After <ArrowDownRight className="size-4" aria-hidden />
                  </p>
                  <ul className="relative mt-4 space-y-3">
                    {c.after.map((a) => (
                      <li key={a} className="flex gap-3">
                        <Check className="mt-0.5 size-5 shrink-0 text-mint" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
