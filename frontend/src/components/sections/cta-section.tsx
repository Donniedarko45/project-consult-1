"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { Send, Instagram, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-gray-100 dark:border-gray-800">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-1 pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6">
            Master the Markets with Live Experts
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tight">
            Ready to Start Your <br />
            <span className="text-primary italic">Trading Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Join hundreds of traders who are upgrading their skills and strategies with our expert guidance.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/plans"
              className="group px-10 py-5 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl text-lg transition-all hover:scale-105 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              suppressHydrationWarning
            >
              Our Trading Plans <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="https://t.me/tradewithashwinisd6"
              target="_blank"
              className="group px-10 py-5 border-2 border-primary/30 text-primary dark:text-blue-400 hover:bg-primary/5 font-black rounded-2xl text-lg transition-all flex items-center justify-center gap-3"
              suppressHydrationWarning
            >
              <Send className="w-5 h-5" /> Join Telegram
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href="https://t.me/tradewithashwinisd6"
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
              suppressHydrationWarning
            >
              <Send className="w-4 h-4" /> Telegram Channel
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link
              href="https://www.instagram.com/ashwinisd_research"
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
              suppressHydrationWarning
            >
              <Instagram className="w-4 h-4" /> Instagram
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-10 max-w-2xl mx-auto leading-relaxed">
            ⚠️ Investments in the securities market are subject to market risks. We do not guarantee any fixed returns. All recommendations are based on analysis and are for educational purposes only. SEBI Reg: INH000024453
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
