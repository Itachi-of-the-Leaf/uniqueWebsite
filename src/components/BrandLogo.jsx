import { useLanguage } from '../context/LanguageContext'

/**
 * BrandLogo.jsx - Official "Unique Systems" (युनिक सिस्टीम्स) Brand Identity Emblem
 */
export default function BrandLogo({ variant = 'light', className = '' }) {
  const isDarkBg = variant === 'dark' // true when placed on Royal Navy or Cobalt background
  const { language, t } = useLanguage()

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Shield with Real Logo */}
      <img
        src="/logo.jpeg"
        alt="Unique Systems"
        className="h-10 w-10 rounded-lg object-contain border border-white/20 shadow-md flex-shrink-0"
      />

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

