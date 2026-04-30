-- Tighten lead_submissions INSERT (only anon + authenticated roles, not admin SECURITY DEFINER paths)
DROP POLICY IF EXISTS "Anyone can submit lead" ON public.lead_submissions;
CREATE POLICY "Public can submit lead" ON public.lead_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 320
    AND consent = true
  );

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Lock down SECURITY DEFINER function executable surface
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;