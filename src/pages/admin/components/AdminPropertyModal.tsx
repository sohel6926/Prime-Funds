import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PropertyItem, PropertyCategory, PropertyClass } from '../../../types';
import { X, Plus, Trash2, Image, Check, AlertCircle, Upload, XCircle, Loader2 } from 'lucide-react';
import { TARGET_LOCATIONS } from '../../../data/realEstateData';
import { uploadMultipleImages } from '../../../services/api';

interface AdminPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: PropertyItem) => void;
  initialProperty?: PropertyItem | null;
}

const CATEGORIES: PropertyCategory[] = [
  'Open Plots',
  'Independent Houses',
  'G+1 Houses',
  'Apartment Flats',
  'Commercial Space',
  'Farmland'
];

const CLASSES: PropertyClass[] = ['Residential', 'Commercial', 'Agriculture'];

const STATUSES = [
  'Ready to Move',
  'Under Construction',
  'Clear Title Plots',
  'Newly Constructed',
  'Clear Title Farmland',
  'Ready for Registration'
] as const;

export const AdminPropertyModal: React.FC<AdminPropertyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProperty
}) => {
  const [formData, setFormData] = useState<Partial<PropertyItem>>({
    id: '',
    title: '',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Gated Villa Layout',
    location: '',
    city: 'Karimnagar',
    price: '₹25 Lakhs onwards',
    numericPrice: 2500000,
    pricePerSqFt: '₹12,500 / Sq.Yd',
    area: '200 Sq.Yards',
    numericArea: 200,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '100% Vastu Clear Title Plots',
    status: 'Clear Title Plots',
    reraId: 'P02400001234',
    possessionDate: 'Ready for Spot Registration',
    tagline: 'Premium Residential Plots with Rapid Appreciation',
    description: 'High quality gated community with underground drainage, 40-ft roads, and bank loan approvals.',
    catchyHook: 'Clear 30-Yr Legal Title • Spot Registration • 75% Bank Loan Available',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'KUDA / DTCP Approved Layout',
      '40-Ft Wide CC Roads with LED Lights',
      'Underground Drainage & Water Pipeline',
      'Pre-approved Bank Loans Available'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Plot Purchase + Construction Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 75% for Plot + 85% for Building',
        maxTenure: 'Up to 25 Years',
        estimatedEmi: '₹18,500 / mo approx.',
        partnerBanks: ['State Bank of India', 'HDFC Bank', 'ICICI Bank'],
        specialBenefit: 'Zero processing fee & doorstep paperwork'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Title & Structure Shield',
        coverageHighlight: 'Protection for registered plot boundary and title indemnification',
        premiumEstimate: 'Starting ₹1,999 / year',
        keyCoverages: ['Title Defense Legal Cover', 'Boundary Wall Storm Protection']
      }
    ],
    whatsappMessage: 'Hi Prime Funds, I am interested in this property listing. Please share brochure and site visit details.',
    featured: false
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [highlightsText, setHighlightsText] = useState('');
  const highlightsRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const autoResizeHighlights = useCallback(() => {
    const el = highlightsRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  const handleImageFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    setIsUploading(true);
    try {
      const urls = await uploadMultipleImages(imageFiles, 'properties');
      setUploadedImages(prev => [...prev, ...urls]);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (idx: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    if (initialProperty) {
      setFormData({ ...initialProperty });
      setUploadedImages(initialProperty.images || []);
      setHighlightsText((initialProperty.quickHighlights || []).join('\n'));
    } else {
      const generatedId = `prop-${Date.now()}`;
      setFormData({
        id: generatedId,
        title: '',
        propertyClass: 'Residential',
        propertyType: 'Open Plots',
        subType: 'Gated Villa Layout',
        location: '',
        city: 'Karimnagar',
        price: '₹25 Lakhs onwards',
        numericPrice: 0,
        pricePerSqFt: '₹12,500 / Sq.Yd',
        area: '200 Sq.Yards',
        numericArea: 200,
        areaUnit: 'sq.yrds',
        bhkOrSpecs: '100% Vastu Clear Title',
        status: 'Clear Title Plots',
        reraId: 'P02400001234',
        possessionDate: 'Ready for Spot Registration',
        tagline: 'Premium Layout with Rapid Appreciation',
        description: 'Prime investment with high returns and bank loan facilitation.',
        catchyHook: 'Clear 30-Yr Legal Title • Spot Registration • Pre-Approved Loan',
        images: [],
        quickHighlights: [
          'Approved Layout with Clear Title',
          '40-Ft Bitumen Roads & LED Streetlights',
          'Underground Drainage & Water Pipeline',
          'Free Cab Facility Available for Site Visits'
        ],
        eligibleLoans: [
          {
            loanId: 'home-loan',
            loanName: 'Plot & Construction Loan',
            interestRate: 'From 8.35% p.a.',
            maxFunding: 'Up to 75% for Plot + 85% for Building',
            maxTenure: 'Up to 25 Years',
            estimatedEmi: '₹18,500 / mo approx.',
            partnerBanks: ['SBI', 'HDFC Bank', 'ICICI Bank', 'Canara Bank'],
            specialBenefit: 'Doorstep document pickup & quick sanction'
          }
        ],
        eligibleInsurances: [
          {
            insuranceId: 'home-insurance',
            insuranceName: 'Title & Boundary Security Shield',
            coverageHighlight: 'Protection for plot boundaries and title verification',
            premiumEstimate: 'Starting ₹1,999 / year',
            keyCoverages: ['Legal Title Protection', 'Boundary Wall Storm Protection']
          }
        ],
        whatsappMessage: 'Hi Prime Funds, I want to book a site visit for this property listing.',
        featured: false
      });
      setUploadedImages([]);
      setHighlightsText(
        'Approved Layout with Clear Title\n40-Ft Bitumen Roads & LED Streetlights\nUnderground Drainage & Water Pipeline\nFree Cab Facility Available for Site Visits'
      );
    }
  }, [initialProperty, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price) {
      alert('Please fill in required fields (Title, Location, Price).');
      return;
    }

    const parsedImages = uploadedImages;

    const parsedHighlights = highlightsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const finalItem: PropertyItem = {
      id: formData.id || `prop-${Date.now()}`,
      title: formData.title || '',
      propertyClass: formData.propertyClass || 'Residential',
      propertyType: formData.propertyType || 'Open Plots',
      subType: formData.subType || '',
      location: formData.location || '',
      city: formData.city || 'Karimnagar',
      price: formData.price || '',
      numericPrice: Number(formData.numericPrice) || 0,
      pricePerSqFt: formData.pricePerSqFt || '',
      area: formData.area || '',
      numericArea: Number(formData.numericArea) || 0,
      areaUnit: formData.areaUnit || 'sq.yrds',
      bhkOrSpecs: formData.bhkOrSpecs || '',
      status: (formData.status as any) || 'Clear Title Plots',
      reraId: formData.reraId || '',
      possessionDate: formData.possessionDate || 'Immediate Spot Registration',
      tagline: formData.tagline || '',
      description: formData.description || '',
      catchyHook: formData.catchyHook || '',
      images: parsedImages.length > 0 ? parsedImages : [],
      quickHighlights: parsedHighlights.length > 0 ? parsedHighlights : ['Clear Title', 'Spot Registration'],
      eligibleLoans: formData.eligibleLoans || [],
      eligibleInsurances: formData.eligibleInsurances || [],
      whatsappMessage: formData.whatsappMessage || `Hi Prime Funds, I want to inquire about ${formData.title}.`,
      featured: Boolean(formData.featured)
    };

    onSave(finalItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0F1626]">
          <div>
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              {initialProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in the property details. Changes appear live on the storefront.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* Main Title & ID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. KUDA Approved Premium Residential Villa Plots"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Listing ID
              </label>
              <input
                type="text"
                value={formData.id || ''}
                onChange={e => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-600 dark:text-slate-400 font-mono text-xs outline-none"
              />
            </div>
          </div>

          {/* Classification & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Property Class
              </label>
              <select
                value={formData.propertyClass || 'Residential'}
                onChange={e => setFormData({ ...formData, propertyClass: e.target.value as PropertyClass })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                {CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Property Type / Category
              </label>
              <select
                value={formData.propertyType || 'Open Plots'}
                onChange={e => setFormData({ ...formData, propertyType: e.target.value as PropertyCategory })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Sub-Type Tag
              </label>
              <input
                type="text"
                value={formData.subType || ''}
                onChange={e => setFormData({ ...formData, subType: e.target.value })}
                placeholder="e.g. Gated Villa Layout"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          {/* Location & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                City / District *
              </label>
              <select
                value={formData.city || 'Karimnagar'}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                {TARGET_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Specific Location / Corridor *
              </label>
              <input
                type="text"
                required
                value={formData.location || ''}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Collectorate Road / Rekurthi Corridor"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          {/* Price & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Display Price *
              </label>
              <input
                type="text"
                required
                value={formData.price || ''}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. ₹28 Lakhs onwards"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Numeric Price (in ₹) *
                <span className="ml-1 text-[10px] font-normal text-orange-400">Used by search filters</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.numericPrice ?? ''}
                onChange={e => setFormData({ ...formData, numericPrice: Number(e.target.value) })}
                placeholder="e.g. 2500000 (for ₹25 Lakhs)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-orange-400/60 dark:border-orange-400/40 bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Rate Per Sq.Ft / Sq.Yd
              </label>
              <input
                type="text"
                value={formData.pricePerSqFt || ''}
                onChange={e => setFormData({ ...formData, pricePerSqFt: e.target.value })}
                placeholder="e.g. ₹14,000 / Sq.Yd"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Area Text
              </label>
              <input
                type="text"
                value={formData.area || ''}
                onChange={e => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. 200 Sq.Yards"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Numeric Area
                <span className="ml-1 text-[10px] font-normal text-orange-400">Used by filters</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.numericArea ?? ''}
                onChange={e => setFormData({ ...formData, numericArea: Number(e.target.value) })}
                placeholder="e.g. 200"
                className="w-full px-3.5 py-2.5 rounded-xl border border-orange-400/60 dark:border-orange-400/40 bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Area Unit
                <span className="ml-1 text-[10px] font-normal text-orange-400">Used by filters</span>
              </label>
              <select
                value={formData.areaUnit || 'sq.yrds'}
                onChange={e => setFormData({ ...formData, areaUnit: e.target.value as 'sq.yrds' | 'acres' | 'sq.ft' })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-orange-400/60 dark:border-orange-400/40 bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                <option value="sq.yrds">Sq. Yards</option>
                <option value="sq.ft">Sq. Feet</option>
                <option value="acres">Acres</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Specs / BHK / Title
              </label>
              <input
                type="text"
                value={formData.bhkOrSpecs || ''}
                onChange={e => setFormData({ ...formData, bhkOrSpecs: e.target.value })}
                placeholder="e.g. 100% Vastu Clear Title"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Status
              </label>
              <select
                value={formData.status || 'Clear Title Plots'}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                {STATUSES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                RERA / Approval ID
              </label>
              <input
                type="text"
                value={formData.reraId || ''}
                onChange={e => setFormData({ ...formData, reraId: e.target.value })}
                placeholder="e.g. P02400009821"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Possession Timeline
              </label>
              <input
                type="text"
                value={formData.possessionDate || ''}
                onChange={e => setFormData({ ...formData, possessionDate: e.target.value })}
                placeholder="e.g. Ready for Spot Registration"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          {/* Tagline & Hook */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Gated Township Layout with 40-Ft CC Roads, Avenue Trees & 24/7 Security"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Comprehensive description of the layout, amenities, and location advantages..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none resize-none"
            />
          </div>

          {/* Images Upload */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center justify-between">
              <span>Property Images</span>
              <span className="text-[11px] font-normal text-slate-400">{uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''} added</span>
            </label>

            {/* Drop Zone */}
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); }}
              onDrop={e => { e.preventDefault(); handleImageFiles(e.dataTransfer.files); }}
              className={`border-2 border-dashed border-[#E5E9F2] dark:border-[#2A3550] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                isUploading
                  ? 'opacity-60 cursor-not-allowed'
                  : 'cursor-pointer hover:border-[#F5822C] hover:bg-orange-50/40 dark:hover:bg-orange-950/10'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 text-[#F5822C] animate-spin" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Uploading to Cloudinary...</p>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-[#F5822C]" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Click or drag &amp; drop images here</p>
                  <p className="text-[10px] text-slate-400">JPG, PNG, WebP supported • Uploaded to Cloudinary</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => handleImageFiles(e.target.files)}
            />

            {/* Thumbnails */}
            {uploadedImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {uploadedImages.map((src, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#E5E9F2] dark:border-[#2A3550] aspect-video">
                    <img src={src} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-[#F5822C] text-white px-1.5 py-0.5 rounded">Cover</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Highlights (1 per line) */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-between">
              <span>Key Highlights / Amenities (1 per line)</span>
              <span className="text-[11px] font-normal text-slate-400">Bullet points for property card</span>
            </label>
            <textarea
              ref={highlightsRef}
              rows={4}
              value={highlightsText}
              onChange={e => { setHighlightsText(e.target.value); autoResizeHighlights(); }}
              onInput={autoResizeHighlights}
              placeholder="KUDA Approved Layout&#10;40-Ft CC Roads&#10;Underground Drainage"
              style={{ resize: 'none', overflow: 'hidden' }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none text-xs transition-all"
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40">
            <input
              type="checkbox"
              id="featuredToggle"
              checked={Boolean(formData.featured)}
              onChange={e => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#F5822C] rounded focus:ring-[#F5822C]"
            />
            <label htmlFor="featuredToggle" className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
              Mark as Featured Listing (Appears prominently on Home Page hero & top spots)
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-[#E5E9F2] dark:border-[#2A3550] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all"
            >
              Save Property Listing
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
