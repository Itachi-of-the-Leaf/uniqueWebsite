import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'

const HERO_METRICS = [
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
]

export default function HeroSection() {
  const { t } = useLanguage()
  const rootRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const metricsRef = useRef(null)
  const showcaseRef = useRef(null)

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
          <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border border-sky-200 bg-sky-50 text-sky-800 dark:border-[#FFD200]/30 dark:bg-[#FFD200]/10 dark:text-[#FFD200] mb-6">
            <span className="inline-block size-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            Established 1998 · Khed, Maharashtra
          </p>

          <h1
            ref={headlineRef}
            className="text-[#0B1B4F] dark:text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="block">Empowering Rural Schools With</span>
            <span className="block bg-gradient-to-r from-[#FFD200] via-amber-300 to-orange-400 dark:from-[#FFD200] dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent">
              Affordable Digital Learning
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed lg:text-lg"
          >
            Pioneering rugged, offline eLearning setups across 150+ Zilla Parishad schools in
            Raigad &amp; Ratnagiri since 2014—engineered to operate within standard grant limits.
          </p>

          {/* Trust Metric Strip */}
          <div
            ref={metricsRef}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {HERO_METRICS.map((metric) => (
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
                  alt="Rugged LED ceiling-mounted projector deployed in a Konkan Zilla Parishad classroom, with regional taluka names written on the blackboard beneath"
                  className="absolute inset-0 size-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/70 to-transparent p-5 text-white">
                  <p
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-gold"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                  >
                    Deployment in Action
                  </p>
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                  >
                    ZP School · Konkan Division · Raigad
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-1 text-[0.65rem] uppercase tracking-[0.18em] text-brand-navy/60 dark:text-slate-300">
                <span>Est. 1998</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                  Verified deployment
                </span>
                <span>Since 2014</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
