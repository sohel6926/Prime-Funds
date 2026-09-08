// server/index.js — Local Server runner for Prime Funds Solutions
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import app from './app.js';
import { supabase } from './db.js';
import { seedDefaults } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 4000;

// ─── Database Setup ───────────────────────────────────────────────────────────

async function setupDatabase() {
  console.log('🔧 Checking database schema...');
  try {
    const schemaSQL = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    const { error: schemaError } = await supabase.rpc('exec_sql', {
      sql: schemaSQL
    }).catch(() => ({ error: null }));

    if (schemaError) {
      console.warn('⚠️ Could not auto-run schema via RPC (normal for restricted service keys).');
    } else {
      console.log('✅ Database schema verified');
    }
  } catch (err) {
    console.warn('⚠️ Schema setup note:', err.message);
  }
}

// ─── Start Server ─────────────────────────────────────────────────────────────

async function start() {
  // Test DB connection
  const { error: connError } = await supabase.from('brand_settings').select('id').limit(1);
  
  if (connError && connError.code === '42P01') {
    console.log('📦 Tables not found — applying schema...');
    await setupDatabase();
  } else if (connError) {
    console.error('❌ Database connection error:', connError.message);
    console.error('Please check your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  // Seed default data
  await seedDefaults();

  app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║    Prime Funds API Server — Running         ║');
    console.log(`║    http://localhost:${PORT}                   ║`);
    console.log('║    Health: /api/health                      ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
  });
}

start().catch(err => {
  console.error('❌ Server startup failed:', err);
  process.exit(1);
});
