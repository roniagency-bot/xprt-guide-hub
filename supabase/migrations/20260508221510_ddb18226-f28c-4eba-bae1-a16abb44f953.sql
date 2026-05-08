CREATE TABLE public.lead_magnet_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  event text NOT NULL,
  user_agent text,
  referer text,
  ip_hash text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX lead_magnet_events_slug_idx ON public.lead_magnet_events(slug, created_at DESC);
CREATE INDEX lead_magnet_events_event_idx ON public.lead_magnet_events(event, created_at DESC);
ALTER TABLE public.lead_magnet_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read lead_magnet_events" ON public.lead_magnet_events FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Service role inserts lead_magnet_events" ON public.lead_magnet_events FOR INSERT TO public WITH CHECK (auth.role() = 'service_role');