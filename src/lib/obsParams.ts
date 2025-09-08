export interface OverlayParams {
  duration: number;
  warn: number;
  panic: number;
  dot: number;
  opacity: number;
  x: number;
  y: number;
  dotColor?: string;
}

export function parseOverlayParams(searchParams: URLSearchParams): OverlayParams {
  return {
    duration: parseInt(searchParams.get('duration') || '300'),
    warn: parseInt(searchParams.get('warn') || '60'),
    panic: parseInt(searchParams.get('panic') || '20'),
    dot: parseInt(searchParams.get('dot') || '14'),
    opacity: parseFloat(searchParams.get('opacity') || '0.7'),
    x: parseInt(searchParams.get('x') || '50'),
    y: parseInt(searchParams.get('y') || '50'),
    dotColor: searchParams.get('color') || '#ff2a2a'
  };
}