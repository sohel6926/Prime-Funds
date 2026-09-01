import React, { useState } from 'react';
import { PageId, PropertyItem } from '../types';
import { PROPERTY_LISTINGS, REAL_ESTATE_CATEGORIES } from '../data/realEstateData';
import { BRAND_DETAILS } from '../data/contentData';
import { WhatsAppIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import {
  DotGridPattern,
  ArchitecturalGridPattern,
  GlowAura,
  RealEstateBackgroundArt,
  TrustStatsBackgroundArt
} from '../components/BackgroundPatterns';
import {
  Building2,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  Landmark,
  Shield,
  ChevronRight,
  Home,
  Trees,
  Star
} from 'lucide-react';

interface RealEstatePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProperty: (propertyId: string) => void;
  onOpenApply: (serviceName?: string) => void;
}

const PROPERTY_TYPE_META: Record<string, { icon: React.FC<{ className?: string }>, color: string, bgColor: string, label: string, tagline: string, hook: string }> = {
  'Open Plots': {
    icon: Trees,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    label: 'Open Plots',
    tagline: 'HMDA & RERA Approved | Clear Title | Spot Registration',
    hook: '🌿 Land is the safest investment — and we\'ve got the best picks.'
  },
  'Independent Houses': {
    icon: Home,
    color: 'text-[#F5822C]',
    bgColor: 'bg-[#F5822C]/10 border-[#F5822C]/20',
    label: 'Independent Houses',
    tagline: 'No Shared Walls | Private Land & Roof | Ready to Move',
    hook: '🏠 Your home, your rules — zero compromises.'
  },
  'G+1 Houses': {
    icon: Building2,
    color: 'text-[#3FB6D3]',
    bgColor: 'bg-[#3FB6D3]/10 border-[#3FB6D3]/20',
    label: 'G+1 Houses',
    tagline: 'Duplex | Dual Income Option | Live + Rent',
    hook: '🏗️ Live on one floor. Earn rent from the other.'
  },
  'Apartment Flats': {
    icon: Building2,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/20',
    label: 'Apartment Flats',
    tagline: '2 & 3 BHK | Gated Community | Up to 90% Loan',
    hook: '🏢 Premium living with world-class amenities.'
  }
};

