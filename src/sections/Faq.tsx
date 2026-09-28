import { Plus } from 'lucide-react'

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

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.6fr]">
        <h2 className="display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold">Questions people ask first</h2>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="max-w-[60ch] pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
