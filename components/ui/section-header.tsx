import { cn } from '@/lib/cn';
import { splitEmphasis } from '@/lib/emphasis';

type HeadingLevel = 'h1' | 'h2' | 'h3';

type EmphasisHeadingProps = {
  as?: HeadingLevel;
  /** Full heading text. The H1 is set in uppercase; H2 and H3 keep the sentence case written here. */
  heading: string;
  /** Word or phrase inside `heading` set in italic: green-500 on dark surfaces, green-800 on light. */
  emphasis: string;
  id?: string;
  className?: string;
};

const sizes: Record<HeadingLevel, string> = {
  h1: 'text-display measure-display',
  h2: 'text-heading',
  h3: 'text-title',
};

/** An H2 longer than this many characters drops from the heading size to the smaller heading-sm size, so it stays at two lines or three short ones. */
const longHeading = 32;

/** An H1 longer than this many characters uses the display-sm size with a wider measure. */
const longPageHeading = 36;

export function EmphasisHeading({ as: Tag = 'h2', heading, emphasis, id, className }: EmphasisHeadingProps) {
  const [before, stressed, after] = splitEmphasis(heading, emphasis);
  const size =
    Tag === 'h2' && heading.length > longHeading
      ? 'text-heading-sm'
      : Tag === 'h1' && heading.length > longPageHeading
        ? 'text-display-sm measure-display-long'
        : sizes[Tag];
  // Only the H1 is uppercase and carries the one emphasis word on the page. H2 and H3 are sentence case, plain text.
  if (Tag !== 'h1') {
    return (
      <Tag id={id} className={cn('text-balance font-display font-black font-condensed', size, className)}>
        {heading}
      </Tag>
    );
  }
  return (
    <Tag id={id} className={cn('text-balance font-display font-black uppercase font-condensed', size, className)}>
      {before}
      <em className="italic text-green-800 on-dark:text-green-500">{stressed}</em>
      {after}
    </Tag>
  );
}

type SectionHeaderProps = {
  /** Short mono label naming the section. */
  eyebrow: string;
  heading: string;
  emphasis: string;
  /** One or two sentences under the heading. */
  lede?: string;
  as?: HeadingLevel;
  id?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, heading, emphasis, lede, as = 'h2', id, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="mb-4 font-mono text-label font-medium uppercase text-green-800 on-dark:text-green-200">{eyebrow}</p>
      <EmphasisHeading as={as} heading={heading} emphasis={emphasis} id={id} />
      {lede && <p className="mt-6 max-w-measure text-lead text-ink-700 on-dark:text-ink-300">{lede}</p>}
    </div>
  );
}
