export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What types of projects do you take on?',
    answer:
      'We work on a wide range of digital projects including custom web applications, SaaS products, AI and ML integrations, RAG-based systems, mobile applications, e-commerce platforms, and backend API development. If you have a project in mind, reach out and we\'ll let you know if it\'s a good fit.',
    category: 'Services',
  },
  {
    id: 'faq-2',
    question: 'How does your development process work?',
    answer:
      'We follow a structured process: Discovery → Planning → Design → Development → Testing → Launch → Ongoing Support. Every project begins with a thorough discovery phase to understand your goals, users, and technical requirements before any code is written.',
    category: 'Process',
  },
  {
    id: 'faq-3',
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on scope and complexity. A focused MVP can take 6–10 weeks. A full-featured SaaS platform typically ranges from 3–6 months. During our discovery phase, we provide a detailed timeline before work begins.',
    category: 'Process',
  },
  {
    id: 'faq-4',
    question: 'How do you handle communication, especially across time zones?',
    answer:
      'We are based in India and work effectively with clients in the USA, UK, Canada, and Australia. We schedule regular video calls at times that work for both parties, provide detailed written updates, and maintain clear documentation throughout the project. Our clients consistently highlight communication as one of our strengths.',
    category: 'Communication',
  },
  {
    id: 'faq-5',
    question: 'Who owns the code and intellectual property?',
    answer:
      'You do. Once the project is completed and final payment is received, all code, assets, and intellectual property are transferred to you. We provide full access to all repositories and never retain rights to the work we build for you.',
    category: 'Legal',
  },
  {
    id: 'faq-6',
    question: 'Do you offer ongoing maintenance and support after launch?',
    answer:
      'Yes. We offer structured maintenance and support retainers that cover dependency updates, security patches, performance monitoring, bug fixes, and feature additions. Ask us about our support plans during your initial consultation.',
    category: 'Support',
  },
  {
    id: 'faq-7',
    question: 'How do you price your services?',
    answer:
      'We offer both project-based fixed pricing and time-and-materials engagements, depending on the nature and scope of work. We are transparent about pricing and provide detailed proposals before any engagement begins. Contact us with your project details to receive a tailored estimate.',
    category: 'Pricing',
  },
  {
    id: 'faq-8',
    question: 'What AI and machine learning services do you offer?',
    answer:
      'We offer a full range of practical AI services: LLM integration, custom model fine-tuning, RAG pipeline development, AI agent development, and AI-powered feature development within existing products. We focus on AI that solves real business problems rather than AI for its own sake.',
    category: 'Services',
  },
];
