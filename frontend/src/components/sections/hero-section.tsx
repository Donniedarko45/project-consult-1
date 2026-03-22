"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import { TradingGraph } from "@/components/features/trading-graph";
import { useState } from "react";

export function HeroSection() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <section className="relative py-12 lg:py-32 overflow-hidden bg-background min-h-[600px] lg:min-h-[800px] flex items-center transition-all duration-1000">
      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`grid gap-12 lg:gap-20 items-center transition-all duration-1000 ease-in-out ${
            animationComplete
              ? "lg:grid-cols-1 text-center"
              : "lg:grid-cols-2 text-left"
          }`}
        >
          {/* Main Content Column */}
          <div
            className={`transition-all duration-1000 ${
              animationComplete ? "mx-auto max-w-4xl" : ""
            }`}
          >
            <FadeIn>
              <div
                className={`inline-block mb-6 px-3 py-1 border border-primary dark:border-blue-400 text-primary dark:text-blue-400 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/5 dark:bg-blue-900/10 transition-all duration-1000 ${
                  animationComplete ? "px-6 py-2 text-sm" : ""
                }`}
              >
                SEBI Registered Research Analyst
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight">
                Master the Markets with{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-blue-200">
                  Confidence
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                className={`text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed transition-all duration-1000 ${
                  animationComplete ? "mx-auto max-w-2xl" : "max-w-xl"
                }`}
              >
                Objective, data-driven, and risk-managed research for{" "}
                <span className="font-bold text-foreground">Stock Market</span>,
                F&O, and Equity traders. We filter the noise so you can focus on
                execution.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div
                className={`flex flex-col sm:flex-row items-center gap-4 pt-4 transition-all duration-1000 ${
                  animationComplete ? "justify-center" : "justify-start"
                }`}
              >
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-secondary font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/20 text-lg"
                  suppressHydrationWarning
                >
                  View Services <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="https://t.me/tradewithashwinisd6"
                  target="_blank"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400 hover:bg-primary/5 dark:hover:bg-blue-900/10 transition-all font-bold text-lg flex items-center justify-center gap-2"
                  suppressHydrationWarning
                >
                  <Send className="w-5 h-5" /> Join Free Telegram
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Animation Column (Disappears after completion) */}
          <div
            className={`relative transition-all duration-1000 ease-in-out transform ${
              animationComplete
                ? "opacity-0 scale-90 h-0 w-0 overflow-hidden"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-primary/20 rounded-full blur-[60px] lg:blur-[100px] -z-10 animate-pulse" />
            <FadeIn delay={0.4} direction="left">
              <TradingGraph onComplete={() => setAnimationComplete(true)} />
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
    </section>
  );
}
