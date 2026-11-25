import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type Shared = {
  /** Primary is green and is the single main action in a viewport. */
  variant?: ButtonVariant;
  /** Adds a trailing arrow. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = Shared & {
  href: string;
  /** Renders a plain anchor that opens in a new tab. */
  external?: boolean;
};

type NativeButtonProps = Shared & {
  href?: undefined;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Called when the pointer enters or focus lands on the button. */
  onIntent?: () => void;
  disabled?: boolean;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: 'dialog';
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border px-6 text-body font-semibold transition-colors duration-150 ease-standard disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-green-500 bg-green-500 text-ink-900 hover:border-green-300 hover:bg-green-300 active:border-green-400 active:bg-green-400',
  secondary:
    'border-green-800 text-green-800 hover:bg-green-50 on-dark:border-white on-dark:text-white on-dark:hover:bg-white/10',
  ghost: 'border-transparent text-green-800 hover:bg-green-50 on-dark:text-white on-dark:hover:bg-white/10',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', arrow = false, className, children } = props;
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={18} aria-hidden="true" />}
    </>
  );

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link prefetch={false} href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      onPointerEnter={props.onIntent}
      onFocus={props.onIntent}
      disabled={props.disabled}
      aria-expanded={props['aria-expanded']}
      aria-controls={props['aria-controls']}
      aria-haspopup={props['aria-haspopup']}
      className={classes}
    >
      {content}
    </button>
  );
}
