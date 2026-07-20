"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Search, BarChart2, Brain, Shield, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Smart Market Analysis",
    description:
      "We use a powerful combination of AI tools, advanced trading software, and expert research to identify high-probability opportunities in the market. No guesswork. Only data-driven insights.",
  },
  {
    icon: BarChart2,
    num: "02",
    title: "Structured Trade Setups",
    description:
      "Every trade is shared with Clear Entry & Exit Levels, Defined Stop Loss, and Proper Risk-Reward Ratio. So you always know what to do and why.",
  },
  {
    icon: Brain,
    num: "03",
    title: "Learn While You Trade",
    description:
      "We don't just tell you trades — we explain the logic behind them. Market Structure, Price Action, Options Strategies. Helping you grow from follower to confident trader.",
  },
  {
    icon: Shield,
    num: "04",
    title: "Risk Management First",
    description:
      "We focus more on protecting your capital than chasing profits. Controlled risk per trade, disciplined execution, no overtrading. Because survival equals long-term success.",
  },
  {
    icon: TrendingUp,
    num: "05",
    title: "Consistency Over Hype",
    description:
      "We don't promise unrealistic returns. We focus on consistent growth, realistic expectations, and sustainable trading. Not about quick money — it's about building a skill that pays you for life.",
  },
];

export function AboutSection() {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-1" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content Column */}
          <FadeIn className="lg:w-1/2 space-y-10" direction="right">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <div aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary" />
                Your Trusted Partner
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                Your Trusted Partner in the <br />
                <span className="text-primary dark:text-blue-400">Stock Market Journey</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Every trader starts with confusion, fear, and uncertainty. We are here to change that.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                With a strong foundation of research, discipline, and real market experience, Ashwini SD Research
                empowers you to move from doubt to confidence. Whether you&apos;re taking your first step or scaling
                your trading journey, we guide you with clarity, structure, and purpose.
              </p>
            </div>

            <button
              onClick={() => setShowSteps(!showSteps)}
              type="button"
              aria-expanded={showSteps}
              aria-controls="about-steps-panel"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-primary/20"
            >
              See how we help traders succeed
              <ChevronDown
                aria-hidden="true"
                className={`w-5 h-5 transition-transform duration-300 ${showSteps ? "rotate-180" : ""}`}
              />
            </button>

            {/* Expandable Steps */}
            <AnimatePresence initial={false}>
              {showSteps && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  id="about-steps-panel"
                  className="overflow-hidden"
                >
                  <div className="space-y-6 pt-2">
                    <h3 className="text-2xl font-black text-foreground">
                      How We Help Traders Succeed
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Success in the stock market is not luck — it&apos;s the result of the right system, guidance, and discipline. At Ashwini SD Research, we don&apos;t just give calls — we build confident, independent traders.
                    </p>
                    <div className="space-y-5">
                      {steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 hover:border-primary/20 transition-all"
                        >
                          <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <step.icon aria-hidden="true" className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                              Step {step.num}
                            </p>
                            <h4 className="font-black text-foreground mb-1">{step.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>

          {/* Image & Stats Column */}
          <FadeIn className="lg:w-1/2" direction="left" delay={0.3}>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group aspect-square lg:aspect-auto lg:h-[600px] ring-1 ring-gray-200/50 dark:ring-white/10">
              <Image
                src="/images/trading_office_team.png"
                alt=""
                  aria-hidden="true"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-x-6 bottom-6 lg:inset-x-10 lg:bottom-10 p-8 lg:p-10 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-4xl border border-white/20 shadow-2xl group-hover:bg-white/20 dark:group-hover:bg-black/30 transition-all duration-500">
                <div className="grid grid-cols-2 gap-8 divide-x divide-white/20">
                  <div className="text-white">
                    <div className="text-5xl lg:text-6xl font-black mb-2 tracking-tighter">15+</div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-80 leading-snug">
                      Combined Years of <br /> Market Experience
                    </div>
                  </div>
                  <div className="text-white pl-8">
                    <div className="text-5xl lg:text-6xl font-black mb-2 tracking-tighter">10k+</div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-80 leading-snug">
                      Satisfied Traders <br /> Empowered Nationwide
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
