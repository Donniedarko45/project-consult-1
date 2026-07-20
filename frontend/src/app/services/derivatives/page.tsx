"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Activity, ArrowRight, GitMerge, ShieldAlert, Crosshair } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DerivativesPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-[#070512] text-gray-200 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-fuchsia-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyberpunk Centered Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center z-10 border-b border-fuchsia-900/20">
        <FadeIn>
          <div className="mx-auto w-24 h-24 bg-fuchsia-900/30 rounded-3xl rotate-12 flex items-center justify-center text-fuchsia-400 mb-8 border border-fuchsia-500/30 shadow-[0_0_50px_rgba(217,70,239,0.2)]">
            <Activity className="w-12 h-12 -rotate-12" aria-hidden="true" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white tracking-tighter">
            Derivatives <span className="text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-purple-600">(F&O)</span> Research
          </h1>
          <p className="text-xl md:text-2xl text-purple-200/90 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            High-impact setups in index and stock derivatives. Options-based strategies requiring extreme discipline and structural awareness.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 font-medium">Nifty & BankNifty</span>
            <span className="px-6 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 font-medium">Stock Options</span>
            <span className="px-6 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 font-medium">Hedging Strategies</span>
          </div>
        </FadeIn>
      </section>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <section aria-labelledby="derivatives-why-heading" className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn direction="right">
            <div className="relative w-full aspect-video md:aspect-[4/3] rounded-[40px] overflow-hidden border border-fuchsia-500/20 shadow-[0_0_60px_rgba(217,70,239,0.15)] group">
              <div className="absolute inset-0 bg-fuchsia-900/20 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/images/derivatives_hero.png"
                alt="F&O Options Trading"
                fill
                className="object-cover hover:scale-110 transition-transform duration-[2s]"
              />
            </div>
          </FadeIn>
          
          <FadeIn direction="left" className="space-y-8">
            <h2 id="derivatives-why-heading" className="text-4xl font-black text-white">Why Trade F&O With Us?</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Options trading is fundamentally different from cash equities. It involves the Greeks, theta decay, and volatility crushes. We abstract the complex math and deliver clean, actionable directional logic.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Breakout & Reversal Sets", icon: Crosshair, text: "Trading key open interest (OI) shifts and short-covering rallies." },
                { title: "Market Structure Analysis", icon: GitMerge, text: "Identifying premium melt-up zones vs sideways decay traps." },
                { title: "Structured Risk", icon: ShieldAlert, text: "Strict defined-risk methodologies for volatile expiry days." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-fuchsia-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Specific Derivative Content */}
        <section className="bg-gradient-to-b from-[#130b26] to-transparent border border-fuchsia-900/30 rounded-[40px] p-10 md:p-16 mb-20 text-center">
          <FadeIn>
            <h2 className="text-3xl font-black text-white mb-12">The Dual Edge Strategy</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div className="bg-[#0f081e] p-8 rounded-3xl border border-purple-900/50">
                <div className="text-fuchsia-500 font-black tracking-widest text-sm uppercase mb-4">Directional</div>
                <h3 className="text-2xl font-bold text-white mb-4">Naked Buying</h3>
                <p className="text-gray-400 leading-relaxed">
                  Used purely on momentum breakout days (trending markets). We focus on At-The-Money (ATM) or slightly In-The-Money (ITM) strikes to capture high delta movement and avoid theta decay.
                </p>
              </div>
              <div className="bg-[#0f081e] p-8 rounded-3xl border border-purple-900/50">
                <div className="text-fuchsia-500 font-black tracking-widest text-sm uppercase mb-4">Non-Directional</div>
                <h3 className="text-2xl font-bold text-white mb-4">Hedged Spreads</h3>
                <p className="text-gray-400 leading-relaxed">
                  Used in range-bound markets or ahead of massive binary events. Spreads cap our maximum risk to an absolute defined amount, providing peace of mind overnight.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-[0_0_50px_rgba(217,70,239,0.3)] hover:scale-105"
          >
            Access F&O Research
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
