import type { ReactNode } from 'react';
import { Split, Stack } from './layout';
import { Breadcrumb, type BreadcrumbItem } from './breadcrumb';
import { Section } from './section';
import { EmphasisHeading } from './section-header';

type PageHeaderProps = {
  /** Trail from Home to this page. The last item has no href. */
  breadcrumb: ReadonlyArray<BreadcrumbItem>;
  /** Short mono line above the H1. */
  eyebrow: string;
  /** The page H1. */
  heading: string;
  emphasis: string;
  /** One or two sentences. */
  body: string;
  /** One Button. Its label names the page context. Leave out when the next section already holds the action. */
  actions?: ReactNode;
  /** Optional panel in the lower right of the band, for example a case study's facts. */
  aside?: ReactNode;
  /** Shorter band with a wider H1, for pages where the content below is the point (Contact). */
  compact?: boolean;
};

export function PageHeader({ breadcrumb, eyebrow, heading, emphasis, body, actions, aside, compact }: PageHeaderProps) {
  return (
    <Section theme="dark" art="page" underHeader compact={compact}>
      <div className="animate-rise">
        {aside ? (
          <Split ratio="split-7-5" align="end" lead={<>
        <Breadcrumb items={breadcrumb} />
        <p className="mb-4 mt-8 font-mono text-label font-medium uppercase text-green-200 md:mt-12">{eyebrow}</p>
        <EmphasisHeading as="h1" heading={heading} emphasis={emphasis} className={compact ? 'measure-display-wide' : undefined} />
        <p className="mt-6 max-w-measure text-lead text-ink-300">{body}</p>
        {actions && <div className="stack-actions mt-10">{actions}</div>}
          </>} main={aside} mainClassName="lg:max-w-narrow lg:justify-self-end" />
        ) : (
          <Stack width="full">
        <Breadcrumb items={breadcrumb} />
        <p className="mb-4 mt-8 font-mono text-label font-medium uppercase text-green-200 md:mt-12">{eyebrow}</p>
        <EmphasisHeading as="h1" heading={heading} emphasis={emphasis} className={compact ? 'measure-display-wide' : undefined} />
        <p className="mt-6 max-w-measure text-lead text-ink-300">{body}</p>
        {actions && <div className="stack-actions mt-10">{actions}</div>}
          </Stack>
        )}
      </div>
    </Section>
  );
}
