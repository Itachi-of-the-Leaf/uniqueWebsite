import { useEffect, useState, useRef } from 'react'

const DEFAULT_GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789₹#$*+&%@!'.split('')

export default function DecryptedText({
  text = '',
  speed = 30, // 30ms per character tick
  duration = 300, // 300ms total resolution duration
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  animateOn = 'hover', // 'hover', 'mount'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef(null)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const isScramblingRef = useRef(false)
  const hasMountedRef = useRef(false)
  const textRef = useRef(text)
  textRef.current = text

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : DEFAULT_GLYPHS

  const stopScramble = (finalText) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    isScramblingRef.current = false
    setDisplayText(finalText || textRef.current)
  }

  const startScramble = () => {
    // If already scrambling, don't start duplicate intervals
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    // Clear any pending timers
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    const targetStr = textRef.current
    const originalText = targetStr.split('')
    // Fast 8-10 tick cycles settling around ~300ms
    const totalTicks = Math.min(Math.max(Math.round(duration / speed), 6), 10)
    let currentTick = 0

    // Safety watchdog timer: guarantees text unlocks to exact original string at 300ms
    timeoutRef.current = setTimeout(() => {
      stopScramble(targetStr)
    }, Math.max(duration, 300))

    intervalRef.current = setInterval(() => {
      currentTick++
      const progress = currentTick / totalTicks
      const resolvedCount = Math.floor(progress * originalText.length)

      setDisplayText(
        originalText
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < resolvedCount) {
              return originalText[index]
            }
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ]
          })
          .join('')
      )

      if (currentTick >= totalTicks) {
        stopScramble(targetStr)
      }
    }, speed)
  }

  // Handle mount and text change (only when text actually changes)
  useEffect(() => {
    stopScramble(text)
    if (animateOn === 'mount' && !hasMountedRef.current) {
      hasMountedRef.current = true
      startScramble()
    }
    return () => {
      stopScramble(text)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animateOn])

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      startScramble()
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
