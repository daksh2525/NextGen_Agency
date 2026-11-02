'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/animations';

/**
 * Contact CTA Section — full-width dark card with orange radial glow.
 * Prompts visitors to start a project or schedule a discovery call.
 */
export function ContactSection() {
  return (
    <section className="bg-warm-white section-padding" aria-labelledby="contact-cta-heading">
      <div className="container-site">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-charcoal border border-border-dark p-12 md:p-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {/* Orange radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange/10 rounded-full blur-[100px]" />
          </div>

          {/* Pill badge */}
          <div className="relative z-10 mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange/15 border border-orange/30 px-4 py-1.5 text-sm font-semibold text-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              Let&apos;s Build Something Great
            </span>
          </div>

          <h2
            id="contact-cta-heading"
            className="relative z-10 font-heading font-bold text-warm-white text-[clamp(1.75rem,4vw,3rem)] leading-tight mb-4"
          >
            Ready to Start Your Project?
          </h2>
          <p className="relative z-10 text-muted-grey text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Tell us about your idea. We&apos;ll respond within 24 hours with a clear plan and honest assessment of how we can help.
          </p>

          {/* CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Start a Project
            </Button>
            <Button
              href="/contact?type=call"
              variant="secondary"
              leftIcon={<Calendar className="h-4 w-4" aria-hidden="true" />}
            >
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
