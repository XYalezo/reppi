import type { Metadata } from 'next';
import tokens from '@/tokens/tokens.json';
import { Accordion } from '@/components/ui/accordion';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { CtaBand } from '@/components/ui/cta-band';
import { AssistantScopeDiagram, MigrationPathDiagram } from '@/components/ui/diagrams';
import { DetailList } from '@/components/ui/detail-list';
import { DrawerTrigger } from '@/components/ui/drawer-trigger';
import { EnquiryForm } from '@/components/ui/enquiry-form';
import { FactTable } from '@/components/ui/fact-table';
import { FeatureBand } from '@/components/ui/feature-band';
import { FormField } from '@/components/ui/form-field';
import { Hero } from '@/components/ui/hero';
import { Logo } from '@/components/ui/logo';
import { PageHeader } from '@/components/ui/page-header';
import { PatternLayer } from '@/components/ui/pattern-layer';
import { ProcessSteps } from '@/components/ui/process-steps';
import { Prose } from '@/components/ui/prose';
import { Section } from '@/components/ui/section';
import { EmphasisHeading, SectionHeader } from '@/components/ui/section-header';
import { ServiceBlock } from '@/components/ui/service-block';
import { Specimen } from '@/components/ui/specimen';
import { SplitSection } from '@/components/ui/split-section';
import { StatRow } from '@/components/ui/stat-row';
import { TextLink } from '@/components/ui/text-link';
import { WhatsappLink } from '@/components/ui/whatsapp-link';
import { enquiryServices, whatsappMessages } from '@/content/enquiry';
import { company, contact } from '@/content/site';
import { serviceCount, serviceFamilies, serviceHref } from '@/content/services';
import { contrastRatio } from '@/lib/contrast';
import { swatches } from './swatches';

export const metadata: Metadata = {
  title: 'Design system',
  description: 'Tokens and components used on the Phanello Solutions site.',
  robots: { index: false, follow: false },
};

type Pairing = { fg: string; bg: string; use: string; kind: 'text' | 'ui' };

const pairings: ReadonlyArray<Pairing> = [
  { fg: 'ink-900', bg: 'white', use: 'Body text on white', kind: 'text' },
  { fg: 'ink-900', bg: 'mist', use: 'Body text on Mist', kind: 'text' },
  { fg: 'ink-700', bg: 'white', use: 'Secondary text on white', kind: 'text' },
  { fg: 'ink-700', bg: 'mist', use: 'Secondary text on Mist', kind: 'text' },
  { fg: 'ink-600', bg: 'white', use: 'Muted text on white', kind: 'text' },
  { fg: 'ink-600', bg: 'mist', use: 'Muted text on Mist', kind: 'text' },
  { fg: 'white', bg: 'ink-900', use: 'Text on dark sections', kind: 'text' },
  { fg: 'ink-300', bg: 'ink-900', use: 'Muted text on dark sections', kind: 'text' },
  { fg: 'white', bg: 'ink-800', use: 'Text in diagram nodes on dark', kind: 'text' },
  { fg: 'green-800', bg: 'white', use: 'Emphasis and links on white', kind: 'text' },
  { fg: 'green-800', bg: 'mist', use: 'Emphasis and links on Mist', kind: 'text' },
  { fg: 'green-800', bg: 'white', use: 'Eyebrows on white', kind: 'text' },
  { fg: 'green-800', bg: 'mist', use: 'Eyebrows on Mist', kind: 'text' },
  { fg: 'green-200', bg: 'ink-900', use: 'Eyebrows on dark', kind: 'text' },
  { fg: 'green-500', bg: 'ink-900', use: 'Emphasised word on dark', kind: 'text' },
  { fg: 'ink-900', bg: 'green-500', use: 'Primary button label', kind: 'text' },
  { fg: 'ink-900', bg: 'green-300', use: 'Primary button label, hover', kind: 'text' },
  { fg: 'ink-900', bg: 'green-400', use: 'Primary button label, pressed', kind: 'text' },
  { fg: 'ink-500', bg: 'white', use: 'Form control border on white', kind: 'ui' },
  { fg: 'ink-500', bg: 'mist', use: 'Form control border on Mist', kind: 'ui' },
  { fg: 'green-700', bg: 'white', use: 'Focus ring on light', kind: 'ui' },
  { fg: 'green-500', bg: 'ink-900', use: 'Focus ring on dark', kind: 'ui' },
];

