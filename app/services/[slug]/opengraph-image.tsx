import { servicePageContent } from '@/content/service-pages';
import { ogSize, renderOg } from '@/lib/og';

export const alt = 'Phanello Solutions service';
export const size = ogSize;
export const contentType = 'image/png';
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePageContent.map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePageContent.find((item) => item.slug === slug);
  if (!page) throw new Error(`Unknown service page ${slug}`);
  return renderOg({ eyebrow: page.eyebrow, title: page.heading, emphasis: page.emphasis });
}
