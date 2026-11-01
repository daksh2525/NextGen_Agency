import { z } from "zod";

// =============================================================================
// Contact Form Validation Schema
// =============================================================================

const SERVICE_VALUES = [
  "web-development",
  "full-stack-development",
  "saas-development",
  "ai-ml-solutions",
  "rag-applications",
  "ai-agents",
  "mobile-development",
  "ecommerce-development",
  "backend-api-development",
  "ui-ux-design",
  "maintenance-support",
  "other",
] as const;

const BUDGET_VALUES = [
  "under-5k",
  "5k-15k",
  "15k-50k",
  "50k-plus",
  "not-sure",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(254, "Email address is too long"),

  phone: z
    .string()
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .max(100, "Company name is too long")
    .optional()
    .or(z.literal("")),

  service: z.enum(SERVICE_VALUES, {
    error: 'Please select a valid service',
  }),

  budget: z.enum(BUDGET_VALUES).optional(),

  message: z
    .string()
    .min(20, "Please write at least 20 characters about your project")
    .max(2000, "Message must be less than 2000 characters"),

  consent: z.literal(true, {
    error: 'You must agree to the privacy policy to continue',
  }),

  /** Honeypot — must be empty to pass validation */
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const SERVICE_LABELS: Record<(typeof SERVICE_VALUES)[number], string> = {
  "web-development": "Custom Web Development",
  "full-stack-development": "Full-Stack Development",
  "saas-development": "SaaS Application Development",
  "ai-ml-solutions": "AI & Machine Learning Solutions",
  "rag-applications": "RAG-Based Applications",
  "ai-agents": "AI Agent Development",
  "mobile-development": "Mobile Application Development",
  "ecommerce-development": "E-commerce Development",
  "backend-api-development": "Backend & API Development",
  "ui-ux-design": "UI/UX Design",
  "maintenance-support": "Website Maintenance & Support",
  other: "Other / Not sure yet",
};

export const BUDGET_LABELS: Record<(typeof BUDGET_VALUES)[number], string> = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 – $15,000",
  "15k-50k": "$15,000 – $50,000",
  "50k-plus": "$50,000+",
  "not-sure": "Not sure yet",
};
