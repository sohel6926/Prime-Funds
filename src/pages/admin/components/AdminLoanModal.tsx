import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ServiceItem } from '../../../types';
import { X, Upload, XCircle, Loader2 } from 'lucide-react';
import { uploadImage } from '../../../services/api';

interface AdminLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loan: ServiceItem) => void;
  initialLoan?: ServiceItem | null;
}

const CATEGORIES: ('Personal' | 'Property' | 'Business' | 'Specialized')[] = [
  'Personal',
  'Property',
  'Business',
  'Specialized'
];

export const AdminLoanModal: React.FC<AdminLoanModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialLoan
}) => {
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    id: '',
    title: '',
    category: 'Personal',
    tagline: '',
    description: '',
    interestRateText: 'From 8.50% p.a.',
    tenureText: 'Up to 5 Years',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    iconName: 'Coins',
    whatsappMessage: 'Hi Saikiran, I want to apply for this loan.',
    features: ['Quick approvals within 24 hours', 'Minimal documentation', 'Low interest rate']
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
      const url = await uploadImage(file, 'loans');
      setUploadedImage(url);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (initialLoan) {
      setFormData({ ...initialLoan });
      setFeaturesText((initialLoan.features || []).join('\n'));
      setUploadedImage(initialLoan.imageUrl || '');
    } else {
      const newId = `loan-${Date.now()}`;
      setFormData({
        id: newId,
        title: '',
        category: 'Personal',
        tagline: 'Instant funds with quick sanction',
        description: 'Flexible financing options tailored to your personal or business goals.',
        interestRateText: 'From 8.50% p.a.',
        tenureText: 'Up to 5 Years',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        iconName: 'Coins',
        whatsappMessage: 'Hi Saikiran, I want to apply for this loan service.',
        features: ['Instant Sanctions', 'Minimal KYC required', 'Zero hidden charges']
      });
      setFeaturesText('Instant Sanctions\nMinimal KYC required\nZero hidden charges');
      setUploadedImage('');
    }
  }, [initialLoan, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.interestRateText) {
      alert('Please fill in title and interest rate.');
      return;
    }

    const parsedFeatures = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const finalLoan: ServiceItem = {
      id: formData.id || `loan-${Date.now()}`,
      title: formData.title || '',
      category: formData.category || 'Personal',
      tagline: formData.tagline || '',
      description: formData.description || '',
      interestRateText: formData.interestRateText || 'From 8.50% p.a.',
      tenureText: formData.tenureText || 'Up to 5 Years',
      imageUrl: uploadedImage || '',
      iconName: formData.iconName || 'Coins',
      whatsappMessage: formData.whatsappMessage || `Hi Saikiran, I want to apply for ${formData.title}.`,
      features: parsedFeatures.length > 0 ? parsedFeatures : ['Low Interest Rate', 'Rapid Disbursement']
    };

    onSave(finalLoan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#151E32] rounded-3xl shadow-2xl border border-[#E5E9F2] dark:border-[#2A3550] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0F1626]">
          <div>
            <h3 className="text-base font-bold text-[#12245C] dark:text-white">
              {initialLoan ? 'Edit Loan Service' : 'Add New Loan Product'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure loan rates, tenures, features, and imagery.
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
                Loan Service Title *
              </label>
              <input
                type="text"
                required
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Home Loans"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Category
              </label>
              <select
                value={formData.category || 'Personal'}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Interest Rate Text *
              </label>
              <input
                type="text"
                required
                value={formData.interestRateText || ''}
                onChange={e => setFormData({ ...formData, interestRateText: e.target.value })}
                placeholder="e.g. From 8.35% p.a."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Max Tenure Text
              </label>
              <input
                type="text"
                value={formData.tenureText || ''}
                onChange={e => setFormData({ ...formData, tenureText: e.target.value })}
                placeholder="e.g. Up to 30 Years"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Short Tagline
            </label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. Build or purchase your dream house"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Full Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the loan features, funding eligibility, and benefits..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#F5822C] outline-none resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              Loan Service Image
            </label>
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleImageFile(e.dataTransfer.files); }}
              className={`border-2 border-dashed border-[#E5E9F2] dark:border-[#2A3550] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors ${
                isUploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-[#F5822C] hover:bg-orange-50/40 dark:hover:bg-orange-950/10'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 text-[#F5822C] animate-spin" />
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Uploading to Cloudinary...</p>
                </>
              ) : uploadedImage ? (
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
              Key Highlights & Features (1 per line)
            </label>
            <textarea
              ref={featuresRef}
              rows={3}
              value={featuresText}
              onChange={e => { setFeaturesText(e.target.value); autoResizeFeatures(); }}
              onInput={autoResizeFeatures}
              placeholder="Maximum funding up to 90% property value&#10;PMAY subsidy benefits facilitation&#10;Zero prepayment penalty options"
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
              Save Loan Service
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
