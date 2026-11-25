import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Layout primitives. A multi-column layout always goes through `Split`, which gives each column its own grid track,
 * so a column can never fall into a single track by accident. Below lg everything is one column.
 */

export type SplitRatio = 'split-5-7' | 'split-4-8' | 'split-7-5' | 'split-6-6';

type SplitProps = {
  /** Named column ratio from lg. The first number is the lead column. */
  ratio: SplitRatio;
  /** The first column: usually the heading or the channels. */
  lead: ReactNode;
  /** The second column: the body, the form or the panel. */
  main: ReactNode;
  /** Vertical alignment of the two columns from lg. Default `start`. */
  align?: 'start' | 'center' | 'end';
  leadClassName?: string;
  mainClassName?: string;
  className?: string;
};

const alignment = {
  start: 'lg:items-start',
  center: 'lg:items-center',
  end: 'lg:items-end',
} as const;

export function Split({ ratio, lead, main, align = 'start', leadClassName, mainClassName, className }: SplitProps) {
  return (
    <div className={cn('split', ratio, alignment[align], className)}>
      <div className={leadClassName}>{lead}</div>
      <div className={mainClassName}>{main}</div>
    </div>
  );
}

type StackProps = {
  /** `copy` limits the column to about seven twelfths from lg, with a floor of 20 rem. `full` is the whole width. */
  width?: 'copy' | 'full';
  children: ReactNode;
  className?: string;
};

/** One column of content. The width is set here, not by a column span on the child. */
export function Stack({ width = 'full', children, className }: StackProps) {
  return <div className={cn(width === 'copy' && 'stack-copy', className)}>{children}</div>;
}
