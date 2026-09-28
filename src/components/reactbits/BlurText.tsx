// Adapted from React Bits "BlurText" (reactbits.dev, MIT)
import { motion } from 'motion/react'
import { EASE } from '../motion'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'p'
}

export default function BlurText({ text, className, delay = 0, stagger = 0.08, as = 'h1' }: Props) {
  const Tag = motion[as]
  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-[filter,transform]"
          initial={{ filter: 'blur(12px)', opacity: 0, y: 28 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE }}
        >
          {word}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </Tag>
  )
}
