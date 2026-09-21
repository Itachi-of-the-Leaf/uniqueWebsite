// CatalogFlipCard — encapsulates the two-sided interactive card
// used by every entry in `HARDWARE_CATALOG`.
//
// Schema (from `src/data/hardwareCatalog.js`):
//   item = {
//     id:       string                       — stable React key
//     featured: boolean?                     — wider grid cell
//     front:    { tag, title, image, hint }  — visual-impact face
//     back:     { eyebrow, title, specs[],   — institutional face
//                 href, cta }
//   }
//
// Front face: gold eyebrow tag + centered hero image + title +
// subtle flip hint. All elements live in the parent rotation,
// so we use Tailwind v4's `[transform:translateZ(0)]` GPU-
// promote + `backface-visibility:hidden` to keep them crisp
// through the rotateY animation.
//
// Back face: deeper navy + sky-blue compliance pill + spec grid
// with dedicated Lucide icons + crimson CTA button. The CTA
// uses `e.stopPropagation()` so tapping it routes to the
// catalog page instead of toggling the flip state back.
//
// All flip state is local — each card owns its `isFlipped`
// boolean. This matches the directive's spec exactly.
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
      className={`group relative h-[480px] w-full cursor-pointer [perspective:1200px] select-none ${
        item.featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div
        className={`relative h-full w-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#0B1B4F] border border-white/15 p-6 flex flex-col justify-between overflow-hidden shadow-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">
          {/* Top Visual Header */}
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#FFD200]/10 border border-[#FFD200]/30 text-[#FFD200]">
              {item.front.tag}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Tap to Flip ↻
            </span>
          </div>

          {/* Center Product Showcase */}
          <div className="relative my-auto flex h-[220px] w-full items-center justify-center p-2">
            <img
              src={item.front.image}
              alt={item.front.title}
              className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 pointer-events-none"
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

          {/* Bottom Title & Reveal Prompt */}
          <div className="border-t border-white/10 pt-4 z-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {item.front.title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span>{item.front.hint}</span>
            </p>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#071233] border border-white/20 p-6 flex flex-col justify-between overflow-hidden shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Top Eyebrow & Dismiss Icon */}
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300">
                {item.back.eyebrow}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                ✕ Return
              </span>
            </div>

            <h4 className="mt-3 text-xl font-bold text-white tracking-tight">
              {item.back.title}
            </h4>
          </div>

          {/* Specification Badges Grid */}
          <div className="grid grid-cols-2 gap-2.5 my-auto">
            {item.back.specs.map((spec, idx) => {
              const IconComponent = resolveIcon(spec.icon)
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 p-2.5 text-xs text-slate-200"
                >
                  <IconComponent className="h-4 w-4 shrink-0 text-[#FFD200]" />
                  <span className="leading-snug">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Action Destination Link */}
          <div className="border-t border-white/10 pt-4">
            <a
              href={item.back.href}
              onClick={handleNavigate}
              className="flex items-center justify-between w-full rounded-xl bg-[#C41230] hover:bg-[#a30f28] text-white px-4 py-3 text-xs font-bold tracking-wide uppercase transition-colors shadow-lg"
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
