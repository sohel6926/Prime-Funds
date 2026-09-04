import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { InsuranceItem, PageId } from '../../../types';
import { Shield, Plus, Edit2, Trash2, ExternalLink, RotateCcw, CheckCircle2, HeartHandshake, Building } from 'lucide-react';
import { AdminInsuranceModal } from './AdminInsuranceModal';
import { navigateTo } from '../../../utils/navigation';

interface AdminInsurancesTabProps {
  onNavigateToStorefront: (page: PageId) => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
  initialAction?: 'add-property' | 'edit-property' | 'add-category' | 'add-loan' | 'add-insurance';
  onClearAction?: () => void;
}

export const AdminInsurancesTab: React.FC<AdminInsurancesTabProps> = ({
  onNavigateToStorefront,
  onShowToast,
  initialAction,
  onClearAction
}) => {
  const {
    lifeInsurances,
    generalInsurances,
    govSchemes,
    addInsurance,
    updateInsurance,
    deleteInsurance,
    updateGovSchemes,
    resetInsurances
  } = useData();

  const [activeCategory, setActiveCategory] = useState<'Life Insurance' | 'General Insurance' | 'Gov Schemes'>('Life Insurance');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInsurance, setEditingInsurance] = useState<InsuranceItem | null>(null);

  useEffect(() => {
    if (initialAction === 'add-insurance') {
      setEditingInsurance(null);
      setModalOpen(true);
    }
  }, [initialAction]);

  const displayedList = activeCategory === 'Life Insurance' ? lifeInsurances : generalInsurances;

  const handleOpenAdd = () => {
    setEditingInsurance(null);
    setModalOpen(true);
    navigateTo('/admin/insurances/add-new');
  };

  const handleOpenEdit = (ins: InsuranceItem) => {
    setEditingInsurance(ins);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingInsurance(null);
    navigateTo('/admin/insurances');
    if (onClearAction) onClearAction();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete insurance plan "${title}"?`)) {
      deleteInsurance(id);
      onShowToast('info', `Removed "${title}".`);
    }
  };

  const handleSaveModal = (savedIns: InsuranceItem) => {
    if (editingInsurance) {
      updateInsurance(savedIns.id, savedIns);
      onShowToast('success', `Updated "${savedIns.title}".`);
    } else {
      addInsurance(savedIns);
      onShowToast('success', `Added "${savedIns.title}".`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all insurance plans to default factory dataset?')) {
      resetInsurances();
      onShowToast('info', 'Insurances reset to default dataset.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#F5822C]" />
            <span>Insurances & Asset Protection Manager</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5822C]/15 text-[#F5822C] font-semibold">
              {lifeInsurances.length + generalInsurances.length} Total Plans
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage Life Insurance, General Insurance (Health, Vehicle, Property), and Central Government Welfare Schemes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Reset to default insurances"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
          {activeCategory !== 'Gov Schemes' && (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Insurance Plan</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveCategory('Life Insurance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'Life Insurance'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:border-[#F5822C]'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5 text-[#F5822C]" />
          <span>Life Insurance ({lifeInsurances.length})</span>
        </button>
        <button
          onClick={() => setActiveCategory('General Insurance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'General Insurance'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:border-[#F5822C]'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-[#3FB6D3]" />
          <span>General Insurance ({generalInsurances.length})</span>
        </button>
        <button
          onClick={() => setActiveCategory('Gov Schemes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'Gov Schemes'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550] hover:border-[#F5822C]'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Gov Welfare Schemes</span>
        </button>
      </div>

      {/* Main List */}
      {activeCategory === 'Gov Schemes' ? (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              Government Social Security & Subsidized Schemes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Edit the central government insurance schemes shown on the Insurances page (e.g. PMSBY and PMJJBY).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={govSchemes.title}
                onChange={e => updateGovSchemes({ ...govSchemes, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Description
              </label>
              <textarea
                rows={3}
                value={govSchemes.description}
                onChange={e => updateGovSchemes({ ...govSchemes, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none resize-none"
              />
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#12245C] dark:text-white uppercase tracking-wider">
                Configured Schemes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {govSchemes.schemes.map((sch, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Scheme Name</label>
                      <input
                        type="text"
                        value={sch.name}
                        onChange={e => {
                          const updated = [...govSchemes.schemes];
                          updated[i].name = e.target.value;
                          updateGovSchemes({ ...govSchemes, schemes: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Premium</label>
                        <input
                          type="text"
                          value={sch.premium}
                          onChange={e => {
                            const updated = [...govSchemes.schemes];
                            updated[i].premium = e.target.value;
                            updateGovSchemes({ ...govSchemes, schemes: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Benefit</label>
                        <input
                          type="text"
                          value={sch.benefit}
                          onChange={e => {
                            const updated = [...govSchemes.schemes];
                            updated[i].benefit = e.target.value;
                            updateGovSchemes({ ...govSchemes, schemes: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedList.map(ins => (
            <div
              key={ins.id}
              className="bg-white dark:bg-[#151E32] rounded-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={ins.imageUrl}
                    alt={ins.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#3FB6D3] text-white font-bold text-[10px]">
                      {ins.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="font-extrabold text-xs text-[#F5822C] bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {ins.coverageHighlight}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-sm text-[#12245C] dark:text-white">
                    {ins.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {ins.description}
                  </p>

                  <div className="space-y-1 pt-1">
                    {ins.features?.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToStorefront('insurances')}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs transition-colors"
                  title="Preview insurances page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(ins)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#12245C] hover:bg-[#1d3580] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Plan</span>
                </button>
                <button
                  onClick={() => handleDelete(ins.id, ins.title)}
                  className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs transition-colors"
                  title="Delete plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminInsuranceModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={(saved) => {
          handleSaveModal(saved);
          handleCloseModal();
        }}
        initialInsurance={editingInsurance}
        defaultCategory={activeCategory === 'General Insurance' ? 'General Insurance' : 'Life Insurance'}
      />
    </div>
  );
};
