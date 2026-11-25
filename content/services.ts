export type ServicePage = {
  slug: string;
  title: string;
};

export type Service = {
  name: string;
  page: string;
  /** Id of the matching item on the service page. */
  anchor?: string;
};

export type ServiceFamily = {
  id: string;
  title: string;
  services: Service[];
};

export const servicePages: ServicePage[] = [
  { slug: 'custom-software-development', title: 'Custom software development' },
  { slug: 'ai-chatbots-and-ai-web-apps', title: 'AI chatbots and AI web apps' },
  { slug: 'workflow-automation', title: 'Workflow automation' },
  { slug: 'microsoft-365-and-intune', title: 'Microsoft 365 and Intune' },
  { slug: 'cloud-migration', title: 'Cloud migration' },
  { slug: 'it-support-and-hardware', title: 'IT support and hardware' },
  { slug: 'website-design', title: 'Website design' },
];

export const serviceFamilies: ServiceFamily[] = [
  {
    id: 'A',
    title: 'Custom Software and Web',
    services: [
      { name: 'Custom software development', page: 'custom-software-development' },
      { name: 'Website design', page: 'website-design' },
    ],
  },
  {
    id: 'B',
    title: 'AI and Automation',
    services: [
      { name: 'AI chatbots and AI web apps', page: 'ai-chatbots-and-ai-web-apps' },
      { name: 'Workflow automation', page: 'workflow-automation' },
    ],
  },
  {
    id: 'C',
    title: 'Microsoft 365 and Cloud',
    services: [
      { name: 'Microsoft 365 and Intune enrolment', page: 'microsoft-365-and-intune' },
      { name: 'Cloud migration', page: 'cloud-migration' },
      { name: 'Email domains and signature design', page: 'microsoft-365-and-intune', anchor: 'email-domains' },
    ],
  },
  {
    id: 'D',
    title: 'IT Support and Hardware',
    services: [
      { name: 'IT support and user management', page: 'it-support-and-hardware', anchor: 'user-management' },
      { name: 'Software upgrades', page: 'it-support-and-hardware', anchor: 'software-upgrades' },
      { name: 'PC and desktop hardware upgrades', page: 'it-support-and-hardware', anchor: 'pc-and-desktop-hardware' },
    ],
  },
];

export const serviceCount = serviceFamilies.reduce((total, family) => total + family.services.length, 0);

export function serviceHref(service: Service): string {
  return `/services/${service.page}${service.anchor ? `#${service.anchor}` : ''}`;
}

export function pageTitle(slug: string): string {
  const page = servicePages.find((item) => item.slug === slug);
  if (!page) throw new Error(`Unknown service page ${slug}`);
  return page.title;
}

export function familyLinks(family: ServiceFamily): Array<{ label: string; href: string }> {
  const slugs = Array.from(new Set(family.services.map((service) => service.page)));
  return slugs.map((slug) => ({ label: pageTitle(slug), href: `/services/${slug}` }));
}
