export interface TechCategory {
  name: string;
  technologies: Tech[];
}

export interface Tech {
  name: string;
  icon?: string; // Path to SVG in /public/images/technologies/
}

export const technologyCategories: TechCategory[] = [
  {
    name: 'Frontend',
    technologies: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
      { name: 'Figma' },
    ],
  },
  {
    name: 'Backend',
    technologies: [
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'GraphQL' },
      { name: 'REST APIs' },
    ],
  },
  {
    name: 'Mobile',
    technologies: [
      { name: 'React Native' },
      { name: 'Expo' },
    ],
  },
  {
    name: 'AI / ML',
    technologies: [
      { name: 'OpenAI' },
      { name: 'Anthropic' },
      { name: 'LangChain' },
      { name: 'LlamaIndex' },
      { name: 'Pinecone' },
      { name: 'Python' },
    ],
  },
  {
    name: 'Databases',
    technologies: [
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'Supabase' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    technologies: [
      { name: 'AWS' },
      { name: 'Vercel' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
    ],
  },
];
