const https = require('https');

const supabaseUrl = 'jzxqumcxyufxewmrpgkr.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6eHF1bWN4eXVmeGV3bXJwZ2tyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI2MDQ5NiwiZXhwIjoyMDg4ODM2NDk2fQ.Z8Eakbo0hgcexB1B9mYRU2wvPK4sRoRDc6y9CMtoUfI';

const sqlStatements = [
  `CREATE TABLE IF NOT EXISTS retail_enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    store_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    bundle_interest TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`,
  `ALTER TABLE retail_enquiries ENABLE ROW LEVEL SECURITY`,
  `DROP POLICY IF EXISTS "Allow public inserts" ON retail_enquiries`,
  `DROP POLICY IF EXISTS "Allow authenticated reads" ON retail_enquiries`,
  `CREATE POLICY "Allow public inserts" ON retail_enquiries FOR INSERT TO anon WITH CHECK (true)`,
  `CREATE POLICY "Allow authenticated reads" ON retail_enquiries FOR SELECT TO authenticated USING (true)`,
  `CREATE INDEX IF NOT EXISTS retail_enquiries_created_at_idx ON retail_enquiries(created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS retail_enquiries_email_idx ON retail_enquiries(email)`
];

async function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: supabaseUrl,
      port: 443,
      path: '/rest/v1/rpc/exec_sql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'return=minimal'
      }
    };

    const postData = JSON.stringify({ query: sql });

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data });
        } else {
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function createTable() {
  console.log('🔨 Creating retail_enquiries table in Supabase...\n');

  for (const sql of sqlStatements) {
    try {
      const result = await executeSQL(sql);
      if (result.success) {
        console.log('✅ Executed:', sql.substring(0, 50) + '...');
      } else {
        console.log('⚠️  Status:', result.status, '- SQL:', sql.substring(0, 50));
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }

  console.log('\n🎉 Table setup complete!');
  console.log('🌐 Test the form at: http://localhost:3000\n');
}

createTable();
