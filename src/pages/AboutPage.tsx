import React from 'react';
import { PageId } from '../types';
import { ABOUT_STATS, WHY_CHOOSE_US, BRAND_DETAILS } from '../data/contentData';
import { DynamicIcon, WhatsAppIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import { CountUpNumber } from '../components/CountUpNumber';
import {
  DotGridPattern,
  ArchitecturalGridPattern,
  TrustStatsBackgroundArt,
  ServicesBackgroundArt,
  AboutUsBackgroundArt,
  GlowAura
} from '../components/BackgroundPatterns';
import {
  Target,
  Compass,
  Award,
  Building2,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenApply: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenApply }) => {
  return (
    <div className="w-full">
      {/* 1. Page Header & Short Intro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:to-[#0F1626] py-16 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <AboutUsBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="top-right" variant="orange" opacity="opacity-35 dark:opacity-25" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-30 dark:opacity-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12245C]/10 dark:bg-white/10 text-[#12245C] dark:text-[#4FC3E0] text-xs font-bold shadow-sm backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-[#F5822C]" />
            <span>About Prime Funds Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12245C] dark:text-white tracking-tight min-h-[3.5rem] sm:min-h-[4.5rem]">
            <TypewriterHeading
              phrases={[
                "India’s Integrated Real Estate & Financial Facilitator",
                "Dedicated Advisory Led by Saikiran.V & Team",
                "Empowering 18,000+ Borrowers & Property Buyers"
              ]}
              highlightWords={['Integrated Real Estate & Financial Facilitator', 'Saikiran.V & Team', '18,000+ Borrowers']}
              highlightClassName="text-[#F5822C]"
              typingSpeed={45}
              deletingSpeed={25}
              pauseDuration={2800}
            />
          </h1>

          {/* Short intro */}
          <p className="text-base sm:text-lg text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed max-w-3xl mx-auto">
            Prime Funds Solutions Pvt. Ltd. is a premier Indian financial & real estate consultancy dedicated to simplifying property acquisition, retail and commercial loans, and comprehensive asset insurance. We guide clients through every stage—from handpicking vetted properties to securing bank loan sanctions across 40+ leading institutions and shielding assets with robust coverage.
          </p>
        </div>
      </section>

      {/* 2. THE THREE INTEGRATED PILLARS */}
      <section className="py-16 bg-white dark:bg-[#0B1220] relative overflow-hidden">
        <ArchitecturalGridPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              Our 3-in-1 Integrated Service Ecosystem
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7]">
              Eliminate coordination friction. We unite property discovery, bank loan approvals, and asset protection under a single trusted advisory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Real Estate Facilitation */}
            <ScrollReveal delay={0}>
              <div className="group h-full p-7 rounded-2xl bg-slate-50 dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 hover:border-[#F5822C] dark:hover:border-[#F5822C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5822C]/15 group-hover:bg-[#F5822C] text-[#F5822C] group-hover:text-white flex items-center justify-center transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12245C] dark:text-white group-hover:text-[#F5822C] transition-colors">
                    1. Real Estate & Properties
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
                    Curated inventory of verified open plots, independent houses, G+1 duplex homes, and apartment flats with up to 90% pre-approved bank loans and 0% buyer brokerage.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>100% Verified Titles & RERA Compliance</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Direct Builder Rates with Zero Markups</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => onNavigate('realestate')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0F1626] hover:bg-[#F5822C] hover:text-white text-[#12245C] dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Browse Properties</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar 2: Loan Facilitation */}
            <ScrollReveal delay={100}>
              <div className="group h-full p-7 rounded-2xl bg-slate-50 dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 hover:border-[#12245C] dark:hover:border-[#4FC3E0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#12245C]/15 dark:bg-white/10 group-hover:bg-[#12245C] text-[#12245C] dark:text-[#4FC3E0] group-hover:text-white flex items-center justify-center transition-colors">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12245C] dark:text-white group-hover:text-[#4FC3E0] transition-colors">
                    2. Loan Financing (40+ Banks)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
                    Personal, home, mortgage, business, and vehicle credit from premier institutions (HDFC, SBI, ICICI, Axis, Kotak) with up to 90% funding and lowest interest rates.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Instant Sanction in 24 to 48 Hours</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Single-Window Doorstep Documentation</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => onNavigate('services')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0F1626] hover:bg-[#12245C] hover:text-white text-[#12245C] dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Explore Loan Schemes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Pillar 3: Asset & Life Insurance */}
            <ScrollReveal delay={200}>
              <div className="group h-full p-7 rounded-2xl bg-slate-50 dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 hover:border-[#3FB6D3] dark:hover:border-[#3FB6D3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3FB6D3]/15 group-hover:bg-[#3FB6D3] text-[#3FB6D3] group-hover:text-white flex items-center justify-center transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#12245C] dark:text-white group-hover:text-[#3FB6D3] transition-colors">
                    3. Insurance Protection
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
                    Protecting structural assets, commercial spaces, vehicles, health, and family financial security with term life plans and mortgage loan coverage shields.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Property Structure & Fire Perils Cover</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>100% Cashless Medical & Motor Claims</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => onNavigate('insurances')}
                    className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#0F1626] hover:bg-[#3FB6D3] hover:text-white text-[#12245C] dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>View Insurance Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards */}
      <section className="py-16 bg-slate-50 dark:bg-[#0F1626] border-y border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <ArchitecturalGridPattern />
        <GlowAura position="center" variant="mixed" opacity="opacity-25 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <ScrollReveal delay={0}>
              <div className="group h-full p-8 rounded-2xl bg-white dark:bg-[#151E32] backdrop-blur-sm border-2 border-slate-200/90 dark:border-slate-700/80 hover:border-[#F5822C] dark:hover:border-[#F5822C] shadow-sm hover:shadow-2xl hover:shadow-[#F5822C]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5822C]/15 group-hover:bg-[#F5822C] text-[#F5822C] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#12245C] dark:text-white group-hover:text-[#F5822C] transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
                    To democratize access to transparent credit and verified real estate across India by offering personalized loan comparisons, legal property vetting, and expert advisory that saves our clients time and capital.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-[#12245C] dark:text-[#4FC3E0]">
                  Client-Centric • Fast-Track Approvals • Complete Integrity
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal delay={100}>
              <div className="group h-full p-8 rounded-2xl bg-white dark:bg-[#151E32] backdrop-blur-sm border-2 border-slate-200/90 dark:border-slate-700/80 hover:border-[#3FB6D3] dark:hover:border-[#3FB6D3] shadow-sm hover:shadow-2xl hover:shadow-[#3FB6D3]/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3FB6D3]/15 group-hover:bg-[#3FB6D3] text-[#3FB6D3] dark:text-[#4FC3E0] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#12245C] dark:text-white group-hover:text-[#3FB6D3] transition-colors">
                    Our Vision
                  </h3>
                  <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
                    To become the most trusted national household name for integrated real estate, loans, and insurance facilitation, renowned for unparalleled lending partnerships and superior advisory satisfaction.
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-[#12245C] dark:text-[#4FC3E0]">
                  Pan-India Reach • 40+ Bank Network • Seamless Digital Journey
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-16 bg-white dark:bg-[#0B1220] relative overflow-hidden">
        <ServicesBackgroundArt />
        <DotGridPattern size={1.2} gap={32} maskRadial />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Why Choose Us Points */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold uppercase tracking-wider mb-2">
                  Our Distinct Advantage
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
                  Why Work With Prime Funds Solutions
                </h2>
              </div>

              <div className="space-y-4">
                {WHY_CHOOSE_US.map((item, idx) => (
                  <ScrollReveal key={item.title} delay={idx * 80}>
                    <div className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50/95 dark:bg-[#151E32]/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#F5822C] md:dark:hover:border-[#F5822C] shadow-sm md:hover:shadow-xl md:hover:shadow-[#F5822C]/10 md:hover:-translate-y-1 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#12245C]/10 md:group-hover:bg-[#F5822C] dark:bg-white/10 text-[#12245C] md:group-hover:text-white dark:text-[#4FC3E0] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <DynamicIcon name={item.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#12245C] dark:text-white md:group-hover:text-[#F5822C] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: Supporting Image */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={150}>
                <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-br from-[#F5822C]/60 via-[#3FB6D3]/60 to-[#12245C]/50 dark:from-[#F5822C]/80 dark:via-[#3FB6D3]/80 dark:to-[#4FC3E0]/70 shadow-[0_20px_50px_rgba(245,130,44,0.18)] dark:shadow-[0_20px_50px_rgba(63,182,211,0.25)] border-2 border-[#F5822C]/60 dark:border-[#3FB6D3]/70 backdrop-blur-md">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white dark:border-[#151E32]">
                    <img
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                      alt="Prime Funds Solutions Team Consultation"
                      className="w-full h-96 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#F5822C] text-xs font-bold text-white uppercase">
                        Dedicated Leadership
                      </span>
                      <h3 className="text-lg font-bold">
                        Personalized guidance led by Saikiran.V and our team of senior finance & real estate specialists.
                      </h3>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust Stats */}
      <section className="py-16 bg-slate-50 dark:bg-[#0B1220] border-t border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <TrustStatsBackgroundArt />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              Proven Track Record of Facilitation
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
              Our financial and property metrics reflect consistent trust, rapid disbursements, and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_STATS.map((stat, idx) => (
              <ScrollReveal key={stat.label} delay={idx * 80}>
                <div className="p-6 rounded-2xl bg-white dark:bg-[#151E32] backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#F5822C] md:dark:hover:border-[#F5822C] text-center space-y-2 shadow-sm md:hover:shadow-xl md:hover:shadow-[#F5822C]/10 md:hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F5822C] flex items-center justify-center">
                    <CountUpNumber
                      end={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2200}
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#12245C] dark:text-slate-200">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quick CTA footer inside About page */}
          <div className="mt-12 p-8 rounded-2xl bg-[#12245C] dark:bg-[#0F1626] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <GlowAura position="top-right" variant="orange" opacity="opacity-30" />
            <div className="space-y-1 text-center sm:text-left relative z-10">
              <h3 className="text-xl font-bold">Ready to explore properties or loan solutions?</h3>
              <p className="text-sm text-slate-300">
                Contact our senior facilitator Saikiran.V directly or submit a quick application.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 relative z-10">
              <a
                href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I would like to consult with Prime Funds Solutions regarding real estate and loan options.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp Advisory</span>
              </a>
              <button
                onClick={onOpenApply}
                className="px-5 py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                Apply Online
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
