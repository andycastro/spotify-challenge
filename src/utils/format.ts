export function formatFollowers(total: number): string {
  if (total >= 1_000_000) return (total / 1_000_000).toFixed(1) + 'M';
  if (total >= 1_000) return (total / 1_000).toFixed(1) + 'K';
  return String(total);
}

export function compactNumber(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
  if (abs >= 1_000) return (value / 1_000).toFixed(1) + 'K';
  return String(value);
}
