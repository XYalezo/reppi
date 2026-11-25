import { servicePages } from './services';
import { servicePageContent } from './service-pages';

export const enquiryServices: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'general', label: 'Something else or not sure' },
  ...servicePages.map((page) => ({ value: page.slug, label: page.title })),
];

export const whatsappMessages: Record<string, string> = {
  general: 'Hello Phanello Solutions, I would like to ask about your services.',
  ...Object.fromEntries(servicePageContent.map((page) => [page.slug, page.cta.whatsappMessage])),
};
