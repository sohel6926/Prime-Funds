// server/routes/settings.js — Brand, Stats, Why Choose Us, Trust Points
import express from 'express';
import { supabase } from '../db.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// ─── BRAND SETTINGS ──────────────────────────────────────────────────────────

router.get('/brand', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('brand_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;
    res.json(formatBrandFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/brand', requireAdminKey, async (req, res) => {
  try {
    const dbData = {
      name: req.body.name,
      tagline: req.body.tagline,
      sub_tagline: req.body.subTagline,
      contact_person: req.body.contactPerson,
      phone: req.body.phone,
      raw_phone: req.body.rawPhone,
      email: req.body.email,
      address: req.body.address,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('brand_settings')
      .upsert({ id: 1, ...dbData })
      .select()
      .single();

    if (error) throw error;
    res.json(formatBrandFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function formatBrandFromDB(row) {
  if (!row) return {};
  return {
    name: row.name,
    tagline: row.tagline,
    subTagline: row.sub_tagline,
    contactPerson: row.contact_person,
    phone: row.phone,
    rawPhone: row.raw_phone,
    email: row.email,
    address: row.address
  };
}

// ─── ABOUT STATS ─────────────────────────────────────────────────────────────

router.get('/stats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('about_stats')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    res.json(data.map(row => ({
      prefix: row.prefix,
      numericValue: Number(row.numeric_value),
      suffix: row.suffix,
      value: row.value,
      label: row.label
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/stats', requireAdminKey, async (req, res) => {
  try {
    const stats = req.body; // array of stat objects
    // Delete all and re-insert
    await supabase.from('about_stats').delete().neq('id', 0);
    const toInsert = stats.map((s, i) => ({
      sort_order: i + 1,
      prefix: s.prefix || '',
      numeric_value: s.numericValue || 0,
      suffix: s.suffix || '',
      value: s.value || '',
      label: s.label || ''
    }));
    const { data, error } = await supabase.from('about_stats').insert(toInsert).select();
    if (error) throw error;
    res.json(data.map(row => ({
      prefix: row.prefix,
      numericValue: Number(row.numeric_value),
      suffix: row.suffix,
      value: row.value,
      label: row.label
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── WHY CHOOSE US ───────────────────────────────────────────────────────────

router.get('/why-choose-us', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('why_choose_us')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    res.json(data.map(row => ({
      title: row.title,
      description: row.description,
      iconName: row.icon_name
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/why-choose-us', requireAdminKey, async (req, res) => {
  try {
    const items = req.body;
    await supabase.from('why_choose_us').delete().neq('id', 0);
    const toInsert = items.map((item, i) => ({
      sort_order: i + 1,
      title: item.title,
      description: item.description,
      icon_name: item.iconName || 'Sparkles'
    }));
    const { data, error } = await supabase.from('why_choose_us').insert(toInsert).select();
    if (error) throw error;
    res.json(data.map(row => ({ title: row.title, description: row.description, iconName: row.icon_name })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TRUST POINTS ────────────────────────────────────────────────────────────

router.get('/trust-points', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trust_points')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    res.json(data.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      iconName: row.icon_name
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/trust-points', requireAdminKey, async (req, res) => {
  try {
    const points = req.body;
    // Upsert each point
    for (const point of points) {
      await supabase.from('trust_points').upsert({
        id: point.id,
        sort_order: point.sortOrder || 0,
        title: point.title,
        description: point.description,
        icon_name: point.iconName || 'CheckCircle'
      });
    }
    const { data, error } = await supabase.from('trust_points').select('*').order('sort_order');
    if (error) throw error;
    res.json(data.map(row => ({ id: row.id, title: row.title, description: row.description, iconName: row.icon_name })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
