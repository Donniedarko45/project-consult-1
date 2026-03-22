"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import {
  TrendingUp,
  Shield,
  PieChart,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function WealthManagementPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Wealth Management"
        description="Bespoke financial solutions for High Net Worth Individuals. We preserve and grow your legacy with institutional precision."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Value Proposition Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {[
            {
              icon: Shield,
              title: "Capital Preservation",
              desc: "Our primary focus is risk management. We ensure your core capital is protected against market anomalies.",
            },
            {
              icon: TrendingUp,
              title: "Sustainable Growth",
              desc: "Targeting consistent compounding returns that beat inflation and benchmarks over the long term.",
            },
            {
              icon: PieChart,
              title: "Asset Allocation",
              desc: "Dynamic diversification across Equity, Debt, Gold, and Alternatives based on macro cycles.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center hover:border-gold-500/30 transition-colors">
                <div className="w-16 h-16 mx-auto bg-primary/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-primary dark:text-white">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Services List */}
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">
              Our HNI Services
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {[
              "Portfolio Restructuring & Optimization",
              "Direct Equity Advisory (Long Term)",
              "Family Office Setup Assistance",
              "Tax Efficient Investment Planning",
              "Alternative Investment Funds (AIF) Selection",
            ].map((service, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.05}>
                <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-white hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-bold text-lg text-foreground">
                      {service}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <FadeIn delay={0.4}>
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary to-blue-600">
              <button className="px-10 py-4 bg-background rounded-full font-bold text-foreground hover:bg-transparent hover:text-white transition-all">
                Schedule a Portfolio Review
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Minimum portfolio size: ₹50 Lakhs
            </p>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </main>
 
  );
}
