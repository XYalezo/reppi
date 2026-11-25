import type { ReactNode } from 'react';

type FactTableProps = {
  /** Label and value pairs, read as a definition list. Values may contain links. */
  rows: ReadonlyArray<{ label: string; value: ReactNode }>;
};

export function FactTable({ rows }: FactTableProps) {
  return (
    <dl className="border-t border-ink-900 on-dark:border-white">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-ink-200 py-4 on-dark:border-ink-700 sm:grid-cols-3 sm:gap-6"
        >
          <dt className="font-mono text-label font-medium uppercase text-ink-600 on-dark:text-ink-300">{row.label}</dt>
          <dd className="text-body sm:col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
