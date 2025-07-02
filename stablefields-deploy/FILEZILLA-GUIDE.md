# 🏇 StableFields FileZilla Upload Guide

## Files to Upload

Here's what you need to upload to your stablefields.com hosting using FileZilla:

### Root Directory Files
- `index.html` - Main redirect page (upload to root of stablefields.com)
- `README.md` - This file (no need to upload)
- `fix-links.sh` - Helper script (no need to upload)

### Public Directory
Upload the entire `/public` directory to the root of stablefields.com

Your final structure on the web server should be:
```
stablefields.com/
  ├── index.html
  └── public/
      ├── stablefields-tracker.html (main app)
      ├── search-import.html
      ├── ai-racing-intelligence.html
      ├── app.js
      └── ... (other support files)
```

## FileZilla Instructions

1. **Connect to your hosting** with your FTP credentials
2. **Local site:** Navigate to `/workspaces/Zed-Champions-Tracker/stablefields-deploy`
3. **Remote site:** Navigate to the root directory of your hosting
4. **Upload:** 
   - `index.html` to the root directory
   - `public/` folder and all its contents to the root directory

## Vercel Integration

Remember that your API proxy is already set up at:
https://zed-champions-tracker.vercel.app/

The client-side code is automatically configured to use the proxy APIs when accessed from stablefields.com.

## After Upload

1. Visit https://stablefields.com
2. You should be redirected to stablefields.com/public/stablefields-tracker.html
3. Your 17 horses should appear in "My Stable" tab
4. All features (AI Racing Intelligence, Breeding, etc.) should work correctly
