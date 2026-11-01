import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Error code */}
      <p className="text-[clamp(6rem,20vw,12rem)] font-heading font-bold leading-none text-surface-grey select-none" aria-hidden="true">
        404
      </p>

      <h1 className="mt-2 text-warm-white font-heading font-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight">
        Page Not Found
      </h1>
      <p className="mt-4 text-muted-grey text-lg leading-relaxed max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-orange text-white font-semibold px-8 py-4 text-base hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          Go Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-warm-white/20 text-warm-white font-semibold px-8 py-4 text-base hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Contact Us
        </Link>
      </div>
    </div>
  );
}
