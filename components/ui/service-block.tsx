import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type ServiceBlockProps = {
  /** Two-digit position, such as `01`. */
  index: string;
  title: string;
  summary: string;
  /** The services in this family. An item with an href is a link row into its page. */
  includes: ReadonlyArray<string | { label: string; href: string }>;
  /** Anchor id, so the hero index can link to the block. */
  id?: string;
  headingLevel?: 'h2' | 'h3';
};

const row = 'border-b border-ink-200 on-dark:border-ink-700';

export function ServiceBlock({ index, title, summary, includes, id, headingLevel = 'h3' }: ServiceBlockProps) {
  const Heading = headingLevel;
  return (
    <article id={id} className="grid scroll-mt-24 gap-6 border-t border-ink-900 py-10 on-dark:border-white lg:grid-cols-12 lg:gap-8">
      <p className="font-mono text-label font-medium text-green-800 on-dark:text-green-200 lg:col-span-1">{index}</p>
      <div className="lg:col-span-6">
        <Heading className="font-display text-title font-extrabold font-condensed">{title}</Heading>
        <p className="mt-4 max-w-measure text-body text-ink-700 on-dark:text-ink-300">{summary}</p>
      </div>
      <ul className="border-t border-ink-200 on-dark:border-ink-700 lg:col-span-5">
        {includes.map((item) =>
          typeof item === 'string' ? (
            <li key={item} className={`${row} py-3 text-body`}>
              {item}
            </li>
          ) : (
            <li key={item.label} className={row}>
              <Link
                prefetch={false}
                href={item.href}
                className="group flex min-h-12 items-center justify-between gap-4 py-3 text-body font-medium transition-colors duration-150 ease-standard hover:text-green-800 on-dark:hover:text-white"
              >
                {item.label}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-150 ease-standard group-hover:translate-x-1"
                />
              </Link>
            </li>
          ),
        )}
      </ul>
    </article>
  );
}
