import { TrustPoint, QuickTeaser, AboutPageData } from '../types';

export const BRAND_DETAILS = {
  name: 'Prime Funds Solutions Pvt. Ltd.',
  tagline: 'All About Loans',
  subTagline: 'Indian loans & insurance facilitation consultancy',
  contactPerson: 'Saikiran.V',
  phone: '+91 9177886354',
  rawPhone: '919177886354',
  email: 'primefundssolutions@gmail.com',
  address: 'Prime Towers, Financial District, Gachibowli, Hyderabad, Telangana 500032, India',
  whatsappUrl: (text: string) => {
    const sanitized = (text || '').replace(/\bHi\s+Saikiran\b/gi, 'Hi Prime Funds');
    return `https://wa.me/919177886354?text=${encodeURIComponent(sanitized)}`;
  },
  callUrl: 'tel:+919177886354',
  emailUrl: 'mailto:primefundssolutions@gmail.com'
};

export const HOME_TRUST_POINTS: TrustPoint[] = [
  {
    id: 'tp-1',
    title: '40+ Lending Partners',
    description: 'We connect you directly with premier Indian banks and reputed NBFCs.',
    iconName: 'Building2'
  },
  {
    id: 'tp-2',
    title: 'Transparent Advisory',
    description: 'Our loan experts provide unbiased comparisons with zero hidden consultation charges.',
    iconName: 'BadgeCheck'
  },
  {
    id: 'tp-3',
    title: 'Rapid Sanction Cycles',
    description: 'Experience swift document clearance and expedited fund disbursements directly to your account.',
    iconName: 'Zap'
  },
  {
    id: 'tp-4',
    title: 'End-to-End Assistance',
    description: 'We handle your complete paperwork from initial application up to final disbursement.',
    iconName: 'FileCheck2'
  }
];

export const HOME_TEASERS: QuickTeaser[] = [
  {
    id: 'realestate',
    title: 'Real Estate & Properties',
    description: 'Explore verified residential villas, luxury apartments, commercial hubs & gated plots with pre-approved loans.',
    buttonText: 'Explore Properties',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    iconName: 'Building2'
  },
  {
    id: 'services',
    title: 'All Loan Services',
    description: 'Personal, home, mortgage, business, and agriculture loans tailored with the lowest interest rates.',
    buttonText: 'View All Loans',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    iconName: 'Coins'
  },
  {
    id: 'insurances',
    title: 'Asset & Life Insurance',
    description: 'Protect your family and property assets with comprehensive life and general insurance plans.',
    buttonText: 'View Insurance Plans',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    iconName: 'Shield'
  },
  {
    id: 'calculator',
    title: 'Loan EMI Calculator',
    description: 'Plan your monthly repayments and assess your maximum borrowing eligibility online.',
    buttonText: 'Calculate EMI Now',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    iconName: 'Calculator'
  }
];

export const ABOUT_STATS = [
  { prefix: '₹', numericValue: 750, suffix: '+ Cr', value: '₹750+ Cr', label: 'Loans & Property Facilitated' },
  { prefix: '', numericValue: 18000, suffix: '+', value: '18,000+', label: 'Satisfied Borrowers & Property Buyers' },
  { prefix: '', numericValue: 40, suffix: '+', value: '40+', label: 'Empaneled Banks & NBFC Partners' },
  { prefix: '', numericValue: 99.4, suffix: '%', value: '99.4%', label: 'Sanction & Delivery Success Rate' }
];

export const WHY_CHOOSE_US = [
  {
    title: '3-in-1 Integrated Platform',
    description: 'Find verified real estate properties, secure instant bank loans up to 90%, and protect assets with insurance under one single roof.',
    iconName: 'Sparkles'
  },
  {
    title: 'Unbiased Multi-Bank Options (40+ Banks)',
    description: 'We compare offers across 40+ leading financial institutions to secure the lowest rates and highest loan amounts for you.',
    iconName: 'Scale'
  },
  {
    title: '100% Legal & RERA Vetted Projects',
    description: 'Every property listed or financed undergoes rigorous title vetting, municipal approval checks, and legal clearance.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Dedicated Financial Facilitator',
    description: 'Your assigned specialist led by Saikiran.V manages every document, site visit, and bank coordination with zero hassle.',
    iconName: 'UserCheck'
  }
];

