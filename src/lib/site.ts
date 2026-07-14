export const siteConfig = {
  name: 'EverAfter',
  tagline: 'Every Child Deserves to Be the Hero of Their Own Story',
  description:
    'Create beautiful personalized books where your child becomes the main character in unforgettable adventures.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://everafter.com',
  links: {
    twitter: 'https://twitter.com/everafter',
  },
} as const

export const mainNav = [
  { label: 'Browse', href: '/browse' },
  { label: 'Create a Book', href: '/creator' },
  { label: 'Marketplace', href: '/browse' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Become a Creator', href: '/creator' },
] as const

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  creators: [
    { label: 'Creators', href: '/creator' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
} as const

export const dashboardNav = [
  { label: 'Continue Reading', href: '/dashboard' },
  { label: 'My Library', href: '/library' },
  { label: 'Orders', href: '/dashboard/orders' },
  { label: 'Children', href: '/dashboard/children' },
  { label: 'Favorites', href: '/dashboard/favorites' },
  { label: 'Settings', href: '/dashboard/settings' },
] as const

export const marketplaceFilters = [
  'Age',
  'Theme',
  'Life Lesson',
  'Holiday',
  'Faith',
  'Adventure',
  'Fantasy',
  'Animals',
  'Reading Level',
  'Price',
] as const
