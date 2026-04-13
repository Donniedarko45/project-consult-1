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

        <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${
              isPopular ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : "bg-primary/10 text-primary"
            }`}>
              {duration} Plan
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-foreground leading-none tracking-tight">
              {planName}
            </h3>
            <p className="text-gray-400 text-sm font-bold mt-2 uppercase tracking-wide opacity-60">
              Professional Research
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-10">
            {originalPrice && (
              <div className="flex items-center gap-3 mb-1">
                <span className="text-gray-400 line-through text-lg font-bold opacity-50">{originalPrice}</span>
                {discount && (
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
                    -{discount} OFF
                  </span>
                )}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className={`text-6xl font-black tracking-tighter ${isPopular ? "text-yellow-600 dark:text-yellow-400" : "text-foreground"}`}>
                {price}
              </span>
              <span className="text-gray-400 text-xs font-black uppercase tracking-widest pb-2 opacity-60">
                / {duration.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grow space-y-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px grow bg-gray-100 dark:bg-white/5" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Core Benefits</span>
              <div className="h-px grow bg-gray-100 dark:bg-white/5" />
            </div>
            <ul className="space-y-4">
              {servicesIncluded.map((service, index) => (
                <li key={index} className="flex items-start group/item">
                  <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0 mr-4 transition-colors ${
                    isPopular ? "bg-yellow-500/20 text-yellow-600" : "bg-primary/10 text-primary"
                  }`}>
                    <Check className="w-3 h-3 stroke-[4px]" />
                  </div>
                  <span className="text-sm lg:text-base font-bold text-gray-600 dark:text-gray-300 group-hover/item:text-foreground transition-colors leading-snug">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/2 rounded-2xl border border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-white/5 rounded-lg shadow-sm">
                  <ShieldCheck className={`w-4 h-4 ${isPopular ? "text-yellow-500" : "text-primary"}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Delivery Mode</span>
                  <span className="text-[11px] font-black text-foreground uppercase tracking-wider">{deliveryMode}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/payment?plan=${encodeURIComponent(planName)}&price=${encodeURIComponent(price)}&planId=${encodeURIComponent(planId || "")}`}
              className={`relative flex items-center justify-center w-full px-8 py-5 text-lg font-black rounded-[1.5rem] transition-all duration-500 group/btn overflow-hidden ${
                isPopular 
                  ? "bg-yellow-500 text-white shadow-[0_10px_20px_-5px_rgba(234,179,8,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(234,179,8,0.5)] hover:-translate-y-1" 
                  : "bg-primary text-secondary shadow-[0_10px_20px_-5px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_15px_30px_-5px_rgba(var(--primary-rgb),0.4)] hover:-translate-y-1"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-1" />
              </span>
            </Link>
            
            <div className="bg-orange-50/50 dark:bg-orange-900/5 p-4 rounded-2xl border border-orange-100/50 dark:border-orange-900/10">
              <p className="text-[10px] text-orange-800/60 dark:text-orange-400/60 text-center leading-relaxed font-bold">
                {riskDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
