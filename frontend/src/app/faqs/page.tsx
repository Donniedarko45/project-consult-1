import { Footer } from "@/components/layout/footer";
import { FAQSection } from "@/components/sections/faq-section";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary text-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Answers to common queries about our services, subscription, and
            compliance.
          </p>
        </div>
      </div>

      {/* Reusing the FAQ component but expanding context if needed */}
      <div className="min-h-[50vh]">
        <FAQSection />

        <div className="container mx-auto px-4 pb-20 max-w-3xl space-y-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Additional Support Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">
                How do I access the 'Courses'?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Once you purchase a course from the 'Courses' section, you will
                receive login credentials to our Learning Management System
                (LMS) within 24 hours.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                Can I upgrade my subscription plan?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade to a higher tier plan at any time. The
                remaining balance of your current plan will be adjusted on a
                pro-rata basis. Please contact support.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                What happens if I miss a trade alert?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We recommend keeping notifications on for our App/Telegram
                channel. However, we do not advise entering a trade if the price
                has moved significantly away from the recommended entry price.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
    
  );
}
