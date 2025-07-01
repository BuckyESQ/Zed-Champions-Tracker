export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const results = [];
  
  // Test endpoints to try
  const testEndpoints = [
    'https://api.zedchampions.com/v1/health',
    'https://api.zedchampions.com/v1/horses',
    'https://api.zedchampions.com',
  ];

  for (const endpoint of testEndpoints) {
    try {
      console.log(`Testing endpoint: ${endpoint}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'StableFields-Tracker/1.0'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      results.push({
        endpoint,
        status: response.status,
        success: true,
        headers: Object.fromEntries(response.headers.entries())
      });
      
    } catch (error) {
      results.push({
        endpoint,
        success: false,
        error: error.message,
        errorType: error.name
      });
    }
  }

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    server_location: process.env.VERCEL_REGION || 'unknown',
    dns_test_results: results,
    summary: {
      total_tested: testEndpoints.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    }
  });
}
