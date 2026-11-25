const windowMs = 10 * 60 * 1000;
const limit = 5;
const hits = new Map<string, number[]>();

export function allow(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [stored, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(stored);
    }
  }
  return true;
}
