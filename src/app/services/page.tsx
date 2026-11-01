import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Our Services — Web, SaaS & AI Development',
  description:
    'From custom web applications to AI-powered platforms — explore the full range of software development services we offer.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal section-padding pt-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="What We Do"
            heading="Services Built for Modern Businesses"
            description="From idea to production — we cover the full spectrum of modern software development and AI integration."
            theme="dark"
            align="center"
            animated={false}
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-charcoal pb-24">
        <div className="container-site">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl bg-surface-grey border border-border-dark p-7 hover:border-orange/40 hover:bg-surface-grey/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center text-orange text-xl font-bold flex-shrink-0">
                    {service.name.charAt(0)}
                  </div>
                  <ArrowRight
                    className="w-5 h-5 text-muted-grey group-hover:text-orange group-hover:translate-x-1 transition-all duration-200"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="font-heading font-bold text-warm-white text-lg mb-2 leading-snug">
                  {service.name}
                </h2>
                <p className="text-muted-grey text-sm leading-relaxed flex-1">
                  {service.shortDescription}
                </p>
                <div className="mt-5 pt-5 border-t border-border-dark">
                  <p className="text-xs text-muted-grey/60 font-medium tracking-wide uppercase">
                    Key technologies
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-charcoal border border-border-dark rounded-md px-2 py-0.5 text-muted-grey"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="text-xs text-muted-grey/60">
                        +{service.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
