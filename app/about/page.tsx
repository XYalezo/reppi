import { CtaBand } from '@/components/ui/cta-band';
import { DetailList } from '@/components/ui/detail-list';
import { EnquiryTrigger } from '@/components/ui/enquiry-trigger';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { SplitSection } from '@/components/ui/split-section';
import { aboutPage as page } from '@/content/pages';

import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        eyebrow={page.eyebrow}
        heading={page.heading}
        emphasis={page.emphasis}
        body={page.body}
        actions={<EnquiryTrigger label={page.headerAction} arrow />}
      />
      <SplitSection theme="light" eyebrow={page.story.eyebrow} heading={page.story.heading} emphasis={page.story.emphasis}>
        <div className="max-w-measure space-y-4 text-lead text-ink-700">
          {page.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SplitSection>
      <SplitSection theme="mist" eyebrow={page.founder.eyebrow} heading={page.founder.heading} emphasis={page.founder.emphasis}>
        <div className="space-y-8">
          <p className="max-w-measure text-lead text-ink-700">{page.founder.paragraph}</p>
          <div>
            <p className="mb-4 font-mono text-label font-medium uppercase text-ink-600">{page.founder.credentialsHeading}</p>
            <DetailList items={page.founder.credentials.map((title) => ({ title }))} />
          </div>
        </div>
      </SplitSection>
      <CtaBand
        heading={page.cta.heading}
        emphasis={page.cta.emphasis}
        body={page.cta.body}
        actions={
          <>
            <EnquiryTrigger label={page.cta.primaryAction} />
          </>
        }
      />
    </>
  );
}
