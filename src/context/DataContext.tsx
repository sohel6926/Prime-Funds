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
  AboutPageData
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
  DEFAULT_ABOUT_CONTENT
} from '../data/contentData';

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

const STORAGE_KEY_PROPERTIES = 'pfs_data_properties_v2';
const STORAGE_KEY_LOANS = 'pfs_data_loans_v2';
const STORAGE_KEY_LIFE_INSURANCE = 'pfs_data_life_ins_v2';
const STORAGE_KEY_GEN_INSURANCE = 'pfs_data_gen_ins_v2';
const STORAGE_KEY_GOV_SCHEMES = 'pfs_data_gov_schemes_v2';
const STORAGE_KEY_BRAND = 'pfs_data_brand_v2';
const STORAGE_KEY_TRUST = 'pfs_data_trust_v2';
const STORAGE_KEY_TEASERS = 'pfs_data_teasers_v2';
const STORAGE_KEY_STATS = 'pfs_data_stats_v2';
const STORAGE_KEY_ABOUT_CONTENT = 'pfs_data_about_content_v2';
const STORAGE_KEY_WHY = 'pfs_data_why_v2';
const STORAGE_KEY_PRIVACY = 'pfs_data_privacy_v2';
const STORAGE_KEY_TERMS = 'pfs_data_terms_v2';
const STORAGE_KEY_INQUIRIES = 'pfs_data_inquiries_v2';

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (e) {
    console.warn(`Error loading ${key} from storage:`, e);
  }
  return fallback;
};

const saveToStorage = <T,>(key: string, data: T) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
};

