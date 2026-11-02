'use client';

import React from 'react';
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery';
import { Search, Layout, Palette, Code2, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'Map your goals, users, and technical requirements.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Planning',
    desc: 'Architecture decisions, tech stack, and project roadmap.',
    icon: Layout,
  },
  {
    step: '03',
    title: 'Design',
    desc: 'UI/UX design with prototypes and design system.',
    icon: Palette,
  },
  {
    step: '04',
    title: 'Development',
    desc: 'Iterative builds with regular demos and feedback loops.',
    icon: Code2,
  },
  {
    step: '05',
    title: 'Launch',
    desc: 'Smooth deployment, rigorous testing, and handover.',
    icon: CheckCircle2,
  },
];

export default function DemoRadialScrollGalleryBasic() {
  return (
    <div className="relative bg-charcoal font-sans text-warm-white overflow-hidden rounded-2xl border border-border-dark w-full">
      {/* Header Section */}
      <div className="h-[280px] flex items-center justify-center px-4 pt-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center rounded-full border border-orange/30 bg-orange/15 px-3 py-1 text-xs font-semibold text-orange">
            OUR PROCESS
          </div>
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl text-warm-white">
            How We Build
          </h2>
          <p className="text-muted-grey text-sm max-w-[420px] mx-auto leading-relaxed">
            A structured process that eliminates surprises and keeps you informed at every stage.
          </p>
        </div>
      </div>

      <RadialScrollGallery
        className="!min-h-[600px]"
        baseRadius={380}
        mobileRadius={220}
        scrollDuration={1500}
        visiblePercentage={42}
      >
        {(hoveredIndex) =>
          steps.map((item, index) => {
            const isActive = hoveredIndex === index;
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`
                  w-[180px] h-[260px] sm:w-[220px] sm:h-[300px] 
                  rounded-2xl border p-6 flex flex-col justify-between items-start 
                  transition-all duration-500 shadow-lg select-none
                  ${
                    isActive
                      ? 'bg-orange border-orange text-white scale-100 shadow-[0_0_30px_rgba(240,120,43,0.35)]'
                      : 'bg-surface-grey border-border-dark text-warm-white scale-90 opacity-80 hover:opacity-100'
                  }
                `}
              >
                <div className="w-full flex justify-between items-start">
                  <span
                    className={`font-mono text-xl font-bold ${
                      isActive ? 'text-white/80' : 'text-orange'
                    }`}
                  >
                    {item.step}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange/10 text-orange'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-bold mb-2">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isActive ? 'text-white/90' : 'text-muted-grey'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })
        }
      </RadialScrollGallery>
    </div>
  );
}
