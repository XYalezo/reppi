'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { serviceFamilies, serviceHref } from '@/content/services';
import { Container } from './container';
import { Logo } from './logo';

type NavLink = { label: string; href: string };
type NavItem = NavLink & { children?: ReadonlyArray<NavLink> };

type HeaderProps = {
  nav: ReadonlyArray<NavItem>;
  /** The header action, normally one Button. */
  action: ReactNode;
};

const itemStyles =
  'inline-flex h-12 items-center gap-1 px-3 text-body font-medium transition-colors duration-150 ease-standard hover:text-green-200';

const hoverQuery = '(hover: hover) and (pointer: fine)';

type Column = { id: string; title: string; links: ReadonlyArray<NavLink> };

function columnsFor(item: NavItem): Column[] {
  if (item.href === '/services') {
    return serviceFamilies.map((family) => ({
      id: family.id,
      title: family.title,
      links: family.services.map((service) => ({ label: service.name, href: serviceHref(service) })),
    }));
  }
  return [{ id: '', title: item.label, links: item.children ?? [] }];
}

/** Mega menu trigger. Opens on mouse hover (0 ms), closes 200 ms after the pointer leaves trigger and panel; touch taps toggle; keyboard as documented in DESIGN_SYSTEM.md. */
function NavMenu({ item, pathname, active }: { item: NavItem; pathname: string; active: boolean }) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const root = useRef<HTMLLIElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);
  const panelId = useId();
  const columns = columnsFor(item);

  const set = (value: boolean) => setOpenPath(value ? pathname : null);
  const isHover = (event: PointerEvent) => event.pointerType === 'mouse' && window.matchMedia(hoverQuery).matches;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpenPath(null);
      trigger.current?.focus();
    }
    function onPointer(event: globalThis.PointerEvent) {
      if (root.current && !root.current.contains(event.target as Node)) setOpenPath(null);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  function enter(event: PointerEvent) {
    if (!isHover(event)) return;
    window.clearTimeout(timer.current);
    set(true);
  }

  function leave(event: PointerEvent) {
    if (!isHover(event)) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpenPath(null), 200);
  }

  function click(event: MouseEvent) {
    const byMouse = event.detail > 0 && window.matchMedia(hoverQuery).matches;
    set(byMouse ? true : !open);
  }

  function blur(event: FocusEvent) {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpenPath(null);
  }

  return (
    <li ref={root} className="flex h-full items-center" onPointerEnter={enter} onPointerLeave={leave} onBlur={blur}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={click}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return;
          event.preventDefault();
          set(true);
          requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>('.mega a')?.focus());
        }}
        className={cn(itemStyles, active && 'underline decoration-2 underline-offset-8')}
      >
        {item.label}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={cn('transition-transform duration-150 ease-standard', open && 'rotate-180')}
        />
      </button>
      <div
        id={panelId}
        data-open={open}
        data-tone="dark"
        className="mega border-b border-ink-700 bg-ink-900 text-white shadow-float shade-ink"
      >
        <Container className="py-12">
          <ul className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
            {columns.map((column) => (
              <li key={column.title}>
                <p className="mb-4 font-mono text-label font-medium uppercase text-green-200">
                  {column.id && <span className="mr-3 text-white">{column.id}</span>}
                  {column.title}
                </p>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link prefetch={false} href={link.href} className="text-body text-ink-300 transition-colors duration-150 ease-standard hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link prefetch={false} href={item.href} className="mt-12 inline-block text-body font-semibold underline underline-offset-4">
            All services
          </Link>
        </Container>
      </div>
    </li>
  );
}

export function Header({ nav, action }: HeaderProps) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const header = useRef<HTMLElement>(null);
  const panelId = useId();

  useEffect(() => {
    const update = () => {
      if (header.current) header.current.dataset.scrolled = String(window.scrollY > 24);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuPath(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      ref={header}
      data-tone="dark"
      data-scrolled="false"
      data-menu={menuOpen}
      className="site-header fixed inset-x-0 top-0 z-40 text-white"
    >
      <Container className="header-bar h-full">
        <Link prefetch={false} href="/" className="shrink-0 lg:justify-self-start">
          <Logo variant="lockup" />
        </Link>

        <nav aria-label="Primary" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {nav.map((item) =>
              item.children ? (
                <NavMenu key={item.href} item={item} pathname={pathname} active={isActive(item.href)} />
              ) : (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(itemStyles, isActive(item.href) && 'underline decoration-2 underline-offset-8')}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden lg:block lg:justify-self-end">{action}</div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuPath(menuOpen ? null : pathname)}
          className="inline-flex size-12 items-center justify-center hover:bg-white/10 lg:hidden"
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </Container>

      {menuOpen && (
        <div id={panelId} className="absolute inset-x-0 top-full max-h-dvh overflow-y-auto border-b border-ink-700 bg-ink-900 pb-8 lg:hidden">
          <Container>
            <nav aria-label="Mobile">
              <ul className="divide-y divide-ink-700">
                {nav.map((item) => (
                  <li key={item.href} className="py-2">
                    <Link
                      prefetch={false}
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className="flex min-h-12 items-center text-body font-medium"
                    >
                      {item.children ? 'All services' : item.label}
                    </Link>
                    {item.children && (
                      <ul className="pb-2 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link prefetch={false} href={child.href} className="flex min-h-12 items-center text-body text-ink-300">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6">{action}</div>
          </Container>
        </div>
      )}
    </header>
  );
}