export const RealEstatePage: React.FC<RealEstatePageProps> = ({
  onNavigate,
  onSelectProperty,
  onOpenApply
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = REAL_ESTATE_CATEGORIES.map(c => c.id);

  const filteredProperties = activeCategory === 'All'
    ? PROPERTY_LISTINGS
    : PROPERTY_LISTINGS.filter(p => p.propertyType === activeCategory);

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:via-[#12245C] dark:to-[#0F1626] py-16 sm:py-24 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <RealEstateBackgroundArt variant="hero" />
        <ArchitecturalGridPattern />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="top-right" variant="orange" opacity="opacity-35 dark:opacity-40" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-25 dark:opacity-30" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12245C]/10 dark:bg-[#F5822C]/20 border border-[#12245C]/15 dark:border-[#F5822C]/30 text-[#12245C] dark:text-[#F5822C] text-xs font-bold backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 text-[#F5822C]" fill="currentColor" />
            <span>Real Estate + Finance — All Under One Roof</span>
          </div>

          {/* Headline with Typing Animation */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#12245C] dark:text-white min-h-[4rem] sm:min-h-[7rem]">
            <TypewriterHeading
              phrases={[
                "Find Your Dream Property. We Handle the Loan.",
                "Open Plots · Houses · G+1 · Flats — All Financed.",
                "100% Clear Titles. Up to 90% Bank Loan. Zero Brokerage.",
                "Your Property Search Ends Here. We Do the Rest."
              ]}
              highlightWords={['We Handle the Loan.', 'All Financed.', '90% Bank Loan.', 'We Do the Rest.']}
              highlightClassName="text-[#F5822C]"
              typingSpeed={38}
              deletingSpeed={20}
              pauseDuration={2800}
            />
          </h1>

          {/* Subline */}
          <p className="text-base sm:text-lg text-[#5B6377] dark:text-slate-300 max-w-2xl mx-auto">
            Open Plots · Independent Houses · G+1 Houses · Apartment Flats<br />
            <span className="font-semibold text-[#12245C] dark:text-white">Up to 90% bank loan. 100% legal clarity. Zero brokerage.</span>
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {[
              { val: '40+', lbl: 'Partner Banks' },
              { val: '90%', lbl: 'Max Loan Funding' },
              { val: '100%', lbl: 'Clear Legal Titles' },
              { val: '₹0', lbl: 'Buyer Brokerage' }
            ].map(s => (
              <div key={s.lbl} className="px-5 py-3 rounded-2xl bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/15 backdrop-blur-sm text-center shadow-sm dark:shadow-none">
                <div className="text-xl font-extrabold text-[#F5822C]">{s.val}</div>
                <div className="text-xs text-[#5B6377] dark:text-slate-300 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I'm interested in your real estate properties. Please share available options.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-sm shadow-lg transition-all active:scale-95"
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp Us Now</span>
            </a>
            <button
              onClick={() => onOpenApply('Real Estate & Home Loan')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm shadow-lg transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Get Free Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER TABS ── */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 dark:bg-[#0F1626]/95 backdrop-blur-md border-b border-[#E5E9F2] dark:border-[#2A3550] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {REAL_ESTATE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#F5822C] text-white shadow-md shadow-[#F5822C]/25 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-[#151E32] text-[#12245C] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPERTY CARDS ── */}
      <section className="py-14 bg-slate-50 dark:bg-[#0B1220] relative overflow-hidden">
        <RealEstateBackgroundArt variant="cards" />
        <DotGridPattern size={1.2} gap={32} maskRadial />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              {activeCategory === 'All' ? 'Our Property Portfolio' : activeCategory}
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-2">
              Interested in a property? <span className="font-semibold text-[#F5822C]">Contact us for full details, pricing & site visits.</span>
            </p>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, idx) => {
              const meta = PROPERTY_TYPE_META[property.propertyType];
              const TypeIcon = meta?.icon || Building2;
              return (
                <ScrollReveal key={property.id} delay={idx * 60}>
                  <div className="group h-full flex flex-col rounded-2xl bg-white dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700/80 hover:border-[#F5822C] dark:hover:border-[#F5822C] shadow-sm hover:shadow-xl hover:shadow-[#F5822C]/10 transition-all duration-300 overflow-hidden hover:-translate-y-1.5">

                    {/* Image */}
                    <div
                      className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                      onClick={() => onSelectProperty(property.id)}
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${meta?.bgColor} ${meta?.color} backdrop-blur-sm`}>
                          {property.propertyType}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold ${
                          property.status === 'Ready to Move' || property.status === 'Clear Title Plots'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#F5822C] text-white'
                        }`}>
                          {property.status}
                        </span>
                      </div>

                      {/* Price overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <div>
                          <div className="text-lg font-extrabold">{property.price}</div>
                          <div className="text-[11px] text-slate-300">{property.area}</div>
                        </div>
                        <div className="text-[11px] px-2 py-1 rounded-lg bg-[#F5822C]/90 text-white font-bold">
                          Loan: {property.eligibleLoans[0]?.interestRate || 'Available'}
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-[#F5822C] flex-shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>

                        <h3
                          onClick={() => onSelectProperty(property.id)}
                          className="text-base font-bold text-[#12245C] dark:text-white group-hover:text-[#F5822C] transition-colors cursor-pointer line-clamp-2"
                        >
                          {property.title}
                        </h3>

                        {/* Catchy hook */}
                        <p className="text-xs font-semibold text-[#F5822C] italic">
                          "{property.catchyHook}"
                        </p>
                      </div>

                      {/* Quick highlights — max 2 */}
                      <ul className="space-y-1">
                        {property.quickHighlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                        <li className="flex items-center gap-1 text-[11px] text-[#12245C] dark:text-[#4FC3E0] font-semibold">
                          <ChevronRight className="w-3.5 h-3.5" />
                          <span>Contact us for more details →</span>
                        </li>
                      </ul>

                      {/* Action buttons */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => onSelectProperty(property.id)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-[#12245C] hover:bg-[#1c3582] dark:bg-[#F5822C] dark:hover:bg-[#e0711f] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>View Details & Loan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={BRAND_DETAILS.whatsappUrl(property.whatsappMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all duration-200 flex-shrink-0"
                        >
                          <WhatsAppIcon size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4 PROPERTY TYPES SHOWCASE ── */}
      <section className="py-16 bg-white dark:bg-[#0F1626] border-y border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <RealEstateBackgroundArt variant="cards" />
        <ArchitecturalGridPattern />
        <DotGridPattern size={1.2} gap={28} maskRadial />
        <GlowAura position="top-right" variant="orange" opacity="opacity-20 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              What We Deal In
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              4 Property Types. One Expert Team.
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] max-w-xl mx-auto">
              We specialise in helping you find, finance & protect the right property — call us to know what's available right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {([
              {
                type: 'Open Plots',
                icon: Trees,
                emoji: '🌿',
                color: 'from-emerald-500 to-emerald-600',
                lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
                border: 'border-emerald-200 dark:border-emerald-800',
                hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
                points: ['HMDA & RERA Approved', 'Clear Title Plots', 'Up to 75% Bank Loan', 'Spot Registration Available'],
                hook: 'Invest in land today. Thank yourself tomorrow.'
              },
              {
                type: 'Independent Houses',
                icon: Home,
                emoji: '🏠',
                color: 'from-[#F5822C] to-orange-600',
                lightBg: 'bg-orange-50 dark:bg-orange-950/30',
                border: 'border-orange-200 dark:border-orange-800',
                hoverBorder: 'hover:border-[#F5822C] dark:hover:border-[#F5822C]',
                points: ['No Shared Walls', 'Private Land Ownership', 'Up to 90% Bank Loan', 'Ready to Move Options'],
                hook: 'Total privacy. Your land. Your rules.'
              },
              {
                type: 'G+1 Houses',
                icon: Building2,
                emoji: '🏗️',
                color: 'from-[#3FB6D3] to-cyan-600',
                lightBg: 'bg-cyan-50 dark:bg-cyan-950/30',
                border: 'border-cyan-200 dark:border-cyan-800',
                hoverBorder: 'hover:border-[#3FB6D3] dark:hover:border-[#3FB6D3]',
                points: ['Ground + First Floor', 'Dual Income Potential', 'Up to 85% Bank Loan', 'Live + Rent Option'],
                hook: 'Let your property pay your EMI.'
              },
              {
                type: 'Apartment Flats',
                icon: Building2,
                emoji: '🏢',
                color: 'from-violet-500 to-violet-700',
                lightBg: 'bg-violet-50 dark:bg-violet-950/30',
                border: 'border-violet-200 dark:border-violet-800',
                hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-500',
                points: ['2 & 3 BHK Options', 'Gated Community Living', 'Up to 90% Bank Loan', 'Premium Amenities'],
                hook: 'Resort lifestyle. Smart investment.'
              }
            ] as const).map((item, idx) => {
              const props = PROPERTY_LISTINGS.filter(p => p.propertyType === item.type);
              return (
                <ScrollReveal key={item.type} delay={idx * 80}>
                  <div
                    className={`group p-6 rounded-2xl ${item.lightBg} border-2 ${item.border} ${item.hoverBorder} hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between cursor-pointer hover:-translate-y-1`}
                    onClick={() => setActiveCategory(item.type)}
                  >
                    <div className="space-y-4">
                      {/* Icon + Type */}
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md text-xl`}>
                          {item.emoji}
                        </div>
                        <div>
                          <div className="font-extrabold text-[#12245C] dark:text-white text-sm">{item.type}</div>
                          <div className="text-[11px] text-slate-500">{props.length} properties listed</div>
                        </div>
                      </div>

                      {/* Hook */}
                      <p className="text-xs font-bold text-[#12245C] dark:text-slate-200 italic">
                        "{item.hook}"
                      </p>

                      {/* Key points */}
                      <ul className="space-y-1.5">
                        {item.points.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveCategory(item.type); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="mt-5 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border-2 border-current text-[#12245C] dark:text-white hover:bg-[#12245C] hover:text-white dark:hover:bg-white dark:hover:text-[#12245C] transition-all"
                    >
                      View {item.type}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US — 4 PROMISES ── */}
      <section className="py-14 bg-slate-50 dark:bg-[#0B1220] relative overflow-hidden">
        <TrustStatsBackgroundArt />
        <DotGridPattern size={1.2} gap={32} maskRadial />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏦', title: '40+ Bank Partners', sub: 'SBI, HDFC, ICICI, Axis & more — lowest rates guaranteed' },
              { icon: '📋', title: '100% Legal Titles', sub: 'Every property cleared by legal & banking experts' },
              { icon: '🚗', title: 'Free Site Visits', sub: 'Cab pickup & drop arranged for your guided property tour' },
              { icon: '💬', title: 'End-to-End Support', sub: 'From property selection to loan disbursement — we\'re with you' }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 70}>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 hover:border-[#F5822C] dark:hover:border-[#F5822C] hover:shadow-lg transition-all text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-bold text-[#12245C] dark:text-white text-sm">{item.title}</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{item.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-[#12245C] via-[#0F1D4A] to-[#12245C] text-white relative overflow-hidden">
        <GlowAura position="top-right" variant="orange" opacity="opacity-35" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-25" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5822C] text-xs font-bold uppercase tracking-wider">
            Don't Miss Out — Limited Inventory
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            The Right Property Is Waiting for You.
            <br /><span className="text-[#F5822C]">Are You Ready?</span>
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Share your requirements with us — budget, area, type of property — and our expert team will do the rest.
            <strong className="text-white"> No obligations. No pressure. Just results.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I want to buy a property. Please help me with the options available.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-sm shadow-xl transition-all active:scale-95"
            >
              <WhatsAppIcon size={18} />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => onOpenApply('Property Purchase & Home Loan')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm shadow-xl transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Request Free Callback</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/30 hover:border-white text-white font-bold text-sm transition-all active:scale-95"
            >
              <span>Visit Our Office</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
