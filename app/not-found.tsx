import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { notFoundPage } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section theme="dark" spacing="lg">
      <SectionHeader
        as="h1"
        eyebrow="Error 404"
        heading={notFoundPage.heading}
        emphasis={notFoundPage.emphasis}
        lede={notFoundPage.lede}
      />
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/" arrow>
          Go to the home page
        </Button>
        <Button href="/services" variant="secondary">
          Browse all services
        </Button>
      </div>
    </Section>
  );
}
