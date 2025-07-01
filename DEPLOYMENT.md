# 🚀 Deployment Guide

This guide explains how to deploy the ZED Champions Tracker in various environments.

## Production File

**Main Application**: `/stablefields-tracker.html`
- ✅ Fully functional, modern tracker
- ✅ Professional UI with proper error handling  
- ✅ Import/export features working
- ✅ ~46KB - Fast loading
- ✅ No external dependencies (except CDN libraries)

## Quick Deployment Options

### 1. Static Hosting (Recommended)

**For platforms like Netlify, Vercel, GitHub Pages:**

```bash
# Simply upload stablefields-tracker.html as your main file
# It's completely self-contained
```

**File to deploy**: `stablefields-tracker.html`

### 2. Next.js App (Full Stack)

**For platforms that support Node.js:**

```bash
npm install
npm run build
npm start
```

**Routes available**:
- `/` → Redirects to main tracker
- `/app` → Main tracker  
- `/tracker` → Main tracker
- `/legacy` → Legacy version (archive)

### 3. Simple HTTP Server (Local/Testing)

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

Then visit: `http://localhost:8080/stablefields-tracker.html`

## Environment Variables (Optional)

For Next.js deployment, create `.env.local`:

```env
# Optional: Custom API endpoints
ZED_API_BASE_URL=https://api.zedchampions.com/v1
ZEDSIGHT_API_BASE_URL=https://pqchju22ku.us-east-1.awsapprunner.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Security Headers

The Next.js version includes security headers. For static hosting, add these to your platform:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Performance Tips

1. **CDN**: The tracker uses CDN for external libraries (Chart.js, Font Awesome)
2. **Caching**: Static assets can be cached aggressively
3. **Compression**: Enable gzip/brotli compression for faster loading
4. **HTTPS**: Always deploy over HTTPS for API security

## Monitoring

- Check browser console for any API connection issues
- Monitor localStorage usage for user data persistence
- Test import functionality with valid ZED Champions API tokens

## Support

For issues or questions:
- Check the archive/legacy files for reference implementations
- Review the reference folder for API integration examples
- Ensure all external CDN libraries are accessible
