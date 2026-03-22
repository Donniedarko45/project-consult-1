"use client";

import Link from "next/link";
import { Send, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function TelegramPromo() {
  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-900/10 border-y border-blue-100 dark:border-blue-800">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                <Send className="w-3 h-3" /> Community Access
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Join Our Telegram for{" "}
                <span className="text-primary dark:text-blue-400">
                  High-Accuracy Trade Setups
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get real-time market updates, trusted trading calls, and stock
                market insights directly on your phone. See why thousands of
                traders trust our analysis for their profitable journey.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  ✓ Live Market Commentary
                </li>
                <li className="flex items-center gap-2">
                  ✓ Nifty & Bank Nifty Levels
                </li>
                <li className="flex items-center gap-2">
                  ✓ Equity Swing Trades
                </li>
              </ul>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-4">
              <Link
                href="https://t.me/tradewithashwinisd6"
                target="_blank"
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                <Send className="w-5 h-5 mr-3 -ml-1" />
                Free Channel
              </Link>
              <Link
                href="/plans"
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-primary/20"
              >
                <Award className="w-5 h-5 mr-3 -ml-1" />
                Paid Channel
              </Link>
              <div className="text-center text-xs text-gray-400">
                Join 10,000+ traders today
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
