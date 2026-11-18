'use client';

import dynamic from 'next/dynamic';

/**
 * WorkflowFeaturesSection — Interactive bento features block powered by InkOrbitFeatures.
 * Showcases Real-Time Collaboration, Auto-generated Reports, Integrations Hub, and
 * Predictive Insights with live animated SVG diagrams.
 *
 * Rendered client-side only (dynamic import, SSR disabled) to avoid SVG animation
 * hydration mismatches and IntersectionObserver unavailability on the server.
 */
const InkOrbitFeatures = dynamic(
  () => import('@/components/ui/ink-orbit-features'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[520px] flex items-center justify-center bg-[#0b0b0b]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-orange border-t-transparent animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            Loading workflow diagrams…
          </span>
        </div>
      </div>
    ),
  }
);

export function WorkflowFeaturesSection() {
  return (
    <section
      id="workflow-features"
      aria-label="Smart Workflow Automation Features"
      className="scroll-mt-24"
    >
      <InkOrbitFeatures
        theme="dark"
        brand="NextGen AI"
        tag="WORKFLOW AUTOMATION"
        title="Smart *Workflow*\nAutomation"
        collaboration={{
          title: 'Real-Time Team Collaboration',
          description:
            'Your entire team works in sync — edits, reviews, and deployments flow through one unified AI pipeline with zero context-switching.',
        }}
        reports={{
          title: 'Auto-Generated Deliverables',
          description:
            'From specs to production-ready code and documentation — structured outputs generated automatically, every sprint.',
        }}
        integrations={{
          title: 'Integrations Hub',
          description:
            'Connect Slack, Notion, GitHub, Linear, and your entire stack into one orchestrated AI workflow.',
          tools: ['GitHub', 'Notion', 'Linear', 'Slack'],
        }}
        insights={{
          title: 'Predictive Project Insights',
          description:
            'AI monitors velocity, risk signals, and delivery timelines — surfacing real-time forecasts before bottlenecks form.',
          values: [18, 23, 21, 28, 27, 33, 31, 38, 42, 48, 54, 61],
          forecastFrom: 8,
        }}
      />
    </section>
  );
}

export default WorkflowFeaturesSection;
