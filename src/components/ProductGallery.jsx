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
  ArrowUpRight,
} from 'lucide-react'

// Icon registry — kept at module scope so React doesn't re-create
// the map each render. Add a key here to support a new category.
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

// Fallback English copy. The translation file overrides these at
// render time; values here exist so the section degrades gracefully
// if a translation key is missing.
const FALLBACK = {
  badge: 'Hardware & Solutions Matrix',
  heading: 'Institutional IT Equipment Portfolio',
  subheading:
    'A single-source catalog for classrooms, offices, and zila parishad schools — every item is or can be included in stock, configured and made ready to deploy.',
  // 7 categories, split into 2 visual tiers. Tier 1 = featured
  // (2 cards, wider layout), Tier 2 = standard (5 cards, 3-col
  // grid). Each navigates to its href on click.
  categories: [
    // ─── Tier 1 — Featured classroom display ─────────────────
    {
      tier: 1,
      href: '/catalog/interactive-panels',
      iconKey: 'hand',
      title: 'Interactive Flat Panels',
      description:
        'Google-certified 4K anti-glare touch displays with integrated digital chalkboard software. Built for full-day smart-classroom sessions in lit rooms.',
      badges: ['4K Anti-Glare', 'EDLA Certified', 'Zero-Bandwidth'],
      cta: 'Explore Models & Bundles',
    },
    {
      tier: 1,
      href: '/catalog/projectors',
      iconKey: 'projector',
      title: 'Projectors & Rigging',
      description:
        'Ceiling-mounted LED projection bundles with screens, audio, and USB pen-drive playback. Sized to fit standard ZP grant caps.',
      badges: [
        'Ceiling Rigging Included',
        'Screens & Audio',
        'USB Pen-Drive Playback',
      ],
      cta: 'Explore Models & Rigging Kits',
    },
    // ─── Tier 2 — Institutional infrastructure ──────────────
    {
      tier: 2,
      href: '/catalog/desktops',
      iconKey: 'tv',
      title: 'Desktop Computers & All-in-Ones',
      description:
        'Tower desktops for offices and computer labs, plus space-saving all-in-ones for admin desks and reception counters.',
      tags: ['Tower', 'All-in-one', 'Office'],
    },
    {
      tier: 2,
      href: '/catalog/laptops',
      iconKey: 'laptop',
      title: 'Laptops & Mobile Workstations',
      description:
        'Portable machines for staff, field visits, and admin mobility. Pre-imaged with the institutional firmware stack.',
      tags: ['Portable', 'Staff', 'Field'],
    },
    {
      tier: 2,
      href: '/catalog/printers',
      iconKey: 'printer',
      title: 'Printers & MFD Units',
      description:
        'Single-function B/W document printers and multi-function print-scan-copy units for shared office pools.',
      tags: ['B/W', 'A4', 'Scan & Copy'],
    },
    {
      tier: 2,
      href: '/catalog/ups-systems',
      iconKey: 'battery',
      title: 'UPS & Power Backup Systems',
      description:
        'Backup power that keeps the class running through cuts. Sized for classroom loads, computer labs, and admin networks.',
      tags: ['Backup', 'Surge-safe'],
    },
    {
      tier: 2,
      href: '/catalog/accessories',
      iconKey: 'usb',
      title: 'Computer Accessories & Syllabus Media',
      description:
        'Bundled mice, keyboards, cables, hubs, and pre-loaded syllabus pen-drives for offline-first classroom delivery.',
      tags: ['Mice', 'Keyboards', 'Pen-drives'],
    },
  ],
  footnote: {
    eyebrow: 'No subscriptions. No vendor lock-in.',
    line1:
      'Every device is pre-flashed with our tamper-proof firmware — boot screens display your institution\u2019s crest, statutory grant compliance is signed at the hardware level, and the asset survives any drive wipe or OS re-installation.',
  },
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

  // 7 categories resolved with their Icon components. tier 1 splits
  // off the first 2 (featured); tier 2 holds the remaining 5.
  const categories = (lang.categories ?? FALLBACK.categories).map((c) => ({
    ...c,
    Icon: ICON_MAP[c.iconKey] ?? Monitor,
  }))
  const tier1 = categories.filter((c) => c.tier === 1)
  const tier2 = categories.filter((c) => c.tier === 2)

  // Click handler — until catalog routes are scaffolded, prevent
  // broken-link jumps by suppressing the default anchor navigation
  // for the placeholder /catalog/* paths. When real routes exist,
  // remove this handler (or replace with React Router's <Link>)
  // and the cards will navigate normally.
  const handleNav = (e, href) => {
    // Placeholder routes that don't yet exist as pages. We log a
    // console hint so the dev knows the click was received, but
    // we don't throw a runtime error or a 404 navigation.
    if (href.startsWith('/catalog/')) {
      e.preventDefault()
      // eslint-disable-next-line no-console
      console.info(
        `[ProductGallery] Catalog route "${href}" is not yet scaffolded. ` +
          'Add a route + page in App.jsx to enable navigation.',
      )
    }
  }

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

        {/* CATEGORY GRID */}
        <div ref={gridRef} className="flex flex-col gap-6">
          {/* ─── TIER 1 — Featured classroom display (2-col) ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tier1.map((c) => {
              const Icon = c.Icon
              return (
                <a
                  key={c.href}
                  href={c.href}
                  onClick={(e) => handleNav(e, c.href)}
                  data-card
                  className="group relative rounded-2xl bg-white dark:bg-[#0B1B4F]/40 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 sm:p-7 lg:p-8 shadow-sm hover:shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col gap-5 cursor-pointer"
                >
                  {/* Top bar: icon on the left, ArrowUpRight on the right */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy/5 dark:bg-white/10 text-brand-navy dark:text-[#FFD200] flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <Icon className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 text-brand-navy/60 dark:text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-[#0B1B4F] dark:text-white mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      {c.description}
                    </p>
                  </div>

                  {/* Pill badges highlighting bundled equipment */}
                  <div className="flex flex-wrap gap-2">
                    {c.badges.map((b) => (
                      <span
                        key={b}
                        className="text-xs font-semibold bg-brand-navy/5 dark:bg-white/10 text-brand-navy dark:text-white px-2.5 py-1 rounded-md"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div className="mt-auto pt-2 text-sm font-bold text-brand-navy dark:text-[#FFD200] inline-flex items-center gap-1">
                    {c.cta}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
                  </div>
                </a>
              )
            })}
          </div>

          {/* ─── TIER 2 — Institutional infrastructure (3-col) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tier2.map((c) => {
              const Icon = c.Icon
              return (
                <a
                  key={c.href}
                  href={c.href}
                  onClick={(e) => handleNav(e, c.href)}
                  data-card
                  className="group relative rounded-2xl bg-white dark:bg-[#0B1B4F]/40 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 shadow-sm hover:shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[14rem]"
                >
                  {/* Top bar: icon + ArrowUpRight */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-navy/5 dark:bg-white/10 text-brand-navy dark:text-[#FFD200] flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <Icon className="w-6 h-6" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 text-brand-navy/60 dark:text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-lg font-bold text-[#0B1B4F] dark:text-white mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      {c.description}
                    </p>
                  </div>

                  {/* Bottom-aligned spec chips */}
                  <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
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
