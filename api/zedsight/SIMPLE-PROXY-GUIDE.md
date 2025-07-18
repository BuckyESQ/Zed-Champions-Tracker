# Simple PHP Proxy Implementation

If the standard proxy setup doesn't work on your hosting, try this simpler approach:

## 1. Update the API endpoint in index.html

Find this code in your `index.html`:

```javascript
// ZedSight API Integration via PHP CORS Proxy
const ZEDSIGHT_API = 'https://pqchju22ku.us-east-1.awsapprunner.com';
const VERCEL_PROXY = '/api/zedsight'; // API proxy endpoint
const USE_DIRECT_API = false; // Set to false to always use proxy
const DEBUG_MODE = true; // Enable detailed logging
```

And replace it with:

```javascript
// ZedSight API Integration via Simple PHP Proxy
const ZEDSIGHT_API = 'https://pqchju22ku.us-east-1.awsapprunner.com';
const VERCEL_PROXY = '/api/zedsight/simple-proxy.php?endpoint='; // Simple PHP proxy
const USE_DIRECT_API = false; // Set to false to always use proxy
const DEBUG_MODE = true; // Enable detailed logging
```

## 2. Update all fetch calls in index.html

Replace all instances like:

```javascript
fetch(`${VERCEL_PROXY}/search-horse?name=${encodeURIComponent(searchTerm)}`, {
```

With:

```javascript
fetch(`${VERCEL_PROXY}search-horse&name=${encodeURIComponent(searchTerm)}`, {
```

Note that the `?` in the URL becomes `&` since we're already using a query parameter (`endpoint=`) in the proxy URL.

## 3. Remove the .htaccess file

This simplified approach doesn't require `.htaccess` or URL rewriting.

## 4. Upload only simple-proxy.php

You only need to upload:
- `simple-proxy.php` to `/api/zedsight/` directory

## 5. Test the proxy directly

You can test if the proxy works by accessing:
`https://yourdomain.com/api/zedsight/simple-proxy.php?endpoint=search-horse&name=test`
