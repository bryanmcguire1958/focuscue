# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project: FocusCue

FocusCue is a web-based presenter overlay application featuring timer and teleprompter functionality for content creators and presenters. Converted from Tauri desktop app to pure web application for simplified development.

## Development Environment

- **Developer**: Bryan
- **Local Environment**: Ubuntu WSL2
- **Production VPS**: 217.65.145.244 (Ubuntu)
- **Domain**: focus-cue.com
- **File Management**: FileZilla for VPS uploads, SSH for remote commands
- **Backup Location**: C:/Users/bryan/Dropbox (accessed via /mnt/c)

## Production Deployment Status

✅ **LIVE AND OPERATIONAL** (as of September 8, 2025)
- **Landing Page**: https://focus-cue.com
- **Free Web App**: https://focus-cue.com/app 
- **SSL Certificate**: Auto-renewing HTTPS via Let's Encrypt
- **Monetization**: Free (5-min limit) vs Premium ($29 desktop) versions

## Tech Stack

**Web-Only Application** (Tauri removed September 8, 2025)
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Package Manager**: npm (not pnpm)
- **State Management**: localStorage + React state
- **Storage**: Browser localStorage (replaces file system)
- **Hotkeys**: React keyboard events (web-based only)
- **Deployment**: Static files, hostable anywhere
- **Development**: Fast compilation, no Rust toolchain needed

## Production Architecture

### Current Deployment
```
focus-cue.com (Nginx)
├── / → Static landing page (/var/www/focus-cue/website/)
└── /app → React app (proxy to PM2 Vite server on :3005)
```

### Key Configuration
- **Nginx Config**: `/etc/nginx/sites-available/focus-cue`
- **PM2 Process**: `pm2 start "npx vite --port 3005" --name "focuscue-app"`
- **Vite Config**: `base: '/app/'` for proper asset paths

## Core Components

- **OverlayTimer.tsx**: Countdown timer with color thresholds (green → amber → red)
- **FocalDot.tsx**: Adjustable red dot for visual focus
- **Teleprompter.tsx**: Script display with auto-scroll and step modes
- **ControlsPanel.tsx**: Main settings interface
- **version.ts**: Free vs Premium feature gating

## Version Features

### Free Web Version (Current)
- 5-minute timer limit
- Basic teleprompter (no save/load)
- Master presentation mode
- Upgrade prompts to desktop version

### Premium Desktop Version (Future)
- Unlimited timer duration
- Save/load teleprompter scripts
- Global hotkeys
- Multiple presets
- Always-on-top overlay window

## Common Development Commands

### Local Development 
```bash
# Change to app directory first
cd /mnt/c/Users/bryan/Dropbox/focuscue-app

# Development server (web-only, fast)
npm run dev
# Then open: http://localhost:5173/ (main controls interface)
# OBS overlay: http://localhost:5173/overlay?duration=300&warn=60&panic=20&dot=14&opacity=0.7

# Build for production (static files)
npm run build

# Preview production build
npm run serve

# Type checking and linting
npm run build  # includes tsc -b
npm run lint
```

### Key Changes (September 8, 2025)
- ❌ Removed: Tauri desktop compilation (too slow, high CPU usage)  
- ❌ Removed: Rust dependencies and toolchain
- ✅ Added: Web-only versions of all functions
- ✅ Added: localStorage for settings persistence
- ✅ Added: Optimized build with esbuild minification

## Critical Deployment Notes

### Nginx Proxy Configuration
**CRITICAL**: The proxy_pass trailing slash affects asset loading:
- ✅ CORRECT: `proxy_pass http://localhost:3005;` (no slash - preserves /app path)
- ❌ WRONG: `proxy_pass http://localhost:3005/;` (with slash - strips /app path)

### Vite Configuration
Must have `base: '/app/'` in `vite.config.ts` for proper asset paths when served via Nginx proxy.

## Monetization Strategy

- **Free Tier**: Web version at focus-cue.com/app (5-minute limit)
- **Premium Tier**: $29 desktop app (unlimited features)
- **Conversion**: Upgrade prompts throughout free version

## File Structure

```
/var/www/focus-cue/
├── website/           # Landing page (served directly by Nginx)
│   ├── index.html     # Professional landing page
│   └── nginx-focuscue.conf
└── app-source/        # React app source (built via PM2/Vite)
    ├── src/
    ├── vite.config.ts
    └── package.json
```

## Security & Safety

- VPS hosts multiple websites - all changes must be non-destructive
- Each site has separate Nginx configuration
- SSL certificates managed by Certbot with auto-renewal
- PM2 manages Node.js processes independently

## Session Requirements

### Default Mode: PRODUCTION MAINTENANCE ONLY
- Never modify local development environment
- All changes must be made on production VPS via SSH
- Use FileZilla for file uploads
- Always backup via PM2 and Git before changes

### Working Principles
- Production-first development workflow
- Focus on professional, conversion-optimized UX
- Prioritize monetization and user upgrade paths
- Document all changes for future reference
- Bryan leads strategy, Claude implements solutions

## Important URLs

- **Live Site**: https://focus-cue.com
- **Free App**: https://focus-cue.com/app
- **Pricing**: https://focus-cue.com/#pricing
- **VPS**: 217.65.145.244

---
*Last Updated: September 8, 2025 - Deployment Complete*