"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <FadeIn className="lg:w-1/2 space-y-6" direction="right">
            <h2 className="text-3xl font-bold text-foreground">
              Decades of Market Expertise at Your Fingertips
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We are a team of SEBI registered research analysts dedicated to
              empowering traders with ethical, data-driven, and risk-managed
              market insights. Our mission is to bridge the gap between complex
              market dynamics and actionable trading strategies.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Whether you are a beginner looking to understand the basics of the
              stock market or an experienced trader seeking advanced F&O
              strategies, our comprehensive educational programs and research
              services are designed to elevate your trading journey.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-primary dark:text-blue-400 font-semibold hover:underline"
              suppressHydrationWarning
            >
              Read Our Story <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </FadeIn>
          <FadeIn className="lg:w-1/2" direction="left" delay={0.2}>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl group">
              <img
                src="/images/trading_office_team.png"
                alt="Our Trading Floor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="text-4xl font-bold mb-1">15+ Years</div>
                  <div className="text-sm font-medium opacity-90">
                    Combined Market Experience
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
