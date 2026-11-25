import type { ReactNode } from 'react';

type ProseProps = {
  /** Long-form text: h2, h3, p, ul and links are styled. */
  children: ReactNode;
};

export function Prose({ children }: ProseProps) {
  return <div className="prose-doc">{children}</div>;
}
