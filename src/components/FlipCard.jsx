// FlipCard — controlled 3D-flip card using @use-gesture/react
// (already installed in this project) + GSAP for tweens. Replicates
// the API of the React Bits `flip-card` component using the project's
// existing stack so we don't pull in `react-spring` for one card.
//
// Props (subset relevant to this site; missing ones silently no-op):
//   front            — ReactNode (visible side)
//   back             — ReactNode (revealed side after flip)
//   axis             — 'x' | 'y' (default 'y'; rotation axis)
//   flipOnClick      — boolean (default true; click flips 180°)
//   draggable        — boolean (default false; horizontal drag flips
//                       past `dragDistance` pixels)
//   dragDistance     — px threshold for draggable flip (default 100)
//   tilt             — boolean (default true; pointer position tilts
//                       the card on hover, max `tiltMax` degrees)
//   tiltMax          — max tilt degrees (default 12)
//   glare            — boolean (default true; renders a soft radial
//                       highlight that follows the pointer)
//   glareOpacity     — 0..1 (default 0.22)
//   hoverScale       — scale on hover, 1.0 = none (default 1.03)
//   width            — card width in px (default 320)
//   height           — card height in px (default 400)
//   radius           — corner radius in px (default 22)
//   background       — front background color (default brand-navy
//                       token; pass any CSS color)
//   color            — front text color (default white)
//   shadow           — boolean (default true; drop shadow)
//   shadowColor      — CSS color (default '#000')
//   shadowOpacity    — 0..1 (default 0.45)
//   onFlipChange     — (flipped: boolean) => void
//
// Notes:
//   • Spring-physics stiffness/damping from the React Bits API are
//     documented but not implemented — GSAP handles the tween with
//     a 600ms ease so the felt animation is identical at this scale.
//   • When `axis='y'`, the back face is rotated -180° in CSS so it
//     reads correctly when the front rotates 0→180°.
//   • `pointer-events: none` on back-face prevents clicks landing
//     on the back when the front is showing.
import { useRef, useState, useEffect } from 'react'
import { useDrag, useHover, useGesture } from '@use-gesture/react'
import gsap from 'gsap'

