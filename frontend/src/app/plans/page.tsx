import { PlansView } from "@/components/plans/plans-view";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FloatingIcons } from "@/components/ui/floating-icons";

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-sans">
      <FloatingIcons />
      <PageHeader 
        title="Predictive Research. Structured Execution."
        description="Choose a research segment that fits your risk profile and trading style. All our research is backed by proprietary institutional models and strict SEBI guidelines."
      />
      
      <PlansView />

      <DisclaimerStrip />
      <Footer />
    </main>
  );
}
