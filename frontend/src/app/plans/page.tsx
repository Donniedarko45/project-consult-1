"use client";

import { PricingCard } from "@/components/ui/pricing-card";
import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { FadeIn } from "@/components/ui/fade-in";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { PageHeader } from "@/components/layout/page-header";
import { TelegramPromo } from "@/components/sections/telegram-promo";

import { useState, useEffect, useMemo } from "react";
import { PlansApi } from "@/app/Api/Api";

interface PlanData {
  planId?: string;
  planName: string;
  duration: string;
  durationMonths: number;
  price: string;
  originalPrice?: string;
  discount?: string;
  servicesIncluded: string[];
  deliveryMode: string;
  isPopular?: boolean;
  riskDisclaimer?: string;
}

const mapPlanToCardProps = (plan: any): PlanData => {
  // Extract number of months from duration string if durationMonths is missing
  const inferredMonths = typeof plan.duration === 'string' 
    ? (parseInt(plan.duration.match(/\d+/)?.[0] || "1")) 
    : 1;

  const dMonths = plan.durationMonths || inferredMonths;
  
  return {
    planId: plan.id || plan.planId || plan._id,
    planName: plan.name || plan.planName || plan.title || "Unknown Plan",
    duration: plan.duration || `${dMonths} Month${dMonths > 1 ? 's' : ''}`,
    durationMonths: dMonths,
    price: plan.price ? (typeof plan.price === 'string' && plan.price.startsWith('₹') ? plan.price : `₹${plan.price}`) : "Contact for Price",
    originalPrice: plan.originalPrice,
    discount: plan.discount,
    servicesIncluded: plan.servicesIncluded || plan.features || (plan.description ? [plan.description] : []),
    deliveryMode: plan.deliveryMode || "WhatsApp / Telegram",
    isPopular: plan.isPopular || false,
    riskDisclaimer: plan.riskDisclaimer,
  };
};

export default function PlansPage() {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeSegment, setActiveSegment] = useState("All");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await PlansApi.getAllPlans() as any;
        const apiPlans = Array.isArray(data) ? data : data.data || [];

        const mappedPlans = apiPlans.map(mapPlanToCardProps);
        setPlans(mappedPlans);
        
        if (mappedPlans.length > 0) {
          const availableDurations = Array.from(new Set<number>(mappedPlans.map((p: PlanData) => p.durationMonths))).sort((a, b) => a - b);
          setActiveTab(prev => prev || availableDurations[0]);
        }
      } catch (error) {
        console.error("Critical API Error:", error);
        setPlans([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Dynamically derive segments and durations from ACTUAL backend data
  const segments = useMemo(() => {
    const unique = new Set<string>();
    unique.add("All");
    plans.forEach((p: PlanData) => {
      const baseName = p.planName.split(/ — | \| /)[0].trim();
      unique.add(baseName);
    });
    return Array.from(unique);
  }, [plans]);

  const durations = useMemo(() => {
    return Array.from(new Set<number>(plans.map((p: PlanData) => p.durationMonths))).sort((a, b) => a - b);
  }, [plans]);

  const filteredPlans = plans.filter(plan => {
    const durationMatch = activeTab === null || plan.durationMonths === activeTab;
    const segmentMatch = activeSegment === "All" || plan.planName.startsWith(activeSegment);
    return durationMatch && segmentMatch;
  });

  return (
    <main className="min-h-screen bg-background relative overflow-hidden text-foreground">
      <FloatingIcons />
      <PageHeader
        title="Institutional Research Access"
        description="Access professionally managed research segments. Real-time data, verified strategies, and institutional-grade risk management."
      />

      <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="mt-8 text-gray-400 font-black uppercase tracking-[0.3em] text-xs animate-pulse">
              Hydrating Backend Data...
            </p>
          </div>
        ) : plans.length > 0 ? (
          <>
            {/* Dual Dynamic Filtering System */}
            <div className="flex flex-col items-center gap-12 mb-24">
              
            {/* Dynamic Segment Selection */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl">
              {segments.map((segment) => (
                <button
                  key={segment}
                  onClick={() => setActiveSegment(segment)}
                  className={`px-6 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 border ${
                    activeSegment === segment
                      ? "bg-primary text-secondary border-primary shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.5)] scale-105"
                      : "bg-white/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-primary/40 hover:text-foreground backdrop-blur-md"
                  }`}
                >
                  {segment}
                </button>
              ))}
            </div>

              <div className="h-px w-32 bg-linear-to-r from-transparent via-primary/30 to-transparent" />

              {/* Dynamic Duration Tabs */}
              <div className="flex justify-center overflow-x-auto scrollbar-hide w-full">
                <div className="inline-flex items-center p-2 bg-gray-100 dark:bg-white/5 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-inner">
                  {durations.map((month) => (
                    <button
                      key={month}
                      onClick={() => setActiveTab(month)}
                      className={`px-10 py-5 md:px-14 md:py-6 rounded-[2.2rem] text-xs md:text-sm font-black transition-all duration-700 whitespace-nowrap relative overflow-hidden group/tab ${
                        activeTab === month
                          ? "bg-primary text-secondary shadow-2xl shadow-primary/40 scale-105 z-10"
                          : "text-gray-500 hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span className="relative z-10">
                        {month} Month{month > 1 ? 's' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 max-w-7xl mx-auto items-stretch min-h-[500px]">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan, index) => (
                  <FadeIn key={`${activeTab}-${plan.planName}-${index}`} delay={index * 0.05}>
                    <PricingCard {...plan} />
                  </FadeIn>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-32 glass rounded-[3rem] border-dashed border-2 border-primary/20">
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No plans matching this criteria</p>
                  <button 
                    onClick={() => {setActiveSegment("All"); setActiveTab(durations[0] || null);}}
                    className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                  >
                    Reset Results
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 glass rounded-[4rem] text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-black mb-4">No Plans Found</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
              We couldn't retrieve any active plans from the server at this moment. 
              Please check back later or contact support.
            </p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 pb-24 text-center relative z-10">
        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto p-12 glass rounded-[3.5rem] border border-primary/20 bg-primary/5 dark:bg-primary/5">
            <h4 className="text-foreground font-black uppercase tracking-[0.2em] text-sm mb-8 flex items-center justify-center gap-3">
              <span className="text-xl">⚠️</span>
              Important Notes
            </h4>
            <div className="space-y-4 text-left max-w-xl mx-auto">
              {[
                "All plans are non-refundable",
                "Services are provided for educational & research purposes only",
                "No guaranteed returns"
              ].map((note, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 shadow-sm hover:border-primary/20 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]" />
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {note}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-primary/10">
              <p className="text-[9px] text-gray-400/80 font-bold uppercase tracking-widest leading-loose">
                SEBI Registered Research Analyst | Market Risk Disclosures Apply
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <TelegramPromo />
      <DisclaimerStrip />
    </main>
  );
}
