'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { FAQAccordion } from '@/components/molecules/FAQAccordion';
import { Button } from '@/components/atoms/Button/Button';
import { faqs } from '@/data/faqs';
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/animations';

/**
 * FAQ Section — dark background, accordion with all FAQs, CTA to contact.
 */
export function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-charcoal section-padding scroll-mt-24"
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
          <Button href="#contact" variant="outline">
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
