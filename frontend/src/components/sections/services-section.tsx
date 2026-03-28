"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { TrendingUp, BarChart2, Zap, ShieldCheck, PieChart, ArrowRight, Send } from "lucide-react";

const services = [
  {
    icon: BarChart2,
    num: "01",
    title: "Index Futures & Options",
    tagline: "Trade Nifty, Sensex, Bank Nifty & Fin Nifty with precision",
    features: [
      "Nifty, Sensex, Bank Nifty & Fin Nifty Intraday Setups",
      "Clear Entry, Exit & Stop Loss",
      "Options Data (OI, PCR, Sentiment)",
      "Expiry Day Special Strategies",
    ],
    note: "Designed for traders who want fast-moving opportunities with structured execution",
    telegramLink: "https://t.me/indexfuturesandoptions",
  },
  {
    icon: TrendingUp,
    num: "02",
    title: "Stock Futures & Options",
    tagline: "Capture strong moves in high-potential stocks",
    features: [
      "Stock Options & Futures Setups",
      "Breakout & Trend-Based Trades",
      "Swing & Positional Opportunities",
      "Risk-Managed Strategies",
    ],
    note: "Ideal for traders looking beyond index and targeting stock-specific moves",
    telegramLink: "https://t.me/stockfuturesandoptions",
  },
  {
    icon: Zap,
    num: "03",
    title: "Hero Zero Expiry Premium",
    tagline: "Maximize opportunities on expiry day with expert strategies",
    features: [
      "Special Expiry Day Setups",
      "High-Probability Scalping Opportunities",
      "Real-Time Updates During Market Hours",
      "Strict Risk Management",
    ],
    note: "Built for traders who want to take advantage of expiry volatility with discipline",
    telegramLink: "https://t.me/herozeropremiumtrades",
    highlight: true,
  },
  {
    icon: ShieldCheck,
    num: "04",
    title: "Index Option Selling",
    tagline: "Earn consistently with low-risk, high-probability strategies",
    features: [
      "Nifty & Bank Nifty Option Selling",
      "Hedged Strategies (Risk Defined)",
      "Theta Decay-Based Income Approach",
      "Positional & Intraday Strategies",
    ],
    note: "Perfect for traders who prefer consistency over high-risk trading",
    telegramLink: "https://t.me/indexoptionsellingtrades",
  },
  {
    icon: PieChart,
    num: "05",
    title: "Equity Cash | Multibagger Picks",
    tagline: "Build wealth with carefully researched stock selections",
    features: [
      "Short-Term Swing Picks",
      "Long-Term Multibagger Opportunities",
      "Sector-Based Stock Selection",
      "Portfolio Growth Strategy",
    ],
    note: "Ideal for investors who want to grow capital with smart stock selection",
    telegramLink: "https://t.me/equitycashmultibaggerstock",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden" id="services">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] -z-1" />

      <div className="container mx-auto px-6">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Advisory Services
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
            Our Core <span className="text-primary italic">Research Services</span>
          </h2>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Choose your segment. Trade with clarity. Grow with confidence.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className={`group relative h-full rounded-3xl p-8 border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${service.highlight ? "bg-primary text-white border-primary shadow-2xl shadow-primary/20" : "bg-white dark:bg-gray-950 border-gray-100 dark:border-white/10"}`}>
                {service.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    🔥 Premium
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.highlight ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${service.highlight ? "text-white/60" : "text-primary/60"}`}>
                      {service.num}
                    </span>
                  </div>

                  <div>
                    <h3 className={`text-xl font-black mb-1 ${service.highlight ? "text-white" : "text-foreground"}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs font-semibold ${service.highlight ? "text-white/70" : "text-primary"}`}>
                      {service.tagline}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm font-medium ${service.highlight ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${service.highlight ? "bg-white" : "bg-primary"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className={`text-xs italic leading-relaxed ${service.highlight ? "text-white/60" : "text-gray-400"}`}>
                    👉 {service.note}
                  </p>

                  <Link
                    href={service.telegramLink}
                    target="_blank"
                    className={`mt-2 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-sm transition-all hover:scale-[1.02] ${
                      service.highlight
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    }`}
                    suppressHydrationWarning
                  >
                    <Send className="w-4 h-4" />
                    Join Channel
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-16">
          <Link
            href="/plans"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-primary/20 text-lg"
            suppressHydrationWarning
          >
            View Pricing Plans <ArrowRight className="w-6 h-6" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
