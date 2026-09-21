// Master Catalog Schema — defines every hardware category card
// rendered by the FlipCard grid in `ProductGallery.jsx`.
//
// Each entry has two faces:
//   • `front` — visual-impact hero (gold tag, hero image, title,
//     flip hint). Used as the default-facing side.
//   • `back`  — institutional authority (compliance eyebrow,
//     engineering title, 4-icon spec grid, CTA to the catalog
//     route). Revealed on flip.
//
// `featured: true` cards get a wider cell in the responsive grid
// (md:col-span-2 / lg:col-span-1) so they read as the page's
// primary recommendations. Set to false (or omit) for
// secondary-tier cards.
//
// Image paths use the `/assets/...` convention so Vite's public
// folder serves them at the URL root. Fallbacks in
// `CatalogFlipCard.jsx` route missing assets to a neutral SVG.
export const HARDWARE_CATALOG = [
  {
    id: 'interactive-panels',
    featured: true,
    front: {
      tag: 'FEATURED',
      title: 'Interactive Flat Panels',
      image: '/assets/interactive-panel.webp',
      hint: 'Tap for specifications & compliance ↻',
    },
    back: {
      eyebrow: 'GOOGLE EDLA CERTIFIED',
      title: 'AI-Powered Interactive Flat Panel',
      specs: [
        { icon: 'Monitor', label: '4K Ultra HD Display' },
        { icon: 'Cpu', label: 'Android 14 OS' },
        { icon: 'Touchpad', label: '40-Point Multi-Touch' },
        { icon: 'ShieldCheck', label: '3-Year Onsite SLA' },
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
      image: '/assets/projector-rig.webp',
      hint: 'Tap for kit & mounting details ↻',
    },
    back: {
      eyebrow: 'ZP GRANT CAP COMPLIANT',
      title: 'High-Lumen Classroom Projection Rig',
      specs: [
        { icon: 'Projector', label: 'High-Lumen Long Throw' },
        { icon: 'Anchor', label: 'Steel Ceiling Mount Included' },
        { icon: 'Tv', label: 'Motorized / Pull-Down Screens' },
        { icon: 'Volume2', label: '2.1 Tuned Audio Package' },
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
]
