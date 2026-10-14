// ============================================================
// WORKSHOP MASTER DATA CONFIGURATION
// Organizers: Edit this file to update all workshop information.
// ============================================================

import { DAY1_SCHEDULE, DAY1_DATE } from './day1Schedule';
import { DAY2_SCHEDULE, DAY2_DATE } from './day2Schedule';

export const WORKSHOP = {
  title: 'Venture Launchpad',
  subtitle: 'From Idea Generation to Business Creation',
  event: 'ASTRION 2K26',
  organizer: "Institution's Innovation Council (IIC), VVIT University",
  shortOrganizer: 'IIC, VVIT University',
  duration: 'Two-Day Workshop',
  datesSummary: '2 DAYS · 23–24 OCTOBER 2026 · VVIT UNIVERSITY',
  day1Date: 'Friday, 23 October 2026',
  day2Date: 'Saturday, 24 October 2026',
  venue: 'VVIT University Campus',
  registrationStatus: 'OPEN', // 'OPEN' | 'CLOSED' | 'COMING_SOON'
  mainWebsiteUrl: 'https://astrion2k26-iic.vercel.app/',
};

// Two-day workshop tabs (Day 1: THE IDEA, Day 2: THE VENTURE)
export const WORKSHOP_DAYS = [
  {
    id: 'day-1',
    dayNumber: 1,
    label: 'DAY 01',
    tagline: 'THE IDEA',
    selectorTitle: 'DAY 01 | THE IDEA',
    dateLabel: '23 OCTOBER',
    fullDate: DAY1_DATE.formattedDate,
    theme: DAY1_DATE.theme,
    heading: 'DAY 01 — THE INNOVATION JOURNEY',
    isAvailable: true,
    schedule: DAY1_SCHEDULE,
  },
  {
    id: 'day-2',
    dayNumber: 2,
    label: 'DAY 02',
    tagline: 'THE VENTURE',
    selectorTitle: 'DAY 02 | THE VENTURE',
    dateLabel: '24 OCTOBER',
    fullDate: DAY2_DATE.formattedDate,
    theme: DAY2_DATE.theme,
    heading: 'DAY 02 — FROM IDEAS TO BUSINESS',
    isAvailable: true,
    schedule: DAY2_SCHEDULE,
  },
];

// Confirmed Speakers & Guests across both days
export const SPEAKERS = [
  // Day 1
  {
    id: 'ravi-shankar',
    day: 'Day 1 (23 Oct)',
    name: 'Ravi Shankar sir',
    role: 'Session Speaker',
    session: 'Solar + EV Charging Session (statutory aspects)',
    timing: '11:00 AM – 1:00 PM',
    photo: null,
    accent: '#00e5ff',
    icon: '⚡',
    badge: 'Solar & EV Mobility',
    note: 'Sharing expertise on solar energy systems, EV charging infrastructure, statutory aspects, and his personal journey.',
  },
  {
    id: 'rajesh-kampala',
    day: 'Day 1 (23 Oct)',
    name: 'Rajesh Kampala',
    role: 'Guest Speaker',
    session: 'Guest Talk',
    timing: '2:00 PM – 2:45 PM',
    photo: null,
    accent: '#7c4dff',
    icon: '🎙️',
    badge: 'Guest Keynote',
    note: 'Special 45-minute address following the lunch intermission, sharing industry and innovation perspectives.',
  },
  {
    id: 'rama-maam',
    day: 'Day 1 (23 Oct)',
    name: "Rama ma'am",
    role: 'Entrepreneur & Speaker',
    session: 'Entrepreneurial Journey & Q&A',
    timing: '2:45 PM – 3:45 PM',
    photo: null,
    accent: '#ff007f',
    icon: '✨',
    badge: 'Women Entrepreneurship',
    note: 'Inspiring journey covering tissue manufacturing, scaling an enterprise, women entrepreneurship, and interactive Q&A.',
  },
  {
    id: 'inaugural-dignitaries',
    day: 'Day 1 (23 Oct)',
    name: 'Chief Guest, Faculty & IIC Council',
    role: 'Inaugural Dignitaries',
    session: 'Inaugural Session & Diya Lighting',
    timing: '9:00 AM – 11:00 AM',
    photo: null,
    accent: '#00e676',
    icon: '🏛️',
    badge: 'Leadership & Council',
    note: 'Inaugural ceremony, ceremonial diya lighting, and opening addresses by esteemed leadership and faculty mentors.',
  },
  // Day 2
  {
    id: 'ramana-sir',
    day: 'Day 2 (24 Oct)',
    name: 'Ramana sir',
    role: 'Speaker / Mentor',
    session: 'Business Exposure – VVITU APPA',
    timing: '9:00 AM – 10:00 AM',
    photo: null,
    accent: '#00e5ff',
    icon: '📊',
    badge: 'Business Exposure',
    note: 'Operational insights, institutional business exposure, and foundational entrepreneurial learning.',
  },
  {
    id: 'manikanteswara',
    day: 'Day 2 (24 Oct)',
    name: 'Manikanteswara (SBI Manager)',
    role: 'Financial Evaluator & SBI Manager',
    session: 'Funding & Business Plan Approval',
    timing: '10:00 AM – 12:00 PM',
    photo: null,
    accent: '#00e676',
    icon: '🏦',
    badge: 'Banking & Approval',
    note: 'Exclusive banker perspective on "How I will approve a business plan", funding standards, and financial viability.',
  },
  {
    id: 'yogish-tulasi',
    day: 'Day 2 (24 Oct)',
    name: 'Yogish (M.D., Tulasi Seeds)',
    role: 'Managing Director, Tulasi Seeds',
    session: 'Agricultural Entrepreneurship & Enterprise Growth',
    timing: '1:30 PM – 2:45 PM',
    photo: null,
    accent: '#ffb300',
    icon: '🌱',
    badge: 'Enterprise Growth',
    note: 'From seed to industrial scale: agricultural business operations, enterprise development, and market dynamics.',
  },
  {
    id: 'stalin-neem-tree',
    day: 'Day 2 (24 Oct)',
    name: 'Stalin from Neem Tree Toys',
    role: 'Founder / Creative Entrepreneur',
    session: 'Product Creation & Manufacturing',
    timing: '3:00 PM – 4:00 PM',
    photo: null,
    accent: '#7c4dff',
    icon: '🧸',
    badge: 'Product Creation',
    note: 'Physical product creation, toy manufacturing, design creativity, and entrepreneurial execution.',
  },
];

