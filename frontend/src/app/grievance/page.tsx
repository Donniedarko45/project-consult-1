"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail, Phone, Clock, ShieldCheck, Send } from "lucide-react";
import { useState } from "react";

function GrievanceForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f5e9b95b-ceb0-42ce-a6ce-b9511c7f96e6",
          subject: "New Grievance Redressal Submission",
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", contact: "", issue: "" });
        alert("Grievance submitted successfully. We will contact you soon.");
      } else {
        setStatus("error");
        alert("Failed to submit grievance. Please try again.");
      }
    } catch (_) {
      setStatus("error");
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <form className="mt-8 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-8" onSubmit={handleSubmit} aria-labelledby="grievance-form-heading">
      <h3 id="grievance-form-heading" className="text-xl font-bold text-foreground mb-4">Submit Your Complaint Details</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="grievance-name" className="text-sm font-bold text-gray-700 dark:text-gray-300 block">
            Name<span className="sr-only"> (required)</span>
          </label>
          <input
            id="grievance-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            placeholder="Your Full Name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="grievance-contact" className="text-sm font-bold text-gray-700 dark:text-gray-300 block">
            Contact Details<span className="sr-only"> (required)</span>
          </label>
          <input
            id="grievance-contact"
            name="contact"
            type="text"
            autoComplete="email"
            required
            aria-required="true"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            placeholder="Email or Phone Number"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="grievance-issue" className="text-sm font-bold text-gray-700 dark:text-gray-300 block">
          Description of the Issue<span className="sr-only"> (required)</span>
        </label>
        <textarea
          id="grievance-issue"
          name="issue"
          required
          aria-required="true"
          rows={4}
          value={formData.issue}
          onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
          className="w-full p-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          placeholder="Please describe your complaint in detail..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full py-4 bg-primary text-secondary font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
      >
        {status === "loading" ? "Submitting..." : "Submit Grievance"}
        <Send className="w-4 h-4" aria-hidden="true" />
      </button>
      <p aria-live="polite" className="sr-only">
        {status === "loading" ? "Submitting your grievance, please wait." : ""}
      </p>
    </form>
  );
}

export default function GrievancePage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Grievance Redressal"
        description="We are committed to providing transparent, ethical, and professional services."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        <FadeIn>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
              <ShieldCheck className="text-primary h-8 w-8" aria-hidden="true" />
              📌 Our Commitment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We are committed to providing transparent, ethical, and professional services. If you have any concerns or complaints, we encourage you to reach out to us.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              📧 How to Raise a Complaint
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              You can contact us directly through:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <Mail className="text-primary h-6 w-6 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="font-bold text-foreground [overflow-wrap:anywhere]">ashwini@ashwinisdresearch.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <Phone className="text-primary h-6 w-6 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="font-bold text-foreground">+91 98459 61990</p>
                </div>
              </div>
            </div>
            
            <GrievanceForm />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full">
              <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Clock className="text-primary h-6 w-6" aria-hidden="true" />
                ⏱️ Resolution Timeline
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 text-lg space-y-4">
                <li>• We aim to acknowledge complaints within 24–48 hours</li>
                <li>• Resolution will be provided within a reasonable timeframe</li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full">
              <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                ⚖️ Escalation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                If the issue is not resolved satisfactorily, you may escalate it through appropriate regulatory channels.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 text-center">
            <p className="text-primary font-bold text-xl uppercase tracking-wide">
              🤝 Our Assurance
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg italic">
              "We strive to handle all concerns in a fair, transparent, and timely manner, ensuring the best possible resolution."
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
    <Footer />
    </>
  );
}
