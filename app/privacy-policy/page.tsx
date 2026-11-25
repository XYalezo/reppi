import { Button } from '@/components/ui/button';
import { FactTable } from '@/components/ui/fact-table';
import { JsonLd } from '@/components/ui/json-ld';
import { PageHeader } from '@/components/ui/page-header';
import { Prose } from '@/components/ui/prose';
import { Section } from '@/components/ui/section';
import { SplitSection } from '@/components/ui/split-section';
import { company, contact } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

export const metadata = pageMetadata({
  title: 'Privacy policy',
  description: 'What the Phanello Solutions enquiry form collects, why, and how it is handled.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(getSiteUrl().origin, [
          { name: 'Home', path: '/' },
          { name: 'Privacy policy', path: '/privacy-policy' },
        ])}
      />
      <PageHeader
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy policy' }]}
        eyebrow="Privacy policy"
        heading="What the enquiry form collects and why"
        emphasis="collects"
        body="This policy covers the information you give Phanello Solutions through this website. It is written with the Protection of Personal Information Act (POPIA) in mind."
        actions={
          <Button href="/contact" arrow>
            Contact us about your information
          </Button>
        }
      />
      <SplitSection theme="light" eyebrow="In short" heading="The short version" emphasis="short">
        <FactTable
          rows={[
            { label: 'Collected', value: 'Your name, email address, an optional phone number, what your enquiry is about and your message.' },
            { label: 'Purpose', value: 'To read and answer your enquiry.' },
            { label: 'Sent to', value: `${company.legalName}, by email.` },
            { label: 'Tracking', value: 'No analytics, advertising or third-party scripts.' },
          ]}
        />
      </SplitSection>
      <Section theme="mist" width="measure" labelledBy="policy-heading">
        <h2 id="policy-heading" className="sr-only">
          Full policy
        </h2>
        <Prose>
          <h2>Who is responsible</h2>
          <p>
            {company.legalName}, {contact.addressLines.join(', ')}, is the responsible party for information collected
            through this website. You can reach us at <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
          <h2>What the enquiry form collects</h2>
          <ul>
            <li>Your name.</li>
            <li>Your email address.</li>
            <li>A phone number, if you choose to give one.</li>
            <li>The service your enquiry is about.</li>
            <li>The message you write.</li>
          </ul>
          <h2>Why it is collected</h2>
          <p>
            The information is collected to read and answer your enquiry. It is not used for any other purpose.
          </p>
          <h2>How it is sent</h2>
          <p>
            The form sends your enquiry by email to {company.name} through a mail server set up by the company. No
            third-party form service receives it.
          </p>
          <h2>What else the site records</h2>
          <p>
            To limit repeated submissions, the form keeps your internet address in the server&rsquo;s memory for a short
            time. The site does not store it in a database.
          </p>
          <h2>Cookies, analytics and third-party scripts</h2>
          <p>This site does not use analytics, advertising or third-party scripts, and it does not set tracking cookies.</p>
          <h2>WhatsApp</h2>
          <p>
            If you use a WhatsApp link, WhatsApp opens with a message ready to send. What you send from there is handled
            by WhatsApp under its own terms.
          </p>
          <h2>Your information</h2>
          <p>
            You may ask {company.name} what information it holds about you, to correct it, or to delete it. Email{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> to make a request.
          </p>
          <h2>Last updated</h2>
          <p>20 November 2026.</p>
        </Prose>
      </Section>
    </>
  );
}
