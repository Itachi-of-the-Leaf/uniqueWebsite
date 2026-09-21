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
                src="/SmartPanelNext.jpeg"
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
              {/* Subtle bottom gradient so the hint text below
                  stays legible if it ever wraps onto the
                  image. Doesn't compete with the photo — just
                  adds ~20% navy at the bottom edge. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0B1B4F]/85 to-transparent"
              />
              {/* Hint pinned at the bottom of the image, white
                  text on the gradient strip. Restrained — small
                  font, no icon, just the hint string. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end px-5 pb-3 sm:px-6 sm:pb-4">
                <p className="text-xs font-medium text-white/85">
                  {item.front.hint || 'Tap to reveal institutional specifications ↻'}
                </p>
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

          {/* Specification Grid: 4 columns on desktop. Each
              spec chip uses a different accent color on its
              icon (gold / sky / emerald / amber) for visual
              variety without screaming. CTA removed per
              directive. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-auto">
            {item.back.specs.map((spec, idx) => {
              const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
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

        </div>
      </div>
    </div>
  )
}
