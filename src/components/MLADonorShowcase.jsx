import { useState } from 'react'
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
  ChevronRight,
  MonitorPlay,
  Flame,
} from 'lucide-react'
import SpotlightCard from './SpotlightCard'
import DecryptedText from './DecryptedText'
import { useLanguage } from '../context/LanguageContext'

export default function MLADonorShowcase() {
  const [selectedDonorType, setSelectedDonorType] = useState('mla')
  const { t } = useLanguage()

  const donorProfiles = t('donorsSection.profiles') || {}
  const current = donorProfiles[selectedDonorType] || {
    type: 'MLA Local Area Development Fund',
    title: 'MLA Vidhayak Nidhi Rural Educational Grant',
    location: 'Mahad & Khed Assembly Constituencies',
    leadBenefactor: 'Hon. MLA Bharat Gogavale',
    bootMessage: 'Donated under Vidhayak Nidhi by MLA Bharat Gogavale for Rural Digital Literacy',
    schoolCount: '18 ZP Classrooms Digitized',
    firmwareLogo: 'MAHARASHTRA VIDHAN SABHA • BHARAT GOGAVALE VIDHAYAK NIDHI',
  }

  const tabs = [
    { id: 'mla', label: t('donorsSection.tabMla'), icon: Award },
    { id: 'csr', label: t('donorsSection.tabCsr'), icon: HeartHandshake },
    { id: 'alumni', label: t('donorsSection.tabAlumni'), icon: Sparkles },
  ]

  return (
    <section id="donors" className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden">
      {/* Background Subtle Halos */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#103B9B]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Warm Hierarchy */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#103B9B]/10 border border-[#103B9B]/30 text-[#103B9B] text-xs font-black uppercase tracking-widest shadow-xs">
            <Flame className="w-4 h-4 text-[#C41230]" />
            <span>{t('donorsSection.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#081438] tracking-tight leading-tight">
            {t('donorsSection.headingMain')}{' '}
            <span className="text-[#103B9B] underline decoration-[#FFD200] decoration-wavy decoration-2 underline-offset-8">
              {t('donorsSection.headingHighlight')}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
            {t('donorsSection.subheading')}
          </p>

          {/* Donor Type Selector Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = selectedDonorType === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDonorType(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#103B9B] text-white shadow-md shadow-[#103B9B]/30 scale-105 border border-[#FFD200]/50'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFD200]' : 'text-slate-500'}`} />
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
              spotlightColor="rgba(255, 210, 0, 0.2)"
              borderColor="rgba(16, 59, 155, 0.45)"
              className="p-8 shadow-xl border-2 border-[#103B9B]/30 bg-white"
            >
              <div className="space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#103B9B]/10 text-[#103B9B] border border-[#103B9B]/20">
                    {current.type}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-[#081438] tracking-tight">
                    {current.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {t('donorsSection.specCard.jurisdiction')} {current.location}
                  </p>
                </div>

                {/* Scramble Animated Serial Badge */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {t('donorsSection.specCard.donorKeyLabel')}
                  </div>
                  <div className="text-sm font-extrabold text-[#103B9B] font-mono">
                    <DecryptedText
                      text={`DONOR-ID #${selectedDonorType.toUpperCase()}-2026-KONKAN`}
                      animateOn="hover"
                      className="text-[#C41230]"
                    />
                  </div>
                </div>

                {/* Specifications Checklist */}
                <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0 mt-0.5" />
                    <span><strong>{t('donorsSection.specCard.item1Bold')}</strong> {t('donorsSection.specCard.item1Text')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0 mt-0.5" />
                    <span><strong>{t('donorsSection.specCard.item2Bold')}</strong> {t('donorsSection.specCard.item2Text')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#103B9B] shrink-0 mt-0.5" />
                    <span><strong>{t('donorsSection.specCard.item3Bold')}</strong> {t('donorsSection.specCard.item3Text')}</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <a
                    href="#solutions"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#C41230] hover:bg-[#A00E26] text-white font-extrabold text-sm shadow-md shadow-[#C41230]/30 border border-[#FFD200]/60 transition-all"
                  >
                    <span>{t('donorsSection.specCard.cta')}</span>
                    <ChevronRight className="w-4 h-4 text-[#FFD200]" />
                  </a>
                </div>

              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Interactive Hardware Boot Simulator (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0A1E5C] p-6 sm:p-8 border-2 border-[#103B9B] shadow-2xl relative overflow-hidden text-white">
              
              {/* Screen Frame Emulation */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-[#FFD200]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-white font-medium">{t('donorsSection.simulator.kernelTitle')}</span>
                </div>
                <span className="hidden sm:inline text-[#FFD200] font-bold uppercase tracking-wider">
                  {t('donorsSection.simulator.liveBadge')}
                </span>
              </div>

              {/* Boot Screen Canvas Display */}
              <div className="my-8 py-12 px-6 rounded-2xl bg-[#07194A] border border-[#103B9B] text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden shadow-inner">
                
                {/* Radial Screen Glow */}
                <div className="absolute inset-0 bg-radial from-[#103B9B]/20 via-transparent to-transparent pointer-events-none" />

                {/* State Emblem / Donor Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#103B9B] to-[#C41230] flex items-center justify-center shadow-lg shadow-[#103B9B]/40 ring-4 ring-[#FFD200]/40 animate-pulse">
                  <Award className="w-9 h-9 text-[#FFD200]" />
                </div>

                <div className="space-y-2 max-w-md">
                  <div className="text-[11px] font-mono tracking-widest text-[#FFD200] uppercase font-black">
                    <DecryptedText
                      text={current.firmwareLogo}
                      animateOn="mount"
                      className="tracking-widest font-mono"
                    />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-white tracking-tight">
                    {current.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-mono">
                    "{current.bootMessage}"
                  </p>
                </div>

                {/* System Startup Status Bars */}
                <div className="w-full max-w-xs space-y-2 pt-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-300">
                    <span>{t('donorsSection.simulator.initLabel')}</span>
                    <span className="text-emerald-400 font-bold">{t('donorsSection.simulator.readyLabel')}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-[#C41230] via-[#FFD200] to-emerald-400 rounded-full" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-[10px] font-mono text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  <MonitorPlay className="w-3 h-3 text-[#FFD200]" />
                  <span>{t('donorsSection.simulator.permanentNotice')}</span>
                </div>
              </div>

              {/* Hardware Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 rounded-xl bg-white/5 text-white">
                  <div className="text-[10px] uppercase text-[#FFD200] font-bold">{t('donorsSection.simulator.statFootprint')}</div>
                  <div className="font-extrabold text-white mt-0.5">{current.schoolCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-white">
                  <div className="text-[10px] uppercase text-[#FFD200] font-bold">{t('donorsSection.simulator.statStorage')}</div>
                  <div className="font-extrabold text-white mt-0.5">{t('donorsSection.simulator.storageVal')}</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/5 text-white">
                  <div className="text-[10px] uppercase text-[#FFD200] font-bold">{t('donorsSection.simulator.statSecurity')}</div>
                  <div className="font-extrabold text-[#FFD200] mt-0.5">{t('donorsSection.simulator.securityVal')}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

