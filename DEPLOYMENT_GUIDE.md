# StableFields ZED Champions Tracker - Deployment Guide

## 🚀 Vercel Deployment (Recommended for Full Features)

Your app is successfully deployed at: **https://zed-champions-tracker.vercel.app**

### ✅ What Works on Vercel:
- **Bearer Token Import** - Import your private racing and breeding horses
- **Race History Analysis** - Full historical race data and analytics
- **Ancestry Tracking** - Bloodline and generation analysis
- **Real-time API Access** - Direct connection to ZED Champions API via proxy
- **All Advanced Features** - Complete predictive analytics suite

### 🔧 How Bearer Token Import Works:

1. **Go to ZED Champions API**: https://api.zedchampions.com/docs
2. **Get Your Bearer Token**:
   - Sign in to ZED Champions
   - Go to API documentation
   - Generate/copy your Bearer token
3. **Import Your Horses**:
   - Open the Vercel app: https://zed-champions-tracker.vercel.app
   - Click on the "Import" tab
   - Paste your Bearer token
   - Click "Test Connection" to verify
   - Use "Import Racing" or "Import Breeding" buttons

### 🧪 Testing Bearer Token Import:

1. **Test API Connection**:
   ```
   Navigate to: https://zed-champions-tracker.vercel.app/cors-test.html
   Enter your Bearer token and test the connection
   ```

2. **Test Import Flow**:
   - Go to the main app
   - Navigate to Import tab
   - Enter Bearer token
   - Click "Test Connection" - should succeed
   - Import racing horses - should load your private horses
   - Check "My Stable" tab to see imported horses

### 🔄 Auto-Deployment:
- Any commits to your GitHub repo automatically deploy to Vercel
- Changes typically deploy within 1-2 minutes
- Check deployment status at: https://vercel.com/david-a-prado-srs-projects/zed-champions-tracker

---

## 📁 Static Hosting (Limited Features)

For static hosting (like FileZilla/FTP), use: `stablefields-standalone.html`

### ⚠️ Limitations of Static Hosting:
- **No Bearer Token Import** - CORS restrictions prevent private API access
- **Public Search Only** - Can only search for horses by name
- **Limited Analytics** - No access to private race history
- **Manual Data Entry** - Must manually search and add horses

### ✅ What Works on Static Hosting:
- Public horse search via ZedSight API
- Basic horse tracking and management
- Export/import stable data (JSON files)
- Local storage persistence

---

## 🏗️ Development Setup

### Prerequisites:
```bash
Node.js 18+ installed
Git installed
```

### Local Development:
```bash
# Clone the repository
git clone https://github.com/david-a-prado-sr/Zed-Champions-Tracker.git
cd Zed-Champions-Tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Project Structure:
```
/pages/api/zed/[...path].js    # API proxy for ZED Champions API
/public/stablefields-tracker.html  # Main app (Vercel version)
/public/stablefields-standalone.html  # Static hosting version
/public/app.js                 # Core application logic
/vercel.json                   # Vercel configuration
/next.config.js               # Next.js configuration
```

---

## 🔧 Configuration Files

### Next.js API Proxy (`/pages/api/zed/[...path].js`):
- Handles CORS headers for browser compatibility
- Forwards Bearer tokens securely to ZED Champions API
- Maps API endpoints (e.g., `horses?type=racing` → `stable/racing`)
- Cleans up malformed horse URLs

### Vercel Configuration (`/vercel.json`):
- Sets up CORS headers for API routes
- Enables clean URLs
- Configures production deployment settings

---

## 📊 Features Comparison

| Feature | Vercel Deployment | Static Hosting |
|---------|------------------|----------------|
| Bearer Token Import | ✅ Yes | ❌ No (CORS) |
| Private Horse Data | ✅ Yes | ❌ No |
| Race History | ✅ Full Access | ❌ Limited |
| Ancestry Analysis | ✅ Complete | ❌ Basic |
| Public Search | ✅ Yes | ✅ Yes |
| Real-time Updates | ✅ Yes | ❌ No |
| Advanced Analytics | ✅ Yes | ❌ Limited |

---

## 🚨 Troubleshooting

### Bearer Token Import Not Working:
1. **Check Token Format**: Remove "Bearer " prefix if present
2. **Verify Token**: Test at https://api.zedchampions.com/docs
3. **Check Network**: Ensure no VPN/firewall blocking API calls
4. **Try CORS Test**: Use `/cors-test.html` for diagnosis

### Deployment Issues:
1. **Vercel Dashboard**: Check https://vercel.com/dashboard
2. **Build Logs**: Review deployment logs for errors
3. **Environment**: Ensure Node.js 18+ compatibility
4. **Dependencies**: Run `npm install` to update packages

### Performance Issues:
1. **Clear Cache**: Clear browser cache and localStorage
2. **Check Network**: Verify stable internet connection
3. **Reduce Data**: Limit number of horses imported at once
4. **Browser Console**: Check for JavaScript errors

---

## 🎯 Next Steps

1. **Test Bearer Token Import**: Verify your token works on Vercel
2. **Import Your Horses**: Use the import functionality to load your stable
3. **Explore Analytics**: Use the predictive features for race analysis
4. **Export Data**: Backup your horse data regularly
5. **Monitor Performance**: Track your horses' racing statistics

---

## 🔗 Links

- **Live App**: https://zed-champions-tracker.vercel.app
- **GitHub Repo**: https://github.com/david-a-prado-sr/Zed-Champions-Tracker
- **Vercel Dashboard**: https://vercel.com/david-a-prado-srs-projects/zed-champions-tracker
- **ZED Champions API**: https://api.zedchampions.com/docs

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Test with the CORS diagnostic tool
3. Verify your Bearer token is valid
4. Check browser console for errors
5. Try both Vercel and static versions to isolate issues

The Vercel deployment is your best option for full functionality with Bearer token import and private horse analytics!
