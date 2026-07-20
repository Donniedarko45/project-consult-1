import { PlansView } from "@/components/plans/plans-view";
import { Footer } from "@/components/layout/footer";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { PageHeader } from "@/components/layout/page-header";
import { FloatingIcons } from "@/components/ui/floating-icons";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Plans",
  description: "Compare our research subscription plans and pricing.",
};

export default function PlansPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-background relative overflow-hidden font-sans">
      <FloatingIcons />
      <PageHeader 
        title="Predictive Research. Structured Execution."
        description="Choose a research segment that fits your risk profile and trading style. All our research is backed by proprietary institutional models and strict SEBI guidelines."
      />
      
      <PlansView />

      <DisclaimerStrip />
    </main>
    <Footer />
    </>
  );
}
