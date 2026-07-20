"use client";

import { Search, BarChart2, Shield, Zap, Activity } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

const steps = [
  {
    icon: Search,
    title: "Market Screening",
    description: "We scan 2000+ stocks and derivatives using proprietary screeners to highlight high-probability setups.",
  },
  {
    icon: BarChart2,
    title: "Deep-Dive Analysis",
    description: "Our proprietary algorithms identify institutional buying and selling zones to validate the price trend.",
  },
  {
    icon: Shield,
    title: "Risk Calibration",
    description: "Every trade is mathematically planned with precise Stop-Loss levels and 1:2+ risk-reward ratios.",
  },
  {
    icon: Zap,
    title: "Real-time Execution",
    description: "Actionable alerts are delivered instantly via our dedicated Telegram channel for perfectly timed entries.",
  },
  {
    icon: Activity,
    title: "Active Monitoring",
    description: "We provide continuous management for open positions and regular audits to maximize your profitability.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-primary/20">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary" />
            Our Research Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-8">
            How We Help You <span className="text-primary italic">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            From scanning to execution, we follow a disciplined methodology to ensure 
            institutional-grade research for every trader.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-start overflow-visible">
          {/* Vertical Timeline UI */}
          <div className="space-y-0 relative">
            {/* Visual Connecting Line - Exactly centered behind the icons */}
            <div className="absolute left-[32px] lg:left-[40px] top-6 bottom-6 w-1 bg-linear-to-b from-primary/40 via-primary/10 to-transparent rounded-full" />

            {steps.map((step, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="group relative flex items-start gap-10 pb-16 transition-all duration-300">
                  {/* Step Number & Icon Container */}
                  <div className="relative shrink-0 pt-4">
                    {/* Step Label - Centered above the box */}
                    <div className="absolute -top-1 left-0 right-0 text-center text-[10px] font-black tracking-widest uppercase text-primary/80 transition-colors group-hover:text-primary">
                      Step {index + 1}
                    </div>
                    
                    {/* Icon Box */}
                    <div className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white dark:bg-gray-950 border-2 border-gray-100 dark:border-white/5 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-105 group-hover:-translate-y-1 shadow-2xl-strong">
                      {/* Floating Glow on Hover */}
                      <div className="absolute inset-0 bg-primary/20 blur-[20px] opacity-0 group-hover:opacity-100 transition-all rounded-full scale-50 group-hover:scale-125" />
                      <step.icon aria-hidden="true" className="w-8 h-8 lg:w-10 lg:h-10 relative z-10" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="pt-6">
                    <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-[1.8] max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Process Illustration Column */}
          <FadeIn className="lg:sticky lg:top-32" direction="left" delay={0.4}>
            <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl-strong border border-gray-100 dark:border-white/10 aspect-square">
              <Image
                src="/images/bull-market.png"
                alt="Disciplined Execution"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 z-20" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end z-30">
                <div className="space-y-4">
                  <div aria-hidden="true" className="w-16 h-1 w-primary bg-primary rounded-full shadow-lg shadow-primary/40" />
                  <p className="text-3xl lg:text-4xl font-black text-white leading-[1.1]">
                    &quot;Discipline is the bridge <br/>
                    <span className="text-blue-400 italic">between goals and success.&quot;</span>
                  </p>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                    Rigorous Market Analysis
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
