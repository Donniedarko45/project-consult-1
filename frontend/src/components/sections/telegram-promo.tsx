"use client";

import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function TelegramPromo() {
  const benefits = [
    {
      title: "1. Real-Time Trades Before the Move",
      desc: "Get entries before the breakout — not after it’s already gone."
    },
    {
      title: "2. Exact Entry, Target & Stop-Loss",
      desc: "No confusion. No guessing. Just clear, professional trade plans."
    },
    {
      title: "3. Only High-Probability Setups",
      desc: "We filter the market and give you only trades that matter."
    },
    {
      title: "4. Consistent Income Focus (Not Hype)",
      desc: "No “get rich quick” — we focus on steady, repeatable profits."
    },
    {
      title: "5. Learn While You Earn",
      desc: "Understand the logic behind every trade and grow into a confident trader."
    },
    {
      title: "6. Risk Management = Capital Protection",
      desc: "Because saving your capital is more important than making profits."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-black overflow-hidden relative transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-0 left-0 w-[30%] h-full bg-primary/5 dark:bg-primary/10 blur-[100px] rounded-full z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 p-10 lg:p-16 bg-white dark:bg-white/3 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-white/10 transition-all duration-300">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-[0.2em] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Limited Access
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight transition-colors">
                🚀 Join Our Telegram – <br/>
                <span className="text-blue-500 dark:text-blue-400">Trade Like a Pro</span>
              </h2>

              <div className="grid sm:grid-cols-1 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 text-gray-700 dark:text-gray-300 group">
                    <div className="mt-1 w-6 h-6 shrink-0 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-lg font-bold group-hover:text-primary transition-colors block">{benefit.title}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{benefit.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto flex flex-col items-center gap-8">
              
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/30 w-full lg:w-[340px] text-center space-y-2">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">👉 Don’t watch others make money. Be part of it.</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">👉 Join now & start trading with clarity.</p>
              </div>

              <div className="relative group w-full lg:w-[340px]">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <Link
                  href="https://t.me/tradewithashwinisd6"
                  target="_blank"
                  className="relative w-full inline-flex items-center justify-center px-10 py-7 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-3xl text-xl transition-all hover:scale-[1.02] shadow-2xl shadow-blue-500/20 overflow-hidden group/btn"
                >
                  <Send className="w-6 h-6 mr-3 transition-transform group-hover/btn:rotate-12 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  Join Free Channel
                  <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </Link>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500 transition-colors">
                      U{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shrink-0">
                    +120
                  </div>
                </div>
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase">
                  Trusted by 120+ Active Traders
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
