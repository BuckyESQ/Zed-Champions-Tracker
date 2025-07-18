# PHP API Proxy for ZedSight

This PHP proxy allows your website to access the ZedSight API without CORS issues on standard PHP hosting.

## How It Works

1. Browser makes request to `/api/zedsight/[endpoint]`
2. The request is routed to `proxy.php` 
3. `proxy.php` forwards the request to the real ZedSight API
4. The response is returned with proper CORS headers

## Files

- `proxy.php` - The main proxy script
- `index.php` - Entry point that includes the proxy
- `.htaccess` - Apache configuration for URL routing

## Usage

The front-end code is already configured to use this proxy. It uses:

```javascript
const VERCEL_PROXY = '/api/zedsight';
```

And then makes fetch requests like:

```javascript
fetch(`${VERCEL_PROXY}/search-horse?name=${encodeURIComponent(searchTerm)}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
```

## Troubleshooting

If you're seeing 404 errors:

1. Make sure the `/api/zedsight/` directory exists on your server
2. Verify that `proxy.php`, `index.php` and `.htaccess` are uploaded
3. Check that your server supports `.htaccess` and mod_rewrite
4. Try accessing `/api/zedsight/proxy.php` directly to test
5. Check server error logs for more information

## Common Errors

- 404 Not Found: API endpoint missing or `.htaccess` not working
- 500 Server Error: PHP configuration issue or cURL not enabled
- CORS errors: Headers not being properly set

## PHP Requirements

- PHP 5.6 or higher
- cURL extension enabled
- mod_rewrite (for Apache servers)
