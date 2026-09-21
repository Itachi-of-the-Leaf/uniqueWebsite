// StandardFlipCard — symmetrical 1:1 square showcase card for
// the 4 non-spotlight catalog items (computing, printers,
// ups-systems, peripherals). Used alongside `CatalogFlipCard`
// (the full-width spotlight variant for Interactive Panels +
// Projectors) inside `ProductGallery.jsx`.
//
// Shape:
//   • Square shell on tablet+desktop via `md:aspect-square`,
//     so the 2x2 grid is geometrically perfect. Mobile
//     (<768px) falls back to a `min-h-[540px]` column so
//     portrait screens don't get a thin sliver.
//   • `rounded-[2rem]` (32 px) matches the featured cards'
//     radius and gives the whole gallery one consistent
//     silhouette.
//
// Front face (top → bottom):
//   1. Tag pill on the left + quiet "Tap to Flip" indicator
//      on the right.
//   2. Dedicated image showcase — fixed h-[220px], dark
//      inner frame, `object-contain` + drop-shadow + 5% hover
//      scale. Full product lineup fits inside without
//      cropping, no extreme close-ups.
//   3. Title (single line, ellipsised).
//   4. 2x2 badge grid — soft white/4 panels with gold icons,
//      one per data row. Truncate guards long labels.
//   5. Divider + Pointer-icon hint (rotated 12° to look like
//      a cursor).
//
// Back face (top → bottom):
//   1. Eyebrow chip + title.
//   2. Brands roster — gold uppercase label + wrap-friendly
//      row of brand chips inside a rounded panel. Long
//      rosters (e.g. 7 names) wrap to a second line without
//      breaking the layout.
//   3. Compact 1-column spec list — full-width rows are
//      easier to read than a 2x2 grid when labels are long.
//   4. Crimson CTA pinned to the bottom with mt-auto.
//
// The card uses the same flip-on-click accessibility wiring
// (Enter / Space toggles, aria-pressed, click-guard on the
// CTA) as CatalogFlipCard so keyboard / screen-reader
// experience is identical between the two variants.
import { useState } from 'react'
import * as Icons from 'lucide-react'

export default function StandardFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Click on the CTA must NOT toggle the flip — it must navigate.
  const handleNavigate = (e) => {
    e.stopPropagation()
  }

  const hasBadges = Array.isArray(item.front.badges) && item.front.badges.length > 0
  const hasBrands = Array.isArray(item.back.brands) && item.back.brands.length > 0

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
      className="group relative w-full h-auto min-h-[540px] md:min-h-0 md:aspect-square cursor-pointer [perspective:1400px] select-none rounded-[2rem]"
    >
      <div
        className={`relative w-full h-full rounded-[2rem] transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] bg-[#071330] border border-white/15 p-6 lg:p-7 flex flex-col justify-between shadow-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">
          {/* Top bar — tag pill + tap-to-flip indicator. */}
          <div className="flex items-center justify-between gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase bg-white/5 border border-white/15 text-slate-300">
              <Icons.Tag className="h-3 w-3" aria-hidden="true" />
              <span>{item.front.tag}</span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Tap to Flip ↻
            </span>
          </div>

          {/* Square image showcase — capped at h-[220px] with
              object-contain + drop-shadow so the full product
              lineup fits inside without cropping. The dark
              inner frame + shadow-inner reads as a contained
              showcase window rather than a flush image. */}
          <div className="relative w-full h-[200px] sm:h-[220px] flex items-center justify-center rounded-2xl bg-slate-950/50 border border-white/10 p-3 my-2 overflow-hidden shadow-inner shrink-0">
            <img
              src={item.front.image}
              alt={item.front.title}
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 pointer-events-none"
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

          {/* Title — single line, ellipsised if it overflows. */}
          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug line-clamp-1 shrink-0">
            {item.front.title}
          </h3>

          {/* Symmetrical 2x2 feature badges. Soft white/4
              panels with a small gold icon — quiet, no
              gradient — so the four pills read as a clean
              grid instead of competing with the title. */}
          {hasBadges && (
            <div className="grid grid-cols-2 gap-2 my-2 shrink-0">
              {item.front.badges.map((b, idx) => {
                const IconComponent = Icons[b.icon] || Icons.CheckCircle2
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] font-semibold text-slate-200 shadow-sm"
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0 text-[#FFD200]" />
                    <span className="truncate">{b.label}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom action hint — divider + Pointer icon
              (rotated 12° to look like a cursor) + text. */}
          <div className="border-t border-white/10 pt-2.5 flex items-center gap-2 text-xs font-medium text-slate-400 shrink-0">
            <Icons.Pointer
              className="w-3.5 h-3.5 text-[#FFD200] rotate-12"
              aria-hidden="true"
            />
            <span>
              {item.front.hint || 'Tap to reveal brands & specs ↻'}
            </span>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] bg-[#071233] border border-white/20 p-6 lg:p-7 flex flex-col justify-between shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Top: eyebrow pill + ✕ Return. */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300">
                <Icons.BadgeCheck className="h-3 w-3" aria-hidden="true" />
                <span>{item.back.eyebrow}</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">
                ✕ Return
              </span>
            </div>
            <h4 className="mt-2 text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {item.back.title}
            </h4>
          </div>

          {/* Supported brands block — gold uppercase label
              + wrap-friendly chip row inside a rounded panel.
              Long rosters (e.g. 7 names) wrap gracefully. */}
          {hasBrands && (
            <div className="my-1.5 bg-white/[0.03] border border-white/10 rounded-xl p-3 shrink-0">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#FFD200] block mb-1.5">
                {item.back.brandsTitle || 'SUPPORTED BRANDS & PLATFORMS'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.back.brands.map((brand, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-bold text-white tracking-wide shadow-sm"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compact 1-col spec list — full-width rows so
              long labels stay readable without being
              truncated by a 2x2 column split. */}
          <div className="grid grid-cols-1 gap-1.5 my-auto">
            {item.back.specs.map((spec, sIdx) => {
              const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
              return (
                <div
                  key={sIdx}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.02] border border-white/5 px-2.5 py-1.5 text-[11px] text-slate-200"
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                  <span className="leading-tight truncate">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Crimson CTA — pinned to the bottom with
              mt-auto so it sits flush against the lower
              edge regardless of brands-list length. */}
          <div className="border-t border-white/10 pt-2.5 mt-auto shrink-0">
            <a
              href={item.back.href}
              onClick={handleNavigate}
              className="flex items-center justify-between w-full rounded-xl bg-[#C41230] hover:bg-[#a30f28] text-white px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors shadow-lg"
            >
              <span>{item.back.cta}</span>
              <Icons.ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
