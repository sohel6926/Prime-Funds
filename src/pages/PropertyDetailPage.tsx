import React, { useState } from 'react';
import { PageId, PropertyItem } from '../types';
import { useData } from '../context/DataContext';
import { WhatsAppIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  DotGridPattern,
  ArchitecturalGridPattern,
  GlowAura,
  RealEstateBackgroundArt
} from '../components/BackgroundPatterns';
import {
  Building2,
  MapPin,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Phone,
  Landmark,
  Shield,
  ChevronRight,
  ChevronLeft,
  Home,
  Star,
  MessageCircle,
  Calendar
} from 'lucide-react';

interface PropertyDetailPageProps {
  propertyId: string;
  onNavigate: (page: PageId, targetId?: string) => void;
  onSelectProperty: (propertyId: string) => void;
  onOpenApply: (serviceName?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  propertyId,
  onNavigate,
  onSelectProperty,
  onOpenApply
}) => {
  const { properties, brandDetails: BRAND_DETAILS, openInstantEnquiry, addInquiry } = useData();

  const property: PropertyItem =
    properties.find(p => p.id === propertyId) || properties[0];


  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const relatedProperties = properties.filter(p => p.id !== property.id).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      addInquiry({
        fullName: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceType: `Property Inquiry - ${property.title}`,
        itemTitle: property.title,
        itemCategory: 'Real Estate Property',
        paymentStatus: 'No Payment (Redirected)',
        leadChannel: 'WhatsApp',
        city: property.city,
        propertyId: property.id,
        source: 'Property Inquiry',
        message: `Inquired on property detail page for: ${property.title}. Free WhatsApp redirect.`
      });
    }
    const text = `Hi Prime Funds! I'm interested in *${property.title}* (${property.location}). My name is ${formData.name} and my phone number is ${formData.phone}. Please share full details.`;
    window.open(BRAND_DETAILS.whatsappUrl(text), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F7F9FC] dark:bg-[#0B1220] min-h-screen relative overflow-hidden">
      {/* Background visual art */}
      <RealEstateBackgroundArt />
      <ArchitecturalGridPattern />
      <DotGridPattern size={1.2} gap={32} maskRadial />

      {/* ── BREADCRUMB ── */}
      <div className="bg-white dark:bg-[#0F1626] border-b border-[#E5E9F2] dark:border-[#2A3550] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
          <button onClick={() => onNavigate('home')} className="hover:text-[#F5822C] transition-colors">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('realestate')} className="hover:text-[#F5822C] transition-colors">Real Estate</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#12245C] dark:text-white font-semibold truncate max-w-[180px] sm:max-w-none">{property.title}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT — Images + Details */}
          <div className="lg:col-span-7 space-y-6">

            {/* Back button */}
            <button
              onClick={() => onNavigate('realestate')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12245C] dark:text-[#4FC3E0] hover:text-[#F5822C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Properties
            </button>

            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[16/9] shadow-xl">
              <img
                src={property.images[activeImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-extrabold ${
                  property.status === 'Ready to Move' || property.status === 'Clear Title Plots'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#F5822C] text-white'
                }`}>
                  {property.status}
                </span>
              </div>

              {/* Image nav */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex(i => (i - 1 + property.images.length) % property.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex(i => (i + 1) % property.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {property.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === activeImageIndex ? 'bg-[#F5822C] scale-125' : 'bg-white/60'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImageIndex ? 'border-[#F5822C]' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Property Title & Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                {property.propertyClass && (
                  <span className="px-2.5 py-1 rounded-md bg-[#12245C]/10 dark:bg-white/10 text-[#12245C] dark:text-white text-[11px] font-bold border border-[#12245C]/15">
                    {property.propertyClass}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-[11px] font-bold border border-[#F5822C]/20">
                  {property.propertyType}
                </span>
                <span className="text-slate-400">•</span>
                <MapPin className="w-3.5 h-3.5 text-[#F5822C]" />
                <span>{property.location}, {property.city}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white leading-tight">
                {property.title}
              </h1>
              <p className="text-sm font-bold text-[#F5822C] italic">"{property.catchyHook}"</p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Price', value: property.price },
                { label: 'Area', value: property.area },
                { label: 'Type', value: property.subType },
                { label: 'Possession', value: property.possessionDate },
                ...(property.reraId ? [{ label: 'RERA ID', value: property.reraId }] : []),
                { label: 'Status', value: property.status }
              ].map(spec => (
                <div key={spec.label} className="p-3 rounded-xl bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{spec.label}</div>
                  <div className="text-sm font-bold text-[#12245C] dark:text-white mt-0.5 truncate">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-bold text-[#12245C] dark:text-white">About This Property</h3>
              <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">{property.description}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 italic">
                📞 Call or WhatsApp us for complete layout plans, RERA documents, and current availability.
              </p>
            </div>

            {/* Quick Highlights */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-bold text-[#12245C] dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F5822C]" fill="currentColor" />
                Key Highlights
              </h3>
              <ul className="space-y-2">
                {property.quickHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Loan Available */}
            {property.eligibleLoans.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#F5822C]/5 dark:bg-[#F5822C]/10 border-2 border-[#F5822C]/20 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F5822C]/15 flex items-center justify-center text-[#F5822C]">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[#12245C] dark:text-white">Bank Loan Available</h3>
                </div>
                {property.eligibleLoans.map(loan => (
                  <div key={loan.loanId} className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="text-center p-3 rounded-xl bg-white dark:bg-[#151E32] border border-[#F5822C]/20">
                        <div className="text-sm font-extrabold text-[#F5822C]">{loan.interestRate}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Interest Rate</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white dark:bg-[#151E32] border border-[#F5822C]/20">
                        <div className="text-sm font-extrabold text-[#F5822C]">{loan.maxFunding}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Max Funding</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-white dark:bg-[#151E32] border border-[#F5822C]/20">
                        <div className="text-sm font-extrabold text-[#F5822C]">{loan.maxTenure}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Max Tenure</div>
                      </div>
                    </div>
                    <div className="text-xs text-[#12245C] dark:text-slate-300 font-medium p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                      ✨ <strong>{loan.specialBenefit}</strong> — from {loan.partnerBanks.slice(0, 3).join(', ')} & more.
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      💬 Exact EMI, eligibility, and processing details shared on request. Contact us for a free loan assessment.
                    </p>
                  </div>
                ))}
                <button
                  onClick={() => onOpenApply(`Home Loan for ${property.title}`)}
                  className="w-full py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm transition-all shadow-lg active:scale-95"
                >
                  Check My Loan Eligibility →
                </button>
              </div>
            )}

            {/* Insurance Available */}
            {property.eligibleInsurances.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#3FB6D3]/5 dark:bg-[#3FB6D3]/10 border-2 border-[#3FB6D3]/20 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3FB6D3]/15 flex items-center justify-center text-[#3FB6D3]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[#12245C] dark:text-white">Property Insurance Available</h3>
                </div>
                {property.eligibleInsurances.map(ins => (
                  <div key={ins.insuranceId} className="p-3 rounded-xl bg-white dark:bg-[#151E32] border border-[#3FB6D3]/20 space-y-2">
                    <div className="font-semibold text-sm text-[#12245C] dark:text-white">{ins.insuranceName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{ins.coverageHighlight}</div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {ins.keyCoverages.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-[#3FB6D3]/10 text-[10px] font-semibold text-[#3FB6D3] border border-[#3FB6D3]/20">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs font-bold text-[#3FB6D3]">{ins.premiumEstimate}</div>
                  </div>
                ))}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  🛡️ Protect your biggest investment. Contact us for customized insurance quotes.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT — Contact Sidebar */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24 self-start">

            {/* Price Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
              <div className="text-2xl font-extrabold text-[#12245C] dark:text-white">
                {property.price}
              </div>
              <div className="text-sm text-[#F5822C] font-semibold">{property.tagline}</div>

              {/* Quick trust points */}
              <div className="space-y-2 pt-1">
                {[
                  '✅ 100% Legal Clear Title',
                  `✅ Bank Loan: ${property.eligibleLoans[0]?.interestRate || 'Available'}`,
                  '✅ Free Site Visit Arranged',
                  '✅ Zero Brokerage for Buyers'
                ].map((pt, i) => (
                  <div key={i} className="text-xs font-medium text-[#12245C] dark:text-slate-200">{pt}</div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => openInstantEnquiry({
                    itemTitle: property.title,
                    itemCategory: 'Real Estate Property',
                    channel: 'WhatsApp',
                    targetUrl: BRAND_DETAILS.whatsappUrl(property.whatsappMessage)
                  })}
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Enquiry</span>
                </button>
                <button
                  onClick={() => onOpenApply(`Enquiry: ${property.title}`)}
                  className="w-full py-3.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Request Free Callback</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400 pt-1">
                📍 Response within 30 minutes during business hours
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="p-6 rounded-2xl bg-[#12245C] dark:bg-[#151E32] text-white space-y-4 shadow-xl">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#F5822C]" />
                Get Full Property Details
              </h3>
              <p className="text-xs text-slate-300">
                Share your number — we'll call you with pricing, layout plans, and site visit availability.
              </p>

              {submitted ? (
                <div className="text-center py-4 space-y-2">
                  <div className="text-3xl">🎉</div>
                  <div className="font-bold text-[#25D366]">Opening WhatsApp...</div>
                  <p className="text-xs text-slate-300">Our team will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-xs text-slate-400 underline">Send another enquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <WhatsAppIcon size={16} />
                    Send on WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Site Visit Card */}
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-[#12245C] dark:text-white text-sm">Book a Free Site Visit</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                We arrange free cab pickup & drop for property site visits. See it before you decide.
              </p>
              <button
                type="button"
                onClick={() => openInstantEnquiry({
                  itemTitle: `Site Visit: ${property.title} (${property.location})`,
                  itemCategory: 'Real Estate Property',
                  channel: 'WhatsApp',
                  targetUrl: BRAND_DETAILS.whatsappUrl(`Hi Prime Funds, I want to book a FREE site visit for *${property.title}* in ${property.location}. Please share available dates.`)
                })}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon size={14} />
                Book Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* ── RELATED PROPERTIES ── */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-[#12245C] dark:text-white">
              Explore More Properties
            </h2>
            <button
              onClick={() => onNavigate('realestate')}
              className="text-xs font-bold text-[#F5822C] hover:text-[#e0711f] flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProperties.map((rel, idx) => (
              <ScrollReveal key={rel.id} delay={idx * 70}>
                <div
                  className="group rounded-2xl bg-white dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 hover:border-[#F5822C] dark:hover:border-[#F5822C] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => onSelectProperty(rel.id)}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={rel.images[0]} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#12245C]/90 text-white text-[11px] font-bold">{rel.propertyType}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-sm font-extrabold">{rel.price}</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3 h-3 text-[#F5822C]" />
                      <span className="truncate">{rel.location}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#12245C] dark:text-white group-hover:text-[#F5822C] transition-colors line-clamp-1">
                      {rel.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#F5822C]">
                      <Landmark className="w-3 h-3" />
                      Loan: {rel.eligibleLoans[0]?.interestRate || 'Available'}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
