-- ============================================================
--  Prime Funds Solutions – Complete Supabase Schema (v1.0)
-- ============================================================

-- Enable UUID extension (already available in Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────
-- 1. PROPERTIES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS properties (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  property_class      TEXT NOT NULL DEFAULT 'Residential',
  property_type       TEXT NOT NULL DEFAULT 'Open Plots',
  sub_type            TEXT,
  location            TEXT NOT NULL,
  city                TEXT NOT NULL DEFAULT 'Karimnagar',
  price               TEXT NOT NULL,
  numeric_price       NUMERIC NOT NULL DEFAULT 0,
  price_per_sq_ft     TEXT,
  area                TEXT,
  numeric_area        NUMERIC,
  area_unit           TEXT DEFAULT 'sq.yrds',
  bhk_or_specs        TEXT,
  status              TEXT NOT NULL DEFAULT 'Ready to Move',
  rera_id             TEXT,
  possession_date     TEXT,
  tagline             TEXT,
  description         TEXT,
  catchy_hook         TEXT,
  images              JSONB NOT NULL DEFAULT '[]',
  quick_highlights    JSONB NOT NULL DEFAULT '[]',
  eligible_loans      JSONB NOT NULL DEFAULT '[]',
  eligible_insurances JSONB NOT NULL DEFAULT '[]',
  whatsapp_message    TEXT,
  featured            BOOLEAN NOT NULL DEFAULT false,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 2. LOANS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS loans (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  category            TEXT NOT NULL DEFAULT 'Personal',
  tagline             TEXT,
  description         TEXT,
  interest_rate_text  TEXT,
  tenure_text         TEXT,
  image_url           TEXT,
  icon_name           TEXT DEFAULT 'Coins',
  whatsapp_message    TEXT,
  features            JSONB NOT NULL DEFAULT '[]',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 3. INSURANCES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS insurances (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  category            TEXT NOT NULL DEFAULT 'Life Insurance',
  coverage_highlight  TEXT,
  description         TEXT,
  image_url           TEXT,
  icon_name           TEXT DEFAULT 'Shield',
  whatsapp_message    TEXT,
  features            JSONB NOT NULL DEFAULT '[]',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 4. INQUIRIES (LEADS CRM)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name         TEXT NOT NULL,
  phone             TEXT NOT NULL,
  email             TEXT,
  service_type      TEXT,
  item_title        TEXT,
  item_category     TEXT,
  payment_status    TEXT DEFAULT 'No Payment (Redirected)',
  lead_channel      TEXT DEFAULT 'Website Form',
  loan_amount       TEXT,
  employment_type   TEXT,
  city              TEXT,
  message           TEXT,
  source            TEXT,
  property_id       TEXT,
  status            TEXT NOT NULL DEFAULT 'New',
  admin_notes       TEXT
);

-- ─────────────────────────────────────────────
-- 5. BRAND SETTINGS (single row, id always = 1)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brand_settings (
  id              INT PRIMARY KEY DEFAULT 1,
  name            TEXT NOT NULL DEFAULT 'Prime Funds Solutions Pvt. Ltd.',
  tagline         TEXT DEFAULT 'All About Loans',
  sub_tagline     TEXT DEFAULT 'Indian loans & insurance facilitation consultancy',
  contact_person  TEXT DEFAULT 'Saikiran.V',
  phone           TEXT DEFAULT '+91 9177886354',
  raw_phone       TEXT DEFAULT '919177886354',
  email           TEXT DEFAULT 'contact@primefundssolutions.com',
  address         TEXT DEFAULT 'Prime Towers, Financial District, Gachibowli, Hyderabad, Telangana 500032, India',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 6. ABOUT STATS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS about_stats (
  id            SERIAL PRIMARY KEY,
  sort_order    INT NOT NULL DEFAULT 0,
  prefix        TEXT DEFAULT '',
  numeric_value NUMERIC NOT NULL DEFAULT 0,
  suffix        TEXT DEFAULT '',
  value         TEXT NOT NULL,
  label         TEXT NOT NULL
);

-- ─────────────────────────────────────────────
-- 7. WHY CHOOSE US
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS why_choose_us (
  id          SERIAL PRIMARY KEY,
  sort_order  INT NOT NULL DEFAULT 0,
  title       TEXT NOT NULL,
  description TEXT,
  icon_name   TEXT DEFAULT 'Sparkles'
);

-- ─────────────────────────────────────────────
-- 8. TRUST POINTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trust_points (
  id          TEXT PRIMARY KEY,
  sort_order  INT NOT NULL DEFAULT 0,
  title       TEXT NOT NULL,
  description TEXT,
  icon_name   TEXT DEFAULT 'CheckCircle'
);

-- ─────────────────────────────────────────────
-- 9. PRIVACY POLICY SECTIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS privacy_sections (
  id          SERIAL PRIMARY KEY,
  sort_order  INT NOT NULL DEFAULT 0,
  title       TEXT NOT NULL,
  content     TEXT
);

-- ─────────────────────────────────────────────
-- 10. TERMS & CONDITIONS SECTIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS terms_sections (
  id          SERIAL PRIMARY KEY,
  sort_order  INT NOT NULL DEFAULT 0,
  title       TEXT NOT NULL,
  content     TEXT
);

-- ─────────────────────────────────────────────
-- 11. ABOUT PAGE CONTENT (single row, id always = 1)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS about_content (
  id                   INT PRIMARY KEY DEFAULT 1,
  hero                 JSONB NOT NULL DEFAULT '{}',
  core_capabilities    JSONB NOT NULL DEFAULT '{}',
  mission_vision       JSONB NOT NULL DEFAULT '{}',
  distinct_advantage   JSONB NOT NULL DEFAULT '{}',
  track_record         JSONB NOT NULL DEFAULT '{}',
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- 12. GOVERNMENT SCHEMES (single row, id always = 1)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gov_schemes (
  id          INT PRIMARY KEY DEFAULT 1,
  title       TEXT NOT NULL DEFAULT 'Government Insurance Schemes',
  description TEXT,
  schemes     JSONB NOT NULL DEFAULT '[]'
);

-- ─────────────────────────────────────────────
-- Indexes for performance
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_class ON properties(property_class);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_loans_category ON loans(category);
CREATE INDEX IF NOT EXISTS idx_insurances_category ON insurances(category);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);
