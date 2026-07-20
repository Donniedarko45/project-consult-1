"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Compass, Globe, LineChart, BarChart2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MarketDirectionPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-[#020617] text-slate-300 relative overflow-hidden font-sans">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[url('/images/grid-bg.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <FadeIn direction="up">
          <div className="grid md:grid-cols-2 gap-12 bg-slate-900/90 backdrop-blur-3xl border border-slate-800 rounded-[40px] p-8 md:p-16 shadow-2xl mb-24">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-950 border border-blue-800/50 text-blue-400 mb-8 font-bold tracking-widest text-xs uppercase w-max">
                <Compass className="w-4 h-4" aria-hidden="true" /> Market Context
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
                Never trade against the <span className="text-blue-400">Macro Trend.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Stay aligned with the overall market trend. We provide daily directional biases and heavily researched key levels for Nifty & Bank Nifty to guide your daily trading thesis.
              </p>
              <div>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:-translate-y-1"
                >
                  Get Daily Levels
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative w-full aspect-video md:aspect-square rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
               <Image
                  src="/images/market_direction_hero.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover"
                />
            </div>
          </div>
        </FadeIn>

        {/* Specific Macros Content */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white">The Macros We Track Daily</h2>
            <p className="text-slate-300 mt-4">Clarity comes from looking at the bigger picture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Daily Market Bias", icon: LineChart, desc: "A clear Bullish, Bearish, or Sideways stance broadcasted every morning before the opening bell based on heavy institutional data." },
              { title: "Global Sentiment", icon: Globe, desc: "Tracking US Bond Yields, Dollar Index (DXY), and Asian Macros to preempt gap-risk and broad market sell-offs." },
              { title: "Index Key Levels", icon: BarChart2, desc: "Exact demarcations of extreme support and resistance for Nifty & Bank Nifty. If that level breaks, the trend changes." }
            ].map((box, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 transition-colors group">
                   <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-900/50 transition-colors">
                    <box.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{box.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{box.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
