import React, { useState, useRef, useEffect } from 'react';
// Updated with X/Y position controls

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
  isRunning: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  duration,
  warnAt,
  panicAt,
  dotSize,
  dotOpacity,
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
  onDotOpacityChange,
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
  isRunning
}) => {
  const presets = [60, 180, 300, 600];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = teleprompterScript;
    }
  }, [teleprompterScript]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">FocusCue Controls</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Duration (seconds)
          </label>
          <input
            type="number"
            min="1"
            max="1800"
            value={duration}
            onChange={(e) => onDurationChange(parseInt(e.target.value) || 300)}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <div className="flex gap-2 mt-2">
            {presets.map(preset => (
              <button
                key={preset}
                onClick={() => onDurationChange(preset)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-sm rounded transition-colors"
              >
                {preset/60}m
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Warn At (sec)
            </label>
            <input
              type="number"
              min="1"
              max={duration}
              value={warnAt}
              onChange={(e) => onWarnAtChange(parseInt(e.target.value) || 60)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-amber-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Panic At (sec)
            </label>
            <input
              type="number"
              min="1"
              max={warnAt}
              value={panicAt}
              onChange={(e) => onPanicAtChange(parseInt(e.target.value) || 20)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dot Size: {dotSize}px
          </label>
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
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dot Opacity: {Math.round(dotOpacity * 100)}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={dotOpacity * 100}
            onChange={(e) => onDotOpacityChange(parseInt(e.target.value) / 100)}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-300">
              Dot Position
            </label>
            <button
              onClick={() => { onDotXChange(50); onDotYChange(50); }}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-xs rounded transition-colors"
            >
              Center Dot
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                X: {dotX}%
              </label>
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
              <label className="block text-xs text-gray-400 mb-1">
                Y: {dotY}%
              </label>
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Overlay Opacity: {Math.round(overlayOpacity * 100)}%
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

        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Teleprompter</h3>
            <button
              onClick={onTeleprompterToggle}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                teleprompterActive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {teleprompterActive ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Script
              </label>
              <textarea
                ref={textareaRef}
                onChange={(e) => onTeleprompterScriptChange(e.target.value)}
                placeholder="Enter your script here... (Each line on new line for step mode)"
                className="w-full h-24 px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mode
                </label>
                <select
                  value={teleprompterMode}
                  onChange={(e) => onTeleprompterModeChange(e.target.value as 'scroll' | 'step')}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="scroll">Auto Scroll</option>
                  <option value="step">Step Lines</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Font Size: {teleprompterFontSize}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={teleprompterFontSize}
                  onChange={(e) => onTeleprompterFontSizeChange(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {teleprompterMode === 'scroll' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Scroll Speed: {teleprompterSpeed.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={teleprompterSpeed}
                  onChange={(e) => onTeleprompterSpeedChange(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {!isRunning ? (
            <button
              onClick={onStart}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Start Timer
            </button>
          ) : (
            <button
              onClick={onStop}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Stop Timer
            </button>
          )}
          
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">OBS Browser Source URL:</p>
          <code className="text-xs text-green-400 break-all">
            http://localhost:5173/overlay?duration={duration}&warn={warnAt}&panic={panicAt}&dot={dotSize}&opacity={overlayOpacity}&x={dotX}&y={dotY}
          </code>
        </div>
      </div>
    </div>
  );
};