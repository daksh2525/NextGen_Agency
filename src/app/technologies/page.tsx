import type { Metadata } from 'next';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { technologyCategories } from '@/data/technologies';

export const metadata: Metadata = {
  title: 'Technologies — Our Tech Stack',
  description:
    'The modern, battle-tested technologies we use to build web applications, SaaS products, and AI-powered solutions.',
};

export default function TechnologiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal section-padding pt-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="Tech Stack"
            heading="Built with the Right Tools"
            description="We choose technologies based on the specific requirements of each project — not just what's trending. Every tool in our stack is proven, well-supported, and developer-friendly."
            theme="dark"
            align="center"
            animated={false}
          />
        </div>
      </section>

      {/* Technology categories */}
      <section className="bg-charcoal pb-24">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologyCategories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl bg-surface-grey border border-border-dark p-7"
              >
                <h2 className="font-heading font-bold text-warm-white text-lg mb-5 pb-4 border-b border-border-dark">
                  {category.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-xl bg-charcoal border border-border-dark px-4 py-2 text-sm text-muted-grey hover:text-orange hover:border-orange/40 transition-colors duration-200"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
