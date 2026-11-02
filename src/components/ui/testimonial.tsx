"use client";

import React, { useRef } from "react";
import Image from "next/image";
import type { Variants } from "framer-motion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";

export interface ClientFeedbackProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ClientFeedback({
  eyebrow,
  title = "Trusted by Startups and the world's largest companies",
  description = "Let's hear how NextGen Agency clients feel about our service",
  className,
}: ClientFeedbackProps) {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <section
      id="testimonials"
      className={cn("w-full bg-white text-black py-16 sm:py-20 relative overflow-hidden", className)}
      ref={testimonialRef}
      aria-label="Client testimonials"
    >
      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="max-w-screen-md mx-auto text-center space-y-3 mb-10">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 px-3.5 py-1 text-xs font-semibold text-orange mb-1">
              {eyebrow}
            </div>
          )}
          <TimelineContent
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-charcoal tracking-tight"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            {title}
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-text-muted-dark text-sm sm:text-base max-w-xl"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            {description}
          </TimelineContent>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-3.5 h-full">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-[7] flex flex-col justify-between relative bg-orange text-white overflow-hidden rounded-2xl border border-orange/30 p-6 sm:p-7 shadow-sm group"
            >
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
                aria-hidden="true"
              />
              <article className="mt-auto relative z-10 flex flex-col justify-between h-full">
                <p className="text-sm sm:text-[15px] leading-relaxed text-white/95">
                  &ldquo;NextGen Agency has been a game-changer for us. Their engineering
                  rigour is top-notch and their team is incredibly responsive.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-6 mt-4 border-t border-white/20">
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                      Guillermo Rauch
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">CEO of Enigma</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/68/68c583189c0e1ce21e113c290c7052e2293db7036c14e54a632fb15290d9b8c4.jpg"
                    alt="Guillermo Rauch"
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-xl object-cover border border-white/30 shadow-sm"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-[3] flex flex-col justify-between relative bg-surface-grey text-white overflow-hidden rounded-2xl border border-border-dark p-6 sm:p-7 shadow-sm"
            >
              <article className="mt-auto relative z-10 flex flex-col justify-between h-full">
                <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-200">
                  &ldquo;We&apos;ve seen incredible results with NextGen Agency. Their technical
                  depth and AI expertise exceeded all expectations.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-6 mt-4 border-t border-white/10">
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                      Rika Shinoda
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">CEO of Kintsugi</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/86/86a1c9c1309ca1d9fc99d59452c9c4a0f50ba192ddb264a3a0c76c4e78d7a405.jpg"
                    alt="Rika Shinoda"
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-sm"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3.5 h-full">
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-charcoal text-white overflow-hidden rounded-2xl border border-border-dark p-6 shadow-sm"
            >
              <article className="mt-auto">
                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;Their team is highly professional, and their modern full-stack
                  solutions have truly transformed the way our platform operates.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-5 mt-3 border-t border-border-dark">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Reacher
                    </h3>
                    <p className="text-zinc-400 text-xs">CEO of OdeaoLabs</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/d7/d7ef0bb3c8517d3cb8bd73c054a87fcfbe86f836cff141a280a6431faa73847a.jpg"
                    alt="Reacher"
                    width={80}
                    height={80}
                    className="w-11 h-11 rounded-xl object-cover border border-white/10"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-charcoal text-white overflow-hidden rounded-2xl border border-border-dark p-6 shadow-sm"
            >
              <article className="mt-auto">
                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;We&apos;re extremely satisfied with NextGen Agency. Their engineering speed
                  and dedication delivered our complete SaaS in weeks.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-5 mt-3 border-t border-border-dark">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      John
                    </h3>
                    <p className="text-zinc-400 text-xs">CEO of Labsbo</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/aa/aaff9c71c06802290840b09e412d9d7a92159d3182cb1fb0e88c216711d27e47.jpg"
                    alt="John"
                    width={80}
                    height={80}
                    className="w-11 h-11 rounded-xl object-cover border border-white/10"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-charcoal text-white overflow-hidden rounded-2xl border border-border-dark p-6 shadow-sm"
            >
              <article className="mt-auto">
                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;Direct Slack communication with principal engineers made collaboration
                  frictionless. They are always available and deeply invested.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-5 mt-3 border-t border-border-dark">
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Steven Sunny
                    </h3>
                    <p className="text-zinc-400 text-xs">CEO of Boxefi</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/34/34e73337944b73c8b25343cb5ff45ac43bb85358b64dc8d54f88769191d55253.jpg"
                    alt="Steven Sunny"
                    width={80}
                    height={80}
                    className="w-11 h-11 rounded-xl object-cover border border-white/10"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3.5 h-full">
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-[3] flex flex-col justify-between relative bg-surface-grey text-white overflow-hidden rounded-2xl border border-border-dark p-6 sm:p-7 shadow-sm"
            >
              <article className="mt-auto relative z-10 flex flex-col justify-between h-full">
                <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-200">
                  &ldquo;NextGen Agency has been a core technology partner in our growth
                  journey from pre-seed to scale.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-6 mt-4 border-t border-white/10">
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                      Alexandre P.
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">Founder of NovaScale</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/5f/5fd63161d12eb2ed836aba11edd36efd6824e27b6a96151c1ee998a037b50f6d.jpg"
                    alt="Alexandre"
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-sm"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-[7] flex flex-col justify-between relative bg-orange text-white overflow-hidden rounded-2xl border border-orange/30 p-6 sm:p-7 shadow-sm group"
            >
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
                aria-hidden="true"
              />
              <article className="mt-auto relative z-10 flex flex-col justify-between h-full">
                <p className="text-sm sm:text-[15px] leading-relaxed text-white/95">
                  &ldquo;NextGen Agency delivered a production-ready AI pipeline that
                  processed over 1M records with sub-second latency. Exceptional commitment.&rdquo;
                </p>
                <div className="flex justify-between items-center pt-6 mt-4 border-t border-white/20">
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                      Paul Brauch
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">CTO of Spectrum</p>
                  </div>
                  <Image
                    src="https://cdn.21st.dev/assets/mirror/03/037ea54a1e1b16d4cb42b0ef3d87b27d6b39d3ced535afa3f97ef861753b6ea8.jpg"
                    alt="Paul Brauch"
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-xl object-cover border border-white/30 shadow-sm"
                    unoptimized
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientFeedback;
