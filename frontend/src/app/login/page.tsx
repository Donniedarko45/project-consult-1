"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  KeyRound,
  LogIn,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";

type AuthStep = "phone" | "otp";

function LoginPageContent() {
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const { sendOTP, verifyOTP, isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect");

  const isSafeInternalPath = (path: string | null): path is string => {
    if (!path) return false;
    return path.startsWith("/") && !path.startsWith("//");
  };

  // Smart redirect based on KYC and agreement sign status
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (isSafeInternalPath(redirectTarget)) {
        router.push(redirectTarget);
        return;
      }

      if (user.kycStatus !== "VERIFIED") {
        router.push("/ekyc");
      } else if (user.agreementSignStatus !== "SIGNED") {
        router.push("/ekyc");
      } else {
        router.push("/plans");
      }
    }
  }, [isLoading, isAuthenticated, user, router, redirectTarget]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const formatPhoneDisplay = (value: string) => {
    // Format for display: keep only digits
    return value.replace(/\D/g, "").slice(0, 10);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneDisplay(e.target.value));
    setError("");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone number (10 digits for India)
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendOTP(phone);
      setStep("otp");
      setResendCooldown(30); // 30 seconds cooldown
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyOTP(phone, otp);
      // Redirect handled by useEffect based on kycStatus and agreementSignStatus
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;

    setIsSubmitting(true);
    setError("");
    try {
      await sendOTP(phone);
      setResendCooldown(30);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <FadeIn>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 md:p-8 text-center border-b border-slate-100 dark:border-slate-800 backdrop-blur-sm">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors gap-1.5 mb-6"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Home
              </Link>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {step === "phone" ? "Welcome Back" : "Verify OTP"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {step === "phone" ? (
                  "Enter your mobile number to continue"
                ) : (
                  <span>
                    We sent a code to{" "}
                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                      +91 {phone}
                    </span>
                  </span>
                )}
              </p>
            </div>

            <div className="p-6 md:p-8">
              {/* Error Message */}
              {error && (
                <FadeIn>
                  <div
                    id="auth-error"
                    role="alert"
                    className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-900/50 text-red-700 dark:text-red-400 text-sm flex items-start gap-3"
                  >
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <span className="sr-only">Error: </span>
                      {error}
                    </span>
                  </div>
                </FadeIn>
              )}

              {step === "phone" ? (
                /* Phone Input Step */
                <form
                  className="space-y-6"
                  onSubmit={handleSendOTP}
                  aria-label="Sign in with your mobile number"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Phone Number<span className="sr-only"> (required)</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-600 dark:text-slate-400 border-r border-slate-400 dark:border-slate-700 pr-2">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          +91
                        </span>
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="numeric"
                        value={phone}
                        onChange={handlePhoneChange}
                        aria-required="true"
                        aria-invalid={error ? true : undefined}
                        aria-describedby={
                          error ? "auth-error phone-hint" : "phone-hint"
                        }
                        className="w-full pl-22 pr-4 py-3.5 rounded-xl border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-slate-600 dark:placeholder:text-slate-400"
                        placeholder="98765 43210"
                        required
                        disabled={isSubmitting}
                      />
                      <span id="phone-hint" className="sr-only">
                        Enter your 10-digit Indian mobile number, for example
                        98765 43210.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || phone.length < 10}
                    aria-busy={isSubmitting}
                    className="w-full py-3.5 bg-primary dark:bg-blue-800 hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Sending
                        Code...
                      </>
                    ) : (
                      <>
                        Get OTP <LogIn className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-600 dark:text-slate-400 px-4">
                    By clicking &quot;Get OTP&quot;, you agree to our Terms and
                    Privacy Policy.
                  </p>
                </form>
              ) : (
                /* OTP Verification Step */
                <form
                  className="space-y-6"
                  onSubmit={handleVerifyOTP}
                  aria-label="Verify the one-time code sent to your phone"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Enter 6-digit Code<span className="sr-only"> (required)</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={otp}
                        onChange={handleOtpChange}
                        aria-required="true"
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? "auth-error otp-hint" : "otp-hint"}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-center text-2xl font-mono tracking-[0.5em] text-slate-900 dark:text-white placeholder:tracking-normal placeholder:font-sans placeholder:text-base placeholder:text-slate-600 dark:placeholder:text-slate-400"
                        placeholder="• • • • • •"
                        maxLength={6}
                        required
                        disabled={isSubmitting}
                        autoFocus
                      />
                      <span id="otp-hint" className="sr-only">
                        Enter the 6-digit one-time code sent by SMS.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || otp.length !== 6}
                    aria-busy={isSubmitting}
                    className="w-full py-3.5 bg-primary dark:bg-blue-800 hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />{" "}
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify &amp; Sign In <LogIn className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <button
                      type="button"
                      onClick={handleBackToPhone}
                      className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      Change Number
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendCooldown > 0 || isSubmitting}
                      className="flex items-center gap-1.5 text-primary font-medium hover:text-primary/80 transition-colors disabled:text-slate-600 dark:disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      <RefreshCw
                        aria-hidden="true"
                        className={`w-3.5 h-3.5 ${isSubmitting ? "animate-spin" : ""}`}
                      />
                      {resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : "Resend OTP"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-8 relative z-10">
          © {new Date().getFullYear()} SEBI Research Analyst. Secure Login.
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" aria-hidden="true" />
          <span className="sr-only" role="status">Loading the login page…</span>
        </main>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
