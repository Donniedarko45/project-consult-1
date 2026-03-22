"use client";

import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FloatingIcons } from "@/components/ui/floating-icons";
import Image from "next/image";
import {
  Award,
  TrendingUp,
  Users,
  Newspaper,
  Target,
  ShieldCheck,
  Building2,
  Twitter,
  Linkedin,
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
            <span>About Ashwini SD</span>
          </div>
        }
        description="Pioneering ethical, data-driven financial research since 2008."
      />

      {/* Stats Section with Animated Counters */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", value: 15, suffix: "+" },
              { label: "Active Clients", value: 50, suffix: "k+" },
              {
                label: "Assets Advised",
                value: 500,
                prefix: "₹",
                suffix: "Cr",
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
                <h2 className="text-3xl font-bold mb-6 text-primary dark:text-blue-400 flex items-center gap-3">
                  <span className="w-2 h-8 bg-cta rounded-full" />
                  Who We Are
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                  We are a{" "}
                  <strong className="text-foreground">Ashwini SD</strong>{" "}
                  (Registration No. INZ000000000) based in the financial hub of
                  Mumbai.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  With over a decade of experience, we specialize in separating
                  signal from noise. Our team comprises eager market
                  enthusiasts, certified technical analysts, and risk management
                  experts who believe in the power of{" "}
                  <span className="text-primary dark:text-blue-400 font-semibold">
                    discipline
                  </span>{" "}
                  and{" "}
                  <span className="text-primary dark:text-blue-400 font-semibold">
                    process
                  </span>{" "}
                  over random speculation.
                </p>
              </FadeIn>
            </section>

            <div className="grid sm:grid-cols-2 gap-8">
              <section>
                <FadeIn delay={0.1}>
                  <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-cta" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To democratize access to institutional-grade research. We
                    aim to provide clear, compliant, and objective analysis that
                    helps retail traders make informed decisions.
                  </p>
                </FadeIn>
              </section>
              <section>
                <FadeIn delay={0.2}>
                  <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cta" />
                    Our Vision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To be the most trusted Research Analyst firm in India, known
                    for integrity, accuracy, and an unwavering commitment to
                    risk management.
                  </p>
                </FadeIn>
              </section>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 w-full">
            <FadeIn direction="left" className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                <div className="relative h-[400px] w-full group">
                  <img
                    src="/images/trading_office_team.png"
                    alt="Our Trading Floor"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-8">
                  <p className="text-white font-medium italic border-l-4 border-cta pl-4">
                    &quot;Real research. Real results.&quot;
                  </p>
                </div>
              </div>

              {/* Decorative Elements around image */}
              <div className="absolute -z-10 top-10 -right-10 w-24 h-24 bg-cta/20 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
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
              <div className="w-24 h-1 bg-cta mx-auto rounded-full mb-6" />
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                From a small trading desk to a trusted SEBI Registered Research Analyst firm. 
                Our growth reflects our commitment to accuracy and transparency.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Background connecting line for desktop */}
            <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent -z-10" />

            {[
              {
                year: "2015",
                title: "Inception",
                desc: "Started as a small group of passionate traders analyzing Nifty & Bank Nifty.",
                icon: <TrendingUp className="w-6 h-6" />,
                color: "bg-blue-500",
              },
              {
                year: "2018",
                title: "Full-Time Operations",
                desc: "Expanded to a dedicated office in Mumbai with a core team of analysts.",
                icon: <Building2 className="w-6 h-6" />,
                color: "bg-indigo-500",
              },
              {
                year: "2021",
                title: "SEBI Registration",
                desc: "Achieved a major milestone by securing SEBI RA registration (INH000010000).",
                icon: <ShieldCheck className="w-6 h-6" />,
                color: "bg-emerald-500",
              },
              {
                year: "2024",
                title: "10,000+ Clients",
                desc: "Trusted by a growing community across India. Launched Algo-Ready research.",
                icon: <Users className="w-6 h-6" />,
                color: "bg-purple-500",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="group relative">
                  {/* Card */}
                  <div className="bg-white dark:bg-gray-900/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 dark:border-gray-800/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col items-center text-center">
                    
                    {/* Year Badge */}
                    <div className={`mb-6 p-4 rounded-2xl ${item.color} text-white shadow-xl shadow-${item.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-500`}>
                      {item.icon}
                    </div>

                    <div className="space-y-3">
                      <span className="text-sm font-black text-primary/60 dark:text-blue-400/60 uppercase tracking-widest">{item.year}</span>
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {item.desc}
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

        {/* Associated With & Partners */}
        <div className="mb-24 py-12 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
                Associated With & Platforms
              </h2>
            </FadeIn>

            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-400">
                  <Building2 className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm">SEBI</span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-orange-700 dark:text-orange-400">
                  <Award className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm">NISM Certified</span>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-700 hidden md:block" />
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-xl font-black text-gray-400 group-hover:text-green-600 transition-colors">
                  Zerodha
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-xl font-black text-gray-400 group-hover:text-blue-500 transition-colors">
                  Upstox
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-xl font-black text-gray-400 group-hover:text-indigo-600 transition-colors">
                  AngelOne
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* In The News */}
        <div className="mb-24">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground flex items-center justify-center gap-3">
              <Newspaper className="w-8 h-8 text-cta" />
              In The News
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                source: "MoneyControl",
                headline:
                  "Market Outlook 2024: Expert predictions on Nifty's next move.",
                date: "Dec 15, 2023",
              },
              {
                source: "Economic Times",
                headline:
                  "Rising Retail Participation: How SEBI RAs are guiding new investors.",
                date: "Jan 10, 2024",
              },
              {
                source: "CNBC TV18",
                headline:
                  "Risk Management in F&O: Interview with our Chief Strategist.",
                date: "Feb 05, 2024",
              },
            ].map((news, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="text-xs font-bold text-cta mb-2 uppercase tracking-wider">
                    {news.source}
                  </div>
                  <h3 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors">
                    {news.headline}
                  </h3>
                  <div className="text-sm text-gray-400">{news.date}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div>
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-cta" />
              Our Core Team
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Founder & Chief Strategist",
                exp: "15+ Years Exp",
              },
              {
                name: "Priya Desai",
                role: "Head of Research (Equity)",
                exp: "10+ Years Exp",
              },
              {
                name: "Amit Patel",
                role: "Sr. Technical Analyst",
                exp: "8+ Years Exp",
              },
            ].map((member, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
                  <div className="h-64 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-4 text-white">
                      <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-200" />
                      <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-200" />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-20 h-20 text-white/50" />
                    </div>
                  </div>
                  <div className="p-6 text-center relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-gray-900 rounded-full p-1 shadow-xl">
                      <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-4">
                        {member.role}
                      </p>
                      <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500">
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
