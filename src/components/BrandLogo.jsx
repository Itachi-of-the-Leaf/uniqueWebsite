import { useLanguage } from '../context/LanguageContext'

/**
 * BrandLogo.jsx - Official "Unique Systems" (युनिक सिस्टीम्स) Brand Identity Emblem
 *
 * Hover effect: a diagonal "glare" sweep travels across the logo JPEG on hover.
 * Pure CSS, compositor-only (transform + opacity on a pseudo-element).
 */
export default function BrandLogo({ variant = 'light', className = '' }) {
  const isDarkBg = variant === 'dark' // true when placed on Royal Navy or Cobalt background
  const { language, t } = useLanguage()

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Shield with Real Logo + glare overlay */}
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/20 shadow-md">
        <img
          src="/logo.jpeg"
          alt="Unique Systems"
          className="absolute inset-0 h-full w-full rounded-lg object-contain"
        />
        {/* Glare sweep — diagonal highlight that translates from off-left to off-right
            on hover. Uses translate3d to stay on the compositor. The pseudo-element
            (skewed to angle the light) is wider than the logo so the sweep can fully
            cross without revealing the edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-[150%] w-[60%] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.55)_50%,rgba(255,255,255,0)_70%,transparent_100%)] skew-x-[-20deg] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[420%] will-change-transform"
        />
      </div>

      {/* Brand Typography & Devanagari Subhead */}
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <span
            className={`font-heading font-extrabold text-xl tracking-tight ${
              isDarkBg ? 'text-[#FFFFFF]' : 'text-[#081438]'
            }`}
          >
            {language === 'mr' ? 'युनिक सिस्टीम्स' : 'Unique Systems'}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFD200] text-[#081438] shadow-xs">
            {t('nav.established')}
          </span>
        </div>
        <p
          className={`text-xs font-semibold tracking-wide ${
            isDarkBg ? 'text-[#FFD200]' : 'text-[#103B9B]'
          }`}
        >
          {language === 'mr' ? 'Unique Systems' : 'युनिक सिस्टीम्स'}{' '}
          <span className={isDarkBg ? 'text-white/60' : 'text-slate-500'}>
            | {t('nav.tagline')}
          </span>
        </p>
      </div>
    </div>
  )
}
