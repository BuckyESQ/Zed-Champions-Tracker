# Ultra Simple API Proxy for ZED Champions

This solution uses an ultra-simple approach to fix the CORS issues with the ZedSight API.

## What to Upload

Upload these files to your root directory on stablefields.com:

1. Core Files (Main App):
   - `index.html` - Main application
   - `app.js` - Application JavaScript
   - `zed-data-model.js` - Data model
   - `favicon.ico` - Site icon
   - `.htaccess` - Server configuration

2. API Proxy (Single File):
   - `api_proxy.php` - The ultra simple PHP proxy

3. Testing Tools:
   - `simple-test.html` - Test the proxy

## How It Works

1. When your app needs to make an API request, it calls:
   ```
   /api_proxy.php?endpoint=search-horse&name=test
   ```

2. The proxy forwards the request to ZedSight and returns the result.

3. No complex directory structure or URL routing required!

## Testing

1. Open `simple-test.html` on your server
2. Click "Test Search via Proxy" to check that the proxy works
3. Enter your Bearer Token and click "Test With Token" to verify token works

## Troubleshooting

If you encounter issues:

1. Check that PHP is enabled on your server
2. Make sure the cURL extension is enabled
3. Check file permissions on `api_proxy.php` (644 should work)

## Why This Works

The ultra-simple approach uses:
- Just one PHP file
- No complex folder structure
- No .htaccess requirements
- Standard PHP that works everywhere

This is the most compatible solution that will work on virtually any PHP hosting.
