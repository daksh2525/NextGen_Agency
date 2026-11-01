import type { ProcessStep, Benefit } from './common';

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  deliverables: string[];
  technologies: string[];
  process: ProcessStep[];
  benefits: Benefit[];
  featured: boolean;
  category: string;
}
