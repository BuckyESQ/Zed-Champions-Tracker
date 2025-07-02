# 🏇 StableFields Deployment Instructions

## Download & Upload Via FileZilla

To deploy to stablefields.com, follow these steps:

### 1. Download these files from GitHub Codespace:

**Root folder files:**
- `/workspaces/Zed-Champions-Tracker/public/stablefields-tracker.html` (Main tracker app)
- `/workspaces/Zed-Champions-Tracker/public/search-import.html` (Import wizard)
- `/workspaces/Zed-Champions-Tracker/public/ai-racing-intelligence.html` (AI racing intelligence)
- `/workspaces/Zed-Champions-Tracker/public/app.js` (Core JavaScript)
- `/workspaces/Zed-Champions-Tracker/public/quick-access.html` (Navigation menu)

**Additional files for enhanced features:**
- `/workspaces/Zed-Champions-Tracker/public/horse-data-inspector.html` (Data inspector tool)
- `/workspaces/Zed-Champions-Tracker/public/stable-test.html` (Stable test tool)
- `/workspaces/Zed-Champions-Tracker/stablefields-deploy/index.html` (Main redirect page)

### 2. Upload via FileZilla:

**In your stablefields.com hosting:**
1. Upload `index.html` to the **root directory**
2. Create a `/public` folder in the root directory
3. Upload all other HTML and JS files to the `/public` folder

### 3. Directory Structure:

Your hosting should have this structure:
```
stablefields.com/
├── index.html
└── public/
    ├── stablefields-tracker.html
    ├── search-import.html
    ├── ai-racing-intelligence.html
    ├── app.js
    ├── quick-access.html
    └── ... (other files)
```

### 4. IMPORTANT: Production Setup 

The application is already configured to automatically use your Vercel API proxy endpoints when accessed from stablefields.com, so no additional configuration is needed.

### 5. Testing After Deployment

1. Visit your domain: https://stablefields.com
2. It should automatically redirect to the main tracker
3. Check "My Stable" tab to verify your 17 horses appear
4. Test the Import Wizard and AI Racing Intelligence features

## Vercel API Proxy

Your Vercel deployment at https://zed-champions-tracker.vercel.app will handle all API proxy functionality automatically.
