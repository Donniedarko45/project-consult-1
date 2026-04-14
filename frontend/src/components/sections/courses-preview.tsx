"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, BookOpen, BarChart2, ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  {
    title: "Learn Technical Analysis with AI",
    tagline: "Master the market with the power of technology + strategy",
    description:
      "Learn how to analyze charts like a professional trader using a powerful combination of AI tools and proven technical analysis techniques.",
    level: "Beginner to Intermediate",
    icon: BarChart2,
    price: "₹2,999",
    priceNote: "Incl. GST",
    badge: "Best Seller",
    details: {
      whatYouLearn: [
        "Chart Reading Made Simple",
        "Support & Resistance Mastery",
        "Trend & Price Action Strategies",
        "AI Tools for Trade Identification",
        "Entry, Exit & Stop Loss Planning",
      ],
      outcome: "Trade with confidence, avoid common mistakes, and build a strong trading foundation.",
    },
  },
  {
    title: "Technical Analysis Mastery",
    tagline: "30-Day Intensive Program",
    description:
      'Learn to Read Charts, Indicators, Understand Market Psychology & Trade with Confidence. A structured 30-day course to help you analyze the market yourself.',
    level: "Intermediate",
    icon: BookOpen,
    price: "₹14,999",
    priceNote: "Incl. GST",
    badge: "Specialist",
    details: {
      whatYouLearn: [
        "Chart Patterns & Price Action",
        "Technical Indicators Mastery",
        "Market Psychology & Emotions",
        "Intraday & Swing Strategies",
        "Live Market Application",
      ],
      outcome: "Analyze the market yourself so you know whether a trade is right or wrong — because it's your hard-earned money.",
    },
  },
  {
    title: "Advanced F&O Strategies",
    tagline: "Master Options Trading with Precision & Confidence",
    description:
      "Learn how to trade Futures & Options using structured, risk-managed strategies designed for real market conditions.",
    level: "Advanced",
    icon: GraduationCap,
    price: "Contact Us",
    priceNote: "",
    badge: "Advanced",
    details: {
      whatYouLearn: [
        "High-probability option strategies",
        "Index & Stock F&O setups",
        "Entry, Exit & Risk Management",
        "Option buying & selling techniques",
        "Real market application",
      ],
      outcome: "Trade with confidence, discipline, and a clear strategy — instead of guesswork.",
    },
  },
];

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.15}>
      <div className="group relative bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-white/10 hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2 overflow-hidden">
        {course.badge && (
          <div className="absolute top-8 right-8 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-20">
            {course.badge}
          </div>
        )}

        <div className="p-10 flex flex-col flex-1 space-y-6">
          <div className="w-16 h-16 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <course.icon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{course.level}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{course.tagline}</p>
            <h3 className="text-2xl font-black text-foreground leading-tight group-hover:text-primary transition-colors">
              {course.title}
            </h3>
          </div>

          <p className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed flex-1">
            {course.description}
          </p>

          {/* Learn More Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-sm font-black text-primary hover:text-primary/80 transition-colors"
          >
            Learn More
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-4 border-t border-gray-100 dark:border-white/5">
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">What You&apos;ll Learn</p>
                    <ul className="space-y-1.5">
                      {course.details.whatYouLearn.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-3">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Outcome</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{course.details.outcome}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-6 flex items-center justify-between border-t border-gray-100 dark:border-white/10 mt-auto">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Course Fee</p>
              <p className="text-2xl font-black text-foreground tracking-tighter">{course.price}</p>
              {course.priceNote && (
                <p className="text-[10px] text-gray-400">{course.priceNote}</p>
              )}
            </div>
            <Link
              href="/payment"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all gap-2 text-sm"
              suppressHydrationWarning
            >
              Enroll Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export function CoursesPreview() {
  return (
    <section className="py-24 lg:py-32 bg-background relative" id="courses">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-1" />

      <div className="container mx-auto px-6">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cta/10 text-cta rounded-full text-xs font-black uppercase tracking-widest border border-cta/20">
              <span className="w-2 h-2 rounded-full bg-cta" />
              Education First
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              Understand Before <br />
              <span className="text-primary italic">You Invest</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              We believe learning the stock market is essential — not just to trade, but to understand whether the decisions you take or the services you follow are right or wrong. At the end of the day, it is your hard-earned money.
            </p>
          </div>
          <Link
            href="https://www.ashwinitradingacademy.com"
            target="_blank"
            className="group px-10 py-5 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3 whitespace-nowrap"
            suppressHydrationWarning
          >
            Explore Academy <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
