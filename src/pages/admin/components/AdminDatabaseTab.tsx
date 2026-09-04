import React from 'react';
import { useData } from '../../../context/DataContext';
import { Database, Download, AlertTriangle, RotateCcw, CheckCircle2, FileJson, HardDrive, Layers } from 'lucide-react';

interface AdminDatabaseTabProps {
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const AdminDatabaseTab: React.FC<AdminDatabaseTabProps> = ({ onShowToast }) => {
  const { exportAllDataJSON, resetAllToDefaults, lastSavedTimestamp, properties, loans, lifeInsurances, generalInsurances, inquiries } = useData();

  const handleExport = () => {
    const jsonStr = exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prime_funds_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('success', 'Full database JSON backup downloaded successfully.');
  };

  const handleFactoryReset = () => {
    if (
      window.confirm(
        'WARNING: This will reset ALL properties, loans, insurance plans, brand details, and customer inquiries to factory defaults. Are you sure you wish to proceed?'
      )
    ) {
      resetAllToDefaults();
      onShowToast('info', 'All data successfully reset to factory defaults.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs">
        <h2 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-[#F5822C]" />
          <span>Database Management & Data Export</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Download a complete standalone JSON backup of your website catalog, listings, and customer CRM leads.
        </p>
      </div>

      {/* Main Export & Download Card */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E9F2] dark:border-[#2A3550]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#12245C] dark:text-white">
                Download Full System Database Backup
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exports all real estate listings, loan schemes, insurance packages, and customer leads into a structured JSON file.
              </p>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="px-6 py-3 rounded-xl bg-[#12245C] hover:bg-[#1a317a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap active:scale-98"
          >
            <Download className="w-4 h-4 text-[#F5822C]" />
            <span>Download Database JSON File</span>
          </button>
        </div>

        {/* Database Inventory Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Current Database Inventory Snapshot
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Real Estate Listings</div>
              <div className="text-lg font-extrabold text-[#12245C] dark:text-white mt-0.5">{properties.length} Assets</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Loan Products</div>
              <div className="text-lg font-extrabold text-[#12245C] dark:text-white mt-0.5">{loans.length} Lines</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Insurance Schemes</div>
              <div className="text-lg font-extrabold text-[#12245C] dark:text-white mt-0.5">{lifeInsurances.length + generalInsurances.length} Plans</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Customer CRM Leads</div>
              <div className="text-lg font-extrabold text-[#F5822C] mt-0.5">{inquiries.length} Inquiries</div>
            </div>
          </div>
        </div>

        {/* Storage Persistence Info */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
            <span>All catalog edits and leads are automatically preserved in browser storage in real time.</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Last auto-sync: <span className="font-mono text-slate-700 dark:text-slate-300">{new Date(lastSavedTimestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/40 space-y-3">
        <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-sm font-bold">Factory Master Reset</h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Need to revert to pristine demo data? This restores all properties, loan rates, insurance plans, contact person numbers, and inquiries back to the original source defaults.
        </p>
        <button
          onClick={handleFactoryReset}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Data to Factory Defaults</span>
        </button>
      </div>
    </div>
  );
};
