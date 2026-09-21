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

          {/* Left Column: Identity & Typography (~55% width) */}
          <div className="flex flex-col justify-between h-full w-full md:w-[55%] z-10">
            <div>
              {/* Featured-tier front tag (used when
                  item.featured === true, i.e. the Interactive
                  Panels + Projectors spotlight cards):
                  brightest gold-tinted pill, leading sparkle
                  icon, wide tracking, fully-rounded ends. */}
              {item.featured ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-[#FFD200]/15 border border-[#FFD200]/40 text-[#FFD200] shadow-[0_0_18px_-2px_rgba(255,210,0,0.35)]">
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

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 leading-tight">
                {item.front.title}
              </h3>
            </div>

            <div className="pt-4 border-t border-white/10 mt-auto">
              <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <span>{item.front.hint || 'Tap to reveal institutional specifications ↻'}</span>
              </p>
            </div>
          </div>

          {/* Right Column: Hardware Showcase Frame (~45% width) */}
          <div className="relative w-full md:w-[45%] h-[200px] md:h-[300px] flex items-center justify-center rounded-2xl bg-slate-950/40 border border-white/10 p-4 shadow-inner overflow-hidden shrink-0">
            {item.front.image ? (
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
            ) : (
              <div className="text-xs font-bold uppercase tracking-wider text-[#FFD200]/60">
                Image Pending
              </div>
            )}
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-3xl bg-[#071233] border border-white/20 p-8 md:p-10 flex flex-col justify-between shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">

          {/* Top Bar — certification eyebrow + dismiss hint */}
          <div className="flex items-center justify-between">
            {/* Translucent navy fill with sky-blue text —
                reads as an "official certification stamp"
                rather than a marketing tag. Per the reference
                video, this is the most "trustworthy" element
                on the card; it sits above the back-face title
                without competing for visual weight. */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300">
              <Icons.BadgeCheck className="h-3 w-3" aria-hidden="true" />
              <span>{item.back.eyebrow}</span>
            </span>
            <span className="text-xs font-semibold text-slate-400 hover:text-white">
              ✕ Return
            </span>
          </div>

          {/* Title */}
          <div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              {item.back.title}
            </h4>
          </div>

          {/* Specification Grid: 4 columns on desktop. Per the
              reference video, each spec chip uses a different
              accent color on its icon (yellow / sky / emerald
              / gold) to create a visually diverse but cohesive
              matrix — mirrors the four-color pattern of the
              reference product card. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
            {item.back.specs.map((spec, idx) => {
              const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
              // Cyclic 4-color accent palette: gold, sky, emerald,
              // amber. Each chip gets its own tint so the matrix
              // reads as a categorized grid, not four identical
              // pills. Mirrors the reference video's icon
              // coloring exactly.
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
                  className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-4 text-sm text-slate-200"
                >
                  <IconComponent className={`h-5 w-5 shrink-0 ${accent}`} />
                  <span className="font-medium leading-snug">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Bottom Action CTA */}
          <div className="border-t border-white/10 pt-4">
            <a
              href={item.back.href}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between w-full rounded-xl bg-[#C41230] hover:bg-[#a30f28] text-white px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors shadow-lg"
            >
              <span>{item.back.cta || 'Explore Models & Bundles ↗'}</span>
              <Icons.ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
