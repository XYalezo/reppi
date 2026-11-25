import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './container';
import { MatrixRain } from './matrix-rain';
import { PatternLayer } from './pattern-layer';
import type { PatternName } from './patterns';

export type SectionTheme = 'light' | 'mist' | 'dark' | 'brand';

/** Background art from `public/brand/`. `hero` is the home hero, `page` an inner page header, `cta` the closing band. */
export type SectionArt = 'hero' | 'page' | 'cta';

type SectionProps = {
  /** Surface. Dark and brand are navy (brand is the closing band); light alternates white and Mist. */
  theme?: SectionTheme;
  /** Vertical padding step from the section padding scale. */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** Container width, or `full` for an edge-to-edge band. */
  width?: 'measure' | 'page' | 'wide' | 'full';
  /** Background art that replaces the shade gradient. Dark and brand surfaces only. */
  art?: SectionArt;
  /** One tile from the patterns module. Use at most one per viewport. */
  pattern?: PatternName;
  /** Matrix rain behind the content. For the home page hero only. */
  matrix?: boolean;
  /** Exactly one viewport tall, header overlays the top. Home hero only. */
  hero?: boolean;
  /** Page header band that starts behind the fixed header. */
  underHeader?: boolean;
  /** Shorter bottom padding for an under-header band. */
  compact?: boolean;
  id?: string;
  /** Id of the heading that names this section. */
  labelledBy?: string;
  as?: 'section' | 'div';
  className?: string;
  children: ReactNode;
};

const themes: Record<SectionTheme, string> = {
  light: 'bg-white text-ink-900',
  mist: 'bg-mist text-ink-900',
  dark: 'bg-ink-900 text-white',
  brand: 'bg-ink-900 text-white',
};

/** Gradient shading. Left out when the section carries background art, because the two would fight over `background-image`. */
const shades: Partial<Record<SectionTheme, string>> = {
  mist: 'shade-mist',
  dark: 'shade-ink',
};

const arts: Record<SectionArt, string> = {
  hero: 'art-hero',
  page: 'art-page',
  cta: 'art-cta',
};

const spacings: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: '',
  xs: 'py-6 md:py-8',
  sm: 'py-12 md:py-16',
  md: 'py-18 md:py-24',
  lg: 'py-24 md:py-32',
};

export function Section({
  theme = 'light',
  spacing = 'md',
  width = 'page',
  art,
  pattern,
  matrix,
  hero,
  underHeader,
  compact,
  id,
  labelledBy,
  as: Tag = 'section',
  className,
  children,
}: SectionProps) {
  const tone = theme === 'dark' || theme === 'brand' ? 'dark' : 'light';
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      data-hero={hero || underHeader ? '' : undefined}
      data-compact={compact ? '' : undefined}
      className={cn(
        'relative',
        (pattern || matrix) && 'overflow-hidden',
        // Art sections take their base colour from the art class, which fades the art into it. `bg-ink-900` would show as a seam.
        art ? ['text-white', arts[art]].join(' ') : [themes[theme], pattern ? undefined : shades[theme]].filter(Boolean).join(' '),
        hero ? 'hero-shell' : underHeader ? 'under-header' : spacings[spacing],
        className,
      )}
    >
      {pattern && <PatternLayer pattern={pattern} tone={tone} />}
      {matrix && <MatrixRain />}
      {width === 'full' ? (
        <div className="relative">{children}</div>
      ) : (
        <Container width={width} className={cn('relative', hero && 'hero-inner')}>
          {children}
        </Container>
      )}
    </Tag>
  );
}
