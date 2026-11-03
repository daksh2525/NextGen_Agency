import type { NavItem } from '@/types/common';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Why Us', href: '/#why-nextgen' },
  { label: 'Process', href: '/#process' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Tech Stack', href: '/#tech-stack' },
  { label: 'Industries', href: '/#industries' },
  { label: 'About', href: '/#team' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export const footerLinks = {
  services: [
    { label: 'Custom Web Development', href: '/#services' },
    { label: 'Full-Stack Development', href: '/#services' },
    { label: 'SaaS Development', href: '/#services' },
    { label: 'AI & ML Solutions', href: '/#services' },
    { label: 'Autonomous AI Agents', href: '/#services' },
    { label: 'Mobile App Development', href: '/#services' },
  ],
  company: [
    { label: 'Why NextGen', href: '/#why-nextgen' },
    { label: 'Our Process', href: '/#process' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Tech Stack', href: '/#tech-stack' },
    { label: 'Industries', href: '/#industries' },
    { label: 'The Founders', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};
