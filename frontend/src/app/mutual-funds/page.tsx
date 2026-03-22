"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Calculator, PieChart, Info } from "lucide-react";
import { SipCalculator } from "@/components/features/sip-calculator";

export default function MutualFundsPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Mutual Fund Advisory"
        description="Expert selection of top-rated funds aligned with your financial goals. SIP your way to wealth."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24 items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Why Active Advisory?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              With over 2,500 mutual fund schemes, choosing the right one is
              overwhelming. We analyze fund manager track records, expense
              ratios, AND portfolio overlap to build a lean, high-performance
              portfolio for you.
            </p>
            <ul className="space-y-4">
              {[
                "Zero Commission (Direct Plans)",
                "Goal Based Planning",
                "Quarterly Rebalancing",
                "Tax Harvesting",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2} className="relative w-full">
            <SipCalculator />
          </FadeIn>
        </div>
      </div>
      <Footer />
    </main>
  
  );
}
