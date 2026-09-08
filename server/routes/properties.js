// server/routes/properties.js — Full CRUD for property listings
import express from 'express';
import { supabase } from '../db.js';
import { requireAdminKey } from '../middleware/auth.js';

const router = express.Router();

// GET all properties (public — used by storefront)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Convert DB snake_case to frontend camelCase
    const formatted = data.map(formatPropertyFromDB);
    res.json(formatted);
  } catch (err) {
    console.error('GET /properties error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET single property by id
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Property not found' });

    res.json(formatPropertyFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create property (admin only)
router.post('/', requireAdminKey, async (req, res) => {
  try {
    const dbData = formatPropertyToDB(req.body);
    const { data, error } = await supabase
      .from('properties')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(formatPropertyFromDB(data));
  } catch (err) {
    console.error('POST /properties error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update property (admin only)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const dbData = { ...formatPropertyToDB(req.body), updated_at: new Date().toISOString() };
    const { data, error } = await supabase
      .from('properties')
      .update(dbData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(formatPropertyFromDB(data));
  } catch (err) {
    console.error('PUT /properties error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE property (admin only)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPropertyFromDB(row) {
  return {
    id: row.id,
    title: row.title,
    propertyClass: row.property_class,
    propertyType: row.property_type,
    subType: row.sub_type,
    location: row.location,
    city: row.city,
    price: row.price,
    numericPrice: row.numeric_price,
    pricePerSqFt: row.price_per_sq_ft,
    area: row.area,
    numericArea: row.numeric_area,
    areaUnit: row.area_unit,
    bhkOrSpecs: row.bhk_or_specs,
    status: row.status,
    reraId: row.rera_id,
    possessionDate: row.possession_date,
    tagline: row.tagline,
    description: row.description,
    catchyHook: row.catchy_hook,
    images: row.images || [],
    quickHighlights: row.quick_highlights || [],
    eligibleLoans: row.eligible_loans || [],
    eligibleInsurances: row.eligible_insurances || [],
    whatsappMessage: row.whatsapp_message,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function formatPropertyToDB(body) {
  return {
    id: body.id,
    title: body.title,
    property_class: body.propertyClass || 'Residential',
    property_type: body.propertyType || 'Open Plots',
    sub_type: body.subType,
    location: body.location,
    city: body.city || 'Karimnagar',
    price: body.price,
    numeric_price: body.numericPrice || 0,
    price_per_sq_ft: body.pricePerSqFt,
    area: body.area,
    numeric_area: body.numericArea || 0,
    area_unit: body.areaUnit || 'sq.yrds',
    bhk_or_specs: body.bhkOrSpecs,
    status: body.status || 'Ready to Move',
    rera_id: body.reraId,
    possession_date: body.possessionDate,
    tagline: body.tagline,
    description: body.description,
    catchy_hook: body.catchyHook,
    images: Array.isArray(body.images) ? body.images : [],
    quick_highlights: Array.isArray(body.quickHighlights) ? body.quickHighlights : (body.quick_highlights || []),
    eligible_loans: Array.isArray(body.eligibleLoans) ? body.eligibleLoans : (body.eligible_loans || []),
    eligible_insurances: Array.isArray(body.eligibleInsurances) ? body.eligibleInsurances : (body.eligible_insurances || []),
    whatsapp_message: body.whatsappMessage || null,
    featured: Boolean(body.featured)
  };
}

export default router;
