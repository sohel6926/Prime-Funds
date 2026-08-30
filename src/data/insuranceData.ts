import { InsuranceItem } from '../types';

export const LIFE_INSURANCES: InsuranceItem[] = [
  {
    id: 'term-life',
    title: 'Term Life Insurance',
    category: 'Life Insurance',
    coverageHighlight: 'Up to ₹2 Crore+ Cover',
    description: 'Protect your family with maximum financial coverage at nominal monthly premium rates.',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    iconName: 'Shield',
    whatsappMessage: "Hi, I'm interested in Term Life Insurance. Please share more details.",
    features: [
      'Pure risk protection with high sum assured',
      'Critical illness and accidental riders',
      'Tax exemption under Section 80C'
    ]
  },
  {
    id: 'whole-life',
    title: 'Whole Life Insurance',
    category: 'Life Insurance',
    coverageHighlight: 'Lifelong Protection (Age 100)',
    description: 'Ensure lifetime financial security and create an enduring wealth legacy for your descendants.',
    imageUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
    iconName: 'HeartHandshake',
    whatsappMessage: "Hi, I'm interested in Whole Life Insurance. Please share more details.",
    features: [
      'Coverage extending up to 100 years of age',
      'Guaranteed cash value accumulation',
      'Option to borrow against accumulated policy value'
    ]
  },
  {
    id: 'ulip-plans',
    title: 'ULIPs (Unit Linked Plans)',
    category: 'Life Insurance',
    coverageHighlight: 'Dual Benefit: Investment + Life Cover',
    description: 'Combine market-linked investment growth with essential life cover under a single flexible plan.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    iconName: 'TrendingUp',
    whatsappMessage: "Hi, I'd like to know more about ULIP Plans.",
    features: [
      'Choice of equity, debt, and balanced funds',
      'Free switches between asset classes',
      'Long-term compounded wealth generation'
    ]
  },
  {
    id: 'endowment-plan',
    title: 'Endowment Plans',
    category: 'Life Insurance',
    coverageHighlight: 'Guaranteed Savings + Bonuses',
    description: 'Accumulate disciplined savings with guaranteed returns and periodic bonuses to meet milestones.',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    iconName: 'PiggyBank',
    whatsappMessage: "Hi, I'm interested in Endowment Plans. Please share more details.",
    features: [
      'Guaranteed sum assured on maturity or demise',
      'Annual declared reversionary bonuses',
      'Low-risk structured capital preservation'
    ]
  },
  {
    id: 'child-plans',
    title: 'Child Education Plans',
    category: 'Life Insurance',
    coverageHighlight: 'College & Higher Studies Fund',
    description: 'Secure your child’s educational dreams and career goals even in your unforeseen absence.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    iconName: 'GraduationCap',
    whatsappMessage: "Hi, I'm interested in Child Education Plans. Please share more details.",
    features: [
      'Waiver of premium on parent demise',
      'Staggered payouts matching admission milestones',
      'Dedicated fund for overseas education'
    ]
  },
  {
    id: 'retirement-plans',
    title: 'Retirement & Pension Plans',
    category: 'Life Insurance',
    coverageHighlight: 'Guaranteed Regular Monthly Annuity',
    description: 'Enjoy financial freedom and a steady pension after your active working years conclude.',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80',
    iconName: 'SunMedium',
    whatsappMessage: "Hi, I'm interested in Retirement and Pension Plans. Please share more details.",
    features: [
      'Lifelong inflation-adjusted annuity options',
      'Lump-sum tax-free commutation on retirement',
      'Immediate or deferred annuity choices'
    ]
  }
];

export const GENERAL_INSURANCES: InsuranceItem[] = [
  {
    id: 'health-insurance',
    title: 'Health Insurance',
    category: 'General Insurance',
    coverageHighlight: '₹5 Lakh to ₹5 Crore Coverage',
    description: 'Safeguard your family against steep medical expenses with cashless hospitalization across India.',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    iconName: 'Activity',
    whatsappMessage: "Hi, I'd like to know more about Health Insurance.",
    features: [
      '10,000+ cashless network hospitals',
      'Pre & post hospitalization coverage included',
      'Zero room rent capping and restoration benefits'
    ]
  },
  {
    id: 'vehicle-insurance',
    title: 'Vehicle Insurance',
    category: 'General Insurance',
    coverageHighlight: 'Comprehensive Car & Bike Protection',
    description: 'Protect your four-wheeler or two-wheeler against road accidents, theft, and third-party liabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    iconName: 'Car',
    whatsappMessage: "Hi, I'm interested in Vehicle Insurance. Please share more details.",
    features: [
      'Zero depreciation add-on available',
      'Instant cashless repair across network garages',
      'Quick roadside assistance and engine protection'
    ]
  },
  {
    id: 'home-insurance',
    title: 'Home Insurance',
    category: 'General Insurance',
    coverageHighlight: 'Structure & Contents Coverage',
    description: 'Shield your residential structure and precious home contents from fire, theft, and natural perils.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    iconName: 'Home',
    whatsappMessage: "Hi, I'm interested in Home Insurance. Please share more details.",
    features: [
      'Comprehensive cover for structural damage',
      'Protection for electrical appliances and jewelry',
      'Alternative accommodation expenses coverage'
    ]
  },
  {
    id: 'travel-insurance',
    title: 'Travel Insurance',
    category: 'General Insurance',
    coverageHighlight: 'Domestic & International Trips',
    description: 'Travel worldwide with confidence against medical emergencies, flight delays, and lost luggage.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    iconName: 'Plane',
    whatsappMessage: "Hi, I'm interested in Travel Insurance. Please share more details.",
    features: [
      'Emergency medical evacuation coverage',
      'Trip cancellation and passport loss reimbursement',
      'Schengen-visa compliant travel policy'
    ]
  },
  {
    id: 'property-insurance',
    title: 'Property Insurance',
    category: 'General Insurance',
    coverageHighlight: 'Commercial Buildings & Warehouses',
    description: 'Secure commercial real estate, factories, and warehouses from catastrophic fire and storm hazards.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    iconName: 'Building',
    whatsappMessage: "Hi, I'm interested in Property Insurance. Please share more details.",
    features: [
      'Reinstatement value calculation for buildings',
      'Coverage for plant, machinery, and raw inventory',
      'Protection against riot, strike, and malicious damage'
    ]
  },
  {
    id: 'business-insurance',
    title: 'Business Insurance',
    category: 'General Insurance',
    coverageHighlight: 'Liability & Operational Risk Cover',
    description: 'Defend your enterprise against professional liabilities, worker compensation, and operational disruptions.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    iconName: 'Briefcase',
    whatsappMessage: "Hi, I'm interested in Business Insurance. Please share more details.",
    features: [
      'Directors and officers (D&O) liability cover',
      'Cyber risk and data breach indemnity',
      'Keyman insurance and group employee benefits'
    ]
  }
];

export const GOV_SCHEME_INFO = {
  title: 'Government Social Security & Subsidized Insurance Schemes',
  description: 'We actively assist clients with enrollments into central government welfare schemes including Pradhan Mantri Suraksha Bima Yojana and Pradhan Mantri Jeevan Jyoti Bima Yojana for essential life and accidental coverage at nominal annual fees.',
  schemes: [
    {
      name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
      premium: '₹20 / Year',
      benefit: '₹2 Lakh Accidental Death & Disability Cover'
    },
    {
      name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
      premium: '₹436 / Year',
      benefit: '₹2 Lakh Renewable Life Cover'
    }
  ]
};
