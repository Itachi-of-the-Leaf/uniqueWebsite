// StandardFlipCard — symmetrical showcase card for the 4
// non-spotlight catalog items (computing, printers,
// ups-systems, peripherals). Used alongside `CatalogFlipCard`
// (the full-width spotlight variant for Interactive Panels +
// Projectors) inside `ProductGallery.jsx`.
//
// Geometry & visual spec — derived from the reference mockup:
//   • Canvas: midnight navy bg-[#06112E], crisp glass-stroke
//     border, rounded-[2.25rem] (36 px), p-5 sm:p-6.
//   • Aspect ratio: 4:5 on tablet (md:aspect-[4/5]) so the
//     row of two cards has matching heights, square
//     (lg:aspect-square) on large screens, with a 560 px
//     min-height fallback on mobile so portrait phones don't
//     get a thin sliver.
//   • Top hardware stage: 16:10 rounded-[1.75rem] dark
//     container with a floating Sparkles-pill badge overlaid
//     in the top-left corner (backdrop-blur, white border,
//     shadow). The image fills the stage via object-cover
//     + hover scale, so the full product photo (close-up
//     or otherwise) presents cleanly without letterboxing.
//   • Title: text-2xl sm:text-[26px] font-black, white,
//     left-aligned, with 12 px vertical breathing room.
//   • 2×2 feature grid: dark pill panels with white icons +
//     white bold text, truncate for overflow safety.
//   • Bottom action footer: full-width white/15 divider
//     + Pointer icon (rotated 12° to look like a cursor) +
//     hint text.
//   • Back face: eyebrow chip + title, brands roster inside
//     a rounded-2xl panel (gold uppercase title + wrap-friendly
//     chip row), 1-col spec list, crimson CTA pinned to the
//     bottom with mt-auto.
import { useState } from 'react'
import * as Icons from 'lucide-react'

export default function StandardFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)

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
      className="group relative w-full h-auto min-h-[560px] md:min-h-0 md:aspect-[4/5] lg:aspect-square flex flex-col justify-between overflow-hidden shadow-2xl select-none cursor-pointer [perspective:1400px] bg-[#06112E] border border-white/15 rounded-[2.25rem] p-5 sm:p-6"
    >
      <div
        className={`relative w-full h-full rounded-[2.25rem] transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2.25rem] bg-[#06112E] border border-white/15 p-5 sm:p-6 flex flex-col justify-between shadow-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">

          {/* Top image stage with floating category pill.
              The stage is a 16:10 dark container; the
              category pill sits absolutely-positioned in
              the top-left corner with backdrop-blur so it
              reads cleanly against any product photo. The
              image fills the stage via object-cover with a
              5% hover scale. */}
          <div className="relative w-full aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-slate-950 border border-white/10 shrink-0 shadow-inner flex items-center justify-center">
            <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/25 text-white shadow-lg">
              <Icons.Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="text-xs font-bold tracking-wide text-white">
                {item.front.tag}
              </span>
            </div>
            <img
              src={item.front.image}
              alt={item.front.title}
              className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,' +
                  encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150"><rect width="240" height="150" fill="#0A1E5C"/><text x="120" y="80" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#FFD200" font-weight="bold">IMAGE PENDING</text></svg>'
                  )
              }}
            />
          </div>

          {/* Heavy, bold title in white. */}
          <h3 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-snug my-3 text-left shrink-0">
            {item.front.title}
          </h3>

          {/* Symmetrical 2x2 feature badges. Dark pill
              panels with white icons + white bold text,
              truncate for long labels. */}
          {hasBadges && (
            <div className="grid grid-cols-2 gap-2.5 my-auto shrink-0">
              {item.front.badges.map((badge, idx) => {
                const IconComponent = Icons[badge.icon] || Icons.CheckCircle2
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#0a183d]/80 border border-white/20 shadow-sm"
                  >
                    <IconComponent className="w-4 h-4 text-white shrink-0" />
                    <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate">
                      {badge.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom action footer — divider + Pointer icon
              (rotated 12° to look like a cursor) + hint. */}
          <div className="border-t border-white/15 pt-3.5 mt-auto flex items-center gap-2.5 text-xs font-medium text-slate-300 shrink-0">
            <Icons.Pointer className="w-4 h-4 text-slate-200 rotate-12 shrink-0" />
            <span>
              {item.front.hint || 'Tap to reveal configurations'}
            </span>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 w-full h-full rounded-[2.25rem] bg-[#071233] border border-white/20 p-6 sm:p-7 flex flex-col justify-between shadow-2xl overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Header — eyebrow chip + ✕ Return. */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300">
                {item.back.eyebrow}
              </span>
              <span className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer">
                ✕ Return
              </span>
            </div>
            <h4 className="mt-2 text-xl font-extrabold text-white tracking-tight leading-tight">
              {item.back.title}
            </h4>
          </div>

          {/* Supported brands — gold uppercase label +
              wrap-friendly chip row inside a rounded panel. */}
          {hasBrands && (
            <div className="my-2 bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 shrink-0">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#FFD200] block mb-2">
                {item.back.brandsTitle || 'SUPPORTED BRANDS & PLATFORMS'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.back.brands.map((brand, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-bold text-white tracking-wide shadow-sm"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compact 1-col spec list — full-width rows so
              long labels read without truncation. my-auto
              keeps the list vertically centered between
              the brands panel above and the bottom edge
              of the card, so the back face stays balanced
              without a CTA. */}
          <div className="grid grid-cols-1 gap-2 my-auto">
            {item.back.specs.map((spec, sIdx) => {
              const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
              return (
                <div
                  key={sIdx}
                  className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 px-3 py-2 text-xs text-slate-200"
                >
                  <IconComponent className="w-4 h-4 shrink-0 text-sky-400" />
                  <span className="leading-tight truncate">{spec.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
