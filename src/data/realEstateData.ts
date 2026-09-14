import { PropertyItem, PropertyCategory, PropertyClass } from '../types';

export const TARGET_LOCATIONS = [
  'Karimnagar',
  'Mancherial',
  'Peddapalli',
  'Siricilla',
  'Siddipet',
  'Hanamkonda'
] as const;

export type TargetLocation = typeof TARGET_LOCATIONS[number];

export const PROPERTY_LISTINGS: PropertyItem[] = [
  // =========================================================================
  // 1. KARIMNAGAR LISTINGS
  // =========================================================================
  {
    id: 'kuda-luxury-villa-plots-karimnagar',
    title: 'KUDA Approved Premium Residential Villa Plots',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Gated Villa Layout',
    location: 'Collectorate Road / Rekurthi Corridor',
    city: 'Karimnagar',
    price: '₹28 Lakhs onwards',
    numericPrice: 2800000,
    pricePerSqFt: '₹14,000 / Sq.Yd',
    area: '200 Sq.Yards',
    numericArea: 200,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '100% Vastu Clear Title Plots',
    status: 'Clear Title Plots',
    reraId: 'P02400009821',
    possessionDate: 'Ready for Spot Registration',
    tagline: 'Gated Township Layout with 40-Ft CC Roads, Avenue Trees & 24/7 Security',
    description: 'High-appreciation gated layout with underground electricity, avenue plantations, children play area, and rapid connectivity to Karimnagar Smart City center.',
    catchyHook: 'Clear 30-Yr Legal Title • Spot Registration • 75% Bank Loan Available',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'KUDA & TS-RERA Approved Layout',
      '40-Ft & 33-Ft Wide Bitumen Roads with LED Lighting',
      'Underground Drainage, Water Pipeline & Electricity',
      'Bank Loan Approved by SBI, HDFC & Canara Bank',
      'Free Cab Facility Available for Site Visits'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Plot Purchase + Construction Loan',
        interestRate: 'From 8.40% p.a.',
        maxFunding: 'Up to 75% for Plot + 85% for Building',
        maxTenure: 'Up to 25 Years',
        estimatedEmi: '₹18,500 / mo approx.',
        partnerBanks: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Canara Bank'],
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
    whatsappMessage: "Hi Prime Funds, I'm interested in the KUDA Approved Villa Plots in Karimnagar. Please send me the layout plan and pricing details.",
    featured: true
  },
  {
    id: 'independent-house-mankammathota-karimnagar',
    title: 'Brand New 3 BHK Luxury Independent House',
    propertyClass: 'Residential',
    propertyType: 'Independent Houses',
    subType: 'Standalone Modern Bungalow',
    location: 'Mankammathota / Padmanagar',
    city: 'Karimnagar',
    price: '₹95 Lakhs',
    numericPrice: 9500000,
    area: '180 Sq.Yards (2,100 sq.ft Built-up)',
    numericArea: 180,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '3 BHK Individual Standalone Home',
    status: 'Newly Constructed',
    possessionDate: 'Ready to Move / Immediate Handover',
    tagline: 'Private Land Ownership with Modern Elevation & 100% Privacy',
    description: 'Spacious independent home designed with contemporary elevation, dedicated car parking, pooja room, modular kitchen, and private terrace in prime Karimnagar residential hub.',
    catchyHook: 'No Shared Walls • Private Land & Roof • 85% Loan Approved',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '100% Individual Land Ownership with Clear Municipal Title',
      'Spacious Living Hall, Modular Kitchen & 3 Master Bedrooms',
      'Dedicated Car Porch + Borewell & Municipal Water Sump',
      'Pre-sanctioned Home Loan from 8.35% across 40+ Banks'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Prime Home Loan for Independent House',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 85% - 90% of Valuation',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹63,500 / mo approx.',
        partnerBanks: ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'],
        specialBenefit: 'Special interest rebate for salaried & business applicants'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Comprehensive House Structure Insurance',
        coverageHighlight: 'Protection up to ₹1.5 Crore for complete building structure and interior fixtures',
        premiumEstimate: 'Starting ₹2,800 / year',
        keyCoverages: ['Fire, Flood & Earthquake', 'Electrical Short Circuit', 'Burglary & Fixture Loss']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I am interested in the 3 BHK Independent House in Karimnagar. Please share house floor plan and photos.",
    featured: true
  },
  {
    id: 'commercial-complex-karimnagar-main-road',
    title: 'High-Yield Commercial Complex & Showroom Space',
    propertyClass: 'Commercial',
    propertyType: 'Commercial',
    subType: 'Commercial Complex / Showroom',
    location: 'Hyderabad Road / Collectorate Junction',
    city: 'Karimnagar',
    price: '₹2.40 Cr',
    numericPrice: 24000000,
    pricePerSqFt: '₹6,000 / sq.ft',
    area: '450 Sq.Yards (4,000 sq.ft Built-up)',
    numericArea: 450,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: 'G+2 Commercial Building (High Rental Yield)',
    status: 'Ready to Move',
    possessionDate: 'Ready for Immediate Occupation / Leasing',
    tagline: 'Main Road Frontage with ₹1.25 Lakh/month Pre-Leased Potential',
    description: 'High-visibility prime commercial building ideal for banks, retail brands, clinics, or diagnostic centers. Ample customer parking with 60-ft wide road frontage.',
    catchyHook: 'Prime Main Road Asset • High Rental Yield • 75% Commercial Loan',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'KUDA Commercial Approved Structure',
      '60-Ft Main Road Facing with Excellent Visibility',
      '100% Power Backup & Dedicated Lift Provision',
      'Eligible for Lease Rental Discounting (LRD) Loan'
    ],
    eligibleLoans: [
      {
        loanId: 'commercial-loan',
        loanName: 'Commercial Property Purchase & LRD Loan',
        interestRate: 'From 8.90% p.a.',
        maxFunding: 'Up to 75% of Purchase Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹1,95,000 / mo approx.',
        partnerBanks: ['SBI Commercial', 'HDFC Bank', 'Axis Bank', 'Bank of Baroda'],
        specialBenefit: 'Rental cashflow can directly cover your EMI'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'commercial-insurance',
        insuranceName: 'Commercial Property & Asset All-Risk Shield',
        coverageHighlight: 'Protection up to ₹3 Crore for commercial structure, tenant damage and loss of rent',
        premiumEstimate: 'Starting ₹6,500 / year',
        keyCoverages: ['Commercial Fire & Explosion', 'Loss of Rent Cover', 'Public Liability']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want more details on the Commercial Building in Karimnagar Hyderabad Road.",
    featured: true
  },
  {
    id: 'agriculture-fertile-land-karimnagar-suburbs',
    title: 'Fertile Red Soil Agricultural Land with Borewell',
    propertyClass: 'Agriculture',
    propertyType: 'Agriculture',
    subType: 'Agricultural Land / Farm Plots',
    location: 'Lower Manair Dam (LMD) Agro Corridor',
    city: 'Karimnagar',
    price: '₹1.10 Cr (for 4 Acres)',
    numericPrice: 11000000,
    area: '4 Acres',
    numericArea: 4,
    areaUnit: 'acres',
    bhkOrSpecs: '2 Functional High-Yield Borewells + Electricity',
    status: 'Clear Title Farmland',
    possessionDate: 'Instant Passbook & Dharani Registration',
    tagline: 'Fertile Soil with Abundant Water Source & 30-Ft Blacktop Approach Road',
    description: 'Prime agricultural land ideal for paddy, horticulture, poultry, or weekend farmhouse retreat. Clear Dharani mutation records with zero encumbrance.',
    catchyHook: 'Dharani Clear Title • 24/7 Free Agro Power • Ready for Farming or Farmhouse',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '100% Clear Dharani Record with Rythu Bandhu Eligibility',
      'Sweet Water Borewells with Continuous Submersible Motors',
      'Fenced Boundary with All-Weather Bitumen Road Access',
      'Agro & Farmhouse Land Loan Assistance'
    ],
    eligibleLoans: [
      {
        loanId: 'agri-loan',
        loanName: 'Agricultural Land & Farm Development Loan',
        interestRate: 'From 7.95% p.a.',
        maxFunding: 'Up to 70% Land Cost',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹75,000 / mo approx.',
        partnerBanks: ['SBI Agri Business', 'Canara Bank', 'Union Bank of India'],
        specialBenefit: 'Subsidized agro lending interest rates'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'crop-insurance',
        insuranceName: 'Agro Land & Boundary Shield',
        coverageHighlight: 'Protection for farm assets, borewell equipment and boundary fences',
        premiumEstimate: 'Starting ₹1,800 / year',
        keyCoverages: ['Equipment Storm Damage', 'Boundary Protection']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please share details for the 4-Acre Agricultural Land in Karimnagar LMD belt.",
    featured: false
  },

  // =========================================================================
  // 2. MANCHERIAL LISTINGS
  // =========================================================================
  {
    id: 'mancherial-highway-residential-plots',
    title: 'DTCP Approved Residential Plots on NH-363',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Residential Layout Plots',
    location: 'Bellampalli Road / NH-363 Growth Hub',
    city: 'Mancherial',
    price: '₹18 Lakhs onwards',
    numericPrice: 1800000,
    pricePerSqFt: '₹12,000 / Sq.Yd',
    area: '150 Sq.Yards',
    numericArea: 150,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: 'East & North Facing Clear Plots',
    status: 'Clear Title Plots',
    possessionDate: 'Immediate Registration',
    tagline: 'High Growth Corridor Adjacent to New Mancherial Commercial Hub',
    description: 'Well-developed residential plots with water connection, underground drainage, wide BT roads, and proximity to schools and railway junction.',
    catchyHook: 'Budget Entry • 75% Bank Loan • High Capital Appreciation',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'DTCP Layout with Municipal Water & Electricity',
      '33-Ft Wide Internal Roads with Avenue Trees',
      'Close to Mancherial Railway Station & Medical College',
      'Bank Pre-Approved for Spot Sanction'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Plot Purchase & Construction Loan',
        interestRate: 'From 8.45% p.a.',
        maxFunding: 'Up to 75% of Agreement Cost',
        maxTenure: 'Up to 20 Years',
        estimatedEmi: '₹12,200 / mo approx.',
        partnerBanks: ['SBI', 'HDFC Bank', 'Union Bank', 'Canara Bank'],
        specialBenefit: 'Fast-track verification for coal belt & govt employees'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Plot Title Guarantee Shield',
        coverageHighlight: 'Legal indemnification against encroachment',
        premiumEstimate: 'Starting ₹1,499 / year',
        keyCoverages: ['Boundary Shield', 'Legal Representation']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want details about the DTCP Approved plots in Mancherial NH-363.",
    featured: false
  },
  {
    id: 'mancherial-g1-duplex-house',
    title: 'Modern G+1 Independent Duplex House',
    propertyClass: 'Residential',
    propertyType: 'G+1 Houses',
    subType: 'G+1 Duplex / Dual Income House',
    location: 'College Road / CCC Naspur Colony',
    city: 'Mancherial',
    price: '₹78 Lakhs',
    numericPrice: 7800000,
    area: '165 Sq.Yards (2,250 sq.ft Built-up)',
    numericArea: 165,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '4 BHK Duplex (Ground 2BHK + 1st Floor 2BHK)',
    status: 'Ready to Move',
    possessionDate: 'Immediate Handover',
    tagline: 'Ground Floor for Family + 1st Floor with Separate Rental Income Potential',
    description: 'Custom-built G+1 independent house with internal + external staircase, separate electric meters, covered car porch, and borewell water supply.',
    catchyHook: 'Dual Portion House • Live + Rent • 85% Bank Loan Assistance',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Solid RCC Foundation with Municipal Building Approval',
      'Generates ₹18,000 to ₹22,000 Monthly Rental Income',
      'Clear 30-Year Chain Link Documents',
      'Pre-approved Across 40+ Partner Banks'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Dual Living Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 85% of Valuation',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹53,000 / mo approx.',
        partnerBanks: ['HDFC Bank', 'SBI', 'ICICI Bank', 'Canara Bank'],
        specialBenefit: 'Rental income can be factored in for higher eligibility'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'G+1 Structural Protection Shield',
        coverageHighlight: 'Protection up to ₹1.2 Crore for complete dual floor building',
        premiumEstimate: 'Starting ₹2,600 / year',
        keyCoverages: ['Structural Shell', 'Loss of Rent Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please share floor plans and price details for the G+1 House in Mancherial.",
    featured: true
  },
  {
    id: 'mancherial-commercial-showroom-plot',
    title: 'Prime Highway Commercial Plot for Showrooms / Warehousing',
    propertyClass: 'Commercial',
    propertyType: 'Commercial Space',
    subType: 'Commercial Showroom Plot',
    location: 'Mancherial - Chandrapur Highway (NH-363)',
    city: 'Mancherial',
    price: '₹1.65 Cr',
    numericPrice: 16500000,
    area: '600 Sq.Yards',
    numericArea: 600,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '80-Ft Highway Frontage Commercial Zone',
    status: 'Ready for Registration',
    possessionDate: 'Ready for Immediate Construction',
    tagline: 'Heavy Traffic Corridor with Immense Potential for Auto Dealership or Retail Store',
    description: 'Wide road frontage commercial plot suitable for building automobile showrooms, supermarkets, logistics depots, or multi-tenant commercial shops.',
    catchyHook: '80-Ft Frontage • Heavy Footfall Belt • Commercial Bank Loan Available',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Zoned for Commercial & Industrial Activities',
      'Direct Highway Access with Easy Heavy Vehicle Entry',
      'Clear Municipal & Panchayat Commercial Sanction',
      'Pre-sanctioned Business & Commercial Land Loans'
    ],
    eligibleLoans: [
      {
        loanId: 'commercial-loan',
        loanName: 'Commercial Land & Construction Finance',
        interestRate: 'From 8.95% p.a.',
        maxFunding: 'Up to 70% Land Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹1,35,000 / mo approx.',
        partnerBanks: ['SBI', 'Axis Bank', 'Union Bank', 'HDFC Bank'],
        specialBenefit: 'Doorstep processing with dedicated commercial credit manager'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'commercial-insurance',
        insuranceName: 'Commercial Asset Shield',
        coverageHighlight: 'Protection for commercial land perimeter and structures',
        premiumEstimate: 'Starting ₹3,500 / year',
        keyCoverages: ['Boundary Shield', 'Third-Party Liability']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the location map and details for the Highway Commercial Plot in Mancherial.",
    featured: false
  },
  {
    id: 'mancherial-agriculture-godavari-belt',
    title: 'Fertile Black Cotton Farmland with Canal Water Access',
    propertyClass: 'Agriculture',
    propertyType: 'Agriculture',
    subType: 'Agricultural Farmland',
    location: 'Godavari Basin / Jaipur Mandal',
    city: 'Mancherial',
    price: '₹1.80 Cr (for 8 Acres)',
    numericPrice: 18000000,
    area: '8 Acres',
    numericArea: 8,
    areaUnit: 'acres',
    bhkOrSpecs: 'Rich Black Soil + Gravity Canal & Borewell Irrigation',
    status: 'Clear Title Farmland',
    possessionDate: 'Ready for Immediate Dharani Registry',
    tagline: 'High Crop Yield Capacity for Cotton, Chilies & Paddy with Year-Round Water',
    description: 'Extremely productive agricultural land with direct irrigation channels from Godavari canal and deep borewells. Completely level land with motorable access road.',
    catchyHook: 'Canal Irrigation • High Yield Soil • 100% Dharani Clear Title',
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '8 Acres Contiguous Single-Owner Farmland',
      'Dual Water Security: Canal Water + 2 Functional Borewells',
      'Eligible for Telangana State Agriculture Subsidies',
      'Assistance in Dharani Mutation & Revenue Verification'
    ],
    eligibleLoans: [
      {
        loanId: 'agri-loan',
        loanName: 'Farm Land Purchase & Irrigation Finance',
        interestRate: 'From 8.10% p.a.',
        maxFunding: 'Up to 70% Land Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹1,22,000 / mo approx.',
        partnerBanks: ['SBI Agri', 'Canara Bank', 'NABARD Affiliated Banks'],
        specialBenefit: 'Subsidized interest rates with flexible seasonal repayment'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'crop-insurance',
        insuranceName: 'Agro Machinery & Infrastructure Cover',
        coverageHighlight: 'Covers farm transformers, pumps and perimeter fencing',
        premiumEstimate: 'Starting ₹2,200 / year',
        keyCoverages: ['Pumpset Breakdown', 'Natural Calamities']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please share details for the 8-Acre Farmland in Mancherial Godavari basin.",
    featured: false
  },

  // =========================================================================
  // 3. PEDDAPALLI LISTINGS
  // =========================================================================
  {
    id: 'peddapalli-town-center-plots',
    title: 'Clear Title Residential Town Plots',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Municipal Approved Layout',
    location: 'Station Road / NTPC Bypass Corridor',
    city: 'Peddapalli',
    price: '₹14.5 Lakhs onwards',
    numericPrice: 1450000,
    pricePerSqFt: '₹9,660 / Sq.Yd',
    area: '150 Sq.Yards',
    numericArea: 150,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '100% Vastu Approved Residential Plots',
    status: 'Clear Title Plots',
    possessionDate: 'Instant Registration',
    tagline: 'Ideal for Building Independent Home with Zero Municipal Hassles',
    description: 'Pocket-friendly residential plots in established residential neighborhood with immediate water, power, and road connectivity.',
    catchyHook: 'Budget Friendly • Ready for House Construction • 75% Bank Loan',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Clear Municipal Layout Sanction',
      '30-Ft Wide Internal Cement Roads',
      '5 Minutes to Peddapalli Railway Station & Bus Stand',
      'Spot Loan Sanction Assistance'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Affordable Residential Plot Loan',
        interestRate: 'From 8.45% p.a.',
        maxFunding: 'Up to 75% of Cost',
        maxTenure: 'Up to 20 Years',
        estimatedEmi: '₹9,800 / mo approx.',
        partnerBanks: ['SBI', 'Union Bank', 'HDFC Bank', 'Canara Bank'],
        specialBenefit: 'Minimal documentation & zero hidden fees'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Plot Boundary Legal Protection',
        coverageHighlight: 'Protection for plot demarcation and clear ownership',
        premiumEstimate: 'Starting ₹1,299 / year',
        keyCoverages: ['Boundary Shield', 'Legal Counsel']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want details about the Residential Plots in Peddapalli Station Road.",
    featured: false
  },
  {
    id: 'peddapalli-3bhk-modern-bungalow',
    title: 'Ready to Move 3 BHK Independent Bungalow',
    propertyClass: 'Residential',
    propertyType: 'Independent Houses',
    subType: 'Standalone Independent Villa',
    location: 'Ranganayakula Gutta / Court Area',
    city: 'Peddapalli',
    price: '₹62 Lakhs',
    numericPrice: 6200000,
    area: '150 Sq.Yards (1,700 sq.ft Built-up)',
    numericArea: 150,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '3 BHK Vastu Compliant Bungalow',
    status: 'Ready to Move',
    possessionDate: 'Ready for Grihapravesham',
    tagline: 'Private Gated Living with Premium Interior Painting, False Ceiling & Car Port',
    description: 'Elegantly built independent home with high ceilings, false ceiling with LED ambient lights, borewell + municipal tap, and spacious roof terrace.',
    catchyHook: 'Ready to Move • 90% Loan Available • Zero Brokerage',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Municipal Approved Plan with Occupancy Certificate',
      'High-grade Granite Flooring & Teak Wood Main Door',
      'Near Government Hospital & Top English Medium Schools',
      'Instant Loan Approval within 48 Hours'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Ready Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 90% of Property Value',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹42,500 / mo approx.',
        partnerBanks: ['SBI', 'HDFC Bank', 'ICICI Bank', 'Canara Bank'],
        specialBenefit: 'Pre-sanctioned builder tier discount'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Home Complete Shield',
        coverageHighlight: 'Protection up to ₹1 Crore for building and interiors',
        premiumEstimate: 'Starting ₹2,100 / year',
        keyCoverages: ['Fire, Storm & Perils', 'Electrical Damage Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the floor plan and actual photos of the 3 BHK Bungalow in Peddapalli.",
    featured: true
  },
  {
    id: 'peddapalli-agriculture-farmland-acres',
    title: 'Multi-Crop Farmland / Agro Plantation Land',
    propertyClass: 'Agriculture',
    propertyType: 'Agriculture',
    subType: 'Agricultural Land / Farm Plots',
    location: 'Sultanabad / Peddapalli Highway Junction',
    city: 'Peddapalli',
    price: '₹1.45 Cr (for 6 Acres)',
    numericPrice: 14500000,
    area: '6 Acres',
    numericArea: 6,
    areaUnit: 'acres',
    bhkOrSpecs: 'Clear Title Dharani Farmland with 2 Wells',
    status: 'Clear Title Farmland',
    possessionDate: 'Ready for Immediate Registration',
    tagline: 'Excellent Highway Connectivity Suitable for Commercial Farming or Mango Orchards',
    description: 'Fertile red-loam agricultural acreage with continuous water supply, drip irrigation suitability, and electricity connection.',
    catchyHook: 'Highway Proximity • High Water Table • Dharani Passbook Ready',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '6 Contiguous Acres with Direct Tractor & Truck Access',
      'High Water Table with Submersible Water Setup',
      'Zero Legal Claims • 30-Year Chain Search Complete',
      'Fast-track Agri Loan Processing'
    ],
    eligibleLoans: [
      {
        loanId: 'agri-loan',
        loanName: 'Agro Land Finance',
        interestRate: 'From 8.00% p.a.',
        maxFunding: 'Up to 70% Land Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹98,000 / mo approx.',
        partnerBanks: ['SBI Agri', 'Canara Bank', 'Union Bank'],
        specialBenefit: 'Subsidized loan interest for eligible farmers'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'crop-insurance',
        insuranceName: 'Agri Asset Protection',
        coverageHighlight: 'Protection for farm structures and borewells',
        premiumEstimate: 'Starting ₹1,900 / year',
        keyCoverages: ['Boundary Shield', 'Pump Equipment Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please share details for the 6-Acre Farmland in Peddapalli Sultanabad belt.",
    featured: false
  },

  // =========================================================================
  // 4. SIRICILLA (RAJANNA SIRCILLA) LISTINGS
  // =========================================================================
  {
    id: 'siricilla-textile-growth-residential-plots',
    title: 'Textile Hub Growth Corridor Residential Plots',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Residential Layout Plots',
    location: 'Vemulawada Highway / Siricilla Bypass',
    city: 'Siricilla',
    price: '₹19.5 Lakhs onwards',
    numericPrice: 1950000,
    pricePerSqFt: '₹13,000 / Sq.Yd',
    area: '150 Sq.Yards',
    numericArea: 150,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: 'East / West Facing Approved Plots',
    status: 'Clear Title Plots',
    possessionDate: 'Ready for Spot Registration',
    tagline: 'Adjacent to Fast Growing Apparel Park & 4-Lane Highway',
    description: 'Prime investment plots in Rajanna Sircilla with high residential appreciation. Clear municipal sanctions and ready utilities.',
    catchyHook: 'Fast Growing Zone • Clear Title • 75% Bank Loan Available',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'DTCP / Municipal Sanctioned Layout',
      'Underground Drainage, Water Sump & Street Lights',
      '10 Minutes to Vemulawada Temple & Siricilla City Center',
      'Pre-approved Across Major Banks'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Residential Plot & Construction Loan',
        interestRate: 'From 8.40% p.a.',
        maxFunding: 'Up to 75% of Agreement Value',
        maxTenure: 'Up to 20 Years',
        estimatedEmi: '₹13,500 / mo approx.',
        partnerBanks: ['SBI', 'HDFC Bank', 'Canara Bank', 'Axis Bank'],
        specialBenefit: 'Doorstep service with instant pre-qualification'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Plot Security Insurance',
        coverageHighlight: 'Boundary protection and legal indemnity',
        premiumEstimate: 'Starting ₹1,499 / year',
        keyCoverages: ['Boundary Shield', 'Legal Defense Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the brochure and pricing for the Residential Plots in Siricilla Vemulawada highway.",
    featured: false
  },
  {
    id: 'siricilla-g1-independent-house',
    title: 'Spacious G+1 Duplex Independent House',
    propertyClass: 'Residential',
    propertyType: 'G+1 Houses',
    subType: 'G+1 Duplex House',
    location: 'Shanthinagar / Bypass Junction',
    city: 'Siricilla',
    price: '₹82 Lakhs',
    numericPrice: 8200000,
    area: '160 Sq.Yards (2,300 sq.ft Built-up)',
    numericArea: 160,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '4 BHK Duplex (Ground 2BHK + 1st Floor 2BHK)',
    status: 'Newly Constructed',
    possessionDate: 'Ready to Move',
    tagline: 'Luxurious 4 BHK Architecture with Independent Car Parking & Private Terrace',
    description: 'Contemporary multi-level independent home designed for modern living with dual floor flexibility, premium sanitary fittings, and separate electricity meters.',
    catchyHook: 'Dual Income Potential • 100% Vastu • Up to 85% Bank Loan',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'G+1 Municipal Sanctioned Structure',
      'Live in Ground Floor & Rent First Floor for ₹20,000/mo',
      'Clear Legal Title with 30-Year Link Documents',
      'Bank Loan Pre-Approved from 8.35%'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'G+1 Construction & Purchase Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 85% of Valuation',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹55,800 / mo approx.',
        partnerBanks: ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Canara Bank'],
        specialBenefit: 'Rental income can be used to augment loan eligibility'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Dual Story Structure Protection',
        coverageHighlight: 'Protection up to ₹1.4 Crore for complete building',
        premiumEstimate: 'Starting ₹2,900 / year',
        keyCoverages: ['Structural Shell', 'Loss of Rent Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want details and site visit for the G+1 House in Siricilla.",
    featured: true
  },
  {
    id: 'siricilla-commercial-complex-shops',
    title: 'Prime Commercial Complex & Retail Shops',
    propertyClass: 'Commercial',
    propertyType: 'Commercial Space',
    subType: 'Commercial Complex / Retail Space',
    location: 'Main Bazar / Bus Stand Road',
    city: 'Siricilla',
    price: '₹1.85 Cr',
    numericPrice: 18500000,
    area: '320 Sq.Yards (3,200 sq.ft Built-up)',
    numericArea: 320,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: 'G+2 Commercial Building (Multi-Shop Space)',
    status: 'Ready to Move',
    possessionDate: 'Ready for Immediate Renting / Occupation',
    tagline: 'High Footfall Central Retail Zone with Assured Rental Cashflow',
    description: 'Strategic commercial property in the beating heart of Siricilla textile trade center. Excellent frontage, ideal for textile showrooms, jewelry, or office spaces.',
    catchyHook: 'Dense Footfall Hub • High Rental Yield • 75% Commercial Loan',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Municipal Commercial Sanctioned Building',
      'Generates ₹95,000+ Monthly Rental Return',
      'Full Ground Floor Showroom + 2 Upper Floors',
      'Eligible for Lease Rental Discounting (LRD)'
    ],
    eligibleLoans: [
      {
        loanId: 'commercial-loan',
        loanName: 'Commercial Property Purchase Finance',
        interestRate: 'From 8.90% p.a.',
        maxFunding: 'Up to 75% Funding',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹1,50,000 / mo approx.',
        partnerBanks: ['SBI', 'Axis Bank', 'HDFC Bank', 'Canara Bank'],
        specialBenefit: 'Seamless lease discounting and swift sanction'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'commercial-insurance',
        insuranceName: 'Commercial Shop Shield',
        coverageHighlight: 'Protection up to ₹2.5 Crore for commercial structure & tenants',
        premiumEstimate: 'Starting ₹5,200 / year',
        keyCoverages: ['Commercial Fire & Shock', 'Loss of Rent']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the details and rental yields for the Commercial Building in Siricilla Main Bazar.",
    featured: false
  },
  {
    id: 'siricilla-organic-agriculture-farmland',
    title: 'Organic Farm Land & Farmhouse Plots',
    propertyClass: 'Agriculture',
    propertyType: 'Agriculture',
    subType: 'Agricultural Farmland / Farmhouse Plots',
    location: 'Mid-Manair Reservoir (MMD) Agro Belt',
    city: 'Siricilla',
    price: '₹1.25 Cr (for 5 Acres)',
    numericPrice: 12500000,
    area: '5 Acres',
    numericArea: 5,
    areaUnit: 'acres',
    bhkOrSpecs: 'Abundant Water Table + Reservoir Proximity',
    status: 'Clear Title Farmland',
    possessionDate: 'Instant Dharani Registration',
    tagline: 'Ideal for Organic Farming, Dragon Fruit, Dairy or Weekend Farmhouse Estate',
    description: 'Scenic agricultural land overlooking the Mid-Manair backwaters with rich soil, perimeter fence, motorable access road, and 2 functional borewells.',
    catchyHook: 'Reservoir View • Pure Water Security • Dharani 100% Clear',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '5 Acres Contiguous Single-Owner Agro Land',
      '2 Dedicated Deep Borewells with 24/7 Agro Power',
      'Scenic Location Suitable for Agro-Tourism or Farmhouse',
      'Agri Loan Assistance with Minimal Paperwork'
    ],
    eligibleLoans: [
      {
        loanId: 'agri-loan',
        loanName: 'Agro Farm & Orchard Finance',
        interestRate: 'From 8.00% p.a.',
        maxFunding: 'Up to 70% Land Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹85,000 / mo approx.',
        partnerBanks: ['SBI Agri', 'Canara Bank', 'Union Bank'],
        specialBenefit: 'Subsidized loan interest rates for agriculture'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'crop-insurance',
        insuranceName: 'Farm Infrastructure Cover',
        coverageHighlight: 'Protection for borewells and boundary fencing',
        premiumEstimate: 'Starting ₹1,800 / year',
        keyCoverages: ['Boundary Shield', 'Agro Equipment Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please send location map and video of the 5-Acre Farmland near Siricilla Mid-Manair.",
    featured: false
  },

  // =========================================================================
  // 5. SIDDIPET LISTINGS
  // =========================================================================
  {
    id: 'siddipet-smart-city-villa-plots',
    title: 'KUDA / DTCP Approved Smart City Villa Plots',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Gated Villa Layout',
    location: 'Hyderabad - Siddipet Highway / Komuravelli Corridor',
    city: 'Siddipet',
    price: '₹32 Lakhs onwards',
    numericPrice: 3200000,
    pricePerSqFt: '₹16,000 / Sq.Yd',
    area: '200 Sq.Yards',
    numericArea: 200,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '100% Vastu Approved Villa Plots',
    status: 'Clear Title Plots',
    reraId: 'P02400008712',
    possessionDate: 'Ready for Spot Registration',
    tagline: 'Fastest Appreciating Growth Corridor with Rapid Rajiv Rahadari (SH-1) Connectivity',
    description: 'Prestigious gated community layout in booming Siddipet Smart City with 40-ft bitumen roads, underground electricity, park landscaping, and 24/7 security.',
    catchyHook: 'Rapid Appreciation Hub • 75% Bank Loan • Spot Registration',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'DTCP & TS-RERA Approved Gated Layout',
      'Underground Drainage, Water Pipeline & LED Lights',
      '5 Minutes to Siddipet Medical College & IT Tower',
      'Pre-approved Across SBI, HDFC & ICICI Bank'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Villa Plot Purchase & Construction Loan',
        interestRate: 'From 8.40% p.a.',
        maxFunding: 'Up to 75% of Plot Agreement Value',
        maxTenure: 'Up to 25 Years',
        estimatedEmi: '₹21,000 / mo approx.',
        partnerBanks: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Canara Bank'],
        specialBenefit: 'Zero processing fee for pre-cleared buyers'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Plot Title & Perimeter Shield',
        coverageHighlight: 'Protection for plot title legal defense',
        premiumEstimate: 'Starting ₹1,999 / year',
        keyCoverages: ['Title Defense', 'Boundary Wall Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the layout plan and price sheet for the Smart City Villa Plots in Siddipet.",
    featured: true
  },
  {
    id: 'siddipet-luxury-gated-flats',
    title: 'Gated Community Luxury 2 & 3 BHK Apartment Flats',
    propertyClass: 'Residential',
    propertyType: 'Apartment Flats',
    subType: 'Gated Community Apartment Flat',
    location: 'Near IT Tower / Collectorate Complex',
    city: 'Siddipet',
    price: '₹52 Lakhs - ₹78 Lakhs',
    numericPrice: 5200000,
    pricePerSqFt: '₹4,000 / sq.ft',
    area: '1,300 to 1,850 sq.ft',
    numericArea: 1300,
    areaUnit: 'sq.ft',
    bhkOrSpecs: '2 & 3 BHK Luxury Units with Balcony',
    status: 'Ready to Move',
    reraId: 'P02400007621',
    possessionDate: 'Ready for Immediate Occupation',
    tagline: 'Modern Clubhouse, Gym, Solar Power & Dedicated 2-Car Parking Space',
    description: 'Premium high-rise gated community apartments designed with modern architecture, maximum cross-ventilation, lift with generator backup, and children play park.',
    catchyHook: 'Smart City IT Belt • 90% Bank Loan • Ready to Move In',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Municipal & RERA Approved with Occupancy Certificate (OC)',
      'Near Siddipet IT Tower, Collectorate & Ranganayaka Sagar',
      '100% Power Backup & 24/7 Security CCTV',
      'Up to 90% Loan Approval from 8.35%'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Apartment Flat Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 90% of Valuation',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹35,500 / mo approx.',
        partnerBanks: ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank'],
        specialBenefit: 'Doorstep sanction and zero builder markup'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Apartment Interior & Structure Cover',
        coverageHighlight: 'Protection up to ₹1 Crore for walls and fixtures',
        premiumEstimate: 'Starting ₹2,200 / year',
        keyCoverages: ['Fire, Flood & Short Circuit', 'Burglary & Fixture Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the floor plan and brochure for 2 & 3 BHK Flats in Siddipet IT Tower corridor.",
    featured: true
  },
  {
    id: 'siddipet-commercial-plaza-rajiv-rahadari',
    title: 'High-Visibility Commercial Showroom Complex',
    propertyClass: 'Commercial',
    propertyType: 'Commercial',
    subType: 'Commercial Showroom Complex',
    location: 'Rajiv Rahadari (SH-1) Highway Frontage',
    city: 'Siddipet',
    price: '₹3.10 Cr',
    numericPrice: 31000000,
    area: '500 Sq.Yards (5,500 sq.ft Built-up)',
    numericArea: 500,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: 'G+3 Multi-Tenant Commercial Building',
    status: 'Newly Constructed',
    possessionDate: 'Ready for Immediate Lease',
    tagline: 'Strategic Location on Hyderabad - Karimnagar Highway with Massive Daily Traffic',
    description: 'Superb commercial building with glass façade, dedicated customer basement parking, high-speed elevator, and expansive open floor plans for retail, banking, or restaurant chains.',
    catchyHook: 'State Highway Frontage • High Return on Investment • 75% Commercial Loan',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Commercial Approved Structure with Full Fire NOC',
      'High-Speed Lift, 100% DG Power Backup & Glass Elevation',
      'Estimated Monthly Rental Revenue: ₹1.60 Lakhs+',
      'Pre-approved for Lease Rental Discounting (LRD) Loan'
    ],
    eligibleLoans: [
      {
        loanId: 'commercial-loan',
        loanName: 'Commercial Property & LRD Finance',
        interestRate: 'From 8.90% p.a.',
        maxFunding: 'Up to 75% Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹2,50,000 / mo approx.',
        partnerBanks: ['SBI Commercial', 'HDFC Bank', 'Axis Bank', 'Canara Bank'],
        specialBenefit: 'Rental cashflow directly offsets monthly loan EMI'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'commercial-insurance',
        insuranceName: 'Commercial Building Comprehensive Shield',
        coverageHighlight: 'Protection up to ₹4 Crore for building and tenant liabilities',
        premiumEstimate: 'Starting ₹7,500 / year',
        keyCoverages: ['Commercial Fire & Storm', 'Loss of Rent', 'Public Liability']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the floor plans and rental yields for the Commercial Building in Siddipet Rajiv Rahadari.",
    featured: false
  },
  {
    id: 'siddipet-agriculture-ranganayaka-farms',
    title: 'Fertile Agriculture Farmland & Farmhouse Acreage',
    propertyClass: 'Agriculture',
    propertyType: 'Agriculture',
    subType: 'Agricultural Land / Farmhouse Estate',
    location: 'Ranganayaka Sagar Reservoir Belt',
    city: 'Siddipet',
    price: '₹2.20 Cr (for 10 Acres)',
    numericPrice: 22000000,
    area: '10 Acres',
    numericArea: 10,
    areaUnit: 'acres',
    bhkOrSpecs: '3 Deep Borewells + Kaleshwaram Canal Water',
    status: 'Clear Title Farmland',
    possessionDate: 'Ready for Immediate Dharani Registration',
    tagline: 'Perennial Water Security with Scenic Reservoir Backdrop — Ideal for Mega Farm or Orchards',
    description: 'High-grade fertile agricultural parcel located near the Kaleshwaram reservoir system. Abundant groundwater, 3-phase agricultural power, and bitumen approach road.',
    catchyHook: 'Canal & Borewell Water • Scenic Farmhouse Estate • 100% Dharani Verified',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '10 Contiguous Contoured Acres in Single Pattadar Name',
      '3 Dedicated High-Volume Submersible Borewells',
      'Direct Access from Double-Lane Asphalt Village Road',
      'Assistance in Farmhouse Approvals and Agri Financing'
    ],
    eligibleLoans: [
      {
        loanId: 'agri-loan',
        loanName: 'Farm Land Purchase & Agro Development Loan',
        interestRate: 'From 7.95% p.a.',
        maxFunding: 'Up to 70% Land Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹1,50,000 / mo approx.',
        partnerBanks: ['SBI Agri', 'Canara Bank', 'Union Bank of India'],
        specialBenefit: 'Subsidized agro lending interest rates'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'crop-insurance',
        insuranceName: 'Agro Land & Transformer Shield',
        coverageHighlight: 'Protection for farm transformers, borewell machinery and boundary',
        premiumEstimate: 'Starting ₹2,800 / year',
        keyCoverages: ['Machinery Breakdown', 'Perimeter Storm Damage']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please share location map and survey numbers for the 10-Acre Land in Siddipet Ranganayaka Sagar belt.",
    featured: false
  },

  // =========================================================================
  // 6. HANAMKONDA (WARANGAL URBAN) LISTINGS
  // =========================================================================
  {
    id: 'hanamkonda-kuda-luxury-plots',
    title: 'KUDA Approved Premium Residential Villa Plots',
    propertyClass: 'Residential',
    propertyType: 'Open Plots',
    subType: 'Gated Villa Layout',
    location: 'Hunter Road / Waddepally Corridor',
    city: 'Hanamkonda',
    price: '₹42 Lakhs onwards',
    numericPrice: 4200000,
    pricePerSqFt: '₹21,000 / Sq.Yd',
    area: '200 Sq.Yards',
    numericArea: 200,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '100% Clear Vastu Title Plots',
    status: 'Clear Title Plots',
    reraId: 'P02400006541',
    possessionDate: 'Ready for Spot Registration',
    tagline: 'Prestigious Gated Community Layout with 40-Ft Roads, Club Amenities & 24/7 Security',
    description: 'High-end gated residential plots in prime Hanamkonda with underground drainage, transformer, landscaped garden, and direct access to Warangal-Hyderabad Highway.',
    catchyHook: 'Elite Location • 30-Yr Clear Title • 75% Bank Loan Available',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'KUDA & TS-RERA Approved Gated Township',
      'Underground Drainage, Water Connection & Avenue Trees',
      'Near Kakatiya University, NIT Warangal & Top Hospitals',
      'Bank Loan Pre-Approved Across Top 40+ Financial Institutions'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Villa Plot Purchase & Construction Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 75% for Plot + 85% for Building',
        maxTenure: 'Up to 25 Years',
        estimatedEmi: '₹27,500 / mo approx.',
        partnerBanks: ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'],
        specialBenefit: 'Doorstep documentation & fast-track legal verification'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Plot Asset Defense Shield',
        coverageHighlight: 'Protection for plot title legal defense and demarcation',
        premiumEstimate: 'Starting ₹2,100 / year',
        keyCoverages: ['Title Defense Legal Cover', 'Boundary Shield']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the layout plan and pricing for the KUDA Approved Plots in Hanamkonda Hunter Road.",
    featured: true
  },
  {
    id: 'hanamkonda-luxury-g1-duplex-villa',
    title: 'Modern 4 BHK G+1 Luxury Duplex House',
    propertyClass: 'Residential',
    propertyType: 'G+1 Houses',
    subType: 'G+1 Duplex / Dual Living House',
    location: 'Subedari / Nakkalagutta Extension',
    city: 'Hanamkonda',
    price: '₹1.35 Cr',
    numericPrice: 13500000,
    area: '200 Sq.Yards (2,800 sq.ft Built-up)',
    numericArea: 200,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '4 BHK Duplex (Ground 2BHK + 1st Floor 2BHK)',
    status: 'Ready to Move',
    possessionDate: 'Ready for Immediate Handover',
    tagline: 'Architect-Designed Grand Duplex with Italian Marble Flooring & Covered 2-Car Porch',
    description: 'Super-luxury independent G+1 residence with internal teakwood staircase, modular kitchen with chimney, pooja room, home theater lounge, and private open-air terrace.',
    catchyHook: 'Grand 4 BHK Duplex • Elite Neighborhood • Up to 85% Bank Loan',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'Municipal Sanctioned Solid RCC G+1 Structure',
      'Spacious 4 Master Bedrooms with Attached Bathrooms',
      'Dedicated Sump + Deep Borewell with Sweet Groundwater',
      'Pre-sanctioned Home Loan from 8.35% with Zero Brokerage'
    ],
    eligibleLoans: [
      {
        loanId: 'home-loan',
        loanName: 'Luxury G+1 Duplex Home Loan',
        interestRate: 'From 8.35% p.a.',
        maxFunding: 'Up to 85% of Agreement Value',
        maxTenure: 'Up to 30 Years',
        estimatedEmi: '₹91,500 / mo approx.',
        partnerBanks: ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Kotak Mahindra'],
        specialBenefit: 'Special corporate & business professional rate rebate'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'home-insurance',
        insuranceName: 'Luxury Home Structure & Interior Shield',
        coverageHighlight: 'Protection up to ₹2 Crore for complete building structure and interior fixtures',
        premiumEstimate: 'Starting ₹3,800 / year',
        keyCoverages: ['Fire, Flood & Earthquake', 'Burglary & Fixture Loss', 'Short Circuit Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the video walkthrough and floor plan for the 4 BHK Duplex House in Hanamkonda Subedari.",
    featured: true
  },
  {
    id: 'hanamkonda-prime-commercial-plot',
    title: 'High-Value Commercial Plot on Main Road',
    propertyClass: 'Commercial',
    propertyType: 'Commercial Space',
    subType: 'Commercial Showroom Plot',
    location: 'Kazipet - Hanamkonda Main Road',
    city: 'Hanamkonda',
    price: '₹3.80 Cr',
    numericPrice: 38000000,
    area: '550 Sq.Yards',
    numericArea: 550,
    areaUnit: 'sq.yrds',
    bhkOrSpecs: '65-Ft Main Road Frontage Commercial Zoned Plot',
    status: 'Ready for Registration',
    possessionDate: 'Ready for Immediate Construction',
    tagline: 'Unbeatable High Footfall Commercial Corridor Opposite Major Retail Chains',
    description: 'High-potential commercial land plot perfect for developing a multi-story shopping mall, hospital, corporate office, or luxury hotel with wide road access.',
    catchyHook: 'Main Road 65-Ft Frontage • High Footfall • 75% Commercial Loan',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      'KUDA Commercial Zoned Land Clearance',
      'Direct Access from 100-Ft Kazipet - Hanamkonda Arterial Road',
      'High Appreciation & Strong Lease Demand',
      'Pre-approved Commercial Construction Loans'
    ],
    eligibleLoans: [
      {
        loanId: 'commercial-loan',
        loanName: 'Commercial Land Purchase & Construction Finance',
        interestRate: 'From 8.85% p.a.',
        maxFunding: 'Up to 75% Funding',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹3,05,000 / mo approx.',
        partnerBanks: ['SBI Commercial', 'Axis Bank', 'HDFC Bank', 'Bank of Baroda'],
        specialBenefit: 'Fast commercial appraisal & dedicated credit manager'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'commercial-insurance',
        insuranceName: 'Commercial Asset Shield',
        coverageHighlight: 'Protection up to ₹5 Crore for commercial property boundary and civil work',
        premiumEstimate: 'Starting ₹8,000 / year',
        keyCoverages: ['Boundary Shield', 'Third-Party Liability']
      }
    ],
    whatsappMessage: "Hi Prime Funds, I want the commercial plot details on Kazipet - Hanamkonda main road.",
    featured: false
  },
  {
    id: 'hanamkonda-agriculture-farmhouse-land',
    title: 'Scenic Farmland & Luxury Farmhouse Acreage',
    propertyClass: 'Agriculture',
    propertyType: 'Agriculture',
    subType: 'Agricultural Farmland / Farmhouse Plots',
    location: 'Dharmasagar / Elkathurthy Agro Belt',
    city: 'Hanamkonda',
    price: '₹2.75 Cr (for 12 Acres)',
    numericPrice: 27500000,
    area: '12 Acres',
    numericArea: 12,
    areaUnit: 'acres',
    bhkOrSpecs: '4 Functional Borewells + Electricity + Fenced Boundary',
    status: 'Clear Title Farmland',
    possessionDate: 'Instant Dharani Mutation & Registry',
    tagline: 'Prime Agriculture & Farmhouse Parcel Near Dharmasagar Reservoir with Round-the-Year Water',
    description: 'Lush 12-acre contiguous agricultural land with rich red-loam soil, 4 borewells, perimeter chain-link fencing, security guard quarters, and bitumen approach road.',
    catchyHook: 'Reservoir Belt • 4 Borewells • Fenced 12 Acres • 100% Clear Title',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
    ],
    quickHighlights: [
      '12 Acres Contiguous Single Pattadar Title with Zero Disputes',
      '4 Dedicated Heavy Yield Borewells with Submersible Motors',
      'Complete Chain-Link Security Fencing around Entire 12 Acres',
      'Agro & Farmhouse Land Loan Assistance'
    ],
    eligibleLoans: [
      {
        loanId: 'agri-loan',
        loanName: 'Agricultural Land & Plantation Finance',
        interestRate: 'From 7.95% p.a.',
        maxFunding: 'Up to 70% Land Value',
        maxTenure: 'Up to 15 Years',
        estimatedEmi: '₹1,85,000 / mo approx.',
        partnerBanks: ['SBI Agri', 'Canara Bank', 'Union Bank of India'],
        specialBenefit: 'Subsidized loan interest rates for agriculture'
      }
    ],
    eligibleInsurances: [
      {
        insuranceId: 'crop-insurance',
        insuranceName: 'Agro Farm Infrastructure Cover',
        coverageHighlight: 'Protection for borewells, electrical transformers and boundary fence',
        premiumEstimate: 'Starting ₹3,200 / year',
        keyCoverages: ['Pumpset Breakdown', 'Natural Calamities Cover']
      }
    ],
    whatsappMessage: "Hi Prime Funds, please share details for the 12-Acre Farmland in Hanamkonda Dharmasagar belt.",
    featured: false
  }
];

export const REAL_ESTATE_CATEGORIES: { id: 'All' | PropertyCategory; label: string; icon: string; count: string; catchphrase: string }[] = [
  {
    id: 'All',
    label: 'All Properties',
    icon: 'Layers',
    count: 'Plots, Houses, Flats, Commercial & Farmland',
    catchphrase: 'Handpicked Deals with Up to 90% Bank Loans'
  },
  {
    id: 'Open Plots',
    label: 'Open Plots',
    icon: 'LandPlot',
    count: 'KUDA, HMDA & DTCP Approved',
    catchphrase: '100% Clear Titles • Spot Registration'
  },
  {
    id: 'Independent Houses',
    label: 'Independent Houses',
    icon: 'Home',
    count: 'Standalone Bungalows & Villas',
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
    catchphrase: 'Clubhouse Amenities • 90% Bank Loan'
  },
  {
    id: 'Commercial',
    label: 'Commercial Properties',
    icon: 'Building2',
    count: 'Complexes, Shops & Showrooms',
    catchphrase: 'High Rental Yields • Lease Rental Discounting'
  },
  {
    id: 'Agriculture',
    label: 'Agricultural Land',
    icon: 'Trees',
    count: 'Farmland & Farmhouse Acreage',
    catchphrase: 'Dharani Passbook • Water Security'
  }
];

export const REAL_ESTATE_ADVANTAGES = [
  {
    title: '0% Buyer Brokerage',
    description: 'Direct builder and owner pricing with zero middleman markup — what you see is what you pay.',
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
    desc: 'Every plot, house, flat, and farm is vetted by our senior banking & legal experts.'
  },
  {
    title: 'Free Cab Site Visits',
    phrase: 'Doorstep Pickup & Drop',
    desc: 'Schedule a private guided tour with our property specialists at your convenience.'
  }
];
