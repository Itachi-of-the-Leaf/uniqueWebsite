/**
 * BrandSwoosh.jsx - Official Unique Systems Dynamic Curved Swoosh Divider
 * 
 * Replicates the authentic red-and-yellow dynamic swoosh motif from the Unique Systems logo.
 * Provides a fluid, high-impact brand transition between major sections.
 */
export default function BrandSwoosh({
  topColor = 'transparent',
  bottomColor = '#F8FAFC',
  crimson = '#C41230',
  gold = '#FFD200',
  flip = false,
  reverse = false,
  height = 56,
  className = '',
}) {
  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none relative ${className}`}
      style={{
        height: `${height}px`,
        transform: `${flip ? 'rotate(180deg)' : ''} ${reverse ? 'scaleX(-1)' : ''}`.trim() || undefined,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        {/* Optional top background transition fill */}
        {topColor !== 'transparent' && (
          <path
            d="M0 0 L1440 0 L1440 60 C1080 0, 360 110, 0 40 Z"
            fill={topColor}
          />
        )}

        {/* Background transition fill */}
        {bottomColor !== 'transparent' && (
          <path
            d="M0 40 C360 110, 1080 0, 1440 70 L1440 120 L0 120 Z"
            fill={bottomColor}
          />
        )}

        {/* Primary Crimson Vermilion Swoosh Curve */}
        <path
          d="M0 30 C420 115, 1020 -15, 1440 60 C1120 12, 480 120, 0 45 Z"
          fill={crimson}
          opacity="0.95"
        />

        {/* Secondary Canary Gold Accent Swoosh Ribbon */}
        <path
          d="M0 45 C480 120, 1120 12, 1440 60 C1060 20, 440 125, 0 54 Z"
          fill={gold}
        />

        {/* Delicate Golden Glow Ray / Highlights */}
        <path
          d="M200 78 C520 122, 940 38, 1280 46"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="6 6"
        />
      </svg>
    </div>
  )
}
