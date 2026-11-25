import { contact } from './site';

type Item = { id?: string; title: string; body: string };
type Step = { title: string; body: string };
type Faq = { id: string; question: string; answer: string };

export type ServicePageContent = {
  slug: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  emphasis: string;
  description: string;
  included: ReadonlyArray<Item>;
  steps: ReadonlyArray<Step>;
  who: { heading: string; emphasis: string; body: string };
  faqs: ReadonlyArray<Faq>;
  diagram?: {
    kind: 'assistant-scope' | 'migration-path';
    eyebrow: string;
    heading: string;
    emphasis: string;
    paragraphs: ReadonlyArray<string>;
  };
  cta: {
    headerAction: string;
    heading: string;
    emphasis: string;
    body: string;
    primaryAction: string;
    whatsappAction: string;
    whatsappMessage: string;
  };
};

export const servicePageContent: ReadonlyArray<ServicePageContent> = [
  {
    slug: 'custom-software-development',
    eyebrow: 'Custom Software and Web',
    metaTitle: 'Custom software development',
    metaDescription: 'Custom software for private-sector organisations and local municipalities, built in Aliwal North, Eastern Cape.',
    heading: 'Custom software built around how you work',
    emphasis: 'work',
    description: 'Phanello designs and builds software for private-sector organisations and local municipalities. The software follows your process instead of asking you to change it to fit a ready-made package.',
    included: [
      { title: 'Web applications', body: 'Software that runs in the browser, so users need nothing installed.' },
      { title: 'Business systems', body: 'Systems for the records, approvals and reports an organisation runs on.' },
      { title: 'Apps that install from the browser', body: 'Mobile-friendly apps that install on a phone like an app, as Aliwal Pulse does.' },
      { title: 'Platforms for local municipalities', body: 'Aliwal Pulse for Walter Sisulu Local Municipality can be configured for other municipalities without being rebuilt.' },
    ],
    steps: [
      { title: 'Describe the work', body: 'You explain the process the software must support and who will use it.' },
      { title: 'Agree the scope', body: 'Screens, data and users are listed and agreed in writing before building starts.' },
      { title: 'Build and review', body: 'The software is built in parts and shown to you, so changes are made before it goes live.' },
      { title: 'Launch and support', body: 'The software goes live and Phanello stays available for fixes and changes.' },
    ],
    who: {
      heading: 'Organisations with a process no package fits',
      emphasis: 'process',
      body: 'Private-sector organisations and local municipalities that run an important process on spreadsheets, paper or software that no longer fits, and want a system built for it.',
    },
    faqs: [
      { id: 'provide', question: 'What do I need to provide?', answer: 'A description of the process, the people who will use the software and the information it must handle. Phanello asks for anything missing while the scope is agreed.' },
      { id: 'phones', question: 'Can the software run on phones?', answer: 'Yes. Aliwal Pulse, built for Walter Sisulu Local Municipality, works on phones and installs like an app.' },
      { id: 'technology', question: 'Which technology is used?', answer: 'Aliwal Pulse uses React, Supabase and PostgreSQL. The technology for each project is agreed when the scope is agreed.' },
    ],
    cta: {
      headerAction: 'Request a software scoping call',
      heading: 'Scope your software project',
      emphasis: 'project',
      body: 'Describe the process you want to support and we will come back to you.',
      primaryAction: 'Ask for a software quote',
      whatsappAction: 'Message us about software on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about custom software.',
    },
  },
  {
    slug: 'ai-chatbots-and-ai-web-apps',
    eyebrow: 'AI and Automation',
    metaTitle: 'AI chatbots and AI web apps',
    metaDescription: 'AI chatbots and AI-integrated web apps that answer from your own data, with scope, limits and handover to a person defined with you.',
    heading: 'AI assistants scoped to your own data',
    emphasis: 'scoped',
    description: 'AI chatbots answer questions for customers or staff, and AI web apps give a website or application access to the company’s own data. What the AI can reach is scoped according to the design of that company.',
    included: [
      { title: 'Data sources', body: 'The documents, records or systems the assistant may use, chosen with you.' },
      { title: 'Access scope', body: 'Who can ask what, defined for each type of user.' },
      { title: 'Answer limits', body: 'What the assistant may and may not answer.' },
      { title: 'Handover to a person', body: 'When a question goes to a member of staff, and how.' },
      { title: 'Chatbot or web app', body: 'A chatbot for questions, or a web app with the assistant built in.' },
    ],
    steps: [
      { title: 'Choose the data', body: 'You and Phanello decide which data sources the assistant may use.' },
      { title: 'Set scope and limits', body: 'Who can ask what, and what the assistant may and may not answer, are written down.' },
      { title: 'Build and test', body: 'The assistant is built and tried with realistic questions before it is used.' },
      { title: 'Launch and review', body: 'It goes live with handover to a person in place, and the scope is reviewed as needs change.' },
    ],
    who: {
      heading: 'Teams answering the same questions',
      emphasis: 'same',
      body: 'Organisations whose customers or staff keep asking questions that are answered in company documents, records or systems, and that want those answers given consistently.',
    },
    faqs: [
      { id: 'what', question: 'What is an AI-integrated web app?', answer: 'A website or application with an AI assistant that has access to the company’s own data. What it can access is scoped according to the design of that company.' },
      { id: 'defined', question: 'What is decided before the assistant is built?', answer: 'Which data sources it uses, who can ask what, what it may and may not answer, and when it hands over to a person.' },
      { id: 'handover', question: 'What happens when the assistant should not answer?', answer: 'The question is handed over to a person. Who receives it, and how, is defined with the client.' },
    ],
    diagram: {
      kind: 'assistant-scope',
      eyebrow: 'Defined with you',
      heading: 'Scope is set before anything is built',
      emphasis: 'Scope',
      paragraphs: [
        'The diagram shows where a scoped assistant sits: between the people asking and the company’s data.',
        'Phanello defines each layer with the client before the assistant is built.',
      ],
    },
    cta: {
      headerAction: 'Request an AI assistant scoping call',
      heading: 'Scope an assistant for your data',
      emphasis: 'data',
      body: 'Tell us which questions you want answered and where the answers sit today.',
      primaryAction: 'Scope an AI web app with us',
      whatsappAction: 'Message us about AI on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about an AI assistant.',
    },
  },
  {
    slug: 'workflow-automation',
    eyebrow: 'AI and Automation',
    metaTitle: 'Workflow automation',
    metaDescription: 'Workflow automation that connects the steps of routine tasks so they stop depending on someone doing each one by hand.',
    heading: 'Workflow automation that removes repeated manual steps',
    emphasis: 'manual',
    description: 'Workflow automation connects the steps of a routine task so they run without someone doing each one by hand. Phanello maps the task first and automates the parts that suit it.',
    included: [
      { title: 'Task mapping', body: 'The current steps written down in order, with who does each one.' },
      { title: 'Hand-offs', body: 'Steps passed between people and systems automatically.' },
      { title: 'Notifications', body: 'Messages sent when a step is done or is waiting on someone.' },
      { title: 'Data transfer', body: 'Details moved between systems instead of being retyped.' },
    ],
    steps: [
      { title: 'Map the task', body: 'The steps are written down in order, with who does each one.' },
      { title: 'Choose what to automate', body: 'Repeated, rule-based steps are automated. Steps that need judgement stay with a person.' },
      { title: 'Build and test', body: 'The automation is run on real examples of the task before it is switched on.' },
      { title: 'Switch on and adjust', body: 'It goes live and is adjusted as the task changes.' },
    ],
    who: {
      heading: 'Teams repeating one sequence by hand',
      emphasis: 'sequence',
      body: 'Teams that receive a request, copy details between systems and send a confirmation many times a week, or that run any other routine sequence by hand.',
    },
    faqs: [
      { id: 'suit', question: 'Which tasks suit automation?', answer: 'Tasks that repeat, follow clear rules and involve moving information between people or systems.' },
      { id: 'people', question: 'Do people still have a role?', answer: 'Yes. Steps that need a decision stay with a person, and the automation handles the repeated steps around them.' },
      { id: 'ai', question: 'Can a step use AI?', answer: 'Where a step needs it. AI chatbots and AI web apps are described on their own page.' },
    ],
    cta: {
      headerAction: 'Request a workflow review',
      heading: 'Start with one routine task',
      emphasis: 'one',
      body: 'Name the task your team repeats most often and we will look at how it runs today.',
      primaryAction: 'Ask us to automate a task',
      whatsappAction: 'Message us about automation on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about workflow automation.',
    },
  },
  {
    slug: 'microsoft-365-and-intune',
    eyebrow: 'Microsoft 365 and Cloud',
    metaTitle: 'Microsoft 365 and Intune',
    metaDescription: 'Microsoft 365 setup, Microsoft Intune device enrolment, company email domains and email signature design for your team.',
    heading: 'Microsoft 365, Intune and email on your own domain',
    emphasis: 'Intune',
    description: 'Phanello sets up Microsoft 365 for your organisation, enrols its devices in Microsoft Intune and sets up email on your own domain. It also designs the email signature every user sends with.',
    included: [
      { title: 'Microsoft 365', body: 'Setup of the organisation’s Microsoft 365 and its user accounts.' },
      { title: 'Microsoft Intune enrolment', body: 'Enrolling company devices in Intune so they can be managed.' },
      { id: 'email-domains', title: 'Email domains', body: 'Email addresses on your own domain instead of a free provider’s.' },
      { id: 'signature-design', title: 'Signature design', body: 'One email signature layout, applied to every user.' },
    ],
    steps: [
      { title: 'List users and devices', body: 'You provide the people who need accounts and the devices to be enrolled.' },
      { title: 'Set up Microsoft 365 and the domain', body: 'Accounts are created and email is set up on your own domain.' },
      { title: 'Enrol devices', body: 'Company devices are enrolled in Microsoft Intune.' },
      { title: 'Add signatures and hand over', body: 'The signature design is applied to each user and the setup is handed over.' },
    ],
    who: {
      heading: 'Teams on free email and unmanaged devices',
      emphasis: 'unmanaged',
      body: 'Organisations that use personal or free email addresses for work, or whose PCs and phones are not managed centrally.',
    },
    faqs: [
      { id: 'intune', question: 'What is Microsoft Intune?', answer: 'Intune is a Microsoft service for enrolling and managing the devices people use for work.' },
      { id: 'domain', question: 'Why use my own email domain?', answer: 'Addresses on your own domain show your organisation’s name instead of a free provider’s, and the organisation holds the accounts.' },
      { id: 'signatures', question: 'Who designs the signatures?', answer: 'Phanello designs one signature layout for the organisation and applies it to each user’s account.' },
    ],
    cta: {
      headerAction: 'Book a Microsoft 365 setup call',
      heading: 'Set up Microsoft 365 for your team',
      emphasis: 'team',
      body: 'Tell us how many people and devices are involved and which email addresses you use today.',
      primaryAction: 'Book a Microsoft 365 and Intune quote',
      whatsappAction: 'Message us about Microsoft 365 on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about Microsoft 365 and Intune.',
    },
  },
  {
    slug: 'cloud-migration',
    eyebrow: 'Microsoft 365 and Cloud',
    metaTitle: 'Cloud migration',
    metaDescription: 'Cloud migration that starts with a list of what you run today and moves it in an agreed order, checking each part as it moves.',
    heading: 'Cloud migration with a plan for every system',
    emphasis: 'plan',
    description: 'Cloud migration moves the systems and data you run today to a cloud service. Phanello starts by listing what runs where, then moves each part in an agreed order.',
    included: [
      { title: 'Review', body: 'A list of the systems, files and accounts you run today.' },
      { title: 'Migration plan', body: 'The order of the moves and what each one involves.' },
      { title: 'Move', body: 'Data and applications moved to the cloud service.' },
      { title: 'Checks', body: 'Each part checked after it moves, before the next one starts.' },
      { title: 'Switch-over', body: 'Users moved to the new setup.' },
    ],
    steps: [
      { title: 'Review what runs today', body: 'Systems, files and accounts are listed, with who uses each one.' },
      { title: 'Plan the order', body: 'The moves are put in order, with what each one involves.' },
      { title: 'Move and check', body: 'Each part is moved and checked before the next one starts.' },
      { title: 'Switch over', body: 'Users move to the new setup and the old one is retired.' },
    ],
    who: {
      heading: 'Organisations running mail or files on-site',
      emphasis: 'on-site',
      body: 'Organisations whose mail, files or applications run on equipment at their own premises, or with a provider they want to leave.',
    },
    faqs: [
      { id: 'which', question: 'Which cloud service will my systems move to?', answer: 'The destination is chosen during the review, based on what you run today.' },
      { id: 'once', question: 'Does everything move at once?', answer: 'Not necessarily. The plan sets the order, and parts can move separately.' },
      { id: 'first', question: 'What do you need from us first?', answer: 'A list of the systems and accounts you use, and access to them so they can be reviewed.' },
    ],
    diagram: {
      kind: 'migration-path',
      eyebrow: 'The path',
      heading: 'From current setup to the cloud',
      emphasis: 'cloud',
      paragraphs: [
        'Every migration follows the same path. The review and the plan fill it in for your systems.',
      ],
    },
    cta: {
      headerAction: 'Request a cloud migration review',
      heading: 'Plan your move to the cloud',
      emphasis: 'cloud',
      body: 'Tell us what you run today and where it runs.',
      primaryAction: 'Book a cloud migration quote',
      whatsappAction: 'Message us about cloud migration on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about cloud migration.',
    },
  },
  {
    slug: 'it-support-and-hardware',
    eyebrow: 'IT Support and Hardware',
    metaTitle: 'IT support and hardware',
    metaDescription: 'IT support and user management, software upgrades, and PC and desktop hardware upgrades for offices and teams.',
    heading: 'IT support, upgrades and user management',
    emphasis: 'support',
    description: 'Phanello provides IT support and user management, and carries out software upgrades and PC and desktop hardware upgrades. Requests can be made by phone, WhatsApp or email.',
    included: [
      { id: 'user-management', title: 'User management', body: 'Accounts created, changed and removed as people join, move and leave.' },
      { title: 'IT support', body: 'Help with the problems and requests users raise.' },
      { id: 'software-upgrades', title: 'Software upgrades', body: 'Upgrading the software your team uses.' },
      { id: 'pc-and-desktop-hardware', title: 'PC and desktop hardware upgrades', body: 'Upgrades to desktop PCs and their parts.' },
    ],
    steps: [
      { title: 'Report it', body: 'Describe the problem or request by phone, WhatsApp or email.' },
      { title: 'Diagnose', body: 'The cause is found, or the upgrade is scoped.' },
      { title: 'Fix or upgrade', body: 'The problem is fixed or the software or hardware is upgraded.' },
      { title: 'Confirm', body: 'The user confirms the problem is resolved or the upgrade works.' },
    ],
    who: {
      heading: 'Offices without their own IT staff',
      emphasis: 'own',
      body: 'Small offices and teams that depend on PCs and software but have no IT person of their own.',
    },
    faqs: [
      { id: 'ask', question: 'How do I ask for support?', answer: `Call or message ${contact.phoneDisplay} on WhatsApp, or email ${contact.email}.` },
      { id: 'users', question: 'What does user management cover?', answer: 'Creating, changing and removing user accounts as people join, change roles and leave.' },
      { id: 'pcs', question: 'Can existing PCs be upgraded?', answer: 'PC and desktop hardware upgrades cover desktop machines. Whether an upgrade suits a machine is decided case by case.' },
    ],
    cta: {
      headerAction: 'Ask about IT support',
      heading: 'Get IT support for your office',
      emphasis: 'office',
      body: 'Tell us what you use today and what is not working.',
      primaryAction: 'Request an upgrade or support quote',
      whatsappAction: 'Message us about IT support on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about IT support.',
    },
  },
  {
    slug: 'website-design',
    eyebrow: 'Custom Software and Web',
    metaTitle: 'Website design',
    metaDescription: 'Website design for organisations in Aliwal North, Eastern Cape.',
    heading: 'Website design for your organisation',
    emphasis: 'organisation',
    description: 'Phanello designs and builds websites for organisations and their visitors. The site works on phones as well as desktop screens.',
    included: [
      { title: 'Web design', body: 'A website designed for your organisation and its content.' },
      { title: 'Your own domain', body: 'The site can use your organisation’s own domain.' },
      { title: 'Mobile layout', body: 'Pages that work on phones as well as desktop screens.' },
      { title: 'Changes after launch', body: 'Updates to the site once it is live.' },
    ],
    steps: [
      { title: 'Brief', body: 'You describe the organisation, the visitors and what the site must do.' },
      { title: 'Design', body: 'The layout and structure of the site are designed and shown to you.' },
      { title: 'Build and review', body: 'The site is built and reviewed with you before it goes live.' },
      { title: 'Launch', body: 'The site goes live on the host you choose or already have.' },
    ],
    who: {
      heading: 'Organisations whose site no longer fits',
      emphasis: 'fits',
      body: 'Organisations with no website, or with one that is out of date or hard to use on a phone.',
    },
    faqs: [
      { id: 'design', question: 'What does web design cover?', answer: 'The layout and content structure of the site, built so it works on phones and desktop screens.' },
      { id: 'hosting', question: 'Does Phanello host the website?', answer: 'No. Phanello designs and builds the site, and it is launched on a host you choose or already have.' },
      { id: 'domain', question: 'Can I use my own domain?', answer: 'Yes. The site can use your organisation’s own domain.' },
    ],
    cta: {
      headerAction: 'Request a website brief call',
      heading: 'Start your website',
      emphasis: 'website',
      body: 'Tell us what the site is for and who will use it.',
      primaryAction: 'Ask for a website quote',
      whatsappAction: 'Message us about your website on WhatsApp',
      whatsappMessage: 'Hello Phanello Solutions, I would like to ask about a website design.',
    },
  },
];
