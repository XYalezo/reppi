import { servicePages } from './services';

export const sitePaths: ReadonlyArray<string> = [
  '/',
  '/services',
  ...servicePages.map((page) => `/services/${page.slug}`),
  '/work',
  '/work/aliwal-pulse',
  '/about',
  '/contact',
  '/privacy-policy',
];
