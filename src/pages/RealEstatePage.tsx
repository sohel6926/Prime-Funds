import React, { useState, useMemo } from 'react';
import { PageId, PropertyItem, PropertyClass } from '../types';
import { REAL_ESTATE_CATEGORIES, TARGET_LOCATIONS } from '../data/realEstateData';
import { useData } from '../context/DataContext';
import { WhatsAppIcon } from '../components/BrandIcons';
import { ScrollReveal } from '../components/ScrollReveal';
import { TypewriterHeading } from '../components/TypewriterHeading';
import {
  DotGridPattern,
  ArchitecturalGridPattern,
  GlowAura,
  RealEstateBackgroundArt,
  TrustStatsBackgroundArt
} from '../components/BackgroundPatterns';
import {
  Building2,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Home,
  Trees,
  Star,
  SlidersHorizontal,
  RotateCcw,
  IndianRupee,
  Layers,
  Search,
  X,
  Maximize2,
  Check,
  Building,
  LandPlot,
  Filter
} from 'lucide-react';

interface RealEstatePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProperty: (propertyId: string) => void;
  onOpenApply: (serviceName?: string) => void;
}

const PROPERTY_TYPE_META: Record<string, { icon: React.FC<{ className?: string }>, color: string, bgColor: string, label: string, tagline: string, hook: string }> = {
  'Open Plots': {
    icon: LandPlot,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    label: 'Open Plots',
    tagline: 'KUDA / HMDA / DTCP Approved | Clear Title | Spot Registration',
    hook: '🌿 Land is the safest asset — clear title plots with spot registration.'
  },
  'Independent Houses': {
    icon: Home,
    color: 'text-[#F5822C]',
    bgColor: 'bg-[#F5822C]/10 border-[#F5822C]/20',
    label: 'Independent Houses',
    tagline: 'No Shared Walls | Private Land & Roof | Ready to Move',
    hook: '🏠 Your land, your home — complete privacy and peace.'
  },
  'G+1 Houses': {
    icon: Building2,
    color: 'text-[#3FB6D3]',
    bgColor: 'bg-[#3FB6D3]/10 border-[#3FB6D3]/20',
    label: 'G+1 Houses',
    tagline: 'Duplex | Dual Income Option | Live + Rent',
    hook: '🏗️ Live on one floor. Earn passive rent from the other.'
  },
  'Apartment Flats': {
    icon: Building,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 border-violet-500/20',
    label: 'Apartment Flats',
    tagline: '2 & 3 BHK | Gated Community | Up to 90% Loan',
    hook: '🏢 Premium gated community living with modern amenities.'
  },
  'Commercial': {
    icon: Building2,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    label: 'Commercial Space',
    tagline: 'High Rental Yield | Main Road Frontage | LRD Finance',
    hook: '🏢 High-traffic commercial properties for maximum returns.'
  },
  'Commercial Space': {
    icon: Building2,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    label: 'Commercial Space',
    tagline: 'High Rental Yield | Main Road Frontage | LRD Finance',
    hook: '🏢 High-traffic commercial properties for maximum returns.'
  },
  'Agriculture': {
    icon: Trees,
    color: 'text-lime-600 dark:text-lime-400',
    bgColor: 'bg-lime-500/10 border-lime-500/20',
    label: 'Agricultural Land',
    tagline: '100% Dharani Clear Title | Sweet Water Table | Free Power',
    hook: '🌾 Fertile agricultural land & scenic farmhouse acreage.'
  }
};

const PRICE_PRESETS = [
  { label: 'All Prices', min: 0, max: 50000000 },
  { label: 'Under ₹30 L', min: 0, max: 3000000 },
  { label: '₹30 L – ₹75 L', min: 3000000, max: 7500000 },
  { label: '₹75 L – ₹1.5 Cr', min: 7500000, max: 15000000 },
  { label: '₹1.5 Cr – ₹3 Cr', min: 15000000, max: 30000000 },
  { label: '₹3 Cr – ₹5 Cr', min: 30000000, max: 50000000 }
];

const SQYRD_PRESETS = [
  { label: 'All Sq.Yrds', min: 0, max: 2500 },
  { label: '55 – 150 Sq.Yds', min: 55, max: 150 },
  { label: '150 – 250 Sq.Yds', min: 150, max: 250 },
  { label: '250 – 500 Sq.Yds', min: 250, max: 500 },
  { label: '500 – 2,500 Sq.Yds', min: 500, max: 2500 }
];

