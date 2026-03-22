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
    planName: "Basic Equity",
    price: "₹5,999",
    duration: "1 Month",
    servicesIncluded: [
      "Intraday Equity Calls",
      "Daily Market Outlook",
      "Basic Email Support",
      "Entry & Exit Levels",
    ],
    deliveryMode: "WhatsApp",
    riskDisclaimer: "Standard equity market risks apply.",
  },
  {
    planName: "Silver Investment",
    price: "₹14,999",
    duration: "3 Months",
    servicesIncluded: [
      "Intraday + Positional Cash",
      "Short Term Delivery Ideas",
      "Weekly Portfolio Review",
      "Risk Management Guidance",
    ],
    deliveryMode: "WhatsApp",
  },
  {
    planName: "Gold F&O",
    price: "₹24,999",
    duration: "6 Months",
    servicesIncluded: [
      "Nifty & Bank Nifty Options",
      "Stock Options & Futures",
      "Hedging Strategies",
      "Live Market Support",
    ],
    deliveryMode: "WhatsApp + Telegram",
  },
  {
    planName: "Platinum Combo",
    price: "₹39,999",
    duration: "12 Months",
    servicesIncluded: [
      "Equity + F&O + Commodity",
      "BTST & STBT Calls",
      "Dedicated Relationship Manager",
      "Algo Trading Setup Assistance",
    ],
    deliveryMode: "Priority Telegram Channel",
  },
  {
    planName: "Commodity Special",
    price: "₹19,999",
    duration: "6 Months",
    servicesIncluded: [
      "Gold & Silver Outlook",
      "Crude Oil Strategies",
      "Base Metals inventory data",
      "Global Market Correlation",
    ],
    deliveryMode: "Telegram Channel",
  },
  {
    planName: "HNI Exclusive",
    price: "₹99,999",
    duration: "12 Months",
    servicesIncluded: [
      "High Conviction Trades",
      "One-on-One Consultation",
      "Portfolio Restructuring",
      "Pre-IPO Research Notes",
      "24/7 Priority Support",
    ],
    deliveryMode: "Personal Call + Priority Channel",
  },
];

const mapPlanToCardProps = (plan: any) => ({
  planId: plan.id || plan.planId,
  planName: plan.name || plan.planName || plan.title || "Unknown Plan",
  duration: plan.duration || `${plan.durationMonths} Month${plan.durationMonths > 1 ? 's' : ''}` || "N/A",
  price: plan.price ? (typeof plan.price === 'string' && plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`) : "Contact for Price",
  servicesIncluded: plan.servicesIncluded || plan.features || (plan.description ? [plan.description] : []),
  deliveryMode: plan.deliveryMode || "Standard",
  riskDisclaimer: plan.riskDisclaimer,
});

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data: any = await PlansApi.getAllPlans();
        const apiPlans = Array.isArray(data) ? data : data.data || [];

        const mappedPlans = (apiPlans.length > 0 ? apiPlans : mockPlans).map(
          mapPlanToCardProps,
        );
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
        title="Subscription Plans"
        description="Transparent pricing for professional research. Choose a plan that suits your trading needs."
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-20">
              Loading plans...
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

      <div className="container mx-auto px-4 pb-16 text-center relative z-10">
        <FadeIn delay={0.2}>
          <p className="text-sm text-gray-500">
            <strong>Refund Policy:</strong> Fees once paid are non-refundable.
            Please read the terms and conditions carefully.
          </p>
        </FadeIn>
      </div>

      <TelegramPromo />

      <DisclaimerStrip />
    </main>
  );
}
