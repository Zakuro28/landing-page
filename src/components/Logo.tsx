import { NAME } from '../config'

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2fb5a0" />
          <stop offset=".55" stopColor="#1a6b48" />
          <stop offset="1" stopColor="#0b2a1e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#logo-g)" />
      <rect x=".75" y=".75" width="62.5" height="62.5" rx="17.25" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" />
      <path d="M20 20h22L20 44h18" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="logo-cursor" cx="45.5" cy="44" r="3.6" fill="#f0c36b" />
    </svg>
  )
}

export default function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5 font-semibold text-white">
      <LogoMark className="size-8 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
      {NAME}
    </a>
  )
}
