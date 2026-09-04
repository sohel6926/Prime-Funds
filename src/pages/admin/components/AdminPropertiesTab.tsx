import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '../../../context/DataContext';
import { PropertyItem, PageId } from '../../../types';
import { TARGET_LOCATIONS } from '../../../data/realEstateData';
import {
  Building2,
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  CheckCircle2,
  Copy,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { AdminPropertyModal } from './AdminPropertyModal';

import { navigateTo } from '../../../utils/navigation';

interface AdminPropertiesTabProps {
  onNavigateToStorefront: (page: PageId, targetId?: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
  initialEditPropertyId?: string;
  initialAction?: 'add-property' | 'edit-property' | 'add-category' | 'add-loan' | 'add-insurance';
  onClearAction?: () => void;
}

export const AdminPropertiesTab: React.FC<AdminPropertiesTabProps> = ({
  onNavigateToStorefront,
  onShowToast,
  initialEditPropertyId,
  initialAction,
  onClearAction
}) => {
  const { properties, addProperty, updateProperty, deleteProperty, resetProperties } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingProperty, setEditingProperty] = useState<PropertyItem | null>(null);

  // Deep link effect for edit property or category modal
  useEffect(() => {
    if (initialEditPropertyId) {
      const found = properties.find(p => p.id === initialEditPropertyId);
      if (found) {
        setEditingProperty(found);
        setModalOpen(true);
      }
    } else if (initialAction === 'add-property') {
      setEditingProperty(null);
      setModalOpen(true);
    } else if (initialAction === 'add-category') {
      setCategoryModalOpen(true);
    }
  }, [initialEditPropertyId, initialAction, properties]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchSearch =
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prop.reraId && prop.reraId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCity = selectedCity === 'all' || prop.city === selectedCity;
      const matchClass = selectedClass === 'all' || prop.propertyClass === selectedClass;

      return matchSearch && matchCity && matchClass;
    });
  }, [properties, searchQuery, selectedCity, selectedClass]);

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setModalOpen(true);
    navigateTo('/admin/realestate/add-new');
  };

  const handleOpenEdit = (prop: PropertyItem) => {
    setEditingProperty(prop);
    setModalOpen(true);
    navigateTo(`/admin/realestate/${prop.id}/edit`);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProperty(null);
    navigateTo('/admin/realestate');
    if (onClearAction) onClearAction();
  };

  const handleDuplicate = (prop: PropertyItem) => {
    const duplicated: PropertyItem = {
      ...prop,
      id: `prop-${Date.now()}`,
      title: `${prop.title} (Copy)`,
      featured: false
    };
    addProperty(duplicated);
    onShowToast('success', `Duplicated "${prop.title}" successfully.`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete listing "${title}"?`)) {
      deleteProperty(id);
      onShowToast('info', `Listing "${title}" removed.`);
    }
  };

  const handleToggleFeatured = (prop: PropertyItem) => {
    updateProperty(prop.id, { featured: !prop.featured });
    onShowToast(
      'success',
      !prop.featured
        ? `Marked "${prop.title}" as Featured.`
        : `Removed Featured status from "${prop.title}".`
    );
  };

  const handleSaveModal = (savedProperty: PropertyItem) => {
    if (editingProperty) {
      updateProperty(savedProperty.id, savedProperty);
      onShowToast('success', `Updated listing "${savedProperty.title}".`);
    } else {
      addProperty(savedProperty);
      onShowToast('success', `Added new listing "${savedProperty.title}".`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all property listings to default factory dataset? Custom changes will be restored to defaults.')) {
      resetProperties();
      onShowToast('info', 'Properties reset to default dataset.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Action & Filter Bar */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#12245C] dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#F5822C]" />
              <span>Real Estate Listings Manager</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5822C]/15 text-[#F5822C] font-semibold">
                {properties.length} Total Listings
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage residential plots, luxury villas, commercial hubs, and agricultural land listings.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetDefaults}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Reset properties to initial default dataset"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Listing</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E5E9F2] dark:border-[#2A3550]">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, location, RERA..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
            >
              <option value="all">All Locations (Karimnagar, Mancherial...)</option>
              {TARGET_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
            >
              <option value="all">All Property Classes</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Cards / Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-12 text-center border border-[#E5E9F2] dark:border-[#2A3550] space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-[#12245C] dark:text-white">No Properties Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            No properties match your current search or filter. Try clearing filters or create a new listing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map(prop => (
            <div
              key={prop.id}
              className="group bg-white dark:bg-[#151E32] rounded-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Preview Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={prop.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges on Image */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#12245C]/80 backdrop-blur-md text-white font-bold text-[10px]">
                      {prop.city}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F5822C]/90 backdrop-blur-md text-white font-bold text-[10px]">
                      {prop.propertyType}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleFeatured(prop)}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
                      prop.featured
                        ? 'bg-amber-400 text-white shadow-md'
                        : 'bg-black/40 text-white/70 hover:text-white'
                    }`}
                    title={prop.featured ? 'Featured on Home Hero' : 'Click to feature'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                    <span className="font-extrabold text-sm text-[#F5822C] drop-shadow-md">
                      {prop.price}
                    </span>
                    <span className="font-medium text-[11px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      {prop.area}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-sm text-[#12245C] dark:text-white line-clamp-1 group-hover:text-[#F5822C] transition-colors">
                    {prop.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#F5822C] flex-shrink-0" />
                    <span className="line-clamp-1">{prop.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800">
                      <span className="block text-slate-400">Rate</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{prop.pricePerSqFt || 'Market Rate'}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#0B1220] border border-slate-100 dark:border-slate-800">
                      <span className="block text-slate-400">Status</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate block">{prop.status}</span>
                    </div>
                  </div>

                  {prop.reraId && (
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>RERA: {prop.reraId}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-slate-50 dark:bg-[#0F1626] border-t border-[#E5E9F2] dark:border-[#2A3550] flex items-center justify-between gap-1.5">
                <button
                  onClick={() => onNavigateToStorefront('property-detail')}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs transition-colors"
                  title="Preview on storefront"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDuplicate(prop)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs transition-colors"
                  title="Duplicate listing"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(prop)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#12245C] hover:bg-[#1d3580] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(prop.id, prop.title)}
                  className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs transition-colors"
                  title="Delete listing"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Property Add/Edit Modal */}
      <AdminPropertyModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={(saved) => {
          handleSaveModal(saved);
          handleCloseModal();
        }}
        initialProperty={editingProperty}
      />

      {/* Category & Types Manager Modal */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E9F2] dark:border-[#2A3550]">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#3FB6D3]/15 text-[#3FB6D3] flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#12245C] dark:text-white">
                    Property Categories & Classes
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Manage available property classifications and categories across Prime Funds.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCategoryModalOpen(false);
                  navigateTo('/admin/realestate');
                  if (onClearAction) onClearAction();
                }}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Active Property Classes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Residential', 'Commercial', 'Agriculture'].map(cls => (
                    <span
                      key={cls}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] text-[#12245C] dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{cls}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Configured Property Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Open Plots',
                    'Independent Houses',
                    'G+1 Houses',
                    'Apartment Flats',
                    'Commercial',
                    'Agriculture',
                    'Commercial Space',
                    'Farmland'
                  ].map(cat => (
                    <span
                      key={cat}
                      className="px-3 py-1.5 rounded-xl bg-[#12245C]/5 dark:bg-white/5 text-[#12245C] dark:text-[#4FC3E0] font-semibold border border-[#12245C]/15 dark:border-white/10 text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E9F2] dark:border-[#2A3550]">
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Add Custom Category or Subtype
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Luxury Duplex, Studio Flat"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none focus:ring-2 focus:ring-[#F5822C]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCategoryName.trim()) {
                        onShowToast('success', `Category "${newCategoryName}" registered for listings.`);
                        setNewCategoryName('');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold cursor-pointer transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setCategoryModalOpen(false);
                  navigateTo('/admin/realestate');
                  if (onClearAction) onClearAction();
                }}
                className="px-5 py-2 rounded-xl bg-[#12245C] dark:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
