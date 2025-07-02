# StableFields.com Upload Instructions

## FileZilla Upload Steps

1. **Connect to your web hosting**:
   - Host: your-host (from your web hosting provider)
   - Username: your-username
   - Password: your-password
   - Port: 21 (or as specified by your host)

2. **Upload Files**:
   - Upload all files from this folder to the root of your website
   - Make sure to maintain the directory structure (keep files in the `/public/` folder)

3. **Important URLs After Upload**:
   - Main Application: `https://stablefields.com/public/stablefields-tracker.html`
   - Import Wizard: `https://stablefields.com/public/search-import.html`
   - Quick Access: `https://stablefields.com/public/quick-access.html`
   - AI Racing Intelligence: `https://stablefields.com/public/ai-racing-intelligence.html`

## API Configuration Notes

The static site relies on the Vercel deployment for API functionality:
- API Base URL: `https://zed-champions-tracker.vercel.app/api/`
- All API requests from the static site will proxy through Vercel

## Checking That Everything Works

After uploading, verify these functions:
1. Open `https://stablefields.com/public/stablefields-tracker.html`
2. Check that your horses load in "My Stable" tab
3. Test the Import Wizard by searching for horses
4. Verify AI Racing Intelligence loads

## Troubleshooting

If API calls fail, make sure:
1. Vercel deployment is working
2. CORS headers are properly set in vercel.json
3. All file paths correctly use `/public/` prefix
