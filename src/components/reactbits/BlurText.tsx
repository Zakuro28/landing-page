// Adapted from React Bits "BlurText" (reactbits.dev, MIT)
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'p'
}

export default function BlurText({ text, className, delay = 0, stagger = 0.08, as = 'h1' }: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-[filter,transform]"
          initial={reduce ? false : { filter: 'blur(12px)', opacity: 0, y: 24 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  )
}
