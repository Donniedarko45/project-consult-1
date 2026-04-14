"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { TrendingUp, BarChart, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SwingPage() {
  return (
    <main className="min-h-screen bg-[#07130F] text-gray-200 relative overflow-hidden font-sans pb-20">
      {/* Background Accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[800px] h-[500px] bg-green-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 mb-6 font-bold tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <TrendingUp className="w-4 h-4" /> Swing & Positional
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white drop-shadow-md">
              Ride the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">Trend.</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100/70 font-light max-w-2xl mx-auto leading-relaxed">
              Identify short-term opportunities (1–10 days) with strong potential, balancing risk and reward through structured multi-day patterns.
            </p>
          </FadeIn>
        </div>

        {/* Unique Bento Grid Design */}
        <div className="grid md:grid-cols-12 gap-6 max-w-6xl mx-auto mb-32">
          {/* Main Hero Image Box */}
          <FadeIn direction="up" className="md:col-span-8 md:row-span-2 relative rounded-[32px] overflow-hidden border border-emerald-900/30 group">
            <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay z-10 transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#07130F] via-transparent to-transparent" />
            <Image
              src="/images/swing_hero.png"
              alt="Swing Trading Breakouts"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fill
            />
            <div className="absolute bottom-8 left-8 z-30">
              <h3 className="text-3xl font-black text-white mb-2">Breakout Mastery</h3>
              <p className="text-emerald-200/80">Identifying high-conviction supply breaches.</p>
            </div>
          </FadeIn>

          {/* Feature Box 1 */}
          <FadeIn direction="left" delay={0.1} className="md:col-span-4 bg-[#0a1e17] rounded-[32px] p-8 border border-emerald-900/20 flex flex-col justify-center">
            <div className="w-12 h-12 bg-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
              <BarChart className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Structured Zones</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Exact entry arrays and predefined exit zones. We never enter a swing trade without knowing where we get out.</p>
          </FadeIn>

           {/* Feature Box 2 */}
           <FadeIn direction="left" delay={0.2} className="md:col-span-4 bg-[#0a1e17] rounded-[32px] p-8 border border-emerald-900/20 flex flex-col justify-center">
            <div className="w-12 h-12 bg-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">1-10 Day Horizon</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Avoid intraday noise. Let the stock mature over days to capture the true breadth of its momentum cycle.</p>
          </FadeIn>
        </div>

        {/* Specific Swing Content: Mechanics */}
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-black text-center text-white mb-16">Understanding Swing Mechanics</h2>
          </FadeIn>
          
          <div className="space-y-6">
            {[
              {
                title: "The Breakout & Retest Factor",
                desc: "We scan for stocks crossing significant structural resistance with explosive volume. The safest entry is often the mild pullback to this exact broken level.",
                num: "01"
              },
              {
                title: "Sector Rotation Alignment",
                desc: "A stock rarely moves alone. We ensure the broader sector index is also breaking out to add a tailwind to our equity positions.",
                num: "02"
              },
              {
                title: "Trailing Strict Stop-Losses",
                desc: "Instead of exiting fully at arbitrary points, we frequently use trailing stops just below the previous day's low to capture massive, unexpected trend extensions.",
                num: "03"
              }
            ].map((mech, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-8 rounded-3xl bg-emerald-950/10 border border-emerald-900/30 hover:bg-emerald-950/30 transition-colors">
                  <div className="text-6xl font-black text-emerald-900/50 italic mr-8 tracking-tighter">
                    {mech.num}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-300 mb-2">{mech.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{mech.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#07130F] px-12 py-5 rounded-full font-black text-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
          >
            Start Swing Trading
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <DisclaimerStrip />
      <Footer />
    </main>
  );
}
