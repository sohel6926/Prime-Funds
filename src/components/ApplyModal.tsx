import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { useData } from '../context/DataContext';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultService?: string;
}

// Maps any incoming plan title / service name to the exact <select> option value
function resolveServiceType(name: string): string {
  const s = name.toLowerCase();
  // Insurance
  if (s.includes('term') || s.includes('life insurance') || s.includes('endowment') ||
      s.includes('ulip') || s.includes('whole life') || s.includes('money back') ||
      s.includes('child') || s.includes('pension') || s.includes('annuity') ||
      s.includes('life / term')) return 'Life / Term Insurance';
  if (s.includes('health') || s.includes('mediclaim') || s.includes('critical illness') ||
      s.includes('senior citizen health') || s.includes('family floater')) return 'Health Insurance';
  if (s.includes('vehicle insurance') || s.includes('motor') || s.includes('two wheeler') ||
      s.includes('general insurance') || s.includes('vehicle / general')) return 'Vehicle / General Insurance';
  if (s.includes('property insurance') || s.includes('structure insurance') ||
      s.includes('fire') || s.includes('commercial risk')) return 'Property & Structure Insurance';
  if (s.includes('insurance') || s.includes('policy') || s.includes('coverage') ||
      s.includes('pmsby') || s.includes('pmjjby') || s.includes('government scheme') ||
      s.includes('irdai')) return 'Life / Term Insurance';
  // Real Estate
  if (s.includes('real estate') || s.includes('site') || s.includes('plot') && s.includes('purchase') ||
      s.includes('property purchase') || s.includes('consultation')) return 'Real Estate Property Purchase';
  if (s.includes('home loan') || s.includes('villa') || s.includes('apartment') ||
      s.includes('flat') || s.includes('housing loan')) return 'Home Loan';
  if (s.includes('plot') || s.includes('land') || s.includes('construction loan')) return 'Plot & Land Construction Loan';
  if (s.includes('commercial property') || s.includes('lrd')) return 'Commercial Property & LRD Loan';
  if (s.includes('enquiry') || s.includes('inquiry') && s.includes('property')) return 'Real Estate Property Purchase';
  // Loans
  if (s.includes('personal loan')) return 'Personal Loan';
  if (s.includes('business loan')) return 'Business Loan';
  if (s.includes('mortgage')) return 'Mortgage Loan';
  if (s.includes('gold loan')) return 'Gold Loan';
  if (s.includes('vehicle loan') || s.includes('car loan') || s.includes('bike loan') ||
      s.includes('two-wheeler')) return 'Vehicle Loan';
  if (s.includes('education') || s.includes('student loan')) return 'Educational Loan';
  if (s.includes('agriculture') || s.includes('kisan') || s.includes('farm loan')) return 'Agriculture Loan';
  if (s.includes('secured') || s.includes('unsecured')) return 'Secured & Unsecured Loan';
  if (s.includes('micro finance') || s.includes('microfinance')) return 'Micro Finance';
  if (s.includes('balance transfer') || s.includes('lap') || s.includes('loan against property')) return 'Balance Transfer & LAP';
  if (s.includes('general loan') || s.includes('loan for life')) return 'Personal Loan';
  // Exact match or fallback
  const OPTIONS = [
    'Real Estate Property Purchase', 'Home Loan', 'Plot & Land Construction Loan',
    'Commercial Property & LRD Loan', 'Personal Loan', 'Business Loan', 'Mortgage Loan',
    'Gold Loan', 'Vehicle Loan', 'Educational Loan', 'Agriculture Loan',
    'Secured & Unsecured Loan', 'Micro Finance', 'Balance Transfer & LAP',
    'Property & Structure Insurance', 'Health Insurance', 'Life / Term Insurance',
    'Vehicle / General Insurance'
  ];
  const exact = OPTIONS.find(o => o.toLowerCase() === s);
  if (exact) return exact;
  return 'Personal Loan';
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Personal Loan'
}) => {
  const { brandDetails: BRAND_DETAILS, addInquiry } = useData();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: resolveServiceType(defaultService),
    loanAmount: '₹5,00,000',
    employmentType: 'Salaried Professional',
    message: '',
    city: 'Hyderabad'
  });

  const [submitted, setSubmitted] = useState(false);

  // Re-sync serviceType (and reset form) every time the modal opens with a different service
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, serviceType: resolveServiceType(defaultService) }));
      setSubmitted(false);
    }
  }, [isOpen, defaultService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone) {
      const isIns = formData.serviceType.toLowerCase().includes('insurance');
      const isProp = formData.serviceType.toLowerCase().includes('property');
      const itemCategory = isIns ? 'Insurance Plan' : (isProp ? 'Real Estate Property' : 'Loan Product');

      addInquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        itemTitle: formData.serviceType,
        itemCategory,
        paymentStatus: 'Paid (₹199)',
        leadChannel: 'Website Form',
        loanAmount: formData.loanAmount,
        employmentType: formData.employmentType,
        city: formData.city,
        message: formData.message || `Online application submitted with ₹199 consultation fee for ${formData.serviceType}.`,
        source: 'Apply Modal'
      });
    }
    setSubmitted(true);
  };

  const openWhatsAppDirect = () => {
    let text = `Hi ${BRAND_DETAILS.contactPerson || 'Saikiran'}, I want to apply for ${formData.serviceType} of amount ${formData.loanAmount}. My Name: ${formData.fullName}, Phone: ${formData.phone}`;
    if (formData.email) text += `, Email: ${formData.email}`;
    if (formData.employmentType) text += `, Employment: ${formData.employmentType}`;
    if (formData.message) text += `, Message: ${formData.message}`;
    window.open(BRAND_DETAILS.whatsappUrl(text), '_blank');
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#151E32] rounded-2xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0F1626]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F5822C]/10 dark:bg-[#F5822C]/20 flex items-center justify-center text-[#F5822C]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#12245C] dark:text-white leading-tight">
                Quick Loan & Insurance Application
              </h3>
              <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7]">
                Connect with our senior financial advisors within 30 minutes.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-[#12245C] dark:text-white">
                Application Received Successfully!
              </h4>
              <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our advisor Saikiran.V will review your {formData.serviceType} requirements and contact you at {formData.phone} shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={openWhatsAppDirect}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm transition-all shadow-md active:scale-95"
                >
                  <WhatsAppIcon size={18} className="w-4 h-4" />
                  Chat Directly on WhatsApp
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Required Service / Product *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  >
                    <option value="Real Estate Property Purchase">Real Estate Property Purchase</option>
                    <option value="Home Loan">Home Loan (Villas & Apartments)</option>
                    <option value="Plot & Land Construction Loan">Plot & Land Construction Loan</option>
                    <option value="Commercial Property & LRD Loan">Commercial Property & LRD Loan</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Mortgage Loan">Mortgage Loan</option>
                    <option value="Gold Loan">Gold Loan</option>
                    <option value="Vehicle Loan">Vehicle Loan</option>
                    <option value="Educational Loan">Educational Loan</option>
                    <option value="Agriculture Loan">Agriculture Loan</option>
                    <option value="Secured & Unsecured Loan">Secured & Unsecured Loan</option>
                    <option value="Micro Finance">Micro Finance</option>
                    <option value="Balance Transfer & LAP">Balance Transfer & LAP</option>
                    <option value="Property & Structure Insurance">Property & Structure Insurance</option>
                    <option value="Health Insurance">Health Insurance (₹5L-5Cr)</option>
                    <option value="Life / Term Insurance">Life / Term Insurance</option>
                    <option value="Vehicle / General Insurance">Vehicle / General Insurance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Required Amount
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹10,00,000"
                    value={formData.loanAmount}
                    onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Employment Category
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  >
                    <option value="Salaried Professional">Salaried Professional</option>
                    <option value="Self Employed / Business Owner">Self Employed / Business Owner</option>
                    <option value="Doctor / Professional">Doctor / Professional</option>
                    <option value="Agriculturist / Farmer">Agriculturist / Farmer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any specific requirements, preferred banks, or notes..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C] resize-none"
                />
              </div>

              {/* Fee Breakdown Box */}
              <div className="bg-slate-50 dark:bg-[#0B1220]/80 rounded-2xl p-4 border border-[#E5E9F2] dark:border-[#2A3550] space-y-2.5">
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

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F5822C]/25 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <span>Secure Payment & Send Inquiry</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-[#5B6377] dark:text-[#9BA3B7]">
                  Your data is protected. By submitting, you agree to receive consultation from Prime Funds Solutions.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
