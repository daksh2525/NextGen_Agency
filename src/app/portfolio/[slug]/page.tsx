import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug, portfolio } from '@/data/portfolio';

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

// When portfolio is empty, allow dynamic rendering at runtime.
// Remove this line and add generateStaticParams once real projects are added.

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.name} — NextGen Agency Portfolio`,
    description: project.tagline,
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <section className="bg-charcoal section-padding pt-36">
      <div className="container-site">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-muted-grey text-sm hover:text-orange transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          All Work
        </Link>

        <h1 className="font-heading font-bold text-warm-white text-[clamp(2rem,5vw,3rem)] leading-tight mb-4">
          {project.name}
        </h1>
        <p className="text-muted-grey text-lg mb-3">{project.category}</p>
        <p className="text-muted-grey text-lg leading-relaxed max-w-2xl">{project.tagline}</p>
      </div>
    </section>
  );
}
