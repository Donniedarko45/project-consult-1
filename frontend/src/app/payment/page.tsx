"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { SubscriptionsApi, PaymentApi } from "@/app/Api/Api";
import { loadCashfreeSDK, initializeCashfree } from "@/utils/load-cashfree";

type PaymentState = "loading" | "ready" | "processing" | "success" | "failed";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "Selected Plan";
  const price = searchParams.get("price") || "--";
  const planId = searchParams.get("planId") || "";

  const [state, setState] = useState<PaymentState>("loading");
  const [error, setError] = useState<string>("");
  const [subscriptionId, setSubscriptionId] = useState<string>("");

  // Initialize subscription on mount
  useEffect(() => {
    const initializeSubscription = async () => {
      try {
        // Check if user is authenticated
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to continue with payment");
          setState("failed");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        if (!planId) {
          setError("Invalid plan selected. Please select a plan again.");
          setState("failed");
          return;
        }

        // Try to initialize subscription
        try {
          const response: any = await SubscriptionsApi.initSubscription(planId);
          const subscription = response.data?.subscription || response.data;

          if (!subscription || !subscription.id) {
            throw new Error("Failed to initialize subscription");
          }

          setSubscriptionId(subscription.id);
        } catch (err: any) {
          // Check if error is about existing pending subscription
          if (err.message?.toLowerCase().includes("pending subscription") ||
            err.message?.toLowerCase().includes("already have")) {

            // Fetch current subscription to get its ID
            const currentSubResponse: any = await SubscriptionsApi.getCurrentSubscription();
            const currentSub = currentSubResponse.data || currentSubResponse;

            if (currentSub && currentSub.id && currentSub.status === "PENDING") {
              // Use the existing pending subscription
              setSubscriptionId(currentSub.id);
            } else {
              throw new Error("Unable to process your subscription. Please contact support.");
            }
          } else {
            throw err;
          }
        }

        // Load Cashfree SDK
        await loadCashfreeSDK();

        setState("ready");
      } catch (err: any) {
        console.error("Subscription initialization failed:", err);
        setError(
          err.message || "Failed to initialize payment. Please try again."
        );
        setState("failed");
      }
    };

    initializeSubscription();
  }, [planId, router]);

  const handlePayment = async () => {
    try {
      setState("processing");
      setError("");

      // Create payment order
      const orderResponse: any = await PaymentApi.createOrder(subscriptionId);
      const orderData = orderResponse.data || orderResponse;

      if (!orderData.paymentSessionId) {
        throw new Error("Invalid payment session");
      }

      // Initialize Cashfree Drop
      const cashfree = initializeCashfree("production");

      // Create checkout instance
      const checkout = cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        returnUrl: `${window.location.origin}/my-subscription?subscriptionId=${subscriptionId}`,
      });

      // Redirect to Cashfree payment page
      checkout.redirect();
    } catch (err: any) {
      console.error("Payment failed:", err);
      setError(err.message || "Payment initialization failed. Please try again.");
      setState("ready");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
        Complete Your Subscription
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-blue-400">
            Order Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">
                Plan Name
              </span>
              <span className="font-medium text-foreground">{plan}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">
                Amount Payable
              </span>
              <span className="font-bold text-lg text-foreground">{price}</span>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              * Inclusive of all taxes.
            </div>
          </div>
        </div>

        {/* Payment Actions */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-blue-400">
            Payment
          </h2>

          <div className="space-y-6">
            {/* Loading State */}
            {state === "loading" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Initializing payment...
                </p>
              </div>
            )}

            {/* Ready State */}
            {state === "ready" && (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    Click the button below to proceed with secure payment via Cashfree.
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Pay Now - {price}
                </button>
              </div>
            )}

            {/* Processing State */}
            {state === "processing" && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Redirecting to payment gateway...
                </p>
              </div>
            )}

            {/* Success State */}
            {state === "success" && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">
                  Payment Successful!
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Your subscription has been activated.
                </p>
              </div>
            )}

            {/* Failed State */}
            {state === "failed" && (
              <div className="flex flex-col items-center justify-center py-8">
                <XCircle className="w-16 h-16 text-red-500 mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">
                  Payment Failed
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-900 dark:text-red-100">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-8 text-center">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold">Secure Payment Information:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>All payments are processed securely via Cashfree</li>
                <li>Multiple payment options: UPI, Cards, Net Banking, Wallets</li>
                <li>Your subscription will be activated immediately after successful payment</li>
                <li>You will receive a confirmation email/WhatsApp after payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-16 text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        }
      >
        <PaymentContent />
      </Suspense>
    </main>
  );
}
