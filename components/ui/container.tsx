import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerWidth = 'measure' | 'page' | 'wide';

type ContainerProps = {
  /** `measure` is a narrow text column; `page` and `wide` share the fluid container (max 1680 px, gutters 4.5vw). */
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

export function Container({ width = 'page', className, children }: ContainerProps) {
  return (
    <div className={cn(width === 'measure' ? 'mx-auto w-full max-w-measure px-4 md:px-8' : 'container-fluid', className)}>
      {children}
    </div>
  );
}
