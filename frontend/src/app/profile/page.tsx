"use client";

import { useState, useEffect } from "react";
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Shield,
  Loader2,
  Mail,
  Save,
  FileText,
  Calendar,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const {
    user,
    logout,
    updateProfile,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();
  const router = useRouter();

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Initialize form with existing user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPan(user.pan || "");
      setAadhar(user.aadhar || "");
      setDob(user.dob || "");
      setGender(user.gender || "");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
        pan,
        aadhar,
        dob,
        gender,
      });
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user needs to complete profile (new user)
  const isNewUser = user && !user.name;

  // Show loading state
  if (authLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  // Show profile completion form for new users
  if (isNewUser) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <FadeIn>
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Complete Your Profile
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Welcome! Please complete your profile to continue.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="you@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      Optional, for important updates
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim()}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" /> Complete Profile
                      </>
                    )}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    );
  }

  // Regular profile page for existing users
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl font-bold text-foreground mb-8">
              My Dashboard
            </h1>
          </FadeIn>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <FadeIn delay={0.1} className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center text-primary font-bold text-2xl">
                    {user?.name
                      ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                      : "U"}
                  </div>
                  <h2 className="font-bold text-foreground">
                    {user?.name || "User"}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {user?.hasAccess ? "Premium Member" : "Free Member"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    +91 {user?.phone}
                  </p>
                </div>
                <nav className="p-4 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium bg-primary/5 text-primary rounded-lg"
                  >
                    <User className="w-4 h-4" /> Profile Overview
                  </Link>
                  <Link
                    href="/profile/billing"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <CreditCard className="w-4 h-4" /> Subscription & Billing
                  </Link>
                  <Link
                    href="/my-subscription"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Shield className="w-4 h-4" /> My Subscription & KYC
                  </Link>
                  <Link
                    href="/profile/notifications"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Bell className="w-4 h-4" /> Notifications
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Account Settings
                  </Link>
                </nav>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* My Profile Card */}
              <FadeIn delay={0.2}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-foreground">My Profile</h3>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm">
                      {successMessage}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Your name"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="you@example.com"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={user?.phone ? `+91 ${user.phone}` : ""}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                        />
                      </div>

                      {/* PAN Card */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          PAN Number
                          {user?.kycStatus === "VERIFIED" && (
                            <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                              <Shield className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={pan}
                            onChange={(e) => setPan(e.target.value.toUpperCase())}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all uppercase placeholder:normal-case ${
                              user?.kycStatus === "VERIFIED"
                                ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                                : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            }`}
                            placeholder="ABCDE1234F"
                            maxLength={10}
                            disabled={isSubmitting || user?.kycStatus === "VERIFIED"}
                            readOnly={user?.kycStatus === "VERIFIED"}
                          />
                        </div>
                        {user?.kycStatus === "VERIFIED" && (
                          <p className="text-xs text-green-600 dark:text-green-400">
                            PAN verified via eKYC. Cannot be modified.
                          </p>
                        )}
                      </div>

                      {/* Aadhar Number */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Aadhar Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={aadhar}
                          onChange={(e) =>
                            setAadhar(
                              e.target.value.replace(/\D/g, "").slice(0, 12),
                            )
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="1234 5678 9012"
                          maxLength={12}
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Date of Birth */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            disabled={isSubmitting}
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Gender */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Gender
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 hover:bg-primary/80 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" /> Save Profile
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </FadeIn>

              {/* eKYC Verification Status Card */}
              <FadeIn delay={0.25}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${user?.kycStatus === "VERIFIED" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"}`}>
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">eKYC Verification</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.kycStatus === "VERIFIED"
                            ? "Your identity has been verified"
                            : "Required for advisory services"}
                        </p>
                      </div>
                      {user?.kycStatus === "VERIFIED" ? (
                        <span className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                          <Shield className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <Link
                          href="/my-subscription"
                          className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all"
                        >
                          <Shield className="w-3.5 h-3.5" /> Verify Now
                        </Link>
                      )}
                    </div>
                  </div>
                  {user?.kycStatus === "VERIFIED" && user?.pan && (
                    <div className="p-6 bg-green-50/50 dark:bg-green-950/10">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500 dark:text-gray-400">PAN:</span>
                          <span className="font-mono font-bold text-foreground">{user.pan}</span>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Verified via Digio</span>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
              {/* Active Subscription Card */}
              <FadeIn delay={0.3}>
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <p className="text-blue-100 text-sm font-medium mb-1">
                        Current Plan
                      </p>
                      <h3 className="text-3xl font-bold mb-4">
                        {user?.hasAccess ? "Pro Stock Futures" : "Free Plan"}
                      </h3>
                      <p className="text-blue-100 text-sm opacity-80">
                        {user?.hasAccess
                          ? "Valid until: Dec 31, 2024"
                          : "Upgrade for premium features"}
                      </p>
                    </div>
                    <span
                      className={`backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border ${user?.hasAccess ? "bg-white/20 border-white/30" : "bg-yellow-400/20 border-yellow-400/30 text-yellow-100"}`}
                    >
                      {user?.hasAccess ? "Active" : "Free"}
                    </span>
                  </div>
                  <div className="relative z-10 mt-8 flex gap-4">
                    <Link
                      href="/plans"
                      className="bg-white text-primary px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors"
                    >
                      {user?.hasAccess ? "Upgrade Plan" : "View Plans"}
                    </Link>
                    {user?.hasAccess && (
                      <button className="bg-transparent border border-white/30 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors">
                        View Invoice
                      </button>
                    )}
                  </div>
                  <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>
              </FadeIn>
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <FadeIn delay={0.4}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-foreground">
                        Risk Profile
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Risk Assessment</span>
                        <span className="font-medium text-foreground">
                          Moderate
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 w-3/5 h-2 rounded-full" />
                      </div>
                      <p className="text-xs text-gray-400">
                        Based on your last assessment. Update your profile to
                        get personalized suggestions.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.5}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-foreground mb-4">
                      Quick Links
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/courses"
                          className="flex items-center justify-between text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            My Courses
                          </span>
                          <span className="text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/disclosures"
                          className="flex items-center justify-between text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            Regulatory Disclosures
                          </span>
                          <span className="text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
