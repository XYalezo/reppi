import Link from 'next/link';
import type { ReactNode } from 'react';
import { Stack } from './layout';
import { Section } from './section';
import { EmphasisHeading } from './section-header';
import type { PatternName } from './patterns';

type HeroIndexItem = { id: string; title: string; href: string };

type HeroProps = {
  /** Short mono line above the H1. */
  eyebrow: string;
  /** The page H1. Plain statement of what the company does. */
  heading: string;
  emphasis: string;
  /** One short paragraph. */
  body: string;
  /** Two Buttons. Labels name their context. */
  actions: ReactNode;
  /** The service families, shown as a row along the bottom of the hero (a list on phones). Each links to its block on the page. */
  index?: ReadonlyArray<HeroIndexItem>;
  pattern?: PatternName;
  /** Matrix rain behind the hero. Used on the home page only. */
  matrix?: boolean;
  /** `h1` on a real page; `h2` when shown as a specimen. */
  headingLevel?: 'h1' | 'h2';
};

export function Hero({ eyebrow, heading, emphasis, body, actions, index, pattern, matrix, headingLevel = 'h1' }: HeroProps) {
  const live = headingLevel === 'h1';
  return (
    <Section theme="dark" art="hero" spacing="lg" pattern={pattern} matrix={matrix} hero={live}>
      <div className="animate-rise">
        <Stack width="copy">
          <p data-matrix-mask className="mb-4 w-fit font-mono text-label font-medium uppercase text-green-200">
            {eyebrow}
          </p>
          <div data-matrix-mask className="w-fit">
            <EmphasisHeading as={headingLevel} heading={heading} emphasis={emphasis} />
          </div>
          <p data-matrix-mask className="mt-6 max-w-measure text-lead text-ink-300">
            {body}
          </p>
          <div data-matrix-mask className="stack-actions mt-10 w-full sm:w-fit">
            {actions}
          </div>
        </Stack>
      </div>
      {index && (
        <nav aria-label="Service families" className="mt-auto pt-12">
          <ol data-matrix-mask="band" className="grid border-t border-ink-700 sm:grid-cols-2 lg:grid-cols-4">
            {index.map((item) => (
              <li key={item.id}>
                <Link
                  prefetch={false}
                  href={item.href}
                  className="group flex min-h-14 items-center gap-4 py-3 text-body text-ink-300 transition-colors duration-150 ease-standard hover:text-white lg:py-5"
                >
                  <span className="font-mono text-label font-medium text-green-200">{item.id}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </Section>
  );
}
