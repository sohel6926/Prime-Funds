import React from 'react';
import { BrandLogo } from '../../../components/BrandLogos';
import { AdminTab, ContentSubSection } from '../../../utils/navigation';
import { useData } from '../../../context/DataContext';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  FolderTree,
  Coins,
  ShieldCheck,
  Receipt,
  FileText,
  FileCode2,
  Sparkles,
  TrendingUp,
  PhoneCall,
  Users,
  Database,
  ExternalLink,
  Sun,
  Moon,
  LogOut,
  X,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: AdminTab;
  contentSub?: ContentSubSection;
  onSelectTab: (tab: AdminTab, contentSub?: ContentSubSection) => void;
  onNavigateAction?: (action: 'add-property' | 'add-category' | 'add-loan' | 'add-insurance') => void;
  onNavigateToStorefront: (path?: string) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  contentSub = 'about',
  onSelectTab,
  onNavigateAction,
  onNavigateToStorefront,
  onLogout,
  isDark,
  onToggleTheme,
  mobileOpen,
  onCloseMobile
}) => {
  const { inquiries, brandDetails } = useData();
  const newLeadsCount = inquiries.filter(i => i.status === 'New').length;

  const handleTabClick = (tab: AdminTab, sub?: ContentSubSection) => {
    onSelectTab(tab, sub);
    onCloseMobile();
  };

  const handleActionClick = (action: 'add-property' | 'add-category' | 'add-loan' | 'add-insurance') => {
    if (onNavigateAction) onNavigateAction(action);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-[#111A2E] border-r border-[#E5E9F2] dark:border-[#202C45] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* 1. Header with Logo & Close button */}
        <div className="h-20 px-5 border-b border-[#E5E9F2] dark:border-[#202C45] flex items-center justify-between">
          <div className="flex flex-col">
            <BrandLogo isDark={isDark} />
            <div className="flex items-center gap-1.5 mt-1 ml-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-[#F5822C] uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 text-xs select-none">
          
          {/* Section: Overview */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Control Suite
            </div>
            <button
              onClick={() => handleTabClick('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#F5822C]" />
              <span className="flex-1 text-left">Dashboard Overview</span>
              {activeTab === 'overview' && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Section: Real Estate */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Real Estate Hub
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleTabClick('properties')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'properties'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#F5822C]" />
                <span className="flex-1 text-left">All Property Listings</span>
              </button>

              <button
                onClick={() => handleActionClick('add-property')}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#F5822C] hover:bg-slate-50 dark:hover:bg-[#16223B] transition-colors cursor-pointer pl-9"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="flex-1 text-left text-[11px]">Add New Property</span>
              </button>

              <button
                onClick={() => handleActionClick('add-category')}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#F5822C] hover:bg-slate-50 dark:hover:bg-[#16223B] transition-colors cursor-pointer pl-9"
              >
                <FolderTree className="w-3.5 h-3.5 text-[#3FB6D3]" />
                <span className="flex-1 text-left text-[11px]">Categories & Types</span>
              </button>
            </div>
          </div>

          {/* Section: Finance & Insurance */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Financial Products
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleTabClick('loans')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'loans'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="flex-1 text-left">Loan Services (11+)</span>
              </button>

              <button
                onClick={() => handleTabClick('insurances')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'insurances'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#3FB6D3]" />
                <span className="flex-1 text-left">Insurances & Schemes</span>
              </button>

              <button
                onClick={() => handleTabClick('fees')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'fees'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <Receipt className="w-4 h-4 text-emerald-500" />
                <span className="flex-1 text-left">Professional & Processing Fees</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F5822C]/15 text-[#F5822C]">
                  Fees
                </span>
              </button>
            </div>
          </div>

          {/* Section: Storefront CMS & Content */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Storefront CMS Pages
            </div>
            <div className="space-y-1">
              {/* About Us Page */}
              <button
                onClick={() => handleTabClick('content', 'about')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'content' && contentSub === 'about'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F5822C]" />
                <span className="flex-1 text-left">About Us Page CMS</span>
              </button>

              {/* Privacy Policy */}
              <button
                onClick={() => handleTabClick('content', 'privacy')}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors cursor-pointer pl-9 ${
                  activeTab === 'content' && contentSub === 'privacy'
                    ? 'font-bold text-[#F5822C]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span className="flex-1 text-left text-[11px]">Privacy Policy</span>
              </button>

              {/* Terms & Conditions */}
              <button
                onClick={() => handleTabClick('content', 'terms')}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors cursor-pointer pl-9 ${
                  activeTab === 'content' && contentSub === 'terms'
                    ? 'font-bold text-[#F5822C]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="flex-1 text-left text-[11px]">Terms & Conditions</span>
              </button>

              {/* Brand & Helpline Info */}
              <button
                onClick={() => handleTabClick('content', 'brand')}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors cursor-pointer pl-9 ${
                  activeTab === 'content' && contentSub === 'brand'
                    ? 'font-bold text-[#F5822C]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                <span className="flex-1 text-left text-[11px]">Brand & Helpline Info</span>
              </button>

              {/* Counter Stats */}
              <button
                onClick={() => handleTabClick('content', 'stats')}
                className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors cursor-pointer pl-9 ${
                  activeTab === 'content' && contentSub === 'stats'
                    ? 'font-bold text-[#F5822C]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span className="flex-1 text-left text-[11px]">Milestone Stats</span>
              </button>
            </div>
          </div>

          {/* Section: Leads & System */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Operations & CRM
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleTabClick('leads')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-500" />
                <span className="flex-1 text-left">Customer Leads</span>
                {newLeadsCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#F5822C] text-white text-[10px] font-bold">
                    {newLeadsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleTabClick('database')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'database'
                    ? 'bg-[#12245C] text-white shadow-md shadow-[#12245C]/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#16223B]'
                }`}
              >
                <Database className="w-4 h-4 text-sky-500" />
                <span className="flex-1 text-left">Database & Backups</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Footer Actions (Theme, View Storefront, Logout) */}
        <div className="p-3.5 border-t border-[#E5E9F2] dark:border-[#202C45] bg-slate-50/70 dark:bg-[#0E1526] space-y-2">
          
          {/* Quick External Link to Storefront */}
          <button
            onClick={() => onNavigateToStorefront()}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#F5822C] text-slate-700 dark:text-slate-200 hover:text-[#F5822C] dark:hover:text-[#F5822C] bg-white dark:bg-[#151E32] text-xs font-bold flex items-center justify-between transition-all cursor-pointer shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#F5822C]" />
              <span>View Live Website</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Theme & User Profile Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#12245C] dark:bg-[#F5822C] text-white flex items-center justify-center font-bold text-xs">
                {brandDetails.contactPerson ? brandDetails.contactPerson.charAt(0) : 'A'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                  {brandDetails.contactPerson || 'Saikiran.V'}
                </span>
                <span className="text-[10px] text-slate-400">Master Admin</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onToggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#12245C]" />}
              </button>

              <button
                onClick={onLogout}
                title="Logout from Admin"
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
