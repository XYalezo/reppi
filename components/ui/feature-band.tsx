import type { ReactNode } from 'react';
import { Split } from './layout';
import { Section } from './section';
import { EmphasisHeading } from './section-header';
import type { PatternName } from './patterns';

type FeatureBandProps = {
  eyebrow: string;
  heading: string;
  emphasis: string;
  /** Short paragraphs. */
  children: ReactNode;
  /** Plain list of what is defined or included. */
  points?: ReadonlyArray<string>;
  /** A diagram built from the diagram primitives. */
  visual: ReactNode;
  action?: ReactNode;
  pattern?: PatternName;
};

export function FeatureBand({ eyebrow, heading, emphasis, children, points, visual, action, pattern = 'lattice' }: FeatureBandProps) {
  return (
    <Section theme="dark" pattern={pattern}>
      <Split
        ratio="split-6-6"
        align="center"
        lead={
          <>
          <p className="mb-4 font-mono text-label font-medium uppercase text-green-200">{eyebrow}</p>
          <EmphasisHeading as="h2" heading={heading} emphasis={emphasis} />
          <div className="mt-6 max-w-measure space-y-4 text-lead text-ink-300">{children}</div>
          {points && (
            <ul className="mt-8 max-w-measure border-t border-ink-700">
              {points.map((point) => (
                <li key={point} className="border-b border-ink-700 py-3 text-body">
                  {point}
                </li>
              ))}
            </ul>
          )}
          {action && <div className="mt-8">{action}</div>}
          </>
        }
        main={<div className="flex justify-center border border-ink-700 bg-ink-900 p-4 md:p-8">{visual}</div>}
      />
    </Section>
  );
}
