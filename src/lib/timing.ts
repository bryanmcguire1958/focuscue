export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getThresholdColor(remaining: number, warnAt: number, panicAt: number): string {
  if (remaining <= panicAt) return 'text-red-500';
  if (remaining <= warnAt) return 'text-amber-500';
  return 'text-green-500';
}

export function getThresholdClass(remaining: number, warnAt: number, panicAt: number): string {
  if (remaining <= panicAt) return 'panic';
  if (remaining <= warnAt) return 'warn';
  return 'ok';
}