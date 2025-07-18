// Vercel API route to proxy ZedSight API and bypass CORS
export default async function handler(req, res) {
  // Enable CORS for your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Extract the API path from query parameters
    const { path, ...queryParams } = req.query;
    
    if (!path || path.length === 0) {
      return res.status(400).json({ error: 'API path is required' });
    }
    
    // Reconstruct the full path
    const apiPath = Array.isArray(path) ? path.join('/') : path;
    
    // Build query string from remaining parameters
    const queryString = new URLSearchParams();
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key]) {
        queryString.append(key, queryParams[key]);
      }
    });
    
    const zedsightUrl = `https://pqchju22ku.us-east-1.awsapprunner.com/api/${apiPath}${queryString.toString() ? '?' + queryString.toString() : ''}`;
    
    // Forward headers from the original request
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Include Authorization header if present
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }
    
    console.log(`Proxying request to: ${zedsightUrl}`);
    console.log(`Headers: ${JSON.stringify(headers)}`);
    
    // Make the request to ZedSight API
    const response = await fetch(zedsightUrl, {
      method: req.method,
      headers: headers,
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });
    
    if (!response.ok) {
      console.error(`ZedSight API error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ 
        error: `ZedSight API error: ${response.status} ${response.statusText}`,
        url: zedsightUrl
      });
    }
    
    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy server error', 
      details: error.message 
    });
  }
}
