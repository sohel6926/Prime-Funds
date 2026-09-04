import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingContactFAB } from './components/FloatingContactFAB';
import { ScrollToTop } from './components/ScrollToTop';
import { ApplyModal } from './components/ApplyModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RealEstatePage } from './pages/RealEstatePage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { InsurancesPage } from './pages/InsurancesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/admin/AdminPage';
import { AdminAuthPage } from './pages/admin/AdminAuthPage';
import { DataProvider } from './context/DataContext';
import { useAppRouter, navigateTo, buildUrl } from './utils/navigation';
import { Shield } from 'lucide-react';

function AppContent() {
  const { route, navigateRoute, navigateUrl } = useAppRouter();

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        sessionStorage.getItem('pfs_admin_auth') === 'true' ||
        localStorage.getItem('pfs_admin_auth') === 'true'
      );
    }
    return false;
  });

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

  // Synchronize 'dark' class on <html> and <body> root elements
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

  // Global Key Shortcut for Admin Panel (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (route.page === 'admin') {
          handleNavigate('home');
        } else {
          handleNavigate('admin');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [route.page]);

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

  const handleSelectProperty = (propertyId: string) => {
    navigateRoute({ page: 'property-detail', selectedPropertyId: propertyId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageId, targetId?: string) => {
    if (page === 'admin') {
      if (isAdminAuthenticated) {
        navigateUrl('/admin/dashboard');
      } else {
        navigateUrl('/admin/login');
      }
      return;
    }

    const path = page === 'home' ? '/' : `/${page}`;
    navigateUrl(path);

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    navigateUrl('/admin/dashboard');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('pfs_admin_auth');
    localStorage.removeItem('pfs_admin_auth');
    setIsAdminAuthenticated(false);
    navigateUrl('/admin/login');
  };

  // If on Admin route
  if (route.page === 'admin') {
    // Show dedicated Admin Auth Page if not logged in or explicitly at /admin/login
    if (!isAdminAuthenticated || route.isAdminAuthPage) {
      return (
        <AdminAuthPage
          onAuthenticated={handleAdminLoginSuccess}
          onNavigateToStorefront={() => handleNavigate('home')}
          isDark={isDark}
        />
      );
    }

    // Authenticated Admin Panel Workspace
    return (
      <AdminPage
        currentRoute={route}
        onNavigateToStorefront={handleNavigate}
        onLogout={handleAdminLogout}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // Storefront Experience
  const currentPage = route.page;
  const currentPropertyId = route.selectedPropertyId || 'skyline-crest-apartments';

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-[#0B1220] text-[#1A1A2E] dark:text-[#F1F3F8] transition-colors duration-300 selection:bg-[#F5822C]/20 selection:text-[#F5822C] overflow-x-hidden w-full max-w-full relative">
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
          <HomePage onNavigate={handleNavigate} onOpenApply={handleOpenApply} onSelectProperty={handleSelectProperty} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} onOpenApply={() => handleOpenApply('General Loan')} />
        )}
        {currentPage === 'realestate' && (
          <RealEstatePage
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
            onOpenApply={handleOpenApply}
          />
        )}
        {currentPage === 'property-detail' && (
          <PropertyDetailPage
            propertyId={currentPropertyId}
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
            onOpenApply={handleOpenApply}
          />
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

      {/* 3. Global Footer */}
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

      {/* 5. Floating Admin Quick Access Badge */}
      <div className="fixed bottom-22 left-6 z-40">
        <button
          onClick={() => handleNavigate('admin')}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#12245C]/90 hover:bg-[#12245C] dark:bg-[#151E32]/90 dark:hover:bg-[#151E32] text-white text-xs font-bold shadow-xl border border-white/20 dark:border-[#2A3550] backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Admin Panel (Shortcut: Ctrl + Shift + A)"
        >
          <span className="w-2 h-2 rounded-full bg-[#F5822C] animate-pulse"></span>
          <span>Admin Portal</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono hidden group-hover:inline-block">
            Ctrl+Shift+A
          </span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
