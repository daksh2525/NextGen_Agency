import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { Badge } from '@/components/atoms/Badge';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.name} — NextGen Agency`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      {/* Back link + Hero */}
      <section className="bg-charcoal pt-36 pb-16">
        <div className="container-site">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-muted-grey text-sm hover:text-orange transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            All Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge variant="orange" className="mb-5">
                {service.category}
              </Badge>
              <h1 className="font-heading font-bold text-warm-white text-[clamp(2rem,5vw,3rem)] leading-tight mb-5">
                {service.name}
              </h1>
              <p className="text-muted-grey text-lg leading-relaxed mb-8">
                {service.fullDescription}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-orange text-white font-semibold px-8 py-4 text-base hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              >
                Start This Project
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Deliverables */}
            <div className="bg-surface-grey rounded-2xl border border-border-dark p-7">
              <h2 className="text-warm-white font-semibold mb-5">What&apos;s Included</h2>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-grey">
                    <CheckCircle className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {service.benefits.length > 0 && (
        <section className="bg-warm-white section-padding">
          <div className="container-site">
            <h2 className="font-heading font-bold text-charcoal text-[clamp(1.5rem,3vw,2rem)] mb-10 text-center">
              Why Choose Us for {service.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl border border-border-light p-7 shadow-card"
                >
                  <h3 className="font-semibold text-charcoal mb-2">{benefit.title}</h3>
                  <p className="text-text-muted-dark text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="bg-charcoal section-padding">
        <div className="container-site">
          <h2 className="font-heading font-bold text-warm-white text-[clamp(1.5rem,3vw,2rem)] mb-8 text-center">
            Technologies We Use
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-xl bg-surface-grey border border-border-dark px-4 py-2 text-sm text-muted-grey"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-white section-padding">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-heading font-bold text-charcoal text-[clamp(1.5rem,3vw,2rem)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-text-muted-dark mb-8">
            Tell us about your {service.name.toLowerCase()} requirements and we&apos;ll put together a proposal within 48 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-orange text-white font-semibold px-10 py-4 text-base hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
