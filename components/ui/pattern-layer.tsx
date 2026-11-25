import { useId } from 'react';
import { cn } from '@/lib/cn';
import { patternTiles, type PatternName } from './patterns';

type PatternLayerProps = {
  /** Which tile from the patterns module to repeat. */
  pattern: PatternName;
  /** Surface the pattern sits on. Dark surfaces use 10% opacity, light surfaces 5%. */
  tone: 'dark' | 'light';
};

export function PatternLayer({ pattern, tone }: PatternLayerProps) {
  const id = `pattern-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const tile = patternTiles[pattern];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn(
        'pointer-events-none absolute inset-0 size-full',
        tone === 'dark' ? 'text-white opacity-10' : 'text-green-800 opacity-5',
      )}
    >
      <defs>
        <pattern id={id} width={tile.size} height={tile.size} patternUnits="userSpaceOnUse">
          {tile.shapes}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
