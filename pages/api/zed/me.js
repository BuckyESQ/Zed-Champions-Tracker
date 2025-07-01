export default async function handler(req, res) {
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
    console.log('ZED /me endpoint called');
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    
    const apiUrl = 'https://api.zedchampions.com/v1/me';
    
    // Headers for the ZED API request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    // Forward authorization header if present
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
      console.log('Authorization header forwarded');
    } else {
      console.log('No authorization header found');
    }

    // Make the request to ZED API
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: headers
    });

    console.log('ZED API response status:', response.status);

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
