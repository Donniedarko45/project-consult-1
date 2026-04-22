"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { PaymentApi } from "@/app/Api/Api";
import { clearAuthSession, getAuthRedirectPath, isAuthError } from "@/utils/auth-session";

type VerificationState = "verifying" | "success" | "pending" | "failed";

interface VerifyPaymentResponse {
  data?: {
    status?: string;
    subscriptionStatus?: string;
    message?: string;
  };
  status?: string;
  subscriptionStatus?: string;
  message?: string;
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("subscriptionId");
  const [verificationState, setVerificationState] =
    useState<VerificationState>("verifying");
  const [message, setMessage] = useState(
    "Please wait while we confirm your subscription.",
  );

  useEffect(() => {
    const verifyPayment = async () => {
      if (!subscriptionId) {
        setVerificationState("failed");
        setMessage("Missing subscription reference. Please retry from My Subscription.");
        return;
      }

      try {
        const response = (await PaymentApi.verifyPayment(
          subscriptionId,
        )) as VerifyPaymentResponse;
        const result = response.data || response;

        if (result.status === "PAID" || result.subscriptionStatus === "ACTIVE") {
          setVerificationState("success");
          setMessage("Your subscription has been activated successfully.");
          setTimeout(() => router.push("/my-subscription"), 4000);
          return;
        }

        if (result.status === "PENDING") {
          setVerificationState("pending");
          setMessage(
            "Payment is still being confirmed. We are waiting for the final gateway update.",
          );
          return;
        }

        setVerificationState("failed");
        setMessage(result.message || "Payment could not be verified.");
      } catch (error: unknown) {
        if (isAuthError(error)) {
          clearAuthSession();
          setTimeout(() => router.push(getAuthRedirectPath()), 1000);
          return;
        }
        console.error("Payment verification failed", error);
        setVerificationState("failed");
        setMessage("Unable to verify payment right now. Please check My Subscription.");
      }
    };

    verifyPayment();
  }, [subscriptionId, router]);

  if (verificationState === "verifying") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Verifying Payment...
        </h2>
        <p className="text-gray-500">{message}</p>
      </div>
    );
  }

  if (verificationState === "pending") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto px-4">
        <Loader2 className="w-14 h-14 text-amber-500 animate-spin mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Payment Processing
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
        <Link
          href="/my-subscription"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <LayoutDashboard className="w-5 h-5" />
          Go to My Subscription
        </Link>
      </div>
    );
  }

  if (verificationState === "failed") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto px-4">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Verification Failed
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
        <Link
          href="/my-subscription"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <LayoutDashboard className="w-5 h-5" />
          Check My Subscription
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto px-4">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {message}
      </p>

      <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-8 text-left">
        <p className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1 flex items-center gap-2">
          <span>📲</span> WhatsApp Confirmation Sent
        </p>
        <p className="text-xs text-green-700 dark:text-green-400">
          A confirmation message with your Telegram channel link has been sent to your registered WhatsApp number.
          Click the link in the message to join your advisory channel.
        </p>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        You will be redirected to your subscription dashboard shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link
          href="/profile"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <LayoutDashboard className="w-5 h-5" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 max-w-2xl mx-auto">
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-primary" />
              </div>
            }
          >
            <PaymentSuccessContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
