"use client";

import { LineChart, HeartHandshake, ShieldCheck, Cpu } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

const features = [
  {
    icon: LineChart,
    title: "Data-Driven Research",
    description:
      "All our insights are powered by in-depth analysis, market data, and proven methodologies to ensure consistency and reliability.",
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric Approach",
    description:
      "We prioritize your financial goals by delivering strategies tailored to maximize your growth and long-term success.",
  },
  {
    icon: ShieldCheck,
    title: "Strategic Risk Management",
    description:
      "Our approach focuses on capital protection and controlled risk, helping you trade with confidence and discipline.",
  },
  {
    icon: Cpu,
    title: "Technology & Innovation",
    description:
      "We leverage AI tools, advanced platforms, and real-time analytics combined with human expertise to deliver smarter market insights.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background border-t border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Why Professional Traders Choose Us?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                In a market full of noise, we provide clarity. We seek to give
                you the institutional edge with rigorous data analysis.
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FadeIn
                  key={index}
                  delay={index * 0.1}
                  className="group space-y-3 p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <feature.icon aria-hidden="true" className="w-7 h-7 text-primary dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <FadeIn className="lg:w-1/2" direction="left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group aspect-video lg:aspect-auto lg:h-[500px]">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <Image
                src="/images/dashboard.png"
                alt="Analytics Dashboard"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
