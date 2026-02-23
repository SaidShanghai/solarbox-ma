-- Drop the broken policy that queries auth.users
DROP POLICY IF EXISTS "Users can view own quote requests by email" ON public.quote_requests;

-- Recreate using auth.jwt() which doesn't require access to auth.users table
CREATE POLICY "Users can view own quote requests by email"
  ON public.quote_requests
  FOR SELECT
  USING (client_email = (auth.jwt() ->> 'email')::text);