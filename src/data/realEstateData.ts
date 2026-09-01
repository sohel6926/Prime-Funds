import { PropertyItem, PropertyCategory } from '../types';

export const PROPERTY_LISTINGS: PropertyItem[] = [
  // ==========================================
  // 1. OPEN PLOTS
  // ==========================================
  {
    id: 'hmda-prime-villa-plots',
    title: 'HMDA & RERA Approved Open Villa Plots',
    propertyType: 'Open Plots',
    subType: 'Gated Township Plots',
    location: 'Mokila - Shankarpally Highway Corridor',
    city: 'Hyderabad',
    price: '₹35 Lakhs onwards',
    numericPrice: 3500000,
    pricePerSqFt: '₹22,500 / Sq.Yd',
    area: '150 to 400 Sq.Yards',
    bhkOrSpecs: '100% Vastu Clear Title Plots',
    status: 'Clear Title Plots',
    reraId: 'P02400003112',
    possessionDate: 'Ready for Spot Registration',
    tagline: 'Bank Approved Layout with 40-Ft BT Roads & Immediate Registration',
    description: 'High-appreciation gated layout with underground electricity, avenue plantations, and 24/7 security. Ideal for building your dream independent home or high-return investment.',
    catchyHook: 'Clear 30-Yr Legal Title • Spot Registration • 75% Bank Loan Available',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'HMDA & TS-RERA Approved Layout',
      '40-Ft & 33-Ft Wide Bitumen Roads with LED Lighting',
      'Underground Drainage, Water Pipeline & Electricity',
      'Bank Loan Approved by SBI, HDFC & ICICI',
      'Free Cab Facility Available for Site Visits'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Plot Purchase + Construction Loan',
        interestRate: 'From 8.40% p.a.',
        maxFunding: 'Up to 75% for Plot + 85% for Building',
        maxTenure: 'Up to 25 Years',
        estimatedEmi: '₹22,800 / mo approx.',
        partnerBanks: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'LIC HFL'],
        specialBenefit: 'Zero processing fee & doorstep documentation'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Title & Boundary Security Shield',
        coverageHighlight: 'Protection for registered plot boundary and title legal indemnification',
        premiumEstimate: 'Starting ₹1,999 / year',
        keyCoverages: ['Title Defense Legal Cover', 'Boundary Wall Storm Protection']
      }
    ],
    whatsappMessage: "Hi Saikiran, I'm interested in the HMDA Open Villa Plots. Please send me the layout plan, pricing sheet, and available plot numbers.",
    featured: true
  },
  {
    id: 'dtcp-highway-growth-plots',
    title: 'DTCP Approved Highway Investment Plots',
    propertyType: 'Open Plots',
    subType: 'Residential Highway Plots',
    location: 'Bangalore NH-44 / Shadnagar Growth Corridor',
    city: 'Hyderabad Outskirts',
    price: '₹18.5 Lakhs onwards',
    numericPrice: 1850000,
    pricePerSqFt: '₹12,500 / Sq.Yd',
    area: '150 to 300 Sq.Yards',
    bhkOrSpecs: 'East & North Facing Available',
    status: 'Clear Title Plots',
    possessionDate: 'Instant Registration',
    tagline: 'Adjacent to Regional Ring Road (RRR) with 3X Growth Potential',
    description: 'Affordable residential plots with clear link documents, compound wall, water connections, and rapid connectivity to international airport.',
    catchyHook: 'Pocket-Friendly Entry • Fast Appreciation • Up to 70% Bank Loan',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'DTCP Approved & 100% Vastu Compliant',
      'Near Symbiosis University & Amazon Hub',
      'Direct Spot Registration with Encumbrance Certificate',
      'Flexible Easy Installment & Bank Loan Options'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Affordable Land Investment Loan',
        interestRate: 'From 8.65% p.a.',
        maxFunding: 'Up to 70% of Plot Cost',
        maxTenure: 'Up to 20 Years',
        estimatedEmi: '₹12,500 / mo approx.',
        partnerBanks: ['Union Bank', 'Canara Bank', 'HDFC Bank', 'SBI'],
        specialBenefit: 'Simplified KYC with fast-track approval'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Plot Asset Protection',
        coverageHighlight: 'Covers boundary fencing and legal defense against encroachments',
        premiumEstimate: 'Starting ₹1,499 / year',
        keyCoverages: ['Boundary Shield', 'Legal Assistance']
      }
    ],
    whatsappMessage: "Hi Saikiran, I want more details on the DTCP Highway Plots. Please share location map and price details.",
    featured: false
  },

  // ==========================================
  // 2. INDEPENDENT HOUSES
  // ==========================================
  {
    id: 'luxury-independent-house-villa',
    title: 'Brand New Independent Luxury Villa House',
    propertyType: 'Independent Houses',
    subType: 'Standalone Independent Villa',
    location: 'Beeramguda - Chandanagar Extension',
    city: 'Hyderabad',
    price: '₹88 Lakhs onwards',
    numericPrice: 8800000,
    area: '160 Sq.Yds (1,850 sq.ft Built-up)',
    bhkOrSpecs: '3 BHK Individual Standalone Home',
    status: 'Newly Constructed',
    possessionDate: 'Ready to Move / Immediate Handover',
    tagline: 'Private Land Ownership with Zero Maintenance Burden',
    description: 'Spacious independent home designed with contemporary elevation, dedicated car parking port, private terrace, and 100% privacy without common wall sharing.',
    catchyHook: 'No Shared Walls • Private Land & Roof • 85% Loan Approved',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '100% Individual Land Ownership with Clear Municipal Title',
      'Spacious Hall, Modular Kitchen & 3 Master Bedrooms',
      'Dedicated Car Porch + Borewell & Manjeera Water',
      'Pre-sanctioned Home Loan from 8.35% across 40+ Banks'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Prime Home Loan for Independent House',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 85% - 90% of Valuation',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹58,900 / mo approx.',
        partnerBanks: ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'],
        specialBenefit: 'Special interest rebate for salaried & self-employed applicants'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Comprehensive House Structure Insurance',
        coverageHighlight: 'Protection up to ₹1.2 Crore for complete building structure and interior fixtures',
        premiumEstimate: 'Starting ₹2,800 / year',
        keyCoverages: ['Fire, Flood & Earthquake', 'Electrical Short Circuit', 'Burglary & Fixture Loss']
      }
    ],
    whatsappMessage: "Hi Saikiran, I am interested in the Brand New Independent House in Beeramguda. Please share house floor plan, actual photos, and exact location.",
    featured: true
  },
  {
    id: 'serene-independent-bungalow',
    title: 'Custom-Built Premium Independent House',
    propertyType: 'Independent Houses',
    subType: 'Custom Single-Floor Bungalow',
    location: 'Patancheru / Kollur Growth Zone',
    city: 'Hyderabad',
    price: '₹75 Lakhs onwards',
    numericPrice: 7500000,
    area: '150 Sq.Yds (1,450 sq.ft Built-up)',
    bhkOrSpecs: '2 & 3 BHK Vastu Compliant',
    status: 'Ready to Move',
    possessionDate: 'Ready for Registration',
    tagline: 'Peaceful Residential Enclave with Excellent ORR Connectivity',
    description: 'Beautifully finished independent house with high ceilings, marble finish flooring, water storage sump, and spacious portico in a fast-growing residential neighborhood.',
    catchyHook: 'Peaceful Living • Independent Privacy • Ready for Immediate Housewarming',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'GHMC / Municipal Approved with Occupancy Certificate',
      'Near Top International Schools & ORR Exit',
      'Ready for Grihapravesham (Housewarming)',
      'Direct Deal — 0% Brokerage Assistance'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Ready Independent House Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 90% Funding',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹51,500 / mo approx.',
        partnerBanks: ['SBI', 'HDFC', 'Canara Bank', 'Kotak Mahindra'],
        specialBenefit: 'Instant loan sanction with minimal documentation'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Independent Home Shield',
        coverageHighlight: 'Complete structural damage & natural peril coverage',
        premiumEstimate: 'Starting ₹2,400 / year',
        keyCoverages: ['Natural Disasters', 'Fire & Perils Cover']
      }
    ],
    whatsappMessage: "Hi Saikiran, please share floor plans and price details for the Custom Independent House in Kollur zone.",
    featured: false
  },

  // ==========================================
  // 3. G+1 HOUSES (GROUND + FIRST FLOOR)
  // ==========================================
  {
    id: 'duplex-g1-contemporary-house',
    title: 'Modern G+1 Duplex Independent House',
    propertyType: 'G+1 Houses',
    subType: 'G+1 Duplex / Dual Living House',
    location: 'Nizampet - Pragathi Nagar Corridor',
    city: 'Hyderabad',
    price: '₹1.15 Cr - ₹1.45 Cr',
    numericPrice: 11500000,
    area: '180 Sq.Yds (2,600 sq.ft Built-up)',
    bhkOrSpecs: '4 BHK Duplex (Ground + 1st Floor)',
    status: 'Newly Constructed',
    possessionDate: 'Ready to Move',
    tagline: 'Spacious 4 BHK Living with Dual Floor Privacy & Covered Parking',
    description: 'Premium G+1 architecture featuring Ground Floor (Hall, Kitchen, Bedroom) + 1st Floor (Family Lounge, 3 Bedrooms, Balcony) with internal staircase and private terrace.',
    catchyHook: 'Why Pay Rent? Own a Grand G+1 Duplex • Rental Yield Potential',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'G+1 Approved Structure with Solid RCC Foundation',
      'Internal & External Staircase Flexibility',
      'Double Income Option: Live in Ground, Rent 1st Floor (₹25k/mo)',
      'Bank Pre-Approved for 85% Sanction within 48 Hours'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'G+1 Construction & Purchase Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 85% Total Agreement Value',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹78,000 / mo approx.',
        partnerBanks: ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'],
        specialBenefit: 'Rental income can be factored in for higher loan eligibility'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'G+1 Multi-Story Structural Shield',
        coverageHighlight: 'Protection up to ₹1.8 Crore covering ground & first floor structures plus fixtures',
        premiumEstimate: 'Starting ₹3,600 / year',
        keyCoverages: ['Multi-Level Structural Shell', 'Fire & Explosion', 'Burglary & Fixture Theft']
      }
    ],
    whatsappMessage: "Hi Saikiran, I want details about the G+1 Duplex House in Nizampet. Please share floor plans, video walkthrough, and loan options.",
    featured: true
  },
  {
    id: 'g1-independent-house-rental-asset',
    title: 'G+1 Dual-Portion Independent House',
    propertyType: 'G+1 Houses',
    subType: 'G+1 Dual Portion House',
    location: 'Bandlaguda Jagir / Sun City Extension',
    city: 'Hyderabad',
    price: '₹1.20 Cr onwards',
    numericPrice: 12000000,
    area: '165 Sq.Yds (2,400 sq.ft Built-up)',
    bhkOrSpecs: '2 BHK in Ground + 2 BHK in 1st Floor',
    status: 'Ready to Move',
    possessionDate: 'Ready for Immediate Possession',
    tagline: 'Ideal for Joint Families or Steady Passive Rental Income',
    description: 'Cleverly planned G+1 house with two independent 2BHK portions with separate electricity meters, water storage, and covered car parking.',
    catchyHook: 'Dual Portions • 2 Independent Families or High Rental Return • 100% Vastu',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Two Separate 2BHK Units with Individual Entries',
      'Generating ₹30,000+ Monthly Rental Potential',
      '100% Clear Title with Encumbrance Certificate',
      'Up to 85% Bank Loan Assistance'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Dual Portion House Home Loan',
        interestRate: 'From 8.40% p.a.',
        maxFunding: 'Up to 85% of Valuation',
        maxTenure: 'Up to 25 Years',
        estimatedEmi: '₹82,500 / mo approx.',
        partnerBanks: ['SBI', 'HDFC Bank', 'Canara Bank', 'Bank of Baroda'],
        specialBenefit: 'Offset your EMI with the 1st floor tenant rental income'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Landlord & Structure Protection Plan',
        coverageHighlight: 'Protection for landlord structure and rental loss indemnity',
        premiumEstimate: 'Starting ₹3,200 / year',
        keyCoverages: ['Building Shell', 'Loss of Rent Cover']
      }
    ],
    whatsappMessage: "Hi Saikiran, please share details and site visit availability for the G+1 Dual Portion House in Bandlaguda.",
    featured: false
  },

  // ==========================================
  // 4. APARTMENT FLATS
  // ==========================================
  {
    id: 'luxury-gated-apartment-flat',
    title: 'Gated Community Luxury 2 & 3 BHK Flats',
    propertyType: 'Apartment Flats',
    subType: 'Gated Community High-Rise Flat',
    location: 'Kondapur / Financial District Corridor',
    city: 'Hyderabad',
    price: '₹68 Lakhs - ₹1.25 Cr',
    numericPrice: 6800000,
    pricePerSqFt: '₹5,800 / sq.ft',
    area: '1,250 to 1,950 sq.ft',
    bhkOrSpecs: '2 & 3 BHK Luxury Units',
    status: 'Ready to Move',
    reraId: 'P02400004521',
    possessionDate: 'Ready for Immediate Occupation',
    tagline: 'Resort-Style Living with 25,000 Sq.Ft Clubhouse & Rooftop Pool',
    description: 'Exquisite 2 & 3 BHK flats in a high-rise gated community with clubhouse, gym, power backup, children play area, and unmatched connectivity to IT hubs.',
    catchyHook: 'Prime Location • 90% Loan Available • Zero Brokerage Direct Deal',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'GHMC & HMDA Approved with Occupancy Certificate (OC)',
      '100% Power Backup, 2 Covered Parkings & Biometric Security',
      'Clubhouse with Swimming Pool, Badminton Court & Gym',
      'Pre-Approved for 90% Bank Loan from 8.35%'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Prime Apartment Flat Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 90% of Agreement Value',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹46,500 / mo (for ₹60L Loan @ 8.35% for 25 yrs)',
        partnerBanks: ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak'],
        specialBenefit: 'Zero processing fee for pre-approved builder inventory'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Apartment Structure & Interior Shield',
        coverageHighlight: 'Protection up to ₹1 Crore for apartment walls, false ceiling & home appliances',
        premiumEstimate: 'Starting ₹2,499 / year',
        keyCoverages: ['Fire & Short-Circuit', 'Earthquake & Flood', 'Burglary & Fixture Damage']
      },
      {
        insuranceId: 'term-life',
        insuranceName: 'Home Loan Protection Term Shield',
        coverageHighlight: 'Shields outstanding loan amount with zero debt passed to family',
        premiumEstimate: 'Starting ₹650 / month',
        keyCoverages: ['100% Loan Settlement', 'Critical Illness Waiver']
      }
    ],
    whatsappMessage: "Hi Saikiran, I want the brochure, floor plan, and price sheet for the 2 & 3 BHK Apartment Flats in Kondapur corridor.",
    featured: true
  },
  {
    id: 'budget-friendly-apartment-flats',
    title: 'Affordable Smart 2 & 3 BHK Apartment Flats',
    propertyType: 'Apartment Flats',
    subType: 'Stand-alone Gated Apartment Flat',
    location: 'Miyapur - Bachupally Corridor',
    city: 'Hyderabad',
    price: '₹48 Lakhs - ₹75 Lakhs',
    numericPrice: 4800000,
    pricePerSqFt: '₹4,600 / sq.ft',
    area: '1,050 to 1,450 sq.ft',
    bhkOrSpecs: '2 & 3 BHK Budget Homes',
    status: 'Ready to Move',
    possessionDate: 'Ready for Immediate Handover',
    tagline: 'Lowest EMI Starts at Just ₹32,000/mo with 90% Bank Loan',
    description: 'Well-ventilated East/West facing flats with lift, generator backup, water softener, and dedicated car parking. Close to Metro and shopping hubs.',
    catchyHook: 'Affordable Luxury • Low Monthly EMI • 90% Bank Loan • No Brokerage',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Near Miyapur Metro Station & Top Schools',
      'High Rental Yield & Low Maintenance Cost',
      'Pradhan Mantri Awas Yojana (PMAY) Subsidy Benefit Assistance',
      'Spot Loan Sanction & Immediate Registration'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Affordable Housing Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 90% of Total Cost',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹32,800 / mo approx.',
        partnerBanks: ['SBI', 'HDFC Bank', 'Canara Bank', 'Union Bank'],
        specialBenefit: 'PMAY subsidy guidance & fast-track clearance'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Budget Home Protection Plan',
        coverageHighlight: 'Protection for apartment structure and contents',
        premiumEstimate: 'Starting ₹1,800 / year',
        keyCoverages: ['Fire, Flood & Perils Cover']
      }
    ],
    whatsappMessage: "Hi Saikiran, please share brochure and loan details for Affordable Apartment Flats in Miyapur corridor.",
    featured: false
  }
];

