# TODO: MONETIZATION STRATEGY

**Created**: September 8, 2025  
**Priority**: HIGH - Revenue Generation

## 🎯 IMMEDIATE CHANGES NEEDED

### 1. Change Free Version Timer Limit
**Current**: 5-minute limit  
**Target**: 1-minute limit  
**Reason**: More aggressive conversion to paid version  
**File to modify**: `src/lib/version.ts` - change `maxTimerSeconds: 300` to `maxTimerSeconds: 60`

### 2. Implement Full Version Download System
**Current Issue**: No actual download mechanism for "Premium Desktop" version  
**Current Implementation**:
- Button points to: https://www.focus-cue.com/#pricing
- Shows "Premium Desktop" card but no actual product to download

**Options to Consider**:

#### Option A: Web-Only Premium (Simplest)
- Keep as web app only (no desktop download)
- Premium users get unlimited timer via license key/login
- Store license in localStorage
- Benefits: No distribution hassles, instant updates, works everywhere

#### Option B: Static Build Download
- Build static version with `npm run build`
- Package `/dist` folder as zip file
- User downloads and runs locally with any web server
- Include simple batch file to start local server
- Benefits: "Feels" like desktop app, runs offline

#### Option C: Electron Wrapper (Medium Complexity)
- Wrap the web app in Electron
- Distribute as .exe for Windows, .dmg for Mac
- Benefits: True desktop app, system tray, auto-start
- Drawback: Need to set up build pipeline

#### Option D: PWA (Progressive Web App)
- Add PWA manifest and service worker
- Users can "install" from browser
- Works offline, appears in app list
- Benefits: Native-like, no app stores needed

## 📊 CURRENT UPGRADE FLOW

1. **Free Version Limitations**:
   - Timer capped at 5 minutes (change to 1 minute)
   - Shows "Upgrade for unlimited time" messages
   - Premium features disabled (save/load scripts)

2. **Upgrade Prompts**:
   - Button in controls panel
   - Timer completion message
   - Feature lock notifications

3. **Landing Page**:
   - Points to https://www.focus-cue.com/#pricing
   - Shows pricing tiers
   - "Get Premium" button (currently no action)

## 💰 PRICING STRUCTURE

**Current Advertised**:
- Free: Web version with limitations
- Premium: $29 one-time purchase

**Suggested Implementation**:
1. Set up payment processor (Stripe, Gumroad, Paddle)
2. Generate license keys on purchase
3. Email delivery of license key
4. License validation in app

## 🔑 LICENSE KEY SYSTEM (Suggested)

```typescript
// src/lib/license.ts
export function validateLicense(key: string): boolean {
  // Simple validation for MVP
  // Later: API call to validate
  const validKeys = localStorage.getItem('valid_licenses') || '[]';
  return JSON.parse(validKeys).includes(key);
}

export function saveLicense(key: string): void {
  localStorage.setItem('user_license', key);
  localStorage.setItem('is_premium', 'true');
}

export function isPremium(): boolean {
  return localStorage.getItem('is_premium') === 'true';
}
```

## 📝 IMPLEMENTATION STEPS

1. **Immediate** (Today):
   - [ ] Change timer limit to 1 minute in free version
   - [ ] Update upgrade messages to be more compelling

2. **Phase 1** (This Week):
   - [ ] Decide on distribution method (A, B, C, or D above)
   - [ ] Set up payment processor
   - [ ] Create license key generation system

3. **Phase 2** (Next Week):
   - [ ] Implement license validation in app
   - [ ] Create download/access delivery system
   - [ ] Update landing page with actual purchase flow

4. **Phase 3** (Following Week):
   - [ ] Add more premium features to increase value
   - [ ] Consider subscription model vs one-time
   - [ ] A/B test pricing ($19 vs $29 vs $39)

## 🚀 QUICK WIN SUGGESTIONS

1. **Ultra-Simple Start**: 
   - Use Gumroad for payments
   - Send license key via email
   - User enters key in app to unlock
   - Store in localStorage

2. **No-Download Option**:
   - Premium users get special URL
   - URL contains token that unlocks features
   - Example: focus-cue.com/app?license=ABC123

3. **Hybrid Approach**:
   - Free: 1-minute web version
   - Premium: Unlimited web version (license key)
   - Pro: Desktop download (future, if demand exists)

## 📌 NOTES

- Current "Premium Desktop" branding might be misleading if no desktop version exists
- Consider renaming to "Premium" or "Pro" if staying web-only
- Web-only is simpler to maintain and update
- Desktop version only worth it if users specifically request offline capability

---

**Next Action**: Decide on distribution method and implement 1-minute timer limit