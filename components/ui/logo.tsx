import { cn } from '@/lib/cn';

type LogoProps = {
  /** `mark` is the P alone; `lockup` adds the rule and the stacked company name. */
  variant?: 'mark' | 'lockup';
  className?: string;
};

/**
 * The P mark as one inline SVG. The three paths are copied from the supplied icon file. They are written out here and
 * not shared through `<use>`, because colour classes set by an ancestor do not reach into a `<use>` shadow tree.
 * The two main paths follow the surface (navy on light, white on dark); the small facet is always the logo green.
 */
function LogoMark({ labelled, className }: { labelled: boolean; className?: string }) {
  return (
    <svg
      viewBox="79 66 905 953"
      strokeLinejoin="round"
      strokeWidth={18}
      className={cn('h-11 w-auto shrink-0', className)}
      {...(labelled ? { role: 'img', 'aria-label': 'Phanello Solutions' } : { 'aria-hidden': true })}
    >
      <path
        d="M88 347.5L560 75L975 315V590L588 813.5V653.5L836 510.3V394.4L560 235L88 507.5Z"
        className="fill-ink-900 stroke-ink-900 on-dark:fill-white on-dark:stroke-white"
      />
      <path
        d="M330 505L560 372.2L698.5 452.2L469 584.7V929.7L330 1010Z"
        className="fill-ink-900 stroke-ink-900 on-dark:fill-white on-dark:stroke-white"
      />
      <path d="M88 644.5L211 573.5V773.5L88 844.5Z" className="fill-green-500 stroke-green-500" />
    </svg>
  );
}

export function Logo({ variant = 'lockup', className }: LogoProps) {
  if (variant === 'mark') return <LogoMark labelled className={className} />;
  return (
    <span className={cn('inline-flex items-center gap-3.5', className)}>
      <LogoMark labelled={false} />
      <span aria-hidden="true" className="my-1 w-px self-stretch bg-ink-900 on-dark:bg-white/90" />
      <span className="flex flex-col items-start font-display uppercase font-expanded">
        <span className="text-wordmark font-extrabold text-ink-900 on-dark:text-white">Phanello</span>
        <span className="logo-sub text-wordmark-sub font-normal text-ink-700 on-dark:text-ink-300">Solutions</span>
      </span>
    </span>
  );
}
