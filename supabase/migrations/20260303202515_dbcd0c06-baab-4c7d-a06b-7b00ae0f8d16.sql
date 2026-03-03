
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-covers', 'blog-covers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read blog covers" ON storage.objects FOR SELECT USING (bucket_id = 'blog-covers');
CREATE POLICY "Service role can upload blog covers" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-covers');
CREATE POLICY "Service role can update blog covers" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-covers');
