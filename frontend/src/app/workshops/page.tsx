"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Presentation, Video, MessageCircleQuestion, Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkshopsPage() {
  return (
    <main className="min-h-screen bg-[#001428] text-sky-100 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-5xl mx-auto bg-[#001D39] border border-sky-800/50 rounded-[40px] overflow-hidden shadow-2xl mb-24 flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 mb-8 font-bold text-xs uppercase w-max tracking-wider">
              <Presentation className="w-4 h-4" /> Live Interactive Session
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
              Simplify the Market. <br/><span className="text-sky-400">Live.</span>
            </h1>
            <p className="text-lg text-sky-200/70 mb-10">
              Join our highly interactive workshops for hands-on, live market understandings designed specifically to break down complex concepts into actionable logic.
            </p>
            <div className="flex items-center gap-4 border-t border-sky-800/50 pt-8">
              <div className="w-12 h-12 bg-sky-900/50 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="text-xs text-sky-300 uppercase tracking-widest font-bold">Next Session</div>
                <div className="font-medium text-white">To be announced</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative min-h-[400px]">
            <Image
              src="/images/workshops_hero.png"
              alt="Live Workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Specific Workshops Content */}
        <div className="max-w-6xl mx-auto">
          <FadeIn>
             <h2 className="text-3xl font-black text-center text-white mb-16">Why Attend A Live Workshop?</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { icon: Video, title: "Live Chart Reading", desc: "Watch how we mark levels, read the depth, and analyze multi-timeframe charts in real time." },
              { icon: MessageCircleQuestion, title: "Interactive Q&A", desc: "Get your specific doubts solved immediately. Ask about your current trades or conceptual bottlenecks." },
              { icon: Users, title: "Beginner Friendly", desc: "We abstract the complex jargon. If you don't understand Delta and Theta, we explain it simply." }
            ].map((box, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#001D39]/50 border border-sky-800/30 p-8 rounded-3xl h-full backdrop-blur-md">
                   <box.icon className="w-10 h-10 text-sky-400 mb-6" />
                   <h3 className="text-xl font-bold text-white mb-3">{box.title}</h3>
                   <p className="text-sky-200/70 text-sm leading-relaxed">{box.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center">
             <Link 
                href="/signup" 
                className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-slate-900 px-12 py-5 rounded-full font-black text-xl transition-all shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:scale-105"
              >
                Reserve Your Seat
                <ArrowRight className="w-6 h-6" />
             </Link>
          </div>
        </div>
      </div>
      <DisclaimerStrip />
      <Footer />
    </main>
  );
}
