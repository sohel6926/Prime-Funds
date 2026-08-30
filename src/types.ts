export type PageId =
  | 'home'
  | 'about'
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
