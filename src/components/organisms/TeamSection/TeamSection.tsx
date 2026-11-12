'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { team } from '@/data/team';
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/animations';

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

/**
 * Team section — founder and co-founder cards on dark background.
 */
export function TeamSection() {
  return (
    <section
      id="team"
      className="bg-charcoal section-padding scroll-mt-24"
      aria-labelledby="team-heading"
    >
      <div className="container-site">
        <SectionHeading
          id="team-heading"
          eyebrow="OUR TEAM"
          heading="The Leadership"
          description="Two engineers who built this agency around a simple idea: great software, delivered with integrity."
          align="center"
          theme="dark"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={fadeUp}
              className="rounded-2xl border border-border-dark bg-surface-grey overflow-hidden group hover:border-orange/30 transition-all duration-300"
            >
              {/* Photo area */}
              <div className="h-72 sm:h-80 bg-[#161616] relative overflow-hidden flex items-center justify-center">
                {member.photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={member.photo}
                    alt={`${member.name} — ${member.designation}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-muted-grey">
                    <div className="h-16 w-16 rounded-full bg-border-dark flex items-center justify-center">
                      <User className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-center px-6">
                      Founder photo coming soon
                    </p>
                  </div>
                )}
                {/* Subtle gradient overlay at bottom of photo */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-grey to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                {/* Subtle geometric decoration */}
                <div
                  className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border border-orange/10 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute -top-4 -left-4 h-16 w-16 rounded-full border border-orange/10 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="font-heading font-bold text-xl text-warm-white">{member.name}</h3>
                <p className="text-orange font-medium text-sm mt-1 mb-3">{member.designation}</p>
                <p className="text-muted-grey text-sm leading-relaxed">{member.bio}</p>
                {member.linkedIn && member.linkedIn !== '#' && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-muted-grey hover:text-orange transition-colors duration-200"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
