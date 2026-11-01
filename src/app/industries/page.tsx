import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { industries } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'We build software for fintech, healthtech, edtech, e-commerce, SaaS, enterprise, and more.',
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal section-padding pt-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="Industries"
            heading="Deep Expertise Across Sectors"
            description="We bring sector-specific knowledge to every engagement — so we speak your language from day one."
            theme="dark"
            align="center"
            animated={false}
          />
        </div>
      </section>

      {/* Industries grid */}
      <section className="bg-charcoal pb-24">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((industry) => (
              <div
                key={industry.slug}
                className="group rounded-2xl bg-surface-grey border border-border-dark p-7 hover:border-orange/40 transition-all duration-300"
              >
                <h2 className="font-heading font-bold text-warm-white text-lg mb-3 group-hover:text-orange transition-colors">
                  {industry.name}
                </h2>
                <p className="text-muted-grey text-sm leading-relaxed mb-5">
                  {industry.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-orange text-sm font-medium hover:gap-3 transition-all duration-200"
                  aria-label={`Discuss a ${industry.name} project`}
                >
                  Discuss a Project <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
