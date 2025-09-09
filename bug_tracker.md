# Bug Tracker

## 🟢 RESOLVED - LOCAL DEVELOPMENT (September 8, 2025)

### Tauri Compilation Performance Issue (CRITICAL)
**Status**: 🟢 FIXED - CONVERTED TO WEB-ONLY  
**Date Fixed**: September 8, 2025  
**Issue**: Tauri desktop compilation taking too long, causing high CPU/memory usage and system freezes  
**Root Cause**: Rust toolchain compilation overhead for desktop features not essential for core functionality  
**Solution**: Converted entire application to web-only architecture  
**Files Modified**:
- Removed `/src-tauri/` directory entirely
- Updated `package.json` (removed Tauri dependencies and scripts)
- Modified `src/lib/tauri.ts` (web-only localStorage implementation)
- Fixed TypeScript errors from Tauri API removals
- Optimized `vite.config.ts` for web deployment

### Tauri Import Errors After Conversion
**Status**: 🟢 FIXED  
**Date Fixed**: September 8, 2025  
**Issue**: Application failed to load due to missing `@tauri-apps/api/core` imports  
**Solution**: Replaced all Tauri functions with web-compatible localStorage versions  
**Files Modified**:
- `src/lib/tauri.ts` - Removed Tauri imports, implemented web-only functions
- `src/components/OverlayTimer.tsx` - Fixed useRef TypeScript errors
- `src/components/Teleprompter.tsx` - Fixed useRef initialization
- `src/pages/OverlayRoute.tsx` - Removed unused imports

### TypeScript Compilation Errors
**Status**: 🟢 FIXED  
**Date Fixed**: September 8, 2025  
**Issue**: Multiple TypeScript errors preventing successful build  
**Solution**: Fixed useRef initializations and removed unused imports  
**Technical Details**: useRef hooks needed proper initial values for TypeScript strict mode

---

## 🟢 RESOLVED - DEPLOYED TO PRODUCTION (Previous Session)

### Asset Loading Issue (CRITICAL)
**Status**: 🟢 FIXED & DEPLOYED  
**Date Fixed**: September 8, 2025  
**Issue**: React app loaded as blank page with 404 errors for JavaScript assets  
**Root Cause**: Nginx `proxy_pass` with trailing slash was stripping `/app/` path prefix  
**Solution**: Removed trailing slash from `proxy_pass http://localhost:3005;` configuration  
**Files Modified**:
- `/etc/nginx/sites-available/focus-cue` (on VPS)
- `vite.config.ts` (confirmed `base: '/app/'` setting)

### URL Redirects Issue  
**Status**: 🟢 FIXED & DEPLOYED  
**Date Fixed**: September 8, 2025  
**Issue**: "Try Free" buttons redirected to wrong domain (focuscue.app instead of focus-cue.com)  
**Solution**: Updated all URLs in index.html and version.ts  
**Files Modified**:
- `/var/www/focus-cue/website/index.html` (on VPS)
- `src/lib/version.ts` (upgrade URL)

### Port Configuration Issue
**Status**: 🟢 FIXED & DEPLOYED  
**Date Fixed**: September 8, 2025  
**Issue**: React app running on wrong port (5173 instead of 3005)  
**Solution**: Updated PM2 command to use correct Vite syntax  
**Command**: `pm2 start "npx vite --port 3005" --name "focuscue-app"`

### Infinite Redirect Loop
**Status**: 🟢 FIXED & DEPLOYED  
**Date Fixed**: September 8, 2025  
**Issue**: ERR_TOO_MANY_REDIRECTS when accessing /app route  
**Root Cause**: Vite `base: '/app/'` causing redirect when path was stripped by proxy  
**Solution**: Fixed Nginx proxy configuration to preserve full path  

---

## 🔵 MONITORING

### Performance
- **Status**: ✅ GOOD
- **Load Time**: Landing page < 2s, App < 3s
- **PM2 Process**: Stable, no crashes reported

### SSL Certificate
- **Status**: ✅ ACTIVE  
- **Expires**: December 7, 2025
- **Auto-Renewal**: Configured via Certbot

### Monetization Conversion
- **Free Version Limits**: Working (5-minute timer restriction)
- **Upgrade Prompts**: Displaying correctly
- **Premium Features**: Properly gated behind version detection

---

## 📝 NOTES FOR FUTURE DEVELOPMENT

### Critical Configuration
- Always maintain `proxy_pass http://localhost:3005;` (NO trailing slash)
- Vite config must have `base: '/app/'` for proper asset paths
- PM2 command: `pm2 start "npx vite --port 3005" --name "focuscue-app"`

### Deployment Checklist
1. Upload files via FileZilla
2. Install npm dependencies on VPS
3. Start PM2 with correct Vite command
4. Configure Nginx with proper proxy_pass (no trailing slash)
5. Test SSL certificate
6. Verify asset loading in browser console

### Testing URLs
- Landing: https://focus-cue.com
- App: https://focus-cue.com/app
- Assets: https://focus-cue.com/app/@vite/client (should load)

---

## 📋 SESSION SUMMARY - September 8, 2025

### What Was Accomplished:
- ✅ Converted FocusCue from Tauri desktop app to pure web application
- ✅ Removed all Rust/Tauri dependencies (solved compilation performance issues)
- ✅ Implemented web-only versions of all functions using localStorage
- ✅ Fixed all TypeScript compilation errors
- ✅ Optimized build configuration for web deployment
- ✅ Successfully tested local development server
- ✅ Updated documentation (CLAUDE.md, deployment_status.md, bug_tracker.md)

### Files Modified This Session:
- `package.json` - Removed Tauri dependencies and scripts
- `src/lib/tauri.ts` - Converted to localStorage-based web functions
- `src/components/OverlayTimer.tsx` - Fixed TypeScript useRef errors
- `src/components/Teleprompter.tsx` - Fixed useRef initialization  
- `src/pages/OverlayRoute.tsx` - Removed unused imports
- `vite.config.ts` - Optimized for web build with esbuild
- Removed entire `/src-tauri/` directory and related files

### Current Status:
- **Environment**: LOCAL DEVELOPMENT - WEB ONLY
- **Application URL**: http://localhost:5173/
- **OBS Overlay**: http://localhost:5173/overlay
- **All Features Working**: Timer, teleprompter, focal dot, settings persistence
- **Performance**: Fast development cycle, no compilation delays

### Next Steps:
Web application is ready for further development or deployment as static files to any web server.

---
*Last Updated: September 8, 2025 - Tauri to Web Conversion Complete*