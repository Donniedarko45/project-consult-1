"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Users,
  Video,
  Star,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const workshops = [
  {
    id: 1,
    title: "Options Buying Mastery",
    subtitle: "Low Risk, High Reward Setups",
    date: "Sat, Oct 28",
    time: "10:00 AM",
    level: "Intermediate",
    attendees: 450,
    price: "₹10",
    image: "from-blue-600 to-indigo-600",
    icon: Zap,
    popular: true,
  },
  {
    id: 2,
    title: "Swing Trading Secrets",
    subtitle: "Catch Big Trends Early",
    date: "Sun, Oct 29",
    time: "11:00 AM",
    level: "Beginner Friendly",
    attendees: 280,
    price: "₹499",
    image: "from-emerald-500 to-teal-500",
    icon: star_icon,
    popular: false,
  },
];

function star_icon(props: any) {
  return <Star {...props} />;
}

export function WorkshopsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-sm font-bold text-red-500 tracking-wider uppercase">
                  Live Learning Hub
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Master the Markets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  With Live Experts
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Join our premium interactive workshops. Real charts, real
                strategies, zero fluff.
              </p>
            </div>

            <Link
              href="/workshops"
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
              suppressHydrationWarning
            >
              View Full Schedule <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {workshops.map((workshop, i) => (
            <FadeIn key={workshop.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-4xl p-2 hover:border-primary/30 transition-colors shadow-2xl shadow-gray-200/50 dark:shadow-none"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Left: Image/Visual */}
                  <div
                    className={`relative w-full md:w-2/5 h-48 md:h-auto rounded-3xl bg-linear-to-br ${workshop.image} p-6 flex flex-col justify-between overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay" />

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                        <workshop.icon className="w-6 h-6" />
                      </div>
                      {workshop.popular && (
                        <span className="bg-yellow-400 text-yellow-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 fill-current" /> BESTSELLER
                        </span>
                      )}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-1">
                        <Calendar className="w-4 h-4" /> {workshop.date}
                      </div>
                      <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                        <Clock className="w-4 h-4" /> {workshop.time}
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                        {workshop.level}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {workshop.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {workshop.subtitle}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((j) => (
                              <div
                                key={j}
                                className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900"
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            +{workshop.attendees} Joining
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs text-gray-400 line-through">
                          ₹2499
                        </span>
                        <span className="block text-xl font-black text-primary">
                          {workshop.price}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      Reserve Seat <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 text-primary font-bold"
            suppressHydrationWarning
          >
            View Full Schedule <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
