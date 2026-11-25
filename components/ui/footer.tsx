import Link from 'next/link';
import { Container } from './container';
import { Logo } from './logo';

type FooterLink = { label: string; href: string };

type FooterProps = {
  columns: ReadonlyArray<{ title: string; links: ReadonlyArray<FooterLink> }>;
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappHref: string;
    email: string;
    addressLines: ReadonlyArray<string>;
  };
  legalName: string;
  summary: string;
  /** Single factual compliance line. */
  complianceLine: string;
};

const link = 'text-body text-ink-300 underline-offset-4 hover:text-white hover:underline';

export function Footer({ columns, contact, legalName, summary, complianceLine }: FooterProps) {
  return (
    <footer data-tone="dark" className="bg-ink-900 pb-20 text-white lg:pb-0">
      <Container className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="lockup" />
          <p className="mt-6 max-w-narrow text-body text-ink-300">{summary}</p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-label font-medium uppercase text-green-200">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <Link prefetch={false} href={item.href} className={link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="lg:col-span-3">
          <h2 className="font-mono text-label font-medium uppercase text-green-200">Contact</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="text-body text-ink-300">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a href={contact.phoneHref} className={link}>
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className={link}>
                {contact.email}
              </a>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-ink-700">
        <Container className="flex flex-col gap-2 py-6 text-small text-ink-300 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {legalName}
          </p>
          <p>{complianceLine}</p>
        </Container>
      </div>
    </footer>
  );
}
