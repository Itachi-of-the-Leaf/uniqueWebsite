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
// on tab change, so only one player is in the DOM at once.
const YOUTUBE_VIDEOS = [
  { id: 'wtBHIyOkSuQ', title: 'Interactive Flat Panels — Deployment Showcase', tabLabel: 'Deployment' },
  { id: 'XzfDhwStWVU', title: 'Interactive Flat Panels — Classroom Walkthrough', tabLabel: 'Classroom' },
]

// Feature badges rendered down the left-column branch on the
// Interactive Panels front face. Each pill is rendered as a
// substantial, gradient-tinted chip with its icon integrated
// INSIDE the pill background (not a detached bubble). Order
// is intentional — top → bottom mirrors the priority Gemini
// quoted. The container border-l-2 (white/20) draws the
// vertical trunk that visually links the pills as a tree.
//
// Palette (per the spec):
//   1. AI - Enhanced                sky / blue gradient
//   2. Google EDLA Certified        amber / gold accent + G
//   3. Integrated Donor Name        emerald / teal gradient
//   4. 3-Year Onsite SLA            gold / bronze gradient
//   5. 4K Anti-Glare Multi-Touch    purple / indigo gradient
//
// `icon` is the Lucide component reference; `customIcon` lets
// a pill render an inline SVG (the Google "G" mark) instead.
const INTERACTIVE_PANELS_BADGES = [
  {
    label: 'AI - Enhanced',
    icon: 'Sparkles',
    container: 'bg-sky-950/70 border-sky-400/50 text-sky-200',
    iconColor: 'text-sky-300',
  },
  {
    label: 'Google EDLA Certified',
    customIcon: 'google-g',
    container: 'bg-slate-900/80 border-amber-400/50 text-amber-200',
    iconColor: 'text-amber-300',
  },
  {
    label: 'Integrated Donor Name',
    icon: 'User',
    container: 'bg-emerald-950/70 border-emerald-400/50 text-emerald-200',
    iconColor: 'text-emerald-300',
  },
  {
    label: '3-Year Onsite SLA',
    icon: 'ShieldCheck',
    container: 'bg-amber-950/60 border-[#FFD200]/50 text-[#FFD200]',
    iconColor: 'text-[#FFD200]',
  },
  {
    label: '4K Anti-Glare Multi-Touch',
    icon: 'Monitor',
    container: 'bg-purple-950/60 border-purple-400/50 text-purple-200',
    iconColor: 'text-purple-300',
  },
]

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

