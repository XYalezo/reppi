'use client';

import { usePathname } from 'next/navigation';
import { whatsappLink } from '@/content/site';
import { Button } from './button';
import { EnquiryTrigger } from './enquiry-trigger';

type HeaderActionProps = {
  label: string;
  /** Opening WhatsApp message used on the Contact page. */
  whatsappLabel: string;
  whatsappMessage: string;
};

/** The enquiry button, except on /contact, where the form is already on the page: there it opens WhatsApp instead of a second copy of the form. */
export function HeaderAction({ label, whatsappLabel, whatsappMessage }: HeaderActionProps) {
  const pathname = usePathname();
  if (pathname === '/contact') {
    return (
      <Button variant="secondary" href={whatsappLink(whatsappMessage)} external>
        {whatsappLabel}
      </Button>
    );
  }
  return <EnquiryTrigger label={label} variant="secondary" />;
}
