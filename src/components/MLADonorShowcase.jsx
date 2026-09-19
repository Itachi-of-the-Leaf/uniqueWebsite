import { useState } from 'react'
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  ChevronRight,
  MonitorPlay,
  Flame
} from 'lucide-react'
import SpotlightCard from './SpotlightCard'
import DecryptedText from './DecryptedText'
import WarliBorder from './WarliBorder'

export default function MLADonorShowcase() {
  const [selectedDonorType, setSelectedDonorType] = useState('mla')

  const donorProfiles = {
    mla: {
      type: 'MLA Local Area Development Fund',
      title: 'MLA Constituency Educational Grant',
      location: 'Khed - Alandi / Guhagar Assembly',
      leadBenefactor: 'Hon. Member of Legislative Assembly',
      bootMessage: 'Donated under Vidhayak Nidhi for Rural Digital Empowerment',
      schoolCount: '18 ZP Classrooms Upgraded',
      firmwareLogo: 'MAHARASHTRA VIDHAN SABHA VIDHAYAK NIDHI',
    },
    csr: {
      type: 'Corporate CSR Foundation',
      title: 'Pride India / Konkan Vikas CSR Initiative',
      location: 'Chiplun & Mahad Industrial Belt',
      leadBenefactor: 'Pride India & Strategic CSR Trust',
      bootMessage: 'Rural Classroom Tech Infrastructure Program',
      schoolCount: '45 Ashram Shalas Digitized',
      firmwareLogo: 'PRIDE INDIA RURAL DEVELOPMENT INITIATIVE',
    },
    alumni: {
      type: 'Zilla Parishad Alumni Trust',
      title: 'Gram Vikas & Ex-Students Memorial Fund',
      location: 'Dapoli & Mandangad Taluka',
      leadBenefactor: 'Gram Panchayat & ZP Alumni Circle',
      bootMessage: 'Dedicated to the Future Generations of Konkan',
      schoolCount: '12 Primary Schools Connected',
      firmwareLogo: 'ZP SHALA KRUTAGYATA NYAS',
    },
  }

  const current = donorProfiles[selectedDonorType]

  return (
    <section className="py-20 lg:py-28 bg-[#F8F4EB] border-t border-[#E8DFD1] relative overflow-hidden">
      {/* Background Subtle Halos */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#5C2418]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Warm Hierarchy */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300/80 text-[#5C2418] text-xs font-black uppercase tracking-widest shadow-xs">
            <Flame className="w-4 h-4 text-[#D97706]" />
            <span>Era 5 Benchmark: Sovereign Donor Recognition</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B1810] tracking-tight leading-tight">
            Permanent Recognition for{' '}
            <span className="text-[#D97706] underline decoration-amber-400/50 decoration-wavy decoration-2 underline-offset-8">
              MLA & CSR Benefactors
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#5C2418]/80 font-normal leading-relaxed">
            When leaders invest in rural classrooms, their legacy shouldn't fade with paper stickers. We embed high-visibility, tamper-proof boot screens into hardware firmware.
          </p>

          {/* Donor Type Selector Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { id: 'mla', label: 'MLA Vidhayak Nidhi', icon: Award },
              { id: 'csr', label: 'Corporate CSR Trust', icon: HeartHandshake },
              { id: 'alumni', label: 'Gram Alumni Nyas', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = selectedDonorType === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDonorType(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 ${
                    isActive
                      ? 'bg-[#5C2418] text-[#FAF9F6] shadow-md shadow-[#5C2418]/25 scale-105 border border-amber-500/40'
                      : 'bg-[#E8DFD1]/70 text-[#2B1810] hover:bg-[#E8DFD1]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-[#5C2418]'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Dual Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Interactive Spotlight Donor Spec Card (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.2)"
              borderColor="rgba(217, 119, 6, 0.5)"
              className="p-8 shadow-xl border-2 border-[#E8DFD1] bg-[#FFFDF9]"
            >
              <div className="space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-50 text-[#5C2418] border border-amber-300/60">
                    {current.type}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#2B1810] tracking-tight">
                    {current.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#5C2418]/70">
                    Jurisdiction: {current.location}
                  </p>
                </div>

                {/* Scramble Animated Serial Badge */}
                <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E8DFD1] space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#5C2418]/80">
                    Verified Donor Key (Hover to scramble)
                  </div>
                  <div className="text-sm font-extrabold text-[#2B1810] font-mono">
                    <DecryptedText
                      text={`DONOR-ID #${selectedDonorType.toUpperCase()}-2026-KONKAN`}
                      animateOn="hover"
                      speed={25}
                      className="text-[#D97706]"
                    />
                  </div>
                </div>

                {/* Specifications Checklist */}
                <ul className="space-y-3 text-xs sm:text-sm text-[#2B1810]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span><strong>100% Unremovable Firmware Logo:</strong> Hardcoded into projector/Android OS kernel boot cycle.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span><strong>Anodized Laser-Engraved Plaque:</strong> Weatherproof metallic donor plate on classroom rigs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span><strong>Photo Audit Dossier:</strong> Complete GPS-tagged classroom deployment report provided for audits.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href="#quote"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#2B1810] font-black text-sm shadow-md shadow-amber-950/20 transition-all"
                  >
                    <span>Request Donor Branding Spec Sheet</span>
                    <ChevronRight className="w-4 h-4 text-[#2B1810]" />
                  </a>
                </div>

              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Interactive Hardware Boot Simulator (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#38160E] p-6 sm:p-8 border-4 border-[#5C2418] ring-1 ring-amber-500/40 shadow-2xl relative overflow-hidden">
              
              {/* Screen Frame Emulation */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-amber-200/80 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-amber-100 font-medium">Smart Projector / EDLA 4K Boot Kernel v4.2</span>
                </div>
                <span className="hidden sm:inline text-amber-400 font-bold uppercase tracking-wider">
                  Live Boot Simulator
                </span>
              </div>

              {/* Boot Screen Canvas Display */}
              <div className="my-8 py-12 px-6 rounded-2xl bg-[#220D08] border border-amber-500/30 text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden shadow-inner">
                
                {/* Radial Screen Glow */}
                <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none" />

                {/* State Emblem / Donor Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 ring-4 ring-amber-400/30 animate-pulse">
                  <Award className="w-9 h-9 text-[#2B1810]" />
                </div>

                <div className="space-y-2 max-w-md">
                  <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-black">
                    <DecryptedText
                      text={current.firmwareLogo}
                      animateOn="mount"
                      speed={20}
                      className="tracking-widest"
                    />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-[#FAF9F6] tracking-tight">
                    {current.title}
                  </h4>
                  <p className="text-xs text-amber-200/80 font-mono">
                    "{current.bootMessage}"
                  </p>
                </div>

                {/* System Startup Status Bars */}
                <div className="w-full max-w-xs space-y-2 pt-2">
                  <div className="flex justify-between text-[10px] font-mono text-amber-300/80">
                    <span>INITIALIZING OFFLINE CONTENT</span>
                    <span className="text-emerald-400 font-bold">100% READY</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1A0A06] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#FAF9F6]/80 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  <MonitorPlay className="w-3 h-3 text-amber-400" />
                  <span>Permanent Display On Every Classroom Power-On Cycle</span>
                </div>
              </div>

              {/* Hardware Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 rounded-xl bg-white/5 text-[#FAF9F6]">
                  <div className="text-[10px] uppercase text-amber-300 font-bold">Impact Footprint</div>
                  <div className="font-extrabold text-[#FAF9F6] mt-0.5">{current.schoolCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-[#FAF9F6]">
                  <div className="text-[10px] uppercase text-amber-300 font-bold">Storage Type</div>
                  <div className="font-extrabold text-[#FAF9F6] mt-0.5">Non-Volatile ROM</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/5 text-[#FAF9F6]">
                  <div className="text-[10px] uppercase text-amber-300 font-bold">Tamper Proofing</div>
                  <div className="font-extrabold text-amber-400 mt-0.5">BIOS Secured</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Decorative Bottom Warli Border */}
      <div className="mt-16">
        <WarliBorder color="#5C2418" accentColor="#D97706" height={22} variant="diamonds" opacity={0.6} />
      </div>
    </section>
  )
}
