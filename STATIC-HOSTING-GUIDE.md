# 🚀 **StableFields Static Hosting Setup**

## 📁 **Files to Upload via FileZilla:**

### **Required Files:**
1. **`index.html`** - Rename `index-standalone.html` to `index.html`
2. **`stablefields-standalone.html`** - The main application

### **Optional Files:**
- **`favicon.ico`** - Your custom icon (optional)
- **`robots.txt`** - For SEO (optional)

---

## 🌐 **Upload Instructions:**

### **Step 1: Prepare Files**
1. Download/copy these files from the project:
   - `index-standalone.html` → **rename to** `index.html`
   - `stablefields-standalone.html` → **keep name**

### **Step 2: Upload via FileZilla**
1. **Connect to your hosting** via FileZilla
2. **Navigate to your domain's root folder** (usually `public_html`, `www`, or similar)
3. **Upload both files** to the root directory
4. **Set permissions** (usually 644 for files)

### **Step 3: Test Your Site**
1. **Visit**: `https://stablefields.com`
2. **Should see**: Welcome page with "Launch Application" button
3. **Click button**: Takes you to the full tracker application

---

## ✅ **What This Standalone Version Includes:**

### **✅ Working Features:**
- 🔍 **Horse Search** - Uses ZedSight API (reliable)
- 🏠 **Personal Stable** - Add/remove horses locally
- 📊 **Basic Analytics** - Win rates, horse counts
- 💾 **Data Management** - Import/export stable data
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Professional StableFields interface

### **⚠️ Limited Features:**
- 🔑 **Bearer Token Import** - Not available (requires server)
- 📈 **Advanced Analytics** - Basic stats only
- 🔄 **Real-time Sync** - Data stored locally

---

## 🔧 **How It Works:**

### **Data Storage:**
- All data stored in **browser localStorage**
- **Export/import** functionality for backups
- **No server required** - completely client-side

### **API Integration:**
- **ZedSight API** - For horse search and public data
- **Direct ZED Champions API** - Will show "not available" on static hosting
- **Graceful fallbacks** - App works even when APIs are limited

### **User Experience:**
1. **Search horses** by name using ZedSight
2. **Add horses** to personal stable with one click
3. **View analytics** and manage your collection
4. **Export data** for backup/sharing

---

## 🎯 **Perfect for:**
- ✅ **Static web hosting** (shared hosting, GitHub Pages, etc.)
- ✅ **No server management** required
- ✅ **Quick deployment** - just upload 2 files
- ✅ **Personal horse tracking** and stable management
- ✅ **Mobile-friendly** usage

---

## 🆘 **If You Need Help:**

### **Common Issues:**
- **Site not loading?** Check file permissions (644)
- **Styling broken?** Ensure files uploaded to correct directory
- **Search not working?** Check internet connection and CORS

### **File Structure Should Be:**
```
stablefields.com/
├── index.html              (landing page)
└── stablefields-standalone.html   (main app)
```

---

## 🎉 **You're Ready!**

Once uploaded, your StableFields tracker will be live at:
- **Landing**: `https://stablefields.com`
- **App**: `https://stablefields.com/stablefields-standalone.html`

**No complex setup, no server configuration, no API proxy issues!** 🚀
