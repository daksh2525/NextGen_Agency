import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { portfolio } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Portfolio — Our Work',
  description:
    'A showcase of the web applications, SaaS products, and AI-powered platforms we have built for clients worldwide.',
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal section-padding pt-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Work"
            heading="Projects We're Proud Of"
            description="Each project represents a real business problem solved with thoughtful engineering."
            theme="dark"
            align="center"
            animated={false}
          />
        </div>
      </section>

      {/* Portfolio grid or empty state */}
      <section className="bg-charcoal pb-24">
        <div className="container-site">
          {portfolio.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-dashed border-border-dark text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-grey flex items-center justify-center mb-6">
                <Layers className="w-8 h-8 text-muted-grey" aria-hidden="true" />
              </div>
              <h2 className="text-warm-white font-semibold text-xl mb-3">Portfolio Coming Soon</h2>
              <p className="text-muted-grey text-[15px] max-w-sm leading-relaxed">
                We are preparing our case studies and project showcases. In the meantime,{' '}
                <Link href="/contact" className="text-orange underline underline-offset-2 hover:no-underline">
                  get in touch
                </Link>{' '}
                to discuss your project.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolio.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group block rounded-2xl bg-surface-grey border border-border-dark overflow-hidden hover:border-orange/40 transition-all duration-300"
                >
                  <div className="aspect-video bg-charcoal-deep" />
                  <div className="p-6">
                    <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-warm-white font-bold text-xl mb-2">{project.name}</h3>
                    <p className="text-muted-grey text-sm">{project.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
