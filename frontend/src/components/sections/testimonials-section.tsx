"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Neelu",
    role: "Student",
    content: "She is a teacher with lots of patience ..kind.. She explains every lesson clearly and makes sure student understands. She creates a friendly learning environment and motivates student to do best and confident..",
    rating: 5,
    platform: "Google Review"
  },
  {
    name: "Divya",
    role: "Client",
    content: "I've tried multiple advisory services before, but this is the only one that focuses on proper analysis and risk management. The calls are well-researched and not just random tips.",
    rating: 5,
    platform: "Google Review"
  },
  {
    name: "SURESH",
    role: "Trader",
    content: "What I really appreciate is the transparency. Every trade comes with clear entry, target, and stop loss. It helps me trade with confidence and discipline.",
    rating: 5,
    platform: "Google Review"
  },
  {
    name: "Dev",
    role: "Client",
    content: "The accuracy and timing of calls are impressive. More importantly, the guidance on position sizing and risk control has helped me protect my capital.",
    rating: 5,
    platform: "Google Review"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-gray-100 dark:border-gray-800">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-6">
              Wall of Love
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">
              What Our <span className="text-primary italic">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Join thousands of satisfied traders who have transformed their journey with our expert guidance and research.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none h-full flex flex-col relative group"
              >
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote aria-hidden="true" className="w-10 h-10 text-primary" />
                </div>
                
                <div className="flex gap-1 mb-6" role="img" aria-label={`Rated ${t.rating} out of 5`}>
                  {[...Array(t.rating)].map((_, index) => (
                    <Star key={index} aria-hidden="true" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 flex-1 italic">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 dark:border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-foreground uppercase tracking-tight">{t.name}</h3>
                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">{t.platform}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} aria-hidden="true" className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </span>
                Average 4.9/5 based on 500+ Google Reviews
              </div>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-widest font-bold">
                * Disclaimer: Testimonials reflect individual experiences and do not guarantee future performance. Investments in securities market are subject to market risks.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
