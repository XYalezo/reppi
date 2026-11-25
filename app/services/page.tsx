import { CtaBand } from '@/components/ui/cta-band';
import { EnquiryTrigger } from '@/components/ui/enquiry-trigger';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { ProcessSteps } from '@/components/ui/process-steps';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceBlock } from '@/components/ui/service-block';
import { home, servicesPage } from '@/content/home';
import { serviceFamilies, serviceHref } from '@/content/services';

import { getSiteUrl } from '@/lib/site-url';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = pageMetadata({
  title: 'Services',
  description: servicesPage.metaDescription,
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        eyebrow={servicesPage.eyebrow}
        heading={servicesPage.heading}
        emphasis={servicesPage.emphasis}
        body={servicesPage.body}
        actions={<EnquiryTrigger label={servicesPage.headerAction} arrow />}
      />
      <Section theme="light" labelledBy="families-heading">
        <h2 id="families-heading" className="sr-only">
          Service families
        </h2>
        {serviceFamilies.map((family, index) => (
          <ServiceBlock
            key={family.id}
            id={`family-${family.id.toLowerCase()}`}
            index={String(index + 1).padStart(2, '0')}
            title={family.title}
            summary={home.services.summaries[index]}
            includes={family.services.map((service, i) =>
              i === 0 ? { label: service.name, href: serviceHref(service) } : service.name,
            )}
          />
        ))}
      </Section>
      <Section theme="mist" labelledBy="process-heading">
        <SectionHeader
          id="process-heading"
          eyebrow={home.process.eyebrow}
          heading={home.process.heading}
          emphasis={home.process.emphasis}
          className="mb-12"
        />
        <ProcessSteps steps={home.process.steps} />
      </Section>
      <CtaBand
        heading={servicesPage.cta.heading}
        emphasis={servicesPage.cta.emphasis}
        body={servicesPage.cta.body}
        actions={
          <>
            <EnquiryTrigger label={servicesPage.cta.primaryAction} />
          </>
        }
      />
    </>
  );
}
