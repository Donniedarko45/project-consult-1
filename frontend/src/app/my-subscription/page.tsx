"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    CheckCircle,
    XCircle,
    Loader2,
    AlertCircle,
    Shield,
    CreditCard,
    Calendar,
    Clock,
    ArrowRight,
    FileText,
    User,
    PenTool,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/contexts/auth-context";
import { SubscriptionsApi, EkycApi, ESignApi, PaymentApi } from "@/app/Api/Api";
import { loadDigioSDK, startDigioSign } from "@/utils/load-digio";
import Link from "next/link";

interface Subscription {
    id: string;
    status: string;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    digioDocId?: string | null;
    signStatus?: string;
    signedAt?: string | null;
    agreementUrl?: string | null;
    plan: {
        id: string;
        name: string;
        durationMonths: number;
        price: number | string;
    };
}

type PageState = "loading" | "no-subscription" | "loaded" | "error";
type KycFlowState = "idle" | "loading" | "processing" | "success" | "failed";
type SignFlowState = "idle" | "loading" | "signing" | "success" | "failed";

export default function MySubscriptionPage() {
    const { user, isAuthenticated, isLoading: authLoading, refreshProfile } = useAuth();
    const router = useRouter();

    const [pageState, setPageState] = useState<PageState>("loading");
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [error, setError] = useState("");

    // eKYC state
    const [kycState, setKycState] = useState<KycFlowState>("idle");
    const [kycError, setKycError] = useState("");
    const [panInput, setPanInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [dobInput, setDobInput] = useState("");

    // E-Sign state
    const [signState, setSignState] = useState<SignFlowState>("idle");
    const [signError, setSignError] = useState("");

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, authLoading, router]);

    // Fetch subscription on mount
    const fetchSubscription = useCallback(async () => {
        try {
            const response: any =
                await SubscriptionsApi.getCurrentSubscription();
            const sub = response.data || response;

            if (sub && sub.id) {
                setSubscription(sub);
                setPageState("loaded");

                // If subscription is still PENDING, auto-verify payment with Cashfree
                if (sub.status === "PENDING") {
                    try {
                        console.log("[PAYMENT] Auto-verifying payment for subscription:", sub.id);
                        const verifyRes: any = await PaymentApi.verifyPayment(sub.id);
                        const verifyData = verifyRes.data || verifyRes;

                        if (verifyData.status === "PAID" || verifyData.subscriptionStatus === "ACTIVE") {
                            console.log("[PAYMENT] Payment verified! Re-fetching subscription...");
                            // Re-fetch to get updated status
                            const refreshRes: any = await SubscriptionsApi.getCurrentSubscription();
                            const refreshedSub = refreshRes.data || refreshRes;
                            if (refreshedSub && refreshedSub.id) {
                                setSubscription(refreshedSub);
                            }
                        }
                    } catch (verifyErr) {
                        console.warn("[PAYMENT] Auto-verify failed (non-critical):", verifyErr);
                        // Don't block the page — user can still see their subscription
                    }
                }
            } else {
                setPageState("no-subscription");
            }
        } catch (err: any) {
            console.error("Failed to fetch subscription:", err);
            setError(err.message || "Failed to load subscription data.");
            setPageState("error");
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchSubscription();
    }, [isAuthenticated, fetchSubscription]);

    // Handle eKYC initiation
    const handleKycInit = async () => {
        if (!panInput.trim()) {
            setKycError("Please enter your PAN number.");
            return;
        }

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(panInput.toUpperCase())) {
            setKycError("Invalid PAN format. Expected: ABCDE1234F");
            return;
        }

        if (!nameInput.trim()) {
            setKycError("Please enter your full name as per PAN card.");
            return;
        }

        if (!dobInput.trim()) {
            setKycError("Please enter your date of birth.");
            return;
        }

        // Convert date from yyyy-MM-dd (HTML input) to dd/MM/yyyy (API format)
        const dobParts = dobInput.split("-");
        if (dobParts.length !== 3) {
            setKycError("Invalid date of birth format.");
            return;
        }
        const formattedDob = `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`;

        setKycError("");
        setKycState("loading");

        try {
            // Call backend to verify identity via Digio
            const response: any = await EkycApi.initKyc(
                panInput.toUpperCase(),
                nameInput.trim(),
                formattedDob,
            );
            const result = response.data || response;

            if (result.status === "valid") {
                setKycState("success");
                // Refresh user profile to get updated kycStatus
                await refreshProfile();
            } else {
                setKycState("failed");
                setKycError(
                    result.details?.remarks ||
                    `Verification failed: ${result.status}. Please check your details and try again.`
                );
            }
        } catch (err: any) {
            console.error("eKYC failed:", err);
            setKycError(
                err.message || "eKYC verification failed. Please try again.",
            );
            setKycState("failed");
        }
    };

    // Handle DigiSign initiation
    const handleSignInit = async () => {
        if (!subscription) return;

        setSignError("");
        setSignState("loading");

        try {
            // 1. Call backend to create sign request
            const response: any = await ESignApi.initSign(subscription.id);
            const result = response.data || response;

            const digioDocId = result.digioDocId;
            if (!digioDocId) {
                throw new Error("No document ID received from server.");
            }

            // Get signer identifier (email or phone)
            const signerIdentifier = user?.email || user?.phone;
            if (!signerIdentifier) {
                throw new Error("No email or phone number found for signing.");
            }

            // 2. Load Digio SDK
            setSignState("signing");
            await loadDigioSDK("production");

            // 3. Open the Digio SDK for signing
            const signResponse = await startDigioSign(
                digioDocId,
                signerIdentifier,
                "production",
            );

            console.log("[ESIGN] Digio sign response:", signResponse);

            // 4. Update backend with the result
            const isSuccess = 
                signResponse.message === "signing_completed" || 
                signResponse.status === "signed" || 
                signResponse.message?.toLowerCase().includes("success");
                
            const statusToReport = isSuccess ? "success" : "failed";

            const updateRes: any = await ESignApi.updateSignStatus(subscription.id, statusToReport);
            const updateData = updateRes.data || updateRes;

            if (updateData?.signStatus === "SIGNED" || isSuccess) {
                setSignState("success");
                
                // Refresh subscription to get updated signStatus
                await fetchSubscription();
            } else {
                setSignState("failed");
                setSignError(signResponse.message || "Signing was not completed.");
            }

        } catch (err: any) {
            console.error("E-Sign failed:", err);

            // Check if it was cancelled by user
            if (err.message?.includes("cancelled") || err.message?.includes("closed")) {
                setSignError("Signing was cancelled. You can try again when ready.");
            } else {
                setSignError(
                    err.message || "Agreement signing failed. Please try again.",
                );
            }
            setSignState("failed");
        }
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatPrice = (price: number | string) => {
        const num = typeof price === "string" ? parseFloat(price) : price;
        return `₹${num.toLocaleString("en-IN")}`;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                        Active
                    </span>
                );
            case "PENDING":
                return (
                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 dark:border-yellow-800">
                        Payment Pending
                    </span>
                );
            case "EXPIRED":
                return (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-200 dark:border-red-800">
                        Expired
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-bold">
                        {status}
                    </span>
                );
        }
    };

    const getSignStatusBadge = (signStatus: string | undefined) => {
        switch (signStatus) {
            case "SIGNED":
                return (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                        Signed
                    </span>
                );
            case "REQUESTED":
                return (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">
                        Pending Signature
                    </span>
                );
            case "FAILED":
                return (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-200 dark:border-red-800">
                        Sign Failed
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 px-3 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700">
                        Not Signed
                    </span>
                );
        }
    };

    const kycVerified = user?.kycStatus === "VERIFIED";
    const isSigned = subscription?.signStatus === "SIGNED" || signState === "success";
    const isSignRequested = subscription?.signStatus === "REQUESTED";
    const paymentDone = subscription?.status === "ACTIVE" || !!subscription?.startDate;

    // Determine current step for progress indicator
    const getStepStatus = (step: "payment" | "kyc" | "sign") => {
        switch (step) {
            case "payment":
                return paymentDone ? "completed" : "pending";
            case "kyc":
                if (!paymentDone) return "locked";
                return kycVerified ? "completed" : "pending";
            case "sign":
                if (!paymentDone || !kycVerified) return "locked";
                if (isSigned) return "completed";
                return "pending";
        }
    };

    // Loading
    if (authLoading || pageState === "loading") {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Loading your subscription...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <FadeIn>
                        <div className="mb-8">
                            <Link
                                href="/profile"
                                className="text-sm text-primary hover:underline mb-2 inline-block"
                            >
                                ← Back to Profile
                            </Link>
                            <h1 className="text-3xl font-bold text-foreground">
                                My Subscription
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage your subscription and complete eKYC verification
                            </p>
                        </div>
                    </FadeIn>

                    {/* No Subscription */}
                    {pageState === "no-subscription" && (
                        <FadeIn>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <CreditCard className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">
                                    No Active Subscription
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                                    You don&apos;t have an active subscription yet. Browse our
                                    plans and start your journey with expert market insights.
                                </p>
                                <Link
                                    href="/plans"
                                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                >
                                    View Plans <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </FadeIn>
                    )}

                    {/* Error */}
                    {pageState === "error" && (
                        <FadeIn>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-red-200 dark:border-red-800 p-12 text-center">
                                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    Something went wrong
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">{error}</p>
                            </div>
                        </FadeIn>
                    )}

                    {/* Subscription Details */}
                    {pageState === "loaded" && subscription && (
                        <div className="space-y-6">
                            {/* Subscription Card */}
                            <FadeIn>
                                <div className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                                    <div className="relative z-10">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                            <div>
                                                <p className="text-blue-200 text-sm font-medium mb-1">
                                                    Current Plan
                                                </p>
                                                <h2 className="text-3xl font-bold">
                                                    {subscription.plan.name}
                                                </h2>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(subscription.status)}
                                                {getSignStatusBadge(subscription.signStatus)}
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-6 mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                                    <CreditCard className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-blue-200">Price</p>
                                                    <p className="font-bold text-lg">
                                                        {formatPrice(subscription.plan.price)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-blue-200">Duration</p>
                                                    <p className="font-bold">
                                                        {subscription.plan.durationMonths} Month
                                                        {subscription.plan.durationMonths > 1 ? "s" : ""}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-blue-200">
                                                        {subscription.status === "ACTIVE"
                                                            ? "Valid Until"
                                                            : "Created On"}
                                                    </p>
                                                    <p className="font-bold">
                                                        {subscription.status === "ACTIVE"
                                                            ? formatDate(subscription.endDate)
                                                            : formatDate(subscription.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {subscription.status === "ACTIVE" &&
                                            subscription.startDate && (
                                                <p className="text-sm text-blue-200">
                                                    Started on {formatDate(subscription.startDate)}
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Progress Steps */}
                            <FadeIn delay={0.05}>
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                                    <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                                        Onboarding Progress
                                    </h3>
                                    <div className="flex items-center gap-0">
                                        {/* Step 1: Payment */}
                                        <div className="flex items-center gap-2 flex-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                getStepStatus("payment") === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                                            }`}>
                                                {getStepStatus("payment") === "completed" ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <CreditCard className="w-4 h-4" />
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-foreground hidden sm:block">Payment</span>
                                        </div>

                                        <div className={`h-0.5 flex-1 max-w-[60px] ${getStepStatus("payment") === "completed" ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />

                                        {/* Step 2: KYC */}
                                        <div className="flex items-center gap-2 flex-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                getStepStatus("kyc") === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : getStepStatus("kyc") === "locked"
                                                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400"
                                                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
                                            }`}>
                                                {getStepStatus("kyc") === "completed" ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <Shield className="w-4 h-4" />
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-foreground hidden sm:block">KYC</span>
                                        </div>

                                        <div className={`h-0.5 flex-1 max-w-[60px] ${getStepStatus("kyc") === "completed" ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />

                                        {/* Step 3: DigiSign */}
                                        <div className="flex items-center gap-2 flex-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                getStepStatus("sign") === "completed"
                                                    ? "bg-green-500 text-white"
                                                    : getStepStatus("sign") === "locked"
                                                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400"
                                                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                                            }`}>
                                                {getStepStatus("sign") === "completed" ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <PenTool className="w-4 h-4" />
                                                )}
                                            </div>
                                            <span className="text-xs font-medium text-foreground hidden sm:block">Agreement</span>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* eKYC Section */}
                            <FadeIn delay={0.1}>
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`p-2 rounded-lg ${kycVerified ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"}`}
                                            >
                                                <Shield className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground">
                                                    eKYC Verification
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {kycVerified
                                                        ? "Your identity has been verified"
                                                        : "Required to activate advisory services"}
                                                </p>
                                            </div>
                                            {kycVerified && (
                                                <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {kycVerified || kycState === "success" ? (
                                            /* KYC Verified */
                                            <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
                                                <CheckCircle className="w-10 h-10 text-green-500 flex-shrink-0" />
                                                <div>
                                                    <p className="font-bold text-green-800 dark:text-green-200">
                                                        eKYC Verified Successfully
                                                    </p>
                                                    <p className="text-sm text-green-700 dark:text-green-300">
                                                        Your identity verification is complete.
                                                        {!isSigned && " Please proceed to sign the agreement below."}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            /* KYC Not Started / Pending / Failed */
                                            <div className="space-y-6">
                                                {/* Info Banner */}
                                                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                                    <div className="flex items-start gap-3">
                                                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                                        <div>
                                                            <p className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
                                                                Complete eKYC to access advisory services
                                                            </p>
                                                            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                                                                As per SEBI regulations, eKYC verification is
                                                                mandatory for receiving investment advisory
                                                                services. This is a one-time process.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* PAN Input */}
                                                <div className="space-y-3">
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        PAN Number{" "}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={panInput}
                                                            onChange={(e) =>
                                                                setPanInput(e.target.value.toUpperCase())
                                                            }
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all uppercase placeholder:normal-case text-foreground"
                                                            placeholder="ABCDE1234F"
                                                            maxLength={10}
                                                            disabled={
                                                                kycState === "loading" ||
                                                                kycState === "processing"
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Full Name Input */}
                                                <div className="space-y-3">
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Full Name (as per PAN){" "}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={nameInput}
                                                            onChange={(e) =>
                                                                setNameInput(e.target.value)
                                                            }
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                                                            placeholder="John Doe"
                                                            disabled={
                                                                kycState === "loading" ||
                                                                kycState === "processing"
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Date of Birth Input */}
                                                <div className="space-y-3">
                                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Date of Birth{" "}
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="date"
                                                            value={dobInput}
                                                            onChange={(e) =>
                                                                setDobInput(e.target.value)
                                                            }
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                                                            disabled={
                                                                kycState === "loading" ||
                                                                kycState === "processing"
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* Error */}
                                                {kycError && (
                                                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-3">
                                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-sm text-red-900 dark:text-red-100">
                                                            {kycError}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Action Button */}
                                                <button
                                                    onClick={handleKycInit}
                                                    disabled={
                                                        kycState === "loading" ||
                                                        kycState === "processing" ||
                                                        !panInput.trim() ||
                                                        !nameInput.trim() ||
                                                        !dobInput.trim()
                                                    }
                                                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {kycState === "loading" ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            Initiating eKYC...
                                                        </>
                                                    ) : kycState === "processing" ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            Opening Digio verification...
                                                        </>
                                                    ) : kycState === "failed" ? (
                                                        <>
                                                            <Shield className="w-5 h-5" />
                                                            Retry eKYC Verification
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Shield className="w-5 h-5" />
                                                            Confirm KYC
                                                        </>
                                                    )}
                                                </button>

                                                <p className="text-xs text-gray-400 text-center">
                                                    Powered by Digio • SEBI compliant verification
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </FadeIn>

                            {/* DigiSign Section - Shows after KYC is verified */}
                            {(kycVerified || kycState === "success") && (
                                <FadeIn delay={0.15}>
                                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`p-2 rounded-lg ${
                                                        isSigned
                                                            ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                                                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                                                    }`}
                                                >
                                                    <PenTool className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-foreground">
                                                        Sign Agreement
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {isSigned
                                                            ? "Your agreement has been digitally signed"
                                                            : "Digitally sign the advisory agreement"}
                                                    </p>
                                                </div>
                                                {isSigned && (
                                                    <CheckCircle className="w-6 h-6 text-green-500 ml-auto" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {isSigned ? (
                                                /* Agreement Signed */
                                                <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
                                                    <CheckCircle className="w-10 h-10 text-green-500 flex-shrink-0" />
                                                    <div>
                                                        <p className="font-bold text-green-800 dark:text-green-200">
                                                            Agreement Signed Successfully
                                                        </p>
                                                        <p className="text-sm text-green-700 dark:text-green-300">
                                                            Your advisory agreement has been digitally signed.
                                                            {subscription?.signedAt && (
                                                                <span> Signed on {formatDate(subscription.signedAt)}</span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Agreement Not Signed */
                                                <div className="space-y-4">
                                                    {/* Info */}
                                                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                                        <div className="flex items-start gap-3">
                                                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                                            <div>
                                                                <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                                                    {isSignRequested
                                                                        ? "Continue signing your agreement"
                                                                        : "Sign your advisory agreement"}
                                                                </p>
                                                                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                                                                    As per SEBI regulations, a digitally signed agreement
                                                                    is required between the advisor and client. This uses
                                                                    Digio&apos;s e-sign platform for a legally valid signature.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Error */}
                                                    {signError && (
                                                        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800 flex items-start gap-3">
                                                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                                            <p className="text-sm text-red-900 dark:text-red-100">
                                                                {signError}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Sign Button */}
                                                    <button
                                                        onClick={handleSignInit}
                                                        disabled={
                                                            signState === "loading" ||
                                                            signState === "signing"
                                                        }
                                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        {signState === "loading" ? (
                                                            <>
                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                                Creating sign request...
                                                            </>
                                                        ) : signState === "signing" ? (
                                                            <>
                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                                Opening Digio for signing...
                                                            </>
                                                        ) : signState === "failed" ? (
                                                            <>
                                                                <PenTool className="w-5 h-5" />
                                                                Retry Signing Agreement
                                                            </>
                                                        ) : isSignRequested ? (
                                                            <>
                                                                <PenTool className="w-5 h-5" />
                                                                Continue Signing Agreement
                                                            </>
                                                        ) : (
                                                            <>
                                                                <PenTool className="w-5 h-5" />
                                                                Sign Agreement
                                                            </>
                                                        )}
                                                    </button>

                                                    <p className="text-xs text-gray-400 text-center">
                                                        Powered by Digio • Legally valid e-signature
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {/* Quick Actions */}
                            <FadeIn delay={0.2}>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group"
                                    >
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Back to Profile
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/plans"
                                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all group"
                                    >
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            View All Plans
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
