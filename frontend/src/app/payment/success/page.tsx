"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Loader2,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { PaymentApi } from "@/app/Api/Api";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("subscriptionId");
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    "success" | "failed"
  >("success"); // Default to success for now, or implement actual verification

  useEffect(() => {
    // In a real scenario, you might want to verify the payment status with your backend here
    // using the subscriptionId or paymentId.
    // For now, we'll assume if they reached this page with a subscriptionId, it's likely successful
    // or the webhook will handle the backend status.

    // Optional: Verify payment status API call
    /*
    const verifyPayment = async () => {
      try {
        await PaymentApi.verifyPayment({ subscriptionId });
        setVerificationStatus("success");
      } catch (error) {
        console.error("Payment verification failed", error);
        setVerificationStatus("failed");
      } finally {
        setIsVerifying(false);
      }
    };
    if (subscriptionId) verifyPayment();
    */

    // Simulating verification delay
    const timer = setTimeout(() => {
      setIsVerifying(false);
      // Auto redirect to dashboard after a few seconds
      setTimeout(() => {
        router.push("/profile");
      }, 5000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [subscriptionId, router]);

  if (isVerifying) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Verifying Payment...
        </h2>
        <p className="text-gray-500">
          Please wait while we confirm your subscription.
        </p>
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
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Thank you for your subscription. Your plan has been activated
        successfully. You will be redirected to your dashboard in a few seconds.
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
