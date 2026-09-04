import React, { useState } from 'react';
import { PageId } from '../../types';
import { AdminTab, ContentSubSection, RouteState, navigateTo, buildUrl } from '../../utils/navigation';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminDashboardTab } from './components/AdminDashboardTab';
import { AdminPropertiesTab } from './components/AdminPropertiesTab';
import { AdminLoansTab } from './components/AdminLoansTab';
import { AdminInsurancesTab } from './components/AdminInsurancesTab';
import { AdminContentTab } from './components/AdminContentTab';
import { AdminAboutTab } from './components/AdminAboutTab';
import { AdminLeadsTab } from './components/AdminLeadsTab';
import { AdminDatabaseTab } from './components/AdminDatabaseTab';
import { AdminToastContainer, ToastMessage } from './components/AdminToast';
import { AdminPropertyModal } from './components/AdminPropertyModal';
import { AdminLoanModal } from './components/AdminLoanModal';
import { useData } from '../../context/DataContext';
import { Menu, ExternalLink, Shield, Sun, Moon, Bell, ChevronRight } from 'lucide-react';

interface AdminPageProps {
  currentRoute: RouteState;
  onNavigateToStorefront: (page?: PageId, targetId?: string) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  currentRoute,
  onNavigateToStorefront,
  onLogout,
  isDark,
  onToggleTheme
}) => {
  const { addProperty, addLoan, inquiries } = useData();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Quick modals accessible from dashboard overview
  const [quickAddPropertyOpen, setQuickAddPropertyOpen] = useState(false);
  const [quickAddLoanOpen, setQuickAddLoanOpen] = useState(false);

  const activeTab: AdminTab = currentRoute.adminTab || 'overview';
  const contentSub: ContentSubSection = currentRoute.contentSub || 'about';

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      text
    };
    setToasts(prev => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleSelectTab = (tab: AdminTab, sub?: ContentSubSection) => {
    const nextRoute: RouteState = {
      page: 'admin',
      adminTab: tab,
      contentSub: sub || (tab === 'content' ? 'about' : undefined)
    };
    navigateTo(buildUrl(nextRoute));
  };

  const handleNavigateAction = (action: 'add-property' | 'add-category' | 'add-loan' | 'add-insurance') => {
    if (action === 'add-property') {
      navigateTo('/admin/realestate/add-new');
    } else if (action === 'add-category') {
      navigateTo('/admin/realestate/category/add-new');
    } else if (action === 'add-loan') {
      navigateTo('/admin/loans/add-new');
    } else if (action === 'add-insurance') {
      navigateTo('/admin/insurances/add-new');
    }
  };

  const handleSaveQuickProperty = (prop: any) => {
    addProperty(prop);
    showToast('success', `Created listing "${prop.title}".`);
  };

  const handleSaveQuickLoan = (loan: any) => {
    addLoan(loan);
    showToast('success', `Created loan service "${loan.title}".`);
  };

  // Breadcrumb generation
  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Dashboard Overview';
      case 'properties':
        if (currentRoute.adminAction === 'add-category') return 'Real Estate / Categories & Classes';
        if (currentRoute.adminAction === 'add-property') return 'Real Estate / Add New Listing';
        if (currentRoute.adminAction === 'edit-property') return 'Real Estate / Edit Listing';
        return 'Real Estate / Properties';
      case 'loans':
        if (currentRoute.adminAction === 'add-loan') return 'Loan Services / Add New Service';
        return 'Financial Products / Loan Services';
      case 'insurances':
        if (currentRoute.adminAction === 'add-insurance') return 'Insurances / Add New Scheme';
        return 'Financial Products / Insurances & Schemes';
      case 'content':
        if (contentSub === 'about') return 'Storefront CMS / About Us Page Editor';
        if (contentSub === 'privacy') return 'Storefront CMS / Privacy Policy';
        if (contentSub === 'terms') return 'Storefront CMS / Terms & Conditions';
        if (contentSub === 'brand') return 'Storefront CMS / Corporate Brand & Contact';
        if (contentSub === 'stats') return 'Storefront CMS / Milestone Counters';
        if (contentSub === 'why') return 'Storefront CMS / Why Choose Us';
        return 'Storefront CMS';
      case 'leads':
        return 'Customer Inquiries & Leads CRM';
      case 'database':
        return 'Database & Backup Management';
      default:
        return 'Admin Suite';
    }
  };

  const unreadLeadsCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1220] text-[#1A1A2E] dark:text-[#F1F3F8] flex selection:bg-[#F5822C]/20 selection:text-[#F5822C]">
      
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        contentSub={contentSub}
        onSelectTab={handleSelectTab}
        onNavigateAction={handleNavigateAction}
        onNavigateToStorefront={() => onNavigateToStorefront('home')}
        onLogout={onLogout}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper (offset by sidebar on desktop) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#111A2E]/90 backdrop-blur-md border-b border-[#E5E9F2] dark:border-[#202C45] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Trigger & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-extrabold text-[#12245C] dark:text-[#F5822C]">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-600 dark:text-slate-300 truncate max-w-[200px] sm:max-w-md">
                {getBreadcrumbTitle()}
              </span>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2.5">
            {unreadLeadsCount > 0 && (
              <button
                onClick={() => handleSelectTab('leads')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all hover:bg-emerald-500/20 cursor-pointer"
                title="View customer inquiries"
              >
                <Bell className="w-3.5 h-3.5 animate-bounce" />
                <span>{unreadLeadsCount} New Inquiries</span>
              </button>
            )}

            <button
              onClick={() => onNavigateToStorefront('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#F5822C] dark:hover:text-[#F5822C] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Open Storefront in active window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F5822C]" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#12245C]" />}
            </button>
          </div>
        </header>

        {/* 3. Main Workspace Area (NO storefront switcher!) */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Dynamic Tab Views */}
          {activeTab === 'overview' && (
            <AdminDashboardTab
              onSelectTab={tab => handleSelectTab(tab as AdminTab)}
              onNavigateToStorefront={onNavigateToStorefront}
              onOpenAddProperty={() => setQuickAddPropertyOpen(true)}
              onOpenAddLoan={() => setQuickAddLoanOpen(true)}
            />
          )}

          {activeTab === 'properties' && (
            <AdminPropertiesTab
              onNavigateToStorefront={onNavigateToStorefront}
              onShowToast={showToast}
              initialEditPropertyId={currentRoute.editPropertyId}
              initialAction={currentRoute.adminAction}
              onClearAction={() => navigateTo('/admin/realestate')}
            />
          )}

          {activeTab === 'loans' && (
            <AdminLoansTab
              onNavigateToStorefront={onNavigateToStorefront}
              onShowToast={showToast}
              initialAction={currentRoute.adminAction}
              onClearAction={() => navigateTo('/admin/loans')}
            />
          )}

          {activeTab === 'insurances' && (
            <AdminInsurancesTab
              onNavigateToStorefront={onNavigateToStorefront}
              onShowToast={showToast}
              initialAction={currentRoute.adminAction}
              onClearAction={() => navigateTo('/admin/insurances')}
            />
          )}

          {activeTab === 'content' && contentSub === 'about' && (
            <AdminAboutTab
              onNavigateToStorefront={onNavigateToStorefront}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'content' && contentSub !== 'about' && (
            <AdminContentTab
              onNavigateToStorefront={onNavigateToStorefront}
              onShowToast={showToast}
              initialSubSection={contentSub}
            />
          )}

          {activeTab === 'leads' && (
            <AdminLeadsTab onShowToast={showToast} />
          )}

          {activeTab === 'database' && (
            <AdminDatabaseTab onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* 4. Global Toast Notifications */}
      <AdminToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* 5. Quick Add Modals */}
      <AdminPropertyModal
        isOpen={quickAddPropertyOpen}
        onClose={() => setQuickAddPropertyOpen(false)}
        onSave={handleSaveQuickProperty}
      />

      <AdminLoanModal
        isOpen={quickAddLoanOpen}
        onClose={() => setQuickAddLoanOpen(false)}
        onSave={handleSaveQuickLoan}
      />
    </div>
  );
};
