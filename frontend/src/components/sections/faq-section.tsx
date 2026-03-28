"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do you provide guaranteed returns?",
    answer:
      "No. We do not provide any guarantee of returns or profits. Stock market investments are subject to market risks, and returns depend on various factors including market conditions, execution, and individual decisions. All our research and recommendations are based on analysis and probability, not certainty.",
  },
  {
    question: "What is the mode of communication?",
    answer:
      "We share our research and updates through our Telegram Channel, WhatsApp Support (if applicable), and Live Market Updates (for premium services). All communications are timely, structured, and based on research analysis.",
  },
  {
    question: "Do you offer free trials?",
    answer:
      "We may offer free educational sessions, webinars, or demo access from time to time. However, our premium research services are paid services, as they involve dedicated research, analysis, and continuous market tracking.",
  },
  {
    question: "Is this suitable for working professionals?",
    answer:
      "Yes. Our services are designed to suit both working professionals and full-time traders. We provide clear entry, exit & stop loss levels, swing and positional trading options, and a structured approach to save your time. You can participate in the market without needing to monitor it all day.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first FAQ by default

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden" id="faqs">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[120px] -z-1" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <FadeIn className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 text-primary dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
            Knowledge Base
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
            Common <span className="text-primary italic">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
            Everything you need to know about our research methodology and subscription services.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div 
                  className={`group rounded-3xl border transition-all duration-300 ${
                    isOpen 
                      ? "bg-white dark:bg-gray-950 border-primary/20 shadow-2xl shadow-primary/5" 
                      : "bg-gray-50/50 dark:bg-white/2 border-gray-100 dark:border-white/5 hover:border-primary/30"
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center p-8 lg:p-10 text-left transition-colors"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={`text-xl lg:text-2xl font-black transition-colors ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {faq.question}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-secondary rotate-180" : "bg-primary/5 text-primary group-hover:bg-primary/10"}`}>
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 lg:px-10 pb-10">
                          <div className="w-full h-px bg-gray-100 dark:bg-white/5 mb-8" />
                          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
