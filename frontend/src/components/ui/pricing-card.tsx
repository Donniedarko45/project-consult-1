"use client";

import Link from "next/link";
import { Check, ArrowRight, Star, ShieldCheck } from "lucide-react";

interface PricingCardProps {
  planId?: string;
  planName: string;
  duration: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  servicesIncluded: string[];
  deliveryMode: string;
  isPopular?: boolean;
  riskDisclaimer?: string;
}

export function PricingCard({
  planId,
  planName,
  duration,
  price,
  originalPrice,
  discount,
  servicesIncluded,
  deliveryMode,
  isPopular = false,
  riskDisclaimer = "Investment in securities market are subject to market risks.",
}: PricingCardProps) {
  return (
    <div className={`group relative h-full flex flex-col rounded-[2.5rem] p-1 transition-all duration-700 ${
      isPopular 
        ? "bg-linear-to-b from-yellow-400/50 via-yellow-600/50 to-yellow-400/50 shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)] scale-[1.02] lg:scale-105 z-20" 
        : "bg-linear-to-b from-primary/20 via-primary/5 to-transparent hover:from-primary/40 hover:via-primary/20 hover:to-primary/5 shadow-xl"
    }`}>
      <div className="relative flex flex-col h-full bg-white dark:bg-gray-950 rounded-[2.3rem] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-500 group-hover:opacity-100 ${isPopular ? "opacity-100 bg-yellow-400/10" : "opacity-0"}`} />
        
        {/* Popularity Badge */}
        {isPopular && (
          <div className="absolute top-6 right-8 flex items-center gap-1.5 px-4 py-1.5 bg-yellow-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-30">
            <Star className="w-3 h-3 fill-white" />
            Featured
          </div>
        )}

        <div className="p-10 lg:p-14 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="mb-10">
            <div className={`inline-block px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.25em] mb-6 ${
              isPopular ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20" : "bg-primary/10 text-primary border border-primary/20"
            }`}>
              {duration} Access
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tighter mb-4">
              {planName}
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary/30 rounded-full" />
              <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">
                Institutional Research
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-12">
            {originalPrice && (
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-400 line-through text-xl font-bold opacity-40">{originalPrice}</span>
                {discount && (
                  <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-lg shadow-green-500/20">
                    SAVE {discount}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className={`text-7xl lg:text-8xl font-black tracking-tighter ${isPopular ? "text-yellow-600 dark:text-yellow-400" : "text-foreground"}`}>
                {price}
              </span>
              <div className="flex flex-col mb-2">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-60">Inclusive of</span>
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-60">GST & Fees</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grow space-y-8 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap">Core Deliverables</span>
              <div className="h-px grow bg-linear-to-r from-primary/20 to-transparent" />
            </div>
            <ul className="grid grid-cols-1 gap-5">
              {servicesIncluded.map((service, index) => (
                <li key={index} className="flex items-start group/item">
                  <div className={`mt-1 h-6 w-6 rounded-xl flex items-center justify-center shrink-0 mr-5 transition-all duration-500 group-hover/item:scale-110 ${
                    isPopular ? "bg-yellow-500/20 text-yellow-600 shadow-lg shadow-yellow-500/10" : "bg-primary/20 text-primary shadow-lg shadow-primary/10"
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[4px]" />
                  </div>
                  <span className="text-base lg:text-lg font-bold text-gray-600 dark:text-gray-300 group-hover/item:text-foreground transition-colors leading-relaxed">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Section */}
          <div className="space-y-8">
            <div className="p-6 bg-gray-50/50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm border border-black/5 dark:border-white/10">
                  <ShieldCheck className={`w-5 h-5 ${isPopular ? "text-yellow-500" : "text-primary"}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deployment Channel</span>
                  <span className="text-xs font-black text-foreground uppercase tracking-widest">{deliveryMode}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/payment?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}&planId=${encodeURIComponent(planId || "")}`}
              className={`relative flex items-center justify-center w-full px-10 py-6 text-xl font-black rounded-[2rem] transition-all duration-500 group/btn overflow-hidden ${
                isPopular 
                  ? "bg-yellow-500 text-white shadow-[0_15px_30px_-5px_rgba(234,179,8,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(234,179,8,0.6)] hover:-translate-y-1.5" 
                  : "bg-primary text-secondary shadow-[0_15px_30px_-5px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_20px_40px_-5px_rgba(var(--primary-rgb),0.5)] hover:-translate-y-1.5"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
              <span className="relative z-10 flex items-center">
                Access Research
                <ArrowRight className="w-6 h-6 ml-4 transition-transform group-hover/btn:translate-x-2" />
              </span>
            </Link>
            
            <div className="bg-orange-50/30 dark:bg-orange-950/20 p-5 rounded-2xl border border-orange-100/50 dark:border-orange-900/20">
              <p className="text-[11px] text-orange-800/70 dark:text-orange-400/70 text-center leading-relaxed font-bold">
                ⚠️ {riskDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
