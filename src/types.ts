export type PageId =
  | 'home'
  | 'about'
  | 'realestate'
  | 'property-detail'
  | 'services'
  | 'insurances'
  | 'calculator'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Personal' | 'Property' | 'Business' | 'Specialized';
  tagline: string;
  description: string;
  interestRateText: string;
  tenureText: string;
  imageUrl: string;
  iconName: string;
  whatsappMessage: string;
  features: string[];
}

export interface InsuranceItem {
  id: string;
  title: string;
  category: 'Life Insurance' | 'General Insurance';
  coverageHighlight: string;
  description: string;
  imageUrl: string;
  iconName: string;
  whatsappMessage: string;
  features: string[];
}

export type PropertyClass = 'Residential' | 'Commercial' | 'Agriculture';

export type PropertyCategory =
  | 'Open Plots'
  | 'Independent Houses'
  | 'G+1 Houses'
  | 'Apartment Flats'
  | 'Commercial'
  | 'Agriculture'
  | 'Commercial Space'
  | 'Farmland';

export interface PropertyLoanOption {
  loanId: string;
  loanName: string;
  interestRate: string;
  maxFunding: string;
  maxTenure: string;
  estimatedEmi: string;
  partnerBanks: string[];
  specialBenefit: string;
}

export interface PropertyInsuranceOption {
  insuranceId: string;
  insuranceName: string;
  coverageHighlight: string;
  premiumEstimate: string;
  keyCoverages: string[];
}

export interface PropertyItem {
  id: string;
  title: string;
  propertyClass?: PropertyClass;
  propertyType: PropertyCategory;
  subType: string;
  location: string;
  city: string;
  price: string;
  numericPrice: number;
  pricePerSqFt?: string;
  area: string;
  numericArea?: number;
  areaUnit?: 'sq.yrds' | 'acres' | 'sq.ft';
  bhkOrSpecs: string;
  status: 'Ready to Move' | 'Under Construction' | 'Clear Title Plots' | 'Newly Constructed' | 'Clear Title Farmland' | 'Ready for Registration';
  reraId?: string;
  possessionDate: string;
  tagline: string;
  description: string;
  catchyHook: string;
  images: string[];
  quickHighlights: string[];
  eligibleLoans: PropertyLoanOption[];
  eligibleInsurances: PropertyInsuranceOption[];
  whatsappMessage: string;
  featured?: boolean;
}

export interface TrustPoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface QuickTeaser {
  id: PageId;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  iconName: string;
}

export interface BrandDetails {
  name: string;
  tagline: string;
  subTagline: string;
  contactPerson: string;
  phone: string;
  rawPhone: string;
  email: string;
  address: string;
  whatsappUrl: (text: string) => string;
  callUrl: string;
  emailUrl: string;
}

export interface AboutStat {
  prefix: string;
  numericValue: number;
  suffix: string;
  value: string;
  label: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  iconName: string;
}

export interface PolicySection {
  title: string;
  content: string;
}

export interface AboutPillarItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  bulletPoints: string[];
  buttonText: string;
  buttonTarget: PageId;
}

export interface AboutHeroData {
  badge: string;
  animatingPhrases: string[];
  description: string;
}

export interface AboutMissionVisionData {
  missionTitle: string;
  missionDescription: string;
  missionTagline: string;
  visionTitle: string;
  visionDescription: string;
  visionTagline: string;
}

export interface AboutDistinctAdvantageData {
  badge: string;
  heading: string;
  imageUrl: string;
  imageBadge: string;
  imageCaption: string;
}

export interface AboutTrackRecordData {
  heading: string;
  subtitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface AboutPageData {
  hero: AboutHeroData;
  coreCapabilities: {
    badge: string;
    heading: string;
    subtitle: string;
    pillars: AboutPillarItem[];
  };
  missionVision: AboutMissionVisionData;
  distinctAdvantage: AboutDistinctAdvantageData;
  trackRecord: AboutTrackRecordData;
}

export interface GovSchemeInfo {
  title: string;
  description: string;
  schemes: {
    name: string;
    premium: string;
    benefit: string;
  }[];
}

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

export type LeadPaymentStatus = 'Paid (₹199)' | 'No Payment (Redirected)';
export type LeadChannel = 'Website Form' | 'WhatsApp' | 'Call' | 'Admin Entry';

export interface InquiryItem {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  itemTitle?: string;
  itemCategory?: 'Real Estate Property' | 'Loan Product' | 'Insurance Plan' | 'Financial Service' | 'General' | string;
  paymentStatus?: LeadPaymentStatus;
  leadChannel?: LeadChannel;
  loanAmount?: string;
  employmentType?: string;
  city?: string;
  message?: string;
  source: 'Apply Modal' | 'Contact Page' | 'Property Inquiry' | 'Direct Admin Entry' | 'Instant WhatsApp Inquiry' | 'Instant Call Inquiry' | string;
  propertyId?: string;
  status: InquiryStatus;
  adminNotes?: string;
}



