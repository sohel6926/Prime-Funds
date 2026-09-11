import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { FeeSettings } from '../../../types';
import { calculateFeeTotals } from '../../../utils/feeUtils';
import {
  Receipt,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Eye,
  ShieldCheck,
  Sparkles,
  IndianRupee,
  Sliders,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Percent,
  BadgePercent
} from 'lucide-react';

interface AdminFeesTabProps {
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
  onNavigateToStorefront?: () => void;
}

export const AdminFeesTab: React.FC<AdminFeesTabProps> = ({
  onShowToast,
  onNavigateToStorefront
}) => {
  const { feeSettings, updateFeeSettings, resetFeeSettings } = useData();

  const [form, setForm] = useState<FeeSettings>({ ...feeSettings });
  const [isSaving, setIsSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setForm({ ...feeSettings });
    setDirty(false);
  }, [feeSettings]);

  const handleChange = (field: keyof FeeSettings, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleFeeTypeChange = (newType: 'free' | 'fixed' | 'percentage') => {
    setForm(prev => {
      const updated: FeeSettings = { ...prev, processingFeeType: newType };
      if (newType === 'fixed') {
        const cleaned = parseFloat((prev.processingFeeCustomText || '').replace(/[^0-9.]/g, ''));
        const isNum = !isNaN(cleaned) && cleaned > 0;
        if (prev.processingFee === 0 && isNum) {
          updated.processingFee = cleaned;
        } else if (prev.processingFee === 0) {
          updated.processingFee = 199;
        }
      } else if (newType === 'free') {
        const raw = (prev.processingFeeCustomText || '').trim();
        if (/^\d+$/.test(raw)) {
          // If was a pure number, keep text but clear pure processingFee
          updated.processingFee = 0;
        }
      }
      return updated;
    });
    setDirty(true);
  };

  const handleCustomTextChange = (val: string) => {
    const cleaned = parseFloat(val.replace(/[^0-9.]/g, ''));
    const isNum = !isNaN(cleaned) && /^\s*₹?\s*\d+(\.\d+)?\s*$/.test(val);
    setForm(prev => ({
      ...prev,
      processingFeeCustomText: val,
      processingFee: isNum ? cleaned : 0
    }));
    setDirty(true);
  };

  const handleBadgeChipClick = (txt: string) => {
    setForm(prev => ({
      ...prev,
      processingFeeCustomText: txt,
      processingFee: 0
    }));
    setDirty(true);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateFeeSettings(form);
      setDirty(false);
      onShowToast('success', 'Fee structure updated and synchronized across website.');
    } catch (err: any) {
      onShowToast('error', `Failed to update fees: ${err.message || err}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset fee settings to standard default (₹199 Professional Fee & FREE Processing)?')) {
      resetFeeSettings();
      onShowToast('info', 'Fee settings reset to default values.');
    }
  };

  // Preset Handlers
  const applyPreset = (preset: 'standard' | 'free' | 'premium' | 'corporate') => {
    if (preset === 'standard') {
      setForm(prev => ({
        ...prev,
        professionalFee: 199,
        professionalFeeLabel: 'Professional Fee',
        processingFee: 0,
        processingFeeLabel: 'Processing Fee',
        processingFeeType: 'free',
        processingFeeCustomText: 'FREE',
        isEnabled: true,
        buttonText: 'Secure Payment & Send Inquiry'
      }));
      setDirty(true);
      onShowToast('info', 'Applied standard ₹199 consultation fee preset.');
    } else if (preset === 'free') {
      setForm(prev => ({
        ...prev,
        professionalFee: 0,
        professionalFeeLabel: 'Consultation Fee',
        processingFee: 0,
        processingFeeLabel: 'Processing Fee',
        processingFeeType: 'free',
        processingFeeCustomText: '100% FREE',
        isEnabled: true,
        buttonText: 'Book Free Consultation'
      }));
      setDirty(true);
      onShowToast('info', 'Applied 100% Free Consultation preset.');
    } else if (preset === 'premium') {
      setForm(prev => ({
        ...prev,
        professionalFee: 499,
        professionalFeeLabel: 'Priority Advisory Fee',
        processingFee: 0,
        processingFeeLabel: 'Lender Processing',
        processingFeeType: 'free',
        processingFeeCustomText: 'WAIVED',
        isEnabled: true,
        buttonText: 'Pay ₹499 & Expedite Application'
      }));
      setDirty(true);
      onShowToast('info', 'Applied Priority Advisory (₹499) preset.');
    } else if (preset === 'corporate') {
      setForm(prev => ({
        ...prev,
        professionalFee: 999,
        professionalFeeLabel: 'Commercial & High-Value Loan Advisory',
        processingFee: 0,
        processingFeeLabel: 'Bank Processing',
        processingFeeType: 'free',
        processingFeeCustomText: 'FREE',
        isEnabled: true,
        buttonText: 'Submit Commercial Dossier'
      }));
      setDirty(true);
      onShowToast('info', 'Applied Corporate & Commercial (₹999) preset.');
    }
  };

  // Calculated Preview Total using shared engine
  const { proFee, procFee, total: calculatedTotal, isProcFree, procDisplay, formattedProFee, formattedTotal } = calculateFeeTotals(form);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12245C] via-[#1a347d] to-[#0e1b43] text-white p-6 sm:p-8 shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5822C]/20 border border-[#F5822C]/40 text-[#F5822C] text-xs font-bold uppercase tracking-wider">
              <Receipt className="w-3.5 h-3.5" />
              <span>Pricing & Transparency Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Professional & Processing Fee Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Control the exact fee amounts, service labels, currency, and payment button prompts displayed across customer consultation modals and contact forms on the storefront.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {dirty && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Unsaved Changes</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer backdrop-blur-xs active:scale-98"
              title="Reset to factory settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave()}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5822C] to-[#e0711f] hover:from-[#e0711f] hover:to-[#c85f14] text-white text-xs font-bold shadow-lg shadow-[#F5822C]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Fee Changes'}</span>
            </button>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#F5822C]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Quick Presets */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-4 sm:p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <Sparkles className="w-4 h-4 text-[#F5822C]" />
          <span>Quick Fee Presets</span>
          <span className="text-[11px] font-normal text-slate-400">— click to immediately populate standard structures:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => applyPreset('standard')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              form.professionalFee === 199 && form.processingFeeType === 'free'
                ? 'border-[#F5822C] bg-[#F5822C]/5 text-[#12245C] dark:text-white font-bold'
                : 'border-[#E5E9F2] dark:border-[#2A3550] hover:border-[#F5822C]/50 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="text-xs font-bold">Standard (₹199)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">₹199 Pro + FREE Processing</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('free')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              form.professionalFee === 0 && form.processingFeeType === 'free'
                ? 'border-emerald-500 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-[#E5E9F2] dark:border-[#2A3550] hover:border-emerald-500/50 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100% Free (₹0)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Zero Consultation & Free Proc</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('premium')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              form.professionalFee === 499
                ? 'border-purple-500 bg-purple-500/5 text-purple-700 dark:text-purple-300 font-bold'
                : 'border-[#E5E9F2] dark:border-[#2A3550] hover:border-purple-500/50 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400">Priority (₹499)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">₹499 Advisory + Waived Proc</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('corporate')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              form.professionalFee === 999
                ? 'border-sky-500 bg-sky-500/5 text-sky-700 dark:text-sky-300 font-bold'
                : 'border-[#E5E9F2] dark:border-[#2A3550] hover:border-sky-500/50 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-sky-600 dark:text-sky-400">Commercial (₹999)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Commercial Loan Facilitation</div>
          </button>
        </div>
      </div>

      {/* 3. Main Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Fee Controls (7 Cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          
          {/* Master Enable/Disable Switch */}
          <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 sm:p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm font-bold text-[#12245C] dark:text-white flex items-center gap-2">
                <span>Display Fee Breakdown Box</span>
                {form.isEnabled ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 text-[10px] font-bold">
                    Hidden (100% Free Mode)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                When active, the interactive fee breakdown box is displayed in the Apply modal and Contact form.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleChange('isEnabled', !form.isEnabled)}
              className="text-slate-700 dark:text-slate-200 cursor-pointer p-1"
            >
              {form.isEnabled ? (
                <ToggleRight className="w-9 h-9 text-[#F5822C]" />
              ) : (
                <ToggleLeft className="w-9 h-9 text-slate-400" />
              )}
            </button>
          </div>

          {/* Section: Professional Fee Settings */}
          <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 sm:p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5E9F2] dark:border-[#2A3550]">
              <div className="w-8 h-8 rounded-xl bg-[#F5822C]/10 text-[#F5822C] flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12245C] dark:text-white">
                  Professional Fee Configuration
                </h3>
                <p className="text-[11px] text-slate-400">
                  The primary consultation or advisory fee charged on initial inquiry submission.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Fee Label / Display Name
                </label>
                <input
                  type="text"
                  required
                  value={form.professionalFeeLabel}
                  onChange={e => handleChange('professionalFeeLabel', e.target.value)}
                  placeholder="e.g. Professional Fee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Example: "Professional Fee", "Consultation Fee", "Advisory Fee"
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Fee Amount ({form.currencySymbol})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                    {form.currencySymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={form.professionalFee}
                    onChange={e => handleChange('professionalFee', Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                </div>
                
                {/* Quick amount chips */}
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-medium">Quick pick:</span>
                  {[0, 99, 199, 299, 499, 999].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleChange('professionalFee', amt)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                        form.professionalFee === amt
                          ? 'bg-[#F5822C] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {form.currencySymbol}{amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Processing Fee Settings */}
          <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 sm:p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5E9F2] dark:border-[#2A3550]">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12245C] dark:text-white">
                  Processing Fee Configuration
                </h3>
                <p className="text-[11px] text-slate-400">
                  Loan paperwork and application handling charge (e.g. Free, Waived, Fixed, or %).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Fee Label / Display Name
                </label>
                <input
                  type="text"
                  required
                  value={form.processingFeeLabel}
                  onChange={e => handleChange('processingFeeLabel', e.target.value)}
                  placeholder="e.g. Processing Fee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Example: "Processing Fee", "Documentation Fee", "Lender Processing"
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Fee Status Mode
                </label>
                <select
                  value={form.processingFeeType}
                  onChange={e => handleFeeTypeChange(e.target.value as 'free' | 'fixed' | 'percentage')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#F5822C] cursor-pointer"
                >
                  <option value="free">Free / Waived (Highlighted Green)</option>
                  <option value="fixed">Fixed Currency Amount ({form.currencySymbol})</option>
                  <option value="percentage">Percentage Rate (%)</option>
                </select>
              </div>
            </div>

            {/* Sub-inputs depending on processing fee type */}
            {form.processingFeeType === 'free' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Badge Text when Free
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.processingFeeCustomText}
                    onChange={e => handleCustomTextChange(e.target.value)}
                    placeholder="FREE"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-emerald-600 dark:text-emerald-400 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {['FREE', 'WAIVED', '100% FREE', 'ZERO CHARGES'].map(txt => (
                    <button
                      key={txt}
                      type="button"
                      onClick={() => handleBadgeChipClick(txt)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                        form.processingFeeCustomText === txt
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {txt}
                    </button>
                  ))}
                </div>
                {procFee > 0 && !isProcFree && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1.5 flex items-center gap-1">
                    <span>💡 Fee amount detected ({form.currencySymbol}{procFee}): Automatically added to Total Amount ({formattedTotal}).</span>
                  </p>
                )}
              </div>
            )}

            {form.processingFeeType === 'fixed' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Processing Fee Amount ({form.currencySymbol})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                    {form.currencySymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.processingFee}
                    onChange={e => handleChange('processingFee', Number(e.target.value))}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-medium">Quick pick:</span>
                  {[0, 99, 199, 299, 499].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleChange('processingFee', amt)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                        form.processingFee === amt
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {amt === 0 ? 'FREE' : `${form.currencySymbol}${amt}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {form.processingFeeType === 'percentage' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Processing Fee Percentage Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.05"
                    value={form.processingFee}
                    onChange={e => handleChange('processingFee', Number(e.target.value))}
                    className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                    %
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section: Currency & Button Prompt */}
          <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 sm:p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5E9F2] dark:border-[#2A3550]">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12245C] dark:text-white">
                  Payment Button & Customer Disclaimers
                </h3>
                <p className="text-[11px] text-slate-400">
                  Customize the CTA button and transparency notices shown to visitors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  required
                  value={form.currencySymbol}
                  onChange={e => handleChange('currencySymbol', e.target.value)}
                  placeholder="₹"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                  Submit / Payment Button Text
                </label>
                <input
                  type="text"
                  required
                  value={form.buttonText}
                  onChange={e => handleChange('buttonText', e.target.value)}
                  placeholder="Secure Payment & Send Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Transparency & Terms Note
              </label>
              <textarea
                rows={2}
                value={form.note}
                onChange={e => handleChange('note', e.target.value)}
                placeholder="Zero advance charges. 100% transparent consultation."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
              />
            </div>
          </div>

          {/* Form Submit Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B] text-xs font-bold transition-all cursor-pointer"
            >
              Reset to Defaults
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F5822C] to-[#e0711f] hover:from-[#e0711f] hover:to-[#c85f14] text-white text-xs font-bold shadow-lg shadow-[#F5822C]/25 transition-all cursor-pointer active:scale-98 disabled:opacity-60 flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving Changes...' : 'Save All Changes'}</span>
            </button>
          </div>
        </form>

        {/* Right Column: Live Interactive Storefront Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-24">
          
          <div className="bg-white dark:bg-[#151E32] rounded-3xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E9F2] dark:border-[#2A3550]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#F5822C]" />
                <h3 className="text-xs font-extrabold text-[#12245C] dark:text-white uppercase tracking-wider">
                  Live Customer Preview
                </h3>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Real-Time Sync</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              This card renders exactly how your customers will see the pricing and fee breakdown on <span className="font-semibold text-slate-700 dark:text-slate-200">Contact Page</span> and <span className="font-semibold text-slate-700 dark:text-slate-200">Apply Consultation Modal</span>:
            </p>

            {/* The Actual Fee Card Mockup */}
            {form.isEnabled ? (
              <div className="bg-slate-50 dark:bg-[#0B1220]/90 rounded-2xl p-5 border border-slate-200 dark:border-[#2A3550] space-y-3.5 shadow-inner">
                <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <span>{form.professionalFeeLabel || 'Professional Fee'}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formattedProFee}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <span>{form.processingFeeLabel || 'Processing Fee'}</span>
                  {isProcFree ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {procDisplay}
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {procDisplay}
                    </span>
                  )}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700/60 pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-bold text-[#12245C] dark:text-white block">Total Amount</span>
                    <span className="text-[10px] text-slate-400">Inclusive of taxes</span>
                  </div>
                  <span className="text-xl font-extrabold text-[#F5822C]">
                    {formattedTotal}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-900/50 text-center space-y-1">
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  ✨ 100% Free Consultation Active
                </div>
                <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">
                  Zero advance fees or upfront consultation charges for borrowers.
                </div>
              </div>
            )}

            {/* Preview Button */}
            <div>
              <button
                type="button"
                className="w-full py-3.5 px-6 rounded-xl bg-[#F5822C] text-white font-bold text-xs tracking-wide shadow-lg shadow-[#F5822C]/20 flex items-center justify-center gap-2 pointer-events-none"
              >
                <span>{form.buttonText || 'Secure Payment & Send Inquiry'}</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Disclaimer Note */}
            {form.note && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1220] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#F5822C] shrink-0 mt-0.5" />
                <span>{form.note}</span>
              </div>
            )}

            {/* Storefront Link button */}
            {onNavigateToStorefront && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateToStorefront}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#F5822C] text-slate-700 dark:text-slate-300 hover:text-[#F5822C] dark:hover:text-[#F5822C] bg-white dark:bg-[#111A2E] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Test on Live Contact Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Quick FAQ info */}
          <div className="p-4 rounded-2xl bg-[#12245C]/5 dark:bg-[#12245C]/30 border border-[#12245C]/10 dark:border-white/5 text-xs text-[#12245C] dark:text-slate-300 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-[#F5822C]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Client Updates</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              When you save changes here, all prospective clients opening inquiry forms on mobile or desktop will see your updated fee amounts and button prompt instantly without needing a rebuild.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
