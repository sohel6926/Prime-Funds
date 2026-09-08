// server/routes/content.js — Privacy, Terms, About Page Content, Gov Schemes
import express from 'express';
import { supabase } from '../db.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────

router.get('/privacy', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('privacy_sections')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    res.json(data.map(row => ({ title: row.title, content: row.content })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/privacy', requireAdminKey, async (req, res) => {
  try {
    const sections = req.body;
    await supabase.from('privacy_sections').delete().neq('id', 0);
    const toInsert = sections.map((s, i) => ({
      sort_order: i + 1,
      title: s.title,
      content: s.content
    }));
    const { data, error } = await supabase.from('privacy_sections').insert(toInsert).select();
    if (error) throw error;
    res.json(data.map(row => ({ title: row.title, content: row.content })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── TERMS & CONDITIONS ──────────────────────────────────────────────────────

router.get('/terms', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('terms_sections')
      .select('*')
      .order('sort_order');

    if (error) throw error;
    res.json(data.map(row => ({ title: row.title, content: row.content })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/terms', requireAdminKey, async (req, res) => {
  try {
    const sections = req.body;
    await supabase.from('terms_sections').delete().neq('id', 0);
    const toInsert = sections.map((s, i) => ({
      sort_order: i + 1,
      title: s.title,
      content: s.content
    }));
    const { data, error } = await supabase.from('terms_sections').insert(toInsert).select();
    if (error) throw error;
    res.json(data.map(row => ({ title: row.title, content: row.content })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ABOUT PAGE CONTENT ───────────────────────────────────────────────────────

router.get('/about', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;
    res.json({
      hero: data.hero,
      coreCapabilities: data.core_capabilities,
      missionVision: data.mission_vision,
      distinctAdvantage: data.distinct_advantage,
      trackRecord: data.track_record
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/about', requireAdminKey, async (req, res) => {
  try {
    const body = req.body;
    const dbData = {
      id: 1,
      hero: body.hero,
      core_capabilities: body.coreCapabilities,
      mission_vision: body.missionVision,
      distinct_advantage: body.distinctAdvantage,
      track_record: body.trackRecord,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('about_content')
      .upsert(dbData)
      .select()
      .single();

    if (error) throw error;
    res.json({
      hero: data.hero,
      coreCapabilities: data.core_capabilities,
      missionVision: data.mission_vision,
      distinctAdvantage: data.distinct_advantage,
      trackRecord: data.track_record
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GOV SCHEMES ─────────────────────────────────────────────────────────────

router.get('/gov-schemes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gov_schemes')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;
    res.json({ title: data.title, description: data.description, schemes: data.schemes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/gov-schemes', requireAdminKey, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('gov_schemes')
      .upsert({ id: 1, title: req.body.title, description: req.body.description, schemes: req.body.schemes })
      .select()
      .single();

    if (error) throw error;
    res.json({ title: data.title, description: data.description, schemes: data.schemes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
