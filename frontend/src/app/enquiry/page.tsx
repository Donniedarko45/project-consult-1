"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function EnquiryForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "General Workshop Enquiry";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: subjectParam,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
          ...formData,
          from_name: "Ashwini SD Website Enquiry",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", subject: subjectParam });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-12 rounded-3xl border border-green-100 dark:border-green-900/30 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4">Request Received!</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Thank you for your interest. We've received your enquiry and our team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Send Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl">
      <h2 className="text-3xl font-black text-foreground mb-2">Reserve Your Seat</h2>
      <p className="text-gray-500 mb-8 font-medium">Please fill in your details and we will contact you for the next steps.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" /> Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98459 61990"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Subject
            </label>
            <input
              type="text"
              readOnly
              value={formData.subject}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 cursor-not-allowed outline-none text-gray-500 font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" /> Message (Optional)
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about your trading experience..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none placeholder:text-gray-400"
          />
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl text-sm font-bold border border-red-100 dark:border-red-500/20"
            >
              <AlertCircle className="w-5 h-5" />
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 disabled:opacity-70 group"
        >
          {status === "loading" ? (
            "Processing..."
          ) : (
            <>
              Confirm Reservation <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function EnquiryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Reserve Your Seat"
        description="Take the first step towards mastering the markets. Fill out the form below to register your interest in our upcoming live workshops."
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Suspense fallback={<div className="h-[600px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl" />}>
              <EnquiryForm />
            </Suspense>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </main>
  );
}
