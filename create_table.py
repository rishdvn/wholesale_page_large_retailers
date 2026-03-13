import requests
import json

# Supabase credentials
SUPABASE_URL = "https://jzxqumcxyufxewmrpgkr.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHF1bWN4eXVmeGV3bXJwZ2tyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI2MDQ5NiwiZXhwIjoyMDg4ODM2NDk2fQ.Z8Eakbo0hgcexB1B9mYRU2wvPK4sRoRDc6y9CMtoUfI"

# SQL to create the table
sql = """
-- Create wholesale_enquiries table
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON public.wholesale_enquiries;
DROP POLICY IF EXISTS "Allow service role to read" ON public.wholesale_enquiries;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON public.wholesale_enquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Allow service role to read" ON public.wholesale_enquiries
  FOR SELECT TO service_role
  USING (true);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_wholesale_enquiries_email ON public.wholesale_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_wholesale_enquiries_created_at ON public.wholesale_enquiries(created_at DESC);
"""

# Execute SQL via Supabase REST API
url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
headers = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json"
}

# Try using the query endpoint
query_url = f"{SUPABASE_URL}/rest/v1/"
headers_query = {
    "apikey": SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

print("Creating wholesale_enquiries table...")

# Use psycopg2 approach via local connection
import urllib.parse

# Encode the SQL
encoded_sql = urllib.parse.quote(sql)

# Try using curl directly
print("\nExecuting SQL to create table...")
print("Table: wholesale_enquiries")
print("Fields: business_name, contact_name, email, phone, bundle_interest, message")
