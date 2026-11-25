import { EnquiryForm } from '@/components/ui/enquiry-form';
import { FactTable } from '@/components/ui/fact-table';
import { Split } from '@/components/ui/layout';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { TextLink } from '@/components/ui/text-link';
import { WhatsappLink } from '@/components/ui/whatsapp-link';
import { enquiryServices, whatsappMessages } from '@/content/enquiry';
import { contactPage as page } from '@/content/pages';
import { contact } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHeader
        compact
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow={page.eyebrow}
        heading={page.heading}
        emphasis={page.emphasis}
        body={page.body}
      />
      <Section theme="light" spacing="sm">
        <Split
          ratio="split-5-7"
          lead={
            <div className="space-y-12">
            <div className="space-y-8">
              <SectionHeader
                eyebrow={page.whatsapp.eyebrow}
                heading={page.whatsapp.heading}
                emphasis={page.whatsapp.emphasis}
                lede={page.whatsapp.lede}
              />
              <WhatsappLink services={enquiryServices} messages={whatsappMessages} />
            </div>
            <FactTable
              rows={[
                { label: 'Phone', value: <TextLink href={contact.phoneHref}>{contact.phoneDisplay}</TextLink> },
                { label: 'Email', value: <TextLink href={`mailto:${contact.email}`}>{contact.email}</TextLink> },
                {
                  label: 'Address',
                  value: (
                    <address className="not-italic">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  ),
                },
              ]}
            />
            </div>
          }
          main={
          <div id="enquiry-form" className="scroll-mt-24 bg-mist p-6 md:p-10">
            <SectionHeader
              eyebrow={page.form.eyebrow}
              heading={page.form.heading}
              emphasis={page.form.emphasis}
              lede={page.form.lede}
              className="mb-10"
            />
            <div className="max-w-measure">
              <EnquiryForm services={enquiryServices} />
            </div>
          </div>
          }
        />
      </Section>
    </>
  );
}
