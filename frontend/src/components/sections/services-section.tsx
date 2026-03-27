"use client";

import { ServiceCard } from "@/components/ui/service-card";
import { FadeIn } from "@/components/ui/fade-in";
import { TrendingUp, BarChart, PieChart, ShieldCheck } from "lucide-react";

// Mock Data for Services
const services = [
  {
    segment: "Index Options",
    instrument: "Nifty & Bank Nifty",
    tradingStyle: "Intraday & Positional",
    deliveryMode: "Telegram / App",
    icon: TrendingUp,
    price: "₹7,499",
    riskDisclaimer: "High Risk. For experienced traders with high risk appetite.",
  },
  {
    segment: "Stock Futures",
    instrument: "Top 200 F&O Stocks",
    tradingStyle: "Swing Trading (1-5 Days)",
    deliveryMode: "WhatsApp / App",
    icon: BarChart,
    price: "₹8,999",
    riskDisclaimer: "Moderate to High Risk. Margin requirements apply.",
  },
  {
    segment: "Equity Cash",
    instrument: "Bluechip & Large Cap",
    tradingStyle: "Short to Medium Term",
    deliveryMode: "Email / App",
    icon: PieChart,
    price: "₹4,999",
    riskDisclaimer: "Moderate Risk. Focused on wealth creation strategies.",
  },
  {
    segment: "Options Writing",
    instrument: "Index Options",
    tradingStyle: "Positional Hedged",
    deliveryMode: "Telegram Channel",
    icon: ShieldCheck,
    price: "₹12,499",
    riskDisclaimer: "Defined Risk. Capital intensive hedging strategies.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden" id="services">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] -z-1" />

      <div className="container mx-auto px-6">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Institutional Research
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
            Our Core <span className="text-primary italic">Research Services</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Tailored research products designed to match your risk appetite and
            trading style, from active intraday setups to long-term wealth creation.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <ServiceCard {...service} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
