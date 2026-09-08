// server/run-schema.cjs — Runs schema.sql directly against Supabase via pg
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const DATABASE_URL = process.env.DATABASE_URL;

async function runSchema() {
  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  
  try {
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL');
    
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(sql);
    console.log('✅ Schema applied successfully — all 12 tables created!');
  } catch (err) {
    console.error('❌ Schema error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSchema();
