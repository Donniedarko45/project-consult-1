"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import { useState } from "react";
import { ContactApi } from "@/app/Api/Api";

export default function ContactPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Contact Us"
        description="Get in touch with our support team for any queries. We are here to assist you."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Details */}
          <div className="space-y-8">
            <FadeIn>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Reach Out Directly
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl min-w-0 [&>div]:min-w-0 [&_p]:[overflow-wrap:anywhere] [&>svg]:shrink-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary dark:text-blue-400 shrink-0">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Registered Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      2nd floor, 545/1, Chinmaya Mission Hospital Rd,
                      <br />
                      Stage 1, Indiranagar, Bengaluru,
                      <br />
                      Karnataka 560038
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl min-w-0 [&>div]:min-w-0 [&_p]:[overflow-wrap:anywhere] [&>svg]:shrink-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary dark:text-blue-400 shrink-0">
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Support</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                      +91 98459 61990
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      (Mon-Fri, 9:00 AM - 6:00 PM)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl min-w-0 [&>div]:min-w-0 [&_p]:[overflow-wrap:anywhere] [&>svg]:shrink-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                  <div className="bg-green-500/10 p-3 rounded-lg text-green-600 shrink-0">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp Support</h3>
                    <a 
                      href="https://wa.me/918861756040" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="WhatsApp support +91 88617 56040 (opens in a new tab)"
                      className="text-gray-600 dark:text-gray-400 font-medium text-lg hover:text-primary transition-colors"
                    >
                      +91 88617 56040
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl min-w-0 [&>div]:min-w-0 [&_p]:[overflow-wrap:anywhere] [&>svg]:shrink-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg text-primary dark:text-blue-400 shrink-0">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Support</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      ashwini@ashwinisdresearch.com
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      compliance@ashwinisdresearch.com
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl">
              <h2
                id="contact-form-heading"
                className="text-2xl font-bold mb-6 text-foreground"
              >
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await ContactApi.submitQuery(formData);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
      alert("Message sent successfully!");
    } catch (_) {
      setStatus("error");
      alert("Failed to send message. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-heading"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-bold text-gray-700 dark:text-gray-300"
          >
            Name<span className="sr-only"> (required)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            placeholder="John Doe"
            required
            aria-required="true"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-bold text-gray-700 dark:text-gray-300"
          >
            Phone<span className="sr-only"> (required)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            placeholder="+91"
            required
            aria-required="true"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-bold text-gray-700 dark:text-gray-300"
        >
          Email<span className="sr-only"> (required)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          placeholder="your@email.com"
          required
          aria-required="true"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-bold text-gray-700 dark:text-gray-300"
        >
          Message<span className="sr-only"> (required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          placeholder="How can we help you?"
          required
          aria-required="true"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full py-4 bg-primary text-secondary font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
      >
        {status === "loading" ? "Sending..." : "Send Message"}{" "}
        <Send className="w-4 h-4" aria-hidden="true" />
      </button>
      <p aria-live="polite" className="sr-only">
        {status === "loading" ? "Sending your message, please wait." : ""}
      </p>
    </form>
  );
}
