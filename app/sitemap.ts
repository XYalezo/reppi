import type { MetadataRoute } from 'next';
import { sitePaths } from '@/content/routes';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl().origin;
  return sitePaths.map((path) => ({ url: `${origin}${path === '/' ? '' : path}` }));
}
