'use client';

import dynamic from 'next/dynamic';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

const loadDrawer = () => import('./enquiry-drawer');
const EnquiryDrawer = dynamic(loadDrawer, { ssr: false });

type EnquiryContextValue = {
  /** Opens the enquiry Drawer with a service preselected. */
  openEnquiry: (service?: string) => void;
  /** Starts loading the Drawer code ahead of the first click. */
  preload: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

type EnquiryProviderProps = {
  services: ReadonlyArray<{ value: string; label: string }>;
  children: ReactNode;
};

export function EnquiryProvider({ services, children }: EnquiryProviderProps) {
  const [state, setState] = useState({ open: false, service: 'general', run: 0 });
  const openEnquiry = useCallback((service = 'general') => {
    setState((current) => ({ open: true, service, run: current.run + 1 }));
  }, []);
  const close = useCallback(() => setState((current) => ({ ...current, open: false })), []);
  const preload = useCallback(() => {
    void loadDrawer();
  }, []);
  const value = useMemo(() => ({ openEnquiry, preload }), [openEnquiry, preload]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {state.run > 0 && (
        <EnquiryDrawer
          open={state.open}
          onClose={close}
          run={state.run}
          services={services}
          defaultService={state.service}
        />
      )}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry(): EnquiryContextValue {
  const value = useContext(EnquiryContext);
  if (!value) throw new Error('useEnquiry must be used inside EnquiryProvider');
  return value;
}
