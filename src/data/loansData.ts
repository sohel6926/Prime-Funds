import { ServiceItem } from '../types';

export const LOAN_SERVICES: ServiceItem[] = [
  {
    id: 'personal-loan',
    title: 'Personal Loans',
    category: 'Personal',
    tagline: 'Instant funds for your personal needs',
    description: 'Access flexible personal financing with minimal paperwork to meet your immediate personal goals.',
    interestRateText: 'From 10.25% p.a.',
    tenureText: 'Up to 5 Years',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    iconName: 'UserCheck',
    whatsappMessage: "Hi, I'm interested in a Personal Loan. Please share more details.",
    features: [
      'Quick approvals within 24 hours',
      'No collateral requirement needed',
      'Minimal documentation process'
    ]
  },
  {
    id: 'home-loan',
    title: 'Home Loans',
    category: 'Property',
    tagline: 'Build or purchase your dream house',
    description: 'Get your dream home at the lowest interest rates in the market with tailored repayment options.',
    interestRateText: 'From 8.35% p.a.',
    tenureText: 'Up to 30 Years',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    iconName: 'Home',
    whatsappMessage: "Hi, I'm interested in a Home Loan. Please share more details.",
    features: [
      'Maximum funding up to 90% property value',
      'PMAY subsidy benefits facilitation',
      'Zero prepayment penalty options'
    ]
  },
  {
    id: 'business-loan',
    title: 'Business Loans',
    category: 'Business',
    tagline: 'Fuel your enterprise expansion',
    description: 'Scale your business operations seamlessly with fast capital disbursements and competitive commercial terms.',
    interestRateText: 'From 11.50% p.a.',
    tenureText: 'Up to 7 Years',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    iconName: 'Briefcase',
    whatsappMessage: "Hi, I'm interested in a Business Loan. Please share more details.",
    features: [
      'Collateral-free working capital limits',
      'Flexible overdraft and term loan options',
      'Tailored for MSMEs and enterprises'
    ]
  },
  {
    id: 'mortgage-loan',
    title: 'Mortgage Loans',
    category: 'Property',
    tagline: 'Unlock liquidity from your real estate',
    description: 'Leverage the true market value of your property to secure substantial long-term funding.',
    interestRateText: 'From 8.90% p.a.',
    tenureText: 'Up to 20 Years',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    iconName: 'Building2',
    whatsappMessage: "Hi, I'm interested in a Mortgage Loan. Please share more details.",
    features: [
      'Residential and commercial properties accepted',
      'High sanction amounts with easy tenures',
      'Continuous property ownership retention'
    ]
  },
  {
    id: 'gold-loan',
    title: 'Gold Loans',
    category: 'Specialized',
    tagline: 'Instant cash against physical gold',
    description: 'Obtain immediate liquidity against your gold jewelry with secure vault storage and nominal interest.',
    interestRateText: 'From 8.50% p.a.',
    tenureText: 'Up to 3 Years',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    iconName: 'Coins',
    whatsappMessage: "Hi, I'd like to know more about Gold Loans.",
    features: [
      'Instant same-day evaluation & cash payout',
      'Triple-layer insured bank vault safety',
      'Flexible monthly or bullet repayment'
    ]
  },
  {
    id: 'vehicle-loan',
    title: 'Vehicle Loans',
    category: 'Personal',
    tagline: 'Drive your preferred car or two-wheeler',
    description: 'Drive home your preferred four-wheeler or commercial vehicle with our affordable financing packages.',
    interestRateText: 'From 8.75% p.a.',
    tenureText: 'Up to 7 Years',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    iconName: 'Car',
    whatsappMessage: "Hi, I'm interested in a Vehicle Loan. Please share more details.",
    features: [
      'Up to 100% on-road price funding',
      'New and certified pre-owned vehicles',
      'Instant spot approvals with minimal KYC'
    ]
  },
  {
    id: 'educational-loan',
    title: 'Educational Loans',
    category: 'Personal',
    tagline: 'Empower global higher education',
    description: 'Fund premier higher studies in India or abroad with student-friendly moratorium and tax benefits.',
    interestRateText: 'From 9.15% p.a.',
    tenureText: 'Up to 15 Years',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    iconName: 'GraduationCap',
    whatsappMessage: "Hi, I'm interested in an Educational Loan. Please share more details.",
    features: [
      'Covers tuition fees, living costs, and travel',
      'Moratorium period during entire course duration',
      'Tax deductions available under Section 80E'
    ]
  },
  {
    id: 'agriculture-loan',
    title: 'Agriculture Loans',
    category: 'Specialized',
    tagline: 'Nurture crops and farm infrastructure',
    description: 'Support agricultural activities and modern farming machinery with low-rate government-subsidized credit.',
    interestRateText: 'From 7.00% p.a.',
    tenureText: 'Up to 7 Years',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sprout',
    whatsappMessage: "Hi, I'm interested in an Agriculture Loan. Please share more details.",
    features: [
      'Kisan Credit Card (KCC) limit setup',
      'Farm mechanization and solar pump funding',
      'Flexible harvest-linked repayment cycles'
    ]
  },
  {
    id: 'secured-unsecured',
    title: 'Secured & Unsecured Loans',
    category: 'Specialized',
    tagline: 'Custom collateral and clean credit solutions',
    description: 'Choose between collateral-backed credit lines or fast uncollateralized capital suited to your profile.',
    interestRateText: 'From 9.50% p.a.',
    tenureText: 'Up to 10 Years',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldCheck',
    whatsappMessage: "Hi, I'm interested in Secured and Unsecured Loans. Please share more details.",
    features: [
      'Tailored options for varied CIBIL scores',
      'Secured options with higher ticket sizes',
      'Unsecured options with zero asset pledges'
    ]
  },
  {
    id: 'micro-finance',
    title: 'Micro Finance',
    category: 'Business',
    tagline: 'Empowering grassroot entrepreneurs',
    description: 'Empower small traders and local entrepreneurs with accessible micro-credits and simplified validation.',
    interestRateText: 'From 12.00% p.a.',
    tenureText: 'Up to 3 Years',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Users',
    whatsappMessage: "Hi, I'm interested in Micro Finance solutions. Please share more details.",
    features: [
      'Group lending and individual micro-credits',
      'Weekly or monthly doorstep collections',
      'Zero complex financial statement requirements'
    ]
  },
  {
    id: 'balance-transfer-lap',
    title: 'Balance Transfer & LAP',
    category: 'Property',
    tagline: 'Reduce high interest and gain top-up cash',
    description: 'Transfer existing costly loans to reduce monthly EMIs and unlock additional top-up cash reserves.',
    interestRateText: 'From 8.40% p.a.',
    tenureText: 'Up to 20 Years',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    iconName: 'ArrowLeftRight',
    whatsappMessage: "Hi, I'm interested in Balance Transfer and LAP. Please share more details.",
    features: [
      'Significant interest rate reduction',
      'Substantial top-up loan availability',
      'End-to-end documentation transfer support'
    ]
  }
];
