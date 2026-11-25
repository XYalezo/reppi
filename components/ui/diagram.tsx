import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type DiagramFrameProps = {
  /** Short accessible name. */
  title: string;
  /** One sentence describing what the diagram shows. */
  description: string;
  width: number;
  height: number;
  children: ReactNode;
};

export function DiagramFrame({ title, description, width, height, children }: DiagramFrameProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className="h-auto w-full max-w-narrow text-ink-500 on-dark:text-ink-300"
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      {children}
    </svg>
  );
}

type NodeVariant = 'plain' | 'solid' | 'dashed';

type DiagramNodeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** First line is set semibold. */
  lines: ReadonlyArray<string>;
  variant?: NodeVariant;
};

const rectStyles: Record<NodeVariant, string> = {
  plain: 'fill-white stroke-ink-500 on-dark:fill-ink-800',
  solid: 'fill-green-800 stroke-green-700',
  dashed: 'fill-transparent stroke-ink-500 on-dark:stroke-ink-300',
};

const textStyles: Record<NodeVariant, string> = {
  plain: 'fill-ink-900 on-dark:fill-white',
  solid: 'fill-white',
  dashed: 'fill-ink-900 on-dark:fill-white',
};

const lineGap = 20;

export function DiagramNode({ x, y, width, height, lines, variant = 'plain' }: DiagramNodeProps) {
  const firstBaseline = y + height / 2 - ((lines.length - 1) * lineGap) / 2 + 5;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="2"
        strokeWidth="1.5"
        strokeDasharray={variant === 'dashed' ? '6 4' : undefined}
        className={rectStyles[variant]}
      />
      <text textAnchor="middle" className={cn('font-body text-body', textStyles[variant])}>
        {lines.map((line, i) => (
          <tspan key={line} x={x + width / 2} y={firstBaseline + i * lineGap} className={i === 0 ? 'font-semibold' : undefined}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

type Point = readonly [number, number];

type DiagramArrowProps = {
  from: Point;
  to: Point;
};

export function DiagramArrow({ from, to }: DiagramArrowProps) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const length = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / length;
  const uy = (y2 - y1) / length;
  const bx = x2 - ux * 9;
  const by = y2 - uy * 9;
  const px = -uy * 5;
  const py = ux * 5;
  return (
    <g aria-hidden="true">
      <line x1={x1} y1={y1} x2={bx} y2={by} strokeWidth="1.5" className="stroke-current" />
      <path d={`M${x2} ${y2}L${bx + px} ${by + py}L${bx - px} ${by - py}Z`} className="fill-current" />
    </g>
  );
}

type DiagramLabelProps = {
  x: number;
  y: number;
  children: string;
};

export function DiagramLabel({ x, y, children }: DiagramLabelProps) {
  return (
    <text x={x} y={y} className="fill-current font-mono text-body font-medium uppercase">
      {children}
    </text>
  );
}
