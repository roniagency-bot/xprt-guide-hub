
INSERT INTO public.lead_magnets (slug, title_en, subtitle_en, description_en, bullets_en, asset_url, thank_you_message_en, meta_title, meta_description, is_published)
VALUES
(
  'bond-quick-guide',
  'Surety Bonds: Your Quick Guide',
  'A 2-page educational primer on surety bonds in Nevada and Colorado.',
  'Download the quick educational guide explaining common bond types, key terms, quoting basics, state requirements, and common mistakes to avoid.',
  ARRAY[
    'The 3 parties of every surety bond',
    'License, permit, contractor, dealer, title, notary, fidelity, and LDA bonds explained',
    'What underwriters look at',
    'What you need to start a bond quote',
    'Common mistakes that delay approval'
  ],
  '/downloads/bond-quick-guide.pdf',
  'Your bond guide is on its way. Open the PDF below to start, then quote and purchase online whenever you''re ready.',
  'Surety Bonds Quick Guide | XPRT Insurance',
  'Free 2-page surety bond guide for Nevada and Colorado — covers license, permit, contractor, dealer, title, notary, fidelity, and LDA bonds.',
  true
),
(
  'complete-guide-to-surety-bonds',
  'Complete Guide to Surety Bonds',
  'A deeper educational ebook on underwriting, contract bonds, commercial bonds, and state-specific rules.',
  'A deeper educational guide covering underwriting, contract bonds, commercial bonds, compliance requirements, state-specific rules, quoting, and common mistakes.',
  ARRAY[
    'How surety underwriting really works',
    'Contract bonds vs commercial bonds',
    'Compliance and obligee requirements',
    'State-specific rules for Nevada and Colorado',
    'Quoting, indemnity, and reimbursement explained',
    'Common bond mistakes and how to avoid them'
  ],
  '/downloads/complete-guide-to-surety-bonds.pdf',
  'Your complete guide is ready. Open the PDF below to dive in, then quote and purchase online whenever you''re ready.',
  'Complete Guide to Surety Bonds | XPRT Insurance',
  'In-depth surety bonds ebook covering underwriting, contract and commercial bonds, compliance, and state rules in Nevada and Colorado.',
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
  is_published = EXCLUDED.is_published,
  updated_at = now();
