// Adapted from React Bits "BlurText" (reactbits.dev, MIT)
import { Fragment } from 'react'
import { motion } from 'motion/react'
import { EASE } from '../motion'

type Props = {
  text: string // use "\n" to start a new line
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'p'
}

export default function BlurText({ text, className, delay = 0, stagger = 0.08, as = 'h1' }: Props) {
  const Tag = motion[as]
  const lines = text.split('\n').map((line) => line.trim().split(' '))
  let index = 0

  return (
    <Tag className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((words, l) => (
        <Fragment key={l}>
          {words.map((word, i) => {
            const n = index++
            return (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block will-change-[filter,transform]"
                initial={{ filter: 'blur(12px)', opacity: 0, y: 28 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, delay: delay + n * stagger, ease: EASE }}
              >
                {word}
                {i < words.length - 1 && ' '}
              </motion.span>
            )
          })}
          {l < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </Tag>
  )
}
