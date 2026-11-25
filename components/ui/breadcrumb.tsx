import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  /** Omit on the current page. */
  href?: string;
};

type BreadcrumbProps = {
  items: ReadonlyArray<BreadcrumbItem>;
  /** Accessible name of the navigation landmark. Make it unique if a page has two. */
  label?: string;
};

/** The full trail from md. On phones the trail stays in the page for screen readers and a single back link to the parent page is shown. */
export function Breadcrumb({ items, label = 'Breadcrumb' }: BreadcrumbProps) {
  const parent = items.length > 1 ? items[items.length - 2] : undefined;
  return (
    <nav aria-label={label}>
      {parent?.href && (
        <Link
          prefetch={false}
          href={parent.href}
          className="inline-flex min-h-12 items-center gap-2 font-mono text-label uppercase text-ink-600 underline underline-offset-4 on-dark:text-ink-300 md:hidden"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {parent.label}
        </Link>
      )}
      <ol className="sr-only flex-wrap items-center gap-2 font-mono text-label uppercase text-ink-600 on-dark:text-ink-300 md:not-sr-only md:flex">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {item.href ? (
              <Link prefetch={false} href={item.href} className="underline underline-offset-4 hover:decoration-2">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink-900 on-dark:text-white">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
