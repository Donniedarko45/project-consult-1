"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { BarChart, CheckCircle2, RefreshCcw, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EquitySwingPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-[#1F1209] text-orange-50 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Equity <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">Swing.</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-200/90 font-light leading-relaxed">
              Short-term stock opportunities specifically designed for those who cannot constantly hover over a trading terminal.
            </p>
          </FadeIn>
        </div>

        {/* Hero Masonry Block */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
           <FadeIn direction="right" className="bg-orange-950/30 border border-orange-900/50 p-10 rounded-[40px] flex flex-col justify-center">
              <BarChart className="w-12 h-12 text-orange-500 mb-8" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-white mb-6">Patient Capital Aggregation</h2>
              <ul className="space-y-6">
                {[
                  "2–15 day positional holding periods",
                  "Deep-screened breakout and continuation patterns",
                  "Clear, unchaotic tracking levels"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-center">
                     <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" aria-hidden="true" />
                     <span className="text-lg text-orange-100/95">{text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12">
                <Link
                  href="/signup"
                  aria-label="Get started - sign up"
                  className="inline-block bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
                >
                  Join The Swing Setups
                </Link>
              </div>
           </FadeIn>
           
           <FadeIn direction="left" className="relative w-full aspect-square md:aspect-auto rounded-[40px] overflow-hidden border border-orange-900/50">
             <Image
                src="/images/equity_swing_hero.png"
                alt="Equity swing setup patterns"
                aria-describedby="equity-swing-hero-desc"
                fill
                className="object-cover"
              />
           </FadeIn>
           <p id="equity-swing-hero-desc" className="sr-only">
             An equity price chart illustrating the swing setup patterns described on this page: price
             consolidates below a horizontal resistance level, breaks above it on expanding volume, then
             pulls back to retest the broken level before continuing higher over a two to fifteen day
             holding period. Marked on the chart are the structured entry zone at the retest, the
             tracking levels used to follow the position, and the exit zone at the measured target.
           </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h3 className="text-3xl font-black text-center mb-12">The Positional Advantage</h3>
          </FadeIn>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <FadeIn delay={0.1} className="p-8 rounded-3xl bg-[#2a170d] border border-orange-900/30">
              <TrendingUp className="w-8 h-8 text-green-500 mb-6" aria-hidden="true" />
              <h4 className="text-xl font-bold mb-3">Profit from the Big Move</h4>
              <p className="text-orange-200/90 leading-relaxed">
                Intraday traders fight for 1-2%. A well-timed swing trade captures the meat of a 10-15% sustained institutional buying spree over several days.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="p-8 rounded-3xl bg-[#2a170d] border border-orange-900/30">
              <RefreshCcw className="w-8 h-8 text-blue-500 mb-6" aria-hidden="true" />
              <h4 className="text-xl font-bold mb-3">Psychological Relief</h4>
              <p className="text-orange-200/90 leading-relaxed">
                Because setups unfold over days, you aren't forced into rushed decisions. Set your target limit orders, place your Good-Till-Canceled (GTC) stops, and let the market work while you focus on life.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
