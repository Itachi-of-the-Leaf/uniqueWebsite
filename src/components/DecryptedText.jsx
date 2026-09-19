import { useEffect, useState, useRef, useCallback } from 'react'

const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789₹#$*+&%@!'

export default function DecryptedText({
  text = '',
  speed = 65, // 65ms per character tick for mechanical, deliberate, readable feel
  duration = 700, // 700ms total resolution duration
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  animateOn = 'hover', // 'hover', 'mount'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : glyphs.split('')

  const scramble = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const originalText = text.split('')
    const totalTicks = Math.max(Math.round(duration / speed), 8) // ~10-11 deliberate ticks
    let currentTick = 0

    intervalRef.current = setInterval(() => {
      currentTick++
      const progress = currentTick / totalTicks
      const resolvedCharsCount = Math.floor(progress * originalText.length)

      setDisplayText(
        originalText
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < resolvedCharsCount) {
              return originalText[index]
            }
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ]
          })
          .join('')
      )

      if (currentTick >= totalTicks) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplayText(text)
      }
    }, speed)
  }, [text, duration, speed, availableChars])

  useEffect(() => {
    if (animateOn === 'mount') {
      scramble()
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [animateOn, scramble])

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      scramble()
    }
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-default font-mono ${parentClassName}`}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  )
}
