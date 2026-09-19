/**
 * BrandLogo.jsx - Official "Unique Systems" (युनिक सिस्टीम्स) Brand Identity Emblem
 * 
 * Features the brand emblem with the signature Crimson Vermilion & Canary Gold swoosh,
 * bold brand title, and Devanagari subhead "युनिक सिस्टीम्स | Rural eLearning Pioneers".
 */
export default function BrandLogo({ variant = 'light', className = '' }) {
  const isDarkBg = variant === 'dark' // true when placed on Royal Navy or Cobalt background

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Shield with Official Swoosh Motif */}
      <div className="relative w-11 h-11 rounded-xl bg-[#0A1E5C] border border-[#FFD200]/40 flex items-center justify-center shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
        {/* Ambient Cobalt Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#103B9B] via-[#0A1E5C] to-[#07194A]" />

        {/* Stylized 'U' Monogram */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-9 h-9"
          aria-hidden="true"
        >
          {/* Main 'U' stem in pure white */}
          <path
            d="M12 11 V23 C12 28.5 16.5 33 22 33 C27.5 33 32 28.5 32 23 V11"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Core Hardware / Tech Node */}
          <circle cx="22" cy="22" r="3" fill="#FFD200" />

          {/* Dynamic Crimson Rose Swoosh Curve (Bottom-Right) */}
          <path
            d="M16 35 C24 37, 34 33, 40 25 C36 29, 27 34, 18 33 Z"
            fill="#E63956"
          />

          {/* Dynamic Canary Gold Swoosh Ribbon */}
          <path
            d="M18 36 C25 38, 35 34, 42 27 C38 31, 28 35, 20 34.5 Z"
            fill="#FFD200"
          />
        </svg>

        {/* Subtle Gold Corner Accent */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#FFD200]/70 rounded-bl-sm" />
      </div>

      {/* Brand Typography & Devanagari Subhead */}
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <span
            className={`font-heading font-extrabold text-xl tracking-tight ${
              isDarkBg ? 'text-[#FFFFFF]' : 'text-[#081438]'
            }`}
          >
            Unique Systems
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FFD200] text-[#081438] shadow-xs">
            Est. 1998
          </span>
        </div>
        <p
          className={`text-xs font-semibold tracking-wide ${
            isDarkBg ? 'text-[#FFD200]' : 'text-[#103B9B]'
          }`}
        >
          युनिक सिस्टीम्स <span className={isDarkBg ? 'text-white/60' : 'text-slate-500'}>| Rural eLearning Pioneers</span>
        </p>
      </div>
    </div>
  )
}
