"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-gray-100 dark:border-gray-800">
      {/* Background decorative elements - using theme colors instead of hardcoded blue/cta */}
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none">
        <img
          src="c:/Users/ss969/.gemini/antigravity/brain/74a30a21-eba0-421c-8853-6464af8a2e49/abstract_financial_hero_1767984834425.png"
          alt="Background Texture"
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Start Your Trading Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of traders who are upgrading their skills and
            strategies with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plans"
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-lg transition-colors"
              suppressHydrationWarning
            >
              Explore Plans
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 bg-transparent border border-primary dark:border-gray-600 text-primary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold rounded-lg text-lg transition-colors"
              suppressHydrationWarning
            >
              Browse Courses
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
