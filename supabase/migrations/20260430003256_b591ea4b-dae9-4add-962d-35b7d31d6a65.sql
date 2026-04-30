-- Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enums for content
CREATE TYPE public.line_of_business AS ENUM ('personal', 'commercial', 'bonds', 'dealership');
CREATE TYPE public.funnel_stage AS ENUM ('tofu', 'mofu', 'bofu');
CREATE TYPE public.us_state AS ENUM ('NV', 'CO');

-- Service categories (Personal, Commercial, Bonds, Dealership)
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  line line_of_business NOT NULL,
  name_en TEXT NOT NULL,
  name_es TEXT,
  tagline_en TEXT,
  tagline_es TEXT,
  description_en TEXT,
  description_es TEXT,
  meta_title TEXT,
  meta_description TEXT,
  state_restriction us_state,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Individual service pages (Auto, Home, GL, Workers Comp, Surety Bonds, Dealership, etc.)
CREATE TABLE public.service_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_es TEXT,
  hero_headline_en TEXT,
  hero_headline_es TEXT,
  hero_sub_en TEXT,
  hero_sub_es TEXT,
  body_en TEXT,
  body_es TEXT,
  who_its_for_en TEXT,
  what_it_covers_en TEXT,
  common_mistakes_en TEXT,
  meta_title TEXT,
  meta_description TEXT,
  state_restriction us_state,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- State-specific rules / notes
CREATE TABLE public.state_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state us_state NOT NULL,
  topic TEXT NOT NULL,
  body_en TEXT NOT NULL,
  body_es TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FAQ categories
CREATE TABLE public.faq_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_es TEXT,
  description_en TEXT,
  service_category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
  service_page_id UUID REFERENCES public.service_pages(id) ON DELETE SET NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- FAQ items (the engine for 500+ questions)
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.faq_categories(id) ON DELETE SET NULL,
  service_page_id UUID REFERENCES public.service_pages(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  funnel_stage funnel_stage NOT NULL DEFAULT 'tofu',
  question_en TEXT NOT NULL,
  question_es TEXT,
  short_answer_en TEXT NOT NULL,
  short_answer_es TEXT,
  long_answer_en TEXT,
  long_answer_es TEXT,
  related_faq_ids UUID[] NOT NULL DEFAULT '{}',
  cta_lead_magnet_id UUID,
  meta_title TEXT,
  meta_description TEXT,
  is_speakable BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  view_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lead magnets (tripwire offers)
CREATE TABLE public.lead_magnets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_es TEXT,
  subtitle_en TEXT,
  subtitle_es TEXT,
  description_en TEXT,
  description_es TEXT,
  bullets_en TEXT[] NOT NULL DEFAULT '{}',
  bullets_es TEXT[] NOT NULL DEFAULT '{}',
  category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
  service_page_id UUID REFERENCES public.service_pages(id) ON DELETE SET NULL,
  asset_url TEXT,
  thank_you_message_en TEXT,
  meta_title TEXT,
  meta_description TEXT,
  state_restriction us_state,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.faq_items
  ADD CONSTRAINT faq_items_lead_magnet_fk
  FOREIGN KEY (cta_lead_magnet_id) REFERENCES public.lead_magnets(id) ON DELETE SET NULL;

-- Lead submissions
CREATE TABLE public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_magnet_id UUID REFERENCES public.lead_magnets(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  state us_state,
  category_tag TEXT,
  source_path TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Internal CTA links registry
CREATE TABLE public.internal_cta_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  label_en TEXT NOT NULL,
  label_es TEXT,
  href TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Content audit
CREATE TABLE public.content_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo',
  notes TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Updated_at trigger helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_service_categories_touch BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_service_pages_touch BEFORE UPDATE ON public.service_pages
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_state_rules_touch BEFORE UPDATE ON public.state_rules
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_faq_items_touch BEFORE UPDATE ON public.faq_items
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_lead_magnets_touch BEFORE UPDATE ON public.lead_magnets
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_magnets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_cta_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_audit ENABLE ROW LEVEL SECURITY;

-- Public-readable content
CREATE POLICY "Public read service_categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Admins write service_categories" ON public.service_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Public read service_pages" ON public.service_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admins write service_pages" ON public.service_pages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Public read state_rules" ON public.state_rules FOR SELECT USING (true);
CREATE POLICY "Admins write state_rules" ON public.state_rules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Public read faq_categories" ON public.faq_categories FOR SELECT USING (true);
CREATE POLICY "Admins write faq_categories" ON public.faq_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Public read faq_items" ON public.faq_items FOR SELECT USING (is_published = true);
CREATE POLICY "Admins write faq_items" ON public.faq_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Public read lead_magnets" ON public.lead_magnets FOR SELECT USING (is_published = true);
CREATE POLICY "Admins write lead_magnets" ON public.lead_magnets FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Public read internal_cta_links" ON public.internal_cta_links FOR SELECT USING (true);
CREATE POLICY "Admins write internal_cta_links" ON public.internal_cta_links FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Lead submissions: public can insert, only admin can read
CREATE POLICY "Anyone can submit lead" ON public.lead_submissions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read lead_submissions" ON public.lead_submissions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update lead_submissions" ON public.lead_submissions
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete lead_submissions" ON public.lead_submissions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Content audit (admin only)
CREATE POLICY "Admins manage content_audit" ON public.content_audit FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Indexes
CREATE INDEX idx_service_pages_category ON public.service_pages(category_id);
CREATE INDEX idx_faq_items_category ON public.faq_items(category_id);
CREATE INDEX idx_faq_items_service ON public.faq_items(service_page_id);
CREATE INDEX idx_faq_items_funnel ON public.faq_items(funnel_stage);
CREATE INDEX idx_lead_magnets_category ON public.lead_magnets(category_id);
CREATE INDEX idx_lead_submissions_magnet ON public.lead_submissions(lead_magnet_id);