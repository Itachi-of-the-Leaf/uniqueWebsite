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
