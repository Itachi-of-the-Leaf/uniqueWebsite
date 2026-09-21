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
//     hardware frame on desktop (200 px on mobile).
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
import { useState } from 'react'
import * as Icons from 'lucide-react'

// Two deployment-demonstration videos embedded side-by-
// side on the back of the Interactive Flat Panels card.
// IDs come from the watch URLs:
//   https://www.youtube.com/watch?v=wtBHIyOkSuQ
//   https://www.youtube.com/watch?v=XzfDhwStWVU
const YOUTUBE_VIDEOS = [
  { id: 'wtBHIyOkSuQ', title: 'Interactive Flat Panels — Deployment Showcase' },
  { id: 'XzfDhwStWVU', title: 'Interactive Flat Panels — Classroom Walkthrough' },
]

// YouTubeVideoPlayer — click-to-play iframe pattern matching
// the existing ProjectorVideoPlayer's UX. Renders the
// hqdefault thumbnail with a red play button until clicked,
// then swaps to the iframe with autoplay.
function YouTubeVideoPlayer({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-lg overflow-hidden">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title || 'YouTube Video Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg border-0"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <button
          type="button"
          onClick={(e) => {
            // stopPropagation so the card body doesn't
            // flip back to the front face when the user
            // clicks the play button.
            e.stopPropagation()
            setIsPlaying(true)
          }}
          aria-label={`Play ${title || 'Video'}`}
          className="group relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden border-0 p-0 m-0 bg-transparent text-left focus:outline-hidden focus:ring-2 focus:ring-[#FFD200]"
        >
          {/* Cached thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title || 'Video thumbnail'}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Subtle vignette so the red play button stays
              visible on busy thumbnails. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30" />
          {/* Authentic YouTube-style red play button */}
          <div className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
            <div className="w-12 h-9 sm:w-14 sm:h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-[0_4px_18px_rgba(255,0,0,0.45)] group-hover:bg-[#CC0000] group-hover:shadow-[0_6px_22px_rgba(255,0,0,0.65)] transition-all">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-white translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      )}
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
      className={`group relative w-full h-[460px] md:h-[420px] cursor-pointer [perspective:1400px] select-none ${
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
              item.href === '/catalog/interactive-panels' ? 'md:w-[32%]' : 'md:w-[55%]'
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

              {/* Three colored feature pills — signature
                  element from Featured.png reference. Each
                  pill is a small chip with a colored icon;
                  a vertical line connects them on the left.
                  Mirrors the reference: blue (AI), green
                  (Google EDLA — must stay per directive),
                  gold (donor name / institutional
                  branding). Hidden on mobile because the
                  slim rail is too narrow there. Only on the
                  Interactive Panels card. */}
              {item.href === '/catalog/interactive-panels' && (
                <div className="mt-4 hidden md:block relative">
                  {/* Vertical connecting line — positioned
                      absolutely so it sits behind the icon
                      squares, not over the text. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[10px] top-3 bottom-3 w-px bg-white/15"
                  />
                  {/* Pill 1 — AI Enhanced (blue) */}
                  <div className="relative flex items-center gap-2 mb-2.5">
                    <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-md bg-sky-400/20 ring-1 ring-sky-400/40 shrink-0">
                      <Icons.Sparkles className="h-3 w-3 text-sky-300" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold text-sky-100">
                      AI - Enhanced
                    </span>
                  </div>
                  {/* Pill 2 — Google EDLA Certified (green) */}
                  <div className="relative flex items-center gap-2 mb-2.5">
                    <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400/20 ring-1 ring-emerald-400/40 shrink-0">
                      {/* Mini multicolored G — Google's iconic
                          4-color logo compressed into a 12px
                          square. Each path is one slice of
                          the G. */}
                      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                        <path d="M9.5 6.2c0-.2 0-.4-.1-.6H6v1.2h2c-.1.4-.4.7-.7.9v.7h1.1c.7-.6 1.1-1.5 1.1-2.2z" fill="#4285F4" />
                        <path d="M6 9.5c.9 0 1.7-.3 2.2-.8L7.1 8c-.3.2-.7.3-1.1.3-.8 0-1.5-.5-1.8-1.3H3v.8c.5 1 1.6 1.7 3 1.7z" fill="#34A853" />
                        <path d="M4.2 7c-.1-.2-.1-.5-.1-.7s0-.5.1-.7V4.8H3c-.3.5-.4 1.1-.4 1.7s.2 1.2.4 1.7l1.2-.2z" fill="#FBBC04" />
                        <path d="M6 4.4c.5 0 1 .2 1.3.5l1-1C7.7 3.3 6.9 3 6 3c-1.4 0-2.5.7-3 1.7l1.2.8c.3-.7 1-1.1 1.8-1.1z" fill="#EA4335" />
                      </svg>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-100">
                      Google EDLA Certified
                    </span>
                  </div>
                  {/* Pill 3 — Donor Name Branding (gold) */}
                  <div className="relative flex items-center gap-2">
                    <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-md bg-[#FFD200]/20 ring-1 ring-[#FFD200]/40 shrink-0">
                      <Icons.User className="h-3 w-3 text-[#FFD200]" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold text-amber-100">
                      Integrated Donor Name
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Hint — only renders on non-Interactive-Panels
                cards. The Interactive Panels card has the hint
                baked into its image-dominant layout below. */}
            {item.href !== '/catalog/interactive-panels' && (
              <div className="pt-3 border-t border-white/10 mt-auto">
                <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
                  <span>{item.front.hint || 'Tap to reveal institutional specifications ↻'}</span>
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Hardware Showcase. For the Interactive
              Panels card, this is a full-bleed cover image
              (object-cover, no padding, no frame, no
              drop-shadow) that bleeds edge-to-edge in the right
              ~68% of the card. For other featured cards the
              existing 300 px-tall image frame is preserved. */}
          {item.href === '/catalog/interactive-panels' ? (
            /* Image-dominant branch — Interactive Flat Panels.
               SmartPanelNext.jpeg is the wider hero render that
               shows the product + a feature strip; we use
               object-cover to fill the right pane edge-to-edge
               and trust the card's rounded corners + overflow-
               hidden parent to do the framing. No drop shadow,
               no group-hover scale, no padding — clean and
               restrained. The image src is swapped to
               SmartPanelNext.jpeg (the wider 1080×701 hero
               render) instead of the smaller webp. */
            <div className="relative w-full md:w-[68%] md:h-full overflow-hidden">
              <img
                src="/Featured.png"
                alt={item.front.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
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
              {/* Very faint bottom-edge gradient — Featured.png
                  already has its own bottom hint baked in
                  ("Tap for info" with finger pointer), so
                  this is just a smoothing pass at the card
                  edge. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-[#0B1B4F]/20 to-transparent"
              />
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
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#071233] border border-white/20 p-8 md:p-10 flex flex-col gap-6 shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">

          {/* Top Bar — certification eyebrow + dismiss hint */}
          <div className="flex items-center justify-between">
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

          {/* Title — bold, not extrabold; tighter leading */}
          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
            {item.back.title}
          </h4>

          {/* Back-face content branches by card identity:
              Interactive Panels shows 2 YouTube embeds
              side-by-side demonstrating deployment;
              other featured cards keep the 4-icon spec
              matrix. 2-up YouTube video grid below is
              stacked 1-col on mobile, side-by-side 2-col
              on desktop. Each video fills 16:9 within
              its slot. Click-to-play so both iframes
              don't load simultaneously on flip — the
              first user click on a thumbnail loads that
              video; the other stays as a thumbnail until
              clicked. The `e.stopPropagation()` on the
              play button prevents the card body from
              flipping back to the front face. */}
          {item.href === '/catalog/interactive-panels' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-auto">
              {YOUTUBE_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="relative w-full aspect-video"
                >
                  <YouTubeVideoPlayer
                    videoId={video.id}
                    title={video.title}
                  />
                </div>
              ))}
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
