import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote, MapPin, PlayCircle } from 'lucide-react'

/* ════════════════════════════════════════════════════════════════════════
   TESTIMONIALS — Scroll-driven story section
   ──────────────────────────────────────────────────────────────────────
   Mirrors TimelineSection's pin+scrub architecture: a 500vh tall
   section hosts a sticky 100vh stage. Four backdrop images and four
   narrative cards crossfade in lock-step with scroll progress.

   Stage 01 — Salvi Supriya (text)
   Stage 02 — Sagar Mudgal  (text)
   Stage 03 — Kids Celebrating  (YouTube J3EQ6acI7oU)
   Stage 04 — Happy Kids     (YouTube 3xy5Ti_cFRU)

   Each stage's card sits in the right half of the viewport (lg+); the
   backdrop image fills the full viewport with a dark navy veil so the
   glassmorphic card text is readable. On mobile the card fills the
   viewport — no desktop-only spacer.

   The "Posted on Google" badge is inline SVG; the YouTube embeds use
   native iframes with `loading="lazy"` (browser-managed caching) plus
   a click-to-play overlay that gates the iframe content until the user
   opts in. This matches the `lite-youtube-embed` pattern without
   pulling in another npm package.
   ════════════════════════════════════════════════════════════════════════ */

// Verified Google Maps URLs — the user provided these explicitly.
const SALVI_REVIEW_URL = 'https://maps.app.goo.gl/9pAsYP4XrssSQ9wA7'
const SAGAR_REVIEW_URL = 'https://maps.app.goo.gl/68He2Wpwfxzc81p99'
const HUB_REVIEW_URL = 'https://maps.app.goo.gl/wmjpm8W1p9Zxd1YR9'

const STAGES = [
  {
    id: 'salvi',
    backdrop: '/Rating1.png',
    eyebrowLabel: 'Verified Google Review',
    quote:
      'The digital learning equipments provided by UNIC System has significantly enriched our classroom experience. Your projectors deliver excellent clarity and reliability, making lessons more effective. The interactive panels are intuitive, engaging, and appreciated by both teachers and students…',
    attribution: {
      initials: 'SS',
      name: 'Salvi Supriya',
      role: 'School Principal',
      region: 'Konkan Region',
      tint: 'rgba(196,18,48,0.18)',
    },
    ctaLabel: 'Read full review on Google Maps',
    ctaHref: SALVI_REVIEW_URL,
    layout: 'text',
  },
  {
    id: 'sagar',
    backdrop: '/HappyFaculty1.jpeg',
    eyebrowLabel: 'Verified Google Review',
    quote:
      'I am extremely pleased with the e-learning software and hardware solutions provided by Mr. Saurabh Chitnis. The quality of their digital learning content is outstanding — well-structured, engaging, and perfectly aligned with school requirements…',
    attribution: {
      initials: 'SM',
      name: 'Sagar Mudgal',
      role: 'Programme Officer',
      region: 'Mahad Cluster',
      tint: 'rgba(16,59,155,0.16)',
    },
    ctaLabel: 'Read full review on Google Maps',
    ctaHref: SAGAR_REVIEW_URL,
    layout: 'text',
  },
  {
    id: 'kids-celebrating',
    backdrop: '/KidsCelebrating2.jpeg',
    eyebrowLabel: 'Classroom Footage',
    headline: 'See It In Action',
    description:
      'A celebration captured by a ZP school partner — students, teachers, and parents in one frame. The kind of moment our hardware is built to support every single day.',
    attribution: {
      initials: 'KR',
      name: 'Konkan Regional Hub',
      role: 'Field-Tested Deployment',
      region: 'Khed, Maharashtra',
      tint: 'rgba(255,210,0,0.22)',
    },
    ctaLabel: 'Visit our Google Maps pin',
    ctaHref: HUB_REVIEW_URL,
    layout: 'video',
    videoId: 'J3EQ6acI7oU',
    videoTitle: 'Unique Systems — Kids Celebrating at a ZP School',
  },
  {
    id: 'happy-kids',
    backdrop: '/HappyKids1.jpeg',
    eyebrowLabel: 'Classroom Footage',
    headline: 'Lessons In Progress',
    description:
      'Live footage from a rural Konkan classroom using our offline-first projectors and interactive panels — no buffering, no dropouts, zero mandatory subscriptions.',
    attribution: {
      initials: 'FC',
      name: 'Field-Recorded Footage',
      role: 'Zero-Bandwidth Deployment',
      region: 'Chiplun Taluka',
      tint: 'rgba(10,30,92,0.16)',
    },
    ctaLabel: 'Visit our Google Maps pin',
    ctaHref: HUB_REVIEW_URL,
    layout: 'video',
    videoId: '3xy5Ti_cFRU',
    videoTitle: 'Unique Systems — Lessons In Progress at a Rural School',
  },
]

