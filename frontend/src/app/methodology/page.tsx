import { Footer } from "@/components/layout/footer";
import { BarChart, Search, Activity, PieChart } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Research Methodology"
        description="Our systematic, data-driven approach to analyzing the markets and parsing signal from noise."
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Intro Section with Image */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <Image
                  src="/images/research-hero.png"
                  alt="Data Driven Research"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-medium text-lg">
                    "We don't guess. We analyze."
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <FadeIn>
              <h2 className="text-3xl font-bold text-foreground">
                The Power of Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                In a market driven by emotions, we rely on cold, hard data. Our
                proprietary research models combine technical precision with
                fundamental context to identify high-probability setups.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </span>
                  <span className="font-medium text-foreground">
                    Data Collection
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    2
                  </span>
                  <span className="font-medium text-foreground">
                    Pattern Recognition
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    3
                  </span>
                  <span className="font-medium text-foreground">
                    Risk Assessment
                  </span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn className="h-full">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-14 h-14 bg-primary/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-primary dark:text-blue-400">
                <BarChart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Technical Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We primarily use Technical Analysis to identify trends. This
                involves studying price action, chart patterns, and various
                indicators:
              </p>
              <ul className="space-y-3">
                {[
                  "Trend Analysis (Support & Resistance)",
                  "Momentum Indicators (RSI, ADX)",
                  "Volume Profile Analysis",
                  "Multi-timeframe confirmation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 rounded-sm bg-cta" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn className="h-full" delay={0.1}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-14 h-14 bg-primary/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-primary dark:text-blue-400">
                <Search className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Fundamental Context
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                We align our technical setups with the broader fundamental
                context to ensure higher probability of success:
              </p>
              <ul className="space-y-3">
                {[
                  "Macroeconomic Data (GDP, Inflation)",
                  "Corporate Earnings Results",
                  "Global Market Cues",
                  "Sectoral Rotation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 rounded-sm bg-cta" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn className="h-full" delay={0.2}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-14 h-14 bg-primary/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-primary dark:text-blue-400">
                <Activity className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Risk Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                The cornerstone of our methodology. No trade is generated
                without a clearly defined risk protocol:
              </p>
              <ul className="space-y-3">
                {[
                  "Strict Stop Loss levels",
                  "Proper Position Sizing",
                  "Trailing Stop Losses",
                  "Event Risk Avoidance",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 rounded-sm bg-cta" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn className="h-full" delay={0.3}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="w-14 h-14 bg-primary/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-primary dark:text-blue-400">
                <PieChart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Data Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We utilize proprietary data models to track FII/DII activity,
                Open Interest (OI) build-up, and option chain analysis. This
                helps us gauge market sentiment before it reflects on the price.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </main>
  
  );
}
