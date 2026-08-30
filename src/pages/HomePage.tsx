import React, { useState } from 'react';
import { PageId } from '../types';
import { LOAN_SERVICES } from '../data/loansData';
import { HOME_TRUST_POINTS, HOME_TEASERS, BRAND_DETAILS } from '../data/contentData';
import { DynamicIcon, WhatsAppIcon, PhoneCallIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import heroAdvisoryImg from '../assets/images/hero_loan_advisory_1788091267798.jpg';
import {
  HeroFinancialIllustration,
  DotGridPattern,
  TrustStatsBackgroundArt,
  ServicesBackgroundArt,
  AboutUsBackgroundArt,
  ContactBackgroundArt,
  GlowAura
} from '../components/BackgroundPatterns';
import {
  Shield,
  Zap,
  Percent,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Send,
  Building2,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenApply: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenApply }) => {
  // Quick Enquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Personal Loans',
    loanAmount: '₹5,00,000'
  });
  const [enquirySent, setEnquirySent] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
  };

  const openWhatsAppEnquiry = () => {
    const text = `Hi Saikiran, I submitted a quick enquiry for ${formData.serviceType} of amount ${formData.loanAmount}. My Name: ${formData.name}, Phone: ${formData.phone}.`;
    window.open(BRAND_DETAILS.whatsappUrl(text), '_blank');
  };

  // Preview max 6 services
  const previewServices = LOAN_SERVICES.slice(0, 6);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:to-[#0F1626] py-12 md:py-20 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        {/* Background Visual Illustrations */}
        <HeroFinancialIllustration />
        <DotGridPattern size={1.5} gap={28} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12245C]/5 dark:bg-white/10 border border-[#12245C]/10 dark:border-white/15 text-[#12245C] dark:text-[#4FC3E0] text-xs font-bold shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#F5822C]" />
                <span>Premier Indian Loans & Insurance Advisory</span>
              </div>

              {/* Headline with Typing Animation */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12245C] dark:text-white tracking-tight leading-[1.15] min-h-[4rem] sm:min-h-[5.5rem] lg:min-h-[7rem]">
                <TypewriterHeading
                  phrases={[
                    "Unlock the Best Loan Rates with Prime Funds Solutions",
                    "Fast Sanctions & Lowest ROI Across 40+ Top Banks",
                    "Personalized Financing for Every Indian Dream",
                    "Transparent, Seamless Loans & Asset Insurance"
                  ]}
                  highlightWords={['Prime Funds', 'Prime Funds Solutions', '40+ Top Banks', 'Lowest ROI']}
                  highlightClassName="text-[#F5822C]"
                  typingSpeed={40}
                  deletingSpeed={20}
                  pauseDuration={2800}
                />
              </h1>

              {/* One-sentence Subtext */}
              <p className="text-base sm:text-lg text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed max-w-2xl">
                We facilitate personalized retail and business financing across India through our trusted network of 40+ leading banks and NBFCs.
              </p>

              {/* 3 Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#151E32]/90 backdrop-blur-sm border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#12245C] dark:text-white">Lowest ROI</div>
                    <div className="text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">Starting 8.35% p.a.</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#151E32]/90 backdrop-blur-sm border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#F5822C]/10 text-[#F5822C] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#12245C] dark:text-white">Fast Sanction</div>
                    <div className="text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">24 to 48 hour approvals</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#151E32]/90 backdrop-blur-sm border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#3FB6D3]/10 text-[#3FB6D3] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#12245C] dark:text-white">40+ Partners</div>
                    <div className="text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">Top Banks & NBFCs</div>
                  </div>
                </div>
              </div>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <button
                  onClick={() => onOpenApply()}
                  className="px-7 py-3.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F5822C]/30 hover:shadow-xl hover:shadow-[#F5822C]/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply For Loan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('calculator', 'emi-calculator')}
                  className="px-6 py-3.5 rounded-xl border-2 border-[#12245C] dark:border-[#4FC3E0] text-[#12245C] dark:text-[#4FC3E0] hover:bg-[#12245C] hover:text-white dark:hover:bg-[#4FC3E0] dark:hover:text-[#0B1220] font-bold text-sm transition-all flex items-center justify-center gap-2 bg-white/60 dark:bg-transparent backdrop-blur-sm cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate EMI</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Image with Floating Checklist Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image with Brighter Refined Aesthetic Border Frame */}
                <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-br from-[#F5822C]/60 via-[#3FB6D3]/60 to-[#12245C]/50 dark:from-[#F5822C]/80 dark:via-[#3FB6D3]/80 dark:to-[#4FC3E0]/70 shadow-[0_20px_50px_rgba(245,130,44,0.18)] dark:shadow-[0_20px_50px_rgba(63,182,211,0.25)] border-2 border-[#F5822C]/60 dark:border-[#3FB6D3]/70 backdrop-blur-md">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white dark:border-[#151E32]">
                    <img
                      src={heroAdvisoryImg}
                      alt="Prime Funds Solutions Loan and Financial Consultation"
                      className="w-full h-80 sm:h-96 object-cover"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-semibold text-[#4FC3E0] uppercase tracking-wider">
                        Expert Advisory
                      </span>
                      <h3 className="text-base font-bold leading-snug">
                        Empowering Indian dreams with tailored financing solutions.
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Floating Loan-Types Checklist Card with Bright Aesthetic Border */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white dark:bg-[#151E32] p-4 rounded-2xl shadow-2xl border-2 border-[#F5822C] dark:border-[#F5822C] ring-4 ring-[#F5822C]/15 dark:ring-[#F5822C]/25 max-w-xs animate-in slide-in-from-bottom duration-500 backdrop-blur-md">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-6 h-6 rounded-md bg-[#F5822C]/15 flex items-center justify-center text-[#F5822C]">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-[#12245C] dark:text-white">
                      All Loan Types Facilitated
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Home Loans
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Personal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Business
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Mortgage & LAP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES PREVIEW */}
      <section className="py-16 bg-white dark:bg-[#0B1220] relative overflow-hidden">
        {/* Background Visual Design & Subtle Watermarks */}
        <ServicesBackgroundArt />
        <DotGridPattern size={1.2} gap={32} maskRadial />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold uppercase tracking-wider mb-2">
                Our Core Offerings
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
                Comprehensive Loan Solutions
              </h2>
              <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                Explore our most popular loan products designed to fit your unique financial timeline.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F5822C] hover:text-[#e0711f] group"
            >
              <span>View All 11 Loan Types</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 80}>
                <div className="group h-full bg-white dark:bg-[#151E32] rounded-2xl border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#F5822C] md:dark:hover:border-[#F5822C] overflow-hidden shadow-sm md:hover:shadow-2xl md:hover:shadow-[#F5822C]/15 md:dark:hover:shadow-[#F5822C]/20 md:hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm">
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover md:group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 dark:bg-[#151E32]/95 md:group-hover:bg-[#F5822C] md:group-hover:text-white backdrop-blur-sm flex items-center justify-center text-[#12245C] dark:text-[#4FC3E0] shadow-sm transition-colors duration-300">
                      <DynamicIcon name={service.iconName} className="w-5 h-5" />
                    </div>
                    <div className="absolute bottom-3 left-3 text-white font-bold text-xs bg-[#12245C]/90 px-2.5 py-1 rounded">
                      {service.interestRateText}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#12245C] dark:text-white md:group-hover:text-[#F5822C] transition-colors">
                        {service.title}
                      </h3>
                      {/* One natural sentence description */}
                      <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed mt-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onNavigate('services')}
                        className="text-xs font-bold text-[#12245C] dark:text-[#4FC3E0] hover:text-[#F5822C] flex items-center gap-1 group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => onOpenApply(service.title)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md hover:shadow-[#F5822C]/30 active:scale-95"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="py-12 bg-slate-50 dark:bg-[#0F1626] border-y border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        {/* Background Visual Art */}
        <TrustStatsBackgroundArt />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_TRUST_POINTS.map((point, idx) => (
              <ScrollReveal key={point.id} delay={idx * 100}>
                <div className="group flex items-start gap-3.5 p-5 rounded-2xl bg-white/95 dark:bg-[#151E32]/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#F5822C] md:dark:hover:border-[#F5822C] shadow-sm md:hover:shadow-xl md:hover:shadow-[#F5822C]/10 md:hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#F5822C]/10 md:group-hover:bg-[#F5822C] text-[#F5822C] md:group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <DynamicIcon name={point.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#12245C] dark:text-white md:group-hover:text-[#F5822C] transition-colors leading-snug">
                      {point.title}
                    </h4>
                    {/* Real short natural sentence */}
                    <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7] mt-1 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OTHER-PAGE TEASERS */}
      <section className="py-16 bg-white dark:bg-[#0B1220] relative overflow-hidden">
        <AboutUsBackgroundArt />
        <DotGridPattern size={1.2} gap={28} maskRadial />
        <GlowAura position="top-right" variant="orange" opacity="opacity-35 dark:opacity-25" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-30 dark:opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              Discover Prime Funds Solutions
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-2">
              Everything you need to navigate your borrowing, protection, and loan planning.
            </p>
          </div>

          {/* Exactly ONE row of compact teaser cards for About Us, Insurances, Loan Calculator, Contact Us */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_TEASERS.map((teaser, index) => (
              <ScrollReveal key={teaser.id} delay={index * 90}>
                <div className="group h-full bg-white dark:bg-[#151E32] rounded-2xl border-2 border-slate-200 dark:border-slate-700 md:hover:border-[#3FB6D3] md:dark:hover:border-[#3FB6D3] overflow-hidden shadow-sm md:hover:shadow-2xl md:hover:shadow-[#3FB6D3]/15 md:dark:hover:shadow-[#3FB6D3]/20 md:hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={teaser.imageUrl}
                      alt={teaser.title}
                      className="w-full h-full object-cover md:group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/40"></div>
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 dark:bg-[#151E32]/90 md:group-hover:bg-[#3FB6D3] md:group-hover:text-white flex items-center justify-center text-[#F5822C] transition-colors duration-300">
                      <DynamicIcon name={teaser.iconName} className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-[#12245C] dark:text-white md:group-hover:text-[#3FB6D3] transition-colors">
                        {teaser.title}
                      </h3>
                      {/* One natural sentence */}
                      <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7] mt-1.5 leading-relaxed">
                        {teaser.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate(teaser.id, teaser.id === 'calculator' ? 'emi-calculator' : undefined)}
                      className="w-full py-2 px-3 rounded-lg border border-[#12245C]/20 dark:border-slate-700 text-[#12245C] dark:text-[#4FC3E0] hover:bg-[#12245C] hover:text-white dark:hover:bg-[#4FC3E0] dark:hover:text-[#0B1220] text-xs font-bold transition-all flex items-center justify-center gap-1.5 md:group-hover:border-[#3FB6D3] cursor-pointer"
                    >
                      <span>{teaser.buttonText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUICK ENQUIRY FORM */}
      <section className="py-16 bg-[#12245C] dark:bg-[#0F1626] text-white border-t border-slate-800 relative overflow-hidden">
        {/* Background Visual Art & Glows */}
        <ContactBackgroundArt />
        <GlowAura position="center" variant="mixed" opacity="opacity-30 dark:opacity-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5822C]/20 text-[#F5822C] text-xs font-bold mb-3">
              Fast Track Facilitation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Request a Free Loan Assessment
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Share your contact details to receive a customized loan sanction plan from our senior advisor.
            </p>
          </div>

          <div className="bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550]">
            {enquirySent ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#12245C] dark:text-white">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our loan facilitator Saikiran.V will call you at {formData.phone} within business hours.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={openWhatsAppEnquiry}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs shadow-md"
                  >
                    <WhatsAppIcon size={16} />
                    Message on WhatsApp
                  </button>
                  <button
                    onClick={() => setEnquirySent(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    New Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Select Loan Service *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                    >
                      <option value="Personal Loans">Personal Loans</option>
                      <option value="Home Loans">Home Loans</option>
                      <option value="Business Loans">Business Loans</option>
                      <option value="Mortgage Loans">Mortgage Loans</option>
                      <option value="Gold Loans">Gold Loans</option>
                      <option value="Vehicle Loans">Vehicle Loans</option>
                      <option value="Educational Loans">Educational Loans</option>
                      <option value="Agriculture Loans">Agriculture Loans</option>
                      <option value="Secured & Unsecured Loans">Secured & Unsecured Loans</option>
                      <option value="Micro Finance">Micro Finance</option>
                      <option value="Balance Transfer & LAP">Balance Transfer & LAP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Approximate Loan Amount
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹15,00,000"
                      value={formData.loanAmount}
                      onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F5822C]/25 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Instant Callback</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
