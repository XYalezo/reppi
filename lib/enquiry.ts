import { z } from 'zod';
import { enquiryServices } from '@/content/enquiry';

const serviceValues = enquiryServices.map((service) => service.value);

export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(100, 'Use 100 characters or fewer.'),
  email: z.string().trim().max(200, 'Use 200 characters or fewer.').pipe(z.email('Enter a valid email address.')),
  phone: z
    .string()
    .trim()
    .max(30, 'Use 30 characters or fewer.')
    .regex(/^[0-9+()\-\s]*$/, 'Use digits, spaces and + only.')
    .optional(),
  service: z.string().refine((value) => serviceValues.includes(value), 'Choose one of the listed options.'),
  message: z.string().trim().min(10, 'Write at least 10 characters.').max(4000, 'Use 4000 characters or fewer.'),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export function serviceLabel(value: string): string {
  return enquiryServices.find((service) => service.value === value)?.label ?? value;
}

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
