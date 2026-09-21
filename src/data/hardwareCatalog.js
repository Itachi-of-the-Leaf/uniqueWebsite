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
    id: 'computing',
    front: {
      tag: 'All Purpose Computing',
      title: 'All-in-Ones, Laptops & Desktops',
      image: '/ImageCompute.png',
      hint: 'Tap to reveal configurations',
      badges: [
        { label: 'Compact All-in-Ones', icon: 'Monitor' },
        { label: 'Admin & Staff Laptops', icon: 'ShieldCheck' },
        { label: 'Pre-configured OS', icon: 'CheckCircle2' },
        { label: 'Licensed Windows', icon: 'BadgeCheck' },
      ],
    },
    back: {
      eyebrow: 'INSTITUTIONAL COMPUTING',
      title: 'Workstations, Laptops & All-in-Ones',
      brandsTitle: 'SUPPORTED BRANDS & PLATFORMS',
      brands: ['Dell', 'HP', 'Acer', 'Asus', 'MSI', 'Apple', 'Custom Rigs'],
      specs: [
        { icon: 'Cpu', label: 'Intel Core / AMD Ryzen Multi-Core Options' },
        { icon: 'HardDrive', label: 'High-Speed NVMe Solid State Storage' },
        { icon: 'Laptop', label: 'High-Endurance Staff & Student Laptops' },
        { icon: 'Wrench', label: '24h Local Onsite Support & Servicing' },
      ],
      href: '/catalog/computing',
      cta: 'Explore Computing Options ↗',
    },
  },
  {
    id: 'printers',
    front: {
      tag: 'Office & Admin Print',
      title: 'Printers & Wi-Fi Multi-Function Units',
      image: '/ImagePrinters.png',
      hint: 'Tap to reveal printer models',
      badges: [
        { label: 'Print · Scan · Copy', icon: 'Copy' },
        { label: 'Wi-Fi & LAN Sharing', icon: 'Wifi' },
        { label: 'High-Yield Eco Tank', icon: 'FileText' },
        { label: 'Auto Duplex ADF', icon: 'Printer' },
      ],
    },
    back: {
      eyebrow: 'ADMINISTRATIVE PRINTING',
      title: 'Laser & Eco-Tank Multi-Function Units',
      brandsTitle: 'AUTHORIZED OEM PRINTER BRANDS',
      brands: ['Brother', 'Canon', 'Epson', 'HP'],
      specs: [
        { icon: 'Printer', label: 'Single-Function Laser & 3-in-1 Ink Tank MFDs' },
        { icon: 'Wifi', label: 'Wireless Phone & Multi-PC Network Printing' },
        { icon: 'Copy', label: 'Rapid Question Paper & Circular Duplication' },
        { icon: 'ShieldCheck', label: 'Onsite Cartridge, Toner & Tank Servicing' },
      ],
      href: '/catalog/printers',
      cta: 'View Printer Models ↗',
    },
  },
  {
    id: 'ups-systems',
    front: {
      tag: 'Power Resilience',
      title: 'Institutional UPS & Power Backup',
      image: '/ImageUPS.png',
      hint: 'Tap to reveal power specs',
      badges: [
        { label: 'Heavy Surge Protection', icon: 'Zap' },
        { label: 'Zero-Switch Latency', icon: 'Activity' },
        { label: 'Tubular Battery Ready', icon: 'BatteryCharging' },
        { label: 'Pure Sine Wave Output', icon: 'ShieldAlert' },
      ],
    },
    back: {
      eyebrow: 'RURAL GRID HARDENED',
      title: 'Offline UPS & Inverter Backup Systems',
      brandsTitle: 'SUPPORTED INVERTER & BATTERY BRANDS',
      brands: ['Artis', 'APC', 'Luminous', 'Microtek'],
      specs: [
        { icon: 'Zap', label: 'Heavy Voltage Swing & Lightning Suppression' },
        { icon: 'Clock', label: '4h–8h Continuous Classroom Backup Load' },
        { icon: 'Battery', label: 'High-Capacity Tubular Battery Ecosystems' },
        { icon: 'Wrench', label: 'Local Battery Water & Hardware Health Checks' },
      ],
      href: '/catalog/ups-systems',
      cta: 'Calculate Power Load ↗',
    },
  },
  {
    id: 'peripherals',
    front: {
      tag: 'Classroom Accessories',
      title: 'Monitors, Peripherals & Cabling',
      image: '/ImagePeripherals.png',
      hint: 'Tap to reveal peripheral kits',
      badges: [
        { label: 'Anti-Glare HD Monitors', icon: 'Monitor' },
        { label: 'Spill-Resistant Input', icon: 'Keyboard' },
        { label: 'Shielded HDMI Cables', icon: 'Cable' },
        { label: 'Plug & Play Verified', icon: 'CheckCircle2' },
      ],
    },
    back: {
      eyebrow: 'HARDWARE ACCESSORIES',
      title: 'Display, Input & Connectivity Kits',
      brandsTitle: 'TRUSTED ACCESSORY & COMPONENT BRANDS',
      brands: ['Dell', 'HP', 'Logitech', 'Zebronics', 'Circle'],
      specs: [
        { icon: 'Monitor', label: 'FHD Anti-Glare 21.5" & 24" IPS Displays' },
        { icon: 'Keyboard', label: 'School-Grade USB Keyboard & Mouse Combos' },
        { icon: 'Cable', label: 'Gold-Plated 1.5m / 3m / 5m Shielded HDMI' },
        { icon: 'Usb', label: 'High-Speed Class-10 Pre-Flashed Storage' },
      ],
      href: '/catalog/peripherals',
      cta: 'Explore Peripheral Kits ↗',
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
  'Laptop',
  'CheckCircle2',
]
