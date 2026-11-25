import type { ReactNode } from 'react';
import { Split } from './layout';
import { Section } from './section';
import { EmphasisHeading } from './section-header';

type CtaBandProps = {
  heading: string;
  emphasis: string;
  /** One or two sentences. */
  body?: string;
  /** One or two Buttons. Each label names its context. */
  actions: ReactNode;
};

export function CtaBand({ heading, emphasis, body, actions }: CtaBandProps) {
  return (
    <Section theme="brand" art="cta" spacing="lg">
      <Split
        ratio="split-7-5"
        align="end"
        lead={
          <>
            <EmphasisHeading as="h2" heading={heading} emphasis={emphasis} />
            {body && <p className="mt-6 max-w-measure text-lead text-ink-300">{body}</p>}
          </>
        }
        main={<div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">{actions}</div>}
      />
    </Section>
  );
}
