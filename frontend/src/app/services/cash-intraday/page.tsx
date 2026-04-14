"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { LineChart, Shield, Target, AlertOctagon, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CashIntradayPage() {
  return (
    <main className="min-h-screen bg-[#1c1917] text-stone-300 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[120px] pointer-events-none" />

      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center border-b border-stone-800 pb-20 mb-20">
           <FadeIn direction="right" className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-400 mb-8 font-bold tracking-widest text-xs uppercase w-max">
              <Shield className="w-4 h-4" /> Strictly Non-Leveraged
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-stone-100">
              Trade Pure Equity. <br />
              <span className="text-rose-500">Zero Leverage Risk.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-400 mb-10 leading-relaxed">
              Designed specifically for risk-averse traders and beginners. We focus purely on cash market movements, avoiding the massive volatility spikes and margin calls of the F&O segment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-rose-600/20"
              >
                View Cash Setups
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="left" className="lg:w-1/2 relative">
             <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden border border-stone-800 shadow-2xl bg-stone-900/50">
               <Image
                  src="/images/cash_intraday_hero.png"
                  alt="Cash Market Equity Trading"
                  fill
                  className="object-cover"
                />
            </div>
          </FadeIn>
        </div>

        {/* Specific Cash Content */}
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-12 text-center">Why Avoid Leverage?</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1} className="bg-stone-900 p-8 rounded-3xl border border-stone-800">
              <AlertOctagon className="w-10 h-10 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold text-stone-200 mb-4">No Time Decay (Theta)</h3>
              <p className="text-stone-400 leading-relaxed">
                Options lose value simply as time passes. In the cash market, if your intraday trade gets stuck, you aren't fighting the clock. The price is simply the price.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="bg-stone-900 p-8 rounded-3xl border border-stone-800">
              <LineChart className="w-10 h-10 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold text-stone-200 mb-4">True Value Technicals</h3>
              <p className="text-stone-400 leading-relaxed">
                Derivative premiums are skewed by implied volatility and manipulated Greek values. Cash charts respect pure supply and demand support levels much more cleanly.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="bg-stone-900 p-8 rounded-3xl border border-stone-800">
              <Target className="w-10 h-10 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold text-stone-200 mb-4">Absolute Controlled Risk</h3>
              <p className="text-stone-400 leading-relaxed">
                If you buy ₹50,000 worth of stock with a 1% stop loss, you lose exactly ₹500. There are no sudden 30% premium meltdowns due to sudden volatility drops.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="bg-stone-900 p-8 rounded-3xl border border-rose-900/50 bg-rose-950/10">
              <Shield className="w-10 h-10 text-rose-500 mb-6" />
              <h3 className="text-xl font-bold text-stone-200 mb-4">Perfect For Beginners</h3>
              <p className="text-stone-400 leading-relaxed">
                Trading psychology is much easier to manage without leverage. Getting consistent in the cash segment is the mandatory stepping stone before touching derivatives.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <DisclaimerStrip />
      <Footer />
    </main>
  );
}
