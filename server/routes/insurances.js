// server/routes/insurances.js — Full CRUD for insurance plans
import express from 'express';
import { supabase } from '../db.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// GET all insurances (public)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('insurances')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data.map(formatInsuranceFromDB));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single insurance
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('insurances')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Insurance not found' });
    res.json(formatInsuranceFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create insurance (admin)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('insurances')
      .insert(formatInsuranceToDB(req.body))
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(formatInsuranceFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update insurance (admin)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const dbData = { ...formatInsuranceToDB(req.body), updated_at: new Date().toISOString() };
    const { data, error } = await supabase
      .from('insurances')
      .update(dbData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(formatInsuranceFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE insurance (admin)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const { error } = await supabase.from('insurances').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatInsuranceFromDB(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    coverageHighlight: row.coverage_highlight,
    description: row.description,
    imageUrl: row.image_url,
    iconName: row.icon_name,
    whatsappMessage: row.whatsapp_message,
    features: row.features || []
  };
}

function formatInsuranceToDB(body) {
  return {
    id: body.id,
    title: body.title,
    category: body.category || 'Life Insurance',
    coverage_highlight: body.coverageHighlight,
    description: body.description,
    image_url: body.imageUrl,
    icon_name: body.iconName || 'Shield',
    whatsapp_message: body.whatsappMessage,
    features: Array.isArray(body.features) ? body.features : []
  };
}

export default router;
