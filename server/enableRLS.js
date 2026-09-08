// server/enableRLS.js
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || process.env.DATABASE_PASSWORD || '',
  host: process.env.PGHOST || 'db.hpqvgmaywcisqqhbaxmv.supabase.co',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'postgres',
  ssl: { rejectUnauthorized: false }
});

const tables = [
  'properties',
  'loans',
  'insurances',
  'inquiries',
  'brand_settings',
  'about_stats',
  'why_choose_us',
  'trust_points',
  'privacy_sections',
  'terms_sections',
  'about_content',
  'gov_schemes'
];

async function applyRLS() {
  await client.connect();
  console.log('Connected to Supabase PostgreSQL.');

  for (const table of tables) {
    console.log(`Enabling RLS on "${table}"...`);
    await client.query(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);

    // Drop existing public read policy if exists
    await client.query(`DROP POLICY IF EXISTS "Public Read Access" ON "${table}";`);

    if (table === 'inquiries') {
      // Inquiries: public can insert leads, but cannot read or delete
      await client.query(`DROP POLICY IF EXISTS "Public Lead Insert" ON "${table}";`);
      await client.query(`CREATE POLICY "Public Lead Insert" ON "${table}" FOR INSERT WITH CHECK (true);`);
    } else {
      // Read-only access for public
      await client.query(`CREATE POLICY "Public Read Access" ON "${table}" FOR SELECT USING (true);`);
    }
  }

  console.log('✅ RLS successfully enabled and configured on all tables!');
  await client.end();
}

applyRLS().catch(err => {
  console.error('RLS setup error:', err);
  process.exit(1);
});
