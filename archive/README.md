# Archive Directory Structure

This directory contains archived files from the StableFields ZED Champions Tracker project, organized for better project maintenance.

## Directory Structure

### `/old-versions/`
Contains previous versions of HTML files and legacy implementations:
- `FIXED-stablefields-tracker.html` - Fixed version of the tracker
- `stablefields-tracker.html` - Original tracker implementation  
- `ai-racing-intelligence.html` - AI racing analysis tool
- `basic-enhanced-tracker.html` - Basic enhanced version
- `live-race-center.html` - Live race center implementation
- `zed-live-integration.js` - Live integration JavaScript
- `legacy-tracker.html` - Original legacy tracker

### `/test-files/`
Contains test files, diagnostic tools, and experimental features:
- `ai-simple-test.html` - Simple AI testing interface
- `ai-test.html` - AI functionality tests
- `debug-ai-functions.html` - AI debugging tools
- `horse-diagnostic.html` - Horse data diagnostic tool
- `quick-access.html` - Quick access testing interface
- `search-import.html` - Search and import testing
- `verify-fixes.html` - Fix verification tool
- `emergency-access.html` - Emergency access backup

### `/documentation/`
Contains project documentation and deployment guides:
- `AI-IMPROVEMENTS-COMPLETE.md` - AI improvements documentation
- `DEPLOYMENT-FIXES.md` - Deployment fix documentation
- `DEPLOYMENT-OPTIONS.md` - Deployment options guide
- `DEPLOYMENT-STATUS.md` - Deployment status tracking
- `DEPLOYMENT.md` - Main deployment guide
- `RACE-DATA-FIX-COMPLETE.md` - Race data fix documentation
- `STABLEFIELDS-SYNC-GUIDE.md` - Sync guide for StableFields
- `VERCEL-FIX.md` - Vercel deployment fixes
- `VERCEL-READY.md` - Vercel readiness documentation
- `WORKSPACE-STATUS.md` - Workspace status tracking
- `README-new.md` - New README draft
- `README.md` - Reference documentation
- `zedsight-reference.html` - ZedSight API reference

### `/backup/production-ready/`
Contains backup of the PRODUCTION-READY folder:
- All files that were in the PRODUCTION-READY directory
- Includes completed implementations and upload instructions

## Current Production Structure

The main directory now contains only the essential production files:
- `index.html` - Main application (LIVE version with Bearer Token import)
- `app.js` - Core application JavaScript
- `zed-data-model.js` - ZED Champions data model
- `package.json` - Node.js dependencies
- `vercel.json` - Vercel deployment configuration
- `README.md` - Project documentation
- Standard project files (LICENSE, .gitignore, etc.)

## Notes

- The `index.html` in the root is the current LIVE version with working Bearer Token import functionality
- All test files and old versions are preserved in this archive for reference
- Documentation is organized by category for easy access
- The backup folder preserves the exact state of PRODUCTION-READY before cleanup
