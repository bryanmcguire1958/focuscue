import React, { useState, useRef, useEffect } from 'react';
import { getVersionConfig } from '../lib/version';
import { isPremium, saveScriptPreset, type ScriptPreset } from '../lib/tauri';

interface ControlsPanelProps {
  duration: number;
  warnAt: number;
  panicAt: number;
  dotSize: number;
  dotOpacity: number;
  dotX: number;
  dotY: number;
  overlayOpacity: number;
  teleprompterScript: string;
  teleprompterMode: 'scroll' | 'step';
  teleprompterFontSize: number;
  teleprompterSpeed: number;
  teleprompterActive: boolean;
  onDurationChange: (val: number) => void;
  onWarnAtChange: (val: number) => void;
  onPanicAtChange: (val: number) => void;
  onDotSizeChange: (val: number) => void;
  onDotOpacityChange: (val: number) => void;
  onDotXChange: (val: number) => void;
  onDotYChange: (val: number) => void;
  onOverlayOpacityChange: (val: number) => void;
  onTeleprompterScriptChange: (val: string) => void;
  onTeleprompterModeChange: (val: 'scroll' | 'step') => void;
  onTeleprompterFontSizeChange: (val: number) => void;
  onTeleprompterSpeedChange: (val: number) => void;
  onTeleprompterToggle: () => void;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onStartPresentation: () => void;
  onStopPresentation: () => void;
  isRunning: boolean;
  isPresentationMode: boolean;
}

