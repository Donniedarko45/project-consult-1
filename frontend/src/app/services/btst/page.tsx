"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Moon, Sunrise, Clock, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BTSTPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-[#050B14] text-gray-100 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn direction="right" className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 mb-6 text-sm font-bold tracking-wide">
              <Moon className="w-4 h-4" aria-hidden="true" /> Buy Today. Sell Tomorrow.
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
              Capture The <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">Overnight Alpha.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              Stop watching the market all day. BTST/STBT setups are designed to help you capture gap-up and gap-down momentum using strictly defined end-of-day momentum triggers.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { label: "Short-term carry-forward setups", icon: Clock },
                { label: "Momentum-based stock selection", icon: Sunrise },
                { label: "Clear levels for tracking", icon: Briefcase },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg font-medium text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center border border-cyan-800">
                    <item.icon className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                  </div>
                  {item.label}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              aria-label="Get started - sign up"
              className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-[#050B14] px-8 py-4 rounded-xl font-black text-lg transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Get Started
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </FadeIn>

          <FadeIn direction="left" className="order-1 lg:order-2">
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent z-10" />
              <Image
                src="/images/btst_hero.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* Specific BTST Content: Anatomy of a Trade */}
        <section className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16 backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-white">
            The Anatomy of a BTST Trade
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="pb-8 border-b border-white/10">
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">1. The 3:15 PM Scan</h3>
                <p className="text-gray-400 leading-relaxed">
                  We look for stocks closing near their day's high or breaking out of heavy resistance zones exactly around 3:15 PM. These are the stocks most likely to carry institutional momentum into the next day.
                </p>
              </div>
              <div className="pb-8 border-b border-white/10 md:border-transparent md:pb-0">
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">2. Global Sentiment Check</h3>
                <p className="text-gray-400 leading-relaxed">
                  We perform quick correlations with global futures (US & Asian prep) to ensure macros align with the gap expectation, protecting the carry-forward position.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="pb-8 border-b border-white/10">
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">3. Precise Sizing</h3>
                <p className="text-gray-400 leading-relaxed">
                  Overnight trades carry gap risk. Our setups provide strict guidelines on maximum position sizing so one bad gap doesn't hurt your portfolio.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">4. 9:15 AM Execution</h3>
                <p className="text-gray-400 leading-relaxed">
                  Clear instructions on when to exit. Whether it's taking profit in the opening tick frenzy or trailing it using 5-minute candles, you are prepared in advance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
