import React, { useState, useEffect } from 'react';
import { OverlayTimer } from './components/OverlayTimer';
import { FocalDot } from './components/FocalDot';
import { ControlsPanel } from './components/ControlsPanel';
import { Teleprompter } from './components/Teleprompter';
import { OverlayRoute } from './pages/OverlayRoute';
import { getVersionConfig, getVersionName } from './lib/version';

function App() {
  const isOverlayRoute = window.location.pathname === '/overlay';
  const versionConfig = getVersionConfig();
  
  const [duration, setDuration] = useState(Math.min(300, versionConfig.maxTimerSeconds));
  const [warnAt, setWarnAt] = useState(60);
  const [panicAt, setPanicAt] = useState(20);
  const [dotSize, setDotSize] = useState(14);
  const [dotOpacity, setDotOpacity] = useState(0.9);
  const [dotX, setDotX] = useState(50);
  const [dotY, setDotY] = useState(30);
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [isRunning, setIsRunning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  
  // Teleprompter state
  const [teleprompterScript, setTeleprompterScript] = useState(() => {
    // Try to load saved script, fallback to default
    const saved = localStorage.getItem('focuscue-teleprompter-script');
    return saved || 'Welcome to FocusCue!\nYour presentation timer is ready.\nThe red dot helps with camera focus.\nUse the controls to customize your experience.\nPress Space to start the timer.';
  });
  const [teleprompterMode, setTeleprompterMode] = useState<'scroll' | 'step'>('step');
  const [teleprompterFontSize, setTeleprompterFontSize] = useState(24);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState(1.0);
  const [teleprompterActive, setTeleprompterActive] = useState(false);
  
  // Master presentation mode state
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger hotkeys when user is typing in input fields
      const target = e.target as HTMLElement;
      const isInputField = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      );
      
      if (isInputField) {
        return; // Don't process hotkeys when typing in input fields
      }
      
      if (e.code === 'Space' && !isOverlayRoute) {
        e.preventDefault();
        setIsRunning(prev => !prev);
      } else if (e.code === 'KeyR' && !isOverlayRoute) {
        e.preventDefault();
        handleReset();
      } else if (e.code === 'F8' && !isOverlayRoute) {
        e.preventDefault();
        setShowOverlay(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOverlayRoute]);

  const handleReset = () => {
    setIsRunning(false);
  };

  // Master presentation handlers
  const handleStartPresentation = () => {
    setIsRunning(true);
    setTeleprompterActive(true);
    setIsPresentationMode(true);
  };

  const handleStopPresentation = () => {
    setIsRunning(false);
    setTeleprompterActive(false);
    setIsPresentationMode(false);
  };

  if (isOverlayRoute) {
    return <OverlayRoute />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative">
      {showOverlay && (
        <>
          <FocalDot 
            sizePx={dotSize}
            opacity={dotOpacity}
            xPct={dotX}
            yPct={dotY}
          />
          
          <div 
            className="fixed top-10 left-1/2 transform -translate-x-1/2"
            style={{ opacity: overlayOpacity }}
          >
            <OverlayTimer
              durationSec={duration}
              warnAtSec={warnAt}
              panicAtSec={panicAt}
              isRunning={isRunning}
              onFinish={() => setIsRunning(false)}
            />
          </div>
        </>
      )}
      
      <ControlsPanel
        duration={duration}
        warnAt={warnAt}
        panicAt={panicAt}
        dotSize={dotSize}
        dotOpacity={dotOpacity}
        dotX={dotX}
        dotY={dotY}
        overlayOpacity={overlayOpacity}
        teleprompterScript={teleprompterScript}
        teleprompterMode={teleprompterMode}
        teleprompterFontSize={teleprompterFontSize}
        teleprompterSpeed={teleprompterSpeed}
        teleprompterActive={teleprompterActive}
        onDurationChange={setDuration}
        onWarnAtChange={setWarnAt}
        onPanicAtChange={setPanicAt}
        onDotSizeChange={setDotSize}
        onDotOpacityChange={setDotOpacity}
        onDotXChange={setDotX}
        onDotYChange={setDotY}
        onOverlayOpacityChange={setOverlayOpacity}
        onTeleprompterScriptChange={setTeleprompterScript}
        onTeleprompterModeChange={setTeleprompterMode}
        onTeleprompterFontSizeChange={setTeleprompterFontSize}
        onTeleprompterSpeedChange={setTeleprompterSpeed}
        onTeleprompterToggle={() => setTeleprompterActive(!teleprompterActive)}
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        onReset={handleReset}
        onStartPresentation={handleStartPresentation}
        onStopPresentation={handleStopPresentation}
        isRunning={isRunning}
        isPresentationMode={isPresentationMode}
      />
      
      <Teleprompter
        mode={teleprompterMode}
        fontSize={teleprompterFontSize}
        scrollSpeed={teleprompterSpeed}
        script={teleprompterScript}
        isActive={teleprompterActive}
        onClearScript={() => setTeleprompterScript('')}
      />
      
      <div className="fixed bottom-4 left-4 text-gray-500 text-sm">
        <p>Hotkeys:</p>
        <p>Space: Start/Stop | R: Reset | F8: Toggle Overlay</p>
        {teleprompterActive && (
          <p className="text-blue-400">
            {teleprompterMode === 'step' ? 'N/P or ↓/↑: Next/Prev Line' : '↓/↑: Manual Scroll'}
          </p>
        )}
      </div>
      
      {/* Version Badge and Upgrade Button for Free Version */}
      {!versionConfig.upgradeUrl ? null : (
        <div className="fixed top-4 right-4 flex items-center gap-3">
          <span className="px-3 py-1 bg-gray-800 text-yellow-400 text-sm font-semibold rounded-lg">
            ⚡ Free Version (5 min limit)
          </span>
          <a
            href={versionConfig.upgradeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg animate-pulse"
          >
            🚀 Upgrade to Premium
          </a>
        </div>
      )}
    </div>
  );
}

export default App;