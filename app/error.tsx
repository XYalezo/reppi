'use client';

import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { errorPage } from '@/content/pages';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Section theme="dark" spacing="lg">
      <SectionHeader
        as="h1"
        eyebrow="Error"
        heading={errorPage.heading}
        emphasis={errorPage.emphasis}
        lede={errorPage.lede}
      />
      <div className="mt-10 flex flex-wrap gap-4">
        <Button onClick={reset}>Try the page again</Button>
        <Button href="/" variant="secondary">
          Go to the home page
        </Button>
      </div>
    </Section>
  );
}
