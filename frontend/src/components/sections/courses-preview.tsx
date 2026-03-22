"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, BookOpen, BarChart2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const courses = [
  {
    title: "Technical Analysis Mastery",
    description:
      "Master the art of reading charts, indicators, and price action patterns.",
    level: "Beginner to Intermediate",
    icon: BarChart2,
  },
  {
    title: "Advanced F&O Strategies",
    description:
      "Learn professional hedging, option selling, and directional option buying strategies.",
    level: "Advanced",
    icon: BookOpen,
  },
  {
    title: "Risk Management & Psychology",
    description:
      "Develop the mindset of a professional trader and protect your capital.",
    level: "All Levels",
    icon: GraduationCap,
  },
];

export function CoursesPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-cta font-semibold mb-2 block">
              Education First
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Master the Markets with Our Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We believe that education is the best investment. Our structured
              courses are designed to transform you into an independent and
              profitable trader.
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden md:flex px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors items-center"
            suppressHydrationWarning
          >
            View All Courses <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-background p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group h-full">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <course.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{course.level}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {course.description}
                </p>
                <Link
                  href="#"
                  className="text-primary dark:text-blue-400 font-medium hover:underline inline-flex items-center"
                  suppressHydrationWarning
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/courses"
            className="inline-flex px-6 py-3 bg-primary text-secondary rounded-lg hover:bg-primary/90 transition-colors items-center"
            suppressHydrationWarning
          >
            View All Courses <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
