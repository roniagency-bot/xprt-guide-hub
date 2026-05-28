INSERT INTO public.lead_magnets (slug, title_en, subtitle_en, description_en, bullets_en, asset_url, thank_you_message_en, meta_title, meta_description, is_published)
VALUES (
  'dealer-bond-bundle',
  'Dealer Bond + Garage Liability Bundle',
  'How NV & CO motor vehicle dealers stack the DMV bond, garage liability, and open-lot coverage into one renewal calendar',
  'A 4-page worksheet covering the three policies every licensed dealer needs, typical NV/CO pricing, why bundling beats monoline, a DMV filing checklist, and a quote worksheet.',
  ARRAY[
    'The three policies every licensed dealer needs',
    'Typical NV & CO pricing for each coverage',
    'Why bundling beats buying piecemeal',
    'DMV filing checklist — used / new / motorcycle / trailer',
    'Bundle quote worksheet you can fill in before your call'
  ],
  '/api/public/downloads/dealer-bond-bundle',
  'Your dealer bundle worksheet is on its way. Pull it up before your call with Roni.',
  'Dealer Bond + Garage Liability Bundle — Free Worksheet | XPRT',
  'Free 4-page guide for NV & CO motor vehicle dealers on stacking the DMV bond, garage liability, and open lot. Includes a quote worksheet and DMV filing checklist.',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  subtitle_en = EXCLUDED.subtitle_en,
  description_en = EXCLUDED.description_en,
  bullets_en = EXCLUDED.bullets_en,
  asset_url = EXCLUDED.asset_url,
  thank_you_message_en = EXCLUDED.thank_you_message_en,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  is_published = true,
  updated_at = now();