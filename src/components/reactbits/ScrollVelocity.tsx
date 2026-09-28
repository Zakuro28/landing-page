// Adapted from React Bits "ScrollVelocity" (reactbits.dev, MIT)
import { useRef, type ReactNode } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

export default function ScrollVelocity({ children, baseVelocity = -2, className = '' }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const direction = useRef(1)
  // Four copies; moving across one quarter loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
