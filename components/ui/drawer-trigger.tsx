'use client';

import { useState, type ReactNode } from 'react';
import { Button } from './button';
import { Drawer } from './drawer';

type DrawerTriggerProps = {
  /** Button label. Names what opens. */
  label: string;
  /** Drawer heading. */
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
};

export function DrawerTrigger({ label, title, variant = 'secondary', children }: DrawerTriggerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(event) => {
          event.currentTarget.focus();
          setOpen(true);
        }}
      >
        {label}
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title={title}>
        {children}
      </Drawer>
    </>
  );
}
