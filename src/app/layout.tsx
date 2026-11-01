import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';

// ─── Fonts ───────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['700', '800'],
});

// ─── Root Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://nextgenagency.dev'),
  title: {
    default: 'NextGen Agency — Modern Software & AI Development',
    template: '%s | NextGen Agency',
  },
  description:
    'Premium web applications, SaaS platforms, and AI-powered solutions for startups and enterprises in the USA, UK, Canada, Australia and India.',
  keywords: [
    'software development agency',
    'web development',
    'SaaS development',
    'AI development',
    'mobile app development',
    'React Next.js agency',
    'full stack development',
    'India software agency',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'NextGen Agency',
    title: 'NextGen Agency — Modern Software & AI Development',
    description:
      'Premium web applications, SaaS platforms, and AI-powered solutions for startups and enterprises worldwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextGen Agency — Modern Software & AI Development',
    description:
      'Premium web applications, SaaS platforms, and AI-powered solutions for startups and enterprises worldwide.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-charcoal text-warm-white font-body antialiased">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
