// StandardFlipCard — compact 2x2-grid card variant for the 4
// non-spotlight catalog items (computing, printers, ups-systems,
// peripherals). Used alongside `CatalogFlipCard` (the full-width
// spotlight variant for Interactive Panels + Projectors) inside
// `ProductGallery.jsx`.
//
// VISUAL HIERARCHY: these cards are deliberately smaller and
// quieter than the two featured showcase cards (560 px tall,
// full image stage, 5-pill tree). The standard cards live at
// h-[360px] — well under the featured cards' height — so the
// reader's eye lands on the spotlight pair first. They read as
// supporting evidence, not co-equal entries.
//
// Front face layout:
//   • Top: tier tag pill.
//   • Middle: square 1:1 image stage (no letterbox — image
//     fills the square via object-cover).
//   • Below the stage: 4 gradient badges rendered as a
//     symmetrical 2×2 grid (so the four cards are visually
//     identical regardless of badge-label length).
//   • Bottom: title + hand-pointer hint inside the divider.
//
// Back face layout:
//   • Eyebrow chip + title.
//   • Brands roster (chip row) — fills the vertical gap that
//     would otherwise sit between title and spec grid.
//   • 2-col spec grid (4 icons).
//   • Crimson CTA pinned to the bottom with mt-auto.
import { useState } from 'react'
import * as Icons from 'lucide-react'

// Color-token → Tailwind class map. Each entry packs the four
// properties the pill needs (gradient / border / text / icon) so
// the catalog data file can stay compact
//   `badges: [{ label, icon, color }]`
// and the component does the visual styling here. Keep the
// brand palette consistent with the featured cards above.
const BADGE_TOKENS = {
  sky: {
    gradient: 'from-sky-950/80 to-blue-900/60',
    border: 'border-sky-400/50',
    text: 'text-sky-200',
    icon: 'text-sky-400',
  },
  blue: {
    gradient: 'from-slate-900/90 to-blue-950/70',
    border: 'border-blue-400/50',
    text: 'text-blue-200',
    icon: 'text-blue-400',
  },
  emerald: {
    gradient: 'from-emerald-950/80 to-teal-900/60',
    border: 'border-emerald-400/50',
    text: 'text-emerald-200',
    icon: 'text-emerald-400',
  },
  amber: {
    gradient: 'from-amber-950/60 to-yellow-900/50',
    border: 'border-amber-400/60',
    text: 'text-amber-200',
    icon: 'text-amber-400',
  },
  gold: {
    gradient: 'from-amber-950/70 to-yellow-900/50',
    border: 'border-[#FFD200]/50',
    text: 'text-[#FFD200]',
    icon: 'text-[#FFD200]',
  },
  purple: {
    gradient: 'from-indigo-950/80 to-purple-900/60',
    border: 'border-indigo-400/50',
    text: 'text-indigo-200',
    icon: 'text-indigo-400',
  },
  slate: {
    gradient: 'from-slate-900/90 to-slate-800/70',
    border: 'border-slate-400/50',
    text: 'text-slate-200',
    icon: 'text-slate-300',
  },
}

