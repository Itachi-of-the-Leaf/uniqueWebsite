// Master Catalog Schema — defines every hardware category card
// rendered by the FlipCard grid in `ProductGallery.jsx`.
//
// Each entry has two faces:
//   • `front` — visual-impact hero (gold tag, hero image, title,
//     flip hint, optional badge tree, optional imageDominant
//     right-column stage). Used as the default-facing side.
//   • `back`  — institutional authority (compliance eyebrow,
//     engineering title, optional subtitle, optional videos
//     grid OR 4-icon spec grid, CTA to the catalog route).
//     Revealed on flip.
//
// `featured: true` cards get a wider cell in the responsive grid
// (md:col-span-2 / lg:col-span-1) so they read as the page's
// primary recommendations. Set to false (or omit) for
// secondary-tier cards.
//
// OPT-IN FIELDS (both featured cards now exercise them):
//   front.badges           Array<{label, icon, gradient, borderColor,
//                              textColor, iconColor}> — renders a
//                              substantial gradient pill tree on
//                              the LEFT column with integrated
//                              icons. Required to render the pill
//                              tree on this card.
//   front.imageDominant    Boolean — when true, the right column
//                              becomes a full-height dark stage
//                              with the panel image rendered at
//                              object-contain. Used by the two
//                              featured spotlight cards
//                              (interactive-panels + projectors)
//                              to mimic Featured.png's seamless
//                              right half.
//   back.subtitle          String — caption text rendered above
//                              the back-face video grid (e.g.
//                              "Check the screen out in
//                              deployment").
//   back.videos            Array<{label, embedUrl}> — when present
//                              and non-empty, renders the side-
//                              by-side YouTube grid in place of
//                              the 4-icon spec matrix.
//
// Image paths use the public-folder convention so Vite serves
// them at the URL root. Fallbacks in `CatalogFlipCard.jsx`
// route missing assets to a neutral SVG.
export const HARDWARE_CATALOG = [
  {
    id: 'interactive-panels',
    featured: true,
    front: {
      tag: 'FEATURED',
      title: 'Interactive Flat Panels',
      image: '/SmartPanel3.jpeg',
      hint: 'Tap for specifications & compliance ↻',
      imageDominant: true,
      badges: [
        {
          label: 'AI - Enhanced',
          icon: 'Sparkles',
          gradient: 'from-sky-950/80 to-blue-900/60',
          borderColor: 'border-sky-400/50',
          textColor: 'text-sky-200',
          iconColor: 'text-sky-300',
        },
        {
          label: 'Google EDLA Certified',
          customIcon: 'google-g',
          gradient: 'from-slate-900/90 via-amber-950/40 to-slate-900/90',
          borderColor: 'border-amber-400/60',
          textColor: 'text-amber-200',
          iconColor: 'text-amber-300',
        },
        {
          label: 'Integrated Donor Name',
          icon: 'User',
          gradient: 'from-emerald-950/80 to-teal-900/60',
          borderColor: 'border-emerald-400/50',
          textColor: 'text-emerald-200',
          iconColor: 'text-emerald-300',
        },
        {
          label: '3-Year Onsite SLA',
          icon: 'ShieldCheck',
          gradient: 'from-amber-950/60 to-yellow-900/50',
          borderColor: 'border-[#FFD200]/50',
          textColor: 'text-[#FFD200]',
          iconColor: 'text-[#FFD200]',
        },
        {
          label: '4K Anti-Glare Multi-Touch',
          icon: 'Monitor',
          gradient: 'from-purple-950/70 to-indigo-900/60',
          borderColor: 'border-purple-400/50',
          textColor: 'text-purple-200',
          iconColor: 'text-purple-300',
        },
      ],
    },
    back: {
      eyebrow: 'GOOGLE EDLA CERTIFIED',
      title: 'AI-Powered Interactive Flat Panel',
      subtitle: 'Check the screen out in deployment',
      videos: [
        {
          label: 'Deployment',
          embedUrl: 'https://www.youtube-nocookie.com/embed/wtBHIyOkSuQ?rel=0',
        },
        {
          label: 'Classroom',
          embedUrl: 'https://www.youtube-nocookie.com/embed/XzfDhwStWVU?rel=0',
        },
      ],
      href: '/catalog/interactive-panels',
      cta: 'Explore Models & Accessories ↗',
    },
  },
  {
    id: 'projectors',
    featured: true,
    front: {
      tag: 'FEATURED SOLUTION',
      title: 'Projector Systems & Rigging',
      image: '/ProjectorImage.jpeg',
      hint: 'Tap for kit & mounting details ↻',
      imageDominant: true,
      badges: [
        {
          label: 'Turnkey Classroom Bundle',
          icon: 'Package',
          gradient: 'from-sky-950/80 to-blue-900/60',
          borderColor: 'border-sky-400/50',
          textColor: 'text-sky-200',
          iconColor: 'text-sky-400',
        },
        {
          label: 'State Board Content (Std 1–10)',
          icon: 'BookOpen',
          gradient: 'from-slate-900/90 via-amber-950/40 to-slate-900/90',
          borderColor: 'border-amber-400/60',
          textColor: 'text-amber-200',
          iconColor: 'text-amber-400',
        },
        {
          label: 'Heavy-Duty Ceiling Rigging',
          icon: 'Anchor',
          gradient: 'from-emerald-950/80 to-teal-900/60',
          borderColor: 'border-emerald-400/50',
          textColor: 'text-emerald-200',
          iconColor: 'text-emerald-400',
        },
        {
          label: '2.1 Immersive Acoustic Sound',
          icon: 'Volume2',
          gradient: 'from-purple-950/70 to-indigo-900/60',
          borderColor: 'border-purple-400/50',
          textColor: 'text-purple-200',
          iconColor: 'text-purple-400',
        },
        {
          label: 'Zero-Internet USB Playback',
          icon: 'Usb',
          gradient: 'from-amber-950/60 to-yellow-900/50',
          borderColor: 'border-[#FFD200]/50',
          textColor: 'text-[#FFD200]',
          iconColor: 'text-[#FFD200]',
        },
      ],
    },
    back: {
      eyebrow: 'ZP GRANT CAP OPTIMIZED (₹25,000)',
      title: 'High-Lumen Classroom Projection Rig',
      subtitle: 'Check the projection rig in active deployment',
      videos: [
        {
          label: 'Deployment Action',
          embedUrl: 'https://www.youtube-nocookie.com/embed/0BzyQJsbUlw?rel=0',
        },
        {
          label: 'Classroom Footage',
          embedUrl: 'https://www.youtube-nocookie.com/embed/3xy5Ti_cFRU?start=47&rel=0',
        },
      ],
      href: '/catalog/projectors',
      cta: 'Explore Rigging & Bundles ↗',
    },
  },
  {
    id: 'desktops',
    front: {
      tag: 'LAB INFRASTRUCTURE',
      title: 'Desktop Computers & All-in-Ones',
      image: '/assets/desktops.webp',
      hint: 'Tap for hardware specs ↻',
    },
    back: {
      eyebrow: 'CUSTOM TOWER & AIO',
      title: 'Institutional Workstations',
      specs: [
        { icon: 'Cpu', label: 'Multi-Core Core i5 / Ryzen' },
        { icon: 'HardDrive', label: 'High-Speed NVMe SSD' },
        { icon: 'Shield', label: 'Firmware BIOS Branding' },
        { icon: 'Wrench', label: '24h Local Khed Service' },
      ],
      href: '/catalog/desktops',
      cta: 'View Lab Configurations ↗',
    },
  },
  {
    id: 'laptops',
    front: {
      tag: 'ADMIN & STAFF',
      title: 'Laptops & Mobile Workstations',
      image: '/assets/laptops.webp',
      hint: 'Tap for staff configurations ↻',
    },
    back: {
      eyebrow: 'HIGH-ENDURANCE HARDWARE',
      title: 'Field & Staff Portable Units',
      specs: [
        { icon: 'BatteryCharging', label: 'All-Day Battery Endurance' },
        { icon: 'ShieldAlert', label: 'Spill-Resistant Keyboard' },
        { icon: 'Wifi', label: 'Offline-Ready OS Pre-Flash' },
        { icon: 'Truck', label: 'Rapid Replacement SLA' },
      ],
      href: '/catalog/laptops',
      cta: 'View Staff Models ↗',
    },
  },
  {
    id: 'printers',
    front: {
      tag: 'OFFICE ESSENTIAL',
      title: 'Printers & Multi-Function Units',
      image: '/assets/printers.webp',
      hint: 'Tap for yield & duty cycles ↻',
    },
    back: {
      eyebrow: 'ADMINISTRATIVE WORKHORSE',
      title: 'High-Yield Network MFD Units',
      specs: [
        { icon: 'Printer', label: 'Monochrome & Color Print' },
        { icon: 'Copy', label: 'Duplex Auto Document Feeder' },
        { icon: 'FileText', label: 'High-Yield Low Cost/Page' },
        { icon: 'Network', label: 'LAN / Wireless Office Sharing' },
      ],
      href: '/catalog/printers',
      cta: 'View Print Infrastructure ↗',
    },
  },
  {
    id: 'ups-systems',
    front: {
      tag: 'POWER RESILIENCE',
      title: 'Institutional UPS & Power Backup',
      image: '/assets/ups.webp',
      hint: 'Tap for runtime capacities ↻',
    },
    back: {
      eyebrow: 'RURAL GRID HARDENED',
      title: 'Pure Sine Wave Inverter Systems',
      specs: [
        { icon: 'Zap', label: 'Heavy Surge Suppression' },
        { icon: 'Clock', label: '4h–8h Classroom Runtime' },
        { icon: 'Activity', label: 'Zero-Switch Latency' },
        { icon: 'Battery', label: 'Tubular Battery Compatible' },
      ],
      href: '/catalog/ups-systems',
      cta: 'Calculate Power Load ↗',
    },
  },
  {
    id: 'accessories',
    front: {
      tag: 'PERIPHERALS & MEDIA',
      title: 'Accessories & Digital Syllabus',
      image: '/assets/accessories.webp',
      hint: 'Tap for media & add-ons ↻',
    },
    back: {
      eyebrow: 'OFFLINE SYLLABUS CARRIERS',
      title: 'Pre-Configured Classroom Add-ons',
      specs: [
        { icon: 'Usb', label: 'State-Board Syllabus USB Drives' },
        { icon: 'Keyboard', label: 'Industrial Spill-Safe Input' },
        { icon: 'Cable', label: 'Heavy-Gauge Shielded HDMI' },
        { icon: 'Speaker', label: 'High-DB Hall Sound Bars' },
      ],
      href: '/catalog/accessories',
      cta: 'Browse Peripheral Kits ↗',
    },
  },
]

// Icon names referenced across the catalog. We import these
// statically in `CatalogFlipCard.jsx` so the bundler tree-shakes
// properly. The data file references them by string so it stays
// JSON-serializable (handy for future server-driven catalogs).
export const CATALOG_ICONS = [
  'Monitor',
  'Cpu',
  'Touchpad',
  'ShieldCheck',
  'Projector',
  'Anchor',
  'Tv',
  'Volume2',
  'HardDrive',
  'Shield',
  'Wrench',
  'BatteryCharging',
  'ShieldAlert',
  'Wifi',
  'Truck',
  'Printer',
  'Copy',
  'FileText',
  'Network',
  'Zap',
  'Clock',
  'Activity',
  'Battery',
  'Usb',
  'Keyboard',
  'Cable',
  'Speaker',
  'Package',
  'BookOpen',
]
