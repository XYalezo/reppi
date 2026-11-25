import { cn } from '@/lib/cn';
import { Section } from './section';

type Stat = {
  value: string;
  label: string;
};

type StatListProps = {
  /** Short facts of the same kind: a figure and what it counts. Three or four. */
  items: ReadonlyArray<Stat>;
  className?: string;
};

const columns: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/** The list on its own, for use inside another section. */
export function StatList({ items, className }: StatListProps) {
  return (
    <dl className={cn('grid grid-cols-1 gap-x-6 gap-y-2 lg:gap-x-8', columns[items.length] ?? columns[4], className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col-reverse justify-end gap-2 border-t border-ink-900 pt-4 pb-4">
          <dt className="font-mono text-label font-medium uppercase text-ink-600">{item.label}</dt>
          <dd className="font-display text-heading-sm font-extrabold uppercase font-condensed text-green-800">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

type StatRowProps = StatListProps & {
  theme?: 'light' | 'mist';
};

/** A full-width band of stats. */
export function StatRow({ items, theme = 'mist' }: StatRowProps) {
  return (
    <Section theme={theme} spacing="xs">
      <StatList items={items} />
    </Section>
  );
}
