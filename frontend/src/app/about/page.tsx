"use client";

import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingIcons } from "@/components/ui/floating-icons";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Target,
  ShieldCheck,
  Building2,
  Twitter,
  Linkedin,
  CheckCircle,
  Lightbulb,
  Award,
  BookOpen,
  LineChart
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingIcons />

      <PageHeader
        title={
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/images/Ashwini SD.png"
              alt="Ashwini SD Logo"
              width={100}
              height={100}
              className="w-24 h-24 object-contain animate-fade-in"
            />
            <span>About Us</span>
          </div>
        }
        description="Delivering institutional-quality research and market insights."
      />

      {/* Stats Section with Animated Counters */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Exp", value: 10, suffix: "+" },
              { label: "Active Clients", value: 120, suffix: "+" },
              {
                label: "Assets Advised",
                value: 15,
                prefix: "₹",
                suffix: " Cr+",
              },
              { label: "Team Strength", value: 45, suffix: "+" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-4">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-16 mb-24">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-12">
            <section>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  Reg. No: INH000024453
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground leading-tight">
                  SEBI Registered <span className="text-primary">Research Analyst</span>
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                  We are a SEBI Registered Research Analyst firm dedicated to delivering institutional-quality research and market insights to traders and investors.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  With a strong foundation in finance and market expertise, our focus is to bring clarity, structure, and discipline into the way individuals approach the stock market.
                </p>
              </FadeIn>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <FadeIn delay={0.1}>
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Our Philosophy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  In an environment driven by noise and speculation, we stand for clarity over chaos. Our research is built on:
                </p>
                <ul className="space-y-4">
                  {[
                    "Structured market analysis rooted in price action and technical frameworks",
                    "Identification of high-probability opportunities with defined risk parameters",
                    "A disciplined focus on capital preservation and risk management",
                    "Decision-making guided by data, not emotion"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-gray-700 dark:text-gray-300 font-semibold italic border-l-4 border-primary pl-4">
                  We believe that long-term success in the market comes from consistency, patience, and disciplined execution.
                </p>
              </FadeIn>
            </section>

            <section>
              <FadeIn delay={0.2}>
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Compliance & Transparency
                </h3>
                <ul className="space-y-4">
                  {[
                    "Registered and operating under SEBI Research Analyst regulations",
                    "Committed to complete transparency and ethical practices",
                    "No assured returns or guaranteed outcomes",
                    "Full disclosure of any conflicts of interest, if applicable"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                      <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </section>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 w-full space-y-12">
            
            <FadeIn direction="left">
               <div className="bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-3xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full" />
                 <h3 className="text-2xl font-bold mb-2 text-foreground">Founder</h3>
                 <h2 className="text-4xl font-black text-primary mb-2">Ashwini SD</h2>
                 <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider leading-relaxed">
                   SEBI REGISTERED RESEARCH ANALYST | MBA | <a href="/images/certificate.png" target="_blank" className="text-blue-500 hover:text-blue-600 underline underline-offset-4 transition-colors cursor-pointer inline-flex items-center gap-1"><Award className="w-4 h-4" /> NISM Certified</a> | Market Professional
                 </p>
                 <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                   <p>
                     Ashwini SD is a finance professional and market practitioner with extensive experience in the Indian stock market.
                   </p>
                   <p>
                     With a strong academic background and practical market exposure, she brings a unique blend of analytical expertise and real-market understanding.
                   </p>
                   <div className="pl-4 border-l-2 border-primary/50 space-y-2 py-2">
                     <p className="font-semibold text-foreground">Her approach is centered around:</p>
                     <ul className="list-disc list-inside space-y-1">
                       <li>Building structured trading frameworks</li>
                       <li>Simplifying complex market movements into actionable insights</li>
                       <li>Promoting discipline and risk-aware decision making</li>
                     </ul>
                   </div>
                   <p className="font-medium italic border-t border-gray-200 dark:border-gray-800 pt-6">
                     She believes that the true edge in trading does not come from prediction, but from process, patience, and consistency.
                   </p>
                 </div>
               </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 shadow-xl p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                  <LineChart className="w-6 h-6 text-primary" />
                  What We Deliver
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Equity (Cash Market) Research Setups",
                    "Intraday & Swing Trading Opportunities",
                    "Derivatives (F&O) Analysis",
                    "Market Direction & Key Levels",
                    "Breakout & Momentum-Based Setups"
                  ].map((service, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300" style={{lineHeight: 1.5}}>
                      {service}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                  All services are strictly for educational and research purposes only, in line with regulatory standards.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
               <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-gray-800 text-center shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent pointer-events-none" />
                 <Lightbulb className="w-10 h-10 text-yellow-500 mx-auto mb-6" />
                 <h3 className="text-xl font-bold mb-4 text-white">Our Belief</h3>
                 <p className="text-lg md:text-xl text-gray-300 italic font-serif leading-relaxed">
                   "Markets reward discipline, not impulse. Our role is to bring structure to your decisions."
                 </p>
               </div>
            </FadeIn>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="mb-32">
          <FadeIn>
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground tracking-tight">
                Our <span className="text-primary italic">Journey</span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            {/* Background connecting line for desktop */}
            <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent -z-10" />

            {[
              {
                year: "2012",
                title: "Inception",
                desc: "Founded in 2012, built on a passion for understanding market behavior and delivering structured financial insights.",
                icon: <TrendingUp className="w-6 h-6" />,
                color: "bg-blue-500",
              },
              {
                year: "2018",
                title: "Full-Time Operation",
                desc: "Transitioned into full-time operations in 2018, focusing on disciplined research and consistent market engagement.",
                icon: <Building2 className="w-6 h-6" />,
                color: "bg-indigo-500",
              },
              {
                year: "2025",
                title: "SEBI Registered RA",
                desc: "Recognized as a SEBI Registered Research Analyst in 2025, reinforcing our commitment to transparency, compliance, and ethical research practices.",
                icon: <ShieldCheck className="w-6 h-6" />,
                color: "bg-emerald-500",
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="group relative h-full">
                  {/* Card */}
                  <div className="bg-white dark:bg-gray-900/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 dark:border-gray-800/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col items-center text-center">
                    
                    {/* Year Badge */}
                    <div className={`mb-6 p-4 rounded-2xl ${item.color} text-white shadow-xl shadow-${item.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-500`}>
                      {item.icon}
                    </div>

                    <div className="space-y-3">
                      <span className="text-sm font-black text-primary/60 dark:text-blue-400/60 uppercase tracking-widest">{item.year}</span>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed italic">
                        "{item.desc}"
                      </p>
                    </div>

                    {/* Decorative dot for the line */}
                    <div className="hidden lg:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-800 border-4 border-gray-50 dark:border-gray-950 group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="mb-10">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Our Core Team
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ashwini SD",
                role: "Founder & SEBI Registered Research Analyst",
                exp: "10+ Years Experience",
              },
              {
                name: "Surya S",
                role: "Head of Research Equity",
                exp: "10+ Years Experience",
              },
              {
                name: "Shiva",
                role: "Sr. Technical Analyst",
                exp: "6+ Years Experience",
              },
            ].map((member, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/80 to-blue-600/80 opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4 text-white">
                      <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-200" />
                      <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-200" />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/50" />
                    </div>
                  </div>
                  <div className="p-6 text-center relative flex-grow flex flex-col items-center">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-gray-900 rounded-full p-1 shadow-xl">
                      <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col h-full w-full items-center justify-between">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary font-medium text-sm min-h-[40px] flex items-center justify-center">
                          {member.role}
                        </p>
                      </div>
                      <span className="inline-block px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest border border-gray-100 dark:border-gray-700 w-max">
                        {member.exp}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
