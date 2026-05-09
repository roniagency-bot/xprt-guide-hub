
CREATE TABLE public.download_tokens (
  token text PRIMARY KEY,
  slug text NOT NULL,
  email text NOT NULL,
  lead_submission_id uuid,
  lang text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now(),
  first_clicked_at timestamptz,
  last_clicked_at timestamptz,
  click_count integer NOT NULL DEFAULT 0
);

CREATE INDEX download_tokens_email_idx ON public.download_tokens (email);
CREATE INDEX download_tokens_slug_idx ON public.download_tokens (slug);

ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages download_tokens"
ON public.download_tokens
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins read download_tokens"
ON public.download_tokens
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));
