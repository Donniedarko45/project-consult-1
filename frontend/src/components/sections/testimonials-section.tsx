"use client";

import { FadeIn } from "@/components/ui/fade-in";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            Client Stories
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0}>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-full">
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "The structured approach to F&O trading helped me minimize
                losses and focus on risk management. Highly recommended for
                beginners."
              </p>
              <div className="font-bold text-foreground">
                - Rahul S., Mumbai
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-full">
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "Clear, concise, and no-nonsense advice. The courses explained
                concepts I struggled with for years."
              </p>
              <div className="font-bold text-foreground">
                - Priya M., Bangalore
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-full">
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "Ethical research is hard to find. I appreciate the transparency
                and the emphasis on realistic expectations."
              </p>
              <div className="font-bold text-foreground">- Amit K., Delhi</div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <p className="text-xs text-gray-400 mt-8">
            * Disclaimer: Testimonials reflect individual experiences and do not
            guarantee future performance.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
