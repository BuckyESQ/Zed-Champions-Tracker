// Public DNS test endpoint - no authentication required
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const results = [];
  
  // Test if we can resolve DNS for ZED Champions API
  const testEndpoints = [
    'https://api.zedchampions.com/v1/health',
    'https://api.zedchampions.com',
    'https://pqchju22ku.us-east-1.awsapprunner.com/api/search-horse?name=test'
  ];

  for (const endpoint of testEndpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'User-Agent': 'StableFields-Diagnostics/1.0' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      results.push({
        endpoint,
        status: response.status,
        success: true,
        accessible: true
      });
      
    } catch (error) {
      results.push({
        endpoint,
        success: false,
        error: error.message,
        errorType: error.name,
        accessible: false
      });
    }
  }

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    server_location: process.env.VERCEL_REGION || 'unknown',
    vercel_env: process.env.VERCEL_ENV || 'unknown',
    dns_test_results: results,
    summary: {
      total_tested: testEndpoints.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      zed_api_accessible: results.find(r => r.endpoint.includes('api.zedchampions.com'))?.success || false,
      zedsight_api_accessible: results.find(r => r.endpoint.includes('pqchju22ku'))?.success || false
    },
    note: "This is a public endpoint that doesn't require authentication"
  });
}
