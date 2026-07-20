"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Star, Shield, Lock, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HighConvictionPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-gray-300 relative overflow-hidden font-sans pb-20">
      {/* Luxury Gold Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 text-center border-b border-yellow-900/20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-yellow-600/30 bg-yellow-900/10 text-yellow-500 mb-8 font-bold tracking-widest text-xs uppercase">
            <Crown className="w-4 h-4" aria-hidden="true" /> Elite Tier
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white tracking-tight">
            Precision over <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600">Volume.</span>
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Access limited, high-quality opportunities strictly filtered through our most advanced research parameters. Designed exclusively for traders who mandate absolute clarity.
          </p>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <FadeIn direction="right">
            <div className="relative w-full aspect-square rounded-full overflow-hidden border-8 border-[#111] shadow-[0_0_100px_rgba(217,119,6,0.1)] group p-4 bg-gradient-to-br from-yellow-900/20 to-transparent">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/high_conviction_hero.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" className="space-y-10">
            <div>
              <h2 className="text-4xl font-black text-white mb-4">The Premium Filter</h2>
              <p className="text-lg text-gray-400 leading-relaxed pb-8 border-b border-white/5">
                While standard market setups are designed to keep you active, our High-Conviction setups are designed to keep you profitable with minimal drawdown. We only deploy capital when all stars align.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                { title: "Stringent Confluence", icon: Star, text: "Setups must meet 5+ independent technical and fundamental criteria before being sent." },
                { title: "Asymmetric Risk:Reward", icon: Shield, text: "We mandate a minimum 1:3 RR ratio. We do not engage in setups where the downside risk outweighs the immediate upside." },
                { title: "Limited Frequency", icon: Lock, text: "You may only receive 2-4 setups a week. We actively filter out the noise of the daily grind." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-full bg-[#111] border border-yellow-900/30 flex items-center justify-center shrink-0 group-hover:border-yellow-500/50 transition-colors">
                    <item.icon className="w-6 h-6 text-yellow-600 group-hover:text-yellow-400 transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="text-center bg-[#111] border border-yellow-900/30 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-bl-full" />
          <h2 className="text-3xl font-black text-white mb-6 relative z-10">Ready to Upgrade Your Precision?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10">Stop overtrading. Start waiting for the perfect pitch. Upgrade your access to view highly filtered setups.</p>
          <Link
            href="/signup"
            aria-label="Get started - sign up"
            className="relative z-10 inline-flex items-center gap-3 bg-gradient-to-r from-yellow-700 to-amber-800 hover:from-yellow-600 hover:to-amber-700 text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-[0_0_40px_rgba(217,119,6,0.3)] hover:scale-105"
          >
            Unlock Premium Access
            <ArrowRight className="w-6 h-6" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
