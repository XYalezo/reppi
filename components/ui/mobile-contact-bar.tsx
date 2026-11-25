'use client';

import { useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Button } from './button';

type MobileContactBarProps = {
  phoneHref: string;
  whatsappHref: string;
};

/** Fixed Call and WhatsApp buttons on phones. Hidden from lg, while a form field has focus (the on-screen keyboard is open), and while the enquiry drawer is open. */
export function MobileContactBar({ phoneHref, whatsappHref }: MobileContactBarProps) {
  useEffect(() => {
    const root = document.documentElement;
    const onIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select')) {
        root.dataset.keyboard = 'true';
      }
    };
    const onOut = () => {
      delete root.dataset.keyboard;
    };
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
      delete root.dataset.keyboard;
    };
  }, []);

  return (
    <aside
      aria-label="Quick contact"
      data-tone="dark"
      className="mobile-contact-bar safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-ink-700 bg-ink-900 lg:hidden"
    >
      <div className="container-fluid grid grid-cols-2 gap-3 py-3">
        <Button variant="secondary" href={phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Call us
        </Button>
        <Button variant="secondary" href={whatsappHref} external>
          WhatsApp
        </Button>
      </div>
    </aside>
  );
}
