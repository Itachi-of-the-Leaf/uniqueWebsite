// CatalogFlipCard — encapsulates the two-sided interactive card
// used by every entry in `HARDWARE_CATALOG`.
//
// Layout (per the directive's wide showcase refactor):
//   • Outer shell: explicit `h-[460px] md:h-[420px]` so the card
//     is locked at 420–460 px tall regardless of content size.
//     This eliminates the squished-ribbon failure mode where
//     `min-h` + absolute-positioned faces resolved to a
//     120 px strip when content didn't push the parent.
//   • Front face: 2-column responsive split with `items-center
//     justify-between` so the columns visually center on
//     desktop. Left ~55% holds the gold tag, large title,
//     and flip hint (stacked top + bottom with `justify-between`
//     for vertical breathing). Right ~45% holds a 300 px-tall
//     hardware frame on desktop (200 px on mobile). The
//     Interactive Panels card is rendered with an image-
//     dominant layout below (the Featured.png hero).
//   • Back face: same dimensions, sky-blue compliance eyebrow,
//     white institutional title, 2-col → 4-col spec grid
//     (`grid-cols-2 lg:grid-cols-4`), full-width crimson CTA
//     with `e.stopPropagation()` so it navigates instead of
//     flipping back.
//
// GPU stability: both faces use
// `[backface-visibility:hidden] [-webkit-backface-visibility:hidden]
// [transform:translateZ(0)] subpixel-antialiased` so the
// rotateY animation stays crisp.
import { useEffect, useRef, useState } from 'react'
import * as Icons from 'lucide-react'

// Two deployment-demonstration videos shown on the back of
// the Interactive Flat Panels card. IDs come from the watch URLs:
//   https://www.youtube.com/watch?v=wtBHIyOkSuQ
//   https://www.youtube.com/watch?v=XzfDhwStWVU
// The back face mounts ONE iframe at a time and swaps its src
// Inline Google "G" mark — 14px square, four-color slices.
// Kept inside the component module so each pill renders the
// authentic G without re-importing it per row.
function GoogleGIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M9.5 6.2c0-.2 0-.4-.1-.6H6v1.2h2c-.1.4-.4.7-.7.9v.7h1.1c.7-.6 1.1-1.5 1.1-2.2z" fill="#4285F4" />
      <path d="M6 9.5c.9 0 1.7-.3 2.2-.8L7.1 8c-.3.2-.7.3-1.1.3-.8 0-1.5-.5-1.8-1.3H3v.8c.5 1 1.6 1.7 3 1.7z" fill="#34A853" />
      <path d="M4.2 7c-.1-.2-.1-.5-.1-.7s0-.5.1-.7V4.8H3c-.3.5-.4 1.1-.4 1.7s.2 1.2.4 1.7l1.2-.2z" fill="#FBBC04" />
      <path d="M6 4.4c.5 0 1 .2 1.3.5l1-1C7.7 3.3 6.9 3 6 3c-1.4 0-2.5.7-3 1.7l1.2.8c.3-.7 1-1.1 1.8-1.1z" fill="#EA4335" />
    </svg>
  )
}

