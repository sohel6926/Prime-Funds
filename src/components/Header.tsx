import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowRight, Phone } from 'lucide-react';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogos';
import { useData } from '../context/DataContext';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenApply: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenApply
}) => {
  const { brandDetails: BRAND_DETAILS } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'services', label: 'Services' },
    { id: 'insurances', label: 'Insurances' },
    { id: 'calculator', label: 'Loan Calculator' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0F1626]/95 backdrop-blur-md shadow-md border-b border-[#E5E9F2] dark:border-[#2A3550]'
          : 'bg-white dark:bg-[#0B1220] border-b border-[#E5E9F2]/80 dark:border-[#2A3550]/80'
      }`}
    >
      {/* Top micro-bar with contact & quick helpline info */}
      <div className="hidden md:block bg-[#12245C] dark:bg-[#070D18] text-white text-[12px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#3FB6D3] animate-pulse"></span>
              Facilitating Real Estate, All Loans & Insurances with 40+ Top Banks & NBFCs
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={BRAND_DETAILS.callUrl}
              className="flex items-center gap-1.5 text-slate-200 hover:text-[#F5822C] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5822C]" />
              <span className="font-semibold">{BRAND_DETAILS.phone}</span>
              <span className="text-slate-400">({BRAND_DETAILS.contactPerson})</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-[82px] sm:h-[86px] md:h-20 gap-2 sm:gap-6">
          
          {/* Mobile Left: Theme Toggle Button */}
          <div className="lg:hidden flex items-center z-20">
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-2 sm:p-2.5 rounded-xl border-2 border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#151E32] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#F5822C] dark:hover:text-[#F5822C] transition-all focus:outline-none focus:ring-2 focus:ring-[#F5822C] active:scale-95 shadow-sm"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-in spin-in-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#12245C] animate-in spin-in-90 duration-300" />
              )}
            </button>
          </div>

          {/* Logo container: Centered on mobile with highlight capsule, left-aligned on desktop */}
          <button
            onClick={() => handleNavClick('home')}
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#F5822C] rounded-2xl text-left z-10 transition-transform active:scale-95"
            aria-label="Prime Funds Solutions - Home"
          >
            <div className="px-3.5 py-1.5 sm:px-0 sm:py-0 rounded-2xl bg-white/95 dark:bg-[#121E36]/95 lg:bg-transparent lg:dark:bg-transparent border border-orange-500/35 dark:border-orange-400/45 lg:border-none shadow-md shadow-orange-500/15 dark:shadow-[0_0_24px_rgba(245,130,44,0.35)] lg:shadow-none backdrop-blur-md transition-all duration-300 flex items-center justify-center ring-1 ring-orange-500/10 lg:ring-0">
              <BrandLogo isDark={isDark} />
            </div>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map(link => {
              const isActive =
                currentPage === link.id ||
                (link.id === 'realestate' && currentPage === 'property-detail');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-[#F5822C] bg-[#F5822C]/10 dark:bg-[#F5822C]/15 font-bold'
                      : 'text-[#12245C] dark:text-[#F1F3F8] hover:text-[#F5822C] dark:hover:text-[#F5822C] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Theme Toggle (Desktop) + Primary CTA + Hamburger (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto sm:ml-0 pl-1 sm:pl-0 z-20">
            {/* Desktop Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="hidden lg:inline-flex p-2 sm:p-2.5 rounded-xl border-2 border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#151E32] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#F5822C] dark:hover:text-[#F5822C] transition-all focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-in spin-in-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#12245C] animate-in spin-in-90 duration-300" />
              )}
            </button>

            {/* Apply Now Primary CTA */}
            <button
              onClick={() => onOpenApply()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm tracking-wide shadow-md shadow-[#F5822C]/20 hover:shadow-lg hover:shadow-[#F5822C]/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 sm:p-2.5 rounded-xl border-2 border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#151E32] text-[#12245C] dark:text-[#F1F3F8] hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0F1626] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map(link => {
              const isActive =
                currentPage === link.id ||
                (link.id === 'realestate' && currentPage === 'property-detail');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'text-[#F5822C] bg-[#F5822C]/10 dark:bg-[#F5822C]/15 font-bold'
                      : 'text-[#12245C] dark:text-[#F1F3F8] hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-[#E5E9F2] dark:border-[#2A3550] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-3 px-5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-center text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>Apply for Loan / Insurance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={BRAND_DETAILS.callUrl}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-center text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5822C]" />
              Direct Helpline: {BRAND_DETAILS.phone} ({BRAND_DETAILS.contactPerson})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
