// server/seed.js — Seeds all default data into Supabase on first run
import { supabase } from './db.js';

// ─── Default Brand ───────────────────────────────────────────────────────────
const DEFAULT_BRAND = {
  id: 1,
  name: 'Prime Funds Solutions Pvt. Ltd.',
  tagline: 'All About Loans',
  sub_tagline: 'Indian loans & insurance facilitation consultancy',
  contact_person: 'Saikiran.V',
  phone: '+91 9177886354',
  raw_phone: '919177886354',
  email: 'primefundssolutions@gmail.com',
  address: 'Prime Towers, Financial District, Gachibowli, Hyderabad, Telangana 500032, India'
};

// ─── Default About Stats ─────────────────────────────────────────────────────
const DEFAULT_STATS = [
  { sort_order: 1, prefix: '₹', numeric_value: 750, suffix: '+ Cr', value: '₹750+ Cr', label: 'Loans & Property Facilitated' },
  { sort_order: 2, prefix: '', numeric_value: 18000, suffix: '+', value: '18,000+', label: 'Satisfied Borrowers & Property Buyers' },
  { sort_order: 3, prefix: '', numeric_value: 40, suffix: '+', value: '40+', label: 'Empaneled Banks & NBFC Partners' },
  { sort_order: 4, prefix: '', numeric_value: 99.4, suffix: '%', value: '99.4%', label: 'Sanction & Delivery Success Rate' }
];

// ─── Default Why Choose Us ───────────────────────────────────────────────────
const DEFAULT_WHY = [
  { sort_order: 1, title: '3-in-1 Integrated Platform', description: 'Find verified real estate properties, secure instant bank loans up to 90%, and protect assets with insurance under one single roof.', icon_name: 'Sparkles' },
  { sort_order: 2, title: 'Unbiased Multi-Bank Options (40+ Banks)', description: 'We compare offers across 40+ leading financial institutions to secure the lowest rates and highest loan amounts for you.', icon_name: 'Scale' },
  { sort_order: 3, title: '100% Legal & RERA Vetted Projects', description: 'Every property listed or financed undergoes rigorous title vetting, municipal approval checks, and legal clearance.', icon_name: 'ShieldCheck' },
  { sort_order: 4, title: 'Dedicated Financial Facilitator', description: 'Your assigned specialist led by Saikiran.V manages every document, site visit, and bank coordination with zero hassle.', icon_name: 'UserCheck' }
];

// ─── Default Trust Points ────────────────────────────────────────────────────
const DEFAULT_TRUST = [
  { id: 'tp-1', sort_order: 1, title: '40+ Lending Partners', description: 'We connect you directly with premier Indian banks and reputed NBFCs.', icon_name: 'Building2' },
  { id: 'tp-2', sort_order: 2, title: 'Transparent Advisory', description: 'Our loan experts provide unbiased comparisons with zero hidden consultation charges.', icon_name: 'BadgeCheck' },
  { id: 'tp-3', sort_order: 3, title: 'Rapid Sanction Cycles', description: 'Experience swift document clearance and expedited fund disbursements directly to your account.', icon_name: 'Zap' },
  { id: 'tp-4', sort_order: 4, title: 'End-to-End Assistance', description: 'We handle your complete paperwork from initial application up to final disbursement.', icon_name: 'FileCheck2' }
];

