-- 1) Revoke EXECUTE on internal SECURITY DEFINER functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM anon, authenticated, public;

-- 2) Scope service-role-only policies explicitly to the service_role grantee
DROP POLICY IF EXISTS "Service role can manage send state" ON public.email_send_state;
CREATE POLICY "Service role can manage send state" ON public.email_send_state
  AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can insert send log" ON public.email_send_log;
CREATE POLICY "Service role can insert send log" ON public.email_send_log
  FOR INSERT TO service_role WITH CHECK (true);
DROP POLICY IF EXISTS "Service role can read send log" ON public.email_send_log;
CREATE POLICY "Service role can read send log" ON public.email_send_log
  FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Service role can update send log" ON public.email_send_log;
CREATE POLICY "Service role can update send log" ON public.email_send_log
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can insert suppressed emails" ON public.suppressed_emails;
CREATE POLICY "Service role can insert suppressed emails" ON public.suppressed_emails
  FOR INSERT TO service_role WITH CHECK (true);
DROP POLICY IF EXISTS "Service role can read suppressed emails" ON public.suppressed_emails;
CREATE POLICY "Service role can read suppressed emails" ON public.suppressed_emails
  FOR SELECT TO service_role USING (true);

DROP POLICY IF EXISTS "Service role can insert tokens" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can insert tokens" ON public.email_unsubscribe_tokens
  FOR INSERT TO service_role WITH CHECK (true);
DROP POLICY IF EXISTS "Service role can read tokens" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can read tokens" ON public.email_unsubscribe_tokens
  FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "Service role can mark tokens as used" ON public.email_unsubscribe_tokens;
CREATE POLICY "Service role can mark tokens as used" ON public.email_unsubscribe_tokens
  FOR UPDATE TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manages download_tokens" ON public.download_tokens;
CREATE POLICY "Service role manages download_tokens" ON public.download_tokens
  AS PERMISSIVE FOR ALL TO service_role USING (true) WITH CHECK (true);