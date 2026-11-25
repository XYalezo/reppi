import { company, contact } from '@/content/site';

type Faq = { question: string; answer: string };
type Crumb = { name: string; path: string };

export function organizationSchema(origin: string) {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: contact.addressLines[0],
    addressLocality: 'Aliwal North',
    postalCode: '9750',
    addressRegion: 'Eastern Cape',
    addressCountry: 'ZA',
  };
  const areaServed = [
    { '@type': 'AdministrativeArea', name: 'Eastern Cape' },
    { '@type': 'Country', name: 'South Africa' },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: company.name,
        legalName: company.legalName,
        url: origin,
        email: contact.email,
        telephone: contact.phoneDisplay,
        foundingDate: String(company.founded),
        founder: { '@type': 'Person', name: 'Xolisa Yalezo' },
        address,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${origin}/#service`,
        name: company.name,
        url: origin,
        email: contact.email,
        telephone: contact.phoneDisplay,
        address,
        areaServed,
        parentOrganization: { '@id': `${origin}/#organization` },
      },
    ],
  };
}

export function faqSchema(items: ReadonlyArray<Faq>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(origin: string, crumbs: ReadonlyArray<Crumb>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${origin}${crumb.path}`,
    })),
  };
}
