"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-1" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text Content Column */}
          <FadeIn className="lg:w-1/2 space-y-10" direction="right">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Trusted Expertise
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                Decades of Market Expertise <br/>
                <span className="text-primary dark:text-blue-400">at Your Fingertips</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                We are a team of SEBI registered research analysts dedicated to
                empowering traders with ethical, data-driven, and risk-managed
                market insights. Our mission is to bridge the gap between complex
                market dynamics and actionable trading strategies.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                Whether you are a beginner looking to understand the basics of the
                stock market or an experienced trader seeking advanced F&O
                strategies, our comprehensive educational programs and research
                services are designed to elevate your trading journey.
              </p>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-primary/20"
              suppressHydrationWarning
            >
              Learn More About Us <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>

          {/* Image & Stats Column */}
          <FadeIn className="lg:w-1/2" direction="left" delay={0.3}>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl-strong group aspect-square lg:aspect-auto lg:h-[600px] ring-1 ring-gray-200/50 dark:ring-white/10">
              <Image
                src="/images/trading_office_team.png"
                alt="Our Trading Floor"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Premium Stats Overlay */}
              <div className="absolute inset-x-6 bottom-6 lg:inset-x-10 lg:bottom-10 p-8 lg:p-10 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-4xl border border-white/20 shadow-2xl group-hover:bg-white/20 dark:group-hover:bg-black/30 transition-all duration-500">
                <div className="grid grid-cols-2 gap-8 divide-x divide-white/20">
                  <div className="text-white">
                    <div className="text-5xl lg:text-6xl font-black mb-2 tracking-tighter">15+</div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-80 leading-snug">
                      Combined Years of <br/> Market Experience
                    </div>
                  </div>
                  <div className="text-white pl-8">
                    <div className="text-5xl lg:text-6xl font-black mb-2 tracking-tighter">10k+</div>
                    <div className="text-xs font-black uppercase tracking-widest opacity-80 leading-snug">
                      Satisfied Traders <br/> Empowered Nationwide
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
