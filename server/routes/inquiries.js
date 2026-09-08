// server/routes/inquiries.js — CRUD for customer leads/inquiries
import express from 'express';
import { supabase } from '../db.js';
import { requireAdminKey } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET all inquiries (admin only)
router.get('/', requireAdminKey, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data.map(formatInquiryFromDB));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create inquiry (public — from contact forms)
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newInquiry = {
      id: body.id || `inq-${uuidv4().split('-')[0]}-${Date.now()}`,
      created_at: new Date().toISOString(),
      full_name: body.fullName || body.full_name,
      phone: body.phone,
      email: body.email || null,
      service_type: body.serviceType || body.service_type,
      item_title: body.itemTitle || body.item_title || null,
      item_category: body.itemCategory || body.item_category || null,
      payment_status: body.paymentStatus || body.payment_status || 'No Payment (Redirected)',
      lead_channel: body.leadChannel || body.lead_channel || 'Website Form',
      loan_amount: body.loanAmount || body.loan_amount || null,
      employment_type: body.employmentType || body.employment_type || null,
      city: body.city || null,
      message: body.message || null,
      source: body.source || 'Website Form',
      property_id: body.propertyId || body.property_id || null,
      status: 'New',
      admin_notes: body.adminNotes || body.admin_notes || null
    };

    const { data, error } = await supabase
      .from('inquiries')
      .insert(newInquiry)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(formatInquiryFromDB(data));
  } catch (err) {
    console.error('POST /inquiries error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update inquiry status/notes (admin only)
router.put('/:id', requireAdminKey, async (req, res) => {
  try {
    const { status, adminNotes, admin_notes } = req.body;
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (adminNotes !== undefined) updateData.admin_notes = adminNotes;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;

    const { data, error } = await supabase
      .from('inquiries')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(formatInquiryFromDB(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE single inquiry (admin only)
router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const { error } = await supabase.from('inquiries').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all inquiries (admin only)
router.delete('/', requireAdminKey, async (req, res) => {
  try {
    const { error } = await supabase.from('inquiries').delete().neq('id', '');
    if (error) throw error;
    res.json({ success: true, message: 'All inquiries cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatInquiryFromDB(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    serviceType: row.service_type,
    itemTitle: row.item_title,
    itemCategory: row.item_category,
    paymentStatus: row.payment_status,
    leadChannel: row.lead_channel,
    loanAmount: row.loan_amount,
    employmentType: row.employment_type,
    city: row.city,
    message: row.message,
    source: row.source,
    propertyId: row.property_id,
    status: row.status,
    adminNotes: row.admin_notes
  };
}

export default router;
