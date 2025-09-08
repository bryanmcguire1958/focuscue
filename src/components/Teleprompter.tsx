import React, { useState, useEffect, useRef } from 'react';

interface TeleprompterProps {
  mode: 'scroll' | 'step';
  fontSize: number;
  scrollSpeed: number;
  script: string;
  isActive: boolean;
  onClearScript?: () => void;
}

export const Teleprompter: React.FC<TeleprompterProps> = ({
  mode,
  fontSize,
  scrollSpeed,
  script,
  isActive,
  onClearScript
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  
  const lines = script.split('\n').filter(line => line.trim() !== '');

  // Auto-scroll mode
  useEffect(() => {
    if (mode === 'scroll' && isActive) {
      const animate = () => {
        setScrollPosition(prev => prev + scrollSpeed);
        animationFrameRef.current = requestAnimationFrame(animate);
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
  }, [mode, isActive, scrollSpeed]);

  // Scroll to position
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Keyboard navigation for step mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (mode === 'step' && isActive) {
        if (e.code === 'KeyN' || e.code === 'ArrowDown') {
          e.preventDefault();
          setCurrentLineIndex(prev => Math.min(prev + 1, lines.length - 1));
        } else if (e.code === 'KeyP' || e.code === 'ArrowUp') {
          e.preventDefault();
          setCurrentLineIndex(prev => Math.max(prev - 1, 0));
        }
      } else if (mode === 'scroll' && isActive) {
        if (e.code === 'ArrowUp') {
          e.preventDefault();
          setScrollPosition(prev => Math.max(0, prev - 50));
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          setScrollPosition(prev => prev + 50);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, isActive, lines.length]);

  const resetTeleprompter = () => {
    setCurrentLineIndex(0);
    setScrollPosition(0);
  };

  if (!isActive || !script.trim()) {
    return null;
  }

  return (
    <div className="fixed inset-4 bg-black bg-opacity-80 rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-600">
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">Teleprompter</span>
          <span className="text-gray-400 text-sm">
            {mode === 'scroll' ? 'Auto-scroll' : `Step ${currentLineIndex + 1}/${lines.length}`}
          </span>
        </div>
        <div className="flex gap-2">
          {mode === 'step' && (
            <>
              <button
                onClick={() => setCurrentLineIndex(prev => Math.max(prev - 1, 0))}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
              >
                ← Prev
              </button>
              <button
                onClick={() => setCurrentLineIndex(prev => Math.min(prev + 1, lines.length - 1))}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
              >
                Next →
              </button>
            </>
          )}
          <button
            onClick={resetTeleprompter}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            Reset Position
          </button>
          <button
            onClick={() => {
              resetTeleprompter();
              onClearScript?.();
            }}
            className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded"
          >
            New Script
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-hidden p-8 text-white leading-relaxed"
        style={{ 
          fontSize: `${fontSize}px`,
          wordSpacing: 'normal',
          letterSpacing: 'normal',
          textAlign: 'center',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          overflowWrap: 'normal'
        }}
      >
        {mode === 'scroll' ? (
          <div className="max-w-4xl mx-auto" style={{ whiteSpace: 'pre-wrap' }}>
            {script}
            <div className="h-96"></div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center max-w-4xl mx-auto">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`mb-6 px-4 transition-all duration-300 ${
                  index === currentLineIndex
                    ? 'text-yellow-300 font-semibold scale-105'
                    : index < currentLineIndex
                    ? 'text-gray-500 opacity-60'
                    : 'text-white opacity-80'
                }`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-600 text-center">
        <div className="text-gray-400 text-xs">
          {mode === 'scroll' ? (
            'Use ↑/↓ arrows to adjust position manually'
          ) : (
            'Use N/P or ↓/↑ arrows to navigate lines'
          )}
        </div>
      </div>
    </div>
  );
};