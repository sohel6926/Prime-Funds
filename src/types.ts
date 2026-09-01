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
  | 'terms';

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

export type PropertyCategory =
  | 'Open Plots'
  | 'Independent Houses'
  | 'G+1 Houses'
  | 'Apartment Flats';

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
  propertyType: PropertyCategory;
  subType: string;
  location: string;
  city: string;
  price: string;
  numericPrice: number;
  pricePerSqFt?: string;
  area: string;
  bhkOrSpecs: string;
  status: 'Ready to Move' | 'Under Construction' | 'Clear Title Plots' | 'Newly Constructed';
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