// ─── Default Privacy Sections ────────────────────────────────────────────────
const DEFAULT_PRIVACY = [
  { sort_order: 1, title: '1. Introduction', content: 'Prime Funds Solutions Pvt. Ltd. ("we", "our", or "us") respects your personal privacy. This Privacy Policy outlines how we collect, store, utilize, and protect your information when you interact with our website or utilize our loans and insurance facilitation advisory services in India.' },
  { sort_order: 2, title: '2. Information We Collect', content: 'We collect personal identification details such as your full name, mobile phone number, email address, residential address, employment information, estimated monthly income, and specific loan or insurance preferences submitted voluntarily through our inquiry forms or customer communication channels.' },
  { sort_order: 3, title: '3. How We Use Your Information', content: 'Your information is used strictly to evaluate your borrowing eligibility, calculate accurate repayment quotes, connect you with suitable banking institutions or insurance providers, communicate updates regarding your application status, and deliver professional financial advisory support.' },
  { sort_order: 4, title: '4. Data Sharing & Third-Party Lenders', content: 'We share your submitted financial profile exclusively with authorized partner banks, RBI-registered Non-Banking Financial Companies (NBFCs), and IRDAI-licensed insurance companies for the sole purpose of processing your loan or insurance application. We never sell, rent, or trade your personal data to external telemarketing firms.' },
  { sort_order: 5, title: '5. Data Security Measures', content: 'We implement industry-standard technical safeguards, encrypted communication channels, and strict internal administrative protocols to prevent unauthorized access, alteration, disclosure, or accidental destruction of your confidential information.' },
  { sort_order: 6, title: '6. Your Rights & Preferences', content: 'You retain the right to review, update, or request the deletion of your personal contact records stored with us at any time. You may also opt out of promotional communications by notifying our compliance officer.' },
  { sort_order: 7, title: '7. Cookies & Tracking Technologies', content: 'Our website uses standard essential cookies and analytics tools to enhance site navigation, monitor page responsiveness, and optimize user experience. You can manage your cookie preferences through your individual browser settings.' },
  { sort_order: 8, title: '8. External Third-Party Links', content: 'Our website may contain references or hyperlinks to official partner bank portals and government insurance registries. We encourage you to review their independent privacy terms, as we do not control third-party digital properties.' },
  { sort_order: 9, title: '9. Updates to this Policy', content: 'We periodically update this Privacy Policy to reflect modifications in Indian regulatory guidelines or our internal facilitation practices. Continued use of our website indicates acceptance of the revised privacy framework.' },
  { sort_order: 10, title: '10. Contact for Privacy Inquiries', content: 'If you have any questions, grievances, or requests regarding your personal data handling, please contact our Data Representative Saikiran.V at +91 9177886354 or via email at primefundssolutions@gmail.com.' }
];

// ─── Default Terms ───────────────────────────────────────────────────────────
const DEFAULT_TERMS = [
  { sort_order: 1, title: '1. Acceptance of Terms', content: 'By accessing, browsing, or utilizing the web platform of Prime Funds Solutions Pvt. Ltd., you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions and our Privacy Policy.' },
  { sort_order: 2, title: '2. Nature of Advisory Service', content: 'Prime Funds Solutions Pvt. Ltd. operates strictly as an independent facilitation and advisory consultant connecting customers with third-party lenders and insurers. We are not a direct bank, NBFC, deposit-taking institution, or underwriting insurer.' },
  { sort_order: 3, title: '3. User Responsibilities & Accuracy', content: 'You agree to provide true, accurate, current, and complete details regarding your identity, employment status, credit profile, and financial records when submitting inquiries or loan applications through our team.' },
  { sort_order: 4, title: '4. No Guarantee of Final Approval', content: 'All loan approvals, sanction limits, interest rates, tenure allowances, and insurance policy issuances are determined solely at the independent discretion of the respective partner banks, NBFCs, and insurance underwriters based on their underwriting criteria.' },
  { sort_order: 5, title: '5. Fee Disclosures & Transparency', content: 'Prime Funds Solutions Pvt. Ltd. clearly discloses all relevant consultation arrangements. Standard processing fees, documentation charges, and statutory stamp duties charged by partner lending institutions are payable directly to the respective institutions.' },
  { sort_order: 6, title: '6. Intellectual Property Rights', content: 'All brand names, trademarks, logos, texts, graphics, user interface designs, and proprietary calculators hosted on this website are the intellectual property of Prime Funds Solutions Pvt. Ltd. and are protected under Indian intellectual property laws.' },
  { sort_order: 7, title: '7. Limitation of Liability', content: 'Prime Funds Solutions Pvt. Ltd. shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from loan rejections by partner banks, processing delays, or changes in lending policies made by third-party financial institutions.' },
  { sort_order: 8, title: '8. Governing Law & Jurisdiction', content: 'These terms and conditions are governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.' },
  { sort_order: 9, title: '9. Amendments to Terms', content: 'We reserve the right to revise or update these terms at our discretion without prior notice. Your continued utilization of our services after such modifications constitutes your express agreement to the updated terms.' },
  { sort_order: 10, title: '10. Contact for Legal Grievances', content: 'For questions, official notices, or legal inquiries concerning these Terms and Conditions, please contact our corporate liaison Saikiran.V at +91 9177886354 or via email at primefundssolutions@gmail.com.' }
];

