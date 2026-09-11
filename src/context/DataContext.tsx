import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { InstantEnquiryModal, InstantEnquiryConfig } from '../components/InstantEnquiryModal';
import {
  PropertyItem,
  ServiceItem,
  InsuranceItem,
  TrustPoint,
  QuickTeaser,
  BrandDetails,
  AboutStat,
  WhyChooseUsItem,
  PolicySection,
  GovSchemeInfo,
  InquiryItem,
  InquiryStatus,
  AboutPageData,
  FeeSettings
} from '../types';
import { PROPERTY_LISTINGS as DEFAULT_PROPERTIES } from '../data/realEstateData';
import { LOAN_SERVICES as DEFAULT_LOANS } from '../data/loansData';
import {
  LIFE_INSURANCES as DEFAULT_LIFE_INSURANCES,
  GENERAL_INSURANCES as DEFAULT_GENERAL_INSURANCES,
  GOV_SCHEME_INFO as DEFAULT_GOV_SCHEMES
} from '../data/insuranceData';
import {
  BRAND_DETAILS as DEFAULT_BRAND,
  HOME_TRUST_POINTS as DEFAULT_TRUST_POINTS,
  HOME_TEASERS as DEFAULT_TEASERS,
  ABOUT_STATS as DEFAULT_STATS,
  WHY_CHOOSE_US as DEFAULT_WHY_CHOOSE,
  PRIVACY_POLICY_SECTIONS as DEFAULT_PRIVACY,
  TERMS_CONDITIONS_SECTIONS as DEFAULT_TERMS,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_FEE_SETTINGS
} from '../data/contentData';
import { api } from '../services/api';

interface RawBrandData {
  name: string;
  tagline: string;
  subTagline: string;
  contactPerson: string;
  phone: string;
  rawPhone: string;
  email: string;
  address: string;
}

interface DataContextType {
  // API status
  isBackendOnline: boolean;

  // Properties
  properties: PropertyItem[];
  addProperty: (property: PropertyItem) => void;
  updateProperty: (id: string, property: Partial<PropertyItem>) => void;
  deleteProperty: (id: string) => void;
  resetProperties: () => void;

  // Loans
  loans: ServiceItem[];
  addLoan: (loan: ServiceItem) => void;
  updateLoan: (id: string, loan: Partial<ServiceItem>) => void;
  deleteLoan: (id: string) => void;
  resetLoans: () => void;

  // Insurances
  lifeInsurances: InsuranceItem[];
  generalInsurances: InsuranceItem[];
  govSchemes: GovSchemeInfo;
  addInsurance: (insurance: InsuranceItem) => void;
  updateInsurance: (id: string, insurance: Partial<InsuranceItem>) => void;
  deleteInsurance: (id: string) => void;
  updateGovSchemes: (schemes: GovSchemeInfo) => void;
  resetInsurances: () => void;

  // Brand & Content
  brandDetails: BrandDetails;
  updateBrandDetails: (details: Partial<RawBrandData>) => void;
  resetBrandDetails: () => void;

  trustPoints: TrustPoint[];
  updateTrustPoint: (id: string, point: Partial<TrustPoint>) => void;
  addTrustPoint: (point: TrustPoint) => void;
  deleteTrustPoint: (id: string) => void;

  teasers: QuickTeaser[];
  updateTeaser: (id: string, teaser: Partial<QuickTeaser>) => void;

  aboutStats: AboutStat[];
  updateAboutStats: (stats: AboutStat[]) => void;

  aboutContent: AboutPageData;
  updateAboutContent: (content: Partial<AboutPageData> | ((prev: AboutPageData) => AboutPageData)) => void;
  resetAboutContent: () => void;

  whyChooseUs: WhyChooseUsItem[];
  updateWhyChooseUs: (items: WhyChooseUsItem[]) => void;

  privacySections: PolicySection[];
  updatePrivacySections: (sections: PolicySection[]) => void;

  termsSections: PolicySection[];
  updateTermsSections: (sections: PolicySection[]) => void;

