'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';
import { serviceFamilies } from '@/content/services';

declare global {
  interface Window {
    phanelloMatrix?: (canvas: HTMLCanvasElement) => () => void;
  }
}

const words = serviceFamilies.flatMap((family) => family.services.map((service) => service.name));

/** Sloped, three-layer signal field. Drawing, masking and phases live in /matrix.js; colours come from the token custom properties. */
export function MatrixRain() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const dispose = useRef<(() => void) | null>(null);

  const mount = useCallback(() => {
    if (!canvas.current || !window.phanelloMatrix) return;
    dispose.current?.();
    dispose.current = window.phanelloMatrix(canvas.current);
  }, []);

  useEffect(() => {
    mount();
    return () => {
      dispose.current?.();
      dispose.current = null;
    };
  }, [mount]);

  return (
    <>
      <canvas ref={canvas} data-matrix data-words={JSON.stringify(words)} aria-hidden="true" className="matrix-canvas pointer-events-none absolute inset-0 size-full" />
      <Script src="/matrix.js" strategy="lazyOnload" onReady={mount} />
    </>
  );
}
