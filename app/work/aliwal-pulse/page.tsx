import { CtaBand } from '@/components/ui/cta-band';
import { DetailList } from '@/components/ui/detail-list';
import { PlatformDiagram } from '@/components/ui/diagrams';
import { EnquiryTrigger } from '@/components/ui/enquiry-trigger';
import { FactTable } from '@/components/ui/fact-table';
import { FeatureBand } from '@/components/ui/feature-band';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { SplitSection } from '@/components/ui/split-section';
import { caseStudyPage as page } from '@/content/pages';

import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/work/aliwal-pulse',
});

export default function CaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: 'Aliwal Pulse', path: '/work/aliwal-pulse' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: 'Aliwal Pulse' }]}
        eyebrow={page.eyebrow}
        heading={page.heading}
        emphasis={page.emphasis}
        body={page.body}
        actions={<EnquiryTrigger label={page.headerAction} service="custom-software-development" arrow />}
      />
      <SplitSection theme="light" eyebrow={page.brief.eyebrow} heading={page.brief.heading} emphasis={page.brief.emphasis}>
        <p className="max-w-measure text-lead text-ink-700">{page.brief.body}</p>
      </SplitSection>
      <FeatureBand
        eyebrow={page.structure.eyebrow}
        heading={page.structure.heading}
        emphasis={page.structure.emphasis}
        visual={<PlatformDiagram />}
      >
        {page.structure.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </FeatureBand>
      <SplitSection
        theme="mist"
        eyebrow={page.approach.eyebrow}
        heading={page.approach.heading}
        emphasis={page.approach.emphasis}
      >
        <DetailList items={page.approach.items} />
      </SplitSection>
      <SplitSection theme="light" eyebrow={page.outcome.eyebrow} heading={page.outcome.heading} emphasis={page.outcome.emphasis}>
        <FactTable rows={page.outcome.facts} />
      </SplitSection>
      <CtaBand
        heading={page.cta.heading}
        emphasis={page.cta.emphasis}
        body={page.cta.body}
        actions={
          <>
            <EnquiryTrigger label={page.cta.primaryAction} service="custom-software-development" />
          </>
        }
      />
    </>
  );
}
