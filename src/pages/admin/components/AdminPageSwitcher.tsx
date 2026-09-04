import React from 'react';
import { PageId } from '../../../types';
import {
  Home,
  Building2,
  FileText,
  Coins,
  Shield,
  Calculator,
  Phone,
  Info,
  ExternalLink,
  Lock,
  ChevronRight
} from 'lucide-react';

interface AdminPageSwitcherProps {
  onNavigateToStorefront: (page: PageId, targetId?: string) => void;
}

export const AdminPageSwitcher: React.FC<AdminPageSwitcherProps> = ({ onNavigateToStorefront }) => {
  const pages: {
    id: PageId;
    label: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Home Page', description: 'Hero, Featured Properties & Trust Badges', icon: Home },
    { id: 'realestate', label: 'Real Estate Hub', description: 'Full listings, filter by city & class', icon: Building2, badge: 'High Traffic' },
    { id: 'property-detail', label: 'Property Details', description: 'Detailed property view & pre-approved loans', icon: FileText },
    { id: 'services', label: 'Loan Services', description: '11+ Loan categories & interest rate cards', icon: Coins },
    { id: 'insurances', label: 'Insurances', description: 'Life, General & Government schemes', icon: Shield },
    { id: 'calculator', label: 'EMI Calculator', description: 'Interactive loan & eligibility tools', icon: Calculator },
    { id: 'contact', label: 'Contact Us', description: 'Corporate address & direct contact form', icon: Phone },
    { id: 'about', label: 'About Us', description: 'Company history, Saikiran.V & trust stats', icon: Info },
    { id: 'privacy', label: 'Privacy Policy', description: 'Legal compliance & data disclosures', icon: Lock },
    { id: 'terms', label: 'Terms & Conditions', description: 'Advisory agreements & jurisdictions', icon: FileText }
  ];

  return (
    <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              Storefront Live Page Switcher
            </h3>
          </div>
          <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7] mt-0.5">
            Click any storefront page below to instantly preview your live changes as visitors see them.
          </p>
        </div>
        <button
          onClick={() => onNavigateToStorefront('home')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5822C] to-[#e0711f] hover:from-[#e0711f] hover:to-[#c85f14] text-white text-xs font-bold shadow-md shadow-[#F5822C]/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <span>Open Main Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-4">
        {pages.map(page => {
          const Icon = page.icon;
          return (
            <button
              key={page.id}
              onClick={() => onNavigateToStorefront(page.id)}
              className="group flex flex-col p-3 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50/70 dark:bg-[#0B1220]/70 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 hover:border-[#F5822C]/50 dark:hover:border-[#F5822C]/50 transition-all text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#151E32] shadow-xs flex items-center justify-center text-[#12245C] dark:text-[#F5822C] group-hover:bg-[#F5822C] group-hover:text-white transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {page.badge && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#F5822C]/15 text-[#F5822C] dark:bg-[#F5822C]/25">
                    {page.badge}
                  </span>
                )}
              </div>
              <div className="font-bold text-xs text-[#12245C] dark:text-slate-100 group-hover:text-[#F5822C] flex items-center justify-between">
                <span>{page.label}</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#F5822C]" />
              </div>
              <p className="text-[10px] text-[#5B6377] dark:text-[#9BA3B7] line-clamp-1 mt-0.5">
                {page.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
