"use client";

import { ServiceCard } from "@/components/ui/service-card";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { FadeIn } from "@/components/ui/fade-in";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import Image from "next/image";

import { useState, useEffect } from "react";
import { ServiceApi } from "@/app/Api/Api";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mockServices = [
    {
      segment: "Equity Cash",
      instrument: "Intraday & Short Term",
      tradingStyle: "Techno-Funda Analysis",
      deliveryMode: "WhatsApp / SMS",
      riskDisclaimer: "Moderate Risk - Suitable for active traders.",
    },
    {
      segment: "Derivatives",
      instrument: "Nifty & BankNifty Options",
      tradingStyle: "Scalping & Positional",
      deliveryMode: "Telegram Channel",
      riskDisclaimer: "High Risk - For experienced traders only.",
    },
    {
      segment: "Commodity",
      instrument: "Crude Oil & Gold",
      tradingStyle: "Swing Trading",
      deliveryMode: "App Notifications",
      riskDisclaimer: "High Volatility - Strict Stop Loss Required.",
    },
    {
      segment: "Investment",
      instrument: "Long Term Portfolio",
      tradingStyle: "Fundamental Growth Investing",
      deliveryMode: "Quarterly Reports",
      riskDisclaimer: "Low Risk - For wealth creation.",
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data: any = await ServiceApi.getAllServices();
        const apiServices = Array.isArray(data) ? data : data.data || [];
        if (apiServices.length > 0) {
          setServices(apiServices);
        } else {
          setServices(mockServices);
        }
      } catch (error) {
        console.warn("Failed to fetch services, using mock data.", error);
        setServices(mockServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FloatingIcons />
      <PageHeader
        title="Our Research Services"
        description="Professionally managed research services designed to meet diverse trading goals. Choose the plan that fits your risk profile."
      />

      {/* Introduction with Image */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2 space-y-6">
            <FadeIn>
              <h2 className="text-3xl font-bold text-foreground">
                Strategies for Every Trader
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Whether you are an aggressive intraday trader or a conservative
                long-term investor, we have a research product tailored for you.
                Our strategies are back-tested and deployed with strict risk
                management protocols.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 rounded-lg font-medium text-sm">
                  SEBI Regulated
                </div>
                <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg font-medium text-sm">
                  Verified Performance
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="lg:w-1/2">
            <FadeIn direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-500 border-4 border-white dark:border-gray-800 h-[250px] md:h-[400px] w-full">
                <Image
                  src="/images/services-hero.png"
                  alt="Trading Services Growth"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-20">
              Loading services...
            </div>
          ) : (
            services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <ServiceCard {...service} />
              </FadeIn>
            ))
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 text-center relative z-10">
        <FadeIn>
          <p className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <strong>Note:</strong> We do not provide profit sharing services or
            guaranteed return plans. Please be aware of unauthorized entities
            claiming to be associated with us.
          </p>
        </FadeIn>
      </div>

      <DisclaimerStrip />
    </main>
  );
}