export const PRIVACY_POLICY_SECTIONS = [
  {
    title: '1. Introduction',
    content: 'Prime Funds Solutions Pvt. Ltd. ("we", "our", or "us") respects your personal privacy. This Privacy Policy outlines how we collect, store, utilize, and protect your information when you interact with our website or utilize our loans and insurance facilitation advisory services in India.'
  },
  {
    title: '2. Information We Collect',
    content: 'We collect personal identification details such as your full name, mobile phone number, email address, residential address, employment information, estimated monthly income, and specific loan or insurance preferences submitted voluntarily through our inquiry forms or customer communication channels.'
  },
  {
    title: '3. How We Use Your Information',
    content: 'Your information is used strictly to evaluate your borrowing eligibility, calculate accurate repayment quotes, connect you with suitable banking institutions or insurance providers, communicate updates regarding your application status, and deliver professional financial advisory support.'
  },
  {
    title: '4. Data Sharing & Third-Party Lenders',
    content: 'We share your submitted financial profile exclusively with authorized partner banks, RBI-registered Non-Banking Financial Companies (NBFCs), and IRDAI-licensed insurance companies for the sole purpose of processing your loan or insurance application. We never sell, rent, or trade your personal data to external telemarketing firms.'
  },
  {
    title: '5. Data Security Measures',
    content: 'We implement industry-standard technical safeguards, encrypted communication channels, and strict internal administrative protocols to prevent unauthorized access, alteration, disclosure, or accidental destruction of your confidential information.'
  },
  {
    title: '6. Your Rights & Preferences',
    content: 'You retain the right to review, update, or request the deletion of your personal contact records stored with us at any time. You may also opt out of promotional communications by notifying our compliance officer.'
  },
  {
    title: '7. Cookies & Tracking Technologies',
    content: 'Our website uses standard essential cookies and analytics tools to enhance site navigation, monitor page responsiveness, and optimize user experience. You can manage your cookie preferences through your individual browser settings.'
  },
  {
    title: '8. External Third-Party Links',
    content: 'Our website may contain references or hyperlinks to official partner bank portals and government insurance registries. We encourage you to review their independent privacy terms, as we do not control third-party digital properties.'
  },
  {
    title: '9. Updates to this Policy',
    content: 'We periodically update this Privacy Policy to reflect modifications in Indian regulatory guidelines or our internal facilitation practices. Continued use of our website indicates acceptance of the revised privacy framework.'
  },
  {
    title: '10. Contact for Privacy Inquiries',
    content: 'If you have any questions, grievances, or requests regarding your personal data handling, please contact our Data Representative Saikiran.V at +91 9177886354 or via email at primefundssolutions@gmail.com.'
  }
];

export const TERMS_CONDITIONS_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing, browsing, or utilizing the web platform of Prime Funds Solutions Pvt. Ltd., you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions and our Privacy Policy.'
  },
  {
    title: '2. Nature of Advisory Service',
    content: 'Prime Funds Solutions Pvt. Ltd. operates strictly as an independent facilitation and advisory consultant connecting customers with third-party lenders and insurers. We are not a direct bank, NBFC, deposit-taking institution, or underwriting insurer.'
  },
  {
    title: '3. User Responsibilities & Accuracy',
    content: 'You agree to provide true, accurate, current, and complete details regarding your identity, employment status, credit profile, and financial records when submitting inquiries or loan applications through our team.'
  },
  {
    title: '4. No Guarantee of Final Approval',
    content: 'All loan approvals, sanction limits, interest rates, tenure allowances, and insurance policy issuances are determined solely at the independent discretion of the respective partner banks, NBFCs, and insurance underwriters based on their underwriting criteria.'
  },
  {
    title: '5. Fee Disclosures & Transparency',
    content: 'Prime Funds Solutions Pvt. Ltd. clearly discloses all relevant consultation arrangements. Standard processing fees, documentation charges, and statutory stamp duties charged by partner lending institutions are payable directly to the respective institutions.'
  },
  {
    title: '6. Intellectual Property Rights',
    content: 'All brand names, trademarks, logos, texts, graphics, user interface designs, and proprietary calculators hosted on this website are the intellectual property of Prime Funds Solutions Pvt. Ltd. and are protected under Indian intellectual property laws.'
  },
  {
    title: '7. Limitation of Liability',
    content: 'Prime Funds Solutions Pvt. Ltd. shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from loan rejections by partner banks, processing delays, or changes in lending policies made by third-party financial institutions.'
  },
  {
    title: '8. Governing Law & Jurisdiction',
    content: 'These terms and conditions are governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.'
  },
  {
    title: '9. Amendments to Terms',
    content: 'We reserve the right to revise or update these terms at our discretion without prior notice. Your continued utilization of our services after such modifications constitutes your express agreement to the updated terms.'
  },
  {
    title: '10. Contact for Legal Grievances',
    content: 'For questions, official notices, or legal inquiries concerning these Terms and Conditions, please contact our corporate liaison Saikiran.V at +91 9177886354 or via email at primefundssolutions@gmail.com.'
  }
];

