import Nav from './components/Nav'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Process from './sections/Process'
import Work from './sections/Work'
import Faq from './sections/Faq'
import Cta from './sections/Cta'

export default function App() {
  return (
    <div id="top">
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <Work />
        <Faq />
        <Cta />
      </main>
    </div>
  )
}
