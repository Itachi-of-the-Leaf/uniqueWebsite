import { useId } from 'react'

/**
 * WarliBorder - Authentic Maharashtrian Geometric Folk Art Border
 * 
 * Traditional motifs included:
 * - Opposing triangular zigzags (Kante / Tarpa fringe)
 * - Concentric diamond lozenges (Chauk)
 * - Ritual grain dots (Tandul / Rice dots)
 * 
 * Supports SVG pattern repetition for crisp, responsive scaling across any screen width.
 */
export default function WarliBorder({
  color = '#5C2418',
  accentColor = '#D97706',
  height = 28,
  variant = 'zigzag', // 'zigzag' | 'diamonds' | 'frieze' | 'trim'
  flip = false,
  className = '',
  opacity = 1,
}) {
  const patternId = useId().replace(/:/g, '')

  if (variant === 'trim') {
    // Subtle mini-trim for navbar and card headers (height: ~10-14px)
    return (
      <div
        className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
        style={{ height: `${height}px`, opacity }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={`warli-trim-${patternId}`}
              width="24"
              height={height}
              patternUnits="userSpaceOnUse"
            >
              {/* Upper line */}
              <line x1="0" y1="2" x2="24" y2="2" stroke={color} strokeWidth="1.5" />
              {/* Opposing triangles */}
              <polygon points="0,2 6,10 12,2" fill={color} />
              <polygon points="12,10 18,2 24,10" fill={color} />
              {/* Dots */}
              <circle cx="6" cy="12" r="1" fill={accentColor} />
              <circle cx="18" cy="12" r="1" fill={accentColor} />
              {/* Lower line */}
              <line x1="0" y1={height - 2} x2="24" y2={height - 2} stroke={color} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#warli-trim-${patternId})`} />
        </svg>
      </div>
    )
  }

  if (variant === 'diamonds') {
    return (
      <div
        className={`w-full overflow-hidden select-none pointer-events-none ${className} ${
          flip ? 'rotate-180' : ''
        }`}
        style={{ height: `${height}px`, opacity }}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={`warli-dia-${patternId}`}
              width="40"
              height={height}
              patternUnits="userSpaceOnUse"
            >
              {/* Outer boundary lines */}
              <line x1="0" y1="2" x2="40" y2="2" stroke={color} strokeWidth="1.5" />
              <line x1="0" y1={height - 2} x2="40" y2={height - 2} stroke={color} strokeWidth="1.5" />

              {/* Diamond Lozenge */}
              <polygon
                points={`20,${4} 34,${height / 2} 20,${height - 4} 6,${height / 2}`}
                fill="none"
                stroke={color}
                strokeWidth="1.75"
              />
              {/* Inner Diamond */}
              <polygon
                points={`20,${8} 28,${height / 2} 20,${height - 8} 12,${height / 2}`}
                fill={accentColor}
              />
              {/* Center dot */}
              <circle cx="20" cy={height / 2} r="1.5" fill="#FAF9F6" />

              {/* Side chevrons connecting motifs */}
              <polygon points={`0,${height / 2} 6,${height / 2 - 4} 6,${height / 2 + 4}`} fill={color} />
              <polygon points={`40,${height / 2} 34,${height / 2 - 4} 34,${height / 2 + 4}`} fill={color} />
              
              {/* Small accent beads */}
              <circle cx="6" cy={4} r="1" fill={color} />
              <circle cx="34" cy={4} r="1" fill={color} />
              <circle cx="6" cy={height - 4} r="1" fill={color} />
              <circle cx="34" cy={height - 4} r="1" fill={color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#warli-dia-${patternId})`} />
        </svg>
      </div>
    )
  }

  // Default 'zigzag' - classic Warli double-row triangular teeth with diamond bead insets
  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none ${className} ${
        flip ? 'rotate-180' : ''
      }`}
      style={{ height: `${height}px`, opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`warli-zig-${patternId}`}
            width="32"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Top border line */}
            <line x1="0" y1="2" x2="32" y2="2" stroke={color} strokeWidth="1.5" />

            {/* Top row of downward pointing triangles */}
            <polygon points={`0,2 8,${height * 0.42} 16,2`} fill={color} />
            <polygon points={`16,2 24,${height * 0.42} 32,2`} fill={color} />

            {/* Middle connecting diamond / dots */}
            <circle cx="8" cy={height / 2} r="1.5" fill={accentColor} />
            <circle cx="24" cy={height / 2} r="1.5" fill={accentColor} />

            {/* Bottom row of upward pointing triangles */}
            <polygon
              points={`0,${height - 2} 8,${height * 0.58} 16,${height - 2}`}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
            <polygon
              points={`16,${height - 2} 24,${height * 0.58} 32,${height - 2}`}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />

            {/* Bottom border line */}
            <line x1="0" y1={height - 2} x2="32" y2={height - 2} stroke={color} strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#warli-zig-${patternId})`} />
      </svg>
    </div>
  )
}
