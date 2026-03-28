"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function TelegramPromo() {
  const benefits = [
    "Real-Time Market Commentary (No Delay)",
    "Accurate Nifty & Bank Nifty Levels",
    "High-Probability Intraday Setups",
    "Equity Swing Trades with Proper Analysis",
    "Options Trading Insights (Expiry Special)",
    "AI + Manual Research-Based Signals",
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
              
              <h2 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight transition-colors">
                Join Our Telegram – <br/>
                <span className="text-blue-500 dark:text-blue-400">Trade Like a Pro</span>
              </h2>

              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed transition-colors">
                Stop guessing. Start trading with confidence. Get high-probability trade setups, real-time insights, and expert analysis directly on your phone — guided by a SEBI Registered Research Analyst.
              </p>

              <div className="grid sm:grid-cols-1 gap-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 group">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                      <Send className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto flex flex-col items-center gap-8">
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
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500 transition-colors">
                      U{i}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                    +10k
                  </div>
                </div>
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 tracking-[0.2em] uppercase">
                  Trusted by 10,000+ Active Traders
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
