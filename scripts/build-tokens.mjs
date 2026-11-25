import { readFileSync, writeFileSync } from 'node:fs';

const source = new URL('../tokens/tokens.json', import.meta.url);
const target = new URL('../app/tokens.css', import.meta.url);
const t = JSON.parse(readFileSync(source, 'utf8'));

const theme = ['@theme static {', '  --color-*: initial;'];
for (const [name, value] of Object.entries(t.color)) {
  if (typeof value === 'string') theme.push(`  --color-${name}: ${value};`);
  else for (const [step, hex] of Object.entries(value)) theme.push(`  --color-${name}-${step}: ${hex};`);
}
theme.push('  --text-*: initial;');
for (const [name, s] of Object.entries(t.text)) {
  theme.push(`  --text-${name}: ${s.size};`);
  theme.push(`  --text-${name}--line-height: ${s.lineHeight};`);
  theme.push(`  --text-${name}--letter-spacing: ${s.tracking};`);
}
theme.push(`  --spacing: ${t.spacing.base / 16}rem;`);
theme.push('  --container-*: initial;');
for (const [name, v] of Object.entries(t.container)) theme.push(`  --container-${name}: ${v};`);
theme.push('  --radius-*: initial;');
for (const [name, v] of Object.entries(t.radius)) theme.push(`  --radius-${name}: ${v};`);
theme.push('  --shadow-*: initial;');
for (const [name, v] of Object.entries(t.shadow)) theme.push(`  --shadow-${name}: ${v};`);
theme.push('  --ease-*: initial;');
theme.push(`  --ease-standard: cubic-bezier(${t.motion.ease.join(', ')});`);
theme.push('}');

const fonts = ['@theme inline {', '  --font-*: initial;'];
for (const [name, v] of Object.entries(t.font)) fonts.push(`  --font-${name}: ${v};`);
fonts.push('}');

writeFileSync(target, `/* Generated from tokens/tokens.json */\n${theme.join('\n')}\n\n${fonts.join('\n')}\n`);
