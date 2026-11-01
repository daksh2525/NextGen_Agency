'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
  theme?: 'dark' | 'light';
}

/**
 * Accessible FAQ accordion component with smooth height animation.
 * Keyboard navigable — Enter/Space to expand, Escape to close.
 */
export function FAQAccordion({ faqs, theme = 'dark' }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const isDark = theme === 'dark';

  return (
    <div className="space-y-0" role="list" aria-label="Frequently asked questions">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            role="listitem"
            className={cn(
              'border-b',
              isDark ? 'border-border-dark' : 'border-border-light',
              index === 0 && 'border-t',
            )}
          >
            <button
              id={`faq-trigger-${faq.id}`}
              aria-expanded={isOpen}
              aria-controls={`faq-content-${faq.id}`}
              onClick={() => toggle(faq.id)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && isOpen) setOpenId(null);
              }}
              className={cn(
                'w-full flex items-center justify-between gap-4 py-5 text-left',
                'font-medium text-[15px] transition-colors duration-200',
                isDark
                  ? 'text-warm-white hover:text-orange'
                  : 'text-charcoal hover:text-orange',
              )}
            >
              <span>{faq.question}</span>
              <span
                className={cn(
                  'flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200',
                  isDark ? 'bg-surface-grey text-muted-grey' : 'bg-border-light text-muted-grey',
                  isOpen && 'bg-orange text-white',
                )}
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-content-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    className={cn(
                      'pb-5 text-[15px] leading-relaxed',
                      isDark ? 'text-muted-grey' : 'text-text-muted-dark',
                    )}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
