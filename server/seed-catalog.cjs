// server/seed-catalog.cjs — Seeds default loans and insurances into Supabase
const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const DATABASE_URL = process.env.DATABASE_URL;

const DEFAULT_LOANS = [
  { id: 'personal-loan', title: 'Personal Loans', category: 'Personal', tagline: 'Instant funds for your personal needs', description: 'Access flexible personal financing with minimal paperwork to meet your immediate personal goals.', interest_rate_text: 'From 10.25% p.a.', tenure_text: 'Up to 5 Years', image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', icon_name: 'UserCheck', whatsapp_message: "Hi, I'm interested in a Personal Loan. Please share more details.", features: ['Quick approvals within 24 hours', 'No collateral requirement needed', 'Minimal documentation process'] },
  { id: 'home-loan', title: 'Home Loans', category: 'Property', tagline: 'Build or purchase your dream house', description: 'Get your dream home at the lowest interest rates in the market with tailored repayment options.', interest_rate_text: 'From 8.35% p.a.', tenure_text: 'Up to 30 Years', image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', icon_name: 'Home', whatsapp_message: "Hi, I'm interested in a Home Loan. Please share more details.", features: ['Maximum funding up to 90% property value', 'PMAY subsidy benefits facilitation', 'Zero prepayment penalty options'] },
  { id: 'business-loan', title: 'Business Loans', category: 'Business', tagline: 'Fuel your enterprise expansion', description: 'Scale your business operations seamlessly with fast capital disbursements and competitive commercial terms.', interest_rate_text: 'From 11.50% p.a.', tenure_text: 'Up to 7 Years', image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', icon_name: 'Briefcase', whatsapp_message: "Hi, I'm interested in a Business Loan. Please share more details.", features: ['Collateral-free working capital limits', 'GST invoice financing available', 'Quick disbursement within 72 hours'] },
  { id: 'plot-loan', title: 'Plot & Land Loans', category: 'Property', tagline: 'Secure your land investment today', description: 'Finance RERA-approved residential, commercial, and agricultural plot purchases with attractive rate structures.', interest_rate_text: 'From 8.70% p.a.', tenure_text: 'Up to 20 Years', image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', icon_name: 'Map', whatsapp_message: "Hi, I'm interested in a Plot or Land Loan. Please share more details.", features: ['Finance RERA-approved plots', 'Up to 75% of property value', 'Quick title verification process'] },
  { id: 'mortgage-loan', title: 'Mortgage Loans', category: 'Property', tagline: 'Unlock capital from your existing assets', description: 'Leverage your existing property as collateral to access large business or personal capital at competitive rates.', interest_rate_text: 'From 9.50% p.a.', tenure_text: 'Up to 15 Years', image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', icon_name: 'Building', whatsapp_message: "Hi, I'm interested in a Mortgage Loan. Please share more details.", features: ['Up to 70% of property value', 'Residential and commercial properties accepted', 'Balance transfer with top-up options'] },
  { id: 'vehicle-loan', title: 'Vehicle Loans', category: 'Personal', tagline: 'Drive your dream vehicle today', description: 'Finance new or pre-owned two-wheelers, passenger vehicles, commercial trucks, and construction equipment.', interest_rate_text: 'From 7.99% p.a.', tenure_text: 'Up to 7 Years', image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80', icon_name: 'Car', whatsapp_message: "Hi, I'm interested in a Vehicle Loan. Please share more details.", features: ['Up to 100% on-road funding', 'New and used vehicles financed', 'Quick RC transfer support'] },
  { id: 'gold-loan', title: 'Gold Loans', category: 'Personal', tagline: 'Instant liquidity against your gold assets', description: 'Pledge your gold ornaments and bars for immediate disbursements — the fastest loan product in India.', interest_rate_text: 'From 7.50% p.a.', tenure_text: 'Up to 3 Years', image_url: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80', icon_name: 'Gem', whatsapp_message: "Hi, I'm interested in a Gold Loan. Please share more details.", features: ['Disbursement within 30 minutes', 'No income proof required', 'Safe vault storage of your gold'] },
  { id: 'education-loan', title: 'Education Loans', category: 'Specialized', tagline: 'Invest in knowledge, secure your future', description: 'Comprehensive education financing for Indian and international colleges covering tuition and living expenses.', interest_rate_text: 'From 8.10% p.a.', tenure_text: 'Up to 15 Years', image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', icon_name: 'GraduationCap', whatsapp_message: "Hi, I'm interested in an Education Loan. Please share more details.", features: ['Covers domestic and international institutes', 'No collateral up to 7.5 Lakh', 'Repayment starts 6 months after course'] },
  { id: 'agri-loan', title: 'Agriculture Loans', category: 'Specialized', tagline: 'Empower Indian farming with affordable credit', description: 'KCC crop loans, farm equipment financing, agri land purchase loans, and allied agri-business capital.', interest_rate_text: 'From 7% p.a. (Subsidized)', tenure_text: 'Seasonal / Up to 10 Years', image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', icon_name: 'Sprout', whatsapp_message: "Hi, I'm interested in an Agriculture Loan. Please share more details.", features: ['Kisan Credit Card (KCC) facilitation', 'Government interest subvention benefits', 'Flexible seasonal repayment cycles'] }
];

const DEFAULT_LIFE_INSURANCES = [
  { id: 'term-life', title: 'Term Life Insurance', category: 'Life Insurance', coverage_highlight: '₹50L – ₹5Cr Coverage', description: 'Pure protection plans providing maximum coverage at minimal premiums for your family\'s financial security.', image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', icon_name: 'Shield', whatsapp_message: "Hi, I'm interested in Term Life Insurance. Please share more details.", features: ['100% death benefit payout', 'Tax deduction under 80C', 'Rider options available'] },
  { id: 'endowment-plan', title: 'Endowment Plans', category: 'Life Insurance', coverage_highlight: 'Life Cover + Savings', description: 'Combination plans providing life coverage plus guaranteed returns for long-term financial goals.', image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80', icon_name: 'TrendingUp', whatsapp_message: "Hi, I'm interested in an Endowment Plan. Please share more details.", features: ['Guaranteed maturity benefit', 'Bonus additions annually', 'Loan against policy available'] },
  { id: 'ulip-plan', title: 'ULIP Plans', category: 'Life Insurance', coverage_highlight: 'Market-Linked Returns', description: 'Unit Linked Insurance Plans combining life cover with equity or debt fund investment options.', image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', icon_name: 'BarChart2', whatsapp_message: "Hi, I'm interested in a ULIP Plan. Please share more details.", features: ['Equity and debt fund switching', 'Partial withdrawal after 5 years', 'Tax benefits under 80C and 10(10D)'] }
];

const DEFAULT_GENERAL_INSURANCES = [
  { id: 'health-insurance', title: 'Health Insurance', category: 'General Insurance', coverage_highlight: '₹3L – ₹1Cr Mediclaim', description: 'Comprehensive medical coverage for individuals and families with cashless hospitalization across 10,000+ network hospitals.', image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', icon_name: 'Heart', whatsapp_message: "Hi, I'm interested in Health Insurance. Please share more details.", features: ['Cashless claims at network hospitals', 'Pre and post hospitalization cover', 'Annual health check-up included'] },
  { id: 'motor-insurance', title: 'Motor Vehicle Insurance', category: 'General Insurance', coverage_highlight: 'Full Comprehensive Cover', description: 'Third-party and comprehensive motor policies for cars, two-wheelers, and commercial vehicles.', image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80', icon_name: 'Car', whatsapp_message: "Hi, I'm interested in Motor Insurance. Please share more details.", features: ['Third-party mandatory coverage', 'Own damage comprehensive cover', 'Quick cashless claim settlement'] },
  { id: 'property-insurance', title: 'Property Insurance', category: 'General Insurance', coverage_highlight: 'Structure & Contents Cover', description: 'Protect your home, commercial buildings, and contents against fire, natural disasters, theft, and liability.', image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', icon_name: 'Building2', whatsapp_message: "Hi, I'm interested in Property Insurance. Please share more details.", features: ['Fire and natural perils protection', 'Burglary and theft coverage', 'Landlord and tenant liability'] }
];

async function seedCatalog() {
  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();
  console.log('✅ Connected to Supabase');

  // Check loans
  const { rows: loanRows } = await client.query('SELECT COUNT(*) FROM loans');
  if (parseInt(loanRows[0].count) === 0) {
    for (const loan of DEFAULT_LOANS) {
      await client.query(
        `INSERT INTO loans (id, title, category, tagline, description, interest_rate_text, tenure_text, image_url, icon_name, whatsapp_message, features)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (id) DO NOTHING`,
        [loan.id, loan.title, loan.category, loan.tagline, loan.description, loan.interest_rate_text, loan.tenure_text, loan.image_url, loan.icon_name, loan.whatsapp_message, JSON.stringify(loan.features)]
      );
    }
    console.log('✅ Loans seeded:', DEFAULT_LOANS.length, 'records');
  } else {
    console.log('ℹ️  Loans already present:', loanRows[0].count, 'records');
  }

  // Check insurances
  const { rows: insRows } = await client.query('SELECT COUNT(*) FROM insurances');
  if (parseInt(insRows[0].count) === 0) {
    for (const ins of [...DEFAULT_LIFE_INSURANCES, ...DEFAULT_GENERAL_INSURANCES]) {
      await client.query(
        `INSERT INTO insurances (id, title, category, coverage_highlight, description, image_url, icon_name, whatsapp_message, features)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (id) DO NOTHING`,
        [ins.id, ins.title, ins.category, ins.coverage_highlight, ins.description, ins.image_url, ins.icon_name, ins.whatsapp_message, JSON.stringify(ins.features)]
      );
    }
    console.log('✅ Insurances seeded:', (DEFAULT_LIFE_INSURANCES.length + DEFAULT_GENERAL_INSURANCES.length), 'records');
  } else {
    console.log('ℹ️  Insurances already present:', insRows[0].count, 'records');
  }

  await client.end();
  console.log('✅ Catalog seed complete');
}

seedCatalog().catch(e => { console.error('❌ Seed error:', e.message); process.exit(1); });
