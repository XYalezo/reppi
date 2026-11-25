export function splitEmphasis(heading: string, emphasis: string): [string, string, string] {
  const start = heading.toLowerCase().indexOf(emphasis.toLowerCase());
  if (start === -1) throw new Error(`Emphasis "${emphasis}" is not part of heading "${heading}"`);
  const end = start + emphasis.length;
  return [heading.slice(0, start), heading.slice(start, end), heading.slice(end)];
}
