'use client';

import {
  Search,
  Layout,
  Palette,
  Code2,
  CheckCircle,
  Rocket,
  Wrench,
} from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery',
    description: 'Map your goals, users, and technical requirements.',
  },
  {
    step: '02',
    icon: Layout,
    title: 'Planning',
    description: 'Architecture decisions, tech stack, and project roadmap.',
  },
  {
    step: '03',
    icon: Palette,
    title: 'Design',
    description: 'UI/UX design with prototypes and design system.',
  },
  {
    step: '04',
    icon: Code2,
    title: 'Development',
    description: 'Iterative builds with regular demos and feedback loops.',
  },
  {
    step: '05',
    icon: CheckCircle,
    title: 'Testing',
    description: 'Rigorous QA across devices, browsers, and edge cases.',
  },
  {
    step: '06',
    icon: Rocket,
    title: 'Launch',
    description: 'Smooth production deployment with monitoring setup.',
  },
  {
    step: '07',
    icon: Wrench,
    title: 'Support',
    description: 'Ongoing maintenance, performance, and iteration.',
  },
] as const;

/**
 * Development process section — interactive radial scroll gallery on dark background.
 * Combines GSAP ScrollTrigger physics with NextGen Agency's dark-mode brand styling.
 */
export function ProcessSection() {
  return (
    <section
      id="process-section"
      className="bg-charcoal section-padding relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="container-site mb-6">
        <SectionHeading
          id="process-heading"
          eyebrow="OUR PROCESS"
          heading="How We Build"
          description="A structured process that eliminates surprises and keeps you informed at every stage."
          align="center"
          theme="dark"
        />
      </div>

      <div className="w-full">
        <RadialScrollGallery
          className="!min-h-[640px]"
          baseRadius={460}
          mobileRadius={220}
          scrollDuration={1800}
          visiblePercentage={44}
        >
          {(hoveredIndex) =>
            STEPS.map((item, index) => {
              const isActive = hoveredIndex === index;
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className={`
                    w-[190px] h-[270px] sm:w-[230px] sm:h-[310px] 
                    rounded-2xl border p-6 flex flex-col justify-between items-start 
                    transition-all duration-500 shadow-xl select-none backdrop-blur-md
                    ${
                      isActive
                        ? 'bg-orange border-orange text-white scale-100 shadow-[0_0_36px_rgba(240,120,43,0.4)]'
                        : 'bg-surface-grey/95 border-border-dark text-warm-white scale-90 opacity-80 hover:opacity-100 hover:border-orange/30'
                    }
                  `}
                >
                  <div className="w-full flex justify-between items-start">
                    <span
                      className={`font-mono text-xl font-extrabold tracking-tight ${
                        isActive ? 'text-white/80' : 'text-orange'
                      }`}
                    >
                      {item.step}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-orange/10 text-orange'
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-bold mb-2 text-inherit">
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isActive ? 'text-white/90' : 'text-muted-grey'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })
          }
        </RadialScrollGallery>
      </div>
    </section>
  );
}

export default ProcessSection;
