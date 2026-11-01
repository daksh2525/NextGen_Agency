'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import {
  contactFormSchema,
  type ContactFormData,
  SERVICE_LABELS,
  BUDGET_LABELS,
} from '@/lib/validations';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';

// ─── Field wrapper ──────────────────────────────────────────────────────────
function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-warm-white/90"
      >
        {label}
        {required && (
          <span className="ml-1 text-orange" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            aria-live="polite"
            className="flex items-center gap-1.5 text-sm text-red-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Shared input classes ────────────────────────────────────────────────────
const inputBase =
  'w-full rounded-xl bg-surface-grey border border-border-dark px-4 py-3 text-[15px] text-warm-white placeholder:text-muted-grey/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent disabled:opacity-50';
const inputError =
  'border-red-500/60 focus:ring-red-500';

/**
 * Contact form with React Hook Form, Zod validation, honeypot, and
 * loading / success / error states. Posts to /api/contact.
 */
export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      budget: undefined,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          (json as { message?: string }).message ?? 'Something went wrong. Please try again.',
        );
      }

      setSubmitStatus('success');
      reset();
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.',
      );
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitStatus === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-center"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" aria-hidden="true" />
        </div>
        <h3 className="text-warm-white font-heading font-bold text-2xl mb-3">
          Message Sent!
        </h3>
        <p className="text-muted-grey text-[15px] leading-relaxed max-w-sm mb-8">
          Thank you for reaching out. We&apos;ll review your message and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-orange font-semibold text-[15px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot — must remain hidden and empty */}
      <input
        {...register('website')}
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ display: 'none' }}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {/* Name */}
        <FormField
          label="Full Name"
          htmlFor="contact-name"
          error={errors.name?.message}
          required
        >
          <input
            {...register('name')}
            id="contact-name"
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            className={cn(inputBase, errors.name && inputError)}
          />
        </FormField>

        {/* Email */}
        <FormField
          label="Email Address"
          htmlFor="contact-email"
          error={errors.email?.message}
          required
        >
          <input
            {...register('email')}
            id="contact-email"
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
            className={cn(inputBase, errors.email && inputError)}
          />
        </FormField>

        {/* Phone */}
        <FormField
          label="Phone Number"
          htmlFor="contact-phone"
          error={errors.phone?.message}
        >
          <input
            {...register('phone')}
            id="contact-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            className={cn(inputBase, errors.phone && inputError)}
          />
        </FormField>

        {/* Company */}
        <FormField
          label="Company / Organisation"
          htmlFor="contact-company"
          error={errors.company?.message}
        >
          <input
            {...register('company')}
            id="contact-company"
            type="text"
            placeholder="Acme Inc."
            autoComplete="organization"
            className={cn(inputBase, errors.company && inputError)}
          />
        </FormField>

        {/* Service */}
        <FormField
          label="Service Required"
          htmlFor="contact-service"
          error={errors.service?.message}
          required
        >
          <select
            {...register('service')}
            id="contact-service"
            className={cn(inputBase, 'cursor-pointer', errors.service && inputError)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a service…
            </option>
            {(
              Object.entries(SERVICE_LABELS) as [
                keyof typeof SERVICE_LABELS,
                string,
              ][]
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>

        {/* Budget */}
        <FormField
          label="Estimated Budget"
          htmlFor="contact-budget"
          error={errors.budget?.message}
        >
          <select
            {...register('budget')}
            id="contact-budget"
            className={cn(inputBase, 'cursor-pointer', errors.budget && inputError)}
            defaultValue=""
          >
            <option value="">Not sure yet</option>
            {(
              Object.entries(BUDGET_LABELS) as [
                keyof typeof BUDGET_LABELS,
                string,
              ][]
            ).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Message */}
      <div className="mt-5">
        <FormField
          label="Project Details"
          htmlFor="contact-message"
          error={errors.message?.message}
          required
        >
          <textarea
            {...register('message')}
            id="contact-message"
            rows={5}
            placeholder="Tell us about your project — what are you building, what problems are you solving, and what's your timeline?"
            className={cn(
              inputBase,
              'resize-none leading-relaxed',
              errors.message && inputError,
            )}
          />
        </FormField>
      </div>

      {/* Consent */}
      <div className="mt-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            {...register('consent')}
            type="checkbox"
            id="contact-consent"
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border-dark bg-surface-grey text-orange focus:ring-orange focus:ring-offset-charcoal"
          />
          <span className="text-sm text-muted-grey leading-relaxed">
            I agree to the{' '}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange underline underline-offset-2 hover:no-underline"
            >
              Privacy Policy
            </a>{' '}
            and consent to being contacted about my enquiry.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-400">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Global error */}
      <AnimatePresence>
        {submitStatus === 'error' && (
          <motion.div
            role="alert"
            aria-live="assertive"
            className="mt-5 flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-red-400">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange text-white font-semibold px-10 py-4 text-base hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25),0_4px_12px_rgba(240,120,43,0.15)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitStatus === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