// ─── Default About Content ───────────────────────────────────────────────────
const DEFAULT_ABOUT_CONTENT = {
  id: 1,
  hero: {
    badge: 'About Prime Funds Solutions',
    animatingPhrases: [
      "India's Integrated Real Estate & Financial Facilitator",
      "Dedicated Advisory Led by Saikiran.V & Team",
      "Empowering 18,000+ Borrowers & Property Buyers"
    ],
    description: 'Prime Funds Solutions Pvt. Ltd. is a premier Indian financial & real estate consultancy dedicated to simplifying property acquisition, retail and commercial loans, and comprehensive asset insurance.'
  },
  core_capabilities: {
    badge: 'Core Capabilities',
    heading: 'Our 3-in-1 Integrated Service Ecosystem',
    subtitle: 'Eliminate coordination friction. We unite property discovery, bank loan approvals, and asset protection under a single trusted advisory.',
    pillars: [
      { id: 'cap-realestate', iconName: 'Building2', title: '1. Real Estate & Properties', description: 'Curated inventory of verified open plots, independent houses, G+1 duplex homes, and apartment flats with up to 90% pre-approved bank loans.', bulletPoints: ['100% Verified Titles & RERA Compliance', 'Direct Builder Rates with Zero Markups'], buttonText: 'Browse Properties', buttonTarget: 'realestate' },
      { id: 'cap-loans', iconName: 'Landmark', title: '2. Loan Financing (40+ Banks)', description: 'Personal, home, mortgage, business, and vehicle credit from premier institutions with up to 90% funding and lowest interest rates.', bulletPoints: ['Instant Sanction in 24 to 48 Hours', 'Single-Window Doorstep Documentation'], buttonText: 'Explore Loan Schemes', buttonTarget: 'services' },
      { id: 'cap-insurances', iconName: 'ShieldCheck', title: '3. Insurance Protection', description: 'Protecting structural assets, commercial spaces, vehicles, health, and family financial security with term life plans and mortgage loan coverage shields.', bulletPoints: ['Property Structure & Fire Perils Cover', '100% Cashless Medical & Motor Claims'], buttonText: 'View Insurance Plans', buttonTarget: 'insurances' }
    ]
  },
  mission_vision: {
    missionTitle: 'Our Mission',
    missionDescription: 'To democratize access to transparent credit and verified real estate across India by offering personalized loan comparisons, legal property vetting, and expert advisory.',
    missionTagline: 'Client-Centric • Fast-Track Approvals • Complete Integrity',
    visionTitle: 'Our Vision',
    visionDescription: 'To become the most trusted national household name for integrated real estate, loans, and insurance facilitation.',
    visionTagline: 'Pan-India Reach • 40+ Bank Network • Seamless Digital Journey'
  },
  distinct_advantage: {
    badge: 'Our Distinct Advantage',
    heading: 'Why Work With Prime Funds Solutions',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    imageBadge: 'Dedicated Leadership',
    imageCaption: 'Personalized guidance led by Saikiran.V and our team of senior finance & real estate specialists.'
  },
  track_record: {
    heading: 'Proven Track Record of Facilitation',
    subtitle: 'Our financial and property metrics reflect consistent trust, rapid disbursements, and client satisfaction.',
    ctaHeading: 'Ready to explore properties or loan solutions?',
    ctaSubtitle: 'Contact our senior facilitator Saikiran.V directly or submit a quick application.',
    ctaButtonText: 'WhatsApp Advisory'
  }
};

