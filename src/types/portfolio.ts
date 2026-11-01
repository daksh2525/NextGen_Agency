export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  serviceSlug: string;
  thumbnail: string;
  description: string;
  featured: boolean;
  comingSoon?: boolean;
}

export interface CaseStudy extends Project {
  challenge: string;
  solution: string;
  technologies: string[];
  features: string[];
  results?: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}
