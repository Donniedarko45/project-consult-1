import Link from "next/link";
import { ArrowRight, Info, LucideIcon, TrendingUp } from "lucide-react";

interface ServiceCardProps {
  segment: string;
  instrument: string;
  tradingStyle: string;
  deliveryMode: string;
  icon?: LucideIcon;
  price: string;
  riskDisclaimer?: string;
}

export function ServiceCard({
  segment,
  instrument,
  tradingStyle,
  deliveryMode,
  icon: Icon = TrendingUp,
  price,
  riskDisclaimer = "Standard market risks apply.",
}: ServiceCardProps) {
  return (
    <div className="group relative h-full bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/10 rounded-4xl overflow-hidden hover:shadow-2xl-strong transition-all duration-500 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-blue-400 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white shadow-inner">
            <Icon className="w-8 h-8" />
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/5 border border-primary/20 rounded-full mb-1">
              {segment}
            </span>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Premium Service</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl lg:text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
            {instrument}
          </h3>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
            Highly Speculative Analysis
          </p>
        </div>

        <div className="grow space-y-6 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/5 group-hover:border-primary/20 transition-colors">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Trading Style</span>
            <span className="font-black text-foreground">{tradingStyle}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-white/5 group-hover:border-primary/20 transition-colors">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Alert Mode</span>
            <span className="font-black text-foreground">{deliveryMode}</span>
          </div>

          <div className="flex gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl text-[11px] text-orange-700 dark:text-orange-400 items-start border border-orange-100 dark:border-orange-900/20 group-hover:border-orange-300 transition-all duration-300">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-bold leading-relaxed">{riskDisclaimer}</p>
          </div>
        </div>

        <div className="pt-10 mt-8 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Monthly Plan</p>
              <p className="text-3xl font-black text-foreground tracking-tighter">
                <span className="text-sm font-bold text-gray-400 mr-1 uppercase">from</span>
                {price}
              </p>
            </div>
          </div>
          
          <Link
            href="/plans"
            className="flex items-center justify-center w-full px-8 py-5 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-xl hover:shadow-primary/20"
            suppressHydrationWarning
          >
            Subscribe Now{" "}
            <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