const initialSampleInquiries: InquiryItem[] = [
  {
    id: 'inq-101',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    fullName: 'Rajesh Goud',
    phone: '+91 98480 12345',
    email: 'rajesh.goud@example.com',
    serviceType: 'Home Loan (Villas & Apartments)',
    itemTitle: 'Home Loan (Villas & Apartments)',
    itemCategory: 'Loan Product',
    paymentStatus: 'Paid (₹199)',
    leadChannel: 'Website Form',
    loanAmount: '₹45,00,000',
    employmentType: 'Salaried Professional',
    city: 'Karimnagar',
    message: 'Interested in KUDA approved plot loan sanction with SBI or HDFC. Paid ₹199 consultation fee online.',
    source: 'Apply Modal',
    status: 'New',
    adminNotes: 'Online paid form submitted. Requested callback at 6 PM.'
  },
  {
    id: 'inq-102',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    fullName: 'Sunita Rao',
    phone: '+91 94401 56789',
    email: 'sunita.rao@techcorp.in',
    serviceType: 'Real Estate Property Purchase',
    itemTitle: 'KUDA Luxury Villa Plots - Karimnagar',
    itemCategory: 'Real Estate Property',
    paymentStatus: 'No Payment (Redirected)',
    leadChannel: 'WhatsApp',
    loanAmount: '₹65,00,000',
    employmentType: 'Doctor / Professional',
    city: 'Mancherial',
    message: 'Clicked WhatsApp button for KUDA Luxury Villa Plots. Lead captured without payment prior to redirection.',
    source: 'Instant WhatsApp Inquiry',
    propertyId: 'kuda-luxury-villa-plots-karimnagar',
    status: 'In Progress',
    adminNotes: 'Redirected to WhatsApp. Site visit scheduled for upcoming Sunday.'
  },
  {
    id: 'inq-103',
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    fullName: 'Venkatesh Sharma',
    phone: '+91 91234 56780',
    email: 'venkat.sharma@gmail.com',
    serviceType: 'Health Insurance Plan',
    itemTitle: 'Star Health Comprehensive (₹10L-₹1Cr)',
    itemCategory: 'Insurance Plan',
    paymentStatus: 'No Payment (Redirected)',
    leadChannel: 'Call',
    employmentType: 'Business Owner',
    city: 'Hyderabad',
    message: 'Direct Call clicked on Star Health Insurance plan. Redirected to call without payment.',
    source: 'Instant Call Inquiry',
    status: 'Contacted',
    adminNotes: 'Call connected directly. Discussed family floater policy terms.'
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<PropertyItem[]>(() =>
    loadFromStorage(STORAGE_KEY_PROPERTIES, DEFAULT_PROPERTIES)
  );

  const [loans, setLoans] = useState<ServiceItem[]>(() =>
    loadFromStorage(STORAGE_KEY_LOANS, DEFAULT_LOANS)
  );

  const [lifeInsurances, setLifeInsurances] = useState<InsuranceItem[]>(() =>
    loadFromStorage(STORAGE_KEY_LIFE_INSURANCE, DEFAULT_LIFE_INSURANCES)
  );

  const [generalInsurances, setGeneralInsurances] = useState<InsuranceItem[]>(() =>
    loadFromStorage(STORAGE_KEY_GEN_INSURANCE, DEFAULT_GENERAL_INSURANCES)
  );

  const [govSchemes, setGovSchemes] = useState<GovSchemeInfo>(() =>
    loadFromStorage(STORAGE_KEY_GOV_SCHEMES, DEFAULT_GOV_SCHEMES)
  );

  const [rawBrand, setRawBrand] = useState<RawBrandData>(() =>
    loadFromStorage(STORAGE_KEY_BRAND, {
      name: DEFAULT_BRAND.name,
      tagline: DEFAULT_BRAND.tagline,
      subTagline: DEFAULT_BRAND.subTagline,
      contactPerson: DEFAULT_BRAND.contactPerson,
      phone: DEFAULT_BRAND.phone,
      rawPhone: DEFAULT_BRAND.rawPhone,
      email: DEFAULT_BRAND.email,
      address: DEFAULT_BRAND.address
    })
  );

  const [trustPoints, setTrustPoints] = useState<TrustPoint[]>(() =>
    loadFromStorage(STORAGE_KEY_TRUST, DEFAULT_TRUST_POINTS)
  );

  const [teasers, setTeasers] = useState<QuickTeaser[]>(() =>
    loadFromStorage(STORAGE_KEY_TEASERS, DEFAULT_TEASERS)
  );

  const [aboutStats, setAboutStats] = useState<AboutStat[]>(() =>
    loadFromStorage(STORAGE_KEY_STATS, DEFAULT_STATS)
  );

  const [aboutContent, setAboutContent] = useState<AboutPageData>(() =>
    loadFromStorage(STORAGE_KEY_ABOUT_CONTENT, DEFAULT_ABOUT_CONTENT)
  );

  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>(() =>
    loadFromStorage(STORAGE_KEY_WHY, DEFAULT_WHY_CHOOSE)
  );

  const [privacySections, setPrivacySections] = useState<PolicySection[]>(() =>
    loadFromStorage(STORAGE_KEY_PRIVACY, DEFAULT_PRIVACY)
  );

  const [termsSections, setTermsSections] = useState<PolicySection[]>(() =>
    loadFromStorage(STORAGE_KEY_TERMS, DEFAULT_TERMS)
  );

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() =>
    loadFromStorage(STORAGE_KEY_INQUIRIES, initialSampleInquiries)
  );

  const [instantEnquiryModal, setInstantEnquiryModal] = useState<{
    isOpen: boolean;
    config: InstantEnquiryConfig | null;
  }>({
    isOpen: false,
    config: null
  });

  const openInstantEnquiry = useCallback((config: InstantEnquiryConfig) => {
    setInstantEnquiryModal({
      isOpen: true,
      config
    });
  }, []);

  const closeInstantEnquiry = useCallback(() => {
    setInstantEnquiryModal(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number>(Date.now());

  // Save changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY_PROPERTIES, properties);
    setLastSavedTimestamp(Date.now());
  }, [properties]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_LOANS, loans);
    setLastSavedTimestamp(Date.now());
  }, [loans]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_LIFE_INSURANCE, lifeInsurances);
    setLastSavedTimestamp(Date.now());
  }, [lifeInsurances]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_GEN_INSURANCE, generalInsurances);
    setLastSavedTimestamp(Date.now());
  }, [generalInsurances]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_GOV_SCHEMES, govSchemes);
    setLastSavedTimestamp(Date.now());
  }, [govSchemes]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_BRAND, rawBrand);
    setLastSavedTimestamp(Date.now());
  }, [rawBrand]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_TRUST, trustPoints);
    setLastSavedTimestamp(Date.now());
  }, [trustPoints]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_TEASERS, teasers);
    setLastSavedTimestamp(Date.now());
  }, [teasers]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_STATS, aboutStats);
    setLastSavedTimestamp(Date.now());
  }, [aboutStats]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_ABOUT_CONTENT, aboutContent);
    setLastSavedTimestamp(Date.now());
  }, [aboutContent]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_WHY, whyChooseUs);
    setLastSavedTimestamp(Date.now());
  }, [whyChooseUs]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_PRIVACY, privacySections);
    setLastSavedTimestamp(Date.now());
  }, [privacySections]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_TERMS, termsSections);
    setLastSavedTimestamp(Date.now());
  }, [termsSections]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY_INQUIRIES, inquiries);
    setLastSavedTimestamp(Date.now());
  }, [inquiries]);

  // Computed brand details with active WhatsApp and URL generators
  const brandDetails: BrandDetails = {
    ...rawBrand,
    whatsappUrl: (text: string) =>
      `https://wa.me/${rawBrand.rawPhone || '919177886354'}?text=${encodeURIComponent(text)}`,
    callUrl: `tel:${rawBrand.rawPhone ? '+' + rawBrand.rawPhone.replace(/\D/g, '') : '+919177886354'}`,
    emailUrl: `mailto:${rawBrand.email || 'contact@primefundssolutions.com'}`
  };

  // Property Actions
  const addProperty = useCallback((property: PropertyItem) => {
    setProperties(prev => [property, ...prev]);
  }, []);

  const updateProperty = useCallback((id: string, updatedFields: Partial<PropertyItem>) => {
    setProperties(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  }, []);

  const deleteProperty = useCallback((id: string) => {
    setProperties(prev => prev.filter(item => item.id !== id));
  }, []);

  const resetProperties = useCallback(() => {
    setProperties(DEFAULT_PROPERTIES);
  }, []);

  // Loan Actions
  const addLoan = useCallback((loan: ServiceItem) => {
    setLoans(prev => [...prev, loan]);
  }, []);

  const updateLoan = useCallback((id: string, updatedFields: Partial<ServiceItem>) => {
    setLoans(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  }, []);

  const deleteLoan = useCallback((id: string) => {
    setLoans(prev => prev.filter(item => item.id !== id));
  }, []);

  const resetLoans = useCallback(() => {
    setLoans(DEFAULT_LOANS);
  }, []);

  // Insurance Actions
  const addInsurance = useCallback((insurance: InsuranceItem) => {
    if (insurance.category === 'Life Insurance') {
      setLifeInsurances(prev => [...prev, insurance]);
    } else {
      setGeneralInsurances(prev => [...prev, insurance]);
    }
  }, []);

  const updateInsurance = useCallback((id: string, updatedFields: Partial<InsuranceItem>) => {
    setLifeInsurances(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    setGeneralInsurances(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  }, []);

  const deleteInsurance = useCallback((id: string) => {
    setLifeInsurances(prev => prev.filter(item => item.id !== id));
    setGeneralInsurances(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateGovSchemes = useCallback((schemes: GovSchemeInfo) => {
    setGovSchemes(schemes);
  }, []);

  const resetInsurances = useCallback(() => {
    setLifeInsurances(DEFAULT_LIFE_INSURANCES);
    setGeneralInsurances(DEFAULT_GENERAL_INSURANCES);
    setGovSchemes(DEFAULT_GOV_SCHEMES);
  }, []);

  // Brand Actions
  const updateBrandDetails = useCallback((details: Partial<RawBrandData>) => {
    setRawBrand(prev => ({ ...prev, ...details }));
  }, []);

  const resetBrandDetails = useCallback(() => {
    setRawBrand({
      name: DEFAULT_BRAND.name,
      tagline: DEFAULT_BRAND.tagline,
      subTagline: DEFAULT_BRAND.subTagline,
      contactPerson: DEFAULT_BRAND.contactPerson,
      phone: DEFAULT_BRAND.phone,
      rawPhone: DEFAULT_BRAND.rawPhone,
      email: DEFAULT_BRAND.email,
      address: DEFAULT_BRAND.address
    });
  }, []);

  // Trust & Teasers
  const updateTrustPoint = useCallback((id: string, point: Partial<TrustPoint>) => {
    setTrustPoints(prev =>
      prev.map(item => (item.id === id ? { ...item, ...point } : item))
    );
  }, []);

  const addTrustPoint = useCallback((point: TrustPoint) => {
    setTrustPoints(prev => [...prev, point]);
  }, []);

  const deleteTrustPoint = useCallback((id: string) => {
    setTrustPoints(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateTeaser = useCallback((id: string, teaser: Partial<QuickTeaser>) => {
    setTeasers(prev =>
      prev.map(item => (item.id === id ? { ...item, ...teaser } : item))
    );
  }, []);

  // About, Why, Legal
  const updateAboutStats = useCallback((stats: AboutStat[]) => {
    setAboutStats(stats);
  }, []);

  const updateAboutContent = useCallback((content: Partial<AboutPageData> | ((prev: AboutPageData) => AboutPageData)) => {
    setAboutContent(prev => {
      if (typeof content === 'function') {
        return content(prev);
      }
      return {
        ...prev,
        ...content,
        hero: content.hero ? { ...prev.hero, ...content.hero } : prev.hero,
        coreCapabilities: content.coreCapabilities ? { ...prev.coreCapabilities, ...content.coreCapabilities } : prev.coreCapabilities,
        missionVision: content.missionVision ? { ...prev.missionVision, ...content.missionVision } : prev.missionVision,
        distinctAdvantage: content.distinctAdvantage ? { ...prev.distinctAdvantage, ...content.distinctAdvantage } : prev.distinctAdvantage,
        trackRecord: content.trackRecord ? { ...prev.trackRecord, ...content.trackRecord } : prev.trackRecord
      };
    });
  }, []);

  const resetAboutContent = useCallback(() => {
    setAboutContent(DEFAULT_ABOUT_CONTENT);
  }, []);

  const updateWhyChooseUs = useCallback((items: WhyChooseUsItem[]) => {
    setWhyChooseUs(items);
  }, []);

  const updatePrivacySections = useCallback((sections: PolicySection[]) => {
    setPrivacySections(sections);
  }, []);

  const updateTermsSections = useCallback((sections: PolicySection[]) => {
    setTermsSections(sections);
  }, []);

  // Inquiries Actions
  const addInquiry = useCallback(
    (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => {
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
    },
    []
  );

  const updateInquiryStatus = useCallback((id: string, status: InquiryStatus) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  }, []);

  const updateInquiryNotes = useCallback((id: string, notes: string) => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, adminNotes: notes } : item))
    );
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearAllInquiries = useCallback(() => {
    setInquiries([]);
  }, []);

  // Global Management
  const resetAllToDefaults = useCallback(() => {
    setProperties(DEFAULT_PROPERTIES);
    setLoans(DEFAULT_LOANS);
    setLifeInsurances(DEFAULT_LIFE_INSURANCES);
    setGeneralInsurances(DEFAULT_GENERAL_INSURANCES);
    setGovSchemes(DEFAULT_GOV_SCHEMES);
    setRawBrand({
      name: DEFAULT_BRAND.name,
      tagline: DEFAULT_BRAND.tagline,
      subTagline: DEFAULT_BRAND.subTagline,
      contactPerson: DEFAULT_BRAND.contactPerson,
      phone: DEFAULT_BRAND.phone,
      rawPhone: DEFAULT_BRAND.rawPhone,
      email: DEFAULT_BRAND.email,
      address: DEFAULT_BRAND.address
    });
    setTrustPoints(DEFAULT_TRUST_POINTS);
    setTeasers(DEFAULT_TEASERS);
    setAboutStats(DEFAULT_STATS);
    setAboutContent(DEFAULT_ABOUT_CONTENT);
    setWhyChooseUs(DEFAULT_WHY_CHOOSE);
    setPrivacySections(DEFAULT_PRIVACY);
    setTermsSections(DEFAULT_TERMS);
    setInquiries(initialSampleInquiries);
  }, []);

  const exportAllDataJSON = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: '2.0',
      brand: rawBrand,
      properties,
      loans,
      lifeInsurances,
      generalInsurances,
      govSchemes,
      trustPoints,
      teasers,
      aboutStats,
      aboutContent,
      whyChooseUs,
      privacySections,
      termsSections,
      inquiries
    };
    return JSON.stringify(payload, null, 2);
  }, [
    rawBrand,
    properties,
    loans,
    lifeInsurances,
    generalInsurances,
    govSchemes,
    trustPoints,
    teasers,
    aboutStats,
    aboutContent,
    whyChooseUs,
    privacySections,
    termsSections,
    inquiries
  ]);

  const importAllDataJSON = useCallback((jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Invalid JSON format' };
      }
      if (data.properties && Array.isArray(data.properties)) setProperties(data.properties);
      if (data.loans && Array.isArray(data.loans)) setLoans(data.loans);
      if (data.lifeInsurances && Array.isArray(data.lifeInsurances)) setLifeInsurances(data.lifeInsurances);
      if (data.generalInsurances && Array.isArray(data.generalInsurances)) setGeneralInsurances(data.generalInsurances);
      if (data.govSchemes && typeof data.govSchemes === 'object') setGovSchemes(data.govSchemes);
      if (data.brand && typeof data.brand === 'object') setRawBrand(data.brand);
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
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        resetProperties,

        loans,
        addLoan,
        updateLoan,
        deleteLoan,
        resetLoans,

        lifeInsurances,
        generalInsurances,
        govSchemes,
        addInsurance,
        updateInsurance,
        deleteInsurance,
        updateGovSchemes,
        resetInsurances,

        brandDetails,
        updateBrandDetails,
        resetBrandDetails,

        trustPoints,
        updateTrustPoint,
        addTrustPoint,
        deleteTrustPoint,

        teasers,
        updateTeaser,

        aboutStats,
        updateAboutStats,

        aboutContent,
        updateAboutContent,
        resetAboutContent,

        whyChooseUs,
        updateWhyChooseUs,

        privacySections,
        updatePrivacySections,

        termsSections,
        updateTermsSections,

        // Instant Enquiry Modal
        instantEnquiryModal,
        openInstantEnquiry,
        closeInstantEnquiry,

        inquiries,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        clearAllInquiries,

        resetAllToDefaults,
        exportAllDataJSON,
        importAllDataJSON,
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