// Collapsible Section Component
const CollapsibleSection: React.FC<{
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string;
}> = ({ title, icon = '', defaultOpen = false, children, badge }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="font-semibold text-white">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 bg-blue-600 text-xs text-white rounded-full">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-850 border-t border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  duration,
  warnAt,
  panicAt,
  dotSize,
  // dotOpacity,
  dotX,
  dotY,
  overlayOpacity,
  teleprompterScript,
  teleprompterMode,
  teleprompterFontSize,
  teleprompterSpeed,
  teleprompterActive,
  onDurationChange,
  onWarnAtChange,
  onPanicAtChange,
  onDotSizeChange,
  // onDotOpacityChange,
  onDotXChange,
  onDotYChange,
  onOverlayOpacityChange,
  onTeleprompterScriptChange,
  onTeleprompterModeChange,
  onTeleprompterFontSizeChange,
  onTeleprompterSpeedChange,
  onTeleprompterToggle,
  onStart,
  onStop,
  onReset,
  onStartPresentation,
  onStopPresentation,
  isRunning,
  isPresentationMode
}) => {
  const versionConfig = getVersionConfig();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Premium Features State
  // const [scriptPresets, setScriptPresets] = useState<ScriptPreset[]>([]);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = teleprompterScript;
    }
  }, [teleprompterScript]);

  // Load script presets on component mount (Premium only)
  useEffect(() => {
    if (isPremium()) {
      // loadScriptPresets().then(setScriptPresets).catch(console.error);
    }
  }, []);

  // Premium: Save current script as preset
  const handleSavePreset = async () => {
    if (!isPremium() || !presetName.trim()) return;
    
    try {
      const preset: ScriptPreset = {
        name: presetName.trim(),
        script: teleprompterScript,
        duration,
        warn_at: warnAt,
        panic_at: panicAt,
      };
      
      await saveScriptPreset(preset);
      // const updatedPresets = await loadScriptPresets();
      // setScriptPresets(updatedPresets);
      setShowPresetModal(false);
      setPresetName('');
    } catch (error) {
      console.error('Failed to save preset:', error);
    }
  };

  // Premium: Load a script preset
  // const handleLoadPreset = (preset: ScriptPreset) => {
  //   onTeleprompterScriptChange(preset.script);
  //   onDurationChange(preset.duration);
  //   onWarnAtChange(preset.warn_at);
  //   onPanicAtChange(preset.panic_at);
  // };

  // Quick preset durations
  const quickPresets = [
    { label: '1m', seconds: 60 },
    { label: '3m', seconds: 180 },
    { label: '5m', seconds: 300 },
    { label: '10m', seconds: 600, premium: true },
    { label: '15m', seconds: 900, premium: true },
  ];

  const availablePresets = quickPresets.filter(p => !p.premium || versionConfig.maxTimerSeconds >= p.seconds);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full">
      {/* Minimal Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white">FocusCue</h1>
          <div className="flex items-center gap-2">
            {(isRunning || isPresentationMode) && (
              <>
                {isRunning && (
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                )}
                {teleprompterActive && (
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Primary Action Area */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-5 mb-6 border border-gray-700/50">
        {/* Timer Duration Selection */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">Duration</span>
            <span className="text-lg font-mono text-blue-400">
              {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {availablePresets.map(preset => (
              <button
                key={preset.label}
                onClick={() => onDurationChange(preset.seconds)}
                className={`py-2.5 px-3 rounded-lg font-medium transition-all text-sm ${
                  duration === preset.seconds
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-[1.02]'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:scale-[1.01]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`w-full py-2 px-3 rounded-lg font-medium transition-all text-sm ${
              showAdvanced 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border border-gray-600/30'
            }`}
          >
            {showAdvanced ? 'Custom Settings Active' : 'Custom Settings...'}
          </button>
        </div>

        {/* Primary Action */}
        <div className="space-y-3">
          {duration > 0 && teleprompterScript.trim() ? (
            !isPresentationMode ? (
              <div className="space-y-2">
                <button
                  onClick={onStartPresentation}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-600/25 text-base tracking-wide"
                >
                  Start Full Presentation
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Timer + Teleprompter + Focus Dot
                </p>
              </div>
            ) : (
              <button
                onClick={onStopPresentation}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-red-600/25 text-base"
              >
                Stop Presentation
              </button>
            )
          ) : (
            <div className="space-y-2">
              {!isRunning ? (
                <div className="space-y-2">
                  <button
                    onClick={onStart}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg transition-all transform hover:scale-[1.01] shadow-lg shadow-green-600/20"
                  >
                    Start Timer Only
                  </button>
                  {!teleprompterScript.trim() && (
                    <p className="text-xs text-amber-400 text-center">
                      Add script below for full presentation mode
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={onStop}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Stop
                  </button>
                  <button
                    onClick={onReset}
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3">
        
        {/* Teleprompter Section */}
        <CollapsibleSection 
          title="Script & Teleprompter" 
          icon="📝" 
          defaultOpen={true}
          badge={teleprompterActive ? "Live" : undefined}
        >
          <div className="space-y-4">
            <textarea
              ref={textareaRef}
              onChange={(e) => onTeleprompterScriptChange(e.target.value)}
              placeholder="Enter your presentation script here...&#10;(For step mode: Press Enter to separate lines)"
              className="w-full h-28 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none text-sm leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <select
                  value={teleprompterMode}
                  onChange={(e) => onTeleprompterModeChange(e.target.value as 'scroll' | 'step')}
                  className="px-3 py-1.5 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                >
                  <option value="scroll">Auto Scroll</option>
                  <option value="step">Step Mode</option>
                </select>
                {teleprompterMode === 'scroll' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Speed:</span>
                    <input
                      type="range"
                      min="0.1"
                      max="3.0"
                      step="0.1"
                      value={teleprompterSpeed}
                      onChange={(e) => onTeleprompterSpeedChange(parseFloat(e.target.value))}
                      className="w-16"
                    />
                    <span className="text-xs text-gray-400 w-8">{teleprompterSpeed.toFixed(1)}x</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={onTeleprompterToggle}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  teleprompterActive
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                }`}
              >
                {teleprompterActive ? 'Hide Display' : 'Show Display'}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Font Size: {teleprompterFontSize}px</span>
              <input
                type="range"
                min="16"
                max="48"
                value={teleprompterFontSize}
                onChange={(e) => onTeleprompterFontSizeChange(parseInt(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Advanced Timer Settings */}
        {showAdvanced && (
          <CollapsibleSection title="Timer Settings" icon="⏱️" defaultOpen={false}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Custom Duration (seconds)
                </label>
                <input
                  type="number"
                  min="1"
                  max={versionConfig.maxTimerSeconds}
                  value={duration}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 300;
                    onDurationChange(Math.min(val, versionConfig.maxTimerSeconds));
                  }}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Warning (seconds)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={duration}
                    value={warnAt}
                    onChange={(e) => onWarnAtChange(parseInt(e.target.value) || 60)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Critical (seconds)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={warnAt}
                    value={panicAt}
                    onChange={(e) => onPanicAtChange(parseInt(e.target.value) || 20)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="p-3 bg-gray-800/50 rounded-lg text-xs text-gray-400 border border-gray-700/50">
                Colors: <span className="text-green-400">Green</span> → <span className="text-amber-400">Amber ({warnAt}s)</span> → <span className="text-red-400">Red ({panicAt}s)</span>
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* Visual Elements */}
        <CollapsibleSection title="Visual Elements" icon="🎯" defaultOpen={false}>
          <div className="space-y-4">
            {/* Focus Dot */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-300">Focus Dot</label>
                <button
                  onClick={() => { onDotXChange(50); onDotYChange(30); }}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-xs text-white rounded transition-colors"
                >
                  Center
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">Size: {dotSize}px</span>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={dotSize}
                    onChange={(e) => onDotSizeChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <span className="text-gray-400">X: {dotX}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={dotX}
                    onChange={(e) => onDotXChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <span className="text-gray-400">Y: {dotY}%</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={dotY}
                    onChange={(e) => onDotYChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Overall Opacity: {Math.round(overlayOpacity * 100)}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={overlayOpacity * 100}
                onChange={(e) => onOverlayOpacityChange(parseInt(e.target.value) / 100)}
                className="w-full"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* OBS Integration */}
        <CollapsibleSection title="For Streaming (OBS)" icon="📹" defaultOpen={false}>
          <div className="space-y-3">
            <p className="text-sm text-gray-300">Browser Source URL:</p>
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
              <code className="text-xs text-blue-400 break-all font-mono">
                http://localhost:5173/overlay?duration={duration}&warn={warnAt}&panic={panicAt}&dot={dotSize}&opacity={overlayOpacity}&x={dotX}&y={dotY}
              </code>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-400">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Enable "Transparent background" in OBS Browser Source settings</span>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Quick Help */}
      <div className="mt-6 p-3 bg-gradient-to-r from-gray-800/50 to-gray-850/50 rounded-lg border border-gray-700/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-300">Hotkeys:</span>
          <span className="text-gray-400">Space: Start • R: Reset • F8: Overlay</span>
        </div>
        {teleprompterActive && teleprompterMode === 'step' && (
          <div className="text-xs text-blue-400 mt-1">
            ↓/↑ or N/P: Navigate script lines
          </div>
        )}
      </div>

      {/* Premium: Save Preset Modal */}
      {showPresetModal && isPremium() && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">Save Script Preset</h3>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Preset name..."
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSavePreset();
                if (e.key === 'Escape') setShowPresetModal(false);
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleSavePreset}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                disabled={!presetName.trim()}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowPresetModal(false);
                  setPresetName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};