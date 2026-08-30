import React, { useState } from 'react';
import { PageId } from '../types';
import { LIFE_INSURANCES, GENERAL_INSURANCES, GOV_SCHEME_INFO } from '../data/insuranceData';
import { BRAND_DETAILS } from '../data/contentData';
import { DynamicIcon, WhatsAppIcon, PhoneCallIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import {
  DotGridPattern,
  ArchitecturalGridPattern,
  InsuranceBackgroundArt,
  ServicesBackgroundArt,
  ContactBackgroundArt,
  GlowAura
} from '../components/BackgroundPatterns';
import {
  Shield,
  HeartPulse,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface InsurancesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenApply: (insuranceName?: string) => void;
}

export const InsurancesPage: React.FC<InsurancesPageProps> = ({ onNavigate, onOpenApply }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'life' | 'general'>('all');

  return (
    <div className="w-full">
      {/* 1. Hero / Intro Section with Supporting Image */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:to-[#0F1626] py-16 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <InsuranceBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="top-right" variant="cyan" opacity="opacity-35 dark:opacity-25" />
        <GlowAura position="bottom-left" variant="orange" opacity="opacity-30 dark:opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3FB6D3]/15 text-[#12245C] dark:text-[#4FC3E0] text-xs font-bold shadow-sm backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5 text-[#F5822C]" />
                <span>Holistic Life & Asset Protection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12245C] dark:text-white tracking-tight leading-tight min-h-[3.5rem] sm:min-h-[4.5rem]">
                <TypewriterHeading
                  phrases={[
                    "Comprehensive Insurance Solutions for India",
                    "Life, Health, Vehicle & Commercial Policies",
                    "IRDAI-Regulated Protection for Families & Assets"
                  ]}
                  highlightWords={['Insurance Solutions for India', 'Life, Health, Vehicle', 'Families & Assets']}
                  highlightClassName="text-[#F5822C]"
                  typingSpeed={45}
                  deletingSpeed={25}
                  pauseDuration={2800}
                />
              </h1>
              {/* One natural sentence description */}
              <p className="text-base sm:text-lg text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed max-w-2xl">
                Protect your loved ones, health, and commercial assets with tailored coverage policies through India’s foremost IRDAI-regulated insurance companies.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onOpenApply('Health Insurance')}
                  className="px-6 py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Get Instant Insurance Quote
                </button>
                <a
                  href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I want to compare insurance policies for my family.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-[#12245C] dark:text-[#4FC3E0] hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs transition-all flex items-center gap-2 bg-white/60 dark:bg-transparent backdrop-blur-sm"
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp Advisory</span>
                </a>
              </div>
            </div>

            {/* Supporting Image with Brighter Refined Aesthetic Border Frame */}
            <div className="lg:col-span-5">
              <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-br from-[#3FB6D3]/60 via-[#F5822C]/60 to-[#12245C]/50 dark:from-[#3FB6D3]/80 dark:via-[#F5822C]/80 dark:to-[#4FC3E0]/70 shadow-[0_20px_50px_rgba(63,182,211,0.2)] dark:shadow-[0_20px_50px_rgba(245,130,44,0.25)] border-2 border-[#3FB6D3]/60 dark:border-[#3FB6D3]/70 backdrop-blur-md">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white dark:border-[#151E32]">
                  <img
                    src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80"
                    alt="Prime Funds Family & Asset Insurance Protection"
                    className="w-full h-72 sm:h-80 object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12245C]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold text-[#4FC3E0] uppercase tracking-wider">
                      Total Protection
                    </div>
                    <div className="text-sm font-semibold mt-1">
                      Cashless hospitalization, high-sum life covers, and swift claim assistance.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-6 bg-slate-50 dark:bg-[#0F1626] border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#12245C] dark:bg-[#F5822C] text-white shadow-md'
                  : 'bg-white dark:bg-[#151E32] text-slate-700 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Insurance Plans ({LIFE_INSURANCES.length + GENERAL_INSURANCES.length})
            </button>
            <button
              onClick={() => setActiveTab('life')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'life'
                  ? 'bg-[#12245C] dark:bg-[#F5822C] text-white shadow-md'
                  : 'bg-white dark:bg-[#151E32] text-slate-700 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Life Insurance ({LIFE_INSURANCES.length})
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'general'
                  ? 'bg-[#12245C] dark:bg-[#F5822C] text-white shadow-md'
                  : 'bg-white dark:bg-[#151E32] text-slate-700 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              General & Health Insurance ({GENERAL_INSURANCES.length})
            </button>
          </div>
        </div>
      </section>

      {/* 2. Life Insurance Section */}
      {(activeTab === 'all' || activeTab === 'life') && (
        <section className="py-14 bg-white dark:bg-[#0B1220] relative overflow-hidden">
          <InsuranceBackgroundArt />
          <DotGridPattern size={1.5} gap={32} maskRadial />
          <GlowAura position="top-left" variant="orange" opacity="opacity-30 dark:opacity-20" />
          <GlowAura position="bottom-right" variant="cyan" opacity="opacity-25 dark:opacity-15" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold uppercase tracking-wider mb-2">
                Personal & Family Future Security
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
                Life Insurance Plans
              </h2>
              <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                Provide continuous financial stability for your family with our vetted life cover portfolios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LIFE_INSURANCES.map((plan, index) => (
                <ScrollReveal key={plan.id} delay={index * 60}>
                  <div className="group h-full bg-white dark:bg-[#151E32] rounded-2xl border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#F5822C] md:dark:hover:border-[#F5822C] overflow-hidden shadow-sm md:hover:shadow-2xl md:hover:shadow-[#F5822C]/15 md:dark:hover:shadow-[#F5822C]/20 md:hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                    {/* Dedicated Topic Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-full h-full object-cover md:group-hover:scale-108 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 dark:bg-[#151E32]/95 md:group-hover:bg-[#F5822C] md:group-hover:text-white backdrop-blur-md flex items-center justify-center text-[#12245C] dark:text-[#4FC3E0] shadow-md transition-colors duration-300">
                        <DynamicIcon name={plan.iconName} className="w-5 h-5" />
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-bold bg-[#12245C]/90 px-2.5 py-1 rounded inline-block">
                        {plan.coverageHighlight}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#12245C] dark:text-white md:group-hover:text-[#F5822C] transition-colors">
                          {plan.title}
                        </h3>

                        {/* Genuine short sentence description (6-14 words) */}
                        <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed mt-2">
                          {plan.description}
                        </p>

                        <div className="space-y-1.5 pt-3">
                          {plan.features.map(feat => (
                            <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* WhatsApp + Call with type-specific messages */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={BRAND_DETAILS.whatsappUrl(plan.whatsappMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-sm hover:shadow active:scale-95 transition-all"
                          >
                            <WhatsAppIcon size={16} />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={BRAND_DETAILS.callUrl}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-[#12245C] dark:hover:border-[#4FC3E0] hover:bg-slate-100 dark:hover:bg-slate-700 text-[#12245C] dark:text-slate-200 text-xs font-bold shadow-sm active:scale-95 transition-all"
                          >
                            <PhoneCallIcon size={15} />
                            <span>Call</span>
                          </a>
                        </div>
                        <button
                          onClick={() => onOpenApply(plan.title)}
                          className="w-full py-2 px-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-sm hover:shadow-md hover:shadow-[#F5822C]/25 transition-all"
                        >
                          Request Policy Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. General Insurance Section */}
      {(activeTab === 'all' || activeTab === 'general') && (
        <section className="py-14 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
          <ServicesBackgroundArt />
          <ArchitecturalGridPattern />
          <DotGridPattern size={1.5} gap={32} maskRadial />
          <GlowAura position="top-right" variant="cyan" opacity="opacity-35 dark:opacity-25" />
          <GlowAura position="bottom-left" variant="orange" opacity="opacity-30 dark:opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#3FB6D3]/15 text-[#12245C] dark:text-[#4FC3E0] text-xs font-bold uppercase tracking-wider mb-2">
                Health, Vehicles, Property & Commercial Risk
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
                General & Health Insurance
              </h2>
              <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                Protect yourself from medical emergencies, vehicle damage, travel disruptions, and enterprise risks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {GENERAL_INSURANCES.map((plan, index) => (
                <ScrollReveal key={plan.id} delay={index * 60}>
                  <div className="group h-full bg-white dark:bg-[#151E32] rounded-2xl border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#3FB6D3] md:dark:hover:border-[#3FB6D3] overflow-hidden shadow-sm md:hover:shadow-2xl md:hover:shadow-[#3FB6D3]/15 md:dark:hover:shadow-[#3FB6D3]/20 md:hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={plan.imageUrl}
                        alt={plan.title}
                        className="w-full h-full object-cover md:group-hover:scale-108 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 dark:bg-[#151E32]/95 md:group-hover:bg-[#3FB6D3] md:group-hover:text-white backdrop-blur-md flex items-center justify-center text-[#12245C] dark:text-[#4FC3E0] shadow-md transition-colors duration-300">
                        <DynamicIcon name={plan.iconName} className="w-5 h-5" />
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-bold bg-[#12245C]/90 px-2.5 py-1 rounded inline-block">
                        {plan.coverageHighlight}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#12245C] dark:text-white md:group-hover:text-[#3FB6D3] transition-colors">
                          {plan.title}
                        </h3>

                        {/* Genuine short sentence description (6-14 words) */}
                        <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed mt-2">
                          {plan.description}
                        </p>

                        <div className="space-y-1.5 pt-3">
                          {plan.features.map(feat => (
                            <div key={feat} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={BRAND_DETAILS.whatsappUrl(plan.whatsappMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-sm hover:shadow active:scale-95 transition-all"
                          >
                            <WhatsAppIcon size={16} />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={BRAND_DETAILS.callUrl}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-[#12245C] dark:hover:border-[#4FC3E0] hover:bg-slate-100 dark:hover:bg-slate-700 text-[#12245C] dark:text-slate-200 text-xs font-bold shadow-sm active:scale-95 transition-all"
                          >
                            <PhoneCallIcon size={15} />
                            <span>Call</span>
                          </a>
                        </div>
                        <button
                          onClick={() => onOpenApply(plan.title)}
                          className="w-full py-2 px-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-sm hover:shadow-md hover:shadow-[#F5822C]/25 transition-all"
                        >
                          Request Policy Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. One-Sentence Government Scheme Callout */}
      <section className="py-12 bg-white dark:bg-[#0B1220] border-t border-[#E5E9F2] dark:border-[#2A3550]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Government Social Security Schemes
                </div>
                {/* One natural sentence government scheme callout */}
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  We assist all citizens with subsidized registrations for Pradhan Mantri Suraksha Bima Yojana (PMSBY) and PMJJBY at nominal annual rates.
                </p>
              </div>
            </div>
            <a
              href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I want to know about enrolling in Government Social Security insurance schemes like PMSBY/PMJJBY.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow transition-all active:scale-95"
            >
              Inquire Gov Schemes
            </a>
          </div>
        </div>
      </section>

      {/* 5. Closing Trust / CTA Section */}
      <section className="py-16 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <ContactBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="center" variant="mixed" opacity="opacity-30 dark:opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent IRDAI Portfolio Facilitation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              Get an Unbiased Comparison on Top Insurance Policies
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
              Don’t settle for generic insurance plans. Speak with Saikiran.V to evaluate claim settlement ratios, cashless network hospitals, and optimal deductible limits.
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <a
                href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, please help me compare health and life insurance plans.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                <WhatsAppIcon size={16} />
                <span>Chat with Insurance Expert</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
