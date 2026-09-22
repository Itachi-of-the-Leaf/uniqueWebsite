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
    <div className="relative w-full h-full min-h-0 rounded-lg overflow-hidden bg-slate-950 ring-1 ring-white/10">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
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
// Razor-thin gold perimeter beam that travels around the
// border of a featured card. Uses an SVG <rect> with a 1.5px
// dashed stroke + CSS stroke-dashoffset animation, so the
// visible glow is strictly confined to the stroke width — no
// oversized conic gradients, no leaked halos, no blur
// filters.
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
      {/* Static soft-gold base border — always visible,
          sits behind the traveling beam. Provides the
          "institutional gold trim" base layer. */}
      <div className="absolute inset-0 rounded-3xl border border-[#FFD200]/25" />

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
      className={`group relative w-full h-[520px] md:h-[560px] cursor-pointer [perspective:1400px] select-none rounded-3xl`}
    >
      <div
        className={`relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className={`absolute inset-0 w-full h-full rounded-3xl bg-[#0B1B4F] ${item.featured ? 'border-transparent' : 'border border-white/15'} p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased`}>

          {/* Featured-only: rotating gold rim glow. Mounted
              as the first child so the face's own bg paints
              over the inner mask; the 1.5px outer ring of
              the conic gradient is what leaks through the
              transparent border. pointer-events-none + z-0
              so it never intercepts the flip click. */}
          {item.featured && <FeaturedGoldStarBorder />}


          {/* Left Column: Identity & Typography (~32% width on
              Interactive Panels; ~55% on the rest of the
              featured cards). The Interactive Panels card is
              rendered with an image-dominant layout below. */}
          <div
            className={`flex flex-col justify-between h-full w-full z-10 ${
              item.front.badges ? 'md:w-[38%]' : 'md:w-[55%]'
            }`}
          >
            <div>
              {/* Featured-tier front tag (used when
                  item.featured === true, i.e. the Interactive
                  Panels + Projectors spotlight cards):
                  restrained gold pill, no glow shadow, tight
                  tracking. Restrained = professional. */}
              {item.featured ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase bg-[#FFD200]/10 border border-[#FFD200]/25 text-[#FFD200]">
                  <Icons.Sparkles className="h-3 w-3" aria-hidden="true" />
                  <span>{item.front.tag}</span>
                </span>
              ) : (
                /* Standard-tier front tag: muted slate-blue
                   tint, smaller, no glow. Reads as a category
                   label rather than a spotlight callout. */
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase bg-white/[0.06] border border-white/15 text-slate-300">
                  <Icons.Tag className="h-3 w-3" aria-hidden="true" />
                  <span>{item.front.tag}</span>
                </span>
              )}

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-3 leading-tight">
                {item.front.title}
              </h3>

              {/* Feature pill tree — substantial gradient-tinted
                  badges arranged down a vertical trunk. Each
                  card opts in via `front.badges` on its catalog
                  entry. Per the brief:
                    • px-4 py-2 / text-sm font-semibold padding
                    • Icon integrated INTO the pill (not detached)
                    • Trunk = border-l-2 on the container
                    • space-y-3 even vertical rhythm
                  The container also acts as the flex child that
                  fills the left column's middle band, so the
                  FEATURED tag + title sit at the top and the
                  "Tap for info" divider sits at the bottom —
                  no dead voids. Hidden on mobile because the
                  slim rail is too narrow there. */}
              {Array.isArray(item.front.badges) && item.front.badges.length > 0 && (
                <ul
                  className="mt-4 hidden md:block relative pl-4 border-l-2 border-white/20 space-y-3"
                  role="list"
                >
                  {/* Title-node — small gold dot at the trunk's
                      origin where it meets the title, sitting
                      on the left border so the trunk "starts"
                      from the dot. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFD200] ring-2 ring-[#0B1B4F]"
                  />

                  {item.front.badges.map((badge) => {
                    const Icon = badge.icon ? Icons[badge.icon] : null
                    return (
                      <li
                        key={badge.label}
                        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide border bg-gradient-to-r ${badge.gradient} ${badge.borderColor} ${badge.textColor} shadow-[0_0_18px_-8px_rgba(0,0,0,0.6)]`}
                      >
                        {/* Small branch tick — sits on the
                            trunk's right edge, vertically
                            centered against the pill, so each
                            pill reads as a node on the tree. */}
                        <span
                          aria-hidden="true"
                          className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-[14px] h-px bg-white/20"
                        />
                        {/* Icon — INTEGRATED inside the pill
                            (not a detached bubble). Lucide for
                            the standard rows; the Google G is
                            the inline SVG. */}
                        {badge.customIcon === 'google-g' ? (
                          <GoogleGIcon className="w-4 h-4 shrink-0" />
                        ) : Icon ? (
                          <Icon
                            className={`w-4 h-4 shrink-0 ${badge.iconColor}`}
                            aria-hidden="true"
                          />
                        ) : null}
                        <span>{badge.label}</span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Hint — bottom divider line + hand-pointer icon
                + small "Tap for info" text. Renders on ALL
                cards; on Interactive Panels this replaces the
                floating pill that previously sat in the right
                column, and on other cards it preserves the
                existing treatment. */}
            <div className="pt-3 border-t border-white/10 mt-auto">
              <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <Icons.Hand
                  className="h-3.5 w-3.5 text-[#FFD200]"
                  aria-hidden="true"
                />
                <span>{item.front.hint || 'Tap for info'}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Hardware Showcase. For the Interactive
              Panels card, this is a fully-constructed DOM
              replica of the Featured.png reference — built as
              real HTML/Tailwind elements rather than a bitmap,
              so the panel chrome, screen content, and bottom
              info strip stay accessible, themable, and
              localizable. SmartPanel3.jpeg is the on-screen
              artwork inside the bezel. For other featured
              cards the existing 300 px-tall image frame is
              preserved. */}
          {item.front.imageDominant ? (
            /* Constructed-DOM branch — image-dominant layout.
               Mirrors Featured.png structurally without using
               the bitmap:
                 1. Full-height dark stage — a single rounded
                    container that fills the entire vertical
                    height of the card. Replaces the
                    squished flex-1 panel that previously
                    cropped the image.
                 2. item.front.image at object-contain so the
                    full render is visible without being
                    cropped (aspect ratio preserved).
                 3. Hairline ring + inner glare for the
                    glass-fronted feel.
               Used by every card whose catalog entry sets
               `front.imageDominant: true`. The Tap for info
               hint lives at the bottom of the left column as
               a thin divider line + hand icon, matching the
               reference treatment. */
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-full md:w-[62%] overflow-hidden">
              {/* Full-height dark stage — single rounded
                  container, no nested flex-1 squishing. */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#071033] via-[#0B1B4F] to-[#071033] ring-1 ring-white/15 shadow-[0_18px_44px_-12px_rgba(0,0,0,0.65)] overflow-hidden">
                {/* The product image centered with object-contain
                    so the full render is visible. A thin inner
                    ring frames the image as the "screen edge". */}
                <div className="absolute inset-3 sm:inset-4 rounded-xl bg-slate-950 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.front.image}
                    alt={item.front.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to a neutral SVG when the
                      // asset hasn't been uploaded yet.
                      e.currentTarget.onerror = null
                      e.currentTarget.src =
                        'data:image/svg+xml;utf8,' +
                        encodeURIComponent(
                          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160"><rect width="240" height="160" fill="#0A1E5C"/><text x="120" y="86" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#FFD200" font-weight="bold">IMAGE PENDING</text></svg>'
                        )
                    }}
                  />
                  {/* Subtle diagonal glare for the
                      glass-fronted feel. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full md:w-[45%] h-[200px] md:h-[300px] flex items-center justify-center rounded-2xl bg-slate-950/40 border border-white/10 p-4 shadow-inner overflow-hidden shrink-0">
              <img
                src={item.front.image}
                alt={item.front.title}
                className="max-h-full max-w-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // Fallback to a neutral SVG when the asset
                  // hasn't been uploaded yet. Triggered by the
                  // browser's image error event; doesn't fire on
                  // a successful load.
                  e.currentTarget.onerror = null
                  e.currentTarget.src =
                    'data:image/svg+xml;utf8,' +
                    encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160"><rect width="240" height="160" fill="#0A1E5C"/><text x="120" y="86" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#FFD200" font-weight="bold">IMAGE PENDING</text></svg>'
                    )
                }}
              />
            </div>
          )}
        </div>

        {/* ================= BACK FACE ================= */}
        <div className={`absolute inset-0 w-full h-full rounded-3xl bg-[#071233] ${item.featured ? 'border-transparent' : 'border border-white/20'} p-6 md:p-7 flex flex-col gap-3 md:gap-4 shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased`}>

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
