CREATE TABLE public.quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_slug text NOT NULL,
  category_tag text,
  first_name text NOT NULL,
  email text NOT NULL,
  phone text,
  state text,
  consent boolean NOT NULL DEFAULT false,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  score integer NOT NULL DEFAULT 0,
  result_type text NOT NULL,
  source_path text,
  page_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit quiz"
  ON public.quiz_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(first_name) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 320
    AND consent = true
  );

CREATE POLICY "Admins read quiz_submissions"
  ON public.quiz_submissions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete quiz_submissions"
  ON public.quiz_submissions
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));