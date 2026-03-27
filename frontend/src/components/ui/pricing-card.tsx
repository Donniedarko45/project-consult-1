import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";

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
    <div className={`group relative h-full bg-white dark:bg-gray-950 border ${isPopular ? "border-yellow-500/50 dark:border-yellow-400/50 scale-105 z-20 shadow-2xl-strong" : "border-gray-100 dark:border-white/10"} rounded-4xl overflow-hidden hover:shadow-2xl-strong transition-all duration-500 transform hover:-translate-y-4`}>
      {/* High-Impact Top Bar */}
      <div className={`absolute top-0 left-0 w-full h-2 bg-linear-to-r ${isPopular ? "from-yellow-400 via-yellow-600 to-yellow-400" : "from-primary/20 via-primary/50 to-primary/20"} transform origin-left transition-transform duration-500`} />

      {/* Popularity Badge */}
      {isPopular && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-yellow-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-30 flex items-center gap-2">
          <Star className="w-3 h-3 fill-white" />
          Most Popular
        </div>
      )}

      <div className="p-8 lg:p-12 flex flex-col h-full relative z-10">
        <div className={`mt-6 mb-10 text-center ${isPopular ? "pt-4" : ""}`}>
          <h3 className={`text-3xl font-black text-foreground transition-colors ${isPopular ? "text-yellow-600 dark:text-yellow-400" : "group-hover:text-primary"}`}>
            {planName}
          </h3>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">
            Professional Research Plan
          </p>
        </div>

        <div className="mb-10 text-center space-y-2">
          {originalPrice && (
            <div className="flex items-center justify-center gap-3">
              <span className="text-gray-400 line-through text-lg font-bold">{originalPrice}</span>
              {discount && (
                <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-black rounded uppercase tracking-wider">
                  Save {discount}
                </span>
              )}
            </div>
          )}
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-6xl font-black text-foreground tracking-tighter">{price}</span>
            <span className="text-gray-400 text-sm font-black uppercase tracking-widest pl-2">
              / {duration === "Monthly" ? "mo" : duration}
            </span>
          </div>
        </div>

        <div className="grow space-y-8 mb-12">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] relative text-center">
            <span className="bg-white dark:bg-gray-950 px-4 relative z-10">What&apos;s Included</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 dark:bg-white/5 -z-1" />
          </div>
          <ul className="space-y-5">
            {servicesIncluded.map((service, index) => (
              <li
                key={index}
                className="flex items-start text-base font-medium text-gray-600 dark:text-gray-300"
              >
                <div className={`rounded-full p-1 mr-4 mt-0.5 ${isPopular ? "bg-yellow-500/20" : "bg-primary/10"}`}>
                  <Check className={`w-3.5 h-3.5 ${isPopular ? "text-yellow-600 dark:text-yellow-400" : "text-primary"} shrink-0 stroke-[3px]`} />
                </div>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 mt-auto">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Mode</span>
            <span className="text-xs font-black text-foreground uppercase tracking-widest">{deliveryMode}</span>
          </div>

          <Link
            href={`/payment?plan=${encodeURIComponent(
              planName,
            )}&price=${encodeURIComponent(price)}&planId=${encodeURIComponent(planId || "")}`}
            className={`flex items-center justify-center w-full px-8 py-5 text-lg font-black rounded-2xl transition-all shadow-2xl group/btn ${
              isPopular 
                ? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-yellow-500/30" 
                : "bg-primary text-secondary hover:bg-primary/90 shadow-primary/30"
            }`}
          >
            Choose {planName}
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          
          <div className="text-[10px] p-4 bg-gray-50/50 dark:bg-white/2 rounded-2xl text-gray-400 border border-gray-100 dark:border-white/5 text-center leading-relaxed font-bold">
            {riskDisclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
