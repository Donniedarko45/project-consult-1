"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User, TrendingUp } from "lucide-react";

interface TradingGraphProps {
  onComplete?: () => void;
}

export function TradingGraph({ onComplete }: TradingGraphProps) {
  // FIXED: Deterministic data (no Math.random) to prevent hydration mismatches
  const steps = [
    { height: 60, delay: 0, message: "Market Entry" },
    { height: 100, delay: 0.8, message: "Strategy Build" },
    { height: 140, delay: 1.6, message: "Deep Analysis" },
    { height: 180, delay: 2.4, message: "Live Trading" },
    { height: 220, delay: 3.2, message: "Risk Control" },
    { height: 260, delay: 4.0, message: "Happy Investor" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Advance the climber state
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 800);

    // Signal completion after full animation
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, steps.length * 800 + 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, steps.length]);

  return (
    <div className="relative w-full h-[450px] bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/5 p-8 flex items-end justify-between overflow-hidden shadow-2xl">
      {/* Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-dashed bg-gray-400 top-1/4"
            style={{ top: `${i * 20}%` }}
          />
        ))}
      </div>

      {/* Rising Steps / Candles */}
      <div className="flex items-end justify-between w-full h-full gap-4 relative z-10 px-2 pb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="w-full relative flex flex-col justify-end h-full"
          >
            {/* The Climber (appears on active step) */}
            {index === activeIndex && (
              <motion.div
                layoutId="climber"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20"
                style={{ bottom: `${step.height}px` }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white dark:bg-primary text-primary dark:text-white p-2 rounded-full shadow-lg border-2 border-primary/20 animate-bounce">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="bg-white/80 dark:bg-black/80 text-[10px] px-2 py-0.5 rounded-full mt-1 font-bold text-primary dark:text-blue-300 backdrop-blur-md">
                    {step.message}
                  </div>
                </div>
              </motion.div>
            )}

            {/* The Bar */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${step.height}px`, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: step.delay,
                ease: "easeOut",
              }}
              className={`w-full rounded-t-lg shadow-lg transition-all duration-300 ${
                index <= activeIndex
                  ? "bg-linear-to-t from-green-600 to-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Final Success Badge */}
      {activeIndex === steps.length - 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl border-2 border-green-500 flex flex-col items-center gap-2 z-50 text-center"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-foreground">Goal Reached!</h3>
          <p className="text-sm text-gray-500">Consistent Returns</p>
        </motion.div>
      )}
    </div>
  );
}