/* ── Inline Google "G" logo SVG. Multicolor, no external image. ── */
function GoogleGIcon({ size = 18, className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M43.611 20.083H42V20H24v8h11.303C33.969 32.165 29.418 35 24 35c-6.075 0-11-4.925-11-11s4.925-11 11-11c2.803 0 5.357 1.05 7.31 2.77l5.657-5.657C33.046 6.053 28.708 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#34A853"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c2.803 0 5.357 1.05 7.31 2.77l5.657-5.657C33.046 6.053 28.708 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c4.642 0 8.85-1.789 12.025-4.711l-5.555-4.7C28.564 36.038 26.401 37 24 37c-5.392 0-9.93-3.806-11.288-8.879l-6.522 5.025C9.366 39.588 16.169 44 24 44z"
      />
      <path
        fill="#EA4335"
        d="M43.611 20.083H42V20H24v8h11.303a12.043 12.043 0 0 1-4.087 5.587l.001-.001 5.555 4.7C36.974 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

/* ── Click-to-play YouTube facade ──
   Mirrors the `lite-youtube-embed` pattern: show a styled poster
   (YouTube's own thumbnail) with a Play button. On click, swap the
   poster for a real iframe (which loads YouTube's iframe only on
   demand). No npm dependency, just a hidden iframe + DOM mutation.

   IMPORTANT: The iframe is rendered WITHOUT a `src` attribute.
   Browsers (Chrome, Safari, Firefox) all eagerly fetch + autoplay
   the iframe content as soon as an `src` is present in the DOM,
   even when the element is `display: none` or `visibility: hidden`.
   To prevent autoplay-on-load, we store the URL in `data-yt-src`
   and only assign it to `iframe.src` once the user clicks play. */
function YouTubeFacade({ videoId, title }) {
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  return (
    <div className="yt-facade group relative w-full overflow-hidden rounded-xl border border-white/15 bg-black/40 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="relative aspect-video w-full">
        <img
          src={thumb}
          alt=""
          loading="lazy"
          decoding="async"
          className="yt-facade-poster absolute inset-0 size-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="yt-facade-veil absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
        <div className="yt-facade-overlay absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="yt-facade-play flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD200] text-[#081438] shadow-[0_8px_30px_rgba(255,210,0,0.45)] transition-transform duration-200 group-hover:scale-110">
            <PlayCircle className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <p className="px-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/85">
            Click to play
          </p>
        </div>
        <p className="absolute bottom-3 left-3 right-3 line-clamp-2 text-xs font-medium text-white/95 sm:text-sm">
          {title}
        </p>
      </div>
      {/* Real iframe is rendered without a src — browser does NOT
          fetch the URL until we assign it. The URL lives in
          `data-yt-src` until the click handler activates it. */}
      <iframe
        title={title}
        data-yt-src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="yt-facade-iframe absolute inset-0 size-full hidden"
      />
    </div>
  )
}

/* ── Click-to-play wiring: a single document-level listener mounted
   once at module scope. On click inside any .yt-facade, take the
   URL from `data-yt-src`, assign it to `iframe.src` (so the browser
   fetches and starts playing), then swap poster for iframe. ── */
if (typeof document !== 'undefined' && !document.__ytFacadeWired) {
  document.__ytFacadeWired = true
  document.addEventListener('click', (e) => {
    const facade = e.target && e.target.closest && e.target.closest('.yt-facade')
    if (!facade) return
    const iframe = facade.querySelector('.yt-facade-iframe')
    if (!iframe || !iframe.classList.contains('hidden')) return
    // Assign src from data attribute — this is the moment the iframe
    // actually starts loading. Until this line runs, the browser has
    // no URL to fetch, so it does nothing.
    if (iframe.dataset.ytSrc && !iframe.src) {
      iframe.src = iframe.dataset.ytSrc
    }
    iframe.classList.remove('hidden')
    const poster = facade.querySelector('.yt-facade-poster')
    if (poster) poster.style.display = 'none'
    const veil = facade.querySelector('.yt-facade-veil')
    if (veil) veil.style.display = 'none'
    const overlay = facade.querySelector('.yt-facade-overlay')
    if (overlay) overlay.style.display = 'none'
  })
}

/* ── Five-star row (reused by every stage) ── */
function Stars() {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label="5 out of 5 stars"
      role="img"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className="h-4 w-4 text-[#FFD200]"
          fill="#FFD200"
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

/* ── Attribution block (initials avatar + name + role + region) ── */
function Attribution({ attr }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-extrabold tracking-wide text-[#081438]"
        style={{ background: attr.tint }}
        aria-hidden="true"
      >
        {attr.initials}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold text-white">{attr.name}</p>
        <p className="text-xs text-white/70">
          {attr.role}
          {attr.region && (
            <>
              <span className="mx-1.5 inline-block h-0.5 w-0.5 rounded-full bg-white/40 align-middle" />
              <span className="inline-flex items-center gap-1 align-middle">
                <MapPin className="h-3 w-3" strokeWidth={2.2} />
                {attr.region}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

/* ── Card body for text-review stages (1 & 2) ── */
function TextCard({ stage }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Stars />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-gold">
          {stage.eyebrowLabel}
        </span>
      </div>
      <Quote
        className="mt-4 h-7 w-7 text-brand-gold opacity-80"
        strokeWidth={2}
        aria-hidden="true"
      />
      <blockquote className="mt-2 text-base leading-relaxed text-white/95 sm:text-lg lg:text-xl">
        &ldquo;{stage.quote}&rdquo;
      </blockquote>
      <div className="mt-5 border-t border-white/15 pt-4">
        <Attribution attr={stage.attribution} />
        <a
          href={stage.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD200] hover:underline"
        >
          <GoogleGIcon size={14} />
          {stage.ctaLabel}
        </a>
      </div>
    </>
  )
}

/* ── Card body for video stages (3 & 4) ── */
function VideoCard({ stage }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Stars />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-gold">
          {stage.eyebrowLabel}
        </span>
      </div>
      <h3 className="mt-3 font-heading text-2xl leading-tight text-white sm:text-3xl">
        {stage.headline}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
        {stage.description}
      </p>
      <div className="mt-4">
        <YouTubeFacade videoId={stage.videoId} title={stage.videoTitle} />
      </div>
      <div className="mt-4 border-t border-white/15 pt-3">
        <Attribution attr={stage.attribution} />
        <a
          href={stage.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD200] hover:underline"
        >
          <GoogleGIcon size={14} />
          {stage.ctaLabel}
        </a>
      </div>
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const backdropRefs = useRef([])
  const cardRefs = useRef([])
  const dotRefs = useRef([])
  const progressRef = useRef(0)

  // Reset refs each render so we don't accumulate stale DOM nodes.
  backdropRefs.current = []
  cardRefs.current = []
  dotRefs.current = []

  useEffect(() => {
    if (!sectionRef.current || !stageRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      const buildScene = () => {
        const backdrops = backdropRefs.current.filter(Boolean)
        const cards = cardRefs.current.filter(Boolean)
        const dots = dotRefs.current.filter(Boolean)
        if (backdrops.length !== STAGES.length) return

        // Initial state: stage 1 visible, stages 2-4 hidden.
        gsap.set(backdrops[0], { opacity: 1, scale: 1 })
        for (let i = 1; i < backdrops.length; i++) {
          gsap.set(backdrops[i], { opacity: 0, scale: 1.04 })
        }
        gsap.set(cards[0], { opacity: 1, y: 0, pointerEvents: 'auto' })
        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], {
            opacity: 0,
            y: 24,
            pointerEvents: 'none',
          })
        }
        // All progress dots start dim except stage 1.
        dots.forEach((d, i) => {
          gsap.set(d, { opacity: i === 0 ? 1 : 0.35, scale: i === 0 ? 1.15 : 1 })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            // Start when the section's top edge reaches the viewport
            // top. End is decoupled from the section's own height —
            // it's a fixed `(STAGES.length + 0.8)` viewport-height
            // scroll distance, so the timeline has explicit "trailing
            // buffer" room for the final stage to dwell without
            // starvation. The trailing 0.8vh beyond the 4-stage scroll
            // mirrors the `h-[600vh]` (4 stages + 2 buffer eras)
            // wrapper.
            start: 'top top',
            end: () => '+=' + window.innerHeight * (STAGES.length + 0.8),
            scrub: true,
            pin: stageRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Hide the sticky nav while pinned — same pattern as
            // TimelineSection so the story takes the full viewport.
            onToggle: (self) => {
              window.dispatchEvent(
                new CustomEvent('pinned-section', {
                  detail: { pinned: self.isActive },
                }),
              )
            },
            onUpdate: (self) => {
              progressRef.current = self.progress
              if (typeof window !== 'undefined') {
                window.__testimonialsProgress = self.progress
              }
              // Drive the progress dots live — they read timeline
              // progress with explicit thresholds matching the slide
              // boundaries (0.20, 0.40, 0.60) so each dot lights up
              // in lockstep with its corresponding slide.
              //
              // Why explicit thresholds (not Math.floor(p * 4)):
              // Stage 4 occupies 40% of the timeline (0.60..1.00),
              // while Stages 1-3 each occupy 20%. A naive
              // `Math.floor(p * 4)` would put dot 4 at progress
              // 0.75..1.00 — which is 60% of timeline for a slide
              // that's only 40% wide. Explicit thresholds keep the
              // dot indicators 1:1 with their slides.
              const p = self.progress
              let active
              if (p < 0.20) active = 0
              else if (p < 0.40) active = 1
              else if (p < 0.60) active = 2
              else active = 3
              active = Math.min(STAGES.length - 1, active)
              for (let i = 0; i < STAGES.length; i++) {
                const d = dots[i]
                if (!d) continue
                if (i === active) {
                  gsap.set(d, { opacity: 1, scale: 1.25 })
                } else if (i < active) {
                  gsap.set(d, { opacity: 0.45, scale: 1 })
                } else {
                  gsap.set(d, { opacity: 0.25, scale: 1 })
                }
              }
            },
          },
        })

        // ── Phase definitions ───────────────────────────────────────
        // 4 stages distributed across 0..1 so the final stage gets
        // 24% of the timeline (the empty hold portion) to dwell in
        // full view. Mirrors TimelineSection's structure exactly:
        // each transition stage occupies 0.20 of progress, Stage 4
        // fade-in completes by 0.64, and the empty hold tween
        // below (0.76..1.00) carries the remaining scroll so the
        // pin never releases before the user finishes reading.
        //
        //   t=0.00..0.20: Stage 1 dwells (Salvi Supriya review)
        //   t=0.16..0.20: crossfade 1→2
        //   t=0.20..0.40: Stage 2 dwells (Sagar Mudgal review)
        //   t=0.36..0.40: crossfade 2→3
        //   t=0.40..0.60: Stage 3 dwells (Kids Celebrating video)
        //   t=0.56..0.60: crossfade 3→4
        //   t=0.60..0.76: Stage 4 fade-in tail
        //   t=0.76..1.00: empty hold tween — Stage 4 dwells fully
        const FADE = 0.04
        const PHASES = [
          { fadeInStart: 0.00, fadeInEnd: 0.00, fadeOutStart: 0.16, fadeOutEnd: 0.20 },
          { fadeInStart: 0.20, fadeInEnd: 0.24, fadeOutStart: 0.36, fadeOutEnd: 0.40 },
          { fadeInStart: 0.40, fadeInEnd: 0.44, fadeOutStart: 0.56, fadeOutEnd: 0.60 },
          { fadeInStart: 0.60, fadeInEnd: 0.64, fadeOutStart: null,  fadeOutEnd: null  },
        ]

        for (let i = 0; i < STAGES.length; i++) {
          const phase = PHASES[i]
          const backdrop = backdrops[i]
          const card = cards[i]

          // Skip stage 0's fade-in (it starts visible).
          if (i > 0) {
            tl.to(
              backdrop,
              { opacity: 1, scale: 1, ease: 'none', duration: FADE },
              phase.fadeInStart,
            )
            tl.to(
              card,
              { opacity: 1, y: 0, ease: 'none', duration: FADE },
              phase.fadeInStart,
            )
            tl.set(card, { pointerEvents: 'auto' }, phase.fadeInEnd)
          }
          if (phase.fadeOutStart !== null) {
            tl.to(
              backdrop,
              { opacity: 0, scale: 1, ease: 'none', duration: FADE },
              phase.fadeOutStart,
            )
            tl.to(
              card,
              { opacity: 0, y: -24, ease: 'none', duration: FADE },
              phase.fadeOutStart,
            )
            tl.set(card, { pointerEvents: 'none' }, phase.fadeOutEnd)
          }
        }

        // ── Final hold tween ─────────────────────────────────────────
        // Empty tween occupying the LAST 0.24 of timeline-time. Stage
        // 4 is already fully opaque from progress 0.64 onward — this
        // tween adds explicit "still ticking" pressure on the GSAP
        // scrubber so the pin never releases before the user's final
        // scroll stroke completes. Timeline duration = 1.00; Stage 4
        // dwells cleanly across progress 0.76..1.00.
        tl.to({}, { duration: 0.24 }, 0.76)
      }

      mm.add('(prefers-reduced-motion: no-preference)', buildScene)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const setBackdropRef = (el, i) => {
    backdropRefs.current[i] = el
  }
  const setCardRef = (el, i) => {
    cardRefs.current[i] = el
  }
  const setDotRef = (el, i) => {
    dotRefs.current[i] = el
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full h-[600vh] bg-brand-canvas"
      data-timeline-image
      aria-label="Verified Google Reviews & Classroom Testimonials"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ── Backdrop layers (stacked, crossfaded) ── */}
        <div className="absolute inset-0">
          {STAGES.map((stage, i) => (
            <div
              key={`backdrop-${stage.id}`}
              ref={(el) => setBackdropRef(el, i)}
              className="absolute inset-0 will-change-transform pointer-events-none"
              style={{
                opacity: i === 0 ? 1 : 0,
                transform: 'translate3d(0,0,0) scale(1.04)',
              }}
              aria-hidden="true"
            >
              <img
                src={stage.backdrop}
                alt=""
                className="absolute inset-0 size-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              {/* Dark navy veil so the white glassmorphic card is
                  readable over any backdrop. Opacity-only, no blur. */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/90 via-brand-midnight/55 to-brand-midnight/35" />
              {/* Subtle gold accent strip at the bottom — brand echo. */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD200]/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* ── Top-left eyebrow (always visible) ── */}
        <div className="pointer-events-none absolute left-6 top-6 z-20 lg:left-10 lg:top-10">
          <div className="flex items-center gap-2">
            <GoogleGIcon size={14} />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/85">
              Posted on Google · Teacher Voices
            </p>
          </div>
        </div>

        {/* ── Narrative Layer ── */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-5 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            {/* Desktop-only left spacer — mirrors TimelineSection so
                the card consistently sits in the right column on lg+.
                On mobile the card fills the viewport. */}
            <div
              className="hidden lg:block lg:col-span-7"
              aria-hidden="true"
            />
            <div className="lg:col-span-5">
              <div className="relative h-auto min-h-[30rem] sm:min-h-[34rem]">
                {STAGES.map((stage, i) => (
                  <article
                    key={`card-${stage.id}`}
                    ref={(el) => setCardRef(el, i)}
                    className="testimonials-card absolute inset-0 will-change-transform overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-7 lg:p-8"
                    style={{
                      opacity: 0,
                      transform: 'translate3d(0,24px,0)',
                    }}
                    aria-hidden={i !== 0}
                  >
                    {stage.layout === 'video' ? (
                      <VideoCard stage={stage} />
                    ) : (
                      <TextCard stage={stage} />
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Progress dots (bottom-center, always visible) ── */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 lg:bottom-8"
          aria-hidden="true"
        >
          {STAGES.map((stage, i) => (
            <span
              key={`dot-${stage.id}`}
              ref={(el) => setDotRef(el, i)}
              className="block h-1.5 rounded-full bg-[#FFD200] will-change-transform"
              style={{ width: '24px' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
