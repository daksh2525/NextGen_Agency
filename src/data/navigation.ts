import type { NavItem } from '@/types/common';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Web Development', href: '/services/web-development', description: 'Custom web applications' },
      { label: 'Full-Stack Development', href: '/services/full-stack-development', description: 'End-to-end engineering' },
      { label: 'SaaS Development', href: '/services/saas-development', description: 'From MVP to production SaaS' },
      { label: 'AI & ML Solutions', href: '/services/ai-ml-solutions', description: 'Practical AI for real problems' },
      { label: 'RAG Applications', href: '/services/rag-applications', description: 'Document-intelligent AI systems' },
      { label: 'AI Agents', href: '/services/ai-agents', description: 'Autonomous AI workflows' },
      { label: 'Mobile Development', href: '/services/mobile-development', description: 'iOS & Android apps' },
      { label: 'E-commerce', href: '/services/ecommerce-development', description: 'High-converting stores' },
      { label: 'Backend & API', href: '/services/backend-api-development', description: 'Scalable server systems' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design', description: 'Design that converts' },
      { label: 'Maintenance & Support', href: '/services/maintenance-support', description: 'Ongoing technical support' },
    ],
  },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Industries', href: '/industries' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
];

export const footerLinks = {
  services: [
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'SaaS Development', href: '/services/saas-development' },
    { label: 'AI & ML Solutions', href: '/services/ai-ml-solutions' },
    { label: 'Mobile Development', href: '/services/mobile-development' },
    { label: 'E-commerce', href: '/services/ecommerce-development' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Technologies', href: '/technologies' },
    { label: 'Industries', href: '/industries' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};
