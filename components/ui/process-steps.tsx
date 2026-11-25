import { cn } from '@/lib/cn';

type Step = {
  title: string;
  body: string;
};

type ProcessStepsProps = {
  /** Three or four ordered steps. */
  steps: ReadonlyArray<Step>;
  headingLevel?: 'h3' | 'h4';
};

const columns: Record<number, string> = {
  3: 'xl:grid-cols-3',
  4: '2xl:grid-cols-4',
};

export function ProcessSteps({ steps, headingLevel = 'h3' }: ProcessStepsProps) {
  const Heading = headingLevel;
  return (
    <ol className={cn('grid gap-8 sm:grid-cols-2', columns[steps.length] ?? '2xl:grid-cols-4')}>
      {steps.map((step, i) => (
        <li key={step.title} className="border-t border-ink-900 pt-4 on-dark:border-white">
          <p className="font-mono text-label font-medium text-green-800 on-dark:text-green-200">
            {String(i + 1).padStart(2, '0')}
          </p>
          <Heading className="mt-3 font-display text-title font-extrabold font-condensed">
            {step.title}
          </Heading>
          <p className="mt-3 text-body text-ink-700 on-dark:text-ink-300">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