function hexOf(name: string): string {
  const [family, step] = name.split('-');
  const color = tokens.color as Record<string, string | Record<string, string>>;
  const entry = color[family];
  if (typeof entry === 'string') return entry;
  const value = entry?.[step];
  if (!value) throw new Error(`Unknown colour token ${name}`);
  return value;
}

const contrastRows = pairings.map((pairing) => {
  const ratio = contrastRatio(hexOf(pairing.fg), hexOf(pairing.bg));
  const minimum = pairing.kind === 'text' ? 4.5 : 3;
  if (ratio < minimum) throw new Error(`${pairing.fg} on ${pairing.bg} is ${ratio.toFixed(2)}, below ${minimum}`);
  return { ...pairing, ratio };
});

const typeSamples: Record<string, { className: string; text: string }> = {
  display: { className: 'font-display text-display font-black uppercase font-condensed', text: 'IT consulting and custom software' },
  heading: { className: 'font-display text-heading font-black uppercase font-condensed', text: 'Four service families' },
  'heading-sm': { className: 'font-display text-heading-sm font-black uppercase font-condensed', text: 'Aliwal Pulse for Walter Sisulu Local Municipality' },
  title: { className: 'font-display text-title font-extrabold uppercase font-condensed', text: 'Custom Software and Web' },
  'display-sm': { className: 'font-display text-display-sm font-black uppercase font-condensed', text: 'Workflow automation that removes repeated work' },
  wordmark: { className: 'font-display text-wordmark font-extrabold uppercase font-expanded', text: 'Phanello' },
  'wordmark-sub': { className: 'font-display text-wordmark-sub font-normal uppercase font-expanded', text: 'Solutions' },
  lead: { className: 'text-lead', text: 'Phanello Solutions builds custom software for the private sector and for local municipalities.' },
  body: { className: 'text-body', text: 'The company grew out of general trading and supply into IT services.' },
  small: { className: 'text-small', text: 'Founded 2025. Based in Aliwal North, Eastern Cape.' },
  label: { className: 'font-mono text-label font-medium uppercase', text: 'Established 2025' },
};

const spacingBars: ReadonlyArray<{ step: number; bar: string }> = [
  { step: 4, bar: 'w-1' },
  { step: 8, bar: 'w-2' },
  { step: 12, bar: 'w-3' },
  { step: 16, bar: 'w-4' },
  { step: 24, bar: 'w-6' },
  { step: 32, bar: 'w-8' },
  { step: 48, bar: 'w-12' },
  { step: 64, bar: 'w-16' },
  { step: 96, bar: 'w-24' },
  { step: 128, bar: 'w-32' },
];

const swatchGroups = Array.from(new Set(swatches.map((swatch) => swatch.group)));

const toc = [
  ['colour', 'Colour'],
  ['contrast', 'Contrast'],
  ['type', 'Type'],
  ['spacing', 'Spacing and shape'],
  ['motion', 'Motion'],
  ['patterns', 'Patterns'],
  ['logo', 'Logo'],
  ['actions', 'Actions'],
  ['headings', 'Headings'],
  ['hero', 'Hero'],
  ['pageheader', 'Page header'],
  ['stats', 'Stat row'],
  ['services', 'Service block'],
  ['split', 'Split section'],
  ['feature', 'Feature band'],
  ['process', 'Process steps'],
  ['detaillist', 'Detail list'],
  ['facts', 'Fact table'],
  ['accordion', 'Accordion'],
  ['forms', 'Form field'],
  ['drawer', 'Drawer'],
  ['enquiry', 'Enquiry form'],
  ['diagrams', 'Diagrams'],
  ['cta', 'Closing band'],
  ['prose', 'Prose'],
  ['gated', 'Data-gated components'],
] as const;

const faqItems = [
  { id: 'where', question: 'Where is Phanello based?', answer: 'Phanello Solutions (Pty) Ltd is based in Aliwal North, Eastern Cape, South Africa.' },
  { id: 'clients', question: 'Who does Phanello build software for?', answer: 'Phanello builds custom software for the private sector and for local municipalities.' },
  { id: 'founder', question: 'Who runs the company?', answer: 'Xolisa Yalezo founded Phanello in 2025 and is its sole director.' },
];

