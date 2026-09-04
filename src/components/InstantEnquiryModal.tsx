import React, { useState, useEffect } from 'react';
import { X, ArrowRight, PhoneCall, Sparkles, Building2, Landmark, Shield, User, Mail, Phone, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { useData } from '../context/DataContext';

export interface InstantEnquiryConfig {
  itemTitle: string;
  itemCategory: 'Real Estate Property' | 'Loan Product' | 'Insurance Plan' | 'Financial Service' | 'General' | string;
  channel?: 'WhatsApp' | 'Call';
  targetUrl: string;
}

interface InstantEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InstantEnquiryConfig | null;
}

export const InstantEnquiryModal: React.FC<InstantEnquiryModalProps> = ({
  isOpen,
  onClose,
  config
}) => {
  const { addInquiry, brandDetails } = useData();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  // Reset state when opened for a new item
  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setFormData({ fullName: '', phone: '', email: '', city: '' });
    }
  }, [isOpen, config?.itemTitle]);

  if (!isOpen || !config) return null;

  const isCall = config.channel === 'Call';
  const isWhatsApp = !isCall;

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSaveLead = () => {
    addInquiry({
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      serviceType: `${config.itemCategory} - ${config.itemTitle}`,
      itemTitle: config.itemTitle,
      itemCategory: config.itemCategory,
      paymentStatus: 'No Payment (Redirected)',
      leadChannel: isCall ? 'Call' : 'WhatsApp',
      city: formData.city.trim() || 'Telangana',
      message: `Direct inquiry via ${isCall ? 'Call' : 'WhatsApp'} button for: "${config.itemTitle}". Redirected without payment.`,
      source: isCall ? 'Instant Call Inquiry' : 'Instant WhatsApp Inquiry'
    });
  };

  const handleContinueToWhatsAppOrCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // 1. Immediately record lead in CRM
    handleSaveLead();

    // 2. Prepare tailored destination URL with user context
    if (isWhatsApp) {
      let customMsg = `Hi ${brandDetails.contactPerson || 'Saikiran'}, I am inquiring about *${config.itemTitle}* (${config.itemCategory}).\n\nMy Details:\n• Name: ${formData.fullName.trim()}\n• Mobile: ${formData.phone.trim()}\n• Email: ${formData.email.trim()}`;
      if (formData.city.trim()) customMsg += `\n• City: ${formData.city.trim()}`;
      
      const whatsappUrl = brandDetails.whatsappUrl(customMsg);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = config.targetUrl || brandDetails.callUrl;
    }

    // 3. Close modal
    onClose();
  };



  const getCategoryIcon = () => {
    const cat = (config.itemCategory || '').toLowerCase();
    if (cat.includes('property') || cat.includes('estate')) return <Building2 className="w-4 h-4 text-emerald-500" />;
    if (cat.includes('loan') || cat.includes('finance')) return <Landmark className="w-4 h-4 text-blue-500" />;
    if (cat.includes('insurance')) return <Shield className="w-4 h-4 text-teal-500" />;
    return <Sparkles className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/80 dark:bg-[#0F1626]">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${
              isWhatsApp ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/15 text-blue-600'
            }`}>
              {isWhatsApp ? <WhatsAppIcon size={20} /> : <PhoneCall className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5822C]">
                  Instant Inquiry
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                  Free Direct Connect
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#12245C] dark:text-white">
                {isWhatsApp ? 'Connect Directly on WhatsApp' : 'Direct Call Consultation'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <form onSubmit={handleContinueToWhatsAppOrCall} className="space-y-4">
              
              {/* Selected Item Banner */}
              <div className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-[#1C2744]/70 border border-orange-200/70 dark:border-orange-900/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#151E32] flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5">
                  {getCategoryIcon()}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-[#F5822C] uppercase tracking-wider block">
                    You are inquiring about:
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#12245C] dark:text-white truncate">
                    {config.itemTitle}
                  </p>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Category: {config.itemCategory}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-300 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Form Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Goud"
                      value={formData.fullName}
                      onChange={e => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] focus:bg-white dark:focus:bg-[#151E32] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9848012345"
                        value={formData.phone}
                        onChange={e => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errorMsg) setErrorMsg('');
                        }}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] focus:bg-white dark:focus:bg-[#151E32] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. rajesh@gmail.com"
                        value={formData.email}
                        onChange={e => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errorMsg) setErrorMsg('');
                        }}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] focus:bg-white dark:focus:bg-[#151E32] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    City / Location <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Karimnagar, Hyderabad, Warangal..."
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] focus:bg-white dark:focus:bg-[#151E32] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Single Action Button — saves lead + redirects simultaneously */}
              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-3.5 px-4 rounded-xl text-white text-sm font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer ${
                    isWhatsApp
                      ? 'bg-[#25D366] hover:bg-[#20bd5a] shadow-[#25D366]/30'
                      : 'bg-[#12245C] hover:bg-[#1a317a] shadow-[#12245C]/30'
                  }`}
                >
                  {isWhatsApp ? (
                    <>
                      <WhatsAppIcon size={18} />
                      <span>Submit & Continue to WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" />
                      <span>Submit & Connect via Call</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 pt-1">
                🔒 Your details are saved & you'll be connected instantly.
              </p>
            </form>
        </div>
      </div>
    </div>
  );
};
