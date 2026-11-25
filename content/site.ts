import { servicePages } from './services';

export const company = {
  name: 'Phanello Solutions',
  legalName: 'Phanello Solutions (Pty) Ltd',
  founded: 2025,
  base: 'Aliwal North, Eastern Cape',
  summary: 'IT consulting and custom software from Aliwal North, Eastern Cape.',
} as const;

export const contact = {
  phoneDisplay: '+27 63 007 8034',
  phoneHref: 'tel:+27630078034',
  whatsappHref: 'https://wa.me/27630078034',
  email: 'phanellotreasures@gmail.com',
  addressLines: ['3320 Joe Gqabi', 'Aliwal North, 9750', 'Eastern Cape'],
} as const;

export const complianceLine = 'Level 1 B-BBEE EME';

export const navigation = [
  {
    label: 'Services',
    href: '/services',
    children: servicePages.map((page) => ({ label: page.title, href: `/services/${page.slug}` })),
  },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerColumns = [
  {
    title: 'Services',
    links: [{ label: 'All services', href: '/services' }, ...navigation[0].children],
  },
  {
    title: 'Company',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy policy', href: '/privacy-policy' },
    ],
  },
] as const;

export function whatsappLink(message: string): string {
  return `${contact.whatsappHref}?text=${encodeURIComponent(message)}`;
}
