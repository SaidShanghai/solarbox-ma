
-- Drop vulnerable policies on email_verifications
DROP POLICY IF EXISTS "Users can create own verifications" ON public.email_verifications;
DROP POLICY IF EXISTS "Users can update own verifications" ON public.email_verifications;
DROP POLICY IF EXISTS "Users can delete own verifications" ON public.email_verifications;
DROP POLICY IF EXISTS "Users can view own verifications" ON public.email_verifications;

-- Recreate with strict policies:
-- INSERT: blocked for clients (only service role via Edge Functions should insert)
CREATE POLICY "No direct insert on verifications"
  ON public.email_verifications FOR INSERT
  TO authenticated
  WITH CHECK (false);

-- UPDATE: blocked (only service role should mark verified)
CREATE POLICY "No direct update on verifications"
  ON public.email_verifications FOR UPDATE
  TO authenticated
  USING (false);

-- DELETE: users can clean up their own
CREATE POLICY "Users can delete own verifications"
  ON public.email_verifications FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- SELECT: users can view their own only
CREATE POLICY "Users can view own verifications"
  ON public.email_verifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());
