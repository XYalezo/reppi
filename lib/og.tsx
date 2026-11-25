import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import tokens from '@/tokens/tokens.json';
import { company } from '@/content/site';
import { splitEmphasis } from '@/lib/emphasis';

export const ogSize = { width: 1200, height: 630 };

const { ink, green } = tokens.color;
const colors = {
  ink: ink['900'],
  inkSoft: ink['300'],
  green: green['500'],
  greenLight: green['200'],
  greenEdge: green['700'],
  white: tokens.color.white,
};

/** The three paths of the P mark, in the coordinate space of the supplied icon file. Padded box: x 79 to 984, y 66 to 1019. */
const markPaths = {
  outer: 'M88 347.5L560 75L975 315V590L588 813.5V653.5L836 510.3V394.4L560 235L88 507.5Z',
  stem: 'M330 505L560 372.2L698.5 452.2L469 584.7V929.7L330 1010Z',
  facet: 'M88 644.5L211 573.5V773.5L88 844.5Z',
};

/** Plain function, not a component: the image renderer only accepts intrinsic elements inside an svg. */
function markShapes(main: string, facet: string) {
  return [
    <path key="outer" d={markPaths.outer} fill={main} stroke={main} />,
    <path key="stem" d={markPaths.stem} fill={main} stroke={main} />,
    <path key="facet" d={markPaths.facet} fill={facet} stroke={facet} />,
  ];
}

type OgInput = {
  eyebrow: string;
  title: string;
  emphasis: string;
};

async function font(file: string): Promise<Buffer> {
  return readFile(path.join(process.cwd(), 'app', 'fonts', file));
}

export async function renderOg({ eyebrow, title, emphasis }: OgInput) {
  const [display, mono] = await Promise.all([font('og-archivo-900.woff'), font('og-plex-mono-500.woff')]);
  const [before, stressed, after] = splitEmphasis(title, emphasis);
  const words = [
    ...before.split(' ').filter(Boolean).map((text) => ({ text, accent: false })),
    ...stressed.split(' ').filter(Boolean).map((text) => ({ text, accent: true })),
    ...after.split(' ').filter(Boolean).map((text) => ({ text, accent: false })),
  ];
  const size = title.length > 44 ? 64 : title.length > 30 ? 76 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: colors.ink,
          color: colors.white,
          padding: 72,
          fontFamily: 'Plex Mono',
        }}
      >
        <svg width="760" height="260" viewBox="0 0 760 260" style={{ position: 'absolute', top: 0, right: 0 }}>
          <polygon points="260,250 500,250 625,125 760,125 760,0 510,0" fill={colors.greenEdge} />
          <line x1="510" y1="0" x2="260" y2="250" stroke={colors.green} strokeWidth="3" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="76" height="80" viewBox="79 66 905 953" strokeLinejoin="round" strokeWidth="18">
            {markShapes(colors.white, colors.green)}
          </svg>
          <div style={{ display: 'flex', width: 2, height: 80, background: colors.white }} />
          <div style={{ display: 'flex', flexDirection: 'column', textTransform: 'uppercase', lineHeight: 1 }}>
            <div style={{ display: 'flex', fontFamily: 'Archivo', fontWeight: 900, fontSize: 44, letterSpacing: 2 }}>Phanello</div>
            <div style={{ display: 'flex', fontFamily: 'Plex Mono', fontWeight: 500, fontSize: 17, letterSpacing: 23, marginTop: 10, color: colors.inkSoft }}>
              Solutions
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: colors.greenLight }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontFamily: 'Archivo',
              fontWeight: 900,
              fontSize: size,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: -2,
            }}
          >
            {words.map((word, index) => (
              <div key={`${word.text}-${index}`} style={{ display: 'flex', marginRight: 20, color: word.accent ? colors.green : colors.white }}>
                {word.text}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 2, textTransform: 'uppercase', color: colors.inkSoft }}>
          {company.base}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Archivo', data: display, weight: 900, style: 'normal' },
        { name: 'Plex Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}

type IconVariant = 'favicon' | 'apple';

/**
 * Favicon: rounded green tile with the navy P, laid out like the supplied icon file (the group is moved by 32.77 and
 * 28.15 and scaled by 0.42 on a 512 tile). Apple icon: the same on a full-bleed square, because iOS applies its own
 * mask, with the P scaled down to leave about 18 % clear on every side.
 */
export function renderIcon(side: number, variant: IconVariant = 'favicon') {
  const tile = 512;
  const apple = variant === 'apple';
  const scale = apple ? 0.34 : 0.42;
  const x = apple ? (tile - 905 * scale) / 2 - 79 * scale : 32.77;
  const y = apple ? (tile - 953 * scale) / 2 - 66 * scale : 28.15;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <svg width={side} height={side} viewBox={`0 0 ${tile} ${tile}`}>
          <rect width={tile} height={tile} rx={apple ? 0 : 112} fill={colors.green} />
          <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round" strokeWidth="18">
            {markShapes(colors.ink, colors.ink)}
          </g>
        </svg>
      </div>
    ),
    { width: side, height: side },
  );
}
