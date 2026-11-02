'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';

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
        <Button
          onClick={reset}
          leftIcon={<RefreshCcw className="h-4 w-4" aria-hidden="true" />}
        >
          Try Again
        </Button>
        <Button
          href="/"
          variant="secondary"
          leftIcon={<Home className="h-4 w-4" aria-hidden="true" />}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
