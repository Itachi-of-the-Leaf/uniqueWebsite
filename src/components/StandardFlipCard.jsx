// StandardFlipCard — compact 2x2-grid card variant for the 4
// non-spotlight catalog items (computing, printers, ups-systems,
// peripherals). Used alongside `CatalogFlipCard` (the full-width
// spotlight variant for Interactive Panels + Projectors) inside
// `ProductGallery.jsx`.
//
// VISUAL HIERARCHY: these cards are deliberately smaller and
// quieter than the two featured showcase cards (560-600 px tall,
// full image stage, 5-pill tree). The standard cards live at
// h-[340px] — well under half the featured cards' height — so
// the reader's eye lands on the spotlight pair first. They
// read as supporting evidence, not co-equal entries.
//
// Front face layout (compact):
//   • Top: small tier tag pill (left-aligned, no flip-hint
//     duplicated here — the divider at the bottom carries it).
//   • Middle: a smaller image stage (~38% of card height)
//     with the front image at object-contain so the new
//     ImageCompute / ImagePrinters / ImageUPS /
//     ImagePeripherals assets show without cropping.
//   • Below the stage: compact pill tree of up to 5 badges
//     (driven by `front.badges` on the catalog entry). Each
//     pill is small (text-[10px]) so the four pills stack
//     tightly. Hidden when the entry has no badges.
//   • Bottom: title + hand-pointer hint inside the divider.
//
// Back face layout (unchanged):
//   • Sky-blue eyebrow + title + 2-col spec grid + crimson CTA.
//     Every standard card uses the spec grid because none of
//     them carry `back.videos`.
import { useState } from 'react'
import * as Icons from 'lucide-react'

// Inline Google "G" mark — duplicated locally because
// StandardFlipCard is a separate module from CatalogFlipCard
// and we don't want to share component state across cards.
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

export default function StandardFlipCard({ item }) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Click on the CTA must NOT toggle the flip — it must navigate.
  const handleNavigate = (e) => {
    e.stopPropagation()
  }

  const hasBadges = Array.isArray(item.front.badges) && item.front.badges.length > 0

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
      className="group relative w-full h-[340px] md:h-[360px] cursor-pointer [perspective:1400px] select-none"
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#0B1B4F] border border-white/15 p-4 md:p-5 flex flex-col overflow-hidden shadow-xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] subpixel-antialiased">
          {/* Top tier tag */}
          <div className="flex items-center justify-between shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.14em] uppercase bg-white/[0.06] border border-white/15 text-slate-300">
              <Icons.Tag className="h-3 w-3" aria-hidden="true" />
              <span>{item.front.tag}</span>
            </span>
          </div>

          {/* Image stage — compact, ~36% of card height.
              Object-contain so the image shows without
              cropping. Smaller than the featured cards' stage
              to reinforce visual hierarchy. */}
          <div className="relative mt-3 h-[36%] w-full rounded-lg bg-gradient-to-b from-[#071033] via-[#0B1B4F] to-[#071033] ring-1 ring-white/15 overflow-hidden shrink-0">
            <div className="absolute inset-1.5 rounded-md bg-slate-950 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
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
          </div>

          {/* Pill tree — compact gradient badges down a
              vertical trunk. Smaller pills than the featured
              cards (text-[10px] / px-2.5 py-0.5) so 4 rows
              fit cleanly in the remaining card height
              without crowding the title. */}
          {hasBadges && (
            <ul
              className="mt-3 relative pl-3 border-l-2 border-white/20 space-y-1.5 shrink-0"
              role="list"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD200] ring-2 ring-[#0B1B4F]"
              />
              {item.front.badges.map((badge) => {
                const Icon = badge.icon ? Icons[badge.icon] : null
                return (
                  <li
                    key={badge.label}
                    className={`relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border bg-gradient-to-r ${badge.gradient} ${badge.borderColor} ${badge.textColor}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-[12px] h-px bg-white/20"
                    />
                    {badge.customIcon === 'google-g' ? (
                      <GoogleGIcon className="w-3 h-3 shrink-0" />
                    ) : Icon ? (
                      <Icon
                        className={`w-3 h-3 shrink-0 ${badge.iconColor}`}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span>{badge.label}</span>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Bottom title + hand-pointer hint */}
          <div className="pt-2 mt-auto border-t border-white/10 shrink-0">
            <h3 className="text-sm font-extrabold text-white tracking-tight leading-tight">
              {item.front.title}
            </h3>
            <p className="mt-1 text-[10px] text-slate-400 font-medium flex items-center gap-1.5">
              <Icons.Hand className="h-3 w-3 text-[#FFD200]" aria-hidden="true" />
              <span>{item.front.hint || 'Tap to reveal institutional specifications ↻'}</span>
            </p>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#071233] border border-white/20 p-4 md:p-5 flex flex-col overflow-hidden shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] subpixel-antialiased">
          {/* Top Eyebrow & Dismiss */}
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

            <h4 className="mt-2 text-sm md:text-base font-bold text-white tracking-tight leading-snug">
              {item.back.title}
            </h4>
          </div>

          {/* Specification Badges Grid — 2 cols */}
          <div className="grid grid-cols-2 gap-2 mt-2">
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
                  className="flex items-center gap-1.5 rounded-md bg-white/[0.04] border border-white/10 p-1.5 text-[10px] text-slate-200"
                >
                  <IconComponent className={`h-3 w-3 shrink-0 ${accent}`} />
                  <span className="leading-tight">{spec.label}</span>
                </div>
              )
            })}
          </div>

          {/* Action Destination Link */}
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
