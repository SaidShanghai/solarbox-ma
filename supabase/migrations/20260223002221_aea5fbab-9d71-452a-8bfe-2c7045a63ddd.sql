CREATE POLICY "Users can view own quote requests by email"
ON public.quote_requests
FOR SELECT
USING (client_email = (SELECT email FROM auth.users WHERE id = auth.uid()));