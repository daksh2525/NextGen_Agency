'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error('[error boundary]', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-8">
        <AlertTriangle className="w-10 h-10 text-red-400" aria-hidden="true" />
      </div>

      <h1 className="text-warm-white font-heading font-bold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight mb-4">
        Something Went Wrong
      </h1>
      <p className="text-muted-grey text-lg leading-relaxed max-w-md mb-10">
        An unexpected error occurred. Our team has been notified. Please try again or return home.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-orange text-white font-semibold px-8 py-4 text-base hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          <RefreshCcw className="w-5 h-5" aria-hidden="true" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-warm-white/20 text-warm-white font-semibold px-8 py-4 text-base hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
