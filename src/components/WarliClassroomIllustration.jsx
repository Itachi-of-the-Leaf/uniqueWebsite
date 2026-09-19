/**
 * WarliClassroomIllustration.jsx
 * 
 * Authentic Maharashtrian Warli Tribal Art SVG:
 * - Opposing triangular stick figures of village children seated attentively.
 * - Teacher figure with pointer wand guiding the digital lesson.
 * - Glowing rectangular projection screen with geometric light rays.
 * - Rural classroom elements: Ceiling-mounted projector emitting a beam, Warli tree of knowledge, and sun motifs.
 * - Rice-paste white (#FAF9F6) line drawings with Turmeric Amber (#D97706) radiant accents.
 */
export default function WarliClassroomIllustration({ className = '' }) {
  return (
    <div className={`relative w-full max-w-2xl mx-auto select-none ${className}`}>
      <svg
        viewBox="0 0 800 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
        aria-label="Warli tribal illustration of rural classroom learning with digital projector"
      >
        <defs>
          {/* Glowing screen gradient */}
          <linearGradient id="warli-screen-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.08" />
          </linearGradient>

          {/* Projector beam gradient */}
          <linearGradient id="warli-beam-grad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0.04" />
          </linearGradient>

          {/* Radial light halo around the digital screen */}
          <radialGradient id="screen-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#5C2418" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo Behind Screen */}
        <circle cx="270" cy="180" r="180" fill="url(#screen-radial)" />

        {/* ============================================================
            CEILING & PROJECTOR UNIT (TOP RIGHT)
            ============================================================ */}
        {/* Ceiling line with tribal chevron trim */}
        <line x1="40" y1="35" x2="760" y2="35" stroke="#FAF9F6" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        
        {/* Projector mount & rugged rig */}
        <line x1="610" y1="35" x2="610" y2="85" stroke="#FAF9F6" strokeWidth="3" />
        <rect x="580" y="85" width="60" height="28" rx="4" fill="#FAF9F6" stroke="#D97706" strokeWidth="2" />
        <circle cx="588" cy="99" r="6" fill="#D97706" />
        {/* Status LED dot */}
        <circle cx="628" cy="99" r="3" fill="#10B981" />

        {/* Projector Conical Light Beam */}
        <polygon
          points="580,99 375,95 375,265"
          fill="url(#warli-beam-grad)"
        />

        {/* Geometric light ray dashed accents */}
        <line x1="580" y1="99" x2="375" y2="95" stroke="#D97706" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.8" />
        <line x1="580" y1="99" x2="375" y2="180" stroke="#FAF9F6" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
        <line x1="580" y1="99" x2="375" y2="265" stroke="#D97706" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.8" />

        {/* ============================================================
            GLOWING PROJECTION SCREEN (LEFT / CENTER)
            ============================================================ */}
        {/* Outer screen frame with tribal border */}
        <rect
          x="160"
          y="90"
          width="215"
          height="175"
          rx="6"
          fill="#3B1812"
          stroke="#FAF9F6"
          strokeWidth="3"
        />
        {/* Screen inner canvas */}
        <rect
          x="168"
          y="98"
          width="199"
          height="159"
          rx="3"
          fill="url(#warli-screen-glow)"
          stroke="#D97706"
          strokeWidth="1.5"
        />

        {/* Screen Content: Digital Educational Motifs */}
        {/* Geometric Sun of Knowledge on screen */}
        <circle cx="267" cy="145" r="16" fill="none" stroke="#FAF9F6" strokeWidth="2" />
        <circle cx="267" cy="145" r="7" fill="#D97706" />
        {/* Sun rays on screen */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 267 + Math.cos(rad) * 19
          const y1 = 145 + Math.sin(rad) * 19
          const x2 = 267 + Math.cos(rad) * 26
          const y2 = 145 + Math.sin(rad) * 26
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FAF9F6" strokeWidth="1.5" />
        })}

        {/* Marathi / Math script geometric waveforms on screen */}
        <path
          d="M 185 190 Q 200 178 215 190 T 245 190 T 275 190 T 305 190 T 335 190 T 350 190"
          stroke="#FAF9F6"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 185 210 L 220 210 M 235 210 L 295 210 M 310 210 L 350 210"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="267"
          y="235"
          textAnchor="middle"
          fill="#FAF9F6"
          fontSize="11"
          fontWeight="bold"
          letterSpacing="2"
          fontFamily="monospace"
        >
          ₹25K OFFLINE RIG
        </text>

        {/* Screen Stand / Wall Mount */}
        <line x1="267" y1="265" x2="267" y2="330" stroke="#FAF9F6" strokeWidth="3" />
        <polygon points="267,330 240,360 294,360" fill="none" stroke="#FAF9F6" strokeWidth="2" />

        {/* Screen radiating ambient rays */}
        <line x1="140" y1="110" x2="155" y2="115" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        <line x1="130" y1="170" x2="150" y2="170" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="230" x2="155" y2="225" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />

        {/* ============================================================
            TEACHER FIGURE (STANDING NEXT TO SCREEN)
            Traditional Warli stick figure with pointer wand
            ============================================================ */}
        <g id="warli-teacher" transform="translate(100, 160)">
          {/* Head & Topknot */}
          <circle cx="20" cy="20" r="10" fill="#FAF9F6" />
          {/* Traditional bun on head */}
          <circle cx="30" cy="16" r="4.5" fill="#FAF9F6" />

          {/* Neck */}
          <line x1="20" y1="30" x2="20" y2="36" stroke="#FAF9F6" strokeWidth="3" />

          {/* Torso: Opposing Triangles */}
          {/* Upper Triangle (Chest) */}
          <polygon points="2,36 38,36 20,68" fill="#FAF9F6" />
          {/* Lower Triangle (Pelvis) */}
          <polygon points="20,68 6,104 34,104" fill="#FAF9F6" />

          {/* Arms */}
          {/* Right arm pointing towards projection screen with wand */}
          <path d="M 33 42 L 56 46 L 82 25" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Pointer stick */}
          <line x1="82" y1="25" x2="115" y2="0" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          {/* Spark at wand tip */}
          <circle cx="115" cy="0" r="3" fill="#D97706" />

          {/* Left arm resting proudly on hip */}
          <path d="M 7 42 L -8 56 L 8 68" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Legs */}
          <line x1="14" y1="104" x2="14" y2="160" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="104" x2="26" y2="160" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />
          {/* Feet */}
          <line x1="14" y1="160" x2="2" y2="160" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="160" x2="38" y2="160" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* ============================================================
            GROUND LEVEL / CLASSROOM MAT WITH WARLI BORDER
            ============================================================ */}
        {/* Ground baseline */}
        <line x1="30" y1="410" x2="770" y2="410" stroke="#FAF9F6" strokeWidth="3" />
        
        {/* Geometric ground chevrons / rice dots */}
        <g opacity="0.6">
          {[60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660, 700, 740].map((x) => (
            <g key={x}>
              <polygon points={`${x},410 ${x + 10},425 ${x + 20},410`} fill="#FAF9F6" />
              <circle cx={x + 10} cy="433" r="2" fill="#D97706" />
            </g>
          ))}
        </g>

        {/* Seating Rug / Dhurrie for Students */}
        <rect x="370" y="398" width="370" height="12" rx="3" fill="#D97706" opacity="0.75" />
        <line x1="370" y1="404" x2="740" y2="404" stroke="#FAF9F6" strokeWidth="1" strokeDasharray="3 3" />

        {/* ============================================================
            SEATED VILLAGE CHILDREN (STUDENTS)
            Opposing triangles, cross-legged/folded posture, raised hands
            ============================================================ */}
        
        {/* Student 1: Girl with braided topknot, hand raised eagerly */}
        <g id="student-1" transform="translate(400, 280)">
          {/* Head & Bun */}
          <circle cx="20" cy="20" r="9" fill="#FAF9F6" />
          <circle cx="30" cy="17" r="4.5" fill="#FAF9F6" />
          
          {/* Neck */}
          <line x1="20" y1="29" x2="20" y2="35" stroke="#FAF9F6" strokeWidth="2.5" />
          
          {/* Torso: Opposing Triangles */}
          <polygon points="5,35 35,35 20,60" fill="#FAF9F6" />
          <polygon points="20,60 7,86 33,86" fill="#FAF9F6" />
          
          {/* Left Arm Raised (Answering teacher question) */}
          <path d="M 8 40 L -6 20 L 0 0" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="0" cy="0" r="2" fill="#D97706" />
          
          {/* Right Arm resting on slate */}
          <path d="M 32 40 L 46 55 L 35 70" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Seated Folded Legs */}
          <path d="M 7 86 L -4 100 L 15 118 L 40 118" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 33 86 L 44 100 L 25 118" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Small Digital Tablet / Slate */}
          <rect x="-8" y="102" width="22" height="15" rx="2" fill="#3B1812" stroke="#D97706" strokeWidth="1.5" />
          <line x1="-5" y1="109" x2="11" y2="109" stroke="#FAF9F6" strokeWidth="1" />
        </g>

        {/* Student 2: Boy looking attentively at screen */}
        <g id="student-2" transform="translate(480, 290)">
          {/* Head */}
          <circle cx="20" cy="20" r="8.5" fill="#FAF9F6" />
          <circle cx="28" cy="18" r="3.5" fill="#FAF9F6" />
          
          {/* Torso */}
          <polygon points="6,33 34,33 20,58" fill="#FAF9F6" />
          <polygon points="20,58 8,83 32,83" fill="#FAF9F6" />
          
          {/* Arms folded attentively */}
          <path d="M 8 38 L -4 52 L 15 65" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 32 38 L 44 52 L 25 65" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Seated Folded Legs */}
          <path d="M 8 83 L -2 96 L 20 108 L 42 108" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 32 83 L 42 96 L 20 108" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Student 3: Child pointing happily with friend */}
        <g id="student-3" transform="translate(565, 280)">
          {/* Head & bun */}
          <circle cx="20" cy="20" r="8.5" fill="#FAF9F6" />
          <circle cx="12" cy="17" r="4" fill="#FAF9F6" />
          
          {/* Torso */}
          <polygon points="5,35 35,35 20,60" fill="#FAF9F6" />
          <polygon points="20,60 7,85 33,85" fill="#FAF9F6" />
          
          {/* Arms: Left arm pointing towards screen */}
          <path d="M 7 40 L -12 35 L -35 25" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 33 40 L 48 55 L 30 70" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Seated Legs */}
          <path d="M 7 85 L -5 98 L 18 118 L 42 118" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 33 85 L 45 98 L 22 118" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* Student 4: Child holding open digital book */}
        <g id="student-4" transform="translate(645, 292)">
          {/* Head */}
          <circle cx="20" cy="20" r="8.5" fill="#FAF9F6" />
          <circle cx="28" cy="17" r="3.5" fill="#FAF9F6" />
          
          {/* Torso */}
          <polygon points="6,34 34,34 20,58" fill="#FAF9F6" />
          <polygon points="20,58 8,82 32,82" fill="#FAF9F6" />
          
          {/* Arms holding notebook */}
          <path d="M 8 38 L -4 52 L 10 68" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 32 38 L 44 52 L 30 68" stroke="#FAF9F6" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Open Notebook */}
          <polygon points="10,68 20,64 30,68 28,80 20,76 12,80" fill="#FAF9F6" stroke="#D97706" strokeWidth="1" />
          
          {/* Seated Legs */}
          <path d="M 8 82 L -2 95 L 20 106 L 42 106" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 32 82 L 42 95 L 20 106" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* ============================================================
            TRADITIONAL WARLI ENVIRONMENT: TREE OF KNOWLEDGE & SUN
            ============================================================ */}
        {/* Sacred Warli Tree on Right Side */}
        <g id="warli-tree" transform="translate(710, 80)">
          {/* Trunk */}
          <path d="M 35 320 L 35 150" stroke="#FAF9F6" strokeWidth="4.5" strokeLinecap="round" />
          
          {/* Branches with triangular foliage */}
          {/* Branch 1 */}
          <path d="M 35 240 Q 15 220 -10 210" stroke="#FAF9F6" strokeWidth="2.5" fill="none" />
          <polygon points="-10,210 -25,200 -20,218" fill="#FAF9F6" />
          <polygon points="-5,205 -18,190 -10,210" fill="#D97706" />

          {/* Branch 2 */}
          <path d="M 35 200 Q 60 180 80 170" stroke="#FAF9F6" strokeWidth="2.5" fill="none" />
          <polygon points="80,170 95,160 90,178" fill="#FAF9F6" />

          {/* Branch 3 */}
          <path d="M 35 160 Q 15 140 0 120" stroke="#FAF9F6" strokeWidth="2.5" fill="none" />
          <polygon points="0,120 -15,110 -8,128" fill="#FAF9F6" />

          {/* Branch 4 - Top Crown */}
          <path d="M 35 150 L 35 80" stroke="#FAF9F6" strokeWidth="3" />
          <polygon points="35,80 15,60 55,60" fill="#FAF9F6" />
          <polygon points="35,55 20,38 50,38" fill="#D97706" />

          {/* Warli birds perched on tree */}
          <g transform="translate(5, 110)">
            {/* Bird body (triangle) */}
            <polygon points="0,5 12,0 10,8" fill="#FAF9F6" />
            <circle cx="13" cy="1" r="2" fill="#FAF9F6" />
            <line x1="4" y1="7" x2="2" y2="13" stroke="#FAF9F6" strokeWidth="1.5" />
          </g>
          <g transform="translate(60, 160)">
            <polygon points="12,5 0,0 2,8" fill="#FAF9F6" />
            <circle cx="-1" cy="1" r="2" fill="#FAF9F6" />
            <line x1="8" y1="7" x2="10" y2="13" stroke="#FAF9F6" strokeWidth="1.5" />
          </g>
        </g>

        {/* Traditional Warli Radiant Sun (Top Left) */}
        <g id="warli-sun" transform="translate(70, 75)">
          <circle cx="20" cy="20" r="14" fill="#D97706" />
          <circle cx="20" cy="20" r="10" fill="#FAF9F6" />
          <circle cx="20" cy="20" r="4" fill="#D97706" />
          {/* Triangular Sun Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x1 = 20 + Math.cos(rad) * 16
            const y1 = 20 + Math.sin(rad) * 16
            const xTip = 20 + Math.cos(rad) * 26
            const yTip = 20 + Math.sin(rad) * 26
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={xTip}
                y2={yTip}
                stroke="#FAF9F6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </g>

        {/* Floating Celebration Grain Particles (Warli Dots) */}
        {[
          { cx: 340, cy: 75, r: 2 },
          { cx: 365, cy: 60, r: 1.5 },
          { cx: 480, cy: 50, r: 2.5 },
          { cx: 520, cy: 70, r: 1.5 },
          { cx: 160, cy: 60, r: 2 },
          { cx: 470, cy: 230, r: 2 },
          { cx: 550, cy: 220, r: 2 },
        ].map((pt, i) => (
          <circle key={i} cx={pt.cx} cy={pt.cy} r={pt.r} fill="#FAF9F6" opacity="0.7" />
        ))}
      </svg>
    </div>
  )
}
