import React, { useState } from 'react';
import { BrandLogo } from '../../components/BrandLogos';
import { ShieldCheck, Lock, KeyRound, ArrowRight, Eye, EyeOff, User, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { DotGridPattern, GlowAura } from '../../components/BackgroundPatterns';

interface AdminAuthPageProps {
  onAuthenticated: () => void;
  onNavigateToStorefront: () => void;
  isDark: boolean;
  intendedPath?: string;
}

export const AdminAuthPage: React.FC<AdminAuthPageProps> = ({
  onAuthenticated,
  onNavigateToStorefront,
  isDark,
  intendedPath
}) => {
  const [username, setUsername] = useState('primefundssolutions@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const trimmedKey = password.trim();
      const validKey = 'Chanti@20';
      
      if (trimmedKey === validKey) {
        if (rememberMe) {
          localStorage.setItem('pfs_admin_auth', 'true');
        }
        sessionStorage.setItem('pfs_admin_auth', 'true');
        setIsSubmitting(false);
        onAuthenticated();
      } else {
        setIsSubmitting(false);
        setError('Invalid Security Access Key. Please check your credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#F7F9FC] dark:bg-[#0B1220] px-4 py-12 selection:bg-[#F5822C]/20 selection:text-[#F5822C]">
      {/* Background Decor */}
      <DotGridPattern size={1.5} gap={28} />
      <GlowAura position="top-right" variant="orange" opacity="opacity-35 dark:opacity-20" />
      <GlowAura position="bottom-left" variant="cyan" opacity="opacity-30 dark:opacity-20" />

      {/* Top Bar / Return Link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between relative z-10">
        <button
          onClick={onNavigateToStorefront}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#F5822C] dark:hover:text-[#F5822C] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Storefront</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Online</span>
        </span>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden p-6 sm:p-8 relative z-10 backdrop-blur-md">
        
        {/* Header Branding */}
        <div className="text-center space-y-3 pb-2">
          <div className="flex justify-center mb-2">
            <BrandLogo isDark={isDark} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5822C]/10 text-[#F5822C] text-xs font-extrabold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Authentication</span>
          </div>

          <h2 className="text-2xl font-extrabold text-[#12245C] dark:text-white tracking-tight">
            Administrator Portal
          </h2>
          <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7] max-w-xs mx-auto">
            Authorized management console for real estate listings, loan products, CMS pages, and leads CRM.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
              Admin Username / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="primefundssolutions@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Security Access Key
              </label>
              <span className="text-[10px] text-slate-400 font-medium">
                Authorized Access
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter security access key"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-[#E5E9F2] dark:border-[#2A3550] text-[#F5822C] focus:ring-[#F5822C]"
              />
              <span>Remember this session</span>
            </label>
            <span className="text-slate-400 text-[11px]">Role: Master Admin</span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center animate-shake">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#12245C] via-[#1a337f] to-[#12245C] hover:from-[#0d1b46] hover:to-[#0d1b46] text-white font-bold text-xs shadow-lg shadow-[#12245C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
            >
              <ShieldCheck className="w-4 h-4 text-[#F5822C]" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Workspace'}</span>
            </button>
          </div>
        </form>

        {/* Security Disclaimers */}
        <div className="mt-6 pt-4 border-t border-[#E5E9F2] dark:border-[#2A3550] text-center space-y-2">
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>256-Bit Session</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Local Storage Sync</span>
            </span>
          </div>
          <p className="text-[10px] text-slate-400">
            Prime Funds Solutions Pvt. Ltd. • Protected Management Console
          </p>
        </div>
      </div>
    </div>
  );
};
