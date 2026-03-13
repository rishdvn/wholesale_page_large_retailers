-- Create wholesale_enquiries table for Terra Clay wholesale form submissions

CREATE TABLE IF NOT EXISTS public.wholesale_enquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  bundle_interest TEXT,
  message TEXT
);

-- Enable Row Level Security
ALTER TABLE public.wholesale_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for form submissions)
CREATE POLICY "Allow public inserts" ON public.wholesale_enquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Allow service role to read" ON public.wholesale_enquiries
  FOR SELECT TO service_role
  USING (true);

-- Add index on email for faster lookups
CREATE INDEX idx_wholesale_enquiries_email ON public.wholesale_enquiries(email);

-- Add index on created_at for sorting
CREATE INDEX idx_wholesale_enquiries_created_at ON public.wholesale_enquiries(created_at DESC);