// InteractivePanelsVideoPanel — side-by-side YouTube grid for
// the Interactive Panels back face.
//
// Two iframes render simultaneously inside a 1-col → 2-col
// responsive grid (stacked on mobile, side-by-side on desktop).
// Each cell is `aspect-video` so the iframes auto-size to
// 16:9 inside their grid cell — they always fit the box
// regardless of card width.
//
// Above the grid, a single eyebrow caption ("Check the screen
// out in deployment") contextualises what the user is about to
// watch and visually anchors the two players. Per-cell labels
// ("Deployment" / "Classroom") sit above each iframe so each
// player is identifiable at a glance.
//
// Why the pulse-loader: you cannot reliably detect a loaded
// YouTube video from inside an iframe without enabling the
// JS API + postMessage handshake. As a pragmatic heuristic we:
//   1. Listen for the <iframe> `onLoad` (fires when the DOM
//      iframe element mounts, not when the video is ready —
//      this is the *earliest* reliable event).
//   2. Pass `enablejsapi=1` so the iframe is JS-controllable
//      in future refactors.
//   3. Set a 150 ms fallback timeout — if `onLoad` is delayed
//      by network or has already fired before the effect ran,
//      the fallback still hides the loader after a fixed
//      upper bound.
// The pulse-ring itself reuses `.yt-facade-play` from
// `src/index.css` (also used by the Testimonials section) so
// no new CSS is required.
function VideoCell({ video }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef(null)
  // Reset loader visibility whenever the cell's video changes.
  // We use a ref to track the previous id so the synchronous
  // setState below doesn't fire on the initial mount (only on
  // real remounts). 150 ms upper-bound fallback — if onLoad is
  // delayed by network or already fired before this effect ran,
  // the fallback still hides the loader after a fixed upper
  // bound.
  const prevIdRef = useRef(video.id)
  useEffect(() => {
    if (prevIdRef.current === video.id) return
    prevIdRef.current = video.id
    setIsLoaded(false)
    const fallback = setTimeout(() => setIsLoaded(true), 150)
    return () => clearTimeout(fallback)
  }, [video.id])

  return (
    <div className="relative w-full h-full min-h-0 rounded-lg overflow-hidden bg-slate-950 ring-1 ring-white/10">
      <iframe
        ref={ref}
        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&enablejsapi=1`}
        title={video.title}
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

function InteractivePanelsVideoPanel() {
  return (
    <div
      className="flex flex-col gap-2 w-full h-full min-h-0"
      // Container click guard — clicking inside the panel
      // (iframes, labels, etc.) must NOT toggle the card flip.
      onClick={(e) => e.stopPropagation()}
    >
      {/* Caption — anchors the two videos and explains what
          the user is looking at. Keeps the muted slate tone
          of the back face. shrink-0 so it never gets
          squeezed. */}
      <p className="text-[11px] sm:text-xs text-slate-400 leading-snug text-center shrink-0">
        Check the screen out in deployment
      </p>

      {/* Two-iframe grid — stacks on mobile, side-by-side on
          `sm:` and up. Each VideoCell manages its own
          pulse-loader state independently. flex-1 + min-h-0
          so the grid claims all remaining vertical space
          and the 16:9 aspect-video iframes fit cleanly
          without being cropped by the card edge. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
        {YOUTUBE_VIDEOS.map((video) => (
          <div key={video.id} className="flex flex-col gap-1.5 min-h-0">
            {/* Per-cell label — small uppercase tag above
                each player so they remain identifiable when
                both are visible at once. */}
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#FFD200]/80 shrink-0">
              {video.tabLabel}
            </span>
            <VideoCell video={video} />
          </div>
        ))}
      </div>
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
      className={`group relative w-full h-[520px] md:h-[560px] cursor-pointer [perspective:1400px] select-none ${
        item.featured
          ? 'ring-1 ring-[#FFD200]/30 shadow-[0_0_60px_-15px_rgba(255,210,0,0.35)] rounded-3xl'
          : ''
      }`}
    >
      <div
        className={`relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#0B1B4F] border border-white/15 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">

          {/* Left Column: Identity & Typography (~32% width on
              Interactive Panels; ~55% on the rest of the
              featured cards). The Interactive Panels card is
              rendered with an image-dominant layout below. */}
          <div
            className={`flex flex-col justify-between h-full w-full z-10 ${
              item.id === 'interactive-panels' ? 'md:w-[32%]' : 'md:w-[55%]'
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
                  badges arranged down a vertical trunk. Per the
                  Gemini brief:
                    • 5 rows (sky → amber → emerald → bronze → purple)
                    • px-4 py-2 / text-sm font-semibold padding
                    • Icon integrated INTO the pill (not detached)
                    • Trunk = border-l-2 on the container (white/20)
                    • space-y-3 even vertical rhythm
                  The container also acts as the flex child that
                  fills the left column's middle band, so the
                  FEATURED tag + title sit at the top and the
                  "Tap for info" divider sits at the bottom — no
                  dead voids. Hidden on mobile because the slim
                  rail is too narrow there. Only on the
                  Interactive Panels card. */}
              {item.id === 'interactive-panels' && (
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

                  {INTERACTIVE_PANELS_BADGES.map((badge) => {
                    const Icon = badge.icon ? Icons[badge.icon] : null
                    return (
                      <li
                        key={badge.label}
                        className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide border ${badge.container} shadow-[0_0_18px_-8px_rgba(0,0,0,0.6)]`}
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
                            the four standard rows; the
                            Google G is the inline SVG. */}
                        {badge.customIcon === 'google-g' ? (
                          <GoogleGIcon className={`w-4 h-4 shrink-0`} />
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
          {item.id === 'interactive-panels' ? (
            /* Constructed-DOM branch — Interactive Flat Panels.
               Mirrors Featured.png structurally without using
               the bitmap:
                 1. Full-height dark stage — a single rounded
                    container that fills the entire vertical
                    height of the card. Replaces the
                    squished flex-1 panel that previously
                    cropped the dual-screen render.
                 2. SmartPanel3.jpeg at object-contain so the
                    full dual-screen render is visible without
                    being cropped.
                 3. Hairline ring + inner glare for the
                    "glass-fronted panel" feel.
               The "Tap for info" hint is intentionally NOT
               here — it lives at the bottom of the left
               column as a thin divider line + hand icon,
               matching Featured.png's reference treatment. */
            <div className="relative w-full md:w-[68%] md:h-full overflow-hidden">
              {/* Full-height dark stage — single rounded
                  container, no nested flex-1 squishing. */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#071033] via-[#0B1B4F] to-[#071033] ring-1 ring-white/15 shadow-[0_18px_44px_-12px_rgba(0,0,0,0.65)] overflow-hidden">
                {/* SmartPanel3.jpeg centered with object-contain
                    so the dual-screen render is fully visible.
                    A thin inner ring frames the image as the
                    "screen edge". */}
                <div className="absolute inset-3 sm:inset-4 rounded-xl bg-slate-950 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
                  <img
                    src="/SmartPanel3.jpeg"
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
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#071233] border border-white/20 p-6 md:p-7 flex flex-col gap-3 md:gap-4 shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">

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
              Interactive Panels shows two side-by-side YouTube
              iframes with a caption above them, each with
              its own pulse-loader; other featured cards keep
              the 4-icon spec matrix. */}
          {item.id === 'interactive-panels' ? (
            <div id="interactive-panels-video-panel" className="flex-1 min-h-0">
              <InteractivePanelsVideoPanel />
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
