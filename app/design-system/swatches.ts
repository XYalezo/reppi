export type Swatch = {
  group: string;
  name: string;
  usage: string;
  background: string;
};

export const swatches: ReadonlyArray<Swatch> = [
  { group: 'Surfaces', name: 'white', usage: 'Light section surface', background: 'bg-white' },
  { group: 'Surfaces', name: 'mist', usage: 'Alternate light surface, stat row', background: 'bg-mist' },
  { group: 'Ink and neutrals', name: 'ink-200', usage: 'Hairlines on light', background: 'bg-ink-200' },
  { group: 'Ink and neutrals', name: 'ink-300', usage: 'Muted text on dark', background: 'bg-ink-300' },
  { group: 'Ink and neutrals', name: 'ink-500', usage: 'Form borders and diagram lines', background: 'bg-ink-500' },
  { group: 'Ink and neutrals', name: 'ink-600', usage: 'Muted text on white and Mist', background: 'bg-ink-600' },
  { group: 'Ink and neutrals', name: 'ink-700', usage: 'Hairlines on dark, secondary body text on light', background: 'bg-ink-700' },
  { group: 'Ink and neutrals', name: 'ink-800', usage: 'Raised dark surface, diagram nodes', background: 'bg-ink-800' },
  { group: 'Ink and neutrals', name: 'ink-900', usage: 'Navy: dark sections, body text on light', background: 'bg-ink-900' },
  { group: 'Green', name: 'green-50', usage: 'Hover tint on light', background: 'bg-green-50' },
  { group: 'Green', name: 'green-100', usage: 'Tint surface', background: 'bg-green-100' },
  { group: 'Green', name: 'green-200', usage: 'Eyebrows and numerals on dark', background: 'bg-green-200' },
  { group: 'Green', name: 'green-300', usage: 'Primary action hover', background: 'bg-green-300' },
  { group: 'Green', name: 'green-400', usage: 'Primary action pressed, matrix glyphs', background: 'bg-green-400' },
  { group: 'Green', name: 'green-500', usage: 'Logo green: primary action, emphasis on dark, focus ring on dark', background: 'bg-green-500' },
  { group: 'Green', name: 'green-600', usage: 'Lit edge of the background art. Not for text', background: 'bg-green-600' },
  { group: 'Green', name: 'green-700', usage: 'Focus ring on light', background: 'bg-green-700' },
  { group: 'Green', name: 'green-800', usage: 'Green on light: eyebrows, links, emphasis', background: 'bg-green-800' },
  { group: 'Green', name: 'green-900', usage: 'Deep shade, corner wash on dark', background: 'bg-green-900' },
  { group: 'Green', name: 'green-950', usage: 'Deepest shade', background: 'bg-green-950' },
];
