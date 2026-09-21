// CatalogFlipCard — encapsulates the two-sided interactive card
// used by every entry in `HARDWARE_CATALOG`.
//
// Schema (from `src/data/hardwareCatalog.js`):
//   item = {
//     id:       string                       — stable React key
//     featured: boolean?                     — currently unused (was
//                                            column-span flag in the
//                                            old 3-col grid; the new
//                                            full-width stack gives
//                                            every card equal width)
//     front:    { tag, title, image, hint }  — visual-impact face
//     back:     { eyebrow, title, specs[],   — institutional face
//                 href, cta }
//   }
//
// Layout (per the directive's wide showcase refactor):
//   • Outer shell: `min-h-[420px]` mobile, `md:min-h-[380px]`
//     desktop, `[perspective:1400px]` for a slightly deeper 3D
//     context that reads better at full width.
//   • Front face: 2-column responsive split. Left ~55% holds the
//     gold tag, large title, and flip hint; right ~45% holds a
//     generously-sized hero image frame (220 px tall on mobile,
//     260 px on desktop).
//   • Back face: same dimensions, sky-blue compliance eyebrow +
//     dismiss button, 1/2/4-column responsive spec grid
//     (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), full-width
//     crimson CTA with `e.stopPropagation()` so it navigates
//     instead of flipping back.
//
// All flip state is local — each card owns its `isFlipped`
// boolean. GPU stability is enforced via
// `[backface-visibility:hidden] [-webkit-backface-visibility:hidden]
// [transform:translateZ(0)] subpixel-antialiased` on both faces.
import { useState } from 'react'
import * as Icons from 'lucide-react'

export default function CatalogFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => setIsFlipped((prev) => !prev)

  // Click on the CTA must NOT toggle the flip — it must navigate.
  // `stopPropagation` keeps the parent `<div onClick>` from
  // firing when the user taps the link.
  const handleNavigate = (e) => {
    e.stopPropagation()
  }

  // Resolve an icon by string name, with a safe fallback.
  // Lucide-react 1.x ships every icon we reference; the fallback
  // only triggers if the data file ever ships an unknown name.
  const resolveIcon = (name) => Icons[name] || Icons.CheckCircle2

  return (
    <div
      onClick={handleFlip}
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
          handleFlip()
        }
      }}
      className="group relative w-full min-h-[480px] md:min-h-[420px] cursor-pointer [perspective:1400px] select-none"
    >
      <div
        className={`relative h-full w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#0B1B4F] border border-white/15 flex flex-col md:flex-row md:items-stretch justify-between p-8 md:p-10 gap-8 overflow-hidden shadow-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">
          {/* Left side — Content & Identity (~55% width) */}
          <div className="flex-1 min-w-0 flex flex-col justify-center w-full md:py-2">
            {/* Top Visual Header — gold eyebrow tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#FFD200]/10 border border-[#FFD200]/30 text-[#FFD200] w-fit">
              {item.front.tag}
            </span>

            {/* Main Title — large, commanding typography */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-4">
              {item.front.title}
            </h3>

            {/* Hint / Reveal Prompt */}
            <p className="text-sm font-medium text-slate-400 flex items-center gap-2 mt-6">
              <span>{item.front.hint}</span>
            </p>
          </div>

          {/* Right side — Product Showcase (~45% width). With
              `items-stretch` on the parent flex row, the image
              frame is allowed to fill the column's full height
              (up to its max-h constraint) instead of collapsing
              to its content size. */}
          <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
            <div className="relative w-full h-full min-h-[220px] md:min-h-[260px] flex items-center justify-center rounded-2xl bg-slate-950/40 border border-white/10 p-4 shadow-inner">
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
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#071233] border border-white/20 p-8 md:p-10 flex flex-col overflow-hidden shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Top Bar — Eyebrow, Title, Dismiss */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300 w-fit">
                {item.back.eyebrow}
              </span>
              <h4 className="mt-3 text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.back.title}
              </h4>
            </div>
            {/* Dismiss button — visually communicates "return to
                the front face"; kept as a non-interactive label
                so the parent's `e.stopPropagation()` CTA stays
                unambiguous. Tapping the card body itself flips
                back via the parent div. */}
            <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-400 border border-white/10">
              ✕ Return to Visual
            </span>
          </div>

          {/* Specifications Matrix — 1 col mobile, 2 cols tablet,
              4 cols desktop. Generous padding (p-4) and gap-4 so
              each spec reads at full width with breathing room. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {item.back.specs.map((spec, idx) => {
              const IconComponent = resolveIcon(spec.icon)
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-4 text-xs text-slate-200"
                >
                  <IconComponent className="h-5 w-5 shrink-0 text-[#FFD200]" />
                  <span className="leading-snug">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Bottom Action Bar — full-width destination link.
              `e.stopPropagation()` ensures the click routes to
              the catalog page instead of flipping the card back
              to the front. */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <a
              href={item.back.href}
              onClick={handleNavigate}
              className="flex items-center justify-between w-full rounded-xl bg-[#C41230] hover:bg-[#a30f28] text-white px-5 py-4 text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors shadow-lg"
            >
              <span>{item.back.cta}</span>
              <Icons.ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