  // Fee Management (Professional Fee & Processing Fee)
  feeSettings: FeeSettings;
  updateFeeSettings: (settings: Partial<FeeSettings>) => void;
  resetFeeSettings: () => void;

  // Instant WhatsApp / Call Enquiry Modal
  instantEnquiryModal: {
    isOpen: boolean;
    config: InstantEnquiryConfig | null;
  };
  openInstantEnquiry: (config: InstantEnquiryConfig) => void;
  closeInstantEnquiry: () => void;

  // Inquiries / Leads CRM
  inquiries: InquiryItem[];
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  deleteInquiry: (id: string) => void;
  clearAllInquiries: () => void;

  // Global Management
  resetAllToDefaults: () => void;
  exportAllDataJSON: () => string;
  importAllDataJSON: (jsonString: string) => { success: boolean; message: string };
  lastSavedTimestamp: number;
}

// ─── localStorage fallback helpers (offline mode) ────────────────────────────

const LS = {
  load: function<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch { return fallback; }
  },
  save: function<T>(key: string, data: T) {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* noop */ }
  }
};

const LS_KEYS = {
  PROPERTIES: 'pfs_data_properties_v2',
  LOANS: 'pfs_data_loans_v2',
  LIFE_INS: 'pfs_data_life_ins_v2',
  GEN_INS: 'pfs_data_gen_ins_v2',
  GOV: 'pfs_data_gov_schemes_v2',
  BRAND: 'pfs_data_brand_v2',
  TRUST: 'pfs_data_trust_v2',
  TEASERS: 'pfs_data_teasers_v2',
  STATS: 'pfs_data_stats_v2',
  ABOUT: 'pfs_data_about_content_v2',
  WHY: 'pfs_data_why_v2',
  PRIVACY: 'pfs_data_privacy_v2',
  TERMS: 'pfs_data_terms_v2',
  INQUIRIES: 'pfs_data_inquiries_v2',
  FEES: 'pfs_data_fees_v2',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State — initialized from defaults (will be overwritten by API data)
  const [properties, setProperties] = useState<PropertyItem[]>(() => LS.load(LS_KEYS.PROPERTIES, DEFAULT_PROPERTIES));
  const [loans, setLoans] = useState<ServiceItem[]>(() => LS.load(LS_KEYS.LOANS, DEFAULT_LOANS));
  const [lifeInsurances, setLifeInsurances] = useState<InsuranceItem[]>(() => LS.load(LS_KEYS.LIFE_INS, DEFAULT_LIFE_INSURANCES));
  const [generalInsurances, setGeneralInsurances] = useState<InsuranceItem[]>(() => LS.load(LS_KEYS.GEN_INS, DEFAULT_GENERAL_INSURANCES));
  const [govSchemes, setGovSchemes] = useState<GovSchemeInfo>(() => LS.load(LS_KEYS.GOV, DEFAULT_GOV_SCHEMES));
  const [rawBrand, setRawBrand] = useState<RawBrandData>(() => LS.load(LS_KEYS.BRAND, {
    name: DEFAULT_BRAND.name, tagline: DEFAULT_BRAND.tagline, subTagline: DEFAULT_BRAND.subTagline,
    contactPerson: DEFAULT_BRAND.contactPerson, phone: DEFAULT_BRAND.phone, rawPhone: DEFAULT_BRAND.rawPhone,
    email: DEFAULT_BRAND.email, address: DEFAULT_BRAND.address
  }));
  const [feeSettings, setFeeSettings] = useState<FeeSettings>(() => LS.load(LS_KEYS.FEES, DEFAULT_FEE_SETTINGS));
  const [trustPoints, setTrustPoints] = useState<TrustPoint[]>(() => LS.load(LS_KEYS.TRUST, DEFAULT_TRUST_POINTS));
  const [teasers, setTeasers] = useState<QuickTeaser[]>(() => LS.load(LS_KEYS.TEASERS, DEFAULT_TEASERS));
  const [aboutStats, setAboutStats] = useState<AboutStat[]>(() => LS.load(LS_KEYS.STATS, DEFAULT_STATS));
  const [aboutContent, setAboutContent] = useState<AboutPageData>(() => LS.load(LS_KEYS.ABOUT, DEFAULT_ABOUT_CONTENT));
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>(() => LS.load(LS_KEYS.WHY, DEFAULT_WHY_CHOOSE));
  const [privacySections, setPrivacySections] = useState<PolicySection[]>(() => LS.load(LS_KEYS.PRIVACY, DEFAULT_PRIVACY));
  const [termsSections, setTermsSections] = useState<PolicySection[]>(() => LS.load(LS_KEYS.TERMS, DEFAULT_TERMS));
  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => LS.load(LS_KEYS.INQUIRIES, []));
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number>(Date.now());

  const [instantEnquiryModal, setInstantEnquiryModal] = useState<{ isOpen: boolean; config: InstantEnquiryConfig | null }>({
    isOpen: false, config: null
  });

  // ─── Load all data from backend on mount ──────────────────────────────────

  useEffect(() => {
    loadFromBackend();
  }, []);

  const loadFromBackend = async () => {
    try {
      // Check if backend is online
      await api.health.check();
      setIsBackendOnline(true);

      // Load all data in parallel
      const [
        propsData,
        loansData,
        insData,
        brandData,
        statsData,
        whyData,
        trustData,
        privData,
        termsData,
        aboutData,
        govData,
        inqData,
        feesData
      ] = await Promise.allSettled([
        api.properties.getAll(),
        api.loans.getAll(),
        api.insurances.getAll(),
        api.settings.getBrand(),
        api.settings.getStats(),
        api.settings.getWhyChooseUs(),
        api.settings.getTrustPoints(),
        api.content.getPrivacy(),
        api.content.getTerms(),
        api.content.getAbout(),
        api.content.getGovSchemes(),
        api.inquiries.getAll(),
        api.settings.getFees()
      ]);

      if (propsData.status === 'fulfilled' && propsData.value?.length >= 0) {
        setProperties(propsData.value);
      }
      if (loansData.status === 'fulfilled' && loansData.value?.length >= 0) {
        setLoans(loansData.value);
      }
      if (insData.status === 'fulfilled' && insData.value?.length >= 0) {
        const life = insData.value.filter((i: InsuranceItem) => i.category === 'Life Insurance');
        const general = insData.value.filter((i: InsuranceItem) => i.category === 'General Insurance');
        setLifeInsurances(life);
        setGeneralInsurances(general);
      }
      if (brandData.status === 'fulfilled' && brandData.value) {
        setRawBrand(brandData.value as RawBrandData);
      }
      if (feesData.status === 'fulfilled' && feesData.value) {
        setFeeSettings(feesData.value as FeeSettings);
        LS.save(LS_KEYS.FEES, feesData.value);
      }
      if (statsData.status === 'fulfilled' && statsData.value?.length >= 0) {
        setAboutStats(statsData.value);
      }
      if (whyData.status === 'fulfilled' && whyData.value?.length >= 0) {
        setWhyChooseUs(whyData.value);
      }
      if (trustData.status === 'fulfilled' && trustData.value?.length >= 0) {
        setTrustPoints(trustData.value);
      }
      if (privData.status === 'fulfilled' && privData.value?.length >= 0) {
        setPrivacySections(privData.value);
      }
      if (termsData.status === 'fulfilled' && termsData.value?.length >= 0) {
        setTermsSections(termsData.value);
      }
      if (aboutData.status === 'fulfilled' && aboutData.value) {
        setAboutContent(aboutData.value as AboutPageData);
      }
      if (govData.status === 'fulfilled' && govData.value) {
        setGovSchemes(govData.value as GovSchemeInfo);
      }
      if (inqData.status === 'fulfilled' && inqData.value?.length >= 0) {
        setInquiries(inqData.value);
      }

      setLastSavedTimestamp(Date.now());
      console.log('✅ All data loaded from Supabase backend');
    } catch (err) {
      console.warn('⚠️  Backend offline — using localStorage fallback data', err);
      setIsBackendOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Computed brand details ────────────────────────────────────────────────

  const brandDetails: BrandDetails = {
    ...rawBrand,
    whatsappUrl: (text: string) =>
      `https://wa.me/${rawBrand.rawPhone || '919177886354'}?text=${encodeURIComponent(text)}`,
    callUrl: `tel:${rawBrand.rawPhone ? '+' + rawBrand.rawPhone.replace(/\D/g, '') : '+919177886354'}`,
    emailUrl: `mailto:${rawBrand.email || 'primefundssolutions@gmail.com'}`
  };

  // ─── Property Actions ──────────────────────────────────────────────────────

  const addProperty = useCallback((property: PropertyItem) => {
    setProperties(prev => [property, ...prev]);
    if (isBackendOnline) {
      api.properties.create(property).catch(err => console.error('addProperty API error:', err));
    } else {
      LS.save(LS_KEYS.PROPERTIES, [property, ...properties]);
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline, properties]);

  const updateProperty = useCallback((id: string, updatedFields: Partial<PropertyItem>) => {
    setProperties(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    if (isBackendOnline) {
      api.properties.update(id, updatedFields).catch(err => console.error('updateProperty API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const deleteProperty = useCallback((id: string) => {
    setProperties(prev => prev.filter(item => item.id !== id));
    if (isBackendOnline) {
      api.properties.delete(id).catch(err => console.error('deleteProperty API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const resetProperties = useCallback(() => {
    setProperties(DEFAULT_PROPERTIES);
  }, []);

  // ─── Loan Actions ──────────────────────────────────────────────────────────

  const addLoan = useCallback((loan: ServiceItem) => {
    setLoans(prev => [...prev, loan]);
    if (isBackendOnline) {
      api.loans.create(loan).catch(err => console.error('addLoan API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const updateLoan = useCallback((id: string, updatedFields: Partial<ServiceItem>) => {
    setLoans(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    if (isBackendOnline) {
      api.loans.update(id, updatedFields).catch(err => console.error('updateLoan API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const deleteLoan = useCallback((id: string) => {
    setLoans(prev => prev.filter(item => item.id !== id));
    if (isBackendOnline) {
      api.loans.delete(id).catch(err => console.error('deleteLoan API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const resetLoans = useCallback(() => { setLoans(DEFAULT_LOANS); }, []);

  // ─── Insurance Actions ─────────────────────────────────────────────────────

  const addInsurance = useCallback((insurance: InsuranceItem) => {
    if (insurance.category === 'Life Insurance') {
      setLifeInsurances(prev => [...prev, insurance]);
    } else {
      setGeneralInsurances(prev => [...prev, insurance]);
    }
    if (isBackendOnline) {
      api.insurances.create(insurance).catch(err => console.error('addInsurance API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const updateInsurance = useCallback((id: string, updatedFields: Partial<InsuranceItem>) => {
    setLifeInsurances(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    setGeneralInsurances(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    if (isBackendOnline) {
      api.insurances.update(id, updatedFields).catch(err => console.error('updateInsurance API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const deleteInsurance = useCallback((id: string) => {
    setLifeInsurances(prev => prev.filter(item => item.id !== id));
    setGeneralInsurances(prev => prev.filter(item => item.id !== id));
    if (isBackendOnline) {
      api.insurances.delete(id).catch(err => console.error('deleteInsurance API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const updateGovSchemes = useCallback((schemes: GovSchemeInfo) => {
    setGovSchemes(schemes);
    if (isBackendOnline) {
      api.content.updateGovSchemes(schemes).catch(err => console.error('updateGovSchemes API error:', err));
    }
  }, [isBackendOnline]);

  const resetInsurances = useCallback(() => {
    setLifeInsurances(DEFAULT_LIFE_INSURANCES);
    setGeneralInsurances(DEFAULT_GENERAL_INSURANCES);
    setGovSchemes(DEFAULT_GOV_SCHEMES);
  }, []);

  // ─── Brand Actions ─────────────────────────────────────────────────────────

  const updateBrandDetails = useCallback((details: Partial<RawBrandData>) => {
    setRawBrand(prev => ({ ...prev, ...details }));
    if (isBackendOnline) {
      api.settings.updateBrand({ ...rawBrand, ...details }).catch(err => console.error('updateBrand API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline, rawBrand]);

  const resetBrandDetails = useCallback(() => {
    const defaultBrand = {
      name: DEFAULT_BRAND.name, tagline: DEFAULT_BRAND.tagline, subTagline: DEFAULT_BRAND.subTagline,
      contactPerson: DEFAULT_BRAND.contactPerson, phone: DEFAULT_BRAND.phone, rawPhone: DEFAULT_BRAND.rawPhone,
      email: DEFAULT_BRAND.email, address: DEFAULT_BRAND.address
    };
    setRawBrand(defaultBrand);
    if (isBackendOnline) {
      api.settings.updateBrand(defaultBrand).catch(err => console.error('resetBrand API error:', err));
    }
  }, [isBackendOnline]);

  // ─── Trust & Teasers ──────────────────────────────────────────────────────

  const updateTrustPoint = useCallback((id: string, point: Partial<TrustPoint>) => {
    setTrustPoints(prev => prev.map(item => item.id === id ? { ...item, ...point } : item));
    setLastSavedTimestamp(Date.now());
  }, []);

  const addTrustPoint = useCallback((point: TrustPoint) => {
    setTrustPoints(prev => [...prev, point]);
  }, []);

  const deleteTrustPoint = useCallback((id: string) => {
    setTrustPoints(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateTeaser = useCallback((id: string, teaser: Partial<QuickTeaser>) => {
    setTeasers(prev => prev.map(item => item.id === id ? { ...item, ...teaser } : item));
  }, []);

  // ─── About, Why, Legal ────────────────────────────────────────────────────

  const updateAboutStats = useCallback((stats: AboutStat[]) => {
    setAboutStats(stats);
    if (isBackendOnline) {
      api.settings.updateStats(stats).catch(err => console.error('updateStats API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const updateAboutContent = useCallback((content: Partial<AboutPageData> | ((prev: AboutPageData) => AboutPageData)) => {
    setAboutContent(prev => {
      const next = typeof content === 'function' ? content(prev) : {
        ...prev, ...content,
        hero: content.hero ? { ...prev.hero, ...content.hero } : prev.hero,
        coreCapabilities: content.coreCapabilities ? { ...prev.coreCapabilities, ...content.coreCapabilities } : prev.coreCapabilities,
        missionVision: content.missionVision ? { ...prev.missionVision, ...content.missionVision } : prev.missionVision,
        distinctAdvantage: content.distinctAdvantage ? { ...prev.distinctAdvantage, ...content.distinctAdvantage } : prev.distinctAdvantage,
        trackRecord: content.trackRecord ? { ...prev.trackRecord, ...content.trackRecord } : prev.trackRecord
      };
      if (isBackendOnline) {
        api.content.updateAbout(next).catch(err => console.error('updateAbout API error:', err));
      }
      return next;
    });
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const resetAboutContent = useCallback(() => {
    setAboutContent(DEFAULT_ABOUT_CONTENT);
    if (isBackendOnline) {
      api.content.updateAbout(DEFAULT_ABOUT_CONTENT).catch(err => console.error('resetAbout API error:', err));
    }
  }, [isBackendOnline]);

  const updateWhyChooseUs = useCallback((items: WhyChooseUsItem[]) => {
    setWhyChooseUs(items);
    if (isBackendOnline) {
      api.settings.updateWhyChooseUs(items).catch(err => console.error('updateWhyChooseUs API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const updatePrivacySections = useCallback((sections: PolicySection[]) => {
    setPrivacySections(sections);
    if (isBackendOnline) {
      api.content.updatePrivacy(sections).catch(err => console.error('updatePrivacy API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const updateTermsSections = useCallback((sections: PolicySection[]) => {
    setTermsSections(sections);
    if (isBackendOnline) {
      api.content.updateTerms(sections).catch(err => console.error('updateTerms API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  // ─── Inquiries Actions ────────────────────────────────────────────────────

  const addInquiry = useCallback((inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const isPaid = inquiry.paymentStatus
      ? inquiry.paymentStatus === 'Paid (₹199)'
      : (inquiry.source === 'Apply Modal' || inquiry.source === 'Contact Page');

    const paymentStatus = inquiry.paymentStatus || (isPaid ? 'Paid (₹199)' : 'No Payment (Redirected)');
    const leadChannel = inquiry.leadChannel || (isPaid ? 'Website Form' : 'WhatsApp');

    const newInquiry: InquiryItem = {
      ...inquiry,
      paymentStatus,
      leadChannel,
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    setInquiries(prev => [newInquiry, ...prev]);

    if (isBackendOnline) {
      api.inquiries.create(newInquiry).catch(err => console.error('addInquiry API error:', err));
    }
  }, [isBackendOnline]);

  const updateInquiryStatus = useCallback((id: string, status: InquiryStatus) => {
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    if (isBackendOnline) {
      api.inquiries.updateStatus(id, status).catch(err => console.error('updateInquiryStatus API error:', err));
    }
  }, [isBackendOnline]);

  const updateInquiryNotes = useCallback((id: string, notes: string) => {
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, adminNotes: notes } : item));
    if (isBackendOnline) {
      api.inquiries.updateNotes(id, notes).catch(err => console.error('updateInquiryNotes API error:', err));
    }
  }, [isBackendOnline]);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
    if (isBackendOnline) {
      api.inquiries.delete(id).catch(err => console.error('deleteInquiry API error:', err));
    }
  }, [isBackendOnline]);

  const clearAllInquiries = useCallback(() => {
    setInquiries([]);
    if (isBackendOnline) {
      api.inquiries.clearAll().catch(err => console.error('clearAllInquiries API error:', err));
    }
  }, [isBackendOnline]);

  // ─── Instant Enquiry Modal ────────────────────────────────────────────────

  const openInstantEnquiry = useCallback((config: InstantEnquiryConfig) => {
    setInstantEnquiryModal({ isOpen: true, config });
  }, []);

  const closeInstantEnquiry = useCallback(() => {
    setInstantEnquiryModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  // ─── Fee Management Actions ───────────────────────────────────────────────

  const updateFeeSettings = useCallback((newSettings: Partial<FeeSettings>) => {
    setFeeSettings(prev => {
      const updated = { ...prev, ...newSettings };
      LS.save(LS_KEYS.FEES, updated);
      if (isBackendOnline) {
        api.settings.updateFees(updated).catch(err => console.error('updateFees API error:', err));
      }
      return updated;
    });
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  const resetFeeSettings = useCallback(() => {
    setFeeSettings(DEFAULT_FEE_SETTINGS);
    LS.save(LS_KEYS.FEES, DEFAULT_FEE_SETTINGS);
    if (isBackendOnline) {
      api.settings.updateFees(DEFAULT_FEE_SETTINGS).catch(err => console.error('resetFees API error:', err));
    }
    setLastSavedTimestamp(Date.now());
  }, [isBackendOnline]);

  // ─── Global Management ────────────────────────────────────────────────────

  const resetAllToDefaults = useCallback(() => {
    setProperties(DEFAULT_PROPERTIES);
    setLoans(DEFAULT_LOANS);
    setLifeInsurances(DEFAULT_LIFE_INSURANCES);
    setGeneralInsurances(DEFAULT_GENERAL_INSURANCES);
    setGovSchemes(DEFAULT_GOV_SCHEMES);
    setRawBrand({
      name: DEFAULT_BRAND.name, tagline: DEFAULT_BRAND.tagline, subTagline: DEFAULT_BRAND.subTagline,
      contactPerson: DEFAULT_BRAND.contactPerson, phone: DEFAULT_BRAND.phone, rawPhone: DEFAULT_BRAND.rawPhone,
      email: DEFAULT_BRAND.email, address: DEFAULT_BRAND.address
    });
    setFeeSettings(DEFAULT_FEE_SETTINGS);
    setTrustPoints(DEFAULT_TRUST_POINTS);
    setTeasers(DEFAULT_TEASERS);
    setAboutStats(DEFAULT_STATS);
    setAboutContent(DEFAULT_ABOUT_CONTENT);
    setWhyChooseUs(DEFAULT_WHY_CHOOSE);
    setPrivacySections(DEFAULT_PRIVACY);
    setTermsSections(DEFAULT_TERMS);
    setInquiries([]);
  }, []);

  const exportAllDataJSON = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: '2.0',
      brand: rawBrand,
      fees: feeSettings,
      properties, loans, lifeInsurances, generalInsurances, govSchemes,
      trustPoints, teasers, aboutStats, aboutContent, whyChooseUs,
      privacySections, termsSections, inquiries
    };
    return JSON.stringify(payload, null, 2);
  }, [rawBrand, feeSettings, properties, loans, lifeInsurances, generalInsurances, govSchemes, trustPoints, teasers, aboutStats, aboutContent, whyChooseUs, privacySections, termsSections, inquiries]);

  const importAllDataJSON = useCallback((jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') return { success: false, message: 'Invalid JSON format' };
      if (data.properties && Array.isArray(data.properties)) setProperties(data.properties);
      if (data.loans && Array.isArray(data.loans)) setLoans(data.loans);
      if (data.lifeInsurances && Array.isArray(data.lifeInsurances)) setLifeInsurances(data.lifeInsurances);
      if (data.generalInsurances && Array.isArray(data.generalInsurances)) setGeneralInsurances(data.generalInsurances);
      if (data.govSchemes && typeof data.govSchemes === 'object') setGovSchemes(data.govSchemes);
      if (data.brand && typeof data.brand === 'object') setRawBrand(data.brand);
      if (data.fees && typeof data.fees === 'object') {
        setFeeSettings(data.fees);
        LS.save(LS_KEYS.FEES, data.fees);
      }
      if (data.trustPoints && Array.isArray(data.trustPoints)) setTrustPoints(data.trustPoints);
      if (data.teasers && Array.isArray(data.teasers)) setTeasers(data.teasers);
      if (data.aboutStats && Array.isArray(data.aboutStats)) setAboutStats(data.aboutStats);
      if (data.aboutContent && typeof data.aboutContent === 'object') setAboutContent(data.aboutContent);
      if (data.whyChooseUs && Array.isArray(data.whyChooseUs)) setWhyChooseUs(data.whyChooseUs);
      if (data.privacySections && Array.isArray(data.privacySections)) setPrivacySections(data.privacySections);
      if (data.termsSections && Array.isArray(data.termsSections)) setTermsSections(data.termsSections);
      if (data.inquiries && Array.isArray(data.inquiries)) setInquiries(data.inquiries);
      return { success: true, message: 'Data successfully restored and synchronized!' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to parse JSON file.' };
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        isBackendOnline,
        properties, addProperty, updateProperty, deleteProperty, resetProperties,
        loans, addLoan, updateLoan, deleteLoan, resetLoans,
        lifeInsurances, generalInsurances, govSchemes,
        addInsurance, updateInsurance, deleteInsurance, updateGovSchemes, resetInsurances,
        brandDetails, updateBrandDetails, resetBrandDetails,
        feeSettings, updateFeeSettings, resetFeeSettings,
        trustPoints, updateTrustPoint, addTrustPoint, deleteTrustPoint,
        teasers, updateTeaser,
        aboutStats, updateAboutStats,
        aboutContent, updateAboutContent, resetAboutContent,
        whyChooseUs, updateWhyChooseUs,
        privacySections, updatePrivacySections,
        termsSections, updateTermsSections,
        instantEnquiryModal, openInstantEnquiry, closeInstantEnquiry,
        inquiries, addInquiry, updateInquiryStatus, updateInquiryNotes, deleteInquiry, clearAllInquiries,
        resetAllToDefaults, exportAllDataJSON, importAllDataJSON,
        lastSavedTimestamp
      }}
    >
      {children}
      <InstantEnquiryModal
        isOpen={instantEnquiryModal.isOpen}
        onClose={closeInstantEnquiry}
        config={instantEnquiryModal.config}
      />
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
