import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'

// Fallback English copy for the hero block. The translation file
// overrides these at render time; values here exist so the section
// degrades gracefully if a translation key is missing.
const FALLBACK = {
  establishedBadge: 'Since 1998...',
  titlePart1: 'Empowering Rural Schools With',
  titlePart2: 'Affordable Digital Learning',
  subtitle:
    'Pioneering rugged, offline eLearning setups across 150+ Zilla Parishad schools in Raigad & Ratnagiri since 2014—engineered to operate within standard grant limits.',
  overlayLocation: 'ZP School · Konkan Division · Raigad',
  // Alt text for the projector-in-action image.
  overlayAlt:
    'Rugged LED ceiling-mounted projector deployed in a Konkan Zilla Parishad classroom, with regional taluka names written on the blackboard beneath',
  stats: [
    {
      value: '150+',
      label: 'Schools Digitized',
      detail: 'Across Raigad & Ratnagiri districts',
    },
    {
      value: '₹25,000',
      label: 'Benchmark',
      detail: 'Engineered for ZP grant limits',
    },
    {
      value: '100%',
      label: 'Offline Capable',
      detail: 'Zero internet dependency',
    },
    {
      value: '4K',
      label: 'Next-Gen Ecosystems',
      detail: 'Interactive anti-glare flat panels',
    },
  ],
}

export default function HeroSection() {
  const { t } = useLanguage()
  const rootRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const metricsRef = useRef(null)
  const showcaseRef = useRef(null)

  // Resolve localized strings — use the hero.* block if present,
  // otherwise fall back to the English constants above.
  const hero = t('hero') || {}
  const establishedBadge =
    hero.establishedBadge ?? FALLBACK.establishedBadge
  const titlePart1 = hero.titlePart1 ?? FALLBACK.titlePart1
  const titlePart2 = hero.titlePart2 ?? FALLBACK.titlePart2
  // Build the subtitle from the hero block if `subtitlePrefix` etc.
  // exist (legacy structure); otherwise fall back to the literal
  // `subtitle` string set above. The hero block in translations.js
  // now also exposes a single `subtitle` key for the simpler form.
  const subtitle =
    hero.subtitle ??
    (hero.subtitlePrefix
      ? `${hero.subtitlePrefix}${hero.schoolsHighlight ?? ''}${
          hero.subtitleMiddle ?? ''
        }${hero.priceHighlight ?? ''}${hero.subtitleSuffix ?? ''}`
      : FALLBACK.subtitle)
  const overlayEyebrow = hero.overlayEyebrow ?? FALLBACK.overlayEyebrow
  const overlayLocation = hero.overlayLocation ?? FALLBACK.overlayLocation
  const overlayAlt = hero.overlayAlt ?? FALLBACK.overlayAlt
  // Prefer `hero.stats` (already localized in translations.js). Fall
  // back to the local English constants.
  const metrics = Array.isArray(hero.stats) && hero.stats.length > 0
    ? hero.stats
    : FALLBACK.stats

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Compositor-only entry choreography: opacity + translate3d only.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(headlineRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          metricsRef.current?.children ?? [],
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.08,
          },
          '-=0.4'
        )
        .from(
          showcaseRef.current,
          {
            opacity: 0,
            scale: 0.96,
            duration: 0.9,
          },
          '-=0.6'
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-b from-canvas via-surface to-canvas pt-24 pb-16 lg:pt-32 lg:pb-24 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        {/* Headline + Subtitle */}
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border border-sky-200 bg-sky-50 text-sky-800 dark:border-[#FFD200]/30 dark:bg-[#FFD200]/10 dark:text-[#FFD200] mb-6">
            <span className="inline-block size-2 sm:size-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
            {establishedBadge}
          </p>

          <h1
            ref={headlineRef}
            className="text-[#0B1B4F] dark:text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="block">{titlePart1}</span>
            <span className="block bg-gradient-to-r from-[#FFD200] via-amber-300 to-orange-400 dark:from-[#FFD200] dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent">
              {titlePart2}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed lg:text-lg"
          >
            {subtitle}
          </p>

          {/* Trust Metric Strip */}
          <div
            ref={metricsRef}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="card-night flex h-full flex-col justify-between rounded-2xl border border-brand-navy/10 dark:border-white/15 bg-white/85 dark:bg-white/[0.06] p-5 backdrop-blur"
              >
                <div>
                  <p className="font-heading text-2xl text-brand-navy dark:text-white lg:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-crimson">
                    {metric.label}
                  </p>
                </div>
                <p className="mt-4 border-t border-brand-navy/10 dark:border-white/10 pt-3 text-xs leading-snug text-brand-navy/70 dark:text-slate-300">
                  {metric.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Visual Showcase: Glass-framed classroom proof point */}
        <div ref={showcaseRef} className="lg:col-span-5">
          <div className="relative">
            {/* Glass frame */}
            <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-3xl bg-gradient-to-br from-brand-cobalt/15 to-brand-crimson/15 blur-xl" />
            <div className="card-night relative overflow-hidden rounded-3xl border border-white/40 dark:border-white/15 bg-white/30 dark:bg-white/[0.06] p-3 backdrop-blur-md">
              {/* Generous landscape frame so the projector ceiling mount, full chassis,
                  and the blackboard beneath it (Konkan taluka names) all stay visible. */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-midnight">
                <img
                  src="/Projector_in_action.jpeg"
                  alt={overlayAlt}
                  className="absolute inset-0 size-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/70 to-transparent p-5 text-white">
                  {overlayEyebrow && (
                    <p
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-gold"
                      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                    >
                      {overlayEyebrow}
                    </p>
                  )}
                  <p
                    className={`text-sm font-medium ${overlayEyebrow ? 'mt-1' : ''}`}
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                  >
                    {overlayLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
