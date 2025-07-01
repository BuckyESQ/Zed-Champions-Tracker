// Public health check endpoint that doesn't require authentication
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

  // Simple health check - no authentication required
  return res.status(200).json({
    status: 'healthy',
    message: 'StableFields API is working!',
    timestamp: new Date().toISOString(),
    server: 'vercel',
    version: '1.0.0',
    endpoints: {
      public: [
        '/api/health',
        '/api/public/status'
      ],
      authenticated: [
        '/api/zed/me',
        '/api/zed/racing',
        '/api/zed/breeding'
      ]
    }
  });
}
