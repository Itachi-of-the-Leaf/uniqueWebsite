import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Store coordinates in refs for 60fps RAF loop without re-renders
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    // Only enable on fine pointer devices (mouse/trackpad), disable on touchscreens
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (!isVisible) setIsVisible(true)

      // Direct placement for inner dot for immediate responsiveness
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Check if hovering over an interactive element
      const target = e.target
      const interactive = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('.group')
      )
      setIsHovered(Boolean(interactive))
    }

    const onMouseDown = () => setIsClicked(true)
    const onMouseUp = () => setIsClicked(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Butter-smooth trailing interpolation loop (Lerp)
    const render = () => {
      // Lerp factor ~0.18 gives a responsive yet smooth trailing feel
      const ease = 0.18
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isVisible])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Trailing Outer Circle */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 rounded-full pointer-events-none will-change-transform"
        style={{
          width: '32px',
          height: '32px',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), margin 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, background-color 0.2s ease',
          ...(isHovered
            ? {
                width: '52px',
                height: '52px',
                marginLeft: '-26px',
                marginTop: '-26px',
                border: '1.5px solid #FFD200',
                backgroundColor: 'rgba(230, 57, 86, 0.14)',
                boxShadow: '0 0 16px rgba(255, 210, 0, 0.3)',
              }
            : isClicked
            ? {
                width: '26px',
                height: '26px',
                marginLeft: '-13px',
                marginTop: '-13px',
                border: '2px solid #E63956',
                backgroundColor: 'rgba(230, 57, 86, 0.25)',
              }
            : {
                border: '1.5px solid #E63956',
                backgroundColor: 'transparent',
                boxShadow: '0 0 8px rgba(230, 57, 86, 0.25)',
              }),
        }}
      />

      {/* Immediate Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none will-change-transform"
        style={{
          backgroundColor: isHovered ? '#FFD200' : '#E63956',
          boxShadow: isHovered ? '0 0 6px #FFD200' : '0 0 4px #E63956',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
    </div>
  )
}