export default function FlipCard({
  front,
  back,
  axis = 'y',
  flipOnClick = true,
  draggable = false,
  dragDistance = 100,
  tilt = true,
  tiltMax = 12,
  glare = true,
  glareOpacity = 0.22,
  hoverScale = 1.03,
  width = '100%',
  height = '100%',
  radius = 22,
  background = '#27272a',
  color = '#f5f5f5',
  shadow = true,
  shadowColor = '#000000',
  shadowOpacity = 0.45,
  onFlipChange,
}) {
  const cardRef = useRef(null)
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const glareRef = useRef(null)
  const [flipped, setFlipped] = useState(false)
  const hoverBind = useHover(
    ({ active, xy: [x, y], target }) => {
      const el = target
      if (!el || !cardRef.current) return
      if (!active || !tilt) {
        gsap.to(cardRef.current, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        if (glareRef.current) {
          gsap.to(glareRef.current, { opacity: 0, duration: 0.3 })
        }
        return
      }
      const rect = el.getBoundingClientRect()
      // Pointer position relative to the card center. Range -1..1
      // on each axis. We tilt away from the cursor so the card
      // appears to "follow" it — classic product-card feel.
      const px = (x - rect.left) / rect.width
      const py = (y - rect.top) / rect.height
      const rx = (py - 0.5) * -2 * tiltMax
      const ry = (px - 0.5) * 2 * tiltMax
      gsap.to(cardRef.current, {
        rotateX: axis === 'x' ? ry : rx,
        rotateY: axis === 'y' ? ry : 0,
        scale: hoverScale,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      if (glare && glareRef.current) {
        // Glare follows the pointer. CSS gradient stays put —
        // we move the gradient origin via background-position so
        // the rest of the styling (opacity, blend) lives in CSS.
        gsap.to(glareRef.current, {
          opacity: glareOpacity,
          duration: 0.3,
        })
        glareRef.current.style.background = `radial-gradient(circle at ${
          px * 100
        }% ${py * 100}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)`
      }
    }
  )

  // Direction-aware drag: the card rotates WITH the drag motion
  // (left drag → rotates left, right drag → rotates right),
  // anchored to the current flip state. Releasing past the
  // threshold flips; releasing before snaps back.
  //
  //   flipped = false  →  base = 0°
  //     drag right (mx > 0) → opens the back   (rotates 0 → 180)
  //     drag left  (mx < 0) → would unwind past 0 (rejected, clamped)
  //   flipped = true   →  base = 180°
  //     drag left  (mx < 0) → closes to front (rotates 180 → 0)
  //     drag right (mx > 0) → would over-rotate past 360 (rejected)
  //
  // On release, if `|mx|` exceeds `dragDistance` AND the drag
  // was opening the card, flip state. Otherwise snap back.
  const dragBind = useDrag(
    ({ down, movement: [mx] }) => {
      if (!draggable) return
      const card = cardRef.current
      if (!card) return

      const baseRotation = flipped ? 180 : 0
      const limit = Math.max(1, dragDistance)

      if (down) {
        // Live: rotate proportionally to drag distance, signed so
        // the card follows the finger. Clamp to one full turn so
        // the card never inverts through itself.
        const raw = baseRotation + (mx / limit) * 180
        const rotation = Math.max(-180, Math.min(360, raw))
        gsap.set(card, {
          rotateY: rotation,
          overwrite: 'auto',
        })
      } else {
        // Release: decide whether to flip or snap back.
        // The card opens when the user drags AWAY from the face
        // they want to reveal. Front face wants drag-right; back
        // face wants drag-left.
        const openingRight = !flipped && mx > 0
        const openingLeft = flipped && mx < 0
        const opened = openingRight || openingLeft
        const past = Math.abs(mx) >= limit
        const nextFlipped = opened && past ? !flipped : flipped
        const nextRotation = nextFlipped ? 180 : 0

        if (nextFlipped !== flipped) {
          setFlipped(nextFlipped)
        }
        gsap.to(card, {
          rotateY: nextRotation,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    },
    { axis: 'x' }
  )

  // Compose both: hover binds pointer events; drag binds pointer
  // drag. useGesture stitches them together so a single gesture
  // dispatches to both, but each manages its own concern.
  const bind = useGesture(
    {
      ...hoverBind(),
      ...dragBind(),
    }
  )

  // Bind the gesture to the card root.
  // (useGesture returns a stable function; we wire it via ref props.)
  const gestureProps = bind()

  // On programmatic flip state changes (via click handler), tween
  // to the target rotation.
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateY: flipped ? 180 : 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    })
    if (typeof onFlipChange === 'function') {
      onFlipChange(flipped)
    }
  }, [flipped, onFlipChange])

  // CSS vars injected inline so the caller can theme per-instance.
  const styleVars = {
    '--flipcard-width': `${width}px`,
    '--flipcard-height': `${height}px`,
    '--flipcard-radius': `${radius}px`,
    '--flipcard-bg': background,
    '--flipcard-color': color,
    '--flipcard-shadow-color': shadowColor,
    '--flipcard-shadow-opacity': shadowOpacity,
    '--flipcard-axis': axis === 'x' ? 'rotateX' : 'rotateY',
  }

  return (
    <div
      ref={cardRef}
      {...gestureProps}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? 'Tap to reveal front' : 'Tap to reveal details'}
      onClick={() => {
        if (flipOnClick) setFlipped((f) => !f)
      }}
      onKeyDown={(e) => {
        if (flipOnClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      className="relative cursor-pointer select-none will-change-transform"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        // If caller passed a number, use it; otherwise let the
        // grid cell drive the height. `min-h-0` lets a CSS grid
        // child actually shrink, otherwise it inflates past its
        // intended size when the parent has implicit row tracks.
        height: typeof height === 'number' ? `${height}px` : 'auto',
        minHeight: typeof height === 'number' ? `${height}px` : 0,
        borderRadius: `${radius}px`,
        transformStyle: 'preserve-3d',
        ...styleVars,
        boxShadow: shadow
          ? `0 20px 50px -10px ${shadowColor}${
              shadowOpacity < 1
                ? Math.round(shadowOpacity * 255)
                    .toString(16)
                    .padStart(2, '0')
                : ''
            }`
          : 'none',
      }}
    >
      {/* Inner grid: front + back stack in the same row/column so
          the cell height is driven by the front face's natural
          content height. This is the critical bit — using
          `position: absolute; inset: 0` for both faces collapses
          to 0px when the wrapper has no explicit height. */}
      <div className="grid h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
      {/* Front */}
      <div
        ref={frontRef}
        className="overflow-hidden"
        style={{
          gridArea: '1 / 1',
          borderRadius: `${radius}px`,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'var(--flipcard-bg)',
          color: 'var(--flipcard-color)',
          transform:
            axis === 'x' ? 'rotateX(0deg)' : 'rotateY(0deg)',
        }}
      >
        {front}
      </div>
      {/* Back — pre-rotated 180° on the opposite axis so it reads
          correctly when the parent rotates to 180°. */}
      <div
        ref={backRef}
        className="overflow-hidden"
        style={{
          gridArea: '1 / 1',
          borderRadius: `${radius}px`,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'var(--flipcard-bg)',
          color: 'var(--flipcard-color)',
          pointerEvents: flipped ? 'auto' : 'none',
          transform:
            axis === 'x'
              ? 'rotateX(180deg)'
              : 'rotateY(180deg)',
        }}
      >
        {back}
      </div>
      </div>
      {/* Glare overlay — sits above both faces, follows the pointer. */}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            borderRadius: `${radius}px`,
            opacity: 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      )}
    </div>
  )
}
