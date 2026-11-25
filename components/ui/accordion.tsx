'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionItem = {
  id: string;
  question: string;
  /** Plain text, so the same data can feed FAQ structured data. */
  answer: string;
};

type AccordionProps = {
  items: ReadonlyArray<AccordionItem>;
  /** Heading level of each question. */
  headingLevel?: 'h2' | 'h3';
};

export function Accordion({ items, headingLevel = 'h3' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <div className="border-t border-ink-900 on-dark:border-white">
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-ink-200 on-dark:border-ink-700">
            <Heading>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left text-lead font-semibold hover:text-green-800 on-dark:hover:text-white"
              >
                {item.question}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-250 ease-standard group-aria-expanded:rotate-180"
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={open ? 'true' : 'false'}
              className="accordion-panel"
            >
              <div className="overflow-hidden">
                <p className="max-w-measure pb-6 text-body text-ink-700 on-dark:text-ink-300">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
