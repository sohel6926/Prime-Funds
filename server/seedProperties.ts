import { supabase } from './db.js';
import { PROPERTY_LISTINGS } from '../src/data/realEstateData.js';

function formatPropertyToDB(p: any) {
  return {
    id: p.id,
    title: p.title,
    property_class: p.propertyClass || 'Residential',
    property_type: p.propertyType || 'Open Plots',
    sub_type: p.subType || null,
    location: p.location,
    city: p.city || 'Karimnagar',
    price: p.price,
    numeric_price: p.numericPrice || 0,
    price_per_sq_ft: p.pricePerSqFt || null,
    area: p.area || null,
    numeric_area: p.numericArea || 0,
    area_unit: p.areaUnit || 'sq.yrds',
    bhk_or_specs: p.bhkOrSpecs || null,
    status: p.status || 'Ready to Move',
    rera_id: p.reraId || null,
    possession_date: p.possessionDate || null,
    tagline: p.tagline || null,
    description: p.description || null,
    catchy_hook: p.catchyHook || null,
    images: p.images || [],
    quick_highlights: p.quickHighlights || [],
    eligible_loans: p.eligibleLoans || [],
    eligible_insurances: p.eligibleInsurances || [],
    whatsapp_message: p.whatsappMessage || null,
    featured: p.featured || false
  };
}

async function run() {
  console.log('Seeding properties into Supabase...');
  console.log(`Found ${PROPERTY_LISTINGS.length} properties in local data.`);

  const dbRows = PROPERTY_LISTINGS.map(formatPropertyToDB);

  // Upsert all properties by id
  const { data, error } = await supabase
    .from('properties')
    .upsert(dbRows, { onConflict: 'id' })
    .select('id, title, city');

  if (error) {
    console.error('❌ Error seeding properties:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data?.length || 0} properties into Supabase!`);
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
