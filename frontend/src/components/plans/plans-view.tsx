"use client";

import { PricingCard } from "@/components/ui/pricing-card";
import { FadeIn } from "@/components/ui/fade-in";
import { PlansApi } from "@/app/Api/Api";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

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

export function PlansView({ segmentSlug }: { segmentSlug?: string }) {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeSegment, setActiveSegment] = useState("All");

  const slugify = (text: string) => text.toLowerCase().replace(/ & /g, '-and-').replace(/\s+/g, '-').replace(/[^\w-]/g, '');

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

          // Handle slug matching
          if (segmentSlug) {
            const uniqueSegments = new Set<string>();
            uniqueSegments.add("All");
            mappedPlans.forEach((p: PlanData) => {
              const baseName = p.planName.split(/ — | \| /)[0].trim();
              uniqueSegments.add(baseName);
            });
            const segmentList = Array.from(uniqueSegments);
            const match = segmentList.find(s => slugify(s) === segmentSlug);
            if (match) setActiveSegment(match);
          }
        }
      } catch (error) {
        console.error("Critical API Error:", error);
        setPlans([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [segmentSlug]);

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
    <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
      {loading ? (
        <div role="status" aria-live="polite" className="flex flex-col items-center justify-center py-40">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-8 text-gray-700 dark:text-gray-300 font-black uppercase tracking-[0.3em] text-xs">
            Loading plans…
          </p>
        </div>
      ) : plans.length > 0 ? (
        <>
          <div className="flex flex-col items-center gap-12 mb-24">
            {!segmentSlug && (
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl">
                {segments.map((segment) => (
                  <Link
                    key={segment}
                    href={segment === "All" ? "/plans" : `/plans/${slugify(segment)}`}
                    aria-current={activeSegment === segment ? "page" : undefined}
                    className={`px-6 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.15em] transition-all duration-500 border ${
                      activeSegment === segment
                        ? "bg-primary text-secondary dark:bg-blue-300 dark:text-slate-950 border-primary dark:border-blue-300 shadow-[0_15px_30px_-10px_rgba(var(--primary-rgb),0.5)] scale-105"
                        : "bg-white/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-primary/40 hover:text-foreground backdrop-blur-md"
                    }`}
                    suppressHydrationWarning
                  >
                    {segment}
                  </Link>
                ))}
              </div>
            )}

            {!segmentSlug && (
              <div aria-hidden="true" className="h-px w-32 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            )}

            <div className="flex justify-center overflow-x-auto scrollbar-hide w-full">
              <div className="inline-flex items-center p-2 bg-gray-100 dark:bg-white/5 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-inner">
                {durations.map((month) => (
                  <button
                    key={month}
                    type="button"
                    aria-pressed={activeTab === month}
                    onClick={() => setActiveTab(month)}
                    className={`px-10 py-5 md:px-14 md:py-6 rounded-[2.2rem] text-xs md:text-sm font-black transition-all duration-700 whitespace-nowrap relative overflow-hidden group/tab ${
                      activeTab === month
                        ? "bg-primary text-secondary dark:bg-blue-300 dark:text-slate-950 shadow-2xl shadow-primary/40 scale-105 z-10"
                        : "text-gray-600 dark:text-gray-400 hover:text-foreground hover:bg-white/5"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-14 max-w-6xl mx-auto items-stretch min-h-[500px]">
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan, index) => (
                <FadeIn key={`${activeTab}-${plan.planName}-${index}`} delay={index * 0.05}>
                  <PricingCard {...plan} />
                </FadeIn>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 glass rounded-[3rem] border-dashed border-2 border-primary/20">
                <p className="text-gray-600 dark:text-gray-400 font-black uppercase tracking-widest text-sm">No plans matching this criteria</p>
                <Link 
                  href="/plans"
                  className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-primary dark:bg-blue-800 hover:text-white transition-all"
                  suppressHydrationWarning
                >
                  Reset Results
                </Link>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-40 glass rounded-[4rem] text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-black mb-4">No Plans Found</h3>
          <p className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
            We couldn't retrieve any active plans from the server at this moment. 
          </p>
        </div>
      )}
    </div>
  );
}
