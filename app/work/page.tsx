import { CtaBand } from '@/components/ui/cta-band';
import { EnquiryTrigger } from '@/components/ui/enquiry-trigger';
import { FactTable } from '@/components/ui/fact-table';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { SplitSection } from '@/components/ui/split-section';
import { TextLink } from '@/components/ui/text-link';
import { workPage } from '@/content/pages';

import { aliwalPulse } from '@/content/work';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

export const metadata = pageMetadata({
  title: workPage.metaTitle,
  description: workPage.metaDescription,
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Work' }]}
        eyebrow={workPage.eyebrow}
        heading={workPage.heading}
        emphasis={workPage.emphasis}
        body={workPage.body}
        actions={<EnquiryTrigger label={workPage.headerAction} service="custom-software-development" arrow />}
        aside={
          <div className="border-t border-ink-700 bg-ink-900/80 p-6 md:p-8">
            <p className="mb-4 font-mono text-label font-medium uppercase text-green-200">{aliwalPulse.name}</p>
            <FactTable rows={aliwalPulse.facts} />
          </div>
        }
      />
      <SplitSection
        theme="light"
        eyebrow={workPage.feature.eyebrow}
        heading={workPage.feature.heading}
        emphasis={workPage.feature.emphasis}
      >
        <div className="space-y-6">
          <div className="max-w-measure space-y-4 text-lead text-ink-700">
            {aliwalPulse.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <TextLink href="/work/aliwal-pulse" arrow>
            {workPage.feature.link}
          </TextLink>
        </div>
      </SplitSection>
      <CtaBand
        heading={workPage.cta.heading}
        emphasis={workPage.cta.emphasis}
        body={workPage.cta.body}
        actions={
          <>
            <EnquiryTrigger label={workPage.cta.primaryAction} service="custom-software-development" />
          </>
        }
      />
    </>
  );
}