function resolveBadgeColor(color) {
  return BADGE_TOKENS[color] || BADGE_TOKENS.sky
}

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
      className="group relative w-full h-[380px] cursor-pointer [perspective:1400px] select-none"
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#0B1B4F] border border-white/15 p-4 flex flex-col overflow-hidden shadow-xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">
          {/* Top tier tag */}
          <div className="flex items-center justify-between shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase bg-white/[0.06] border border-white/15 text-slate-300">
              <Icons.Tag className="h-3 w-3" aria-hidden="true" />
              <span>{item.front.tag}</span>
            </span>
          </div>

          {/* Image stage — fixed cap of 168px so the image
              stays a balanced header visual instead of
              ballooning to fill the card (which is what
              object-cover + aspect-square did on a wide
              card, blowing up close-ups and pushing the
              title/badges/CTA off-screen).
              object-contain lets the full product lineup
              fit cleanly without cropping. The stage is
              width-stretched so each image is centered in
              the same horizontal track across all 4 cards
              in the 2×2 grid. */}
          <div className="relative mt-2.5 h-[168px] w-full rounded-lg bg-gradient-to-b from-[#071033] via-[#0B1B4F] to-[#071033] ring-1 ring-white/15 overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src={item.front.image}
              alt={item.front.title}
              className="max-w-full max-h-full w-auto h-auto object-contain"
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

          {/* Pill grid — 2×2 symmetrical layout so each card
              looks identical regardless of badge label
              length. Replaces the previous vertical 1×4 stack
              that broke alignment when some labels were
              longer than others. */}
          {hasBadges && (
            <ul
              className="mt-2.5 grid grid-cols-2 gap-1.5 shrink-0"
              role="list"
            >
              {item.front.badges.map((badge) => {
                const Icon = badge.icon ? Icons[badge.icon] : null
                const tok = resolveBadgeColor(badge.color)
                return (
                  <li
                    key={badge.label}
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-semibold tracking-wide border bg-gradient-to-r ${tok.gradient} ${tok.border} ${tok.text} leading-tight min-h-[26px]`}
                  >
                    {Icon ? (
                      <Icon
                        className={`w-3 h-3 shrink-0 ${tok.icon}`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="truncate">{badge.label}</span>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Bottom title + hand-pointer hint */}
          <div className="pt-2 mt-auto border-t border-white/10 shrink-0">
            <h3 className="text-[13px] font-extrabold text-white tracking-tight leading-tight">
              {item.front.title}
            </h3>
            <p className="mt-0.5 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
              <Icons.Hand className="h-3 w-3 text-[#FFD200]" aria-hidden="true" />
              <span>{item.front.hint || 'Tap to reveal institutional specifications ↻'}</span>
            </p>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#071233] border border-white/20 p-4 flex flex-col overflow-hidden shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Top eyebrow + dismiss */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase bg-sky-400/10 border border-sky-400/30 text-sky-300">
                <Icons.BadgeCheck className="h-3 w-3" aria-hidden="true" />
                <span>{item.back.eyebrow}</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                ✕ Return
              </span>
            </div>
            <h4 className="mt-2 text-[13px] font-bold text-white tracking-tight leading-snug">
              {item.back.title}
            </h4>
          </div>

          {/* Brand roster — chip row of OEM / brand names.
              Fills the vertical gap between the title and the
              spec grid. flex-wrap so a long roster (e.g. 7
              names) wraps gracefully onto a second line. */}
          {hasBrands && (
            <div className="mt-2">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-slate-400/80 mb-1.5">
                {item.back.brandsTitle || 'SUPPORTED BRANDS'}
              </p>
              <ul className="flex flex-wrap gap-1" role="list">
                {item.back.brands.map((brand) => (
                  <li
                    key={brand}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-white/[0.06] border border-white/15 text-slate-100"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specification grid — 2 cols, 4 rows of specs */}
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {item.back.specs.map((spec, idx) => {
              const IconComponent = Icons[spec.icon] || Icons.CheckCircle2
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
                  className="flex items-start gap-1.5 rounded-md bg-white/[0.04] border border-white/10 p-1.5 text-[10px] text-slate-200 leading-snug"
                >
                  <IconComponent className={`h-3 w-3 shrink-0 mt-0.5 ${accent}`} />
                  <span className="leading-tight">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Crimson CTA — pinned to bottom with mt-auto so
              the back face has no dead space below it. */}
          <div className="border-t border-white/10 pt-2 mt-auto">
            <a
              href={item.back.href}
              onClick={handleNavigate}
              className="flex items-center justify-between w-full rounded-md bg-[#C41230] hover:bg-[#a30f28] text-white px-2.5 py-2 text-[10px] font-bold tracking-wide uppercase transition-colors shadow-lg"
            >
              <span>{item.back.cta}</span>
              <Icons.ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
