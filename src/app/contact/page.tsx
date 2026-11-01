import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { ContactForm } from '@/components/organisms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Start Your Project',
  description:
    'Tell us about your project. We respond to all enquiries within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal section-padding pt-36">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-orange uppercase mb-4">
              Get in Touch
            </p>
            <h1 className="font-heading font-bold text-warm-white text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-6">
              Let&apos;s Build Something{' '}
              <span className="text-gradient">Remarkable</span>
            </h1>
            <p className="text-muted-grey text-lg leading-relaxed">
              Whether you have a detailed brief or just an idea — reach out. We&apos;ll help you define the scope, estimate the effort, and get started.
            </p>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-charcoal pb-24">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form — takes 2 cols */}
            <div className="lg:col-span-2 bg-surface-grey rounded-2xl border border-border-dark p-8 md:p-10">
              <h2 className="font-heading font-bold text-warm-white text-xl mb-2">
                Send us a Message
              </h2>
              <p className="text-muted-grey text-sm mb-8">
                Fields marked <span className="text-orange">*</span> are required.
              </p>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <aside className="space-y-8">
              <div className="bg-surface-grey rounded-2xl border border-border-dark p-6">
                <h3 className="text-warm-white font-semibold mb-4">What to Expect</h3>
                <ul className="space-y-3 text-sm text-muted-grey">
                  {[
                    'We respond to all enquiries within 24 hours.',
                    'We will review your project and schedule a discovery call.',
                    'You will receive a tailored proposal with timeline and pricing.',
                    'No obligation — just an honest conversation.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-surface-grey rounded-2xl border border-border-dark p-6">
                <h3 className="text-warm-white font-semibold mb-2">Prefer Email?</h3>
                <a
                  href="mailto:hello@nextgenagency.dev"
                  className="text-orange text-sm hover:underline break-all"
                >
                  hello@nextgenagency.dev
                </a>
              </div>

              <div className="bg-surface-grey rounded-2xl border border-border-dark p-6">
                <h3 className="text-warm-white font-semibold mb-2">Our Location</h3>
                <p className="text-muted-grey text-sm">India — available to work with clients worldwide.</p>
                <Link
                  href="/about"
                  className="mt-3 inline-flex items-center gap-1.5 text-orange text-sm font-medium hover:gap-2.5 transition-all"
                >
                  About Us <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
