"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Zap, Monitor, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SmallCaseApi } from "@/app/Api/Api";

export default function SmallCasePage() {
  const [smallCases, setSmallCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSmallCases = async () => {
      try {
        const data: any = await SmallCaseApi.getAll();
        setSmallCases(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch small cases", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSmallCases();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Small Case Collections"
        description="Theme-based investment baskets managed by experts. Invest in ideas, not just stocks."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div>Loading...</div>
          ) : (
            smallCases.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 hover:border-primary/50 transition-colors h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${
                        item.bg || "bg-blue-500/10"
                      } flex items-center justify-center ${
                        item.color || "text-blue-500"
                      }`}
                    >
                      {/* Placeholder icon or dynamic icon logic */}
                      <Monitor className="w-7 h-7" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {item.risk || "Medium"} Risk
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1">
                    {item.desc || item.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">
                        3Y CAGR
                      </p>
                      <p
                        className={`text-xl font-bold ${
                          item.color || "text-blue-500"
                        }`}
                      >
                        {item.cagr || "N/A"}
                      </p>
                    </div>
                    <Link
                      href="#"
                      className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))
          )}
        </div>

        <div className="mt-20 bg-primary rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <Zap className="w-12 h-12 mx-auto mb-6 text-yellow-300 fill-current" />
            <h2 className="text-3xl font-bold mb-6">
              Why Invest via Small Case?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Simple, transparent, and low-cost. You hold the shares in your own
              Demat account. Rebalance with a single click.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              View All Small Cases
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
