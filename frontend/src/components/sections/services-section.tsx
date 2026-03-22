"use client";

import { ServiceCard } from "@/components/ui/service-card";
import { FadeIn } from "@/components/ui/fade-in";

// Mock Data for Services
const services = [
  {
    segment: "Index Options",
    instrument: "Nifty & Bank Nifty",
    tradingStyle: "Intraday & Positional",
    deliveryMode: "Telegram / App Notification",
    riskDisclaimer: "High Risk. For experienced traders.",
  },
  {
    segment: "Stock Futures",
    instrument: "Top 200 F&O Stocks",
    tradingStyle: "Swing Trading (1-5 Days)",
    deliveryMode: "SMS / WhatsApp",
    riskDisclaimer: "Moderate to High Risk.",
  },
  {
    segment: "Equity Cash",
    instrument: "Bluechip & Large Cap",
    tradingStyle: "Short to Medium Term",
    deliveryMode: "Email / App",
    riskDisclaimer: "Moderate Risk. Capital allocation advice included.",
  },
  {
    segment: "Options Writing",
    instrument: "Index Options",
    tradingStyle: "Positional Hedged Strategies",
    deliveryMode: "Telegram Channel",
    riskDisclaimer: "Defined Risk. Margin required.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-background" id="services">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Our Core Research Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tailored research products designed to match your risk appetite and
            trading style. From active intraday setups to passive investment
            ideas.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
