'use client';

import { Drawer } from './drawer';
import { EnquiryForm } from './enquiry-form';

type EnquiryDrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Changes each time the drawer opens, so the form starts empty. */
  run: number;
  services: ReadonlyArray<{ value: string; label: string }>;
  defaultService: string;
};

export default function EnquiryDrawer({ open, onClose, run, services, defaultService }: EnquiryDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Send an enquiry">
      <EnquiryForm key={run} services={services} defaultService={defaultService} onDone={onClose} focusFirst />
    </Drawer>
  );
}
