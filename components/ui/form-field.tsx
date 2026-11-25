import { useId, type ChangeEventHandler } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type FieldBase = {
  label: string;
  name: string;
  /** Help text shown under the label. */
  hint?: string;
  /** Error message. Replaces the hint and marks the field invalid. */
  error?: string;
  required?: boolean;
  defaultValue?: string;
};

type InputField = FieldBase & {
  control?: 'input';
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  /** Marks the field that should receive focus when a Drawer opens. */
  dataAutofocus?: boolean;
};

type TextareaField = FieldBase & {
  control: 'textarea';
  rows?: number;
};

type SelectField = FieldBase & {
  control: 'select';
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export type FormFieldProps = InputField | TextareaField | SelectField;

const control =
  'block w-full rounded-sm border border-ink-500 bg-white px-4 text-body text-ink-900 transition-colors duration-150 ease-standard hover:border-ink-900';

export function FormField(props: FormFieldProps) {
  const id = useId();
  const { label, name, hint, error, required, defaultValue } = props;
  const describedBy = error || hint ? `${id}-note` : undefined;
  const shared = {
    id,
    name,
    required,
    defaultValue,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
  };
  const border = error ? 'border-2 border-ink-900' : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-body font-semibold text-ink-900">
        {label}
        {required && <span className="ml-2 font-mono text-label font-medium uppercase text-ink-600">Required</span>}
      </label>
      {(hint || error) && (
        <p id={`${id}-note`} className="mt-1 text-small text-ink-600">
          {error ? <strong className="font-semibold text-ink-900">Error: {error}</strong> : hint}
        </p>
      )}
      <div className="relative mt-2">
        {props.control === 'textarea' ? (
          <textarea {...shared} rows={props.rows ?? 5} className={cn(control, 'py-3', border)} />
        ) : props.control === 'select' ? (
          <>
            <select {...shared} onChange={props.onChange} className={cn(control, 'h-12 appearance-none pr-12', border)}>
              {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-900"
            />
          </>
        ) : (
          <input
            {...shared}
            type={props.type ?? 'text'}
            autoComplete={props.autoComplete}
            data-autofocus={props.dataAutofocus ? '' : undefined}
            className={cn(control, 'h-12', border)}
          />
        )}
      </div>
    </div>
  );
}
