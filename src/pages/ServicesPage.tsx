import React, { useState } from 'react';
import { PageId } from '../types';
import { useData } from '../context/DataContext';
import { DynamicIcon, WhatsAppIcon, PhoneCallIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import {
  ServicesBackgroundArt,
  ArchitecturalGridPattern,
  ContactBackgroundArt,
  DotGridPattern,
  GlowAura
} from '../components/BackgroundPatterns';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenApply: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenApply }) => {
  const { loans: LOAN_SERVICES, brandDetails: BRAND_DETAILS, openInstantEnquiry } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Personal', 'Property', 'Business', 'Specialized'];

  const filteredServices =
    selectedCategory === 'All'
      ? LOAN_SERVICES
      : LOAN_SERVICES.filter(item => item.category === selectedCategory);


  return (
    <div className="w-full">
      {/* 1. Hero / Intro Section with Supporting Image */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:to-[#0F1626] py-16 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <ServicesBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>End-to-End Loan Facilitation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12245C] dark:text-white tracking-tight leading-tight min-h-[3.5rem] sm:min-h-[4.5rem]">
                <TypewriterHeading
                  phrases={[
                    "Complete Suite of Indian Loan Solutions",
                    "Home, Personal, Business & Mortgage Loans",
                    "Lowest Interest Rates Starting 8.35% p.a."
                  ]}
                  highlightWords={['Loan Solutions', 'Business & Mortgage Loans', 'Starting 8.35% p.a.']}
                  highlightClassName="text-[#F5822C]"
                  typingSpeed={45}
                  deletingSpeed={25}
                  pauseDuration={2800}
                />
              </h1>
              {/* One-sentence description */}
              <p className="text-base sm:text-lg text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed max-w-2xl">
                We facilitate the most competitive interest rates and seamless documentation across 11 customized loan categories through India’s top banking institutions.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onOpenApply()}
                  className="px-6 py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Apply for Any Loan
                </button>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-[#12245C] dark:text-[#4FC3E0] hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-all bg-white/60 dark:bg-transparent backdrop-blur-sm"
                >
                  Check Repayment EMI
                </button>
              </div>
            </div>

            {/* Supporting Image for Services Page */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-[#151E32]">
                <img
                  src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80"
                  alt="Loan Facilitation Advisory Services"
                  className="w-full h-72 sm:h-80 object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12245C]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-[#4FC3E0] uppercase tracking-wider">
                    Instant Bank Sanctions
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    Compare offers from 40+ banks with single-point documentation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-slate-50 dark:bg-[#0F1626] border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#12245C] dark:bg-[#F5822C] text-white shadow-md'
                    : 'bg-white dark:bg-[#151E32] text-slate-700 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'All' ? 'All 11 Loan Types' : `${cat} Loans`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Grid of All 11 Loan Types */}
      <section className="py-16 bg-white dark:bg-[#0B1220] relative overflow-hidden">
        <ServicesBackgroundArt />
        <ArchitecturalGridPattern />
        <DotGridPattern size={1.5} gap={32} maskRadial />
        <GlowAura position="top-right" variant="orange" opacity="opacity-35 dark:opacity-25" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-30 dark:opacity-20" />
        <GlowAura position="center" variant="mixed" opacity="opacity-25 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 60}>
                <div className="group h-full bg-white dark:bg-[#151E32] rounded-2xl border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#F5822C] md:dark:hover:border-[#F5822C] overflow-hidden shadow-sm md:hover:shadow-2xl md:hover:shadow-[#F5822C]/15 md:dark:hover:shadow-[#F5822C]/20 md:hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                  {/* Dedicated Topic-Matched Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover md:group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                    {/* Icon on top of image */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 dark:bg-[#151E32]/95 md:group-hover:bg-[#F5822C] md:group-hover:text-white backdrop-blur-md flex items-center justify-center text-[#12245C] dark:text-[#4FC3E0] shadow-md transition-colors duration-300">
                      <DynamicIcon name={service.iconName} className="w-6 h-6" />
                    </div>

                    {/* Category pill */}
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                      {service.category}
                    </div>

                    {/* Rates ticker banner */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="font-bold bg-[#12245C]/90 px-2.5 py-1 rounded">
                        {service.interestRateText}
                      </span>
                      <span className="text-slate-200 bg-black/60 px-2 py-1 rounded font-medium">
                        Tenure: {service.tenureText}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#12245C] dark:text-white md:group-hover:text-[#F5822C] transition-colors">
                        {service.title}
                      </h3>

                      {/* Genuine short sentence description (6-14 words) */}
                      <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed mt-2.5">
                        {service.description}
                      </p>

                      {/* Feature Highlights */}
                      <div className="space-y-1.5 pt-4">
                        {service.features.map(feat => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons: WhatsApp button with unique pre-filled message + Call button */}
                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Working WhatsApp button with unique message */}
                        <button
                          type="button"
                          onClick={() => openInstantEnquiry({
                            itemTitle: service.title,
                            itemCategory: 'Loan Product',
                            channel: 'WhatsApp',
                            targetUrl: BRAND_DETAILS.whatsappUrl(service.whatsappMessage)
                          })}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                        >
                          <WhatsAppIcon size={16} />
                          <span>WhatsApp</span>
                        </button>

                        {/* Working Call button */}
                        <button
                          type="button"
                          onClick={() => openInstantEnquiry({
                            itemTitle: service.title,
                            itemCategory: 'Loan Product',
                            channel: 'Call',
                            targetUrl: BRAND_DETAILS.callUrl
                          })}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-[#12245C] dark:hover:border-[#4FC3E0] hover:bg-slate-100 dark:hover:bg-slate-700 text-[#12245C] dark:text-slate-200 text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
                        >
                          <PhoneCallIcon size={15} />
                          <span>Call Advisor</span>
                        </button>
                      </div>

                      {/* Primary Apply Button */}
                      <button
                        onClick={() => onOpenApply(service.title)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg hover:shadow-[#F5822C]/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Apply Online Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Closing Trust / CTA Section at the bottom */}
      <section className="py-16 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <ContactBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="center" variant="mixed" opacity="opacity-30 dark:opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#12245C] dark:bg-[#151E32] text-white relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3FB6D3]/20 text-[#4FC3E0] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Advance Fees • 100% Transparent Consultation</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Need Help Choosing the Right Loan Structure?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect directly with {BRAND_DETAILS.contactPerson || 'Saikiran.V'} at {BRAND_DETAILS.phone} for a confidential loan eligibility audit and personalized bank rate negotiation.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => openInstantEnquiry({
                    itemTitle: 'Confidential Loan Eligibility Consultation',
                    itemCategory: 'Loan Product',
                    channel: 'WhatsApp',
                    targetUrl: BRAND_DETAILS.whatsappUrl(`Hi ${BRAND_DETAILS.contactPerson || 'Saikiran'}, I need help selecting the best loan for my profile. Please guide me.`)
                  })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon size={18} />
                  <span>Start WhatsApp Consultation</span>
                </button>
                <button
                  type="button"
                  onClick={() => openInstantEnquiry({
                    itemTitle: 'Confidential Loan Eligibility Consultation',
                    itemCategory: 'Loan Product',
                    channel: 'Call',
                    targetUrl: BRAND_DETAILS.callUrl
                  })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#F5822C]" />
                  <span>Call {BRAND_DETAILS.phone}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
