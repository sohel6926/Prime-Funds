import React, { useState, useRef, useCallback } from 'react';
import { useData } from '../../../context/DataContext';
import { PageId, AboutPillarItem } from '../../../types';
import {
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Building2,
  Landmark,
  ShieldCheck,
  Target,
  Compass,
  Award,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Upload,
  XCircle
} from 'lucide-react';

interface AdminAboutTabProps {
  onNavigateToStorefront: (page: PageId) => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const AdminAboutTab: React.FC<AdminAboutTabProps> = ({
  onNavigateToStorefront,
  onShowToast
}) => {
  const {
    aboutContent,
    updateAboutContent,
    resetAboutContent,
    aboutStats,
    updateAboutStats,
    whyChooseUs,
    updateWhyChooseUs,
    brandDetails
  } = useData();

  // Local form state cloned from DataContext
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(aboutContent)));
  const [newPhraseInput, setNewPhraseInput] = useState('');
  const [activeSection, setActiveSection] = useState<'hero' | 'pillars' | 'mission' | 'advantage' | 'stats'>('hero');
  const advantageImageRef = useRef<HTMLInputElement>(null);

  const handleAdvantageImageFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setFormData((prev: any) => ({
          ...prev,
          distinctAdvantage: { ...prev.distinctAdvantage, imageUrl: ev.target!.result as string }
        }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateAboutContent(formData);
    onShowToast('success', 'About Us page content synchronized successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset About Us page content back to official defaults?')) {
      resetAboutContent();
      onShowToast('info', 'About Us page content reset to defaults.');
      // Refresh local form
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  // Rotating phrases helpers
  const handleAddPhrase = () => {
    if (!newPhraseInput.trim()) return;
    setFormData((prev: any) => ({
      ...prev,
      hero: {
        ...prev.hero,
        animatingPhrases: [...prev.hero.animatingPhrases, newPhraseInput.trim()]
      }
    }));
    setNewPhraseInput('');
  };

  const handleRemovePhrase = (idx: number) => {
    setFormData((prev: any) => ({
      ...prev,
      hero: {
        ...prev.hero,
        animatingPhrases: prev.hero.animatingPhrases.filter((_: any, i: number) => i !== idx)
      }
    }));
  };

  const handlePhraseChange = (idx: number, val: string) => {
    const updated = [...formData.hero.animatingPhrases];
    updated[idx] = val;
    setFormData((prev: any) => ({
      ...prev,
      hero: {
        ...prev.hero,
        animatingPhrases: updated
      }
    }));
  };

  // Pillar bullet point helper
  const handlePillarBulletChange = (pillarIdx: number, bulletIdx: number, val: string) => {
    const updatedPillars = [...formData.coreCapabilities.pillars];
    updatedPillars[pillarIdx].bulletPoints[bulletIdx] = val;
    setFormData((prev: any) => ({
      ...prev,
      coreCapabilities: {
        ...prev.coreCapabilities,
        pillars: updatedPillars
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#151E32] rounded-2xl p-5 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Storefront Page CMS</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#12245C] dark:text-white">
            About Us Page Visual Content Editor
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Every section, animating heading, core capability, mission/vision, leadership image, and counter stat displayed on the About page is managed here.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Reset to factory defaults"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToStorefront('about')}
            className="p-2.5 rounded-xl border border-[#F5822C]/40 text-[#F5822C] hover:bg-[#F5822C]/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Preview live on storefront"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Preview Live</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            className="px-5 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md shadow-[#F5822C]/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSection('hero')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'hero'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-[#F5822C]" />
          <span>1. Hero & Animating Headlines</span>
        </button>

        <button
          onClick={() => setActiveSection('pillars')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'pillars'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-[#3FB6D3]" />
          <span>2. Core Capabilities (3-in-1)</span>
        </button>

        <button
          onClick={() => setActiveSection('mission')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'mission'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-emerald-500" />
          <span>3. Mission & Vision</span>
        </button>

        <button
          onClick={() => setActiveSection('advantage')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'advantage'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>4. Distinct Advantage & Image</span>
        </button>

        <button
          onClick={() => setActiveSection('stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSection === 'stats'
              ? 'bg-[#12245C] text-white shadow-sm'
              : 'bg-white dark:bg-[#151E32] text-slate-600 dark:text-slate-300 border border-[#E5E9F2] dark:border-[#2A3550]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          <span>5. Track Record & Counters</span>
        </button>
      </div>

      {/* SECTION 1: HERO & ANIMATING HEADLINES */}
      {activeSection === 'hero' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="border-b border-[#E5E9F2] dark:border-[#2A3550] pb-3">
            <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#F5822C]" />
              <span>About Us Hero Section & Animating Phrases</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize the badge, the rotating typewriter headlines, and the introductory mission summary.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Top Badge Text
            </label>
            <input
              type="text"
              value={formData.hero.badge}
              onChange={e => setFormData({
                ...formData,
                hero: { ...formData.hero, badge: e.target.value }
              })}
              className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
            />
          </div>

          {/* Animating Rotating Headlines */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Rotating Animating Typewriter Phrases ({formData.hero.animatingPhrases.length})
              </label>
              <span className="text-[11px] text-[#F5822C] font-semibold">
                Cycles smoothly with typewriter animation
              </span>
            </div>

            <div className="space-y-2.5">
              {formData.hero.animatingPhrases.map((phrase: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={phrase}
                    onChange={e => handlePhraseChange(idx, e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none"
                  />
                  {formData.hero.animatingPhrases.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhrase(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Remove phrase"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Phrase Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newPhraseInput}
                onChange={e => setNewPhraseInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddPhrase(); } }}
                placeholder="Type a new rotating phrase and click Add..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-dashed border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-slate-800 dark:text-slate-100 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddPhrase}
                className="px-4 py-2 rounded-xl bg-[#12245C] dark:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:opacity-90"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Phrase</span>
              </button>
            </div>
          </div>

          {/* Hero Main Narrative Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Hero Section Main Description Paragraph
            </label>
            <textarea
              rows={4}
              value={formData.hero.description}
              onChange={e => setFormData({
                ...formData,
                hero: { ...formData.hero, description: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#F5822C] outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Details</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: CORE CAPABILITIES (3-IN-1 INTEGRATED SERVICE ECOSYSTEM) */}
      {activeSection === 'pillars' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="border-b border-[#E5E9F2] dark:border-[#2A3550] pb-3">
            <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#3FB6D3]" />
              <span>Core Capabilities (3-in-1 Integrated Service Ecosystem)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize the section header, subtitle, and each of the 3 capability pillars (Real Estate, Loans, Insurances).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={formData.coreCapabilities.badge}
                onChange={e => setFormData({
                  ...formData,
                  coreCapabilities: { ...formData.coreCapabilities, badge: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.coreCapabilities.heading}
                onChange={e => setFormData({
                  ...formData,
                  coreCapabilities: { ...formData.coreCapabilities, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
              Section Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={formData.coreCapabilities.subtitle}
              onChange={e => setFormData({
                ...formData,
                coreCapabilities: { ...formData.coreCapabilities, subtitle: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
            />
          </div>

          {/* The 3 Cards */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              The 3 Integrated Ecosystem Cards
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {formData.coreCapabilities.pillars.map((pillar: AboutPillarItem, pIdx: number) => (
                <div
                  key={pillar.id || pIdx}
                  className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-3"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-[#F5822C]">Card #{pIdx + 1}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Target: /{pillar.buttonTarget}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={e => {
                        const updated = [...formData.coreCapabilities.pillars];
                        updated[pIdx].title = e.target.value;
                        setFormData({ ...formData, coreCapabilities: { ...formData.coreCapabilities, pillars: updated } });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs font-bold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Description</label>
                    <textarea
                      rows={3}
                      value={pillar.description}
                      onChange={e => {
                        const updated = [...formData.coreCapabilities.pillars];
                        updated[pIdx].description = e.target.value;
                        setFormData({ ...formData, coreCapabilities: { ...formData.coreCapabilities, pillars: updated } });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Bullet Point #1</label>
                    <input
                      type="text"
                      value={pillar.bulletPoints[0] || ''}
                      onChange={e => handlePillarBulletChange(pIdx, 0, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Bullet Point #2</label>
                    <input
                      type="text"
                      value={pillar.bulletPoints[1] || ''}
                      onChange={e => handlePillarBulletChange(pIdx, 1, e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Button Label</label>
                    <input
                      type="text"
                      value={pillar.buttonText}
                      onChange={e => {
                        const updated = [...formData.coreCapabilities.pillars];
                        updated[pIdx].buttonText = e.target.value;
                        setFormData({ ...formData, coreCapabilities: { ...formData.coreCapabilities, pillars: updated } });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Core Capabilities</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: MISSION & VISION */}
      {activeSection === 'mission' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="border-b border-[#E5E9F2] dark:border-[#2A3550] pb-3">
            <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Our Mission & Our Vision Cards</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize the core statements, descriptions, and values that guide Prime Funds Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card Editor */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1220] space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#F5822C]" />
                <h4 className="text-sm font-bold text-[#12245C] dark:text-white">Our Mission Editor</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  value={formData.missionVision.missionTitle}
                  onChange={e => setFormData({
                    ...formData,
                    missionVision: { ...formData.missionVision, missionTitle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={4}
                  value={formData.missionVision.missionDescription}
                  onChange={e => setFormData({
                    ...formData,
                    missionVision: { ...formData.missionVision, missionDescription: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bottom Tagline Points
                </label>
                <input
                  type="text"
                  value={formData.missionVision.missionTagline}
                  onChange={e => setFormData({
                    ...formData,
                    missionVision: { ...formData.missionVision, missionTagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                />
              </div>
            </div>

            {/* Vision Card Editor */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1220] space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#3FB6D3]" />
                <h4 className="text-sm font-bold text-[#12245C] dark:text-white">Our Vision Editor</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  value={formData.missionVision.visionTitle}
                  onChange={e => setFormData({
                    ...formData,
                    missionVision: { ...formData.missionVision, visionTitle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={4}
                  value={formData.missionVision.visionDescription}
                  onChange={e => setFormData({
                    ...formData,
                    missionVision: { ...formData.missionVision, visionDescription: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bottom Tagline Points
                </label>
                <input
                  type="text"
                  value={formData.missionVision.visionTagline}
                  onChange={e => setFormData({
                    ...formData,
                    missionVision: { ...formData.missionVision, visionTagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Mission & Vision</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: OUR DISTINCT ADVANTAGE & SUPPORTING IMAGE */}
      {activeSection === 'advantage' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="border-b border-[#E5E9F2] dark:border-[#2A3550] pb-3">
            <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <span>Our Distinct Advantage (Why Work With Prime Funds Solutions)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize the section title, the supporting image, leadership badge, and client advisory caption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={formData.distinctAdvantage.badge}
                onChange={e => setFormData({
                  ...formData,
                  distinctAdvantage: { ...formData.distinctAdvantage, badge: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.distinctAdvantage.heading}
                onChange={e => setFormData({
                  ...formData,
                  distinctAdvantage: { ...formData.distinctAdvantage, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none font-bold"
              />
            </div>
          </div>

          {/* Supporting Image Editor */}
          <div className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#F5822C]" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Leadership Consultation Supporting Image
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Advantage Section Image</label>
                  <div
                    onClick={() => advantageImageRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); handleAdvantageImageFile(e.dataTransfer.files); }}
                    className="border-2 border-dashed border-[#E5E9F2] dark:border-[#2A3550] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#F5822C] hover:bg-orange-50/40 dark:hover:bg-orange-950/10 transition-colors"
                  >
                    {formData.distinctAdvantage.imageUrl ? (
                      <div className="relative w-full">
                        <img
                          src={formData.distinctAdvantage.imageUrl}
                          alt="Preview"
                          className="w-full h-20 object-cover rounded-lg"
                          onError={(e: any) => { e.target.src = ''; }}
                        />
                        <button
                          type="button"
                          onClick={ev => {
                            ev.stopPropagation();
                            setFormData((prev: any) => ({
                              ...prev,
                              distinctAdvantage: { ...prev.distinctAdvantage, imageUrl: '' }
                            }));
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-[#F5822C]" />
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Click or drag & drop image</p>
                        <p className="text-[10px] text-slate-400">JPG, PNG, WebP</p>
                      </>
                    )}
                  </div>
                  <input
                    ref={advantageImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleAdvantageImageFile(e.target.files)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Image Floating Badge</label>
                  <input
                    type="text"
                    value={formData.distinctAdvantage.imageBadge}
                    onChange={e => setFormData({
                      ...formData,
                      distinctAdvantage: { ...formData.distinctAdvantage, imageBadge: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Image Leadership Caption</label>
                  <textarea
                    rows={2}
                    value={formData.distinctAdvantage.imageCaption}
                    onChange={e => setFormData({
                      ...formData,
                      distinctAdvantage: { ...formData.distinctAdvantage, imageCaption: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none resize-none"
                  />
                </div>
              </div>

              {/* Preview Thumbnail */}
              <div className="md:col-span-4 flex justify-center">
                <div className="w-48 h-36 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm relative group">
                  <img
                    src={formData.distinctAdvantage.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-[9px] p-1 rounded backdrop-blur-xs truncate">
                    {formData.distinctAdvantage.imageBadge}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Distinct Advantage</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: PROVEN TRACK RECORD & STATS & CTA */}
      {activeSection === 'stats' && (
        <div className="bg-white dark:bg-[#151E32] rounded-2xl p-6 border border-[#E5E9F2] dark:border-[#2A3550] shadow-xs space-y-6">
          <div className="border-b border-[#E5E9F2] dark:border-[#2A3550] pb-3">
            <h3 className="text-base font-bold text-[#12245C] dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Proven Track Record Values & Animated Counters</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update the 4 milestone figures that smoothly count up for visitors, plus the bottom WhatsApp advisory CTA banner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.trackRecord.heading}
                onChange={e => setFormData({
                  ...formData,
                  trackRecord: { ...formData.trackRecord, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={formData.trackRecord.subtitle}
                onChange={e => setFormData({
                  ...formData,
                  trackRecord: { ...formData.trackRecord, subtitle: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] text-xs outline-none"
              />
            </div>
          </div>

          {/* The 4 Counters */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              The 4 Animated Milestone Metric Numbers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutStats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F5822C]">Counter #{idx + 1}</span>
                    <span className="text-xs font-bold text-slate-500 font-mono">{stat.value}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Metric Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={e => {
                        const updated = [...aboutStats];
                        updated[idx].label = e.target.value;
                        updateAboutStats(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500">Prefix</label>
                      <input
                        type="text"
                        value={stat.prefix}
                        onChange={e => {
                          const updated = [...aboutStats];
                          updated[idx].prefix = e.target.value;
                          updated[idx].value = `${e.target.value}${stat.numericValue}${stat.suffix}`;
                          updateAboutStats(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500">Number</label>
                      <input
                        type="number"
                        value={stat.numericValue}
                        onChange={e => {
                          const updated = [...aboutStats];
                          updated[idx].numericValue = Number(e.target.value);
                          updated[idx].value = `${stat.prefix}${e.target.value}${stat.suffix}`;
                          updateAboutStats(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500">Suffix</label>
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={e => {
                          const updated = [...aboutStats];
                          updated[idx].suffix = e.target.value;
                          updated[idx].value = `${stat.prefix}${stat.numericValue}${e.target.value}`;
                          updateAboutStats(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner Details */}
          <div className="p-4 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-slate-50 dark:bg-[#0B1220] space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#F5822C]" />
              <span>Bottom Direct Consultation CTA Banner</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-0.5">CTA Heading</label>
                <input
                  type="text"
                  value={formData.trackRecord.ctaHeading}
                  onChange={e => setFormData({
                    ...formData,
                    trackRecord: { ...formData.trackRecord, ctaHeading: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-0.5">WhatsApp Button Text</label>
                <input
                  type="text"
                  value={formData.trackRecord.ctaButtonText}
                  onChange={e => setFormData({
                    ...formData,
                    trackRecord: { ...formData.trackRecord, ctaButtonText: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-0.5">CTA Subtitle</label>
              <input
                type="text"
                value={formData.trackRecord.ctaSubtitle}
                onChange={e => setFormData({
                  ...formData,
                  trackRecord: { ...formData.trackRecord, ctaSubtitle: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E9F2] dark:border-[#2A3550] bg-white dark:bg-[#151E32] text-xs outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave()}
              className="px-6 py-2.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Track Record Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
