// server/routes/loans.js — Full CRUD for loan services
import express from 'express';
import { supabase } from '../db.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// GET all loans (public)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data.map(formatLoanFromDB));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single loan
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Loan not found' });
    res.json(formatLoanFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create loan (admin)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('loans')
      .insert(formatLoanToDB(req.body))
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(formatLoanFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update loan (admin)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const dbData = { ...formatLoanToDB(req.body), updated_at: new Date().toISOString() };
    const { data, error } = await supabase
      .from('loans')
      .update(dbData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(formatLoanFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE loan (admin)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const { error } = await supabase.from('loans').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatLoanFromDB(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    interestRateText: row.interest_rate_text,
    tenureText: row.tenure_text,
    imageUrl: row.image_url,
    iconName: row.icon_name,
    whatsappMessage: row.whatsapp_message,
    features: row.features || []
  };
}

function formatLoanToDB(body) {
  return {
    id: body.id,
    title: body.title,
    category: body.category || 'Personal',
    tagline: body.tagline,
    description: body.description,
    interest_rate_text: body.interestRateText,
    tenure_text: body.tenureText,
    image_url: body.imageUrl,
    icon_name: body.iconName || 'Coins',
    whatsapp_message: body.whatsappMessage,
    features: Array.isArray(body.features) ? body.features : []
  };
}

export default router;
