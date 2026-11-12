'use client';

import React from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { ContactForm } from '@/components/organisms/ContactForm/ContactForm';

/**
 * ContactSection — interactive project enquiry section for Single Page Application.
 * Embeds ContactForm with real-time validation, honeypot, and Resend email transmission.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-charcoal py-16 sm:py-20 lg:py-24 relative overflow-hidden scroll-mt-24"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <SectionHeading
          id="contact-heading"
          eyebrow="GET IN TOUCH"
          heading="Start Your Project With Us"
          description="Tell us about your idea. We'll respond within 24 hours with an honest assessment and actionable roadmap."
          align="center"
          theme="dark"
        />

        <div className="mt-12 sm:mt-14 grid lg:grid-cols-3 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Main interactive form */}
          <div className="lg:col-span-2 bg-surface-grey rounded-2xl border border-border-dark p-6 sm:p-8 md:p-10 shadow-card">
            <h3 className="font-heading font-bold text-warm-white text-xl mb-1.5">
              Send us a Message
            </h3>
            <p className="text-muted-grey text-sm mb-7">
              Fields marked with an asterisk (<span className="text-orange">*</span>) are required.
            </p>
            <ContactForm />
          </div>

          {/* Contact Details Sidebar */}
          <aside className="space-y-4 sm:space-y-5">
            <div className="bg-surface-grey rounded-2xl border border-border-dark p-6">
              <div className="flex items-center gap-3 text-orange mb-2.5">
                <Clock className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <h4 className="font-heading font-semibold text-warm-white text-base">
                  Fast 24h Response
                </h4>
              </div>
              <p className="text-muted-grey text-xs sm:text-sm leading-relaxed">
                Every enquiry is directly reviewed by our principal engineers. We&apos;ll schedule a scoping call to align on technical goals.
              </p>
            </div>

            <div className="bg-surface-grey rounded-2xl border border-border-dark p-6">
              <div className="flex items-center gap-3 text-orange mb-2.5">
                <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <h4 className="font-heading font-semibold text-warm-white text-base">
                  Direct Email
                </h4>
              </div>
              <p className="text-muted-grey text-xs sm:text-sm mb-2">Prefer to email our team directly?</p>
              <a
                href="mailto:hello@nextgenagency.dev"
                className="text-orange text-sm font-medium hover:underline break-all"
              >
                hello@nextgenagency.dev
              </a>
            </div>

            <div className="bg-surface-grey rounded-2xl border border-border-dark p-6">
              <div className="flex items-center gap-3 text-orange mb-2.5">
                <MapPin className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <h4 className="font-heading font-semibold text-warm-white text-base">
                  Global Availability
                </h4>
              </div>
              <p className="text-muted-grey text-xs sm:text-sm leading-relaxed">
                Engineering studio based in India — partnering with founders and teams across North America, Europe, and Asia-Pacific.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
