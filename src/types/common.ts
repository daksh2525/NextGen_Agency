// Common TypeScript types shared across the project

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}
