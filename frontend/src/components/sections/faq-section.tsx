"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const faqs = [
  {
    question: "Do you provide guaranteed returns?",
    answer:
      "No, as a SEBI registered entity, we do not and cannot provide guaranteed returns. Investment in the securities market is subject to market risks.",
  },
  {
    question: "What is the mode of communication?",
    answer:
      "Our research alerts are sent via our dedicated mobile app, SMS, and Telegram channel, depending on your subscription plan.",
  },
  {
    question: "Do you offer free trials?",
    answer:
      "We offer a basic educational newsletter for free. Premium research services are available through our subscription plans.",
  },
  {
    question: "Is this suitable for working professionals?",
    answer:
      "Yes, our 'Positional' and 'Short Term Delivery' services are designed for those who cannot track the market continuously.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-background text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-foreground"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {faq.question}
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-background text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
