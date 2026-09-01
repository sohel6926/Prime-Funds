import React from 'react';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogos';
import { WhatsAppIcon, PhoneCallIcon, EmailIcon } from './BrandIcons';
import { BRAND_DETAILS } from '../data/contentData';
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { DotGridPattern } from './BackgroundPatterns';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  isDark: boolean;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  isDark,
  onOpenApply
}) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0B1220] text-white border-t border-[#2A3550] relative overflow-hidden">
      <DotGridPattern size={1.2} gap={30} maskRadial />
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#12245C]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#F5822C]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Company Block (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => handleNav('home')}>
              <BrandLogo isDark={true} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Prime Funds Solutions Pvt. Ltd. is India’s dedicated loan and insurance facilitation advisory helping individuals and businesses achieve their financial aspirations.
            </p>
            <div className="space-y-2 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5822C] flex-shrink-0 mt-1" />
                <span className="text-xs text-slate-300 leading-relaxed">{BRAND_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4FC3E0] flex-shrink-0" />
                <a
                  href={BRAND_DETAILS.callUrl}
                  className="text-xs text-slate-200 hover:text-[#F5822C] font-semibold transition-colors"
                >
                  {BRAND_DETAILS.phone} (Saikiran.V)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5822C] flex-shrink-0" />
                <a
                  href={BRAND_DETAILS.emailUrl}
                  className="text-xs text-slate-200 hover:text-[#F5822C] transition-colors"
                >
                  {BRAND_DETAILS.email}
                </a>
              </div>
            </div>

            {/* Real Brand-Style Contact Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_DETAILS.whatsappUrl("Hi Saikiran, I want to inquire about your loans and insurance facilitation services.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact via WhatsApp"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <WhatsAppIcon size={20} />
              </a>
              <a
                href={BRAND_DETAILS.callUrl}
                aria-label="Call directly"
                className="w-10 h-10 rounded-full bg-[#3FB6D3]/20 hover:bg-[#3FB6D3] text-[#4FC3E0] hover:text-[#0B1220] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <PhoneCallIcon size={19} />
              </a>
              <a
                href={BRAND_DETAILS.emailUrl}
                aria-label="Email directly"
                className="w-10 h-10 rounded-full bg-[#F5822C]/20 hover:bg-[#F5822C] text-[#F5822C] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <EmailIcon size={19} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-100 uppercase border-b border-slate-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('realestate')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5 font-semibold text-[#F5822C]"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  Real Estate & Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  Loan Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('insurances')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  Insurance Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('calculator')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  Loan Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5822C]" />
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Loan Offerings */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-100 uppercase border-b border-slate-800 pb-2">
              Featured Loans
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F5822C] transition-colors text-left"
                >
                  Personal Loans (Low Rate)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F5822C] transition-colors text-left"
                >
                  Home Loans (Up to 90% Value)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F5822C] transition-colors text-left"
                >
                  Business Growth Term Loans
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F5822C] transition-colors text-left"
                >
                  Mortgage & Property Loans
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F5822C] transition-colors text-left"
                >
                  Gold Loans (Instant Sanction)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#F5822C] transition-colors text-left"
                >
                  Balance Transfer & LAP
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance block */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-100 uppercase border-b border-slate-800 pb-2">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3FB6D3]" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="text-slate-400 hover:text-[#F5822C] transition-colors flex items-center gap-1.5 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3FB6D3]" />
                  Terms & Conditions
                </button>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenApply}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold text-center tracking-wide transition-all shadow-md active:scale-95"
              >
                Instant Loan Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Prime Funds Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
