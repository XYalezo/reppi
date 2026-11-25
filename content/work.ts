export const aliwalPulse = {
  name: 'Aliwal Pulse',
  client: 'Walter Sisulu Local Municipality',
  type: 'Resident engagement platform',
  status: 'Live and in use',
  stack: 'React, Supabase and PostgreSQL',
  summary: [
    'Aliwal Pulse is a resident engagement platform for Walter Sisulu Local Municipality. It works on phones and installs like an app, and it is live and in use.',
    'It has been security tested with automated checks that keep each municipality’s data separate, and it was built with POPIA in mind. The same platform can be configured for other municipalities without being rebuilt.',
  ],
  facts: [
    { label: 'Client', value: 'Walter Sisulu Local Municipality' },
    { label: 'Type', value: 'Resident engagement platform' },
    { label: 'Status', value: 'Live and in use' },
    { label: 'Stack', value: 'React, Supabase and PostgreSQL' },
  ],
} as const;
