import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

interface ServiceCardProps {
  segment: string;
  instrument: string;
  tradingStyle: string;
  deliveryMode: string;
  riskDisclaimer?: string;
}

export function ServiceCard({
  segment,
  instrument,
  tradingStyle,
  deliveryMode,
  riskDisclaimer = "Standard market risks apply.",
}: ServiceCardProps) {
  return (
    <div className="group relative h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase text-primary bg-primary/10 dark:text-blue-300 dark:bg-blue-900/30 rounded-full mb-3">
            {segment}
          </span>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {instrument}
          </h3>
        </div>

        <div className="flex-grow space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Style</span>
            <span className="font-semibold">{tradingStyle}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Delivery</span>
            <span className="font-semibold">{deliveryMode}</span>
          </div>

          <div className="flex gap-2 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg text-xs text-red-600 dark:text-red-400 items-start border border-red-100 dark:border-red-900/20">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-medium">{riskDisclaimer}</p>
          </div>
        </div>

        <div className="pt-6 mt-4">
          <Link
            href="/contact"
            className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 text-foreground font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300"
            suppressHydrationWarning
          >
            Enquire Now{" "}
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
