import React from 'react';
import { PageId } from '../types';
import { TERMS_CONDITIONS_SECTIONS } from '../data/contentData';
import { FileText, ArrowLeft, Scale } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: PageId) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full py-12 bg-white dark:bg-[#0B1220]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5822C] hover:underline mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="border-b border-[#E5E9F2] dark:border-[#2A3550] pb-6 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12245C]/10 dark:bg-white/10 text-[#12245C] dark:text-[#4FC3E0] text-xs font-bold mb-3">
            <Scale className="w-3.5 h-3.5 text-[#F5822C]" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12245C] dark:text-white">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7] mt-2">
            Last Updated: August 2026 • Prime Funds Solutions Pvt. Ltd.
          </p>
        </div>

        {/* Real paragraphs covering all 10 required items */}
        <div className="space-y-8 text-sm text-[#5B6377] dark:text-[#9BA3B7] leading-relaxed">
          {TERMS_CONDITIONS_SECTIONS.map((sec, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-[#151E32] border border-[#E5E9F2] dark:border-[#2A3550]">
              <h2 className="text-base font-bold text-[#12245C] dark:text-white mb-2">
                {sec.title}
              </h2>
              <p>{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
