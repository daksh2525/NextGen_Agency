import type { Metadata } from 'next';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ServicesGrid } from '@/components/organisms/ServicesGrid';
import { WhyChooseUs } from '@/components/organisms/WhyChooseUs';
import { ProcessSection } from '@/components/organisms/ProcessSection';
import { PortfolioSection } from '@/components/organisms/PortfolioSection';
import { TechnologiesSection } from '@/components/organisms/TechnologiesSection';
import { IndustriesSection } from '@/components/organisms/IndustriesSection';
import { TeamSection } from '@/components/organisms/TeamSection';
import { FAQSection } from '@/components/organisms/FAQSection';
import { ContactSection } from '@/components/organisms/ContactSection';

export const metadata: Metadata = {
  title: 'NextGen Agency — Modern Software & AI Development',
  description:
    'We build premium web applications, SaaS platforms, and AI-powered products for startups and enterprises worldwide. Based in India, serving the USA, UK, Canada, and Australia.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessSection />
      <PortfolioSection />
      <TechnologiesSection />
      <IndustriesSection />
      <TeamSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
