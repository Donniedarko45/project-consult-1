"use client";

import { DisclaimerStrip } from "@/components/sections/disclaimer-strip";
import { FadeIn } from "@/components/ui/fade-in";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { PageHeader } from "@/components/layout/page-header";
import { 
  Zap, Moon, TrendingUp, Activity, CheckCircle, 
  Compass, LineChart, BarChart, GraduationCap, Presentation,
  ArrowRight, Shield, Target, BookOpen, ChevronRight, Check
} from "lucide-react";
import Link from "next/link";

const setups = [
  {
    id: "01",
    title: "Intraday Research Setups",
    description: "Get access to real-time market opportunities with clearly defined levels.",
    features: [
      "High-probability intraday setups",
      "Entry, target & risk zones (level-based)",
      "Momentum-driven opportunities"
    ],
    idealFor: "Designed for traders who seek quick market movements with structured execution",
    icon: Zap,
    href: "/services/intraday"
  },
  {
    id: "02",
    title: "BTST / STBT Setups",
    description: "Capture overnight momentum opportunities without watching the market all day.",
    features: [
      "Short-term carry-forward setups",
      "Momentum-based stock selection",
      "Clear levels for tracking"
    ],
    idealFor: "Ideal for working professionals and part-time traders",
    icon: Moon,
    href: "/services/btst"
  },
  {
    id: "03",
    title: "Swing / Positional Setups",
    description: "Identify short-term opportunities (1–10 days) with strong potential.",
    features: [
      "Breakout & pullback setups",
      "Structured entry and exit zones",
      "Trend-based opportunities"
    ],
    idealFor: "Perfect balance of risk and reward",
    icon: TrendingUp,
    href: "/services/swing"
  },
  {
    id: "04",
    title: "Derivatives (F&O) Research",
    description: "Advanced setups in index and stock derivatives.",
    features: [
      "Options-based strategies",
      "Breakout & reversal setups",
      "Market structure-based analysis"
    ],
    idealFor: "Suitable for traders looking for high-impact opportunities",
    icon: Activity,
    href: "/services/derivatives"
  },
  {
    id: "05",
    title: "High-Conviction Setups (Premium)",
    description: "Access limited, high-quality opportunities filtered through strong research.",
    features: [
      "Only top setups with high clarity",
      "Focus on quality over quantity",
      "Strong risk-reward opportunities"
    ],
    idealFor: "Built for traders who prefer precision over volume",
    icon: CheckCircle,
    href: "/services/high-conviction"
  },
  {
    id: "06",
    title: "Market Direction & Key Levels",
    description: "Stay aligned with the overall market trend.",
    features: [
      "Daily market bias (Bullish / Bearish / Sideways)",
      "Key levels for Nifty & Bank Nifty",
      "Directional clarity before trading"
    ],
    idealFor: "Helps you trade with confidence, not confusion",
    icon: Compass,
    href: "/services/market-direction"
  },
  {
    id: "07",
    title: "Cash Market (Equity) Intraday Setups",
    description: "Trade in the cash segment with controlled risk exposure.",
    features: [
      "Equity-based intraday opportunities",
      "Clearly defined levels",
      "No leverage-based approach"
    ],
    idealFor: "Best suited for beginners and conservative traders",
    icon: LineChart,
    href: "/services/cash-intraday"
  },
  {
    id: "08",
    title: "Equity Swing / Positional Setups",
    description: "Short-term stock opportunities with structured analysis.",
    features: [
      "2–15 day positional setups",
      "Breakout and continuation patterns",
      "Clear tracking levels"
    ],
    idealFor: "Ideal for steady and less stressful trading",
    icon: BarChart,
    href: "/services/equity-swing"
  },
  {
    id: "09",
    title: "Courses & Training Programs",
    description: "Learn how to approach the market with structure and discipline.",
    features: [
      "Beginner to advanced trading concepts",
      "Technical analysis & price action",
      "Real-market case studies"
    ],
    idealFor: "Build skills to become an independent trader",
    icon: GraduationCap,
    href: "https://ashwinitradingacademy.com/"
  },
  {
    id: "10",
    title: "Workshops",
    description: "Interactive sessions designed to simplify the stock market.",
    features: [
      "Live market understanding",
      "Practical trading insights",
      "Beginner-friendly explanations"
    ],
    idealFor: "Perfect starting point for new traders",
    icon: Presentation,
    href: "https://ashwinitradingacademy.com/"
  }
];

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background relative overflow-hidden">
      <FloatingIcons />
      <PageHeader
        title="Research-Driven Market Opportunities"
        description="We provide high-probability, research-based market setups designed to help traders understand opportunities with clarity and structure. Our services are built on discipline, risk management, and real-time market analysis, ensuring you stay aligned with market movements."
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {setups.map((setup, index) => {
            const Icon = setup.icon;
            return (
              <FadeIn key={setup.id} delay={index * 0.05}>
                <div className="group relative h-full bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl-strong transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
                  <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary via-blue-400 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  
                  <div className="p-8 flex flex-col grow relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white shadow-inner">
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <span className="text-4xl font-black text-gray-500 dark:text-gray-500 tracking-tighter">
                        {setup.id}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                      {setup.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {setup.description}
                    </p>

                    <div className="space-y-3 mb-8 grow">
                      {setup.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-primary" aria-hidden="true" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-white/5 mt-auto space-y-4">
                      <div className="flex gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl text-[12px] text-primary dark:text-blue-300 items-start border border-primary/10 dark:border-primary/20 group-hover:border-primary/30 transition-all">
                        <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                        <p className="font-bold leading-relaxed">{setup.idealFor}</p>
                      </div>
                      
                      <Link 
                        href={setup.href}
                        aria-label={`Explore ${setup.title}`}
                        className="flex items-center justify-between w-full p-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all group/link"
                        suppressHydrationWarning
                      >
                        Explore Dedicated Page
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 border-t border-gray-200 dark:border-gray-800">
        <section aria-labelledby="why-choose-us-heading" className="grid md:grid-cols-2 gap-12 items-center mt-8">
          <FadeIn direction="right">
            <h2 id="why-choose-us-heading" className="text-3xl md:text-4xl font-black text-foreground mb-6">
              Why Choose Us <span className="text-primary">🔥</span>
            </h2>
            <div className="space-y-4">
              {[
                { text: "Research-backed, structured approach", icon: Shield },
                { text: "Focus on clarity, not quantity", icon: Target },
                { text: "Strong emphasis on risk management", icon: Shield },
                { text: "Transparent and disciplined methodology", icon: BookOpen }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-base font-bold text-gray-800 dark:text-gray-200">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </FadeIn>
          
          <FadeIn direction="left" className="relative z-10 bg-primary dark:bg-blue-800 hover:bg-primary/90 transition-colors p-8 md:p-12 rounded-3xl text-white text-center shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <h3 className="relative z-10 text-3xl md:text-4xl font-black mb-4">🚀 Take the Next Step</h3>
            <p className="relative z-10 text-lg text-white/90 mb-8 font-medium">
              Join now and experience research-driven trading with clarity and confidence
            </p>
            <Link
              href="/signup"
              aria-label="Get started - sign up"
              className="relative z-10 inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-black text-lg hover:bg-gray-50 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 pointer-events-none" aria-hidden="true" />
            </Link>
          </FadeIn>
        </section>
      </div>

      <div className="container mx-auto px-4 pb-16 text-center relative z-10 pt-16">
        <FadeIn>
          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-900/30 inline-block max-w-3xl mx-auto shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <h4 className="text-lg font-black text-orange-800 dark:text-orange-400">Important Note</h4>
            </div>
            <p className="text-orange-800 dark:text-orange-300 font-medium">
              All services are provided strictly for educational and research purposes only.
              We do not provide guaranteed returns or personalized investment advice.
            </p>
          </div>
        </FadeIn>
      </div>

      <DisclaimerStrip />
    </main>
  );
}

