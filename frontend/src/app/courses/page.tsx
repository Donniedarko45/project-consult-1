"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { GraduationCap, BookOpen, Layers, LibraryBig, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "https://ashwinitradingacademy.com/";
  }, []);

  return (
    <>
    <main id="main-content" className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-900/30 rounded-full mb-8 shadow-[0_0_40px_rgba(79,70,229,0.3)]">
              <GraduationCap className="w-10 h-10 text-indigo-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-white">
              Master the Markets with <span className="text-indigo-400">Strict Discipline.</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10">
              Our educational programs are structured to take you from a curious beginner to a highly skilled, independent market participant. Stop gambling, start analyzing.
            </p>
            <Link
              href="/signup"
              aria-label="Get started - sign up"
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:-translate-y-1"
            >
              Enroll in Flagship Program
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn direction="right" className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800">
             <Image
                src="/images/courses_hero.png"
                alt="Trading Courses & Education"
                fill
                className="object-cover"
              />
          </FadeIn>

          <FadeIn direction="left" className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">What You Will Learn</h2>
            {[
              { icon: BookOpen, title: "Beginner to Advanced Concepts", desc: "Start from absolute basics like Candlestick anatomy and progress to advanced volume spread analysis." },
              { icon: Layers, title: "Technical & Price Action", desc: "No lagging indicators. Learn to read pure price structures, supply zones, and institutional footprints." },
              { icon: LibraryBig, title: "Real-Market Case Studies", desc: "Theory is useless without application. Every concept is tested on historical and live market examples." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <div className="w-12 h-12 bg-indigo-950/50 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-100 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>

        {/* Specific Courses Content: Curriculum Outline */}
        <div className="max-w-4xl mx-auto">
           <FadeIn>
             <h3 className="text-3xl font-black text-center text-white mb-12">Program Curriculum Structure</h3>
           </FadeIn>
           <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12 relative border-l-2 border-indigo-900/50 pl-8 md:border-none md:pl-0">
              {[
                { phase: "Phase 1: Foundation", content: "Market mechanics, Dow Theory, Candlestick psychology, and setting up your first charting environment." },
                { phase: "Phase 2: Core Patterns", content: "Understanding flags, pennants, head & shoulders, and identifying failed patterns (traps)." },
                { phase: "Phase 3: Liquidity Zones", content: "Identifying where institutional orders are parked using Demand & Supply blocks rather than standard retail resistance." },
                { phase: "Phase 4: Risk Management", content: "Position sizing mathematics, portfolio heat management, and trader psychology control." },
              ].map((phase, i) => (
                <FadeIn key={i} delay={i * 0.1} className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-indigo-500 left-[-39px] top-1 border-4 border-slate-950 md:hidden" />
                  <div className="text-indigo-400 font-bold mb-2 uppercase tracking-wide text-sm">{phase.phase}</div>
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <p className="text-slate-300 leading-relaxed">{phase.content}</p>
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