// ─── Default Gov Schemes ─────────────────────────────────────────────────────
const DEFAULT_GOV_SCHEMES = {
  id: 1,
  title: 'Government Social Insurance Schemes',
  description: 'Pradhan Mantri social security schemes providing affordable life and accident coverage for India\'s working population.',
  schemes: [
    { name: 'PMJJBY (Term Life)', premium: '₹436 / year', benefit: '₹2 Lakh Death Cover' },
    { name: 'PMSBY (Accident)', premium: '₹20 / year', benefit: '₹2 Lakh Accident Cover' },
    { name: 'APY (Pension)', premium: 'Based on Age', benefit: '₹1,000–₹5,000 / month pension' }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Main seed function — only seeds if tables are empty
// ─────────────────────────────────────────────────────────────────────────────
export async function seedDefaults() {
  console.log('🌱 Checking and seeding default data...');

  // Brand Settings
  const { data: brandData } = await supabase.from('brand_settings').select('id').eq('id', 1).single();
  if (!brandData) {
    const { error } = await supabase.from('brand_settings').insert(DEFAULT_BRAND);
    if (error) console.error('❌ Brand seed error:', error.message);
    else console.log('✅ Brand settings seeded');
  }

  // About Stats
  const { count: statsCount } = await supabase.from('about_stats').select('*', { count: 'exact', head: true });
  if (!statsCount) {
    const { error } = await supabase.from('about_stats').insert(DEFAULT_STATS);
    if (error) console.error('❌ Stats seed error:', error.message);
    else console.log('✅ About stats seeded');
  }

  // Why Choose Us
  const { count: whyCount } = await supabase.from('why_choose_us').select('*', { count: 'exact', head: true });
  if (!whyCount) {
    const { error } = await supabase.from('why_choose_us').insert(DEFAULT_WHY);
    if (error) console.error('❌ Why choose us seed error:', error.message);
    else console.log('✅ Why choose us seeded');
  }

  // Trust Points
  const { count: trustCount } = await supabase.from('trust_points').select('*', { count: 'exact', head: true });
  if (!trustCount) {
    const { error } = await supabase.from('trust_points').insert(DEFAULT_TRUST);
    if (error) console.error('❌ Trust points seed error:', error.message);
    else console.log('✅ Trust points seeded');
  }

  // Privacy Sections
  const { count: privCount } = await supabase.from('privacy_sections').select('*', { count: 'exact', head: true });
  if (!privCount) {
    const { error } = await supabase.from('privacy_sections').insert(DEFAULT_PRIVACY);
    if (error) console.error('❌ Privacy seed error:', error.message);
    else console.log('✅ Privacy sections seeded');
  }

  // Terms Sections
  const { count: termsCount } = await supabase.from('terms_sections').select('*', { count: 'exact', head: true });
  if (!termsCount) {
    const { error } = await supabase.from('terms_sections').insert(DEFAULT_TERMS);
    if (error) console.error('❌ Terms seed error:', error.message);
    else console.log('✅ Terms sections seeded');
  }

  // About Content
  const { data: aboutData } = await supabase.from('about_content').select('id').eq('id', 1).single();
  if (!aboutData) {
    const { error } = await supabase.from('about_content').insert(DEFAULT_ABOUT_CONTENT);
    if (error) console.error('❌ About content seed error:', error.message);
    else console.log('✅ About content seeded');
  }

  // Gov Schemes
  const { data: govData } = await supabase.from('gov_schemes').select('id').eq('id', 1).single();
  if (!govData) {
    const { error } = await supabase.from('gov_schemes').insert(DEFAULT_GOV_SCHEMES);
    if (error) console.error('❌ Gov schemes seed error:', error.message);
    else console.log('✅ Gov schemes seeded');
  }

  // Fee Settings
  const { data: feeData } = await supabase.from('fee_settings').select('id').eq('id', 1).single();
  if (!feeData) {
    const defaultFees = {
      id: 1,
      professional_fee: 199,
      professional_fee_label: 'Professional Fee',
      processing_fee: 0,
      processing_fee_label: 'Processing Fee',
      processing_fee_type: 'free',
      processing_fee_custom_text: 'FREE',
      currency_symbol: '₹',
      is_enabled: true,
      button_text: 'Secure Payment & Send Inquiry',
      note: 'Zero advance charges. 100% transparent consultation.'
    };
    const { error } = await supabase.from('fee_settings').insert(defaultFees);
    if (error) console.error('❌ Fee settings seed error:', error.message);
    else console.log('✅ Fee settings seeded');
  }

  console.log('🌱 Seed check complete.');
}
