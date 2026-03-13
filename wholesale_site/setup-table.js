const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.jzxqumcxyufxewmrpgkr:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHF1bWN4eXVmeGV3bXJwZ2tyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI2MDQ5NiwiZXhwIjoyMDg4ODM2NDk2fQ.Z8Eakbo0hgcexB1B9mYRU2wvPK4sRoRDc6y9CMtoUfI@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
});

async function setupTable() {
  try {
    console.log('🔗 Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected!\n');

    console.log('🔨 Creating retail_enquiries table...');

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS retail_enquiries (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        store_name TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        bundle_interest TEXT,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Table created!');

    // Enable RLS
    await client.query(`ALTER TABLE retail_enquiries ENABLE ROW LEVEL SECURITY;`);
    console.log('✅ Row Level Security enabled!');

    // Drop existing policies if they exist
    await client.query(`DROP POLICY IF EXISTS "Allow public inserts" ON retail_enquiries;`);
    await client.query(`DROP POLICY IF EXISTS "Allow authenticated reads" ON retail_enquiries;`);

    // Create policies
    await client.query(`
      CREATE POLICY "Allow public inserts" ON retail_enquiries
        FOR INSERT TO anon
        WITH CHECK (true);
    `);
    console.log('✅ Insert policy created!');

    await client.query(`
      CREATE POLICY "Allow authenticated reads" ON retail_enquiries
        FOR SELECT TO authenticated
        USING (true);
    `);
    console.log('✅ Read policy created!');

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS retail_enquiries_created_at_idx
      ON retail_enquiries(created_at DESC);
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS retail_enquiries_email_idx
      ON retail_enquiries(email);
    `);
    console.log('✅ Indexes created!');

    console.log('\n🎉 Setup complete! The retail_enquiries table is ready!');
    console.log('🌐 Test the contact form at: http://localhost:3000\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

setupTable();
