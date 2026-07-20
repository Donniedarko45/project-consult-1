"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Send, Home, Info, Briefcase, CreditCard, ShieldCheck, Phone, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { UserMenu } from "@/components/ui/user-menu";
import { UrgencyStrip } from "@/components/sections/urgency-strip";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredServices, setHoveredServices] = useState(false);
  const [hoveredPlans, setHoveredPlans] = useState(false);
  const { isAuthenticated } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // While the drawer is open it is a modal dialog: move focus into it, keep Tab
  // inside it, and return focus to the toggle on close (SC 2.1.2, 2.4.3).
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    drawer.addEventListener("keydown", onKeyDown);
    return () => {
      drawer.removeEventListener("keydown", onKeyDown);
      menuToggleRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About Us", icon: Info },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/plans", label: "Plans", icon: CreditCard },
    { href: "/charter", label: "Investor Charter", icon: ShieldCheck },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <UrgencyStrip compact />
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-white/10 shadow-sm transition-all duration-300">
        <div className="w-full flex h-20 items-center justify-between px-10">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-blue-200 hover:scale-105 transition-transform duration-300 active:scale-95"
            >
              <Image
                src="/images/Ashwini SD.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              Ashwini SD
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <div key={link.href} className="relative group">
                  {link.href === "/services" ? (
                    <div
                      onMouseEnter={() => setHoveredServices(true)}
                      onMouseLeave={() => setHoveredServices(false)}
                      onFocus={() => setHoveredServices(true)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setHoveredServices(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setHoveredServices(false);
                      }}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        aria-haspopup="true"
                        aria-expanded={hoveredServices}
                        aria-controls={hoveredServices ? "navbar-services-menu" : undefined}
                        className={`px-4 py-2 text-[13px] font-semibold transition-all hover:text-primary dark:hover:text-white flex items-center gap-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-white/5 ${
                          isActive || hoveredServices
                            ? "text-primary dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <Icon aria-hidden="true" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                        <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredServices ? "rotate-180" : ""}`} />
                      </Link>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {hoveredServices && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            id="navbar-services-menu"
                            aria-label="Services"
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 rounded-2xl shadow-2xl p-4 grid grid-cols-1 gap-1.5 z-50 overflow-hidden backdrop-blur-xl"
                          >
                            {[
                              { label: "Intraday Research Setups", href: "/services/intraday" },
                              { label: "BTST / STBT Setups", href: "/services/btst" },
                              { label: "Swing / Positional Setups", href: "/services/swing" },
                              { label: "Derivatives (F&O) Research", href: "/services/derivatives" },
                              { label: "High-Conviction Setups", href: "/services/high-conviction" },
                              { label: "Market Direction & Key Levels", href: "/services/market-direction" },
                              { label: "Cash Market Intraday Setups", href: "/services/cash-intraday" },
                              { label: "Equity Swing / Positional Setups", href: "/services/equity-swing" },
                              { label: "Courses & Training Programs", href: "https://ashwinitradingacademy.com/" },
                              { label: "Workshops", href: "https://ashwinitradingacademy.com/" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/5 dark:hover:text-white transition-all text-left"
                              >
                                {item.label}
                              </Link>
                            ))}
                            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none opacity-50" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.href === "/plans" ? (
                    <div
                      onMouseEnter={() => setHoveredPlans(true)}
                      onMouseLeave={() => setHoveredPlans(false)}
                      onFocus={() => setHoveredPlans(true)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setHoveredPlans(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setHoveredPlans(false);
                      }}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        aria-haspopup="true"
                        aria-expanded={hoveredPlans}
                        aria-controls={hoveredPlans ? "navbar-plans-menu" : undefined}
                        className={`px-4 py-2 text-[13px] font-semibold transition-all hover:text-primary dark:hover:text-white flex items-center gap-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-white/5 ${
                          isActive || hoveredPlans
                            ? "text-primary dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <Icon aria-hidden="true" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                        <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredPlans ? "rotate-180" : ""}`} />
                      </Link>

                      {/* Plans Dropdown */}
                      <AnimatePresence>
                        {hoveredPlans && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            id="navbar-plans-menu"
                            aria-label="Plans"
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800/80 rounded-2xl shadow-2xl p-4 grid grid-cols-1 gap-1.5 z-50 overflow-hidden backdrop-blur-xl"
                          >
                            {[
                              { label: "All Research Plans", href: "/plans" },
                              // { label: "Test Plan (Trial)", href: "/plans/test-plan" },
                              { label: "Index Option Selling", href: "/plans/index-option-selling" },
                              { label: "Equity Cash Setups", href: "/plans/equity-cash" },
                              { label: "Hero Zero Expiry Special", href: "/plans/hero-zero-expiry-premium" },
                              { label: "Stock Futures & Options", href: "/plans/stock-futures-and-options" },
                              { label: "Index Futures & Options", href: "/plans/index-futures-and-options" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-3 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/5 dark:hover:text-white transition-all text-left"
                              >
                                {item.label}
                              </Link>
                            ))}
                            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none opacity-50" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-[13px] font-semibold transition-all hover:text-primary dark:hover:text-white flex items-center gap-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-white/5 ${
                        isActive
                          ? "text-primary dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <Icon aria-hidden="true" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-primary/10 dark:bg-white/10 rounded-xl -z-10"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {/* <a
              href="https://t.me/tradewithashwinisd6"
              target="_blank"
              className="hidden lg:flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all hover:scale-105 shadow-md shadow-blue-500/20"
            >
              <Send className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-wider">
                Free Channel
              </span>
            </a> */}
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-3">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    href="https://t.me/tradewithashwinisd6"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Free Channel on Telegram (opens in a new tab)"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <Send aria-hidden="true" className="w-3.5 h-3.5" />
                    Free Channel
                  </Link>
                  <Link
                    href="/login"
                    className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-3 py-2"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="relative text-xs font-medium bg-primary dark:bg-blue-800 text-white px-5 py-2.5 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              ref={menuToggleRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls={isMobileMenuOpen ? "mobile-navigation-drawer" : undefined}
              className="xl:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" className="w-6 h-6" />
              ) : (
                <Menu aria-hidden="true" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
              className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              ref={drawerRef}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsMobileMenuOpen(false);
              }}
              className="xl:hidden fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-2xl z-50 overflow-y-auto p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between mb-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 font-black text-xl tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-blue-200"
                >
                  <Image
                    src="/images/Ashwini SD.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                  Ashwini SD
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  type="button"
                  aria-label="Close navigation menu"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X aria-hidden="true" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {isAuthenticated && (
                <div className="mb-4">
                  <UserMenu variant="inline" />
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mt-4" />
                </div>
              )}

              <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-4 ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/25"
                          : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-gray-100 dark:bg-white/5"}`}>
                        <Icon aria-hidden="true" className="w-5 h-5" />
                      </div>
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

              <a
                href="https://t.me/tradewithashwinisd6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Free Telegram (opens in a new tab)"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
              >
                <Send aria-hidden="true" className="w-5 h-5" />
                Join Free Telegram
              </a>

              {!isAuthenticated && (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-center border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-center bg-primary dark:bg-blue-800 text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
