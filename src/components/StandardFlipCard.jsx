// StandardFlipCard — compact square-card variant for the 5
// non-spotlight catalog items (desktops, laptops, printers,
// UPS, accessories). Used alongside `CatalogFlipCard` (the
// full-width spotlight variant for Interactive Panels +
// Projectors) inside `ProductGallery.jsx`.
//
// Layout:
//   • Fixed height (h-[440px]) so all 5 cards in the 3-col
//     grid align uniformly.
//   • Vertical stack: top gold pill tag + 220 px-tall image
//     frame + bottom title/hint with top-border divider.
//   • Same flip-on-click behavior and same back face structure
//     (sky-blue eyebrow + title + 2-col spec grid + crimson
//     CTA) as the spotlight variant — only the front face is
//     more compact.
//   • Tier-aware front tag styling — uses the same dimmed
//     slate pill as the spotlight card's standard tier.
import { useState } from 'react'
import * as Icons from 'lucide-react'

export default function StandardFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Click on the CTA must NOT toggle the flip — it must navigate.
  const handleNavigate = (e) => {
    e.stopPropagation()
  }

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
      className="group relative w-full h-[440px] cursor-pointer [perspective:1200px] select-none"
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#0B1B4F] border border-white/15 p-6 flex flex-col justify-between overflow-hidden shadow-2xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">
          {/* Top Visual Header — muted tier tag */}
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase bg-white/[0.06] border border-white/15 text-slate-300">
              <Icons.Tag className="h-3 w-3" aria-hidden="true" />
              <span>{item.front.tag}</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Tap to Flip ↻
            </span>
          </div>

          {/* Center Product Showcase */}
          <div className="relative my-auto flex h-[200px] w-full items-center justify-center p-2">
            <img
              src={item.front.image}
              alt={item.front.title}
              className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 pointer-events-none"
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

          {/* Bottom Title & Reveal Prompt */}
          <div className="border-t border-white/10 pt-4 z-10">
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              {item.front.title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span>{item.front.hint}</span>
            </p>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#071233] border border-white/20 p-6 flex flex-col justify-between overflow-hidden shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Top Eyebrow & Dismiss */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300">
                <Icons.BadgeCheck className="h-3 w-3" aria-hidden="true" />
                <span>{item.back.eyebrow}</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                ✕ Return
              </span>
            </div>

            <h4 className="mt-3 text-lg font-bold text-white tracking-tight leading-snug">
              {item.back.title}
            </h4>
          </div>

          {/* Specification Badges Grid — 2 cols (matches the
              square card's compact width) */}
          <div className="grid grid-cols-2 gap-2 my-auto">
            {item.back.specs.map((spec, idx) => {
              const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
              // Same 4-color cyclic palette as CatalogFlipCard.
              const accentByIndex = [
                'text-[#FFD200]',
                'text-sky-300',
                'text-emerald-300',
                'text-amber-300',
              ]
              const accent = accentByIndex[idx % accentByIndex.length]
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 p-2 text-[11px] text-slate-200"
                >
                  <IconComponent className={`h-3.5 w-3.5 shrink-0 ${accent}`} />
                  <span className="leading-tight">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Action Destination Link */}
          <div className="border-t border-white/10 pt-3">
            <a
              href={item.back.href}
              onClick={handleNavigate}
              className="flex items-center justify-between w-full rounded-lg bg-[#C41230] hover:bg-[#a30f28] text-white px-3 py-2.5 text-[11px] font-bold tracking-wide uppercase transition-colors shadow-lg"
            >
              <span>{item.back.cta}</span>
              <Icons.ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
