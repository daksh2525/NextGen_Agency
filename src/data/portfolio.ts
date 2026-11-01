import type { Project } from '@/types/portfolio';

// Portfolio projects — empty array at launch.
// Do NOT invent projects or fabricate metrics.
// Add real projects when provided by the client.
// Each project must have a real thumbnail, real description, and accurate details.

export const portfolio: Project[] = [];

// Example structure for when real projects are added:
// {
//   slug: 'project-name',
//   name: 'Project Name',
//   tagline: 'One-line project description',
//   category: 'SaaS Development',
//   serviceSlug: 'saas-development',
//   thumbnail: '/images/portfolio/project-name.webp',
//   description: 'What the project does and what was built.',
//   featured: true,
// }

export const getFeaturedProjects = (): Project[] =>
  portfolio.filter((p) => p.featured).slice(0, 4);

export const getProjectBySlug = (slug: string): Project | undefined =>
  portfolio.find((p) => p.slug === slug);
