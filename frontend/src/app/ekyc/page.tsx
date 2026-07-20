"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  FileSignature,
  Loader2,
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/contexts/auth-context";
import { EkycApi, ESignApi } from "@/app/Api/Api";
import { loadDigioSDK, startDigioSign } from "@/utils/load-digio";

type Step = "kyc" | "sign" | "done";

export default function EkycPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, refreshProfile } = useAuth();

  const [step, setStep] = useState<Step>("kyc");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // KYC form state
  const [panName, setPanName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [panDob, setPanDob] = useState("");

  // Sign state
  const [signLoading, setSignLoading] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Determine initial step from user state
  useEffect(() => {
    if (!isLoading && user) {
      if (user.kycStatus === "VERIFIED" && user.agreementSignStatus === "SIGNED") {
        router.push("/plans");
      } else if (user.kycStatus === "VERIFIED") {
        setStep("sign");
      } else {
        setStep("kyc");
      }
    }
  }, [isLoading, user, router]);

  const handlePanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const pan = panNumber.trim().toUpperCase();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      setError("Please enter a valid PAN number (e.g. ABCDE1234F)");
      return;
    }
    if (!panName.trim()) {
      setError("Please enter your full name as per PAN card");
      return;
    }
    if (!panDob) {
      setError("Please enter your date of birth");
      return;
    }

    // Convert date from YYYY-MM-DD to dd/MM/yyyy for Digio
    const [year, month, day] = panDob.split("-");
    const formattedDob = `${day}/${month}/${year}`;

    setIsSubmitting(true);
    try {
      await EkycApi.initKyc(pan, panName.trim(), formattedDob);
      await refreshProfile();
      setStep("sign");
    } catch (err: any) {
      setError(err.message || "PAN verification failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartSign = async () => {
    setError("");
    setSignLoading(true);
    try {
      // Init agreement on backend
      const response: any = await ESignApi.initUserAgreement();
      const { digioDocId } = response.data || response;

      if (!digioDocId) {
        throw new Error("Failed to initialize sign request. Please try again.");
      }

      // Load Digio SDK
      await loadDigioSDK("production");

      // Start Digio signing flow
      const identifier = user?.email || user?.phone || "";
      const result = await startDigioSign(digioDocId, identifier, "production");

      // Update sign status on backend
      const status = result.message === "Signing completed" || result.digio_doc_id ? "signed" : "failed";
      await ESignApi.updateUserAgreement(status);
      await refreshProfile();

      if (status === "signed") {
        setStep("done");
        setTimeout(() => router.push("/plans"), 2000);
      } else {
        setError("Signing was not completed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Digital signature process failed. Please try again.");
    } finally {
      setSignLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
        <span className="sr-only" role="status">Loading your verification details…</span>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <FadeIn>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <StepDot
              num={1}
              label="PAN Verification"
              active={step === "kyc"}
              done={step === "sign" || step === "done"}
            />
            <div className="h-px w-10 bg-slate-200 dark:bg-slate-700" />
            <StepDot
              num={2}
              label="DigiSign"
              active={step === "sign"}
              done={step === "done"}
            />
            <div className="h-px w-10 bg-slate-200 dark:bg-slate-700" />
            <StepDot num={3} label="Plans" active={false} done={step === "done"} />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            {/* Step: KYC */}
            {step === "kyc" && (
              <>
                <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 text-center border-b border-slate-100 dark:border-slate-800">
                  <div className="w-14 h-14 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    PAN Card Verification
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Required by SEBI for eKYC compliance
                  </p>
                </div>

                <form className="p-6 space-y-5" onSubmit={handlePanSubmit} aria-label="PAN card verification">
                  {error && <ErrorBox message={error} />}

                  <div className="space-y-2">
                    <label htmlFor="pan-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Full Name (as per PAN)<span className="sr-only"> (required)</span>
                    </label>
                    <input
                      id="pan-name"
                      name="panName"
                      type="text"
                      autoComplete="name"
                      value={panName}
                      onChange={(e) => { setPanName(e.target.value); setError(""); }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="e.g. Rajesh Kumar Sharma"
                      required
                      aria-required="true"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pan-number" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      PAN Number<span className="sr-only"> (required)</span>
                    </label>
                    <input
                      id="pan-number"
                      name="panNumber"
                      type="text"
                      autoComplete="off"
                      value={panNumber}
                      onChange={(e) => { setPanNumber(e.target.value.toUpperCase()); setError(""); }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono tracking-widest uppercase"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      required
                      aria-required="true"
                      aria-describedby="pan-number-hint"
                      disabled={isSubmitting}
                    />
                    <span id="pan-number-hint" className="sr-only">
                      Ten characters, for example ABCDE1234F.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pan-dob" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Date of Birth<span className="sr-only"> (required)</span>
                    </label>
                    <input
                      id="pan-dob"
                      name="panDob"
                      type="date"
                      autoComplete="bday"
                      value={panDob}
                      onChange={(e) => { setPanDob(e.target.value); setError(""); }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                      aria-required="true"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Verifying...</>
                    ) : (
                      <><ShieldCheck className="w-5 h-5" aria-hidden="true" /> Verify PAN</>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    Your information is encrypted and stored securely as per SEBI regulations.
                  </p>
                </form>
              </>
            )}

            {/* Step: DigiSign */}
            {step === "sign" && (
              <>
                <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 text-center border-b border-slate-100 dark:border-slate-800">
                  <div className="w-14 h-14 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <FileSignature className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    Digital Agreement Signing
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sign the advisory services agreement digitally
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  {error && <ErrorBox message={error} />}

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                        PAN Verification Successful
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                        Your identity has been verified. Please sign the advisory agreement to proceed.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      What you&apos;re signing:
                    </p>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                      <li>Advisory Services Agreement with Ashwini SD Research</li>
                      <li>SEBI Research Analyst regulatory compliance document</li>
                      <li>Risk disclosure and terms of service</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleStartSign}
                    disabled={signLoading}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {signLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Opening Sign Portal...</>
                    ) : (
                      <><FileSignature className="w-5 h-5" /> Sign Agreement Digitally</>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    You will be redirected to the Digio secure signing portal. Complete signing to proceed to plan selection.
                  </p>
                </div>
              </>
            )}

            {/* Step: Done */}
            {step === "done" && (
              <div className="p-10 text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  All Set!
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  KYC verified and agreement signed successfully. Redirecting you to plans...
                </p>
                <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Taking you to plans
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-6">
            © {new Date().getFullYear()} SEBI Research Analyst · Reg: INH000024453
          </p>
        </FadeIn>
      </div>
    </main>
  );
}

function StepDot({
  num,
  label,
  active,
  done,
}: {
  num: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
          done
            ? "bg-green-500 text-white"
            : active
            ? "bg-primary text-white shadow-lg shadow-primary/30"
            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
        }`}
      >
        {done ? <CheckCircle className="w-4 h-4" /> : num}
      </div>
      <span className={`text-[10px] font-semibold uppercase tracking-wide ${active ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}>
        {label}
      </span>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-900/50 text-red-700 dark:text-red-400 text-sm flex items-start gap-3"
    >
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </div>
  );
}
