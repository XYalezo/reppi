import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Accordion } from '@/components/ui/accordion';

import { CtaBand } from '@/components/ui/cta-band';
import { DetailList } from '@/components/ui/detail-list';
import { AssistantScopeDiagram, MigrationPathDiagram } from '@/components/ui/diagrams';
import { EnquiryTrigger } from '@/components/ui/enquiry-trigger';
import { FeatureBand } from '@/components/ui/feature-band';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { ProcessSteps } from '@/components/ui/process-steps';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { SplitSection } from '@/components/ui/split-section';
import { servicePageContent } from '@/content/service-pages';
import { pageTitle } from '@/content/services';

import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return servicePageContent.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePageContent.find((item) => item.slug === slug);
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/services/${slug}`, sharedImage: false });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = servicePageContent.find((item) => item.slug === slug);
  if (!page) notFound();
  const title = pageTitle(slug);

  return (
    <>
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: title, path: `/services/${slug}` },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: title }]}
        eyebrow={page.eyebrow}
        heading={page.heading}
        emphasis={page.emphasis}
        body={page.description}
        actions={<EnquiryTrigger label={page.cta.headerAction} service={slug} arrow />}
      />
      <SplitSection theme="light" eyebrow="Included" heading="What is included" emphasis="included">
        <DetailList items={page.included} />
      </SplitSection>
      <Section theme="mist" labelledBy="steps-heading">
        <SectionHeader
          id="steps-heading"
          eyebrow="Process"
          heading="How it works"
          emphasis="works"
          className="mb-12"
        />
        <ProcessSteps steps={page.steps} />
      </Section>
      {page.diagram && (
        <FeatureBand
          eyebrow={page.diagram.eyebrow}
          heading={page.diagram.heading}
          emphasis={page.diagram.emphasis}
          visual={page.diagram.kind === 'assistant-scope' ? <AssistantScopeDiagram /> : <MigrationPathDiagram />}
        >
          {page.diagram.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </FeatureBand>
      )}
      <SplitSection theme="light" eyebrow="Who it is for" heading={page.who.heading} emphasis={page.who.emphasis}>
        <p className="max-w-measure text-lead text-ink-700">{page.who.body}</p>
      </SplitSection>
      <SplitSection theme="mist" eyebrow="FAQ" heading={`Questions about ${title}`} emphasis={title}>
        <Accordion items={page.faqs} />
      </SplitSection>
      <CtaBand
        heading={page.cta.heading}
        emphasis={page.cta.emphasis}
        body={page.cta.body}
        actions={
          <>
            <EnquiryTrigger label={page.cta.primaryAction} service={slug} />
          </>
        }
      />
    </>
  );
}
