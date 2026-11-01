// Testimonials — empty array at launch.
// Do NOT fabricate testimonials, client names, or company names.
// Add real testimonials with explicit written permission from each client.

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [];
