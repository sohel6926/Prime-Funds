import React from 'react';
import { PageId } from '../../../types';
import { BrandLogo } from '../../../components/BrandLogos';
import {
  LayoutDashboard,
  Building2,
  Coins,
  Shield,
  Settings,
  Users,
  Database,
  ExternalLink,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

export type AdminTab = 'overview' | 'properties' | 'loans' | 'insurances' | 'content' | 'leads' | 'database';

interface AdminNavbarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onNavigateToStorefront: (page: PageId) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  activeTab,
  onSelectTab,
  onNavigateToStorefront,
  onLogout,
  isDark,
  onToggleTheme
}) => {
  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Real Estate', icon: Building2 },
    { id: 'loans', label: 'Loan Services', icon: Coins },
    { id: 'insurances', label: 'Insurances', icon: Shield },
    { id: 'content', label: 'Site Content', icon: Settings },
    { id: 'leads', label: 'Customer Leads', icon: Users },
    { id: 'database', label: 'Database & Backup', icon: Database }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0F1626]/95 backdrop-blur-md border-b border-[#E5E9F2] dark:border-[#2A3550] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand & Admin Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigateToStorefront('home')}
              className="text-left focus:outline-none"
              title="Return to home page"
            >
              <BrandLogo isDark={isDark} />
            </button>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#12245C] text-white text-[11px] font-extrabold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5822C] animate-ping"></span>
              <span>Admin Suite</span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#F5822C]/10 text-[#F5822C] dark:bg-[#F5822C]/20 font-extrabold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#F5822C] dark:hover:text-[#F5822C] hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#151E32] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#12245C]" />}
            </button>

            {/* Exit to Storefront */}
            <button
              onClick={() => onNavigateToStorefront('home')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#1D2840] hover:bg-slate-200 dark:hover:bg-[#253350] text-[#12245C] dark:text-slate-200 text-xs font-bold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F5822C]" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            {/* Logout / Lock */}
            <button
              onClick={onLogout}
              className="p-2 sm:p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-all"
              title="Lock Admin Console"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Horizontal Tab Scroller */}
        <div className="xl:hidden flex items-center gap-1 overflow-x-auto py-2.5 border-t border-[#E5E9F2] dark:border-[#2A3550] scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#F5822C] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#151E32]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
