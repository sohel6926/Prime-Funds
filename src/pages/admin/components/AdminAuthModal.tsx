import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { BrandLogo } from '../../../components/BrandLogos';

interface AdminAuthModalProps {
  isOpen: boolean;
  onAuthenticated: () => void;
  onCancel: () => void;
  isDark: boolean;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onAuthenticated,
  onCancel,
  isDark
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'Chanti@20') {
      sessionStorage.setItem('pfs_admin_auth', 'true');
      setError('');
      onAuthenticated();
    } else {
      setError('Invalid Security Access Key. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden p-6 sm:p-8">
        
        {/* Glow Header */}
        <div className="text-center space-y-3 pb-2">
          <div className="flex justify-center mb-3">
            <BrandLogo isDark={isDark} />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5822C]/15 dark:bg-[#F5822C]/25 text-[#F5822C] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-[#12245C] dark:text-white">
            Admin Portal Access
          </h2>
          <p className="text-xs text-[#5B6377] dark:text-[#9BA3B7]">
            Please enter your security access key to open the management console.
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              autoFocus
              placeholder="Enter Security Access Key"
              value={pin}
              onChange={e => {
                setPin(e.target.value);
                if (error) setError('');
              }}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5822C]"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900 text-center">
              {error}
            </p>
          )}

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5822C] to-[#e0711f] hover:from-[#e0711f] hover:to-[#c85f14] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F5822C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Return to Website
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E5E9F2] dark:border-[#2A3550] text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Prime Funds Solutions Pvt. Ltd. • Authorized Management Console
          </p>
        </div>
      </div>
    </div>
  );
};
