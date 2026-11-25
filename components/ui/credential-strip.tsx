type CredentialStripProps = {
  /** Mono heading above the list. */
  heading: string;
  /** Certification names, as the holder lists them. */
  items: ReadonlyArray<string>;
};

/** A plain labelled row of certification names. No logos, no badges. */
export function CredentialStrip({ heading, items }: CredentialStripProps) {
  return (
    <div>
      <p className="font-mono text-label font-medium uppercase text-ink-600">{heading}</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-200 pt-4">
        {items.map((item) => (
          <li key={item} className="text-body font-semibold text-ink-900">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
