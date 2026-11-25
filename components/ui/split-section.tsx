import type { ReactNode } from 'react';
import { Split } from './layout';
import { Section, type SectionTheme } from './section';
import { SectionHeader } from './section-header';

type SplitSectionProps = {
  theme?: SectionTheme;
  eyebrow: string;
  heading: string;
  emphasis: string;
  lede?: string;
  /** Content for the wide column. */
  children: ReactNode;
};

/** The heading is always on the left. From lg it stays in view while the wide column scrolls past it. */
export function SplitSection({ theme = 'light', eyebrow, heading, emphasis, lede, children }: SplitSectionProps) {
  return (
    <Section theme={theme}>
      <Split
        ratio="split-5-7"
        leadClassName="lg:sticky lg:top-24 lg:self-start"
        lead={<SectionHeader eyebrow={eyebrow} heading={heading} emphasis={emphasis} lede={lede} />}
        main={children}
      />
    </Section>
  );
}
