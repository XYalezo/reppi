import type { ReactNode } from 'react';

export type PatternName = 'rings' | 'lattice';

export type PatternTile = {
  size: number;
  shapes: ReactNode;
};

export const patternTiles: Record<PatternName, PatternTile> = {
  rings: {
    size: 128,
    shapes: (
      <>
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <circle cx="64" cy="64" r="24" strokeOpacity="0.6" />
          <circle cx="64" cy="64" r="14.5" />
          <path d="M47.6 54.9 64 64 80.4 53.1M64 64 54.9 79.5M64 64 81.5 77.5" />
        </g>
        <g fill="currentColor">
          <circle cx="47.6" cy="54.9" r="2.4" />
          <circle cx="80.4" cy="53.1" r="2.4" />
          <circle cx="54.9" cy="79.5" r="2.4" />
          <circle cx="81.5" cy="77.5" r="2.4" />
          <circle cx="64" cy="64" r="3.4" />
        </g>
      </>
    ),
  },
  lattice: {
    size: 20,
    shapes: <circle cx="10" cy="10" r="1.25" fill="currentColor" />,
  },
};
