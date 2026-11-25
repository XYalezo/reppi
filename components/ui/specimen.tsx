import type { ReactNode } from 'react';
import { Container } from './container';

type PropRow = { name: string; type: string; note: string };

type SpecimenProps = {
  id: string;
  title: string;
  description: string;
  /** Renders the demonstration edge to edge instead of inside the container. */
  bleed?: boolean;
  /** Documented props for the component shown. */
  props?: ReadonlyArray<PropRow>;
  children: ReactNode;
};

function PropsTable({ rows, label }: { rows: ReadonlyArray<PropRow>; label: string }) {
  return (
    <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full min-w-measure border-collapse text-left text-small">
        <caption className="sr-only">Props</caption>
        <thead>
          <tr className="border-b border-ink-900 font-mono text-label uppercase text-ink-600">
            <th scope="col" className="py-2 pr-4 font-medium">Prop</th>
            <th scope="col" className="py-2 pr-4 font-medium">Type</th>
            <th scope="col" className="py-2 font-medium">Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-ink-200 align-top">
              <th scope="row" className="py-2 pr-4 font-mono font-medium">{row.name}</th>
              <td className="py-2 pr-4 font-mono text-ink-700">{row.type}</td>
              <td className="py-2 text-ink-700">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Specimen({ id, title, description, bleed, props, children }: SpecimenProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-4 border-t border-ink-900 py-12">
      <Container>
        <h2 id={`${id}-title`} className="font-display text-heading font-black font-condensed">
          {title}
        </h2>
        <p className="mt-3 max-w-measure text-body text-ink-700">{description}</p>
      </Container>
      {bleed ? <div className="mt-8">{children}</div> : <Container className="mt-8">{children}</Container>}
      {props && (
        <Container>
          <PropsTable rows={props} label={`${title} props`} />
        </Container>
      )}
    </section>
  );
}
