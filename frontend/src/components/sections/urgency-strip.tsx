"use client";

import { useState, useEffect } from "react";
import { Timer, AlertCircle } from "lucide-react";

export function UrgencyStrip() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className="bg-orange-500 text-white py-4 relative overflow-hidden group">
      {/* Animated Background Ticker Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-600 via-orange-500 to-orange-600 opacity-50 group-hover:animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-12">
          {/* Urgency Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-bounce">
            <AlertCircle className="w-4 h-4 fill-white text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">
              Limited Slots Available
            </span>
          </div>

          {/* Main Message */}
          <p className="text-lg lg:text-xl font-black tracking-tight text-center">
            Next Research Batch Closing Soon! <span className="text-yellow-200 italic underline">Join Today.</span>
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center gap-3 bg-black/20 px-6 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
            <Timer className="w-5 h-5 text-yellow-300" />
            <div className="flex items-center gap-1.5 font-mono text-xl lg:text-2xl font-black tracking-tighter">
              <span className="w-8 lg:w-10 text-center">{formatTime(timeLeft.hours)}</span>
              <span className="opacity-50">:</span>
              <span className="w-8 lg:w-10 text-center">{formatTime(timeLeft.minutes)}</span>
              <span className="opacity-50">:</span>
              <span className="w-8 lg:w-10 text-center text-yellow-300">{formatTime(timeLeft.seconds)}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 pl-2">Left</span>
          </div>
        </div>
      </div>
    </div>
  );
}
