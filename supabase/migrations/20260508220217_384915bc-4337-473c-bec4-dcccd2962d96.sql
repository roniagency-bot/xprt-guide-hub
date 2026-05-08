UPDATE public.lead_magnets
SET asset_url = '/api/public/downloads/nevada-dealership-starter-guide'
WHERE slug = 'nevada-dealership-starter-guide';

INSERT INTO public.lead_magnets (slug, title_en, subtitle_en, description_en, bullets_en, asset_url, is_published, category_id)
VALUES (
  'nevada-dealership-cheat-sheet',
  'Nevada Dealership Insurance Cheat Sheet',
  'A quick-reference guide to the coverages every Nevada dealer should understand.',
  'A 1-page reference summarizing garage liability, dealer open lot, garage keepers, workers'' comp, umbrella, and the Nevada dealer surety bond — plus what to review before licensing or renewal.',
  ARRAY[
    'Garage liability essentials',
    'Open lot / dealer physical damage',
    'Garage keepers basics',
    'Workers'' comp & umbrella coordination',
    'Nevada $100,000 dealer surety bond'
  ],
  '/api/public/downloads/nevada-dealership-cheat-sheet',
  true,
  (SELECT id FROM public.service_categories WHERE slug = 'dealership' LIMIT 1)
)
ON CONFLICT (slug) DO UPDATE
  SET asset_url = EXCLUDED.asset_url,
      title_en = EXCLUDED.title_en,
      subtitle_en = EXCLUDED.subtitle_en,
      description_en = EXCLUDED.description_en,
      bullets_en = EXCLUDED.bullets_en,
      is_published = true;