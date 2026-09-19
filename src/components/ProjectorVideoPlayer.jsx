import { useState, useEffect } from 'react'

export default function ProjectorVideoPlayer({
  videoId,
  title,
  activeEraIndex,
  className = '',
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Reset when activeEraIndex changes so audio does not leak and iframes do not linger
  useEffect(() => {
    setIsPlaying(false)
  }, [activeEraIndex, videoId])

  return (
    <div
      className={`relative w-full h-full min-h-[240px] bg-slate-950 rounded-lg overflow-hidden select-none ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title || 'YouTube Video Player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${title || 'Video'}`}
          className="group relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden border-0 p-0 m-0 bg-transparent text-left focus:outline-hidden focus:ring-2 focus:ring-[#FFD200]"
          style={{ pointerEvents: 'auto' }}
        >
          {/* High-resolution cached thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title || 'Video thumbnail'}
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Vignette Overlay for cinema realism */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35 group-hover:via-black/15 transition-colors duration-300" />

          {/* Authentic YouTube Red Play Button Overlay */}
          <div className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
            <div className="w-16 h-11 sm:w-18 sm:h-12 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(255,0,0,0.45)] group-hover:bg-[#CC0000] group-hover:shadow-[0_6px_25px_rgba(255,0,0,0.65)] transition-all">
              {/* White Triangle Play Icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-white translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Click to Play badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
              Click to Play In-Page
            </span>
            <span className="text-[10px] font-mono text-[#FFD200] bg-[#103B9B]/80 px-2 py-0.5 rounded">
              YouTube HD
            </span>
          </div>
        </button>
      )}
    </div>
  )
}
