import { aliwalPulse } from './work';

export const workPage = {
  metaTitle: 'Work',
  metaDescription: 'Aliwal Pulse, a resident engagement platform built for Walter Sisulu Local Municipality and live in use.',
  eyebrow: 'Work',
  heading: 'One platform, live in a municipality',
  emphasis: 'live',
  body: 'Aliwal Pulse is a resident engagement platform built for Walter Sisulu Local Municipality. It is live and in use.',
  headerAction: 'Ask about a similar project',
  feature: {
    eyebrow: 'Case study',
    heading: 'Aliwal Pulse',
    emphasis: 'Pulse',
    link: 'Read the Aliwal Pulse case study',
  },
  cta: {
    heading: 'Have a project like this',
    emphasis: 'project',
    body: 'Describe what you want built and we will come back to you.',
    primaryAction: 'Ask about building your platform',
    whatsappAction: 'Message us about a project on WhatsApp',
    whatsappMessage: 'Hello Phanello Solutions, I would like to ask about building a platform like Aliwal Pulse.',
  },
} as const;

export const caseStudyPage = {
  metaTitle: 'Aliwal Pulse case study',
  metaDescription: 'Aliwal Pulse for Walter Sisulu Local Municipality: a resident engagement platform that works on phones and is live and in use.',
  eyebrow: 'Case study',
  heading: 'Aliwal Pulse for Walter Sisulu Local Municipality',
  emphasis: 'Pulse',
  body: 'A resident engagement platform that works on phones and installs like an app. It is live and in use.',
  headerAction: 'Discuss a similar platform',
  brief: {
    eyebrow: 'Brief',
    heading: 'A platform for the residents of one municipality',
    emphasis: 'residents',
    body: 'The project is a resident engagement platform for Walter Sisulu Local Municipality, built to work on phones.',
  },
  structure: {
    eyebrow: 'Structure',
    heading: 'One platform, separate data',
    emphasis: 'separate',
    paragraphs: [
      'Residents use Aliwal Pulse on their phones. Automated security checks keep each municipality’s data separate.',
      'The same platform can be configured for other municipalities without being rebuilt.',
    ],
  },
  approach: {
    eyebrow: 'Approach',
    heading: 'How the platform was built',
    emphasis: 'built',
    items: [
      { title: 'Works on phones', body: 'Residents use it on their phones.' },
      { title: 'Installs like an app', body: 'It can be installed on a phone like an app.' },
      { title: 'Built with POPIA in mind', body: 'The platform was designed with POPIA in mind.' },
      { title: 'Security tested with automated checks', body: 'The checks keep each municipality’s data separate.' },
      { title: 'One platform, other municipalities', body: 'The same platform can be configured for other municipalities without being rebuilt.' },
    ],
  },
  outcome: {
    eyebrow: 'Outcome',
    heading: 'Live and in use',
    emphasis: 'Live',
    facts: aliwalPulse.facts,
  },
  cta: {
    heading: 'Need a platform like this',
    emphasis: 'platform',
    body: 'Tell us who the platform is for and what they need to do with it.',
    primaryAction: 'Ask about a platform like Aliwal Pulse',
    whatsappAction: 'Message us about a platform on WhatsApp',
    whatsappMessage: 'Hello Phanello Solutions, I would like to ask about a platform like Aliwal Pulse.',
  },
} as const;

export const aboutPage = {
  metaTitle: 'About',
  metaDescription: 'Phanello Solutions (Pty) Ltd is an IT consulting company in Aliwal North, founded in 2025 by Xolisa Yalezo.',
  eyebrow: 'About',
  heading: 'An IT company that grew out of general trading',
  emphasis: 'grew',
  body: 'Phanello Solutions (Pty) Ltd is an IT consulting company based in Aliwal North, Eastern Cape. It was founded in 2025 by Xolisa Yalezo.',
  headerAction: 'Ask Phanello a question',
  story: {
    eyebrow: 'Company story',
    heading: 'From general supply to IT services',
    emphasis: 'supply',
    paragraphs: [
      'Phanello Solutions began in general trading and supply. It grew into IT services, and now builds custom software for the private sector and for local municipalities and provides the IT services listed on this site.',
      'The company was founded in 2025 and is based in Aliwal North, Eastern Cape.',
    ],
  },
  founder: {
    eyebrow: 'Founder',
    heading: 'Xolisa Yalezo, founder and sole director',
    emphasis: 'Yalezo',
    paragraph: 'Xolisa Yalezo founded Phanello Solutions in 2025 and is its sole director.',
    credentialsHeading: 'Certifications held',
    credentials: ['AZ-900', 'AI-901', 'Google IT Support', 'Google Cybersecurity', 'Huawei HCIA-Datacom', 'Cisco'],
  },
  how: {
    eyebrow: 'How we work',
    heading: 'How Phanello works',
    emphasis: 'works',
  },
  cta: {
    heading: 'Talk to the person who runs it',
    emphasis: 'person',
    body: 'Describe what you need and Xolisa will come back to you.',
    primaryAction: 'Ask the founder about your project',
    whatsappAction: 'Message the founder on WhatsApp',
    whatsappMessage: 'Hello Phanello Solutions, I would like to speak to the founder about a project.',
  },
} as const;

export const contactPage = {
  metaTitle: 'Contact',
  metaDescription: 'Contact Phanello Solutions in Aliwal North by enquiry form, WhatsApp, phone or email.',
  eyebrow: 'Contact',
  heading: 'Contact us by form, WhatsApp, phone or email',
  emphasis: 'WhatsApp',
  body: 'Use whichever channel suits you. Describe what you need and we will come back to you.',
  form: {
    eyebrow: 'Enquiry form',
    heading: 'Send an enquiry',
    emphasis: 'enquiry',
    lede: 'Choose the service closest to your need and describe it. The form is sent to Phanello Solutions by email.',
  },
  whatsapp: {
    eyebrow: 'WhatsApp',
    heading: 'Start on WhatsApp',
    emphasis: 'WhatsApp',
    lede: 'Choose a topic and WhatsApp opens with a first message ready to send.',
  },
} as const;

export const notFoundPage = {
  heading: 'Page not found',
  emphasis: 'found',
  lede: 'The page you asked for does not exist or has moved.',
} as const;

export const errorPage = {
  heading: 'Something went wrong',
  emphasis: 'wrong',
  lede: 'The page could not be shown. You can try again or go back to the home page.',
} as const;
