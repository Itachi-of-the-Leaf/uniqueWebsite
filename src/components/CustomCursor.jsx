import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Context-Aware Custom Cursor:
 * - Default / Neutral Areas: Sleek 5px brand Navy/Gold dot with subtle trailing lag.
 * - Timeline Image Section (Era 01..05): Crisp white dot — reads cleanly against
 *   the dark classroom photographs without competing with the gold/cobalt palette.
 * - Blackboard (Left Column): Soft chalk-tip dot (#FFFFFF with powdery yellow halo).
 * - Projector Screen (Right Column): Sharp classroom Red Laser Pointer dot (#EF4444 with optical bloom).
 * - Active scrolling: Two gold chevrons ("▲" above, "▼" below) appear flanking
 *   the dot and stream in the direction of scroll (up or down). They fade out
 *   when the scroll wheel stops. Stamped-metal brand feel — rust/gold tones with
 *   a subtle navy drop-shadow so they read against any backdrop.
 * - Click spark: brand-palette particle burst (gold + cobalt + crimson) on mousedown.
 * - Disables cleanly on touch devices (pointer: coarse).
 */

// Brand-palette sparks drawn from the logo + EST pill colors.
const SPARK_COLORS = ['#FFD200', '#103B9B', '#C41230', '#FFB300']
const SPARK_COUNT = 12

export default function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const chevronGroupRef = useRef(null)
  const chevronUpRef = useRef(null)
  const chevronDownRef = useRef(null)
  const [cursorMode, setCursorMode] = useState('default') // 'default' | 'timeline-image' | 'chalk' | 'laser'
  const [isInteractive, setIsInteractive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Click spark layer — appended to body on demand. Each spark is an absolutely-
  // positioned dot animated by GSAP; we recreate them on every click for zero state.
  const sparkLayerRef = useRef(null)

  // 60fps GPU RAF coordinates
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  // Scroll-velocity tracking. `scrollDir` is -1 (up), 0 (idle), +1 (down).
  // `scrollEnergy` is 0..1 magnitude, decays toward 0 over SCROLL_DECAY_MS of
  // no wheel events. Chevron visibility is driven by `scrollDir * scrollEnergy`.
  const scrollDir = useRef(0)
  const scrollEnergy = useRef(0)
  const lastWheelTs = useRef(0)
  const SCROLL_DECAY_MS = 220 // ms without wheel before chevrons fully fade

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse/trackpad), disable on touch/coarse devices
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }

    // Append the spark layer once. It stays mounted for the cursor lifetime.
    const layer = document.createElement('div')
    layer.className = 'pointer-events-none fixed inset-0 z-[60] overflow-hidden'
    layer.setAttribute('aria-hidden', 'true')
    document.body.appendChild(layer)
    sparkLayerRef.current = layer

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
        if (target.closest('[data-timeline-image]')) {
          // Timeline section (Era 01..05). White crosshair reads cleanly on
          // the dark classroom photos without competing with the gold accents.
          setCursorMode('timeline-image')
        } else if (target.closest('.blackboard-panel')) {
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

    const onMouseDown = (e) => {
      const layer = sparkLayerRef.current
      if (!layer) return
      const cx = e.clientX
      const cy = e.clientY

      // Spawn SPARK_COUNT particles in a fan around the click point.
      for (let i = 0; i < SPARK_COUNT; i++) {
        const angle = (i / SPARK_COUNT) * Math.PI * 2 + Math.random() * 0.4
        const distance = 24 + Math.random() * 26 // 24-50px radial travel
        const dx = Math.cos(angle) * distance
        const dy = Math.sin(angle) * distance
        const color = SPARK_COLORS[i % SPARK_COLORS.length]
        const size = 3 + Math.random() * 3 // 3-6px

        const spark = document.createElement('span')
        spark.style.cssText = `
          position: absolute;
          left: ${cx}px;
          top: ${cy}px;
          width: ${size}px;
          height: ${size}px;
          margin-left: -${size / 2}px;
          margin-top: -${size / 2}px;
          border-radius: 9999px;
          background-color: ${color};
          box-shadow: 0 0 6px ${color};
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          opacity: 1;
        `
        layer.appendChild(spark)

        // Animate outward + fade out, then remove. Compositor-only (transform + opacity).
        gsap.to(spark, {
          x: dx,
          y: dy,
          opacity: 0,
          scale: 0.4,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            if (spark.parentNode) spark.parentNode.removeChild(spark)
          },
        })
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Wheel listener — drives chevron visibility.
    // Uses deltaY > 0 = scroll down (deltaY is positive in screen coords),
    // deltaY < 0 = scroll up. We don't preventDefault — this is purely visual.
    const onWheel = (e) => {
      if (e.deltaY > 0) scrollDir.current = 1
      else if (e.deltaY < 0) scrollDir.current = -1
      // Energy bumps to 1 instantly on any wheel event, then decays in the RAF loop.
      scrollEnergy.current = 1
      lastWheelTs.current = performance.now()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('wheel', onWheel, { passive: true })
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

      // Chevron group tracks the leading dot (immediate cursor position, no lerp).
      if (chevronGroupRef.current) {
        chevronGroupRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }

      // ─── Chevron visibility ──────────────────────────────────────────────
      // Decay scrollEnergy toward 0 based on time since last wheel event.
      const now = performance.now()
      const sinceWheel = now - lastWheelTs.current
      if (sinceWheel > 0) {
        const decay = Math.max(0, 1 - sinceWheel / SCROLL_DECAY_MS)
        // Smooth ease-out so the chevrons fade softly rather than pop.
        scrollEnergy.current = Math.min(scrollEnergy.current, decay)
        if (decay === 0) scrollDir.current = 0
      }

      // Drive chevron opacity + transform directly via refs (no React state).
      // Up chevron visible when scrolling UP (scrollDir < 0); down chevron when DOWN.
      if (chevronUpRef.current) {
        const upEnergy = scrollDir.current < 0 ? scrollEnergy.current : 0
        chevronUpRef.current.style.opacity = String(upEnergy)
        // Vertical stream: translateY oscillates to give motion to the chevron.
        const t = now * 0.004
        const streamOffset = -3 + 6 * (Math.sin(t) * 0.5 + 0.5) // 0..-6 range, smooth
        chevronUpRef.current.style.transform = `translate3d(0, ${streamOffset}px, 0) scale(${0.7 + 0.3 * upEnergy})`
      }
      if (chevronDownRef.current) {
        const downEnergy = scrollDir.current > 0 ? scrollEnergy.current : 0
        chevronDownRef.current.style.opacity = String(downEnergy)
        const t = now * 0.004
        const streamOffset = -3 + 6 * (Math.cos(t) * 0.5 + 0.5)
        chevronDownRef.current.style.transform = `translate3d(0, ${streamOffset}px, 0) scale(${0.7 + 0.3 * downEnergy})`
      }

      rafId.current = requestAnimationFrame(render)
    }

    rafId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('wheel', onWheel)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (layer.parentNode) layer.parentNode.removeChild(layer)
      sparkLayerRef.current = null
    }
  }, [isVisible])

  // Dynamic styling configurations per context mode (compositor-safe, no width/height/margin transitions)
  let dotBg = '#103B9B'
  let dotBoxShadow = '0 0 5px rgba(16, 59, 155, 0.5)'
  let ringBg = 'rgba(16, 59, 155, 0.08)'
  let ringBorder = '1px solid rgba(16, 59, 155, 0.25)'
  let ringBoxShadow = 'none'

  if (cursorMode === 'timeline-image') {
    // Pure white crosshair for the timeline section. Crisp on dark photos,
    // neutral against gold accents. No halo so it doesn't fight the palette.
    dotBg = '#FFFFFF'
    dotBoxShadow = '0 0 6px 1px rgba(255, 255, 255, 0.9)'
    ringBg = 'rgba(255, 255, 255, 0.08)'
    ringBorder = '1px solid rgba(255, 255, 255, 0.45)'
    ringBoxShadow = '0 0 6px rgba(255, 255, 255, 0.25)'
  } else if (cursorMode === 'chalk') {
    dotBg = '#FFFFFF'
    dotBoxShadow = '0 0 6px 1px rgba(255, 255, 255, 0.9), 0 0 12px 3px rgba(254, 240, 138, 0.35)'
    ringBg = 'rgba(255, 255, 255, 0.1)'
    ringBorder = '1px solid rgba(254, 240, 138, 0.4)'
    ringBoxShadow = '0 0 8px rgba(254, 240, 138, 0.2)'
  } else if (cursorMode === 'laser') {
    dotBg = '#EF4444'
    dotBoxShadow = '0 0 4px #EF4444, 0 0 8px #DC2626'
    ringBg = 'rgba(239, 68, 68, 0.12)'
    ringBorder = '1px solid rgba(239, 68, 68, 0.45)'
    ringBoxShadow = '0 0 8px rgba(239, 68, 68, 0.3)'
  } else if (isInteractive) {
    dotBg = '#FFD200'
    dotBoxShadow = '0 0 8px #FFD200'
    ringBg = 'rgba(255, 210, 0, 0.12)'
    ringBorder = '1.5px solid rgba(255, 210, 0, 0.6)'
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
        className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full pointer-events-none will-change-transform transition-[background-color,border-color,box-shadow] duration-200 ease-out"
        style={{
          backgroundColor: ringBg,
          border: ringBorder,
          boxShadow: ringBoxShadow,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Immediate Sharp Leading Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none will-change-transform transition-[background-color,box-shadow] duration-150 ease-out"
        style={{
          backgroundColor: dotBg,
          boxShadow: dotBoxShadow,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Scroll-direction chevron group — follows the leading dot exactly.
          Children sit at offset positions around the dot. Opacity & stream
          offsets are written directly via refs in the RAF loop. */}
      <div
        ref={chevronGroupRef}
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none will-change-transform"
        style={{
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Up chevron — appears when scrolling up. Gold, with navy drop shadow. */}
        <svg
          ref={chevronUpRef}
          width="14"
          height="8"
          viewBox="0 0 14 8"
          className="absolute"
          style={{
            left: '-7px',
            top: '-18px',
            opacity: 0,
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0) scale(1)',
            filter: 'drop-shadow(0 1px 0 rgba(8, 20, 56, 0.85)) drop-shadow(0 0 4px rgba(255, 210, 0, 0.45))',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <path
            d="M1 7 L7 1 L13 7"
            fill="none"
            stroke="#FFD200"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Down chevron — appears when scrolling down. Same styling. */}
        <svg
          ref={chevronDownRef}
          width="14"
          height="8"
          viewBox="0 0 14 8"
          className="absolute"
          style={{
            left: '-7px',
            top: '10px',
            opacity: 0,
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0) scale(1)',
            filter: 'drop-shadow(0 1px 0 rgba(8, 20, 56, 0.85)) drop-shadow(0 0 4px rgba(255, 210, 0, 0.45))',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <path
            d="M1 1 L7 7 L13 1"
            fill="none"
            stroke="#FFD200"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
