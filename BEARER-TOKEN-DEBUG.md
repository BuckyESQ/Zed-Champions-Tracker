# 🔧 Bearer Token Import Troubleshooting Guide

## Current Status: DEBUG MODE ACTIVE

The app now has extensive debugging to help identify why Bearer Token import isn't working.

## How to Test

### 1. Upload These Files to Your Server:
```
✅ index.html (with debug mode)
✅ app.js  
✅ zed-data-model.js
✅ favicon.ico
✅ .htaccess
✅ api/zedsight/[...path].js (Vercel proxy)
```

### 2. Test Your Bearer Token:
1. Open your browser console (F12)
2. Paste your Bearer Token in the app
3. In console, type: `testBearerToken()`
4. This will show detailed debug information

## Debug Information to Check

### Console Logs Will Show:
- `[ZED DEBUG]` - Detailed request/response info
- Token length and preview
- API endpoint URLs being called
- Response status codes
- Full error messages

### Key Things to Look For:

#### ✅ Success Indicators:
- "Response status: 200"
- "Response ok: true" 
- "✅ Success! Data received:"

#### ❌ Failure Indicators:
- CORS errors (need Vercel proxy)
- 401/403 errors (invalid Bearer Token)
- 404 errors (wrong API endpoint)
- Network errors (connection issues)

## Common Issues & Solutions

### 1. CORS Error
**Problem:** `Access to fetch at '...' has been blocked by CORS policy`
**Solution:** Vercel proxy not working, check server configuration

### 2. 401 Unauthorized
**Problem:** `Response status: 401`
**Solution:** Bearer Token is invalid or expired

### 3. 404 Not Found  
**Problem:** `Response status: 404`
**Solution:** API proxy not deployed correctly

### 4. Network Error
**Problem:** `Failed to fetch` or `ERR_NAME_NOT_RESOLVED`
**Solution:** Server/DNS issues

## Next Steps Based on Test Results

### If testBearerToken() Shows:
- **200 Success:** Bearer Token works, issue is in import logic
- **CORS Error:** Need to deploy Vercel proxy properly  
- **401 Error:** Need fresh Bearer Token from ZED Champions
- **404 Error:** API proxy missing or misconfigured
- **Network Error:** Server/hosting issues

## Vercel Deployment

If traditional hosting doesn't work, deploy to Vercel:
1. Connect GitHub repo to Vercel
2. Deploy entire project  
3. Vercel will handle the serverless proxy automatically

## Manual Testing Commands

In browser console after loading the page:
```javascript
// Test if proxy is available
fetch('/api/zedsight/my-stable').then(r => console.log('Proxy status:', r.status));

// Test with your token
testBearerToken();

// Check saved token
console.log('Saved token:', localStorage.getItem('zed_bearer_token'));
```

## Contact Info
When reporting issues, please include:
- Console debug output from testBearerToken()
- Full error messages
- Browser and hosting provider
- Whether Vercel proxy is deployed
