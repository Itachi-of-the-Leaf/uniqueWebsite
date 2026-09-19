import { useEffect, useRef, useState } from 'react'

/**
 * Context-Aware Custom Cursor:
 * - Default / Neutral Areas: Sleek 5px brand Navy/Gold dot with subtle trailing lag.
 * - Blackboard (Left Column): Soft chalk-tip dot (#FFFFFF with powdery yellow halo).
 * - Projector Screen (Right Column): Sharp classroom Red Laser Pointer dot (#EF4444 with optical bloom).
 * - Disables cleanly on touch devices (pointer: coarse).
 */
export default function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [cursorMode, setCursorMode] = useState('default') // 'default' | 'chalk' | 'laser'
  const [isInteractive, setIsInteractive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // 60fps GPU RAF coordinates
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse/trackpad), disable on touch/coarse devices
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (!isVisible) setIsVisible(true)

      // Immediate 1:1 hardware placement for leading core dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Context detection via DOM hierarchy
      const target = e.target
      if (target) {
        if (target.closest('.blackboard-panel')) {
          setCursorMode('chalk')
        } else if (
          target.closest('.cinema-light-leak') ||
          target.closest('[data-projector-screen]')
        ) {
          setCursorMode('laser')
        } else {
          setCursorMode('default')
        }

        const interactive = Boolean(
          target.closest('a') ||
            target.closest('button') ||
            target.closest('[role="button"]') ||
            target.closest('input') ||
            target.closest('textarea') ||
            target.closest('select')
        )
        setIsInteractive(interactive)
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Butter-smooth Lerp trailing loop
    const render = () => {
      const ease = 0.2
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
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isVisible])

  // Dynamic styling configurations per context mode
  let dotStyles = {}
  let ringStyles = {}

  if (cursorMode === 'chalk') {
    // Soft Chalk-Tip Dot (Blackboard Mode)
    dotStyles = {
      width: '7px',
      height: '7px',
      marginLeft: '-3.5px',
      marginTop: '-3.5px',
      backgroundColor: '#FFFFFF',
      boxShadow:
        '0 0 6px 1px rgba(255, 255, 255, 0.9), 0 0 14px 4px rgba(254, 240, 138, 0.35)',
    }
    ringStyles = {
      width: '18px',
      height: '18px',
      marginLeft: '-9px',
      marginTop: '-9px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(254, 240, 138, 0.3)',
      boxShadow: '0 0 8px rgba(254, 240, 138, 0.2)',
    }
  } else if (cursorMode === 'laser') {
    // Sharp Classroom Red Laser Pointer (Projector Mode)
    dotStyles = {
      width: '5px',
      height: '5px',
      marginLeft: '-2.5px',
      marginTop: '-2.5px',
      background: 'radial-gradient(circle, #FFFFFF 20%, #EF4444 80%)',
      boxShadow:
        '0 0 4px #EF4444, 0 0 8px #DC2626, 0 0 16px rgba(239, 68, 68, 0.65)',
    }
    ringStyles = {
      width: '14px',
      height: '14px',
      marginLeft: '-7px',
      marginTop: '-7px',
      backgroundColor: 'rgba(239, 68, 68, 0.12)',
      border: '1px solid rgba(239, 68, 68, 0.35)',
      boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
    }
  } else {
    // Default / Neutral Areas: Sleek 5px Brand Navy/Gold Dot
    dotStyles = {
      width: isInteractive ? '7px' : '5px',
      height: isInteractive ? '7px' : '5px',
      marginLeft: isInteractive ? '-3.5px' : '-2.5px',
      marginTop: isInteractive ? '-3.5px' : '-2.5px',
      backgroundColor: isInteractive ? '#FFD200' : '#103B9B',
      boxShadow: isInteractive
        ? '0 0 8px #FFD200'
        : '0 0 5px rgba(16, 59, 155, 0.5)',
    }
    ringStyles = {
      width: isInteractive ? '28px' : '16px',
      height: isInteractive ? '28px' : '16px',
      marginLeft: isInteractive ? '-14px' : '-8px',
      marginTop: isInteractive ? '-14px' : '-8px',
      backgroundColor: isInteractive
        ? 'rgba(255, 210, 0, 0.12)'
        : 'rgba(16, 59, 155, 0.08)',
      border: isInteractive
        ? '1.5px solid rgba(255, 210, 0, 0.6)'
        : '1px solid rgba(16, 59, 155, 0.25)',
    }
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Trailing Optical Aura / Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,margin,border-color,background-color,box-shadow] duration-200 ease-out"
        style={ringStyles}
      />

      {/* Immediate Sharp Leading Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,margin,background-color,box-shadow] duration-150 ease-out"
        style={dotStyles}
      />
    </div>
  )
}
