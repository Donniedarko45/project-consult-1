import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

interface PricingCardProps {
  planId?: string;
  planName: string;
  duration: string;
  price: string;
  servicesIncluded: string[];
  deliveryMode: string;
  riskDisclaimer?: string;
}

export function PricingCard({
  planId,
  planName,
  duration,
  price,
  servicesIncluded,
  deliveryMode,
  riskDisclaimer = "Investment in securities market are subject to market risks.",
}: PricingCardProps) {
  return (
    <div className="group relative h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cta/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cta to-yellow-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="p-4 sm:p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {planName}
          </h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {duration}
          </p>
        </div>

        <div className="mb-6 pb-6 border-b border-dashed border-gray-200 dark:border-gray-800">
          <div className="flex items-en gap-1">
            <span className="text-4xl font-black text-foreground">{price}</span>
            <span className="text-gray-500 text-sm font-medium mb-1">
              / {duration}
            </span>
          </div>
        </div>

        <div className="space-y-4 grow mb-8">
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
            Included Services
          </div>
          <ul className="space-y-3">
            {servicesIncluded.map((service, index) => (
              <li
                key={index}
                className="flex items-start text-sm text-gray-600 dark:text-gray-300"
              >
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-0.5 mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-green-600 dark:text-green-400 shrink-0" />
                </div>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Access via:
          </span>
          <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium border border-blue-100 dark:border-blue-800">
            {deliveryMode}
          </span>
        </div>

        <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg text-xs text-red-600 dark:text-red-400 mb-6 border border-red-100 dark:border-red-900/20 font-medium">
          <p>{riskDisclaimer}</p>
        </div>

        <Link
          href={`/payment?plan=${encodeURIComponent(
            planName,
          )}&price=${encodeURIComponent(price)}&planId=${encodeURIComponent(planId || "")}`}
          className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group-hover:shadow-primary/30"
        >
          Select Plan <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}
