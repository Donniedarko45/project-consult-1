"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Calculator, Percent, BarChart2, Activity } from "lucide-react";

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Traders Toolbox"
        description="Essential calculators and scanners to sharpen your trading edge."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Margin Calculator",
              icon: Calculator,
              desc: "Check required margin for F&O strategies.",
            },
            {
              title: "Brokerage Estimator",
              icon: Percent,
              desc: "Calculate exact net profit after taxes & charges.",
            },
            {
              title: "Pivot Points",
              icon: BarChart2,
              desc: "Standard, Fibonacci & Camarilla pivot levels.",
            },
            {
              title: "Volatility Scanner",
              icon: Activity,
              desc: "Find high IV stocks for option selling.",
            },
          ].map((tool, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group h-full">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-500">{tool.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
