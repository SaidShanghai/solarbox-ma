-- Add operational tracking columns to companies
ALTER TABLE public.companies
  ADD COLUMN IF NOT EXISTS projects_assigned integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS projects_completed integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS projects_in_progress integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS quality_score numeric(2,1) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS avg_execution_days integer DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS operational_status text NOT NULL DEFAULT 'actif',
  ADD COLUMN IF NOT EXISTS status_changed_at timestamp with time zone DEFAULT now(),
  ADD COLUMN IF NOT EXISTS admin_notes text DEFAULT NULL;
