import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const skip = new Set(['node_modules', '.next', 'scripts', 'fonts', 'tokens', 'public']);
const generated = new Set(['app/tokens.css', 'next-env.d.ts', 'package-lock.json']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (skip.has(name) || name.startsWith('.git')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(root).map((f) => ({ path: relative(root, f), text: readFileSync(f, 'utf8') }))
  .filter((f) => !generated.has(f.path) && /\.(tsx?|css|mjs|md|json)$/.test(f.path) && f.path !== 'tsconfig.json');
const code = files.filter((f) => /\.(tsx?|css)$/.test(f.path));
const failures = [];
const fail = (check, file, detail) => failures.push(`${check}: ${file} ${detail}`);

function scan(check, list, regex, filter = () => true) {
  for (const f of list) {
    f.text.split('\n').forEach((line, i) => {
      const m = line.match(regex);
      if (m && filter(m, line)) fail(check, `${f.path}:${i + 1}`, m[0]);
    });
  }
}

scan('hex colour', code, /#[0-9a-fA-F]{3,8}\b/);
scan('raw colour function', code, /\b(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\(/);
scan('arbitrary tailwind value', code, /(?:[a-z0-9]+-)+\[[^\]\s]*\]|\[(?:&|--)[^\]]*\]|-\(--[^)]*\)/, (m, line) => !/^\s*(\/\/|\*)/.test(line) && !/tabindex|\[href\]|\[disabled\]/.test(m[0]));
const imageRoutes = new Set(['lib/og.tsx']);
scan('inline style', code.filter((f) => f.path.endsWith('.tsx') && !imageRoutes.has(f.path)), /\bstyle=/);
scan('duration outside 150/250/400', code, /\bduration-(\d+)\b/, (m) => !['150', '250', '400'].includes(m[1]));

const allowedHosts = new Set(['wa.me', 'schema.org', 'www.w3.org']);
scan('hostname', files.filter((f) => !f.path.endsWith('package.json')), /https?:\/\/([^\/\s"'`)<>]+)/, (m) => !allowedHosts.has(m[1]));
scan('provider name', files, /\b(vercel|netlify|cloudflare|heroku|railway|firebase|digitalocean|render\.com|fly\.io|github pages|aws|amazon web services)\b/i);
scan('forbidden text', files, /lorem|TODO|placeholder|coming soon|edit this/i);

const banned = /(?<![\w-])(cutting-edge|seamless|empower|unlock|transform|revolutioni[sz]e|synergy|leverag\w*|innovative|world-class|state-of-the-art|next-level|trusted partner|one-stop shop|tailored solutions|proudly|civic)/i;
scan('banned vocabulary', code.filter((f) => /^(content|components)\//.test(f.path) || /^app\/.*\.tsx$/.test(f.path)), banned);

const usage = new Map();
for (const f of code.filter((f) => /^app\/.*\.tsx$/.test(f.path))) {
  const used = [];
  for (const m of f.text.matchAll(/^import .*? from '(.+?)';$/gm)) {
    const spec = m[1];
    if (spec.startsWith('@/components/')) {
      if (!spec.startsWith('@/components/ui/')) fail('component outside ui', f.path, spec);
      used.push(spec.replace('@/components/ui/', ''));
    } else if (spec.startsWith('.') && !spec.endsWith('.css') && !/\/(swatches)$/.test(spec)) {
      fail('relative import in page', f.path, spec);
    }
  }
  usage.set(f.path, used);
}

for (const [page, used] of usage) console.log(`${page}: ${used.length ? used.join(', ') : '(none)'}`);
if (failures.length) {
  console.log(`\n${failures.length} failure(s)`);
  for (const line of failures) console.log(line);
  process.exit(1);
}
console.log('\nrepo checks passed');
