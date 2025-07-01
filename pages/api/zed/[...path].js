export default async function handler(req, res) {
  // Extract path from request
  const path = req.query.path || [];
  let apiPath = Array.isArray(path) ? path.join('/') : path;
  
  // Add query string parameters if they exist
  if (req.url && req.url.includes('?')) {
    const urlParts = req.url.split('?');
    if (urlParts[1]) {
      const queryString = urlParts[1];
      // Remove Next.js internal parameters and keep ZED API parameters
      const cleanQuery = queryString.replace(/path=[^&]*/g, '').replace(/&&/g, '&').replace(/^&|&$/g, '');
      if (cleanQuery) {
        apiPath += (apiPath.includes('?') ? '&' : '?') + cleanQuery;
      }
    }
  }
  
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

    // Fix common endpoint mapping issues
    if (apiPath === 'horses?type=racing') {
      apiPath = 'stable/racing';
    } else if (apiPath === 'horses?type=breeding') {
      apiPath = 'stable/breeding';
    }

    console.log(`Proxying to ZED API: ${apiPath} (original: ${Array.isArray(path) ? path.join('/') : path})`);
    console.log(`Method: ${req.method}`);
    console.log(`Has Authorization: ${!!req.headers.authorization}`);
    console.log(`Full URL: ${req.url}`);
    
    // Validate that we have an authorization header for protected endpoints
    const protectedEndpoints = ['me', 'stable/racing', 'stable/breeding', 'horses'];
    const isProtectedEndpoint = protectedEndpoints.some(endpoint => apiPath.startsWith(endpoint));
    
    if (isProtectedEndpoint && !req.headers.authorization) {
      return res.status(401).json({
        error: 'Authorization required',
        detail: `The endpoint '${apiPath}' requires a Bearer token. Please provide an Authorization header.`,
        required_header: 'Authorization: Bearer YOUR_TOKEN_HERE'
      });
    }
    
    // Headers for the ZED API request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    // Forward authorization header if present
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    // Try multiple endpoints with DNS fallback
    const endpoints = [
      `https://api.zedchampions.com/v1/${apiPath}`,
      // IP fallback (if we can resolve the IP)
      // `https://104.21.35.179/v1/${apiPath}`, // Example IP, would need actual
      // Alternative: use a different proxy or CDN endpoint
    ];

    let lastError = null;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Attempting API call to: ${endpoint}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(endpoint, {
          method: req.method,
          headers: {
            ...headers,
            // Add Host header for IP-based requests
            ...(endpoint.includes('api.zedchampions.com') ? {} : { 'Host': 'api.zedchampions.com' })
          },
          body: req.method !== 'GET' && req.method !== 'HEAD' && req.body ? 
            JSON.stringify(req.body) : undefined,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        // Get response data
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(`Success with endpoint: ${endpoint}`);
          return res.status(response.status).json(data);
        } else {
          const text = await response.text();
          console.log(`Success with endpoint: ${endpoint}`);
          return res.status(response.status).send(text);
        }
      } catch (error) {
        console.error(`Failed with endpoint ${endpoint}:`, error.message);
        lastError = error;
        continue; // Try next endpoint
      }
    }

    // If all endpoints failed, return error with diagnostic info
    console.error('All API endpoints failed. Last error:', lastError);
    return res.status(500).json({ 
      error: lastError?.message || 'DNS Resolution Failed',
      detail: "Unable to connect to ZED Champions API. This may be a temporary DNS issue.",
      diagnostic: {
        endpoints_tried: endpoints,
        path: apiPath,
        method: req.method,
        has_auth: !!req.headers.authorization
      }
    });
  } catch (error) {
    console.error('Outer API proxy error:', error);
    return res.status(500).json({ 
      error: error.message,
      detail: "Unexpected error in API proxy"
    });
  }
}
// This API route acts as a proxy to the ZED Champions API, handling CORS and path normalization.
// It cleans up horse IDs from URLs, forwards requests, and returns the response from the ZED API.
// It also handles OPTIONS requests for CORS preflight checks.