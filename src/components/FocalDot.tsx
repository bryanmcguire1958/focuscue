import React from 'react';

interface FocalDotProps {
  sizePx?: number;
  opacity?: number;
  color?: string;
  xPct?: number;
  yPct?: number;
}

export const FocalDot: React.FC<FocalDotProps> = ({
  sizePx = 14,
  opacity = 0.9,
  color = '#ff2a2a',
  xPct = 50,
  yPct = 50
}) => {
  return (
    <div
      className="fixed rounded-full pointer-events-none"
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        backgroundColor: color,
        opacity,
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: 'translate(-50%, -50%)',
        boxShadow: `0 0 ${sizePx/2}px rgba(255,42,42,0.5)`,
        zIndex: 9999
      }}
    />
  );
};