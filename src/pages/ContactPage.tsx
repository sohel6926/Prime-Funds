import React, { useState } from 'react';
import { PageId } from '../types';
import { useData } from '../context/DataContext';
import { DynamicIcon, WhatsAppIcon, PhoneCallIcon, EmailIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import {
  DotGridPattern,
  ContactBackgroundArt,
  GlowAura
} from '../components/BackgroundPatterns';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  Headphones
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { brandDetails: BRAND_DETAILS, addInquiry, openInstantEnquiry } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Home Loans',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      addInquiry({
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        itemTitle: formData.serviceType,
        itemCategory: 'Financial Service',
        paymentStatus: 'Paid (₹199)',
        leadChannel: 'Website Form',
        source: 'Contact Page',
        message: formData.message || 'Paid online message submitted from Contact Us page.'
      });
    }
    setSubmitted(true);
  };

  const openDirectWhatsApp = () => {
    const text = `Hi ${BRAND_DETAILS.contactPerson || 'Saikiran'}, I submitted a contact message regarding ${formData.serviceType}. My Name: ${formData.name}, Phone: ${formData.phone}, Email: ${formData.email}. Message: ${formData.message || 'Please contact me.'}`;
    window.open(BRAND_DETAILS.whatsappUrl(text), '_blank');
  };


  return (
    <div className="w-full">
      {/* 1. Page Header with Supporting Image */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0B1220] dark:to-[#0F1626] py-16 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <ContactBackgroundArt />
        <DotGridPattern size={1.5} gap={28} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold shadow-sm backdrop-blur-sm">
                <Headphones className="w-3.5 h-3.5" />
                <span>Direct Advisory Support</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12245C] dark:text-white tracking-tight leading-tight min-h-[3.5rem] sm:min-h-[4.5rem]">
                <TypewriterHeading
                  phrases={[
                    "Connect With Prime Funds Solutions",
                    "Direct Consultation with Saikiran.V",
                    "Instant WhatsApp & Call Support within 30 Mins"
                  ]}
                  highlightWords={['Prime Funds Solutions', 'Saikiran.V', 'Support within 30 Mins']}
                  highlightClassName="text-[#F5822C]"
                  typingSpeed={45}
                  deletingSpeed={25}
                  pauseDuration={2800}
                />
              </h1>
              {/* One natural sentence */}
              <p className="text-base sm:text-lg text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed max-w-2xl">
                Reach out to our principal facilitator Saikiran.V for immediate loan consultations, rate negotiation, or customized insurance coverage plans.
              </p>

              {/* Prominent WhatsApp and Call buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openInstantEnquiry({
                    itemTitle: 'Direct WhatsApp Helpline Inquiry',
                    itemCategory: 'Financial Service',
                    channel: 'WhatsApp',
                    targetUrl: BRAND_DETAILS.whatsappUrl(`Hi ${BRAND_DETAILS.contactPerson || 'Saikiran'}, I want to connect with Prime Funds Solutions regarding loan assistance.`)
                  })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon size={18} />
                  <span>Instant WhatsApp ({BRAND_DETAILS.phone})</span>
                </button>
                <button
                  type="button"
                  onClick={() => openInstantEnquiry({
                    itemTitle: 'Direct Call Consultation Helpline',
                    itemCategory: 'Financial Service',
                    channel: 'Call',
                    targetUrl: BRAND_DETAILS.callUrl
                  })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#12245C] dark:bg-[#1E293B] hover:bg-[#0c1840] text-white font-bold text-xs border border-slate-700 shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <PhoneCallIcon size={18} className="text-[#4FC3E0]" />
                  <span>Direct Call ({BRAND_DETAILS.phone})</span>
                </button>
              </div>
            </div>

            {/* Supporting Image for Contact Page */}
            <div className="lg:col-span-5">
              <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-br from-[#F5822C]/60 via-[#3FB6D3]/60 to-[#12245C]/50 dark:from-[#F5822C]/80 dark:via-[#3FB6D3]/80 dark:to-[#4FC3E0]/70 shadow-[0_20px_50px_rgba(245,130,44,0.18)] dark:shadow-[0_20px_50px_rgba(63,182,211,0.25)] border-2 border-[#F5822C]/60 dark:border-[#3FB6D3]/70 backdrop-blur-md">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white dark:border-[#151E32]">
                  <img
                    src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80"
                    alt="Prime Funds Solutions Financial Helpdesk"
                    className="w-full h-72 sm:h-80 object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12245C]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-bold text-[#4FC3E0] uppercase tracking-wider">
                      Fast Response Guarantee
                    </div>
                    <div className="text-sm font-semibold mt-1">
                      Every loan query receives a dedicated callback within 30 minutes during work hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Grid: Form + Details Block */}
      <section className="py-16 bg-white dark:bg-[#0B1220] relative overflow-hidden">
        <ContactBackgroundArt />
        <DotGridPattern size={1.5} gap={32} maskRadial />
        <GlowAura position="top-right" variant="orange" opacity="opacity-30 dark:opacity-20" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-25 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/95 dark:bg-[#151E32]/95 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-md md:hover:shadow-2xl md:hover:border-[#F5822C]/70 md:dark:hover:border-[#F5822C]/70 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#12245C] dark:text-white">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                  Fill in your details below and our senior advisor will contact you with specific options.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#12245C] dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Saikiran.V will get back to you at {formData.phone} or {formData.email} shortly.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={openDirectWhatsApp}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs"
                    >
                      <WhatsAppIcon size={16} />
                      Follow Up on WhatsApp
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Inquiry Service / Loan Type *
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
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
                        <option value="Health Insurance">Health Insurance (₹5L–₹5Cr)</option>
                        <option value="Life Insurance">Life / Term Insurance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Message / Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share any details such as loan amount needed, preferred banks, or current employment status..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B1220] text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                    ></textarea>
                  </div>

                  {/* Fee Breakdown Box */}
                  <div className="bg-white/90 dark:bg-[#0B1220]/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#2A3550] space-y-2.5 shadow-sm">
                    <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <span>Professional Fee</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">₹199</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <span>Processing Fee</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700/60 pt-2.5 flex justify-between items-center">
                      <span className="text-sm font-bold text-[#12245C] dark:text-white">Total Amount</span>
                      <span className="text-base sm:text-lg font-extrabold text-[#F5822C]">₹199</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F5822C]/25 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                  >
                    <span>Secure Payment & Send Inquiry</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details Block (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#12245C] dark:bg-[#151E32] text-white shadow-xl border-2 border-[#2A3550] md:hover:border-[#3FB6D3]/60 md:dark:hover:border-[#4FC3E0]/60 md:hover:shadow-2xl md:hover:shadow-[#3FB6D3]/15 transition-all duration-300 space-y-6">
                <div>
                  <div className="text-xs font-bold text-[#4FC3E0] uppercase tracking-wider">
                    Facilitation Liaison
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-1">
                    {BRAND_DETAILS.contactPerson}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Principal Financial Advisor & Partner Coordinator
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-700 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#F5822C] flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Phone / WhatsApp Helpline</div>
                      <a
                        href={BRAND_DETAILS.callUrl}
                        className="font-bold text-white hover:text-[#F5822C] transition-colors"
                      >
                        {BRAND_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#3FB6D3] flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Official Correspondence</div>
                      <a
                        href={BRAND_DETAILS.emailUrl}
                        className="font-bold text-white hover:text-[#F5822C] transition-colors"
                      >
                        {BRAND_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-[#F5822C] flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Office Location</div>
                      <div className="font-medium text-slate-200 text-xs leading-relaxed">
                        {BRAND_DETAILS.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Working Hours</div>
                      <div className="font-medium text-slate-200 text-xs">
                        Monday – Saturday: 9:30 AM – 7:30 PM (IST)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700">
                  <button
                    type="button"
                    onClick={() => openInstantEnquiry({
                      itemTitle: 'Direct Discussion on Loan / Property Application',
                      itemCategory: 'Financial Service',
                      channel: 'WhatsApp',
                      targetUrl: BRAND_DETAILS.whatsappUrl("Hi Saikiran, I want to discuss a new loan application directly.")
                    })}
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-transform active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Quick WhatsApp Connect</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Styled Map Placeholder */}
      <section className="py-12 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h4 className="text-lg font-bold text-[#12245C] dark:text-white">
              Our Advisory Headquarters
            </h4>
            <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7]">
              Financial District, Gachibowli, Hyderabad, Telangana, India
            </p>
          </div>

          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#E5E9F2] dark:border-[#2A3550] shadow-md bg-slate-200 dark:bg-slate-800">
            {/* Styled vector map background representation */}
            <div className="absolute inset-0 bg-[radial-gradient(#12245c_1px,transparent_1px)] [background-size:16px_16px] opacity-20 dark:opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-5 rounded-2xl bg-white/95 dark:bg-[#151E32]/95 backdrop-blur-md shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] text-center max-w-sm mx-4">
                <div className="w-10 h-10 rounded-full bg-[#F5822C]/15 text-[#F5822C] flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <h5 className="font-extrabold text-sm text-[#12245C] dark:text-white">
                  Prime Funds Solutions Pvt. Ltd.
                </h5>
                <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                  Prime Towers, Financial District, Hyderabad, Telangana 500032
                </p>
                <div className="mt-3 flex justify-center gap-2">
                  <a
                    href="https://maps.google.com/?q=Financial+District+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-[#12245C] dark:bg-[#F5822C] text-white text-[11px] font-bold"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
