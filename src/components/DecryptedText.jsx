import { useEffect, useState, useRef } from 'react'

const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789₹#$*+&%@!'

export default function DecryptedText({
  text = '',
  speed = 35,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  animateOn = 'hover', // 'hover', 'view', 'mount'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : glyphs.split('')

  const scramble = () => {
    let iteration = 0
    const originalText = text.split('')
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        originalText
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return originalText[index]
            }
            return availableChars[Math.floor(Math.random() * availableChars.length)]
          })
          .join('')
      )

      if (iteration >= originalText.length) {
        clearInterval(interval)
        setDisplayText(text)
      }

      iteration += 1 / (maxIterations / originalText.length || 1)
    }, speed)

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (animateOn === 'mount') {
      scramble()
    }
  }, [text])

  const handleMouseEnter = () => {
    setIsHovering(true)
    if (animateOn === 'hover') {
      scramble()
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-default font-mono ${parentClassName}`}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  )
}
