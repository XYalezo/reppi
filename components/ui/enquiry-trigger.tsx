'use client';

import { Button } from './button';
import { useEnquiry } from './enquiry-provider';

type EnquiryTriggerProps = {
  /** Button label. Names the context of the enquiry. */
  label: string;
  /** Service value preselected in the form. */
  service?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  arrow?: boolean;
  className?: string;
};

export function EnquiryTrigger({ label, service, variant = 'primary', arrow, className }: EnquiryTriggerProps) {
  const { openEnquiry, preload } = useEnquiry();
  return (
    <Button
      variant={variant}
      arrow={arrow}
      className={className}
      aria-haspopup="dialog"
      onIntent={preload}
      onClick={(event) => {
        event.currentTarget.focus();
        openEnquiry(service);
      }}
    >
      {label}
    </Button>
  );
}
