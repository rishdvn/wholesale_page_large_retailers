-- Create retail_enquiries table
CREATE TABLE retail_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  bundle_interest TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE retail_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for the contact form)
CREATE POLICY "Allow public inserts" ON retail_enquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all enquiries
CREATE POLICY "Allow authenticated reads" ON retail_enquiries
  FOR SELECT TO authenticated
  USING (true);

-- Add index on created_at for better query performance
CREATE INDEX retail_enquiries_created_at_idx ON retail_enquiries(created_at DESC);

-- Add index on email for lookups
CREATE INDEX retail_enquiries_email_idx ON retail_enquiries(email);
