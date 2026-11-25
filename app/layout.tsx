import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import { EnquiryProvider } from '@/components/ui/enquiry-provider';
import { JsonLd } from '@/components/ui/json-ld';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { HeaderAction } from '@/components/ui/header-action';
import { MobileContactBar } from '@/components/ui/mobile-contact-bar';
import { company, complianceLine, contact, footerColumns, navigation } from '@/content/site';
import { enquiryServices } from '@/content/enquiry';
import { organizationSchema } from '@/lib/schema';
import { getSiteUrl } from '@/lib/site-url';

const archivo = localFont({
  src: [
    { path: './fonts/archivo-wdth-normal.woff2', style: 'normal', weight: '100 900' },
    { path: './fonts/archivo-wdth-italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-archivo',
  display: 'swap',
});

const plexSans = localFont({
  src: [
    { path: './fonts/plex-sans-400.woff2', style: 'normal', weight: '400' },
    { path: './fonts/plex-sans-500.woff2', style: 'normal', weight: '500' },
    { path: './fonts/plex-sans-600.woff2', style: 'normal', weight: '600' },
  ],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = localFont({
  src: [
    { path: './fonts/plex-mono-400.woff2', style: 'normal', weight: '400' },
    { path: './fonts/plex-mono-500.woff2', style: 'normal', weight: '500' },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: 'Phanello Solutions | IT consulting and custom software',
    template: '%s | Phanello Solutions',
  },
  description:
    'IT consulting and custom software from Aliwal North, Eastern Cape, for private-sector organisations and local municipalities.',
  alternates: { canonical: './' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-3 focus:text-body focus:font-semibold focus:text-ink-900"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema(getSiteUrl().origin)} />
          <EnquiryProvider services={enquiryServices}>
            <Header
              nav={navigation}
              action={
                <HeaderAction
                  label="Send an enquiry"
                  whatsappLabel="Message us on WhatsApp"
                  whatsappMessage="Hello Phanello Solutions, I would like to ask about your services."
                />
              }
            />
            <main id="main" className="flex-1 pb-24 lg:pb-0">
              {children}
            </main>
            <Footer
              columns={footerColumns}
              contact={contact}
              legalName={company.legalName}
              summary={company.summary}
              complianceLine={complianceLine}
            />
            <MobileContactBar phoneHref={contact.phoneHref} whatsappHref={contact.whatsappHref} />
          </EnquiryProvider>
      </body>
    </html>
  );
}
