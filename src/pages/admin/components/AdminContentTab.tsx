import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { PageId, PolicySection } from '../../../types';
import {
  Settings,
  Building,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  ShieldCheck,
  FileText,
  FileCode2,
  RotateCcw,
  Save,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';

interface AdminContentTabProps {
  onNavigateToStorefront: (page: PageId) => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
  initialSubSection?: 'about' | 'privacy' | 'terms' | 'brand' | 'why' | 'stats';
}

export const AdminContentTab: React.FC<AdminContentTabProps> = ({
  onNavigateToStorefront,
  onShowToast,
  initialSubSection = 'brand'
}) => {
  const {
    brandDetails,
    updateBrandDetails,
    resetBrandDetails,
    aboutStats,
    updateAboutStats,
    whyChooseUs,
    updateWhyChooseUs,
    trustPoints,
    updateTrustPoint,
    privacySections,
    updatePrivacySections,
    termsSections,
    updateTermsSections
  } = useData();

  type SubTab = 'brand' | 'privacy' | 'terms' | 'why' | 'stats';

  const [activeSection, setActiveSection] = useState<SubTab>(() => {
    if (initialSubSection === 'privacy') return 'privacy';
    if (initialSubSection === 'terms') return 'terms';
    if (initialSubSection === 'why') return 'why';
    if (initialSubSection === 'stats') return 'stats';
    return 'brand';
  });

  useEffect(() => {
    if (initialSubSection === 'privacy') setActiveSection('privacy');
    else if (initialSubSection === 'terms') setActiveSection('terms');
    else if (initialSubSection === 'why') setActiveSection('why');
    else if (initialSubSection === 'stats') setActiveSection('stats');
    else if (initialSubSection === 'brand') setActiveSection('brand');
  }, [initialSubSection]);

  // Brand Local State
  const [brandForm, setBrandForm] = useState({
    name: brandDetails.name,
    tagline: brandDetails.tagline,
    subTagline: brandDetails.subTagline,
    contactPerson: brandDetails.contactPerson,
    phone: brandDetails.phone,
    rawPhone: brandDetails.rawPhone,
    email: brandDetails.email,
    address: brandDetails.address
  });

  // Local state for legal sections for smooth editing
  const [localPrivacy, setLocalPrivacy] = useState<PolicySection[]>(() => [...privacySections]);
  const [localTerms, setLocalTerms] = useState<PolicySection[]>(() => [...termsSections]);

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandDetails(brandForm);
    onShowToast('success', 'Corporate branding & contact information updated successfully.');
  };

  const handleResetBrand = () => {
    if (window.confirm('Reset corporate branding and contact details to factory default?')) {
      resetBrandDetails();
      setBrandForm({
        name: 'Prime Funds Solutions Pvt. Ltd.',
        tagline: 'All About Loans',
        subTagline: 'Indian loans & insurance facilitation consultancy',
        contactPerson: 'Saikiran.V',
        phone: '+91 9177886354',
        rawPhone: '919177886354',
        email: 'primefundssolutions@gmail.com',
        address: 'Prime Towers, Financial District, Gachibowli, Hyderabad, Telangana 500032, India'
      });
      onShowToast('info', 'Branding reset to default.');
    }
  };

  // Privacy Policy Handlers
  const handleSavePrivacy = () => {
    updatePrivacySections(localPrivacy);
    onShowToast('success', 'Privacy Policy updated successfully.');
  };

  const handleAddPrivacyClause = () => {
    const newClause: PolicySection = {
      title: `${localPrivacy.length + 1}. New Policy Clause`,
      content: 'Enter the terms and disclosure details for this policy section.'
    };
    setLocalPrivacy(prev => [...prev, newClause]);
  };

  const handleRemovePrivacyClause = (idx: number) => {
    setLocalPrivacy(prev => prev.filter((_, i) => i !== idx));
  };

  // Terms & Conditions Handlers
  const handleSaveTerms = () => {
    updateTermsSections(localTerms);
    onShowToast('success', 'Terms & Conditions legal clauses updated successfully.');
  };

  const handleAddTermsClause = () => {
    const newClause: PolicySection = {
      title: `${localTerms.length + 1}. New Terms Clause`,
      content: 'Enter the legal agreement terms and advisory conditions for this clause.'
    };
    setLocalTerms(prev => [...prev, newClause]);
  };

  const handleRemoveTermsClause = (idx: number) => {
    setLocalTerms(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#F5822C]" />
            <span>Storefront Branding & Content Manager</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Modify corporate contact numbers, Saikiran.V facilitator details, Privacy Policy, Terms & Conditions, and value pillars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToStorefront(activeSection === 'privacy' ? 'privacy' : activeSection === 'terms' ? 'terms' : 'contact')}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Preview on live storefront"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Preview Live Page</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSection('brand')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'brand'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-[#F5822C]" />
          <span>Brand & Contact Info</span>
        </button>

        <button
          onClick={() => setActiveSection('privacy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'privacy'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-purple-400" />
          <span>Privacy Policy Editor ({localPrivacy.length} Clauses)</span>
        </button>

        <button
          onClick={() => setActiveSection('terms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'terms'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Terms & Conditions Editor ({localTerms.length} Clauses)</span>
        </button>

        <button
          onClick={() => setActiveSection('why')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'why'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#3FB6D3]" />
          <span>Why Choose Us & Trust</span>
        </button>

        <button
          onClick={() => setActiveSection('stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'stats'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span>Milestone Stats</span>
        </button>
      </div>

      {/* 1. BRAND & CONTACT SECTION */}
      {activeSection === 'brand' && (
        <form onSubmit={handleSaveBrand} className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E9F2] dark:border-[#2A3550]">
            <div>
              <h3 className="text-base font-bold text-[#12245C] dark:text-white">
                Corporate Identity & Universal Contact Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updating these values dynamically updates the Header top-bar, Footer, WhatsApp direct links, Floating FAB, and Contact pages in real-time.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetBrand}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Brand</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Company Legal Name
              </label>
              <input
                type="text"
                required
                value={brandForm.name}
                onChange={e => setBrandForm({ ...brandForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Primary Contact Person / Facilitator Name
              </label>
              <input
                type="text"
                required
                value={brandForm.contactPerson}
                onChange={e => setBrandForm({ ...brandForm, contactPerson: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Display Phone Number (Formatted)
              </label>
              <input
                type="text"
                required
                value={brandForm.phone}
                onChange={e => setBrandForm({ ...brandForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Raw WhatsApp / Tel Phone (Country code included, no spaces)
              </label>
              <input
                type="text"
                required
                value={brandForm.rawPhone}
                onChange={e => setBrandForm({ ...brandForm, rawPhone: e.target.value })}
                placeholder="e.g. 919177886354"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Official Support Email
              </label>
              <input
                type="email"
                required
                value={brandForm.email}
                onChange={e => setBrandForm({ ...brandForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={brandForm.tagline}
                onChange={e => setBrandForm({ ...brandForm, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Corporate Office Address
            </label>
            <textarea
              rows={2}
              value={brandForm.address}
              onChange={e => setBrandForm({ ...brandForm, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Corporate Details</span>
            </button>
          </div>
        </form>
      )}

      {/* 2. DEDICATED PRIVACY POLICY EDITOR */}
      {activeSection === 'privacy' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E9F2] dark:border-[#2A3550]">
            <div>
              <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Privacy Policy Clauses Editor</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage all legal data handling disclosures. Visitors can read this directly at <code className="text-[#F5822C]">/privacy</code>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddPrivacyClause}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#253350] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-500" />
                <span>Add Clause</span>
              </button>

              <button
                type="button"
                onClick={handleSavePrivacy}
                className="px-5 py-2 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Privacy Policy</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {localPrivacy.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-500">Clause #{idx + 1}</span>
                  {localPrivacy.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePrivacyClause(idx)}
                      className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                      title="Delete clause"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Clause Title</label>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={e => {
                      const updated = [...localPrivacy];
                      updated[idx].title = e.target.value;
                      setLocalPrivacy(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Clause Narrative & Content</label>
                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={e => {
                      const updated = [...localPrivacy];
                      updated[idx].content = e.target.value;
                      setLocalPrivacy(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSavePrivacy}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Privacy Policy Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. DEDICATED TERMS & CONDITIONS EDITOR */}
      {activeSection === 'terms' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E9F2] dark:border-[#2A3550]">
            <div>
              <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-indigo-400" />
                <span>Terms & Conditions Legal Clauses Editor</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage advisory agreements, financial facilitation terms, and jurisdiction clauses displayed at <code className="text-[#F5822C]">/terms</code>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddTermsClause}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#253350] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-500" />
                <span>Add Clause</span>
              </button>

              <button
                type="button"
                onClick={handleSaveTerms}
                className="px-5 py-2 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Terms & Conditions</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {localTerms.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-500">Clause #{idx + 1}</span>
                  {localTerms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTermsClause(idx)}
                      className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                      title="Delete clause"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Clause Heading</label>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={e => {
                      const updated = [...localTerms];
                      updated[idx].title = e.target.value;
                      setLocalTerms(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Clause Terms & Legal Details</label>
                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={e => {
                      const updated = [...localTerms];
                      updated[idx].content = e.target.value;
                      setLocalTerms(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSaveTerms}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Terms & Conditions Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. WHY CHOOSE US & TRUST SECTION */}
      {activeSection === 'why' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              Why Choose Us Value Pillars
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The 4 key competitive advantages displayed on Home and About pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Pillar Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => {
                      const updated = [...whyChooseUs];
                      updated[idx].title = e.target.value;
                      updateWhyChooseUs(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={e => {
                      const updated = [...whyChooseUs];
                      updated[idx].description = e.target.value;
                      updateWhyChooseUs(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5E9F2] dark:border-[#2A3550]">
            <h4 className="text-sm font-bold text-[#12245C] dark:text-white mb-2">
              Home Page Trust Points
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustPoints.map(tp => (
                <div key={tp.id} className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-2">
                  <input
                    type="text"
                    value={tp.title}
                    onChange={e => updateTrustPoint(tp.id, { title: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs font-bold outline-none"
                  />
                  <textarea
                    rows={2}
                    value={tp.description}
                    onChange={e => updateTrustPoint(tp.id, { description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ABOUT STATS SECTION */}
      {activeSection === 'stats' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              Animated Counter Statistics (About Us Page)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize the milestone counters that smoothly count up when visitors view your About page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutStats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5822C]">Stat Metric #{idx + 1}</span>
                  <span className="text-xs font-bold text-slate-400">{stat.value}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={e => {
                      const updated = [...aboutStats];
                      updated[idx].label = e.target.value;
                      updateAboutStats(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Prefix</label>
                    <input
                      type="text"
                      value={stat.prefix}
                      onChange={e => {
                        const updated = [...aboutStats];
                        updated[idx].prefix = e.target.value;
                        updated[idx].value = `${e.target.value}${stat.numericValue}${stat.suffix}`;
                        updateAboutStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Number</label>
                    <input
                      type="number"
                      value={stat.numericValue}
                      onChange={e => {
                        const updated = [...aboutStats];
                        updated[idx].numericValue = Number(e.target.value);
                        updated[idx].value = `${stat.prefix}${e.target.value}${stat.suffix}`;
                        updateAboutStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Suffix</label>
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={e => {
                        const updated = [...aboutStats];
                        updated[idx].suffix = e.target.value;
                        updated[idx].value = `${stat.prefix}${stat.numericValue}${e.target.value}`;
                        updateAboutStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
