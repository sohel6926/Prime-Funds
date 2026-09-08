import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InsuranceItem } from '../../../types';
import { X, Upload, XCircle, Loader2 } from 'lucide-react';
import { uploadImage } from '../../../services/api';

interface AdminInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (insurance: InsuranceItem) => void;
  initialInsurance?: InsuranceItem | null;
  defaultCategory?: 'Life Insurance' | 'General Insurance';
}

export const AdminInsuranceModal: React.FC<AdminInsuranceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialInsurance,
  defaultCategory = 'Life Insurance'
}) => {
  const [formData, setFormData] = useState<Partial<InsuranceItem>>({
    id: '',
    title: '',
    category: defaultCategory,
    coverageHighlight: 'Up to ₹1 Crore Cover',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    iconName: 'Shield',
    whatsappMessage: 'Hi Saikiran, I want to inquire about this insurance plan.',
    features: ['High sum assured', 'Cashless claim support', 'Tax benefits under 80C/80D']
  });

  const [featuresText, setFeaturesText] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const featuresRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeFeatures = useCallback(() => {
    const el = featuresRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  const [isUploading, setIsUploading] = useState(false);

  const handleImageFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    try {
      const url = await uploadImage(file, 'insurances');
      setUploadedImage(url);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (initialInsurance) {
      setFormData({ ...initialInsurance });
      setFeaturesText((initialInsurance.features || []).join('\n'));
      setUploadedImage(initialInsurance.imageUrl || '');
    } else {
      const newId = `ins-${Date.now()}`;
      setFormData({
        id: newId,
        title: '',
        category: defaultCategory,
        coverageHighlight: defaultCategory === 'Life Insurance' ? 'Up to ₹2 Crore+ Cover' : 'Comprehensive Protection',
        description: 'Protect your financial legacy and assets against unexpected adversities.',
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
        iconName: 'Shield',
        whatsappMessage: 'Hi Saikiran, I want to know more about this insurance plan.',
        features: ['Instant policy generation', 'Cashless settlements', 'Tax exemptions']
      });
      setFeaturesText('Instant policy generation\nCashless settlements\nTax exemptions');
      setUploadedImage('');
    }
  }, [initialInsurance, defaultCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.coverageHighlight) {
      alert('Please fill in title and coverage highlight.');
      return;
    }

    const parsedFeatures = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const finalInsurance: InsuranceItem = {
      id: formData.id || `ins-${Date.now()}`,
      title: formData.title || '',
      category: (formData.category as any) || 'Life Insurance',
      coverageHighlight: formData.coverageHighlight || '',
      description: formData.description || '',
      imageUrl: uploadedImage || '',
      iconName: formData.iconName || 'Shield',
      whatsappMessage: formData.whatsappMessage || `Hi Saikiran, I want to inquire about ${formData.title}.`,
      features: parsedFeatures.length > 0 ? parsedFeatures : ['Comprehensive coverage']
    };

    onSave(finalInsurance);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0F1626]">
          <div>
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              {initialInsurance ? 'Edit Insurance Plan' : 'Add New Insurance Plan'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure coverage limits, benefits, and policy highlights.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Insurance Plan Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Term Life Insurance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Insurance Category
              </label>
              <select
                value={formData.category || 'Life Insurance'}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                <option value="Life Insurance">Life Insurance</option>
                <option value="General Insurance">General Insurance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Coverage Highlight *
            </label>
            <input
              type="text"
              required
              value={formData.coverageHighlight || ''}
              onChange={e => setFormData({ ...formData, coverageHighlight: e.target.value })}
              placeholder="e.g. Up to ₹2 Crore+ Cover / ₹5L to ₹5Cr Cashless"
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
              placeholder="Describe what the plan covers, claims process, and family security benefits..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Insurance Image
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleImageFile(e.dataTransfer.files); }}
              className="border-2 border-dashed border-[#E5E9F2] dark:border-[#2A3550] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#F5822C] hover:bg-orange-50/40 dark:hover:bg-orange-950/10 transition-colors"
            >
              {uploadedImage ? (
                <div className="relative w-full">
                  <img src={uploadedImage} alt="Preview" className="w-full h-28 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); setUploadedImage(''); }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-[#F5822C]" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Click or drag & drop image here</p>
                  <p className="text-[10px] text-slate-400">JPG, PNG, WebP supported</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleImageFile(e.target.files)}
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Key Features & Benefits (1 per line)
            </label>
            <textarea
              ref={featuresRef}
              rows={3}
              value={featuresText}
              onChange={e => { setFeaturesText(e.target.value); autoResizeFeatures(); }}
              onInput={autoResizeFeatures}
              placeholder="Pure risk protection with high sum assured&#10;Critical illness and accidental riders&#10;Tax exemption under Section 80C"
              style={{ resize: 'none', overflow: 'hidden' }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none text-xs transition-all"
            />
          </div>

          <div className="pt-3 border-t border-[#E5E9F2] dark:border-[#2A3550] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 transition-all"
            >
              Save Insurance Plan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
