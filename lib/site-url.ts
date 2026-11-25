export function getSiteUrl(): URL {
  const raw = process.env.SITE_URL;
  if (!raw) throw new Error('SITE_URL is not set');
  return new URL(raw);
}
