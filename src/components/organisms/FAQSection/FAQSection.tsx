'use client';

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { FAQAccordion } from '@/components/molecules/FAQAccordion';
import { faqs } from '@/data/faqs';
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/animations';

/**
 * FAQ Section — dark background, accordion with all FAQs, CTA to contact.
 */
export function FAQSection() {
  return (
    <section
      className="bg-charcoal section-padding"
      aria-labelledby="faq-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="FAQ"
          heading="Common Questions"
          description="Everything you need to know before starting your project with us."
          theme="dark"
          align="center"
        />

        <motion.div
          className="mt-14 max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <FAQAccordion faqs={faqs} theme="dark" />
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          className="mt-14 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <p className="text-muted-grey mb-6 text-[15px]">
            Still have questions? We&apos;re happy to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange text-orange hover:bg-orange hover:text-white px-8 py-3 font-semibold text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