const processSteps = [
  { title: 'Tell us what you need', body: 'Describe the problem, the system or the equipment involved.' },
  { title: 'Get a written quote', body: 'The scope and price are agreed in writing before work starts.' },
  { title: 'We build or set up', body: 'Software is built, accounts are set up and equipment is installed.' },
  { title: 'We stay available', body: 'You can contact us for support once the work is in use.' },
];

export default function DesignSystemPage() {
  return (
    <>
      <Section theme="dark" spacing="md">
        <SectionHeader
          as="h1"
          eyebrow="Internal reference, not indexed"
          heading="Tokens and components"
          emphasis="components"
          lede="Every token and component used on the site. Pages are built only from what is shown here."
        />
        <nav aria-label="On this page" className="mt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {toc.map(([id, label]) => (
              <li key={id}>
                <TextLink href={`#${id}`}>{label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <Specimen id="colour" title="Colour" description="Navy ink scale and one green scale taken from the logo. Hex values exist only in the tokens file. Green is the primary action and at most one highlight per viewport.">
        <div className="space-y-10">
          {swatchGroups.map((group) => (
            <div key={group}>
              <h3 className="font-mono text-label font-medium uppercase text-ink-600">{group}</h3>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {swatches
                  .filter((swatch) => swatch.group === group)
                  .map((swatch) => (
                    <li key={swatch.name}>
                      <div className={`h-20 border border-ink-200 ${swatch.background}`} />
                      <p className="mt-2 font-mono text-small font-medium">{swatch.name}</p>
                      <p className="font-mono text-small text-ink-600">{hexOf(swatch.name)}</p>
                      <p className="text-small text-ink-700">{swatch.usage}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen id="contrast" title="Contrast" description="Computed from the token values at build time. The build fails if a text pairing falls below 4.5:1 or a UI pairing below 3:1.">
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Contrast ratios table">
          <table className="w-full min-w-measure border-collapse text-left text-small">
            <caption className="sr-only">Contrast ratios</caption>
            <thead>
              <tr className="border-b border-ink-900 font-mono text-label uppercase text-ink-600">
                <th scope="col" className="py-2 pr-4 font-medium">Use</th>
                <th scope="col" className="py-2 pr-4 font-medium">Pair</th>
                <th scope="col" className="py-2 pr-4 font-medium">Ratio</th>
                <th scope="col" className="py-2 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {contrastRows.map((row) => (
                <tr key={`${row.fg}-${row.bg}-${row.use}`} className="border-b border-ink-200">
                  <th scope="row" className="py-2 pr-4 font-normal">{row.use}</th>
                  <td className="py-2 pr-4 font-mono">{row.fg} on {row.bg}</td>
                  <td className="py-2 pr-4 font-mono">{row.ratio.toFixed(2)}:1</td>
                  <td className="py-2">
                    {row.kind === 'ui'
                      ? 'Passes 3:1 for UI components'
                      : row.ratio >= 7
                        ? 'Passes AAA for text'
                        : 'Passes AA for text'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Specimen>

      <Specimen id="type" title="Type" description="Archivo for display at heavy weights in condensed width, IBM Plex Sans for text, IBM Plex Mono for eyebrows, numerals and labels. Seven steps, nothing under 14px.">
        <ul className="space-y-8">
          {Object.entries(tokens.text).map(([name, step]) => (
            <li key={name} className="grid gap-3 border-t border-ink-200 pt-6 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <p className="font-mono text-small font-medium">{name}</p>
                <p className="text-small text-ink-700">{step.use}</p>
                <p className="font-mono text-small text-ink-600">{step.range}</p>
                <p className="font-mono text-small text-ink-600">
                  line-height {step.lineHeight}, tracking {step.tracking}
                </p>
                <p className="text-small text-ink-600">{step.family}</p>
              </div>
              <p className={`lg:col-span-9 ${typeSamples[name].className}`}>{typeSamples[name].text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="border border-ink-200 p-6">
            <EmphasisHeading as="h3" heading="Emphasis on light" emphasis="light" />
          </div>
          <div data-tone="dark" className="bg-ink-900 p-6 text-white">
            <EmphasisHeading as="h3" heading="Emphasis on dark" emphasis="dark" />
          </div>
        </div>
      </Specimen>

      <Specimen id="spacing" title="Spacing and shape" description="4px base on an 8px rhythm. One container scale, one section padding scale. Corner radius 0, 2 or 4px. 1px hairlines. A shadow only on floating layers.">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-label font-medium uppercase text-ink-600">Spacing steps</h3>
            <ul className="mt-4 space-y-2">
              {spacingBars.map((item) => (
                <li key={item.step} className="flex items-center gap-4">
                  <span className="w-16 font-mono text-small">{item.step}px</span>
                  <span className={`h-3 bg-green-800 ${item.bar}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-label font-medium uppercase text-ink-600">Containers</h3>
              <ul className="mt-4 space-y-1 font-mono text-small">
                {Object.entries(tokens.container).map(([name, value]) => (
                  <li key={name}>
                    {name}: {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-label font-medium uppercase text-ink-600">Section padding</h3>
              <ul className="mt-4 space-y-1 font-mono text-small">
                <li>xs: 24px, 32px from 768</li>
                <li>sm: 48px, 64px from 768</li>
                <li>md: 72px, 96px from 768</li>
                <li>lg: 96px, 128px from 768</li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-label font-medium uppercase text-ink-600">Radius, hairline and shadow</h3>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex size-20 items-center justify-center border border-ink-900 font-mono text-small rounded-none">0</div>
                <div className="flex size-20 items-center justify-center border border-ink-900 font-mono text-small rounded-sm">2</div>
                <div className="flex size-20 items-center justify-center border border-ink-900 font-mono text-small rounded-md">4</div>
                <div className="flex size-20 items-center justify-center bg-white font-mono text-small shadow-float">float</div>
              </div>
            </div>
          </div>
        </div>
      </Specimen>

      <Specimen id="motion" title="Motion" description="One easing curve and three durations. Used for the hero entrance, the accordion, the drawer and hover states. Reduced motion is respected.">
        <p className="font-mono text-small">
          ease cubic-bezier({tokens.motion.ease.join(', ')}); durations {tokens.motion.duration.fast}, {tokens.motion.duration.base} and {tokens.motion.duration.slow}ms
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          <li className="border border-ink-900 p-6 font-mono text-small transition-colors duration-150 ease-standard hover:bg-green-800 hover:text-white">150ms hover</li>
          <li className="border border-ink-900 p-6 font-mono text-small transition-colors duration-250 ease-standard hover:bg-green-800 hover:text-white">250ms hover</li>
          <li className="border border-ink-900 p-6 font-mono text-small transition-colors duration-400 ease-standard hover:bg-green-800 hover:text-white">400ms hover</li>
        </ul>
      </Specimen>

      <Specimen id="patterns" title="Patterns" description="Two tiles in one module: rings and nodes from the logo, and a dotted lattice. 10% opacity on dark surfaces, 5% on light. One pattern per viewport on real pages. Diagonal lines are not used because they hurt reading. The matrix rain on the home page hero is separate and is not a tile.">
        <div className="grid gap-4 sm:grid-cols-2">
          {(['rings', 'lattice'] as const).map((name) => (
            <div key={`dark-${name}`} data-tone="dark" className="relative h-48 overflow-hidden bg-ink-900 text-white">
              <PatternLayer pattern={name} tone="dark" />
              <p className="relative p-4 font-mono text-label font-medium uppercase">{name}, dark</p>
            </div>
          ))}
          {(['rings', 'lattice'] as const).map((name) => (
            <div key={`light-${name}`} data-tone="light" className="relative h-48 overflow-hidden border border-ink-200 bg-white">
              <PatternLayer pattern={name} tone="light" />
              <p className="relative p-4 font-mono text-label font-medium uppercase">{name}, light</p>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen
        id="logo"
        title="Logo"
        description="The P mark: two main shapes that follow the surface (navy on light, white on dark) and one small green facet, drawn as one inline SVG. The lockup adds a 1 px rule and the stacked name, PHANELLO in bold expanded capitals over SOLUTIONS in light, widely tracked capitals, both set to the same width. Do not draw the P again and do not use it below 40 px high with the wordmark; use the mark alone there."
        props={[
          { name: 'variant', type: "'mark' | 'lockup'", note: 'Default lockup. The mark alone carries its own accessible name.' },
          { name: 'className', type: 'string', note: 'Optional sizing.' },
        ]}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div data-tone="dark" className="flex flex-wrap items-center gap-8 bg-ink-900 p-8 text-white">
            <Logo variant="lockup" />
            <Logo variant="mark" />
          </div>
          <div data-tone="light" className="flex flex-wrap items-center gap-8 border border-ink-200 p-8 text-ink-900">
            <Logo variant="lockup" />
            <Logo variant="mark" />
          </div>
        </div>
      </Specimen>

      <Specimen
        id="actions"
        title="Actions"
        description="Primary is green and is the single main action in a viewport. Secondary and ghost adapt to dark surfaces. Every label names its context. Lucide icons are used for affordances only."
        props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", note: 'Default primary.' },
          { name: 'href', type: 'string', note: 'Renders a link. Without it, a button.' },
          { name: 'external', type: 'boolean', note: 'Anchor that opens in a new tab, for wa.me.' },
          { name: 'arrow', type: 'boolean', note: 'Trailing arrow.' },
          { name: 'onClick, type, disabled', type: 'native', note: 'Button form only.' },
        ]}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-6 border border-ink-200 p-6">
            <div className="flex flex-wrap gap-4">
              <Button>Request a scoping call</Button>
              <Button variant="secondary">Read the case study</Button>
              <Button variant="ghost">View all services</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button arrow>Book a Microsoft 365 migration quote</Button>
              <Button disabled>Disabled</Button>
            </div>
            <p className="text-body">
              Text link: <TextLink href="/services">All services</TextLink> and <TextLink href="/work" arrow>See the work</TextLink>.
            </p>
          </div>
          <div data-tone="dark" className="space-y-6 bg-ink-900 p-6 text-white">
            <div className="flex flex-wrap gap-4">
              <Button>Request an AI assistant scoping call</Button>
              <Button variant="secondary">Read the case study</Button>
              <Button variant="ghost">View all services</Button>
            </div>
            <p className="text-body">
              Text link: <TextLink href="/services">All services</TextLink> and <TextLink href="/work" arrow>See the work</TextLink>.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Breadcrumb label="Breadcrumb example" items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Cloud migration' }]} />
        </div>
      </Specimen>

      <Specimen
        id="headings"
        title="Headings"
        description="Uppercase display type with one emphasised word in italic. SectionHeader adds a mono eyebrow and an optional lede. A heading throws at build time if its emphasis is not part of its text."
        props={[
          { name: 'eyebrow', type: 'string', note: 'Mono label above the heading.' },
          { name: 'heading', type: 'string', note: 'Full heading text.' },
          { name: 'emphasis', type: 'string', note: 'Substring set in italic.' },
          { name: 'lede', type: 'string', note: 'Optional one or two sentences.' },
          { name: 'as', type: "'h1' | 'h2' | 'h3'", note: 'Sets level and size step.' },
        ]}
      >
        <SectionHeader eyebrow="Services" heading="Ten services in four families" emphasis="four" lede="Custom software, AI and automation, Microsoft 365 and cloud, and IT support and hardware." />
      </Specimen>

      <Specimen
        id="hero"
        bleed
        title="Hero"
        description="Dark, patterned, left-aligned. A mono eyebrow, the H1, one short paragraph and two actions, with an optional plain-text column. Shown here with an h2 so the page keeps one h1."
        props={[
          { name: 'eyebrow, heading, emphasis, body', type: 'string', note: 'Copy for the hero.' },
          { name: 'actions', type: 'ReactNode', note: 'Two Buttons with different labels.' },
          { name: 'index', type: '{ id, title, href }[]', note: 'Service families, shown as a row along the bottom of the hero and as a list on phones. Each links to a block on the page.' },
          { name: 'matrix', type: 'boolean', note: 'Matrix rain behind the hero. Home page only.' },
          { name: 'pattern', type: 'PatternName', note: 'Optional tile. Not used with matrix.' },
          { name: 'headingLevel', type: "'h1' | 'h2'", note: 'Default h1.' },
        ]}
      >
        <Hero
          matrix
          headingLevel="h2"
          eyebrow="Aliwal North, Eastern Cape"
          heading="IT consulting and custom software from Aliwal North"
          emphasis="software"
          body="Phanello Solutions builds custom software for the private sector and for local municipalities, and provides the IT services around it."
          actions={
            <>
              <Button arrow>Send a project enquiry</Button>
              <Button variant="secondary" href="/services">See all services</Button>
            </>
          }
          index={serviceFamilies.map((family) => ({ id: family.id, title: family.title, href: `#${family.id.toLowerCase()}` }))}
        />
      </Specimen>

      <Specimen
        id="pageheader"
        bleed
        title="Page header"
        description="The dark header band for every inner page: breadcrumb, mono eyebrow, H1 with one emphasised word, one or two sentences and a single action. Plain background so the text reads cleanly. Shown with an h2 so this page keeps one h1."
        props={[
          { name: 'breadcrumb', type: 'BreadcrumbItem[]', note: 'Home to this page. The last item has no href.' },
          { name: 'eyebrow, heading, emphasis, body', type: 'string', note: 'Copy for the header.' },
          { name: 'actions', type: 'ReactNode', note: 'One Button.' },
        ]}
      >
        <PageHeader
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Cloud migration' }]}
          eyebrow="Microsoft 365 and Cloud"
          heading="Cloud migration with a plan for every system"
          emphasis="plan"
          body="Cloud migration moves the systems and data you run today to a cloud service."
          actions={<Button arrow>Request a cloud migration review</Button>}
        />
      </Specimen>

      <Specimen
        id="stats"
        bleed
        title="Stat row"
        description="Four facts directly under the hero, read as a definition list. Only established facts are used."
        props={[
          { name: 'items', type: '{ value, label }[]', note: 'Three or four facts of the same kind: a figure and what it counts. StatList renders the list alone for use inside another section.' },
          { name: 'theme', type: "'light' | 'mist'", note: 'Default mist.' },
        ]}
      >
        <StatRow
          items={[
            { value: String(serviceCount), label: 'Services in four families' },
            { value: '2', label: 'Sectors: private and municipal' },
            { value: '1', label: 'Municipal platform, live and in use' },
          ]}
        />
      </Specimen>

      <Specimen
        id="services"
        title="Service block"
        description="Text-led, numbered, with the services in the family and a link into each page. No icons, no card grid."
        props={[
          { name: 'index', type: 'string', note: 'Two-digit position.' },
          { name: 'title, summary', type: 'string', note: 'Family name and one sentence.' },
          { name: 'includes', type: '(string | { label, href })[]', note: 'Services in the family. An item with an href is a full-width link row with an arrow.' },
          { name: 'id', type: 'string', note: 'Anchor id, so the hero index can link to the block.' },
          { name: 'headingLevel', type: "'h2' | 'h3'", note: 'Default h3.' },
        ]}
      >
        <ServiceBlock
          index="01"
          title={serviceFamilies[0].title}
          summary="Custom software for private-sector organisations and local municipalities, plus website design."
          includes={serviceFamilies[0].services.map((service) => ({ label: service.name, href: serviceHref(service) }))}
        />
        <ServiceBlock
          index="02"
          title={serviceFamilies[1].title}
          summary="AI chatbots, AI web apps that work with a company's own data, and workflow automation."
          includes={serviceFamilies[1].services.map((service) => ({ label: service.name, href: serviceHref(service) }))}
        />
      </Specimen>

      <Specimen
        id="split"
        bleed
        title="Split section"
        description="A heading column beside a wide content column. The heading is always on the left and stays in view from lg while the wide column scrolls. Alternates light and Mist surfaces."
        props={[
          { name: 'theme', type: 'SectionTheme', note: 'Default light.' },
          { name: 'eyebrow, heading, emphasis, lede', type: 'string', note: 'Passed to SectionHeader.' },
        ]}
      >
        <SplitSection theme="mist" eyebrow="Who we are" heading="An IT company from Aliwal North" emphasis="Aliwal">
          <div className="max-w-measure space-y-4 text-lead text-ink-700">
            <p>Phanello Solutions (Pty) Ltd is an IT consulting company based in Aliwal North, Eastern Cape. It builds custom software for the private sector and for local municipalities, and provides the IT services listed on this site.</p>
            <p>Founded in 2025 by Xolisa Yalezo, the company grew out of general trading and supply into IT services.</p>
          </div>
        </SplitSection>
      </Specimen>

      <Specimen
        id="feature"
        bleed
        title="Feature band"
        description="A dark band that pairs text with a diagram. Used for the AI offering."
        props={[
          { name: 'eyebrow, heading, emphasis', type: 'string', note: 'Header copy.' },
          { name: 'children', type: 'ReactNode', note: 'Short paragraphs.' },
          { name: 'points', type: 'string[]', note: 'Plain list.' },
          { name: 'visual', type: 'ReactNode', note: 'A diagram.' },
          { name: 'action', type: 'ReactNode', note: 'Optional Button.' },
          { name: 'pattern', type: 'PatternName', note: 'Default lattice.' },
        ]}
      >
        <FeatureBand
          eyebrow="AI and automation"
          heading="AI that answers from your own data"
          emphasis="own"
          points={['Which data sources it can use', 'Who can ask what', 'What the assistant may and may not answer', 'When it hands over to a person']}
          visual={<AssistantScopeDiagram />}
          action={<Button variant="secondary" href="/services/ai-chatbots-and-ai-web-apps" arrow>Read about AI assistants</Button>}
        >
          <p>An AI web app can work with the company&rsquo;s own data. What it can reach is scoped according to the design of that company.</p>
          <p>These are defined with the client before anything is built:</p>
        </FeatureBand>
      </Specimen>

      <Specimen
        id="process"
        title="Process steps"
        description="Three or four ordered steps, numbered because the content is a sequence."
        props={[
          { name: 'steps', type: '{ title, body }[]', note: 'Three or four steps.' },
          { name: 'headingLevel', type: "'h3' | 'h4'", note: 'Default h3.' },
        ]}
      >
        <ProcessSteps steps={processSteps} />
      </Specimen>

      <Specimen
        id="detaillist"
        title="Detail list"
        description="A hairline list of items with an optional sentence each. Items can carry an anchor id so other pages link straight to them."
        props={[{ name: 'items', type: '{ id?, title, body? }[]', note: 'Title is required.' }]}
      >
        <DetailList
          items={[
            { id: 'user-management', title: 'User management', body: 'Accounts created, changed and removed as people join, move and leave.' },
            { title: 'IT support', body: 'Help with the problems and requests users raise.' },
          ]}
        />
      </Specimen>

      <Specimen
        id="facts"
        title="Fact table"
        description="A definition list for case-study facts."
        props={[{ name: 'rows', type: '{ label, value }[]', note: 'Label and value pairs.' }]}
      >
        <FactTable
          rows={[
            { label: 'Client', value: 'Walter Sisulu Local Municipality' },
            { label: 'Type', value: 'Resident engagement platform' },
            { label: 'Status', value: 'Live and in use' },
            { label: 'Stack', value: 'React, Supabase and PostgreSQL' },
          ]}
        />
      </Specimen>

      <Specimen
        id="accordion"
        title="Accordion"
        description="One question open at a time. Buttons carry aria-expanded and aria-controls; answers are plain text so they can feed FAQ structured data."
        props={[
          { name: 'items', type: '{ id, question, answer }[]', note: 'Answers are strings.' },
          { name: 'headingLevel', type: "'h2' | 'h3'", note: 'Default h3.' },
        ]}
      >
        <Accordion items={faqItems} />
      </Specimen>

      <Specimen
        id="forms"
        title="Form field"
        description="Visible labels, hints and errors tied to the control with aria-describedby. Errors have no colour of their own: they use a heavier border and an Error prefix."
        props={[
          { name: 'label, name', type: 'string', note: 'Required.' },
          { name: 'control', type: "'input' | 'textarea' | 'select'", note: 'Default input.' },
          { name: 'type', type: "'text' | 'email' | 'tel'", note: 'Input only.' },
          { name: 'hint, error', type: 'string', note: 'Error replaces the hint.' },
          { name: 'options', type: '{ value, label }[]', note: 'Select only.' },
          { name: 'required, defaultValue, rows, autoComplete', type: 'various', note: 'As native.' },
        ]}
      >
        <div className="grid max-w-measure gap-6">
          <FormField label="Name" name="name" required autoComplete="name" />
          <FormField label="Email address" name="email" type="email" hint="We reply to this address." required autoComplete="email" />
          <FormField
            label="Service"
            name="service"
            control="select"
            options={[
              { value: '', label: 'Choose a service' },
              { value: 'custom-software-development', label: 'Custom software development' },
              { value: 'cloud-migration', label: 'Cloud migration' },
            ]}
          />
          <FormField label="Message" name="message" control="textarea" error="Enter a message." required />
        </div>
      </Specimen>

      <Specimen
        id="drawer"
        title="Drawer"
        description="Slides in from the right. Focus moves into the panel and is trapped there, Escape closes it, and focus returns to the control that opened it."
        props={[
          { name: 'open', type: 'boolean', note: 'Controlled.' },
          { name: 'onClose', type: '() => void', note: 'Escape, backdrop and close button.' },
          { name: 'title', type: 'string', note: 'Dialog heading.' },
          { name: 'DrawerTrigger', type: 'label, title, variant', note: 'A Button that owns the open state.' },
        ]}
      >
        <DrawerTrigger label="Open the enquiry drawer" title="Send an enquiry">
          <div className="space-y-6">
            <FormField label="Name" name="drawer-name" required />
            <FormField label="Email address" name="drawer-email" type="email" required />
            <Button type="submit">Send the enquiry</Button>
          </div>
        </DrawerTrigger>
      </Specimen>

      <Specimen
        id="enquiry"
        title="Enquiry form"
        description="The form used on the contact page and inside the Drawer. It posts to the enquiry route, which validates on the server, ignores the hidden field that bots fill in, limits repeat submissions and sends by SMTP. EnquiryTrigger opens it in the Drawer from any call to action. WhatsappLink builds the opening message from the chosen service."
        props={[
          { name: 'EnquiryForm services', type: '{ value, label }[]', note: 'First option is the default.' },
          { name: 'EnquiryForm defaultService', type: 'string', note: 'Preselected option.' },
          { name: 'EnquiryTrigger', type: 'label, service?, variant?, arrow?', note: 'Needs EnquiryProvider in the layout.' },
          { name: 'WhatsappLink', type: 'services, messages', note: 'messages must include general.' },
        ]}
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <EnquiryForm services={enquiryServices} />
          <WhatsappLink services={enquiryServices} messages={whatsappMessages} />
        </div>
      </Specimen>

      <Specimen
        id="diagrams"
        title="Diagrams"
        description="Original SVG built from four primitives: frame, node, arrow and label. Text is never smaller than 14px when rendered, and the diagrams read vertically at every width."
        props={[
          { name: 'DiagramFrame', type: 'title, description, width, height', note: 'SVG with accessible name.' },
          { name: 'DiagramNode', type: 'x, y, width, height, lines, variant', note: 'plain, solid or dashed.' },
          { name: 'DiagramArrow', type: 'from, to', note: 'Line with a head.' },
          { name: 'DiagramLabel', type: 'x, y, children', note: 'Mono label.' },
        ]}
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-mist p-4 md:p-8" data-tone="light">
            <AssistantScopeDiagram />
          </div>
          <div className="bg-mist p-4 md:p-8" data-tone="light">
            <MigrationPathDiagram />
          </div>
        </div>
      </Specimen>

      <Specimen
        id="cta"
        bleed
        title="Closing band"
        description="Navy with the page background art. One or two actions with different labels."
        props={[
          { name: 'heading, emphasis', type: 'string', note: 'Header copy.' },
          { name: 'body', type: 'string', note: 'Optional.' },
          { name: 'actions', type: 'ReactNode', note: 'One or two Buttons.' },
        ]}
      >
        <CtaBand
          heading="Tell us about your project"
          emphasis="project"
          body="Describe what you need and we will come back to you."
          actions={
            <>
              <Button>Send a project enquiry</Button>
              <Button variant="secondary" href={contact.whatsappHref} external>Message us on WhatsApp</Button>
            </>
          }
        />
      </Specimen>

      <Specimen
        id="prose"
        title="Prose"
        description="Long-form text for the privacy policy. Styles h2, h3, paragraphs, lists and links."
        props={[{ name: 'children', type: 'ReactNode', note: 'Semantic HTML.' }]}
      >
        <Prose>
          <h2>Who we are</h2>
          <p>{company.legalName} is based at {contact.addressLines.join(', ')}, South Africa.</p>
          <h3>How to reach us</h3>
          <ul>
            <li>Phone and WhatsApp: {contact.phoneDisplay}</li>
            <li>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
        </Prose>
      </Specimen>

      <Specimen
        id="gated"
        title="Data-gated components"
        description="LogoWall and Testimonial render nothing until real data is supplied in the content module. They never show an empty state, so there is nothing to display here."
        props={[
          { name: 'LogoWall items', type: '{ name, src, width, height }[]', note: 'Real client logos only.' },
          { name: 'Testimonial item', type: '{ quote, name, role, organisation }', note: 'Real, attributed quote only.' },
        ]}
      >
        <Container width="measure">
          <p className="text-body text-ink-700">Header and Footer are visible on this page: they come from the root layout and read their links and contact details from the content modules.</p>
        </Container>
      </Specimen>
    </>
  );
}