// BackFaceVideosPanel — generic side-by-side YouTube grid for
// any catalog item whose `back.videos` is a non-empty array.
// The data shape lives in `src/data/hardwareCatalog.js`:
//
//   videos: [{ label: 'Deployment', embedUrl: 'https://...'}, ...]
//
// The panel renders a 1-col → 2-col responsive grid (stacked on
// mobile, side-by-side on desktop). Each cell uses h-full +
// min-h-0 so the iframes fill their grid cell cleanly at 16:9
// — they always fit the box regardless of card width.
//
// Above the grid, the catalog-supplied `subtitle` (e.g.
// "Check the screen out in deployment" or "Check the
// projection rig in active deployment") anchors the two videos
// and explains what the user is about to watch. Per-cell
// labels sit above each iframe so each player is identifiable
// at a glance.
//
// Pulse-loader (`.yt-facade-play`) reuses the keyframe from
// `src/index.css` (same one Testimonials uses) — no new CSS
// required.
function VideoCell({ video }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef(null)
  // Reset loader visibility whenever the cell's video changes.
  // We use a ref to track the previous url so the synchronous
  // setState below doesn't fire on the initial mount (only on
  // real remounts). 150 ms upper-bound fallback — if onLoad is
  // delayed by network or already fired before this effect ran,
  // the fallback still hides the loader after a fixed upper
  // bound.
  const prevUrlRef = useRef(video.embedUrl)
  useEffect(() => {
    if (prevUrlRef.current === video.embedUrl) return
    prevUrlRef.current = video.embedUrl
    setIsLoaded(false)
    const fallback = setTimeout(() => setIsLoaded(true), 150)
    return () => clearTimeout(fallback)
  }, [video.embedUrl])

  return (
    <div className="relative w-full aspect-video h-full min-h-0 rounded-xl overflow-hidden bg-slate-950 ring-1 ring-white/10">
      <iframe
        ref={ref}
        src={video.embedUrl}
        title={video.label || 'YouTube video player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 w-full h-full rounded-lg border-0 block"
        onLoad={() => setIsLoaded(true)}
      />
      {/* Pulse-loader — `.yt-facade-play` class drives the gold
          pulse-ring keyframe already in `src/index.css`. Hides
          once `isLoaded` flips true; pointer-events disabled
          so the iframe underneath can still receive clicks. */}
      <div
        aria-hidden={isLoaded}
        aria-label="Loading video"
        className={`yt-facade absolute inset-0 flex items-center justify-center bg-slate-950/85 transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="yt-facade-play relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFD200]/15 ring-2 ring-[#FFD200]/60 flex items-center justify-center">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFD200]" />
        </div>
      </div>
    </div>
  )
}

function BackFaceVideosPanel({ videos, subtitle }) {
  return (
    <div
      className="flex flex-col gap-2 w-full h-full min-h-0"
      // Container click guard — clicking inside the panel
      // (iframes, labels, etc.) must NOT toggle the card flip.
      onClick={(e) => e.stopPropagation()}
    >
      {/* Caption — anchors the videos and explains what
          the user is looking at. Catalog-supplied so each
          card can have its own subtitle (e.g. "Check the
          screen out in deployment" vs "Check the projection
          rig in active deployment"). shrink-0 so it never
          gets squeezed. */}
      {subtitle && (
        <p className="text-[11px] sm:text-xs text-slate-400 leading-snug text-center shrink-0">
          {subtitle}
        </p>
      )}

      {/* Two-iframe grid — stacks on mobile, side-by-side on
          `sm:` and up. Each VideoCell manages its own
          pulse-loader state independently. flex-1 + min-h-0
          so the grid claims all remaining vertical space
          and the iframes fit cleanly without being cropped
          by the card edge. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-2 flex-1 min-h-0">
        {videos.map((video) => (
          <div key={video.embedUrl} className="flex flex-col gap-1.5 min-h-0">
            {/* Per-cell label — small uppercase tag above
                each player so they remain identifiable when
                both are visible at once. */}
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#FFD200]/80 shrink-0">
              {video.label}
            </span>
            <VideoCell video={video} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FeaturedGoldStarBorder ────────────────────────────────────
// Razor-thin gold perimeter beam + outer gold-glowy rim that
// travels around the border of a featured card. The 1.5px SVG
// <rect> stroke gives a clean continuous beam (no leaked halos);
// the outer glow shadow gives the card a soft golden aura so
// the two featured spotlight cards visibly pop off the page.
//
// Why SVG and not a rotating conic-gradient?
//   The previous conic implementation bled outside the card
//   bounds. transform-style:preserve-3d (needed for the flip)
//   overrides overflow:hidden on the parent, so any gradient
//   larger than the card leaked through the backface during
//   the 700ms rotateY transition. SVG geometry is not subject
//   to that override: the stroke draws strictly inside the
//   rect's geometry, period.
//
// Mounting:
//   The wrapper sits at z-20 with pointer-events-none so it
//   draws on top of any z-10 content children but never
//   intercepts the flip click. The face's own bg shows
//   through the wrapper (wrapper has no bg fill).
function FeaturedGoldStarBorder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-3xl pointer-events-none z-20 overflow-hidden"
    >
      {/* Outer gold glow halo — a soft drop-shadow ring
          visible just outside the card edge so the spotlight
          pair feels "lit up" against the dark gallery
          background. drop-shadow is opacity-driven (no
          blur), so it never violates the compositor-only
          animation rule. */}
      <div
        aria-hidden="true"
        className="absolute -inset-[2px] rounded-3xl"
        style={{
          boxShadow:
            '0 0 28px -2px rgba(255,210,0,0.55), 0 0 56px -6px rgba(255,210,0,0.35)',
        }}
      />

      {/* Static soft-gold base border — thicker than before
          (2px instead of 1px) so the spotlight cards read
          as "framed in gold" at a glance. Sits behind the
          traveling beam. Provides the "institutional gold
          trim" base layer. */}
      <div className="absolute inset-0 rounded-3xl border-2 border-[#FFD200]/45" />

      {/* Traveling gold perimeter beam — a stroked SVG
          rect with a short (140-unit) gold dash and a long
          (820-unit) gap. Animating stroke-dashoffset from
          0 → -960 over 9s linear makes the dash appear to
          walk smoothly around the perimeter. The rect is
          inset 1px from the wrapper (rx=24 matches the
          face's rounded-3xl = 24px) so the 1.5px stroke
          sits exactly at the face's outer edge. */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="24"
          ry="24"
          fill="none"
          stroke="url(#featured-gold-beam)"
          strokeWidth="1.5"
          strokeDasharray="140 820"
          strokeLinecap="round"
          className="animate-border-beam"
        />
        <defs>
          <linearGradient
            id="featured-gold-beam"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFD200" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFE566" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFD200" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function CatalogFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={
        isFlipped
          ? `${item.back.title} — tap to flip back`
          : `${item.front.title} — tap to reveal specifications`
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped((prev) => !prev)
        }
      }}
      className={`group relative w-full cursor-pointer [perspective:1400px] select-none rounded-3xl ${
        item.featured
          ? 'h-[510px] sm:h-[530px] lg:h-[480px]'
          : 'h-auto min-h-[560px] md:min-h-0 md:aspect-square'
      }`}
    >
      <div
        className={`relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        {/* Featured spotlight cards (imageDominant): two
            breakpoints — mobile vertical stack (<lg) with
            the StandardFlipCard anatomy, desktop horizontal
            split (lg+) with the existing tree-branch layout.
            Standard cards keep their existing horizontal
            layout unchanged. */}
        <div className={`absolute inset-0 w-full h-full rounded-3xl ${
          item.featured
            ? 'bg-[#06112E] border-transparent'
            : `bg-[#0B1B4F] border border-white/15 ${
                item.front.imageDominant
                  ? 'flex flex-col'
                  : 'flex flex-col md:flex-row items-center'
              } p-5 sm:p-6 md:p-8 justify-between gap-5 md:gap-8`
        } shadow-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased`}>

          {/* Featured-only: rotating gold rim glow. Mounted
              as the first child so the face's own bg paints
              over the inner mask; the 1.5px outer ring of
              the conic gradient is what leaks through the
              transparent border. pointer-events-none + z-0
              so it never intercepts the flip click. */}
          {item.featured && <FeaturedGoldStarBorder />}

          {/* ─── MOBILE (<lg): vertical card anatomy ─── */}
          {item.front.imageDominant && (
            <div className="flex lg:hidden flex-col h-full p-5 sm:p-6 relative z-10">
              {/* 1. Top Image Stage with Floating Overlaid Badge.
                  16:10 dark stage with a frosted glass pill
                  pinned to top-left. image fills via
                  object-cover so the full product photo is
                  visible without letterbox bars. */}
              <div className="relative w-full aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-slate-950 border border-white/10 shrink-0 shadow-inner flex items-center justify-center">
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/25 text-white shadow-lg">
                  <Icons.Sparkles className="w-3.5 h-3.5 text-[#FFD200] shrink-0" aria-hidden="true" />
                  <span className="text-[11px] font-bold tracking-wide text-white uppercase">
                    {item.front.tag || 'Featured'}
                  </span>
                </div>
                <img
                  src={item.front.image}
                  alt={item.front.title}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,' +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160"><rect width="240" height="160" fill="#0A1E5C"/><text x="120" y="86" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#FFD200" font-weight="bold">IMAGE PENDING</text></svg>'
                      )
                  }}
                />
              </div>

              {/* 2. Bold Title — tightly coupled to image + grid.
                  Tight rhythm (mt-3.5 mb-2.5) so image, title,
                  and badges form a cohesive unit. */}
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mt-3.5 mb-2.5 text-left">
                {item.front.title}
              </h3>

              {/* 3. Symmetrical 2x2 Badge Grid (first 4 only).
                  No my-auto — sits snug beneath the title so
                  the grid hugs the typography above. */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(item.front.badges || []).slice(0, 4).map((b, idx) => {
                  const IconComponent = b.customIcon === 'google-g'
                    ? GoogleGIcon
                    : (b.icon ? Icons[b.icon] : null) || Icons.CheckCircle2
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0a183d]/80 border border-white/20 shadow-sm"
                    >
                      {b.customIcon === 'google-g' ? (
                        <GoogleGIcon className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <IconComponent className="w-3.5 h-3.5 text-[#FFD200] shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-[11px] sm:text-xs font-bold text-white tracking-tight truncate">
                        {b.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* 4. Bottom Interaction Footer — mt-auto pushes
                  this to the bottom of the card. */}
              <div className="border-t border-white/15 pt-3 mt-auto flex items-center gap-2 text-xs font-medium text-slate-300">
                <Icons.Pointer className="w-3.5 h-3.5 text-slate-300 rotate-12 shrink-0" aria-hidden="true" />
                <span>{item.front.hint || 'Tap for specifications & compliance ↻'}</span>
              </div>
            </div>
          )}

          {/* ─── DESKTOP (≥lg): horizontal split ─── */}
          {item.front.imageDominant && (
            <div className="hidden lg:flex flex-row items-center justify-between h-full relative z-10">
              {/* Left Column (~46%) — tag + title + tree badges */}
              <div className="w-[46%] h-full p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#FFD200]/10 border border-[#FFD200]/40 text-[#FFD200] w-fit mb-3">
                    <Icons.Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{item.front.tag || 'Featured'}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {item.front.title}
                  </h3>
                  {/* Desktop tree-branch badges — vertical trunk
                      with gold dot origin + horizontal branch
                      ticks. Restores the existing lg+ treatment
                      that the mobile refactor temporarily
                      replaced. */}
                  <div className="relative mt-4 pl-4 border-l-2 border-slate-500/40 space-y-2.5">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFD200] ring-2 ring-[#06112E]"
                    />
                    {(item.front.badges || []).map((b, idx) => {
                      const IconComponent = b.customIcon === 'google-g'
                        ? GoogleGIcon
                        : (b.icon ? Icons[b.icon] : null) || Icons.CheckCircle2
                      return (
                        <div
                          key={idx}
                          className={`relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${b.gradient || 'from-sky-950/80 to-blue-900/60'} border ${b.borderColor || 'border-sky-400/50'} ${b.textColor || 'text-sky-200'} text-xs font-semibold shadow-sm w-fit`}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[14px] h-px bg-slate-500/40"
                          />
                          {b.customIcon === 'google-g' ? (
                            <GoogleGIcon className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <IconComponent className={`w-3.5 h-3.5 shrink-0 ${b.iconColor || ''}`} aria-hidden="true" />
                          )}
                          <span>{b.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="border-t border-white/15 pt-3 mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Icons.Pointer className="w-4 h-4 text-slate-300 rotate-12 shrink-0" aria-hidden="true" />
                  <span>{item.front.hint || 'Tap for specifications & compliance ↻'}</span>
                </div>
              </div>

              {/* Right Column (~54%) — full-height image stage */}
              <div className="w-[54%] h-full relative bg-slate-950/60 rounded-r-3xl border-l border-white/10 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={item.front.image}
                  alt={item.front.title}
                  className="w-full h-full max-h-[380px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] pointer-events-none group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,' +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160"><rect width="240" height="160" fill="#0A1E5C"/><text x="120" y="86" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#FFD200" font-weight="bold">IMAGE PENDING</text></svg>'
                      )
                  }}
                />
              </div>
            </div>
          )}

        </div>

        {/* ================= BACK FACE ================= */}
        <div className={`absolute inset-0 w-full h-full rounded-3xl bg-[#071233] ${item.featured ? 'border-transparent' : 'border border-white/20'} p-5 sm:p-6 lg:p-8 flex flex-col justify-between gap-3 md:gap-4 shadow-2xl overflow-y-auto lg:overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased`}>

          {/* Featured-only: same rotating gold rim on the
              back face so the card's institutional gold trim
              is visible on both sides when flipped. Same
              first-child / pointer-events-none / z-0
              contract as the front. */}
          {item.featured && <FeaturedGoldStarBorder />}


          {/* Top Bar — certification eyebrow + dismiss hint */}
          <div className="flex items-center justify-between shrink-0">
            {/* Translucent navy fill with sky-blue text —
                reads as an "official certification stamp"
                rather than a marketing tag. Restrained — no
                glow, small icon, tight tracking. */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase bg-sky-400/10 border border-sky-400/25 text-sky-300">
              <Icons.BadgeCheck className="h-3 w-3" aria-hidden="true" />
              <span>{item.back.eyebrow}</span>
            </span>
            <span className="text-xs font-semibold text-slate-400 hover:text-white">
              ✕ Return
            </span>
          </div>

          {/* Title — bold, not extrabold; tighter leading.
              shrink-0 so it never gets squeezed by the video
              grid below. */}
          <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight shrink-0">
            {item.back.title}
          </h4>

          {/* Back-face content branches by card identity:
              cards with a non-empty `back.videos` array render
              a side-by-side YouTube grid (each cell has its own
              pulse-loader + label); cards without it fall
              through to the 4-icon spec matrix. */}
          {Array.isArray(item.back.videos) && item.back.videos.length > 0 ? (
            <div id={`${item.id}-videos-panel`} className="flex-1 min-h-0">
              <BackFaceVideosPanel
                videos={item.back.videos}
                subtitle={item.back.subtitle}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-auto">
              {item.back.specs.map((spec, idx) => {
                const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
                // Cyclic 4-color accent palette: gold, sky,
                // emerald, amber. Mirrors the reference
                // video's icon coloring exactly.
                const accentByIndex = [
                  'text-[#FFD200]',   // 1st: brand gold
                  'text-sky-300',      // 2nd: sky blue
                  'text-emerald-300',  // 3rd: emerald green
                  'text-amber-300',    // 4th: amber
                ]
                const accent = accentByIndex[idx % accentByIndex.length]
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/10 p-3 lg:p-4 text-xs lg:text-sm text-slate-200"
                  >
                    <IconComponent className={`h-4 w-4 lg:h-5 lg:w-5 shrink-0 ${accent}`} />
                    <span className="font-medium leading-snug">{spec.label}</span>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
