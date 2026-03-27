"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, BookOpen, BarChart2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function CoursesPreview() {
  const courses = [
    {
      title: "Technical Analysis Mastery",
      description: "Master the art of reading charts, indicators, and price action patterns with institutional clarity.",
      level: "Beginner to Intermediate",
      icon: BarChart2,
      price: "₹2,999",
      badge: "Best Seller",
      color: "blue"
    },
    {
      title: "Advanced F&O Strategies",
      description: "Learn professional hedging, option selling, and directional option buying strategies for consistent returns.",
      level: "Advanced",
      icon: BookOpen,
      price: "₹14,999",
      badge: "Specialist",
      color: "indigo"
    },
    {
      title: "Risk Management & Psychology",
      description: "Develop the mindset of a professional trader and master the math behind capital preservation.",
      level: "All Levels",
      icon: GraduationCap,
      price: "₹4,499",
      badge: "Essential",
      color: "slate"
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative" id="courses">
      {/* Background Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-1" />

      <div className="container mx-auto px-6">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cta/10 text-cta rounded-full text-xs font-black uppercase tracking-widest border border-cta/20">
              <span className="w-2 h-2 rounded-full bg-cta" />
              Education First
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              Empower Your Future <br/>
              <span className="text-primary italic">with Expert Education</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              We believe structured education is the ultimate edge. 
              Our courses are designed to transform you into an independent, 
              data-driven, and profitable trader.
            </p>
          </div>
          <Link
            href="/courses"
            className="group px-10 py-5 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3"
            suppressHydrationWarning
          >
            Explore Academy <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {courses.map((course, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <div className="group relative bg-white dark:bg-gray-950 p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 hover:shadow-2xl-strong transition-all duration-500 flex flex-col h-full hover:-translate-y-4 overflow-hidden">
                {/* Badge Overlay */}
                {course.badge && (
                  <div className="absolute top-8 right-8 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-20">
                    {course.badge}
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-b from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 space-y-8 flex-1 flex flex-col">
                  <div className={`w-16 h-16 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner`}>
                    <course.icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {course.level}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-black text-foreground leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                  
                  <div className="flex-1" />

                  <div className="pt-10 flex items-center justify-between border-t border-gray-100 dark:border-white/10 mt-auto">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Course Fee</p>
                      <p className="text-3xl font-black text-foreground tracking-tighter">{course.price}</p>
                    </div>
                    <Link
                      href={`/courses/${index}`}
                      className="inline-flex items-center justify-center px-6 py-4 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-black rounded-xl hover:bg-primary hover:text-white transition-all duration-300 gap-2 overflow-hidden group/btn"
                      suppressHydrationWarning
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/courses"
            className="w-full inline-flex px-10 py-5 bg-primary text-secondary font-black rounded-2xl hover:bg-primary/90 transition-all items-center justify-center gap-3"
            suppressHydrationWarning
          >
            Explore Academy <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}
