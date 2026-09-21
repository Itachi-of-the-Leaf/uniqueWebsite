import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import { CheckCircle2 } from 'lucide-react'
import CatalogFlipCard from './CatalogFlipCard'
import StandardFlipCard from './StandardFlipCard'
import { HARDWARE_CATALOG } from '../data/hardwareCatalog'

gsap.registerPlugin(ScrollTrigger)

// Fallback English copy for the section header + footnote band.
// The translation file overrides these at render time; values
// here exist so the section degrades gracefully if a translation
// key is missing.
const FALLBACK = {
  badge: 'Hardware & Solutions Matrix',
  heading: 'Institutional IT Equipment Portfolio',
  subheading:
    'A single-source catalog for classrooms, offices, and zila parishad schools — every item is or can be included in stock, configured and made ready to deploy.',
  footnote: {
    eyebrow: 'No subscriptions. No vendor lock-in.',
    line1:
      'Every device is pre-flashed with our tamper-proof firmware — boot screens display your institution\u2019s crest, statutory grant compliance is signed at the hardware level, and the asset survives any drive wipe or OS re-installation.',
  },
}

export default function ProductGallery() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const footnoteRef = useRef(null)

  // Resolve localized strings — use the gallery.* block if present,
  // otherwise fall back to the English constants above.
  const lang = t('gallery') || {}
  const badge = lang.badge ?? FALLBACK.badge
  const heading = lang.heading ?? FALLBACK.heading
  const subheading = lang.subheading ?? FALLBACK.subheading
  const footnoteEyebrow = lang.footnote?.eyebrow ?? FALLBACK.footnote.eyebrow
  const footnoteLine1 = lang.footnote?.line1 ?? FALLBACK.footnote.line1

  // Scroll reveal — header + footnote only. The cards are
  // intentionally NOT GSAP-animated: a `gsap.from(cards, ...)`
  // with ScrollTrigger can leave them at opacity 0 on hard
  // refresh if the trigger fails to fire, trapping them invisible
  // in the DOM. Cards render at full opacity via Tailwind
  // (opacity-100) and rely on the CatalogFlipCard's native CSS
  // hover/transition behavior.
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add(
        { isMotionOK: '(prefers-reduced-motion: no-preference)' },
        () => {
          // Header reveal — eyebrow, title, subhead fade in slightly
          // staggered so the eye scans naturally
          gsap.from(
            sectionRef.current.querySelectorAll('[data-reveal="header"]'),
            {
              opacity: 0,
              y: 14,
              duration: 0.45,
              ease: 'power1.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )

          // Footnote line — single quiet fade
          gsap.from(footnoteRef.current, {
            opacity: 0,
            y: 12,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: footnoteRef.current,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full bg-canvas-deep py-20 sm:py-24 lg:py-28 px-5 sm:px-8 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <div
            data-reveal="header"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-[#FFD200]/30 bg-[#FFD200]/10 text-[#FFD200] mb-4"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD200]" />
            <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#FFD200]">
              {badge}
            </span>
          </div>
          <h2
            data-reveal="header"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B4F] dark:text-white tracking-tight mb-4"
          >
            {heading}
          </h2>
          <p
            data-reveal="header"
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-12"
          >
            {subheading}
          </p>
        </div>

        {/* CATEGORY GRID — split layout. Items with
            `featured: true` (Interactive Flat Panels +
            Projectors) render as full-width spotlight cards
            in a vertical stack; the rest render as compact
            square cards in a 3-column grid below. Both card
            types share the same flip-on-click behavior and
            reveal the institutional back face on flip. */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8">
          {/* Spotlight cards — full-width single-row showcase */}
          <div className="flex flex-col gap-10 lg:gap-12">
            {HARDWARE_CATALOG.filter((item) => item.featured).map((item) => (
              <CatalogFlipCard key={item.id} item={item} />
            ))}
          </div>

          {/* Standard cards — compact 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {HARDWARE_CATALOG.filter((item) => !item.featured).map((item) => (
              <StandardFlipCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* FOOTNOTE BAND — single quiet callout about firmware */}
        <div
          ref={footnoteRef}
          className="card-night mt-14 lg:mt-16 mx-auto max-w-4xl rounded-2xl border border-[#0A1E5C]/15 dark:border-white/10 bg-gradient-to-br from-white to-[#F4F6FC] dark:from-white/[0.06] dark:to-[#0B1336] px-6 py-7 sm:px-8 sm:py-8"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0A1E5C]/8 dark:bg-[#FFD200]/15 border border-[#0A1E5C]/20 dark:border-[#FFD200]/35 mb-3">
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#0A1E5C] dark:text-[#FFD200]">
              {footnoteEyebrow}
            </span>
          </div>
          <p className="text-sm sm:text-base text-brand-navy/70 dark:text-slate-300 leading-relaxed">
            {footnoteLine1}
          </p>
        </div>
      </div>
    </section>
  )
}
