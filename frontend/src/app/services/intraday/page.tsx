"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Zap, Target, Activity, Crosshair, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function IntradayPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Unique Full-Bleed Hero for Intraday */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-black z-10" />
          <Image
            src="/images/intraday_hero.png"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 mt-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950 border border-blue-500/30 text-blue-300 mb-6 font-semibold uppercase tracking-widest text-sm">
              <Zap className="w-4 h-4" aria-hidden="true" />
              Real-Time Momentum
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-blue-500">
              Intraday Research Setups
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 block font-light">
              Don't guess the direction. Trade the established momentum. 
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="relative z-20 -mt-32 max-w-7xl mx-auto px-4 pb-24">
        {/* Unique Feature Grid for Intraday */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            {
              title: "High-Probability Setups",
              desc: "Filtered through strict techno-funda criteria before the market opens.",
              icon: Target,
            },
            {
              title: "Pre-Defined Levels",
              desc: "Exact entry zones, target points, and invalidation levels (SL).",
              icon: Crosshair,
            },
            {
              title: "Momentum-Driven",
              desc: "We look for explosive volume triggers that move fast.",
              icon: Activity,
            },
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 transition-colors h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <item.icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Specific Intraday Content: Execution Blueprint */}
        <FadeIn>
          <div className="bg-linear-to-br from-blue-900/20 to-black border border-blue-900/30 rounded-4xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">
              Our 3-Step Intraday Execution Blueprint
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-12 relative">
              {/* Connecting Line */}
              <div className="hidden sm:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-linear-to-r from-blue-500/10 via-blue-500/50 to-blue-500/10" />
              
              <div className="relative text-center">
                <div className="w-14 h-14 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-black mb-6 relative z-10 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-100">Pre-Market Prep</h3>
                <p className="text-gray-400 text-sm">We aggregate institutional data and scanner alerts to spot top movers before 9:15 AM.</p>
              </div>
              <div className="relative text-center">
                <div className="w-14 h-14 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-black mb-6 relative z-10 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-100">Wait For Trigger</h3>
                <p className="text-gray-400 text-sm">Patience is key. We wait for the stock to breach specific Resistance/Support with strong volume.</p>
              </div>
              <div className="relative text-center">
                <div className="w-14 h-14 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-black mb-6 relative z-10 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-100">Risk Management</h3>
                <p className="text-gray-400 text-sm">Immediate placing of stop-loss and trailing stops. Cut losers fast, let winners ride.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-20 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:-translate-y-1"
          >
            Access Intraday Setups Now
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
