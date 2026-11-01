export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const industries: Industry[] = [
  {
    slug: 'fintech',
    name: 'Fintech',
    description: 'Secure, compliant financial technology solutions.',
    icon: 'Banknote',
  },
  {
    slug: 'healthtech',
    name: 'Healthtech',
    description: 'Digital health platforms and patient-focused applications.',
    icon: 'Heart',
  },
  {
    slug: 'edtech',
    name: 'Edtech',
    description: 'Learning management systems and education platforms.',
    icon: 'GraduationCap',
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description: 'High-converting online stores and commerce platforms.',
    icon: 'ShoppingBag',
  },
  {
    slug: 'saas',
    name: 'SaaS',
    description: 'Scalable software-as-a-service products.',
    icon: 'Cloud',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    description: 'Digital transformation for large organisations.',
    icon: 'Building2',
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    description: 'Fleet management and supply chain applications.',
    icon: 'Truck',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Property portals and real estate platforms.',
    icon: 'Home',
  },
];
