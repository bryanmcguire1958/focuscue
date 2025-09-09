// Version configuration for FocusCue
// Determines free vs premium features

export const isPremium = () => {
  // Check if running in Tauri (desktop app)
  return typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
};

export const VERSION_CONFIG = {
  FREE: {
    maxTimerMinutes: 5, // 5-minute limit for free version
    maxTimerSeconds: 300,
    canSaveScripts: false,
    canLoadScripts: false,
    hasGlobalHotkeys: false,
    maxPresets: 1,
    watermark: true,
    upgradeUrl: 'https://focuscue.app/upgrade' // Update with your actual URL
  },
  PREMIUM: {
    maxTimerMinutes: Infinity,
    maxTimerSeconds: Infinity,
    canSaveScripts: true,
    canLoadScripts: true,
    hasGlobalHotkeys: true,
    maxPresets: 10,
    watermark: false,
    upgradeUrl: null
  }
};

export const getVersionConfig = () => {
  return isPremium() ? VERSION_CONFIG.PREMIUM : VERSION_CONFIG.FREE;
};

export const getVersionName = () => {
  return isPremium() ? 'Premium' : 'Free';
};