import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import {
  Monitor,
  Tv,
  Laptop,
  Printer,
  Battery,
  Projector,
  Hand,
  Speaker,
  TvMinimal,
  Anchor,
  Keyboard,
  Mouse,
  Cable,
  Usb,
  CheckCircle2,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard'

// Category color tokens — soft tinted backgrounds for easy visual
// scanning without being loud. Each tint is a translucent brand
// color paired with a stronger icon stroke.
const CATEGORY_TINTS = {
  computing: { icon: '#103B9B', soft: 'rgba(16,59,155,0.10)' },
  printPower: { icon: '#C41230', soft: 'rgba(196,18,48,0.10)' },
  displaySound: { icon: '#0A1E5C', soft: 'rgba(255,210,0,0.18)' },
  inputStorage: { icon: '#0A1E5C', soft: 'rgba(10,30,92,0.08)' },
}

// Fallback English copy. The translation file overrides these at
// render time; values here exist so the section degrades gracefully
// if a translation key is missing.
const FALLBACK = {
  badge: 'Hardware & Solutions Matrix',
  heading: 'Institutional IT Equipment Portfolio',
  subheading:
    'A single-source catalog for classrooms, offices, and zila parishad schools — every item is or can be included in stock, configured and made ready to deploy.',
  footnote: {
    eyebrow: 'No subscriptions. No vendor lock-in.',
    line1:
      'Every device is pre-flashed with our tamper-proof firmware — boot screens display your institution’s crest, statutory grant compliance is signed at the hardware level, and the asset survives any drive wipe or OS re-installation.',
  },
}

// Static product catalog. Lives at module scope (not inside the
// component) so React doesn't re-create the array on each render.
// The translation file overrides this when the active locale
// provides products[].
const FALLBACK_PRODUCTS = [
  // COMPUTING (3)
  { iconKey: 'monitor', tintKey: 'computing', title: 'Desktop Computer',
    subtitle: 'Tower PC for offices, libraries, and computer labs.',
    tags: ['Tower', 'Office'] },
  { iconKey: 'tv', tintKey: 'computing', title: 'All-in-one PC',
    subtitle: 'Built-in display, fewer cables on the desk.',
    tags: ['Compact', 'All-in-one'] },
  { iconKey: 'laptop', tintKey: 'computing', title: 'Laptops',
    subtitle: 'Portable machines for staff and field visits.',
    tags: ['Portable', 'Staff'] },

  // PRINT & POWER (3)
  { iconKey: 'printer', tintKey: 'printPower', title: 'Printers',
    subtitle: 'Single-function black-and-white document printers.',
    tags: ['B/W', 'A4'] },
  { iconKey: 'printer', tintKey: 'printPower', title: 'Multi-function Printers',
    subtitle: 'Print, scan, and copy from one shared machine.',
    tags: ['Scan', 'Copy'] },
  { iconKey: 'battery', tintKey: 'printPower', title: 'UPS Systems',
    subtitle: 'Backup power that keeps the class running through cuts.',
    tags: ['Backup', 'Surge-safe'] },

  // DISPLAY & SOUND (5)
  { iconKey: 'projector', tintKey: 'displaySound', title: 'LED Projectors',
    subtitle: 'Bright classroom projection visible in lit rooms.',
    tags: ['LED', 'Long-throw'] },
  { iconKey: 'hand', tintKey: 'displaySound', title: 'Interactive Panels',
    subtitle: 'Google-certified 4K touch displays for smart classrooms.',
    tags: ['4K', 'Touch', 'EDLA'] },
  { iconKey: 'speaker', tintKey: 'displaySound', title: 'Sound Systems',
    subtitle: '2.1 home-theatre audio — two speakers plus a woofer.',
    tags: ['2.1', 'Woofer'] },
  { iconKey: 'tvMinimal', tintKey: 'displaySound', title: 'Projector Screens',
    subtitle: 'Pull-down or fixed-frame projection surfaces.',
    tags: ['Matte White'] },
  { iconKey: 'anchor', tintKey: 'displaySound', title: 'Ceiling-mounting Kits',
    subtitle: 'Heavy-duty brackets for safely hanging projectors.',
    tags: ['Steel', 'Universal'] },

  // INPUT & STORAGE (4)
  { iconKey: 'keyboard', tintKey: 'inputStorage', title: 'Keyboards',
    subtitle: 'Wired spill-resistant keyboards for daily use.',
    tags: ['Spill-safe'] },
  { iconKey: 'mouse', tintKey: 'inputStorage', title: 'Mice',
    subtitle: 'Optical mice and pointing devices.',
    tags: ['Optical'] },
  { iconKey: 'cable', tintKey: 'inputStorage', title: 'Computer Accessories',
    subtitle: 'Cables, hubs, adapters, and small add-ons.',
    tags: ['Cables', 'Adapters'] },
  { iconKey: 'usb', tintKey: 'inputStorage', title: 'Pen-drives (Digital Syllabus)',
    subtitle: 'Pre-loaded syllabus drives for offline classrooms.',
    tags: ['Offline-ready'] },
]

// Icon registry — keeps the product entries decoupled from the
// import block above. Add a key here to support a new product icon.
const ICON_MAP = {
  monitor: Monitor,
  tv: Tv,
  laptop: Laptop,
  printer: Printer,
  battery: Battery,
  projector: Projector,
  hand: Hand,
  speaker: Speaker,
  tvMinimal: TvMinimal,
  anchor: Anchor,
  keyboard: Keyboard,
  mouse: Mouse,
  cable: Cable,
  usb: Usb,
}

export default function ProductGallery() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const footnoteRef = useRef(null)

  // Resolve localized strings — use the gallery.* block if present,
  // otherwise fall back to the English constants above.
  const lang = t('gallery') || {}
  const badge = lang.badge ?? FALLBACK.badge
  const heading = lang.heading ?? FALLBACK.heading
  const subheading = lang.subheading ?? FALLBACK.subheading
  const footnoteEyebrow = lang.footnote?.eyebrow ?? FALLBACK.footnote.eyebrow
  const footnoteLine1 = lang.footnote?.line1 ?? FALLBACK.footnote.line1

  // 15 products. Each card has: an Icon component (Lucide), a tint
  // key, a title, a 1-line subtitle in plain language, and short tag
  // chips. The shape mirrors gallery.products[] in the translation
  // file.
  const products = (lang.products ?? FALLBACK_PRODUCTS).map((p) => ({
    ...p,
    Icon: ICON_MAP[p.iconKey] ?? Monitor,
    tint: CATEGORY_TINTS[p.tintKey] ?? CATEGORY_TINTS.computing,
  }))

  // Scroll reveal — subtle, respecting prefers-reduced-motion.
  // Header stagger, card stagger, footnote fade. All animations are
  // compositor-only: opacity + translate3d.
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

          // Grid cards — staggered reveal, 60ms per card so the
          // left-to-right read feels intentional
          const cards = gridRef.current?.querySelectorAll('[data-card]') ?? []
          gsap.from(cards, {
            opacity: 0,
            y: 18,
            duration: 0.4,
            ease: 'power1.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          })

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
      className="relative w-full bg-[#FAFBFE] py-20 sm:py-24 lg:py-28 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <div
            data-reveal="header"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD200]/15 border border-[#FFD200]/40 mb-5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0A1E5C]" />
            <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#0A1E5C]">
              {badge}
            </span>
          </div>
          <h2
            data-reveal="header"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E5C] leading-[1.1] tracking-tight mb-4"
          >
            {heading}
          </h2>
          <p
            data-reveal="header"
            className="text-base sm:text-lg text-[#3A4565] leading-relaxed max-w-2xl"
          >
            {subheading}
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5"
        >
          {products.map((p) => {
            const Icon = p.Icon
            const tint = p.tint
            return (
              <SpotlightCard
                key={p.title}
                spotlightColor={`${tint.icon}33`}
                className="group flex flex-col gap-3 p-4 sm:p-5 bg-white border border-[#E3E7F0] hover:border-[#0A1E5C]/40 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0A1E5C]/10 rounded-2xl h-full"
              >
                <div data-card className="flex flex-col gap-3 h-full">
                  {/* Icon block — soft tinted square with the lucide icon */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: tint.soft }}
                    aria-hidden="true"
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: tint.icon, strokeWidth: 1.8 }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0A1E5C] leading-tight">
                    {p.title}
                  </h3>

                  {/* Plain-language subtitle */}
                  <p className="text-[0.7rem] sm:text-xs text-[#5A6781] leading-snug">
                    {p.subtitle}
                  </p>

                  {/* Spec chips — small grey tags */}
                  <div className="mt-auto flex flex-wrap gap-1 pt-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.625rem] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-[#F1F4FA] text-[#5A6781]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            )
          })}
        </div>

        {/* FOOTNOTE BAND — single quiet callout about firmware */}
        <div
          ref={footnoteRef}
          className="mt-14 lg:mt-16 mx-auto max-w-4xl rounded-2xl border border-[#0A1E5C]/15 bg-gradient-to-br from-white to-[#F4F6FC] px-6 py-7 sm:px-8 sm:py-8 shadow-sm"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0A1E5C]/8 border border-[#0A1E5C]/20 mb-3">
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#0A1E5C]">
              {footnoteEyebrow}
            </span>
          </div>
          <p className="text-sm sm:text-base text-[#3A4565] leading-relaxed">
            {footnoteLine1}
          </p>
        </div>
      </div>
    </section>
  )
}
