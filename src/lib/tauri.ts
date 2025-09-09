// Web-only version - no Tauri imports needed

export interface AppConfig {
  duration_sec: number;
  warn_at_sec: number;
  panic_at_sec: number;
  dot_size: number;
  dot_opacity: number;
  dot_x: number;
  dot_y: number;
  overlay_opacity: number;
  teleprompter_script: string;
  teleprompter_mode: string;
  teleprompter_font_size: number;
  teleprompter_speed: number;
  hotkeys_enabled: boolean;
}

export interface ScriptPreset {
  name: string;
  script: string;
  duration: number;
  warn_at: number;
  panic_at: number;
}

// Web-only versions using localStorage
export async function saveScriptPreset(preset: ScriptPreset): Promise<void> {
  const presets = await loadScriptPresets();
  const updatedPresets = presets.filter(p => p.name !== preset.name);
  updatedPresets.push(preset);
  localStorage.setItem('focuscue_presets', JSON.stringify(updatedPresets));
}

export async function loadScriptPresets(): Promise<ScriptPreset[]> {
  const stored = localStorage.getItem('focuscue_presets');
  return stored ? JSON.parse(stored) : [];
}

export async function saveAppConfig(config: AppConfig): Promise<void> {
  localStorage.setItem('focuscue_config', JSON.stringify(config));
}

export async function loadAppConfig(): Promise<AppConfig | null> {
  const stored = localStorage.getItem('focuscue_config');
  return stored ? JSON.parse(stored) : null;
}

// Web-only window management (no-ops)
export async function createOverlayWindow(): Promise<void> {
  // In web version, just open in new window
  window.open('/overlay', '_blank', 'width=800,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes');
}

export async function toggleAlwaysOnTop(): Promise<void> {
  // Not supported in web version
  console.log('Always on top not supported in web version');
}

// Web-only version - always false now
export function isPremium(): boolean {
  return false;
}

// Premium Features Detection
export function getDesktopFeatures() {
  if (!isPremium()) {
    return {
      unlimitedTimer: false,
      saveScripts: false,
      globalHotkeys: false,
      overlayWindow: false,
      systemTray: false,
    };
  }

  return {
    unlimitedTimer: true,
    saveScripts: true,
    globalHotkeys: true,
    overlayWindow: true,
    systemTray: true,
  };
}