'use client';

import { useState, type FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './button';
import { FormField } from './form-field';

type EnquiryFormProps = {
  /** Options for the service select. The first is the default. */
  services: ReadonlyArray<{ value: string; label: string }>;
  /** Value of the option chosen on load. */
  defaultService?: string;
  /** Shows a close button after sending. Used inside the Drawer. */
  onDone?: () => void;
  /** Moves focus to the first field on mount of a Drawer. */
  focusFirst?: boolean;
};

const fallbackError = 'The enquiry could not be sent. Please contact us by phone, WhatsApp or email.';

export function EnquiryForm({ services, defaultService = 'general', onDone, focusFirst }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [more, setMore] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus('sending');
    setErrors({});
    setFormError(null);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { errors?: Record<string, string>; error?: string };
      if (response.ok) {
        setStatus('sent');
        return;
      }
      setStatus('idle');
      if (response.status === 422 && result.errors) setErrors(result.errors);
      else setFormError(result.error ?? fallbackError);
    } catch {
      setStatus('idle');
      setFormError(fallbackError);
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="space-y-6">
        <p className="font-display text-title font-extrabold font-condensed">Enquiry sent</p>
        <p className="text-body text-ink-700">Thank you. Your enquiry has been sent to Phanello Solutions.</p>
        {onDone && (
          <Button variant="secondary" onClick={onDone}>
            Close this panel
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FormField label="Name" name="name" required autoComplete="name" error={errors.name} dataAutofocus={focusFirst} />
      <FormField label="Email address" name="email" type="email" required autoComplete="email" error={errors.email} />
      <FormField
        label="Message"
        name="message"
        control="textarea"
        required
        hint="Describe what you need."
        error={errors.message}
      />
      <button
        type="button"
        aria-expanded={more}
        aria-controls="enquiry-more"
        onClick={() => setMore((open) => !open)}
        className="flex min-h-12 w-full items-center justify-between border-y border-ink-200 text-body font-semibold transition-colors duration-150 ease-standard hover:text-green-800"
      >
        {more ? 'Hide extra details' : 'Add more detail'}
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={more ? 'rotate-180 transition-transform duration-150 ease-standard' : 'transition-transform duration-150 ease-standard'}
        />
      </button>
      {more ? (
        <div id="enquiry-more" className="flex flex-col gap-6">
          <FormField
            label="Phone number"
            name="phone"
            type="tel"
            autoComplete="tel"
            hint="Optional. Add it if you prefer a call."
            error={errors.phone}
          />
          <FormField
            label="What is your enquiry about?"
            name="service"
            control="select"
            options={services}
            defaultValue={defaultService}
            error={errors.service}
          />
        </div>
      ) : (
        <input type="hidden" name="service" value={defaultService} />
      )}
      <div className="sr-only" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {formError && (
        <p role="alert" className="border-2 border-ink-900 p-4 text-body font-semibold">
          Error: {formError}
        </p>
      )}
      <div className="stack-actions">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send the enquiry'}
        </Button>
      </div>
    </form>
  );
}
