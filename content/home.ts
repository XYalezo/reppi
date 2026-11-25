import { company, contact } from './site';
import { serviceCount } from './services';

export const home = {
  hero: {
    eyebrow: company.base,
    heading: 'IT consulting and custom software from Aliwal North',
    emphasis: 'software',
    body: 'Phanello Solutions builds custom software for the private sector and for local municipalities, and provides the IT services around it: Microsoft 365, cloud, AI and day-to-day IT support.',
    primaryAction: 'Discuss a software project',
    secondaryAction: 'Browse all services',
  },
  stats: [
    { value: String(serviceCount), label: 'Services in four families' },
    { value: '2', label: 'Sectors: private and municipal' },
    { value: '1', label: 'Municipal platform, live and in use' },
  ],
  who: {
    eyebrow: 'Who we are',
    heading: 'An IT company from Aliwal North',
    emphasis: 'Aliwal',
    paragraphs: [
      'Phanello Solutions (Pty) Ltd is an IT consulting company based in Aliwal North, Eastern Cape. It builds custom software for the private sector and for local municipalities, and provides the IT services listed on this site.',
      'Founded in 2025 by Xolisa Yalezo, the company grew out of general trading and supply into IT services.',
    ],
  },
  services: {
    eyebrow: 'Services',
    heading: 'Ten services in four families',
    emphasis: 'four',
    lede: 'Software and web, AI and automation, Microsoft 365 and cloud, and the IT support that keeps people working.',
    summaries: [
      'Custom software for private-sector organisations and local municipalities, plus website design.',
      'AI chatbots, AI web apps that work with a company’s own data, and workflow automation.',
      'Microsoft 365 and Intune enrolment, cloud migration, and email domains with signature design.',
      'IT support and user management, software upgrades, and PC and desktop hardware upgrades.',
    ],
  },
  ai: {
    eyebrow: 'AI and automation',
    heading: 'AI that answers from your own data',
    emphasis: 'own',
    paragraphs: [
      'An AI web app can work with the company’s own data. What it can reach is scoped according to the design of that company.',
      'These are defined with the client before anything is built:',
    ],
    points: [
      'Which data sources it can use',
      'Who can ask what',
      'What the assistant may and may not answer',
      'When it hands over to a person',
    ],
    action: 'Read about AI assistants',
  },
  process: {
    eyebrow: 'Process',
    heading: 'How a project runs',
    emphasis: 'project',
    steps: [
      { title: 'Tell us what you need', body: 'Describe the problem, the system or the equipment involved.' },
      { title: 'Get a written quote', body: 'The scope and price are agreed in writing before work starts.' },
      { title: 'We build or set up', body: 'Software is built, accounts are set up and equipment is installed.' },
      { title: 'We stay available', body: 'You can contact us for support once the work is in use.' },
    ],
  },
  project: {
    eyebrow: 'Work',
    heading: 'Aliwal Pulse for Walter Sisulu Local Municipality',
    emphasis: 'Pulse',
    link: 'Read the Aliwal Pulse case study',
  },
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions about Phanello',
    emphasis: 'Phanello',
    items: [
      {
        id: 'services',
        question: 'Which services does Phanello offer?',
        answer: 'Custom software development, website design, AI chatbots and AI web apps, workflow automation, Microsoft 365 and Intune enrolment, cloud migration, email domains and signature design, IT support and user management, software upgrades, and PC and desktop hardware upgrades.',
      },
      {
        id: 'municipalities',
        question: 'Can the municipal platform be used by other municipalities?',
        answer: 'Yes. The platform built for Walter Sisulu Local Municipality can be configured for other municipalities without being rebuilt.',
      },
      {
        id: 'start',
        question: 'How do I start?',
        answer: `Use the enquiry form, message ${contact.phoneDisplay} on WhatsApp, or email ${contact.email}. Describe what you need and Phanello will come back to you.`,
      },
    ],
  },
  cta: {
    heading: 'Tell us what you need',
    emphasis: 'need',
    body: 'Describe the project, the system or the IT problem and we will come back to you.',
    primaryAction: 'Ask about a project or IT service',
    whatsappAction: 'Message us on WhatsApp',
    whatsappMessage: 'Hello Phanello Solutions, I would like to ask about your services.',
  },
} as const;

export const servicesPage = {
  metaDescription: 'Ten IT services in four families: custom software and web, AI and automation, Microsoft 365 and cloud, and IT support and hardware.',
  eyebrow: 'Services',
  heading: 'Ten IT services in four families',
  emphasis: 'four',
  body: 'Custom software and web, AI and automation, Microsoft 365 and cloud, and IT support and hardware. Each service links to its own page.',
  headerAction: 'Ask which service fits',
  cta: {
    heading: 'Not sure which service you need',
    emphasis: 'need',
    body: 'Describe the problem and we will tell you which service covers it.',
    primaryAction: 'Request a call about your IT',
    whatsappAction: 'Message us about a service on WhatsApp',
    whatsappMessage: 'Hello Phanello Solutions, I am not sure which service I need. Can you help?',
  },
} as const;
