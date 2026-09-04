import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { ServiceItem, PageId } from '../../../types';
import { Coins, Plus, Edit2, Trash2, ExternalLink, RotateCcw, CheckCircle2, Percent, Clock } from 'lucide-react';
import { AdminLoanModal } from './AdminLoanModal';
import { navigateTo } from '../../../utils/navigation';

interface AdminLoansTabProps {
  onNavigateToStorefront: (page: PageId) => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
  initialAction?: 'add-property' | 'edit-property' | 'add-category' | 'add-loan' | 'add-insurance';
  onClearAction?: () => void;
}

export const AdminLoansTab: React.FC<AdminLoansTabProps> = ({
  onNavigateToStorefront,
  onShowToast,
  initialAction,
  onClearAction
}) => {
  const { loans, addLoan, updateLoan, deleteLoan, resetLoans } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState<ServiceItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (initialAction === 'add-loan') {
      setEditingLoan(null);
      setModalOpen(true);
    }
  }, [initialAction]);

  const filteredLoans = loans.filter(l => selectedCategory === 'all' || l.category === selectedCategory);

  const handleOpenAdd = () => {
    setEditingLoan(null);
    setModalOpen(true);
    navigateTo('/admin/loans/add-new');
  };

  const handleOpenEdit = (loan: ServiceItem) => {
    setEditingLoan(loan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingLoan(null);
    navigateTo('/admin/loans');
    if (onClearAction) onClearAction();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete loan product "${title}"?`)) {
      deleteLoan(id);
      onShowToast('info', `Removed "${title}".`);
    }
  };

  const handleSaveModal = (savedLoan: ServiceItem) => {
    if (editingLoan) {
      updateLoan(savedLoan.id, savedLoan);
      onShowToast('success', `Updated "${savedLoan.title}".`);
    } else {
      addLoan(savedLoan);
      onShowToast('success', `Added "${savedLoan.title}".`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all loan services to default dataset?')) {
      resetLoans();
      onShowToast('info', 'Loan services reset to default dataset.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#F5822C]" />
            <span>Loan Services & Products Manager</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5822C]/15 text-[#F5822C] font-semibold">
              {loans.length} Active Services
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure interest rates, tenures, eligibility criteria, and WhatsApp inquiry links for all loan categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Reset to default loans"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Loan Product</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'Personal', 'Property', 'Business', 'Specialized'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#12245C] text-white shadow-sm'
                : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:border-[#F5822C]'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Loan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLoans.map(loan => (
          <div
            key={loan.id}
            className="bg-white dark:bg-[#151E32] rounded-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header with image & rate badge */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={loan.imageUrl}
                  alt={loan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#F5822C] text-white font-bold text-[10px]">
                    {loan.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Percent className="w-3.5 h-3.5" />
                    <span>{loan.interestRateText}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-300">
                    <Clock className="w-3 h-3" />
                    <span>{loan.tenureText}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2.5">
                <h3 className="font-bold text-sm text-[#12245C] dark:text-white">
                  {loan.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {loan.description}
                </p>

                <div className="space-y-1 pt-1">
                  {loan.features?.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigateToStorefront('services')}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs transition-colors"
                title="Preview services page"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleOpenEdit(loan)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#12245C] hover:bg-[#1d3580] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Loan</span>
              </button>
              <button
                onClick={() => handleDelete(loan.id, loan.title)}
                className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs transition-colors"
                title="Delete loan"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminLoanModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={(saved) => {
          handleSaveModal(saved);
          handleCloseModal();
        }}
        initialLoan={editingLoan}
      />
    </div>
  );
};
