'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion';
import { X } from 'lucide-react';
import { duration, ease } from '@/lib/motion';

type DrawerProps = {
  open: boolean;
  /** Called on Escape, backdrop click and the close button. */
  onClose: () => void;
  /** Dialog title, shown as the drawer heading. */
  title: string;
  /** Mount at the page root so it is not nested inside a dark section. */
  children: ReactNode;
};

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(focusable);
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(focusable));
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          {open && (
        <div key="drawer" data-tone="light" data-drawer="" className="fixed inset-0 z-50">
          <m.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink-900/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease }}
            onClick={onClose}
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-full max-w-narrow flex-col bg-white text-ink-900 shadow-float"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: duration.base, ease }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink-200 p-6">
              <h2 id={titleId} className="font-display text-title font-extrabold font-condensed">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-3 -mt-2 inline-flex size-12 shrink-0 items-center justify-center rounded-sm hover:bg-green-50"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </m.div>
        </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
