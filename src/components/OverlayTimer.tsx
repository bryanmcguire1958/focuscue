import React, { useState, useEffect, useRef } from 'react';
import { formatSeconds, getThresholdColor } from '../lib/timing';

interface OverlayTimerProps {
  durationSec: number;
  warnAtSec: number;
  panicAtSec: number;
  onFinish?: () => void;
  isRunning?: boolean;
  onToggle?: () => void;
  onReset?: () => void;
}

export const OverlayTimer: React.FC<OverlayTimerProps> = ({
  durationSec,
  warnAtSec,
  panicAtSec,
  onFinish,
  isRunning = false,
  onToggle,
  onReset
}) => {
  const [remaining, setRemaining] = useState(durationSec);
  const [localRunning, setLocalRunning] = useState(isRunning);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    setRemaining(durationSec);
  }, [durationSec]);

  useEffect(() => {
    setLocalRunning(isRunning);
  }, [isRunning]);

  useEffect(() => {
    if (localRunning && remaining > 0) {
      startTimeRef.current = performance.now() - ((durationSec - remaining) * 1000);
      lastTimeRef.current = performance.now();
      
      const animate = (currentTime: number) => {
        if (!startTimeRef.current) startTimeRef.current = currentTime;
        
        const elapsed = Math.floor((currentTime - startTimeRef.current) / 1000);
        const newRemaining = Math.max(0, durationSec - elapsed);
        
        setRemaining(newRemaining);
        
        if (newRemaining === 0) {
          setLocalRunning(false);
          onFinish?.();
        } else {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [localRunning, remaining, durationSec, onFinish]);

  const handleToggle = () => {
    setLocalRunning(!localRunning);
    onToggle?.();
  };

  const handleReset = () => {
    setLocalRunning(false);
    setRemaining(durationSec);
    startTimeRef.current = undefined;
    onReset?.();
  };

  const colorClass = getThresholdColor(remaining, warnAtSec, panicAtSec);
  const shouldPulse = remaining === warnAtSec || remaining === panicAtSec;

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`text-8xl font-bold tabular-nums ${colorClass} ${shouldPulse ? 'animate-pulse' : ''}`}
        style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
      >
        {formatSeconds(remaining)}
      </div>
      
      {(onToggle || onReset) && (
        <div className="mt-6 flex gap-4">
          {onToggle && (
            <button
              onClick={handleToggle}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              {localRunning ? 'Pause' : 'Start'}
            </button>
          )}
          {onReset && (
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
};