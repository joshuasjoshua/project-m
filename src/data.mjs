// All site content lives here. Edit text, add or remove items, then run `npm run build`.
// Everything below is placeholder content until real copy is written.

export const site = {
  name: 'Align Technology',
  tagline: 'Product engineering & AI studio.',
  location: 'Kingston, Jamaica',
  email: 'hello@aligntech.example',
  phone: '+1 (876) 555-0100',
  address: '12 Placeholder Avenue, New Kingston, Jamaica',
  feedbackUrl: 'https://github.com/joshuasjoshua/project-m/issues/new',
  social: {
    LinkedIn: '#',
    Instagram: '#',
    Facebook: '#',
    YouTube: '#',
  },
};

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla.';
const lorem2 =
  'Vestibulum id ligula porta felis euismod semper. Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum, nullam quis risus eget urna mollis ornare vel eu leo.';
export const loremText = [lorem, lorem2];

const featureSet = (prefix) => [
  { title: `${prefix} discovery`, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.' },
  { title: 'Architecture & design', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
  { title: 'Build & test', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
  { title: 'Launch & support', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' },
];

export const solutions = [
  { slug: 'enterprise-software', title: 'Enterprise Software', icon: '▦', blurb: 'Robust systems for organisations that run on reliable software. Lorem ipsum dolor sit amet.' },
  { slug: 'custom-software', title: 'Custom Software', icon: '✦', blurb: 'Software shaped around how your business actually works. Consectetur adipiscing elit.' },
  { slug: 'saas-platforms', title: 'SaaS Platforms', icon: '☁', blurb: 'Multi-tenant products built to scale from first customer to thousands. Sed do eiusmod.' },
  { slug: 'ai-solutions', title: 'AI Solutions', icon: '◎', blurb: 'Practical AI that automates work and surfaces insight. Tempor incididunt ut labore.' },
  { slug: 'mobile-apps', title: 'Mobile Apps', icon: '▯', blurb: 'Native and cross-platform apps people enjoy using. Ut enim ad minim veniam.' },
  { slug: 'web-applications', title: 'Web Applications', icon: '⌘', blurb: 'Fast, accessible web apps and portals. Quis nostrud exercitation ullamco.' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps', icon: '⟳', blurb: 'Infrastructure, CI/CD and monitoring that keep products running. Laboris nisi ut aliquip.' },
  { slug: 'apis-integrations', title: 'APIs & Integrations', icon: '⇄', blurb: 'Connect payments, banks, ERPs and third-party services. Duis aute irure dolor.' },
  { slug: 'business-analysis', title: 'Business Analysis & Product Strategy', short: 'Business Analysis', icon: '◇', blurb: 'Turn ideas into clear requirements and roadmaps. In reprehenderit in voluptate.' },
  { slug: 'digital-transformation', title: 'Digital Transformation', icon: '↗', blurb: 'Move paper and legacy processes to modern digital workflows. Velit esse cillum.' },
  { slug: 'tech-pr-communications', title: 'Tech PR & Communications', short: 'Tech PR', icon: '✉', blurb: 'Launch messaging and communications for technology products. Excepteur sint occaecat.' },
].map((s) => ({ ...s, features: featureSet(s.short || s.title) }));

export const industries = [
  { slug: 'fintech-payments', title: 'Fintech & Payments', icon: '$', blurb: 'Wallets, remittance, lending and payment rails. Lorem ipsum dolor sit amet.' },
  { slug: 'healthcare', title: 'Healthcare', icon: '+', blurb: 'Patient records, telehealth and clinic management. Consectetur adipiscing elit.' },
  { slug: 'government-public-sector', title: 'Government & Public Sector', icon: '⌂', blurb: 'Citizen services, permits and records digitisation. Sed do eiusmod tempor.' },
  { slug: 'ngos-development', title: 'NGOs & Development', icon: '❖', blurb: 'Programme monitoring, beneficiary tracking and reporting. Ut labore et dolore.' },
  { slug: 'microfinance', title: 'Microfinance', icon: '◈', blurb: 'Loan origination, collections and member portals. Magna aliqua ut enim.' },
  { slug: 'ecommerce-retail', title: 'E-commerce & Retail', icon: '⊞', blurb: 'Online stores, inventory and point-of-sale systems. Quis nostrud exercitation.' },
  { slug: 'events-hospitality', title: 'Events & Hospitality', icon: '★', blurb: 'Ticketing, bookings and guest experience for tourism and events. Ullamco laboris.' },
];

// Align's own products (fictional placeholders).
export const products = [
  { slug: 'ledgerly', title: 'Ledgerly', category: 'Fintech', blurb: 'Bookkeeping and invoicing for small Caribbean businesses. Lorem ipsum dolor sit amet.', hue: 160 },
  { slug: 'carelink', title: 'CareLink', category: 'Healthcare', blurb: 'Appointment booking and patient records for clinics. Consectetur adipiscing elit.', hue: 200 },
  { slug: 'tallawah-pay', title: 'Tallawah Pay', category: 'Payments', blurb: 'Mobile payments and merchant QR collections. Sed do eiusmod tempor incididunt.', hue: 45 },
  { slug: 'yaad-market', title: 'Yaad Market', category: 'E-commerce', blurb: 'A marketplace connecting local makers with buyers. Ut labore et dolore magna.', hue: 20 },
  { slug: 'schoolbook', title: 'SchoolBook', category: 'Education', blurb: 'School fees, grades and parent communication in one app. Ut enim ad minim.', hue: 260 },
  { slug: 'fieldops', title: 'FieldOps', category: 'Operations', blurb: 'Offline-first data collection for field teams. Quis nostrud exercitation.', hue: 120 },
  { slug: 'eventpass', title: 'EventPass', category: 'Events', blurb: 'Ticketing and gate scanning for concerts and festivals. Duis aute irure dolor.', hue: 330 },
  { slug: 'align-learn', title: 'Align Learn', category: 'Learning', blurb: 'Short courses in product, data and software skills. Excepteur sint occaecat.', hue: 280 },
];

// Completed client projects (fictional placeholders).
export const projects = [
  { slug: 'island-credit-union-portal', title: 'Island Credit Union member portal', client: 'Lorem Credit Union', industry: 'Microfinance', year: '2025', services: ['Web Applications', 'APIs & Integrations'], hue: 150, result: '40% fewer branch visits' },
  { slug: 'parish-health-records', title: 'Parish clinic health records system', client: 'Ipsum Health Network', industry: 'Healthcare', year: '2025', services: ['Custom Software', 'Cloud & DevOps'], hue: 195, result: '12 clinics onboarded' },
  { slug: 'reggae-fest-ticketing', title: 'Festival ticketing & gate scanning', client: 'Dolor Events Ltd.', industry: 'Events & Hospitality', year: '2024', services: ['Mobile Apps', 'SaaS Platforms'], hue: 340, result: '25k tickets scanned' },
  { slug: 'remittance-wallet', title: 'Diaspora remittance wallet', client: 'Sit Amet Financial', industry: 'Fintech & Payments', year: '2024', services: ['Mobile Apps', 'APIs & Integrations'], hue: 45, result: '3x faster transfers' },
  { slug: 'permit-application-portal', title: 'Online permit applications', client: 'Consectetur Municipal Corp.', industry: 'Government & Public Sector', year: '2023', services: ['Digital Transformation', 'Web Applications'], hue: 220, result: 'Paper forms retired' },
  { slug: 'ngo-impact-dashboard', title: 'Programme impact dashboard', client: 'Adipiscing Foundation', industry: 'NGOs & Development', year: '2023', services: ['AI Solutions', 'Business Analysis & Product Strategy'], hue: 100, result: 'Weekly reporting automated' },
];

export const insights = [
  { slug: 'multi-tenant-saas-architecture', title: 'Lorem ipsum: designing multi-tenant SaaS from day one', tag: 'Engineering', date: 'Sep 2026', mins: 7 },
  { slug: 'mobile-money-integration', title: 'Dolor sit amet: integrating mobile money in the Caribbean', tag: 'Payments', date: 'Aug 2026', mins: 5 },
  { slug: 'data-sovereignty', title: 'Consectetur: why data residency matters for regional products', tag: 'Strategy', date: 'Jul 2026', mins: 6 },
];

export const process = [
  { title: 'Discover', text: 'We learn your users, constraints and goals. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Architect', text: 'We design the system and plan the roadmap. Sed do eiusmod tempor incididunt ut labore.' },
  { title: 'Build', text: 'Short sprints with working demos every two weeks. Ut enim ad minim veniam, quis nostrud.' },
  { title: 'Ship', text: 'Tested, documented and launched to real users. Duis aute irure dolor in reprehenderit.' },
  { title: 'Operate & evolve', text: 'We monitor, support and keep improving. Excepteur sint occaecat cupidatat non proident.' },
];

export const clients = ['Lorem Bank', 'Ipsum Health', 'Dolor Events', 'Sit Amet Co.', 'Consectetur', 'Adipiscing Group', 'Elit Logistics', 'Tempor Foods'];

export const roles = [
  { title: 'Senior Full-Stack Engineer', type: 'Full-time', place: 'Kingston / Hybrid' },
  { title: 'Mobile Developer (React Native)', type: 'Full-time', place: 'Remote, Jamaica' },
  { title: 'Product Designer', type: 'Full-time', place: 'Kingston / Hybrid' },
  { title: 'Business Analyst Intern', type: 'Internship', place: 'Kingston' },
];