const ACRE_PRESETS = [
  { label: 'All Acres', min: 0, max: 200 },
  { label: '1 – 5 Acres', min: 1, max: 5 },
  { label: '5 – 15 Acres', min: 5, max: 15 },
  { label: '15 – 50 Acres', min: 15, max: 50 },
  { label: '50 – 200 Acres', min: 50, max: 200 }
];

export const RealEstatePage: React.FC<RealEstatePageProps> = ({
  onNavigate,
  onSelectProperty,
  onOpenApply
}) => {
  const { properties: PROPERTY_LISTINGS, brandDetails: BRAND_DETAILS, openInstantEnquiry } = useData();

  // Filter States
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<'All' | PropertyClass>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number>(1000000); // 10 Lakhs
  const [maxPrice, setMaxPrice] = useState<number>(50000000); // 5 Cr
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'area'>('recommended');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(true);

  // Area Filters
  const [minSqYrds, setMinSqYrds] = useState<number>(55);
  const [maxSqYrds, setMaxSqYrds] = useState<number>(2500);
  const [minAcres, setMinAcres] = useState<number>(1);
  const [maxAcres, setMaxAcres] = useState<number>(200);

  // Format INR nicely
  const formatPriceLabel = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
    }
    return `₹${Math.round(amount / 100000)} Lakhs`;
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedLocation('All');
    setSelectedClass('All');
    setSelectedType('All');
    setMinPrice(1000000);
    setMaxPrice(50000000);
    setMinSqYrds(55);
    setMaxSqYrds(2500);
    setMinAcres(1);
    setMaxAcres(200);
    setSearchQuery('');
    setSortBy('recommended');
  };

  // Check if any filter is active
  const hasActiveFilters =
    selectedLocation !== 'All' ||
    selectedClass !== 'All' ||
    selectedType !== 'All' ||
    minPrice > 1000000 ||
    maxPrice < 50000000 ||
    minSqYrds > 55 ||
    maxSqYrds < 2500 ||
    minAcres > 1 ||
    maxAcres < 200 ||
    searchQuery.trim() !== '';

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return PROPERTY_LISTINGS.filter((property) => {
      // 1. Location Filter
      if (selectedLocation !== 'All') {
        const normCity = property.city.toLowerCase();
        const targetCity = selectedLocation.toLowerCase();
        if (!normCity.includes(targetCity)) return false;
      }

      // 2. Class Filter (Residential / Commercial / Agriculture)
      if (selectedClass !== 'All') {
        if (property.propertyClass !== selectedClass) return false;
      }

      // 3. Sub-type Filter
      if (selectedType !== 'All') {
        if (property.propertyType !== selectedType && property.subType !== selectedType) {
          return false;
        }
      }

      // 4. Price Filter (₹10 Lakhs - ₹5 Cr)
      // Allow numericPrice === 0 (unset) so newly added properties are not hidden
      if (property.numericPrice > 0 && (property.numericPrice < minPrice || property.numericPrice > maxPrice)) {
        return false;
      }

      // 5. Area / Size Filter
      if (property.areaUnit === 'acres') {
        const acres = property.numericArea || 1;
        if (acres < minAcres || acres > maxAcres) return false;
      } else {
        // Sq.Yards (or sq.ft converted approx)
        const sqYards = property.areaUnit === 'sq.ft' 
          ? Math.round((property.numericArea || 900) / 9) 
          : (property.numericArea || 150);
        if (sqYards < minSqYrds || sqYards > maxSqYrds) return false;
      }

      // 6. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLoc = property.location.toLowerCase().includes(query);
        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesType = property.propertyType.toLowerCase().includes(query);
        const matchesSubType = property.subType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCity && !matchesType && !matchesSubType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.numericPrice - b.numericPrice;
      if (sortBy === 'price-high') return b.numericPrice - a.numericPrice;
      if (sortBy === 'area') return (b.numericArea || 0) - (a.numericArea || 0);
      // 'recommended' - featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    PROPERTY_LISTINGS,
    selectedLocation,
    selectedClass,
    selectedType,
    minPrice,
    maxPrice,
    minSqYrds,
    maxSqYrds,
    minAcres,
    maxAcres,
    searchQuery,
    sortBy
  ]);

  return (
    <div className="w-full">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F9FC] via-[#EEF3FA] to-white dark:from-[#0B1220] dark:via-[#12245C] dark:to-[#0F1626] py-14 sm:py-20 border-b border-[#E5E9F2] dark:border-[#2A3550]">
        <RealEstateBackgroundArt variant="hero" />
        <ArchitecturalGridPattern />
        <DotGridPattern size={1.5} gap={28} />
        <GlowAura position="top-right" variant="orange" opacity="opacity-35 dark:opacity-40" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-25 dark:opacity-30" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12245C]/10 dark:bg-[#F5822C]/20 border border-[#12245C]/15 dark:border-[#F5822C]/30 text-[#12245C] dark:text-[#F5822C] text-xs font-bold backdrop-blur-sm shadow-sm">
            <Star className="w-3.5 h-3.5 text-[#F5822C]" fill="currentColor" />
            <span>Prime Real Estate Across Telangana • 100% Clear Title Verification</span>
          </div>

          {/* Headline with Typing Animation */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#12245C] dark:text-white min-h-[3.8rem] sm:min-h-[6.5rem]">
            <TypewriterHeading
              phrases={[
                "Verified Properties in Karimnagar, Mancherial & Hanamkonda.",
                "Residential Plots, Houses, Commercial & Fertile Farmlands.",
                "100% Clear Titles. Up to 90% Bank Loan. Zero Brokerage.",
                "Custom Real Estate Advisory for Every Budget."
              ]}
              highlightWords={['Karimnagar, Mancherial & Hanamkonda.', 'Fertile Farmlands.', '90% Bank Loan.', 'Every Budget.']}
              highlightClassName="text-[#F5822C]"
              typingSpeed={35}
              deletingSpeed={18}
              pauseDuration={2800}
            />
          </h1>

          {/* Subline */}
          <p className="text-sm sm:text-base text-[#5B6377] dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore verified open plots, independent houses, commercial spaces & agriculture acreage across{' '}
            <strong className="text-[#12245C] dark:text-white font-semibold">Karimnagar, Mancherial, Peddapalli, Siricilla, Siddipet & Hanamkonda</strong>.
          </p>

          {/* Key Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { val: '6 Cities', lbl: 'Top Telangana Hubs' },
              { val: '₹10L – ₹5Cr', lbl: 'Budget Range' },
              { val: '55 Yds – 200 Ac', lbl: 'Plots to Mega Farms' },
              { val: 'Up to 90%', lbl: 'Bank Loan Sanction' }
            ].map((s) => (
              <div
                key={s.lbl}
                className="px-4 py-2.5 rounded-xl bg-white/90 dark:bg-[#151E32]/90 border border-slate-200 dark:border-white/10 backdrop-blur-md text-center shadow-sm"
              >
                <div className="text-base font-black text-[#F5822C]">{s.val}</div>
                <div className="text-[11px] text-[#5B6377] dark:text-slate-300 font-medium">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANCED FILTER & SEARCH PANEL ── */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white/95 dark:bg-[#0F1626]/95 backdrop-blur-xl border-b border-[#E5E9F2] dark:border-[#2A3550] shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Main Filter Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left Title & "Get Tailored Results" Callout */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F5822C]/15 dark:bg-[#F5822C]/25 text-[#F5822C] flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-[#12245C] dark:text-white flex items-center gap-2">
                    <span>Filter Properties</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#F5822C] to-orange-500 text-white font-bold tracking-wide shadow-sm">
                      Get Tailored Results
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Find plots, houses, commercial & farmland matching your exact city, size & budget
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Search Box + Sort + Toggle Filter Panel */}
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              
              {/* Keyword Search Input */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city, area, title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-2 text-xs rounded-xl bg-slate-100 dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#F5822C] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#F5822C]"
              >
                <option value="recommended">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area">Area: Largest First</option>
              </select>

              {/* Toggle Filters Panel Button */}
              <button
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isFilterPanelOpen
                    ? 'bg-[#12245C] text-white dark:bg-[#F5822C] dark:text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-[#151E32] text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </button>

              {/* Clear / Reset Button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 flex items-center gap-1 transition-all"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* ── EXPANDABLE FILTER OPTIONS ── */}
          {isFilterPanelOpen && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* ROW 1: Locations Selection Chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F5822C]" />
                    <span>Select Location / City:</span>
                  </span>
                  <span className="text-[11px] text-slate-500">6 Key Growth Hubs</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    onClick={() => setSelectedLocation('All')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedLocation === 'All'
                        ? 'bg-[#F5822C] text-white shadow-sm shadow-[#F5822C]/30 scale-[1.02]'
                        : 'bg-slate-100 dark:bg-[#151E32] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    All Locations ({PROPERTY_LISTINGS.length})
                  </button>
                  {TARGET_LOCATIONS.map((loc) => {
                    const count = PROPERTY_LISTINGS.filter((p) => p.city.toLowerCase().includes(loc.toLowerCase())).length;
                    const isActive = selectedLocation === loc;
                    return (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                          isActive
                            ? 'bg-[#F5822C] text-white shadow-sm shadow-[#F5822C]/30 scale-[1.02]'
                            : 'bg-slate-100 dark:bg-[#151E32] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{loc}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                          isActive ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ROW 2: Property Classification & Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 2A: Primary Classification (Residential / Commercial / Agriculture) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#3FB6D3]" />
                      <span>Property Category:</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'All', label: 'All Types', icon: Layers },
                      { id: 'Residential', label: 'Residential', icon: Home },
                      { id: 'Commercial', label: 'Commercial', icon: Building2 },
                      { id: 'Agriculture', label: 'Agriculture', icon: Trees }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isActive = selectedClass === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedClass(item.id as any);
                            // If switching category, also adjust type reset
                            setSelectedType('All');
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center transition-all ${
                            isActive
                              ? 'bg-[#12245C] text-white dark:bg-[#F5822C] dark:text-white shadow-sm scale-[1.01]'
                              : 'bg-slate-100 dark:bg-[#151E32] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2B: Specific Property Type Sub-filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Specific Property Sub-Type:</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      { id: 'All', label: 'All Sub-types' },
                      { id: 'Open Plots', label: 'Plots (KUDA/DTCP)' },
                      { id: 'Independent Houses', label: 'Independent Houses' },
                      { id: 'G+1 Houses', label: 'G+1 Houses' },
                      { id: 'Apartment Flats', label: 'Flats' },
                      { id: 'Commercial', label: 'Commercial Spaces' },
                      { id: 'Agriculture', label: 'Farmland' }
                    ].map((t) => {
                      const isActive = selectedType === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedType(t.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                            isActive
                              ? 'bg-[#12245C] text-white dark:bg-white dark:text-[#12245C] font-bold shadow-sm'
                              : 'bg-slate-100 dark:bg-[#151E32] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ROW 3: Price Range & Land Area Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                
                {/* 3A: Price Range (₹10 Lakhs to ₹5 Crores) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#151E32]/70 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5 text-[#F5822C]" />
                      <span>Price Range (₹10 L – ₹5 Cr):</span>
                    </span>
                    <span className="text-xs font-extrabold text-[#F5822C]">
                      {formatPriceLabel(minPrice)} – {formatPriceLabel(maxPrice)}
                    </span>
                  </div>

                  {/* Quick Price Preset Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {PRICE_PRESETS.map((p) => {
                      const isSelected = minPrice === p.min && maxPrice === p.max;
                      return (
                        <button
                          key={p.label}
                          onClick={() => {
                            setMinPrice(p.min);
                            setMaxPrice(p.max);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#F5822C] text-white font-bold shadow-sm'
                              : 'bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#F5822C]'
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Min / Max Selectors */}
                  <div className="grid grid-cols-2 gap-2 mt-2.5">
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Min Budget</label>
                      <select
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#F5822C]"
                      >
                        <option value={1000000}>Min: ₹10 Lakhs</option>
                        <option value={2000000}>₹20 Lakhs</option>
                        <option value={3500000}>₹35 Lakhs</option>
                        <option value={5000000}>₹50 Lakhs</option>
                        <option value={7500000}>₹75 Lakhs</option>
                        <option value={10000000}>₹1.00 Crore</option>
                        <option value={15000000}>₹1.50 Crore</option>
                        <option value={25000000}>₹2.50 Crore</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Max Budget</label>
                      <select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#F5822C]"
                      >
                        <option value={3000000}>Max: ₹30 Lakhs</option>
                        <option value={5000000}>₹50 Lakhs</option>
                        <option value={8000000}>₹80 Lakhs</option>
                        <option value={12000000}>₹1.20 Crore</option>
                        <option value={20000000}>₹2.00 Crore</option>
                        <option value={35000000}>₹3.50 Crore</option>
                        <option value={50000000}>Max: ₹5.00 Crore</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3B: Land Area / Size Controls (Sq.Yrds & Acres) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#151E32]/70 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#3FB6D3]" />
                      <span>
                        {selectedClass === 'Agriculture'
                          ? 'Farmland Area (1 – 200 Acres):'
                          : selectedClass === 'Residential' || selectedClass === 'Commercial'
                          ? 'Plot / House Area (55 – 2,500 Sq.Yrds):'
                          : 'Area / Dimensions Filter:'}
                      </span>
                    </span>
                    <span className="text-xs font-extrabold text-[#3FB6D3]">
                      {selectedClass === 'Agriculture'
                        ? `${minAcres} – ${maxAcres} Acres`
                        : `${minSqYrds} – ${maxSqYrds} Sq.Yds`}
                    </span>
                  </div>

                  {/* Area Preset Chips depending on class */}
                  {selectedClass === 'Agriculture' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {ACRE_PRESETS.map((a) => {
                        const isSelected = minAcres === a.min && maxAcres === a.max;
                        return (
                          <button
                            key={a.label}
                            onClick={() => {
                              setMinAcres(a.min);
                              setMaxAcres(a.max);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              isSelected
                                ? 'bg-[#3FB6D3] text-white font-bold shadow-sm'
                                : 'bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#3FB6D3]'
                            }`}
                          >
                            {a.label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {SQYRD_PRESETS.map((s) => {
                        const isSelected = minSqYrds === s.min && maxSqYrds === s.max;
                        return (
                          <button
                            key={s.label}
                            onClick={() => {
                              setMinSqYrds(s.min);
                              setMaxSqYrds(s.max);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              isSelected
                                ? 'bg-[#3FB6D3] text-white font-bold shadow-sm'
                                : 'bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#3FB6D3]'
                            }`}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Min / Max Selectors for Area */}
                  <div className="grid grid-cols-2 gap-2 mt-2.5">
                    {selectedClass === 'Agriculture' ? (
                      <>
                        <div>
                          <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Min Acres</label>
                          <select
                            value={minAcres}
                            onChange={(e) => setMinAcres(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#3FB6D3]"
                          >
                            <option value={1}>Min: 1 Acre</option>
                            <option value={5}>5 Acres</option>
                            <option value={10}>10 Acres</option>
                            <option value={25}>25 Acres</option>
                            <option value={50}>50 Acres</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Max Acres</label>
                          <select
                            value={maxAcres}
                            onChange={(e) => setMaxAcres(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#3FB6D3]"
                          >
                            <option value={5}>5 Acres</option>
                            <option value={15}>15 Acres</option>
                            <option value={50}>50 Acres</option>
                            <option value={100}>100 Acres</option>
                            <option value={200}>Max: 200 Acres</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Min Sq.Yards</label>
                          <select
                            value={minSqYrds}
                            onChange={(e) => setMinSqYrds(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#3FB6D3]"
                          >
                            <option value={55}>Min: 55 Sq.Yds</option>
                            <option value={150}>150 Sq.Yds</option>
                            <option value={200}>200 Sq.Yds</option>
                            <option value={350}>350 Sq.Yds</option>
                            <option value={500}>500 Sq.Yds</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Max Sq.Yards</label>
                          <select
                            value={maxSqYrds}
                            onChange={(e) => setMaxSqYrds(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#0F1626] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-[#3FB6D3]"
                          >
                            <option value={200}>200 Sq.Yds</option>
                            <option value={350}>350 Sq.Yds</option>
                            <option value={600}>600 Sq.Yds</option>
                            <option value={1200}>1,200 Sq.Yds</option>
                            <option value={2500}>Max: 2,500 Sq.Yds</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ROW 4: Active Filter Tags */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Active Filters:</span>
                  {selectedLocation !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F5822C]/15 text-[#F5822C] font-bold">
                      📍 {selectedLocation}
                      <button onClick={() => setSelectedLocation('All')}><X className="w-3 h-3 hover:text-red-600" /></button>
                    </span>
                  )}
                  {selectedClass !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#12245C]/15 dark:bg-white/15 text-[#12245C] dark:text-white font-bold">
                      🏷️ {selectedClass}
                      <button onClick={() => setSelectedClass('All')}><X className="w-3 h-3 hover:text-red-600" /></button>
                    </span>
                  )}
                  {selectedType !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#3FB6D3]/15 text-[#3FB6D3] font-bold">
                      🏡 {selectedType}
                      <button onClick={() => setSelectedType('All')}><X className="w-3 h-3 hover:text-red-600" /></button>
                    </span>
                  )}
                  {(minPrice > 1000000 || maxPrice < 50000000) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                      💰 {formatPriceLabel(minPrice)} - {formatPriceLabel(maxPrice)}
                      <button onClick={() => { setMinPrice(1000000); setMaxPrice(50000000); }}><X className="w-3 h-3 hover:text-red-600" /></button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-600 font-bold">
                      🔍 "{searchQuery}"
                      <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 hover:text-red-600" /></button>
                    </span>
                  )}
                  <button
                    onClick={resetFilters}
                    className="text-xs font-bold text-rose-500 hover:underline ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── PROPERTY CARDS GRID SECTION ── */}
      <section className="py-12 bg-slate-50 dark:bg-[#0B1220] relative overflow-hidden">
        <RealEstateBackgroundArt variant="cards" />
        <DotGridPattern size={1.2} gap={32} maskRadial />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Results Counter & Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#12245C] dark:text-white flex items-center gap-2">
                <span>
                  {selectedLocation === 'All' ? 'Properties Across Telangana' : `Properties in ${selectedLocation}`}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                  {filteredProperties.length} Verified {filteredProperties.length === 1 ? 'Deal' : 'Deals'}
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6377] dark:text-[#9BA3B7] mt-1">
                Showing verified listings with <span className="font-semibold text-[#F5822C]">100% legal clearance & up to 90% bank loan approval</span>.
              </p>
            </div>

            <button
              onClick={() => onOpenApply('Real Estate Consultation')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#12245C] hover:bg-[#1c3582] dark:bg-[#F5822C] dark:hover:bg-[#e0711f] text-white text-xs font-bold shadow-md transition-all self-start sm:self-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Request Custom Search</span>
            </button>
          </div>

          {/* If No Properties Found (Empty State) */}
          {filteredProperties.length === 0 ? (
            <div className="p-10 sm:p-14 text-center rounded-3xl bg-white dark:bg-[#151E32] border-2 border-dashed border-slate-200 dark:border-slate-700 max-w-2xl mx-auto shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F5822C]/15 text-[#F5822C] flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#12245C] dark:text-white">
                No Properties Match Your Exact Filter
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                We couldn't find listings matching your specific combination in {selectedLocation}. We have unlisted offline inventory ready for registration!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold transition-all"
                >
                  Reset All Filters
                </button>
                <button
                  type="button"
                  onClick={() => openInstantEnquiry({
                    itemTitle: `Offline Real Estate Inventory (${selectedLocation === 'All' ? 'Telangana' : selectedLocation})`,
                    itemCategory: 'Real Estate Property',
                    channel: 'WhatsApp',
                    targetUrl: BRAND_DETAILS.whatsappUrl(`Hi Saikiran, I'm looking for properties in ${selectedLocation === 'All' ? 'Telangana' : selectedLocation} with budget around ${formatPriceLabel(maxPrice)}. Please share unlisted options.`)
                  })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
                >
                  <WhatsAppIcon size={16} />
                  <span>Ask on WhatsApp for Offline Deals</span>
                </button>
              </div>
            </div>
          ) : (
            /* Property Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProperties.map((property, idx) => {
                const meta = PROPERTY_TYPE_META[property.propertyType] || PROPERTY_TYPE_META['Open Plots'];
                const TypeIcon = meta?.icon || Building2;

                return (
                  <ScrollReveal key={property.id} delay={idx * 50}>
                    <div className="group h-full flex flex-col rounded-2xl bg-white dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700/80 hover:border-[#F5822C] dark:hover:border-[#F5822C] shadow-sm hover:shadow-xl hover:shadow-[#F5822C]/10 transition-all duration-300 overflow-hidden hover:-translate-y-1.5">
                      
                      {/* Image Thumbnail & Overlay Badges */}
                      <div
                        className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                        onClick={() => onSelectProperty(property.id)}
                      >
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border backdrop-blur-md shadow-sm ${meta?.bgColor} ${meta?.color}`}>
                            {property.city} • {property.propertyType}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-sm ${
                              property.status === 'Ready to Move' || property.status === 'Clear Title Plots' || property.status === 'Clear Title Farmland'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-[#F5822C] text-white'
                            }`}
                          >
                            {property.status}
                          </span>
                        </div>

                        {/* Price & Area Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                          <div>
                            <div className="text-lg font-black tracking-tight">{property.price}</div>
                            <div className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
                              <Maximize2 className="w-3 h-3 text-[#F5822C]" />
                              <span>{property.area}</span>
                            </div>
                          </div>
                          <div className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F5822C]/90 text-white font-bold backdrop-blur-sm">
                            Loan: {property.eligibleLoans[0]?.interestRate || 'Available'}
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-[#F5822C] flex-shrink-0" />
                            <span className="truncate font-medium">{property.location}, {property.city}</span>
                          </div>

                          <h3
                            onClick={() => onSelectProperty(property.id)}
                            className="text-base font-bold text-[#12245C] dark:text-white group-hover:text-[#F5822C] transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {property.title}
                          </h3>

                          {/* Catchy Hook */}
                          <p className="text-xs font-semibold text-[#F5822C] italic leading-tight">
                            "{property.catchyHook}"
                          </p>
                        </div>

                        {/* Quick Highlights */}
                        <ul className="space-y-1.5 pt-1">
                          {property.quickHighlights.slice(0, 2).map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </li>
                          ))}
                          <li className="flex items-center gap-1 text-[11px] text-[#12245C] dark:text-[#4FC3E0] font-semibold pt-0.5">
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span>100% Legal Title & Pre-Approved Loan →</span>
                          </li>
                        </ul>

                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => onSelectProperty(property.id)}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-[#12245C] hover:bg-[#1c3582] dark:bg-[#F5822C] dark:hover:bg-[#e0711f] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          >
                            <span>View Details & Loan</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openInstantEnquiry({
                              itemTitle: property.title,
                              itemCategory: 'Real Estate Property',
                              channel: 'WhatsApp',
                              targetUrl: BRAND_DETAILS.whatsappUrl(property.whatsappMessage)
                            })}
                            className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all duration-200 flex-shrink-0 shadow-sm cursor-pointer"
                            title="WhatsApp Property Specialist"
                          >
                            <WhatsAppIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 3 PROPERTY CLASSIFICATIONS SHOWCASE ── */}
      <section className="py-16 bg-white dark:bg-[#0F1626] border-y border-[#E5E9F2] dark:border-[#2A3550] relative overflow-hidden">
        <RealEstateBackgroundArt variant="cards" />
        <ArchitecturalGridPattern />
        <DotGridPattern size={1.2} gap={28} maskRadial />
        <GlowAura position="top-right" variant="orange" opacity="opacity-20 dark:opacity-15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F5822C]/10 text-[#F5822C] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Real Estate Verticals
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12245C] dark:text-white">
              Residential • Commercial • Agriculture
            </h2>
            <p className="text-sm text-[#5B6377] dark:text-[#9BA3B7] max-w-2xl mx-auto">
              Whether you are buying a dream villa plot, high-rental commercial building, or fertile agricultural acreage — we ensure 100% legal clarity & seamless loan financing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                type: 'Residential Properties',
                cls: 'Residential' as PropertyClass,
                emoji: '🏡',
                color: 'from-[#F5822C] to-orange-600',
                lightBg: 'bg-orange-50 dark:bg-orange-950/30',
                border: 'border-orange-200 dark:border-orange-800',
                hoverBorder: 'hover:border-[#F5822C]',
                points: ['Open Plots (55 - 2,500 Sq.Yds)', 'Independent & G+1 Duplex Houses', '2 & 3 BHK Gated Apartments', 'Up to 90% Bank Loan Approved'],
                hook: 'Build your dream home with 100% clear municipal titles.'
              },
              {
                type: 'Commercial Properties',
                cls: 'Commercial' as PropertyClass,
                emoji: '🏢',
                color: 'from-[#3FB6D3] to-cyan-600',
                lightBg: 'bg-cyan-50 dark:bg-cyan-950/30',
                border: 'border-cyan-200 dark:border-cyan-800',
                hoverBorder: 'hover:border-[#3FB6D3]',
                points: ['Showrooms & Commercial Complexes', 'Highway Commercial Zoned Plots', 'Pre-Leased High Rental Yield Assets', 'Lease Rental Discounting (LRD) Loans'],
                hook: 'Multiply your capital with premium retail and office spaces.'
              },
              {
                type: 'Agricultural Lands',
                cls: 'Agriculture' as PropertyClass,
                emoji: '🌾',
                color: 'from-emerald-500 to-emerald-600',
                lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
                border: 'border-emerald-200 dark:border-emerald-800',
                hoverBorder: 'hover:border-emerald-500',
                points: ['Fertile Farmland (1 - 200 Acres)', '100% Dharani Verified Passbooks', 'Sweet Groundwater & Canal Irrigation', 'Agro Land & Farmhouse Financing'],
                hook: 'Invest in timeless fertile soil with complete water security.'
              }
            ].map((item, idx) => {
              const count = PROPERTY_LISTINGS.filter((p) => p.propertyClass === item.cls).length;
              return (
                <ScrollReveal key={item.type} delay={idx * 90}>
                  <div
                    className={`group p-6 rounded-2xl ${item.lightBg} border-2 ${item.border} ${item.hoverBorder} hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between cursor-pointer hover:-translate-y-1`}
                    onClick={() => {
                      setSelectedClass(item.cls);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md text-2xl`}>
                          {item.emoji}
                        </div>
                        <div>
                          <div className="font-extrabold text-[#12245C] dark:text-white text-base">{item.type}</div>
                          <div className="text-xs text-slate-500 font-semibold">{count} Verified Listings</div>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-[#12245C] dark:text-slate-200 italic">
                        "{item.hook}"
                      </p>

                      <ul className="space-y-1.5">
                        {item.points.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClass(item.cls);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border-2 border-current text-[#12245C] dark:text-white hover:bg-[#12245C] hover:text-white dark:hover:bg-white dark:hover:text-[#12245C] transition-all"
                    >
                      <span>Filter {item.type}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY PRIME FUNDS REAL ESTATE ── */}
      <section className="py-14 bg-slate-50 dark:bg-[#0B1220] relative overflow-hidden">
        <TrustStatsBackgroundArt />
        <DotGridPattern size={1.2} gap={32} maskRadial />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#12245C] dark:text-white">
              Why Buy Through Prime Funds?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              End-to-end property discovery, legal search, bank loan sanction & registration assistance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏦', title: '40+ Bank Partners', sub: 'SBI, HDFC, ICICI, Canara — up to 90% instant sanctions' },
              { icon: '📋', title: '100% Legal Clear Titles', sub: 'Every property vetted by senior legal & banking experts' },
              { icon: '🚗', title: 'Free Site Visits', sub: 'Doorstep cab pickup & drop arranged for your guided site tour' },
              { icon: '💬', title: 'Zero Buyer Brokerage', sub: 'Direct builder and owner pricing with full transparency' }
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 70}>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#151E32] border-2 border-slate-200 dark:border-slate-700 hover:border-[#F5822C] dark:hover:border-[#F5822C] hover:shadow-lg transition-all text-center">
                  <div className="text-3xl mb-2.5">{item.icon}</div>
                  <div className="font-bold text-[#12245C] dark:text-white text-sm">{item.title}</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{item.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-[#12245C] via-[#0F1D4A] to-[#12245C] text-white relative overflow-hidden">
        <GlowAura position="top-right" variant="orange" opacity="opacity-35" />
        <GlowAura position="bottom-left" variant="cyan" opacity="opacity-25" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5822C] text-xs font-bold uppercase tracking-wider">
            Looking for Off-Market Deals in Telangana?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Tell Us Your Budget & Preferred Location.
            <br /><span className="text-[#F5822C]">We Find & Finance Your Ideal Property.</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            From 150 Sq.Yd plots in Karimnagar & Hanamkonda to 50-Acre agriculture lands in Mancherial, Siricilla, Peddapalli & Siddipet — we match you with verified properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center pt-2">
            <button
              type="button"
              onClick={() => openInstantEnquiry({
                itemTitle: 'Telangana Real Estate Consultation & Off-Market Deals',
                itemCategory: 'Real Estate Property',
                channel: 'WhatsApp',
                targetUrl: BRAND_DETAILS.whatsappUrl("Hi Saikiran, I want to buy a property in Telangana. Please share available options.")
              })}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20be5a] text-white font-bold text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon size={18} />
              <span>Chat on WhatsApp</span>
            </button>
            <button
              onClick={() => onOpenApply('Property Purchase & Home Loan')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#F5822C] hover:bg-[#e0711f] text-white font-bold text-sm shadow-xl transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Request Free Callback</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/30 hover:border-white text-white font-bold text-sm transition-all active:scale-95"
            >
              <span>Visit Our Office</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