export const REAL_ESTATE_CATEGORIES: { id: 'All' | PropertyCategory; label: string; icon: string; count: string; catchphrase: string }[] = [
  {
    id: 'All',
    label: 'All Properties',
    icon: 'Layers',
    count: 'Open Plots, Houses & Flats',
    catchphrase: 'Handpicked Deals with 90% Bank Loans'
  },
  {
    id: 'Open Plots',
    label: 'Open Plots',
    icon: 'LandPlot',
    count: 'HMDA & DTCP Approved',
    catchphrase: '100% Clear Titles • Spot Registration'
  },
  {
    id: 'Independent Houses',
    label: 'Independent Houses',
    icon: 'Home',
    count: 'Standalone Villas',
    catchphrase: 'Private Land & Roof • No Shared Walls'
  },
  {
    id: 'G+1 Houses',
    label: 'G+1 Houses',
    icon: 'Building2',
    count: 'Duplex & Dual Portions',
    catchphrase: 'Live in One • Rent Another • Dual Income'
  },
  {
    id: 'Apartment Flats',
    label: 'Apartment Flats',
    icon: 'Building',
    count: '2 & 3 BHK Gated Units',
    catchphrase: 'Resort Amenities • 90% Bank Loan'
  }
];

export const REAL_ESTATE_ADVANTAGES = [
  {
    title: '0% Buyer Brokerage',
    description: 'Direct builder pricing with zero middleman markup — what you see is what you pay.',
    iconName: 'IndianRupee'
  },
  {
    title: 'Up to 90% Bank Loan',
    description: 'Pre-approved sanction from 40+ top banks including SBI, HDFC, ICICI & Axis at lowest rates.',
    iconName: 'Landmark'
  },
  {
    title: '100% Legal Clear Titles',
    description: 'Every property is vetted by senior legal & banking experts. 30-year encumbrance-free guarantee.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Free Cab Site Visits',
    description: 'Schedule a private guided tour at your convenience — doorstep pickup & drop, on us.',
    iconName: 'Car'
  }
];

export const REAL_ESTATE_PROMISES = [
  {
    title: '0% Buyer Brokerage',
    phrase: 'Direct Builder Pricing',
    desc: 'You deal directly with genuine verified inventory with zero middleman markup.'
  },
  {
    title: '40+ Partner Banks',
    phrase: 'Up to 90% Sanctions',
    desc: 'Instant pre-approval with lowest interest rates from SBI, HDFC, ICICI, and Axis.'
  },
  {
    title: '100% Legal Clear Titles',
    phrase: '30-Year Encumbrance Free',
    desc: 'Every plot, house, and flat is vetted by our senior banking & legal experts.'
  },
  {
    title: 'Free Cab Site Visits',
    phrase: 'Doorstep Pickup & Drop',
    desc: 'Schedule a private guided tour with our property specialists at your convenience.'
  }
];
