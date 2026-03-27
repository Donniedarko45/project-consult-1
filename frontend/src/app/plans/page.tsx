"use client";

import { PricingCard } from "@/components/ui/pricing-card";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { FadeIn } from "@/components/ui/fade-in";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { PageHeader } from "@/components/layout/page-header";
import { TelegramPromo } from "@/components/sections/telegram-promo";

import { useState, useEffect } from "react";
import { PlansApi } from "@/app/Api/Api";

const mockPlans = [
  {
    planName: "Equity Cash",
    price: "₹5,999",
    originalPrice: "₹7,999",
    discount: "25%",
    duration: "Monthly",
    servicesIncluded: [
      "Intraday Cash Calls",
      "Short-term Swing Ideas",
      "Large Cap Focus",
      "Dedicated WhatsApp Support",
    ],
    deliveryMode: "WhatsApp",
  },
  {
    planName: "Index F&O",
    price: "₹14,999",
    originalPrice: "₹19,999",
    discount: "25%",
    duration: "Monthly",
    servicesIncluded: [
      "Nifty & Bank Nifty Options",
      "High Probability Setups",
      "Advanced Hedging Strategies",
      "Priority Telegram Support",
    ],
    deliveryMode: "Telegram",
    isPopular: true,
  },
  {
    planName: "Platinum Combo",
    price: "₹24,999",
    originalPrice: "₹34,999",
    discount: "30%",
    duration: "Monthly",
    servicesIncluded: [
      "Equity + Index F&O",
      "Personal Portfolio Review",
      "One-on-One Interaction",
      "Early Access to Research",
    ],
    deliveryMode: "Priority Channel",
  },
];

interface PlanData {
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

const mapPlanToCardProps = (plan: any): PlanData => ({
  planId: plan.id || plan.planId,
  planName: plan.name || plan.planName || plan.title || "Unknown Plan",
  duration: plan.duration || `${plan.durationMonths} Month${plan.durationMonths > 1 ? 's' : ''}` || "N/A",
  price: plan.price ? (typeof plan.price === 'string' && plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`) : "Contact for Price",
  originalPrice: plan.originalPrice,
  discount: plan.discount,
  servicesIncluded: plan.servicesIncluded || plan.features || (plan.description ? [plan.description] : []),
  deliveryMode: plan.deliveryMode || "Standard",
  isPopular: plan.isPopular || false,
  riskDisclaimer: plan.riskDisclaimer,
});

export default function PlansPage() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await PlansApi.getAllPlans() as any;
        const apiPlans = Array.isArray(data) ? data : data.data || [];

        const sourcePlans = apiPlans.length > 0 ? apiPlans : mockPlans;
        const mappedPlans = sourcePlans.map(mapPlanToCardProps);
        setPlans(mappedPlans);
      } catch (error) {
        console.warn("Failed to fetch plans, using mock data.", error);
        setPlans(mockPlans.map(mapPlanToCardProps));
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <FloatingIcons />
      <PageHeader
        title="Choose Your Research Edge"
        description="Select a professional subscription plan tailored to your trading frequency and risk tolerance."
      />

      <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">Synchronizing Plans...</p>
            </div>
          ) : (
            plans.map((plan, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <PricingCard {...plan} />
              </FadeIn>
            ))
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16 text-center relative z-10">
        <FadeIn delay={0.2}>
          <div className="max-w-2xl mx-auto p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
              <span className="text-primary mr-2">Refund Policy:</span> 
              Fees once paid are non-refundable. Please read the terms and conditions carefully.
            </p>
          </div>
        </FadeIn>
      </div>

      <TelegramPromo />
      <DisclaimerStrip />
    </main>
  );
}
