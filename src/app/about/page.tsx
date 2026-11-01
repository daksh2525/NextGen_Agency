import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { team } from '@/data/team';

// Inline LinkedIn SVG — lucide-react v1.66 removed this icon
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: 'About Us — NextGen Agency',
  description:
    'Learn about NextGen Agency — a modern software development agency combining engineering excellence with practical AI solutions.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal section-padding pt-36">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest text-orange uppercase mb-4">
              About Us
            </p>
            <h1 className="font-heading font-bold text-warm-white text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6">
              Software Engineering Meets{' '}
              <span className="text-gradient">Practical AI</span>
            </h1>
            <p className="text-muted-grey text-lg leading-relaxed">
              NextGen Agency is a premium software development studio building custom web applications, SaaS platforms, and AI-powered products for startups and enterprises worldwide. We are based in India and work with clients across the USA, UK, Canada, and Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-grey section-padding">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest text-orange uppercase mb-4">
                Our Mission
              </p>
              <h2 className="font-heading font-bold text-warm-white text-[clamp(1.5rem,3vw,2rem)] leading-tight mb-5">
                Build Products That Actually Work
              </h2>
              <p className="text-muted-grey text-[15px] leading-relaxed mb-4">
                We believe great software comes from a deep understanding of the business problem, not just the technical specification. Every engagement starts with listening — to your goals, your users, and your constraints.
              </p>
              <p className="text-muted-grey text-[15px] leading-relaxed">
                We do not chase trends. We select the right technology for each problem, write code that can be maintained and scaled, and build honest, long-term relationships with our clients.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Services', value: '11+' },
                { label: 'Industries', value: '8+' },
                { label: 'Countries Served', value: '4+' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-charcoal border border-border-dark p-6 text-center"
                >
                  <p className="font-heading font-bold text-orange text-3xl mb-1">{value}</p>
                  <p className="text-muted-grey text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-warm-white section-padding">
        <div className="container-site">
          <SectionHeading
            eyebrow="The Team"
            heading="Meet the Founders"
            description="The agency was built by engineers who wanted to work differently — with transparency, craftsmanship, and genuine care for each client's success."
            theme="light"
            align="center"
            animated={false}
          />

          <div className="mt-14 grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl bg-white border border-border-light p-8 text-center shadow-card"
              >
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-surface-grey border-2 border-border-dark mx-auto mb-5 flex items-center justify-center text-3xl text-muted-grey font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-heading font-bold text-charcoal text-xl mb-1">
                  {member.name}
                </h3>
                <p className="text-orange text-sm font-semibold mb-3">{member.designation}</p>
                <p className="text-text-muted-dark text-sm leading-relaxed mb-5">{member.bio}</p>
                {member.linkedIn && member.linkedIn !== '#' && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-grey hover:text-orange transition-colors"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal section-padding">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-warm-white text-[clamp(1.5rem,3vw,2.5rem)] mb-4">
            Want to Work Together?
          </h2>
          <p className="text-muted-grey text-lg mb-8 max-w-xl mx-auto">
            We take on a limited number of new projects each quarter to ensure quality. Get in touch early.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-orange text-white font-semibold px-10 py-4 text-base hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