export const DEFAULT_FEE_SETTINGS = {
  professionalFee: 199,
  professionalFeeLabel: 'Professional Fee',
  processingFee: 0,
  processingFeeLabel: 'Processing Fee',
  processingFeeType: 'free' as const,
  processingFeeCustomText: 'FREE',
  currencySymbol: '₹',
  isEnabled: true,
  buttonText: 'Secure Payment & Send Inquiry',
  note: 'Zero advance charges. 100% transparent consultation.'
};

export const DEFAULT_ABOUT_CONTENT: AboutPageData = {
  hero: {
    badge: 'About Prime Funds Solutions',
    animatingPhrases: [
      "India’s Integrated Real Estate & Financial Facilitator",
      "Dedicated Advisory Led by Saikiran.V & Team",
      "Empowering 18,000+ Borrowers & Property Buyers"
    ],
    description: 'Prime Funds Solutions Pvt. Ltd. is a premier Indian financial & real estate consultancy dedicated to simplifying property acquisition, retail and commercial loans, and comprehensive asset insurance. We guide clients through every stage—from handpicking vetted properties to securing bank loan sanctions across 40+ leading institutions and shielding assets with robust coverage.'
  },
  coreCapabilities: {
    badge: 'Core Capabilities',
    heading: 'Our 3-in-1 Integrated Service Ecosystem',
    subtitle: 'Eliminate coordination friction. We unite property discovery, bank loan approvals, and asset protection under a single trusted advisory.',
    pillars: [
      {
        id: 'cap-realestate',
        iconName: 'Building2',
        title: '1. Real Estate & Properties',
        description: 'Curated inventory of verified open plots, independent houses, G+1 duplex homes, and apartment flats with up to 90% pre-approved bank loans and 0% buyer brokerage.',
        bulletPoints: [
          '100% Verified Titles & RERA Compliance',
          'Direct Builder Rates with Zero Markups'
        ],
        buttonText: 'Browse Properties',
        buttonTarget: 'realestate'
      },
      {
        id: 'cap-loans',
        iconName: 'Landmark',
        title: '2. Loan Financing (40+ Banks)',
        description: 'Personal, home, mortgage, business, and vehicle credit from premier institutions (HDFC, SBI, ICICI, Axis, Kotak) with up to 90% funding and lowest interest rates.',
        bulletPoints: [
          'Instant Sanction in 24 to 48 Hours',
          'Single-Window Doorstep Documentation'
        ],
        buttonText: 'Explore Loan Schemes',
        buttonTarget: 'services'
      },
      {
        id: 'cap-insurances',
        iconName: 'ShieldCheck',
        title: '3. Insurance Protection',
        description: 'Protecting structural assets, commercial spaces, vehicles, health, and family financial security with term life plans and mortgage loan coverage shields.',
        bulletPoints: [
          'Property Structure & Fire Perils Cover',
          '100% Cashless Medical & Motor Claims'
        ],
        buttonText: 'View Insurance Plans',
        buttonTarget: 'insurances'
      }
    ]
  },
  missionVision: {
    missionTitle: 'Our Mission',
    missionDescription: 'To democratize access to transparent credit and verified real estate across India by offering personalized loan comparisons, legal property vetting, and expert advisory that saves our clients time and capital.',
    missionTagline: 'Client-Centric • Fast-Track Approvals • Complete Integrity',
    visionTitle: 'Our Vision',
    visionDescription: 'To become the most trusted national household name for integrated real estate, loans, and insurance facilitation, renowned for unparalleled lending partnerships and superior advisory satisfaction.',
    visionTagline: 'Pan-India Reach • 40+ Bank Network • Seamless Digital Journey'
  },
  distinctAdvantage: {
    badge: 'Our Distinct Advantage',
    heading: 'Why Work With Prime Funds Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    imageBadge: 'Dedicated Leadership',
    imageCaption: 'Personalized guidance led by Saikiran.V and our team of senior finance & real estate specialists.'
  },
  trackRecord: {
    heading: 'Proven Track Record of Facilitation',
    subtitle: 'Our financial and property metrics reflect consistent trust, rapid disbursements, and client satisfaction.',
    ctaHeading: 'Ready to explore properties or loan solutions?',
    ctaSubtitle: 'Contact our senior facilitator Saikiran.V directly or submit a quick application.',
    ctaButtonText: 'WhatsApp Advisory'
  }
};

