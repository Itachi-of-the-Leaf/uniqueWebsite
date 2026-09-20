import { useLanguage } from '../context/LanguageContext'

/**
 * BrandLogo.jsx - Official "Unique Systems" (युनिक सिस्टीम्स) Brand Identity Emblem
 *
 * Renders only the brand title (locale-specific) and the GST number
 * below it. The previous layout also showed an "EST. 1998" pill and
 * a parallel-script tagline; both were removed per the spec — the
 * nav should read clean: logo → "Unique Systems" / "युनिक सिस्टीम्स"
 * → GST number.
 *
 * Hover effect: a diagonal "glare" sweep travels across the logo
 * JPEG on hover. Pure CSS, compositor-only (transform + opacity on
 * a pseudo-element).
 */
export default function BrandLogo({ variant = 'light', className = '' }) {
  const isDarkBg = variant === 'dark' // true when placed on Royal Navy or Cobalt background
  const { t } = useLanguage()

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

      {/* Brand Title + GST Number */}
      <div className="leading-tight">
        <div
          className={`font-heading font-extrabold text-xl tracking-tight ${
            isDarkBg ? 'text-[#FFFFFF]' : 'text-[#081438]'
          }`}
        >
          {t('nav.brandName')}
        </div>
        <p
          className={`text-[0.7rem] sm:text-xs font-semibold tracking-wide mt-0.5 ${
            isDarkBg ? 'text-[#FFD200]' : 'text-[#103B9B]'
          }`}
        >
          {t('nav.gst')}
        </p>
      </div>
    </div>
  )
}
