import type { Metadata } from 'next';
import { company } from '@/content/site';

type PageMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
  /** Set to false when the route has its own opengraph-image file. */
  sharedImage?: boolean;
};

const sharedImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'Phanello Solutions' };

export function pageMetadata({ title, description, path, sharedImage: useShared = true }: PageMetadataInput): Metadata {
  const fullTitle = typeof title === 'string' ? `${title} | ${company.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
      siteName: company.name,
      locale: 'en_ZA',
      ...(useShared ? { images: [sharedImage] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(useShared ? { images: [sharedImage.url] } : {}),
    },
  };
}
