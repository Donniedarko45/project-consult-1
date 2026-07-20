"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Send } from "lucide-react";
import { TradingGraph } from "@/components/features/trading-graph";
import { useState } from "react";

export function HeroSection() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section className="relative py-20 lg:py-40 overflow-hidden bg-background min-h-screen flex items-center transition-all duration-1000">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Gradient */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] z-1" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`grid gap-16 lg:gap-24 items-center transition-all duration-1000 ease-in-out ${
            animationComplete
              ? "lg:grid-cols-1 text-center"
              : "lg:grid-cols-2 text-left"
          }`}
        >
          {/* Main Content Column */}
          <div
            className={`transition-all duration-1000 ${
              animationComplete ? "mx-auto max-w-5xl" : ""
            }`}
          >
            <FadeIn delay={0.1}>
              <div
                className={`inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-primary/20 dark:border-blue-400/30 text-primary dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase bg-primary/5 dark:bg-blue-900/20 backdrop-blur-md transition-all duration-1000 ${
                  animationComplete ? "mx-auto scale-110" : ""
                }`}
              >
                <div aria-hidden="true" className="w-2 h-2 rounded-full bg-primary animate-ping" />
                SEBI Registered Research Analyst
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-6xl lg:text-[86px] font-black text-foreground mb-8 leading-[1.05] tracking-tight">
                Transform Your <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 drop-shadow-sm">
                  Trading & Investment Journey
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p
                className={`text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 font-medium leading-relaxed transition-all duration-1000 ${
                  animationComplete ? "mx-auto max-w-3xl" : "max-w-2xl"
                }`}
              >
                Data-Driven Insights | AI-Powered Research | Proven Strategies
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div
                className={`flex flex-col sm:flex-row items-center gap-6 pt-6 transition-all duration-1000 ${
                  animationComplete ? "justify-center" : "justify-start"
                }`}
              >
                <Link
                  href="https://t.me/tradewithashwinisd6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start Your Journey on Telegram (opens in a new tab)"
                  className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-primary text-secondary font-black transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(30,64,175,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(30,64,175,0.4)] text-lg overflow-hidden"
                  suppressHydrationWarning
                >
                  <Send aria-hidden="true" className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span>Start Your Journey</span>
                  <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
                <Link
                  href="#services"
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-primary/20 dark:border-blue-400/30 text-primary dark:text-blue-400 hover:bg-primary/5 dark:hover:bg-blue-900/10 transition-all font-black text-lg flex items-center justify-center gap-3 backdrop-blur-sm group"
                  suppressHydrationWarning
                >
                  <span>View Our Services</span>
                  <ArrowRight aria-hidden="true" className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Animation Column */}
          <div
            className={`relative transition-all duration-1000 ease-in-out transform ${
              animationComplete
                ? "opacity-0 scale-90 h-0 w-0 overflow-hidden"
                : "opacity-100 scale-100 block"
            }`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-primary/20 rounded-full blur-[80px] lg:blur-[120px] -z-10 animate-pulse" />
            <FadeIn delay={0.5}>
              <TradingGraph onComplete={() => setAnimationComplete(true)} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
