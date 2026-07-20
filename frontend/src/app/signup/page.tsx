"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function SignupPage() {
  const router = useRouter();

  // Redirect to login after a short delay. The timer is cancelled as soon as the
  // visitor interacts with the page, so anyone reading this interstitial with a
  // screen reader or keyboard is not navigated away mid-sentence (SC 2.2.1).
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    const cancel = () => clearTimeout(timer);
    const events = ["keydown", "pointerdown", "focusin", "wheel"] as const;
    events.forEach((evt) => window.addEventListener(evt, cancel, { once: true }));

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, cancel));
    };
  }, [router]);

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <FadeIn>
          <div
            role="status"
            aria-live="polite"
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Setting up your account
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Redirecting you to our secure OTP verification page...
            </p>

            <Link
              href="/login"
              className="text-primary hover:underline text-sm font-medium"
            >
              Click here if not redirected automatically
            </Link>
          </div>
        </FadeIn>

        <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-8 relative z-10">
          © {new Date().getFullYear()} SEBI Research Analyst. Secure Signup.
        </p>
      </div>
    </main>
  );
}
