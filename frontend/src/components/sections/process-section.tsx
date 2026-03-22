"use client";

import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

const steps = [
  {
    title: "Discovery",
    description:
      "We scan the entire market using proprietary screeners to identify high-probability setups.",
  },
  {
    title: "Analysis",
    description:
      "Our analysts perform deep-dive technical and fundamental research to validate the trend.",
  },
  {
    title: "Execution",
    description:
      " precise entry and exit levels are defined with strict risk-reward ratios.",
  },
  {
    title: "Review",
    description:
      "Continuous monitoring of open positions and regular performance audits.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Left Image */}
          <FadeIn className="lg:w-1/2 w-full" direction="right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl skew-y-3 lg:-skew-y-3 transform hover:skew-y-0 transition-transform duration-700 ease-out border-4 border-white dark:border-gray-800 aspect-video lg:aspect-square lg:h-[500px]">
              <Image
                src="/images/bull-market.png"
                alt="Process Visualization"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-8 z-20">
                <p className="text-white text-lg font-bold">
                  "Plan the trade, trade the plan."
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Content */}
          <div className="lg:w-1/2 w-full">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                Our Research Process
              </h2>
            </FadeIn>

            <div className="space-y-8 relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800" />

              {steps.map((step, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="relative flex gap-6">
                    <div className="shrink-0 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary z-10">
                      {index + 1}
                    </div>
                    <div className="space-y-2 pb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
