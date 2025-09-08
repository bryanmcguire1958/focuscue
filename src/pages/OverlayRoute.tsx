import React, { useEffect, useState } from 'react';
import { OverlayTimer } from '../components/OverlayTimer';
import { FocalDot } from '../components/FocalDot';
import { parseOverlayParams } from '../lib/obsParams';

export const OverlayRoute: React.FC = () => {
  const [params, setParams] = useState(parseOverlayParams(new URLSearchParams(window.location.search)));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsRunning(prev => !prev);
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        setIsRunning(false);
        window.location.reload();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
      <FocalDot 
        sizePx={params.dot}
        opacity={params.opacity}
        xPct={params.x}
        yPct={params.y}
        color={params.dotColor}
      />
      
      <div style={{ opacity: params.opacity }}>
        <OverlayTimer
          durationSec={params.duration}
          warnAtSec={params.warn}
          panicAtSec={params.panic}
          isRunning={isRunning}
          onFinish={() => setIsRunning(false)}
        />
      </div>
    </div>
  );
};