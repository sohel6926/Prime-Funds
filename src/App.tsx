import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContactFAB } from './components/FloatingContactFAB';
import { ScrollToTop } from './components/ScrollToTop';
import { ApplyModal } from './components/ApplyModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { InsurancesPage } from './pages/InsurancesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('pfs_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedServiceForApply, setSelectedServiceForApply] = useState<string>('Personal Loan');

  // Synchronize 'dark' class on <html> and <body> root elements whenever isDark state updates
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
      localStorage.setItem('pfs_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
      document.body.classList.remove('dark');
      localStorage.setItem('pfs_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleOpenApply = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForApply(serviceName);
    } else {
      setSelectedServiceForApply('Personal Loan');
    }
    setApplyModalOpen(true);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#0B1220] text-[#1A1A2E] dark:text-[#F1F3F8] transition-colors duration-300 selection:bg-[#F5822C]/20 selection:text-[#F5822C]">
      {/* 1. Global Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenApply={handleOpenApply}
      />

      {/* 2. Dynamic Main View Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} onOpenApply={() => handleOpenApply('General Loan')} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}
        {currentPage === 'insurances' && (
          <InsurancesPage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}
        {currentPage === 'calculator' && (
          <CalculatorPage onNavigate={handleNavigate} onOpenApply={handleOpenApply} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'terms' && (
          <TermsPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Global Footer (appears exactly once at true bottom) */}
      <Footer
        onNavigate={handleNavigate}
        isDark={isDark}
        onOpenApply={() => handleOpenApply('General Loan')}
      />

      {/* 4. Global Interactive Components */}
      <FloatingContactFAB />
      <ScrollToTop />
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultService={selectedServiceForApply}
      />
    </div>
  );
}
