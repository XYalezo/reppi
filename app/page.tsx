import { Button } from '@/components/ui/button';
import { CredentialStrip } from '@/components/ui/credential-strip';
import { CtaBand } from '@/components/ui/cta-band';

import { EnquiryTrigger } from '@/components/ui/enquiry-trigger';
import { FactTable } from '@/components/ui/fact-table';

import { Hero } from '@/components/ui/hero';
import { JsonLd } from '@/components/ui/json-ld';
import { ProcessSteps } from '@/components/ui/process-steps';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceBlock } from '@/components/ui/service-block';
import { SplitSection } from '@/components/ui/split-section';
import { StatList } from '@/components/ui/stat-row';
import { TextLink } from '@/components/ui/text-link';
import { home } from '@/content/home';
import { aboutPage } from '@/content/pages';
import { serviceFamilies, serviceHref } from '@/content/services';

import { aliwalPulse } from '@/content/work';
import { pageMetadata } from '@/lib/metadata';
import { faqSchema } from '@/lib/schema';

export const metadata = pageMetadata({
  title: { absolute: 'Phanello Solutions | IT consulting and custom software' },
  description:
    'IT consulting and custom software from Aliwal North, Eastern Cape, for private-sector organisations and local municipalities.',
  path: '/',
  sharedImage: false,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(home.faq.items)} />
      <Hero
        eyebrow={home.hero.eyebrow}
        heading={home.hero.heading}
        emphasis={home.hero.emphasis}
        body={home.hero.body}
        actions={
          <>
            <EnquiryTrigger label={home.hero.primaryAction} service="custom-software-development" arrow />
            <Button variant="secondary" href="/services">
              {home.hero.secondaryAction}
            </Button>
          </>
        }
        matrix
      />
      <SplitSection theme="light" eyebrow={home.who.eyebrow} heading={home.who.heading} emphasis={home.who.emphasis}>
        <div className="space-y-10">
          <div className="max-w-measure space-y-4 text-lead text-ink-700">
            {home.who.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <StatList items={home.stats} />
          <CredentialStrip heading={aboutPage.founder.credentialsHeading} items={aboutPage.founder.credentials} />
        </div>
      </SplitSection>
      <Section theme="mist" labelledBy="services-heading">
        <SectionHeader
          id="services-heading"
          eyebrow={home.services.eyebrow}
          heading={home.services.heading}
          emphasis={home.services.emphasis}
          lede={home.services.lede}
          className="mb-12"
        />
        {serviceFamilies.map((family, index) => (
          <ServiceBlock
            key={family.id}
            id={`family-${family.id.toLowerCase()}`}
            index={String(index + 1).padStart(2, '0')}
            title={family.title}
            summary={home.services.summaries[index]}
            includes={family.services.map((service) => ({ label: service.name, href: serviceHref(service) }))}
          />
        ))}
      </Section>
      <Section theme="light" labelledBy="process-heading">
        <SectionHeader
          id="process-heading"
          eyebrow={home.process.eyebrow}
          heading={home.process.heading}
          emphasis={home.process.emphasis}
          className="mb-12"
        />
        <ProcessSteps steps={home.process.steps} />
      </Section>
      <SplitSection
        theme="mist"
        eyebrow={home.project.eyebrow}
        heading={home.project.heading}
        emphasis={home.project.emphasis}
      >
        <div className="space-y-6">
          <div className="max-w-measure space-y-4 text-lead text-ink-700">
            {aliwalPulse.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <FactTable rows={aliwalPulse.facts} />
          <TextLink href="/work/aliwal-pulse" arrow>
            {home.project.link}
          </TextLink>
        </div>
      </SplitSection>
      <CtaBand
        heading={home.cta.heading}
        emphasis={home.cta.emphasis}
        body={home.cta.body}
        actions={
          <>
            <EnquiryTrigger label={home.cta.primaryAction} />
          </>
        }
      />
    </>
  );
}
