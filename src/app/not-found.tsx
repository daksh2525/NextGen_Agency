import type { Metadata } from 'next';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';

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
        <Button
          href="/"
          leftIcon={<Home className="h-4 w-4" aria-hidden="true" />}
        >
          Go Home
        </Button>
        <Button
          href="/contact"
          variant="secondary"
          leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}
