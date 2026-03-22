"use client";

import { Target, Clock, Users, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

const features = [
  {
    icon: Target,
    title: "Proven Accuracy",
    description:
      "Our research is backed by rigorous backtesting and real-time market validation.",
  },
  {
    icon: Clock,
    title: "Timely Updates",
    description:
      "Get real-time alerts via Telegram, SMS, and our mobile app to never miss a move.",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Join a vibrant community of traders to discuss ideas and grow together.",
  },
  {
    icon: Award,
    title: "SEBI Compliant",
    description:
      "Peace of mind knowing you are following advice from a registered professional.",
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
                  className="space-y-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                >
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary dark:text-blue-400" />
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