// Confirmed Workshop Thematic Constellation
export const WORKSHOP_THEMES = [
  {
    id: 'theme-business-exposure',
    title: 'Business Exposure & Real-World Operations',
    shortDesc: 'Foundational enterprise models, operational exposure, and institutional ventures.',
    coreVisual: 'business-exposure',
    symbol: '⊡',
    day: 'Day 2',
  },
  {
    id: 'theme-funding',
    title: 'Funding & Business Plan Approval',
    shortDesc: 'Direct banking insights on business plan evaluation and institutional funding criteria.',
    coreVisual: 'funding',
    symbol: '🏦',
    day: 'Day 2',
  },
  {
    id: 'theme-growth',
    title: 'Enterprise Growth & Scaling',
    shortDesc: 'Agricultural entrepreneurship and enterprise building with Tulasi Seeds leadership.',
    coreVisual: 'growth',
    symbol: '🌱',
    day: 'Day 2',
  },
  {
    id: 'theme-product',
    title: 'Product Creation & Creativity',
    shortDesc: 'Physical manufacturing, craft, and product design with Neem Tree Toys.',
    coreVisual: 'product',
    symbol: '⚙',
    day: 'Day 2',
  },
  {
    id: 'theme-solar',
    title: 'Solar Energy & EV Charging Systems',
    shortDesc: 'Technological systems, power infrastructure, and statutory frameworks.',
    coreVisual: 'solar-ev',
    symbol: '⚡',
    day: 'Day 1',
  },
  {
    id: 'theme-women',
    title: 'Women Entrepreneurship & Manufacturing',
    shortDesc: 'Founder journey, operational tissue production, and leadership resilience.',
    coreVisual: 'manufacturing',
    symbol: '✦',
    day: 'Day 1',
  },
];

// FAQ Data grounded in supplied facts
export const FAQ_DATA = [
  {
    question: 'What are the workshop dates?',
    answer: 'Venture Launchpad is a comprehensive two-day workshop held on Friday, 23 October 2026 (Day 1: The Idea) and Saturday, 24 October 2026 (Day 2: The Venture).',
  },
  {
    question: 'Where is the workshop venue?',
    answer: "The workshop is organized at VVIT University by the Institution's Innovation Council (IIC). Specific hall and room allocations will be announced by the coordinators.",
  },
  {
    question: 'What is covered on Day 1?',
    answer: "Day 1 focuses on Innovation, Technology & Entrepreneurship: Inaugural & Diya lighting, Solar + EV Charging with Ravi Shankar sir, Rajesh Kampala's guest talk, and an Entrepreneurial Journey & Q&A on tissue manufacturing and women entrepreneurship with Rama ma'am.",
  },
  {
    question: 'What is covered on Day 2?',
    answer: 'Day 2 focuses on From Ideas to Business: Business exposure with Ramana sir, SBI Funding and Business Plan Approval with Manikanteswara, enterprise growth with Yogish (M.D., Tulasi Seeds), and creative product creation with Stalin from Neem Tree Toys.',
  },
  {
    question: 'Who organizes Venture Launchpad?',
    answer: "The workshop is spearheaded by the Institution's Innovation Council (IIC), VVIT University in collaboration with ASTRION 2K26.",
  },
  {
    question: 'How do I register?',
    answer: 'Complete the registration form in the portal section below. Slots are limited to maintain high-quality interaction.',
  },
];

// Navigation links
export const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SCHEDULE', href: '#schedule' },
  { label: 'SPEAKERS', href: '#speakers' },
  { label: 'HIGHLIGHTS', href: '#highlights' },
  { label: 'REGISTER', href: '#register' },
];

export { DAY1_SCHEDULE, DAY1_DATE, DAY2_SCHEDULE, DAY2_DATE };
