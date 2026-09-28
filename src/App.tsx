import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Intro from './components/Intro'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Included from './sections/Included'
import Services from './sections/Services'
import Process from './sections/Process'
import Work from './sections/Work'
import Faq from './sections/Faq'
import Cta from './sections/Cta'

export default function App() {
  // Inertia scrolling; anchor links glide and land below the fixed nav.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -90 }, lerp: 0.09 })
    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Intro />
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <Included />
          <Services />
          <Process />
          <Work />
          <Faq />
          <Cta />
        </main>
      </div>
    </MotionConfig>
  )
}
