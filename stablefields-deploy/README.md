# StableFields ZED Champions Tracker - Deployment Package

## Deployment Instructions for stablefields.com

### FileZilla Setup

1. **Connect to your web hosting**:
   - Host: Your hosting FTP address (e.g., ftp.stablefields.com)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (default FTP port)

2. **Upload Files**:
   - Upload ALL files in this folder to the root directory of your hosting
   - Maintain the same folder structure as in this package

### Files & Structure

- `index.html` - Main redirect page (place in root directory)
- `/public/` - Contains all application files:
  - `stablefields-tracker.html` - Main application
  - `search-import.html` - Import Wizard
  - `ai-racing-intelligence.html` - AI Racing Intelligence
  - `app.js` - Core application logic
  - Other HTML & support files

### Testing After Deployment

1. Visit https://stablefields.com
2. You should be automatically redirected to the tracker
3. Verify that all your horses appear in "My Stable"
4. Confirm that the Import Wizard works by testing a search

### Important Notes

- This is a client-side application that stores data in your browser's localStorage
- No server-side database is used - all horse data is stored locally in the browser
- For API requests to ZED Champions, the application is configured to use the Vercel proxy endpoints

For technical support, contact me via Discord.

## Vercel Integration

Your Vercel deployment at https://zed-champions-tracker.vercel.app will handle all API proxy functionality for:
- Bearer token authentication
- Cross-origin requests
- API routing

The website and Vercel deployment work together to provide a complete solution.
