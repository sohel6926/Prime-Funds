// server/app.js — Express Application configuration
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './db.js';

// Route imports
import propertiesRouter from './routes/properties.js';
import loansRouter from './routes/loans.js';
import insurancesRouter from './routes/insurances.js';
import inquiriesRouter from './routes/inquiries.js';
import settingsRouter from './routes/settings.js';
import contentRouter from './routes/content.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, curl, mobile, or same-origin requests
    if (!origin) return callback(null, true);
    // Allow localhost, 127.0.0.1, Vercel deployments, and custom domains
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging (skip in busy production logs if needed)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/api/upload', uploadRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/loans', loansRouter);
app.use('/api/insurances', insurancesRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/content', contentRouter);

// Dashboard summary stats
app.get('/api/dashboard', async (req, res) => {
  try {
    const [
      { count: propertiesCount },
      { count: loansCount },
      { count: insurancesCount },
      { count: inquiriesCount },
      { count: newLeadsCount }
    ] = await Promise.all([
      supabase.from('properties').select('*', { count: 'exact', head: true }),
      supabase.from('loans').select('*', { count: 'exact', head: true }),
      supabase.from('insurances').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'New')
    ]);

    res.json({
      properties: propertiesCount || 0,
      loans: loansCount || 0,
      insurances: insurancesCount || 0,
      inquiries: inquiriesCount || 0,
      newLeads: newLeadsCount || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Prime Funds API' });
});

export default app;
