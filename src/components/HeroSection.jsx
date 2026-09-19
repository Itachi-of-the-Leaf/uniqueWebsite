import gsap from 'gsap'
import {
  School,
  Zap,
  WifiOff,
  Award,
  ArrowDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard'
import DecryptedText from './DecryptedText'
import BrandSwoosh from './BrandSwoosh'
import { useLanguage } from '../context/LanguageContext'

/* ── Interactive Character with self-resetting ~500ms GSAP elastic spring ── */
function SpringChar({ char, className = '' }) {
  if (char === ' ') return <span>&nbsp;</span>

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -5,
      scale: 1.12,
      skewX: -5,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = (e) => {
    // Self-resetting elastic return to baseline resting position within 500ms
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      skewX: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
  }

  return (
    <span
      className={`inline-block cursor-default select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {char}
    </span>
  )
}

function SpringWord({ word, className = '' }) {
  // Grapheme-aware splitting to preserve Marathi / Devanagari conjuncts & matras
  const characters =
    typeof Intl !== 'undefined' && Intl.Segmenter
      ? Array.from(
          new Intl.Segmenter('mr', { granularity: 'grapheme' }).segment(word)
        ).map((s) => s.segment)
      : word.split('')

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {characters.map((char, i) => (
        <SpringChar key={i} char={char} />
      ))}
    </span>
  )
}

function SpringText({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <SpringWord word={word} />
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const { t } = useLanguage()

  const statIcons = [School, Zap, WifiOff, Award]
  const rawStats = t('hero.stats') || []
  const stats = rawStats.map((item, index) => ({
    ...item,
    icon: statIcons[index] || Award,
  }))

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative pt-12 pb-24 md:pt-18 md:pb-32 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] text-[#081438]">
      {/* Dynamic Ambient Halos for Clean Neutral Canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#103B9B]/8 via-transparent to-transparent pointer-events-none -z-0 blur-3xl" />
      <div className="absolute top-36 -right-20 w-80 h-80 bg-[#C41230]/8 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Region Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#103B9B]/25 text-[#103B9B] text-xs sm:text-sm font-bold shadow-sm">
            <MapPin className="w-4 h-4 text-[#FFD200]" />
            <span className="text-[#081438] font-semibold">{t('hero.beltLabel')}</span>
            <span className="text-[#103B9B] font-bold">{t('hero.beltCities')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200] animate-pulse" />
          </div>
        </div>

        {/* Hero Title & Narrative Subhead */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[#0B1B4F] leading-tight">
            <span className="inline-block">
              <SpringText text={t('hero.titlePart1')} />
            </span>{' '}
            <span className="text-[#103B9B] inline-block whitespace-nowrap">
              <SpringText text={t('hero.titlePart2')} />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-3xl mx-auto">
            {t('hero.subtitlePrefix')}
            <strong className="font-extrabold text-[#103B9B] underline decoration-[#FFD200]">
              {t('hero.schoolsHighlight')}
            </strong>
            {t('hero.subtitleMiddle')}
            <strong className="font-black text-[#C41230]">
              {t('hero.priceHighlight')}
            </strong>
            {t('hero.subtitleSuffix')}
          </p>

          {/* Quick Value Props Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#081438] text-xs font-semibold border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#103B9B]" /> {t('hero.prop1')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#081438] text-xs font-semibold border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#103B9B]" /> {t('hero.prop2')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#081438] text-xs font-semibold border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#103B9B]" /> {t('hero.prop3')}
            </span>
          </div>

          {/* Dual Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#solutions"
              onClick={(e) => handleSmoothScroll(e, '#solutions')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-base shadow-xl shadow-[#C41230]/30 border border-[#FFD200]/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>{t('hero.ctaExplore')}</span>
              <ChevronRight className="w-5 h-5 text-[#FFD200]" />
            </a>
            <a
              href="#journey"
              onClick={(e) => handleSmoothScroll(e, '#journey')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#103B9B] hover:bg-[#0B1B4F] text-white font-bold text-sm border border-[#103B9B]/30 transition-all duration-200 shadow-md hover:-translate-y-0.5"
            >
              <span>{t('hero.ctaJourney')}</span>
            </a>
          </div>
        </div>

        {/* Impact Stat Counter Milestone Buttons */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto items-stretch">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            const targetHref = i % 2 === 0 ? '#journey' : '#solutions'
            return (
              <a
                key={i}
                href={targetHref}
                onClick={(e) => handleSmoothScroll(e, targetHref)}
                className="block text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD200] rounded-3xl h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(16, 59, 155, 0.12)"
                  borderColor="rgba(255, 210, 0, 0.6)"
                  className="p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 bg-white border border-slate-200 hover:border-[#FFD200] hover:shadow-[0_12px_30px_rgba(16,59,155,0.12)] text-[#081438] h-full flex flex-col justify-between"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Top Row: Icon and Milestone Badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-[#103B9B] group-hover:bg-[#C41230] text-[#FFD200] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md border border-[#FFD200]/40 group-hover:scale-105">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0F172A] text-[#FFD200] border border-[#FFD200]/40 shadow-xs">
                          {t('hero.milestonePrefix')}{i + 1}
                        </span>
                      </div>

                      {/* Stat Value & Label */}
                      <div className="space-y-1.5">
                        <div className="text-3xl sm:text-4xl font-black text-[#081438] tracking-tight font-mono">
                          <DecryptedText
                            text={stat.value}
                            animateOn="hover"
                            className="text-[#081438]"
                          />
                        </div>
                        <div className="text-base sm:text-lg font-extrabold text-[#103B9B] tracking-wide">
                          {stat.label}
                        </div>
                      </div>

                      {/* Stat Detail Description */}
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed min-h-[44px] flex items-start">
                        {stat.detail}
                      </p>
                    </div>

                    {/* Bottom Highlight Feature & Action */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD200] shrink-0" />
                        <span className="text-slate-700">{stat.highlight}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#103B9B] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            )
          })}
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#103B9B]">
            {t('hero.scrollIndicator')}
          </span>
          <a
            href="#journey"
            onClick={(e) => handleSmoothScroll(e, '#journey')}
            className="w-10 h-10 rounded-full border border-[#FFD200]/60 bg-[#103B9B] shadow-lg flex items-center justify-center text-[#FFD200] hover:text-white hover:bg-[#C41230] hover:border-white hover:scale-110 transition-all animate-bounce"
            aria-label="Scroll to interactive timeline"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Dynamic Curved Red & Yellow Swoosh Transition into Dimmed Presentation Room (#061033) */}
      <div className="absolute bottom-0 left-0 right-0">
        <BrandSwoosh
          topColor="#F8FAFC"
          bottomColor="#061033"
          crimson="#C41230"
          gold="#FFD200"
          height={72}
        />
      </div>
    </section>
  )
}

