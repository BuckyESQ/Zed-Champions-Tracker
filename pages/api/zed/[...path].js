export default async function handler(req, res) {
  // Extract path from request
  const path = req.query.path || [];
  let apiPath = Array.isArray(path) ? path.join('/') : path;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Only clean up horse URLs if they have the specific malformed patterns
    // Otherwise, pass through all other paths as-is
    if (apiPath.includes('horses/http') || (apiPath.includes('horse/') && !apiPath.startsWith('horses/'))) {
      // Handle malformed horse URLs
      if (apiPath.includes('horse/')) {
        const parts = apiPath.split('horse/');
        const horseId = parts[parts.length - 1].split('/')[0].trim();
        apiPath = `horses/${horseId}`;
      } else if (apiPath.includes('horses/http')) {
        const match = apiPath.match(/horses\/.*\/horse\/([^\/]+)/i);
        if (match && match[1]) {
          apiPath = `horses/${match[1]}`;
        }
      }
    }

    console.log(`Proxying to ZED API: ${apiPath} (original: ${Array.isArray(path) ? path.join('/') : path})`);
    const apiUrl = `https://api.zedchampions.com/v1/${apiPath}`;
    
    // Headers for the ZED API request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    // Forward authorization header if present
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    // Make the request to ZED API
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' && req.body ? 
        JSON.stringify(req.body) : undefined
    });

    // Get response data
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return res.status(response.status).json(data);
    } else {
      const text = await response.text();
      return res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ 
      error: error.message,
      detail: "Error connecting to ZED Champions API"
    });
  }
}
// This API route acts as a proxy to the ZED Champions API, handling CORS and path normalization.
// It cleans up horse IDs from URLs, forwards requests, and returns the response from the ZED API.
// It also handles OPTIONS requests for CORS preflight checks.