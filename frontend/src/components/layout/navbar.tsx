"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { UserMenu } from "@/components/ui/user-menu";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredServices, setHoveredServices] = useState(false);
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/plans", label: "Plans" },
    { href: "/methodology", label: "Methodology" },
    { href: "/charter", label: "Investor Charter" },
    { href: "/disclosures", label: "Disclosures" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 mx-auto max-w-[95%]">
      <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-950/70 border border-white/20 dark:border-gray-800/50 rounded-2xl shadow-lg shadow-black/5 supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-gray-950/60 transition-all duration-300">
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-blue-200"
            >
              <Image
                src="/images/Ashwini SD.png"
                alt="Ashwini SD Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              Ashwini SD
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="relative group">
                  {link.href === "/services" ? (
                    <div
                      onMouseEnter={() => setHoveredServices(true)}
                      onMouseLeave={() => setHoveredServices(false)}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        className={`px-3 py-2 text-xs font-medium transition-colors hover:text-primary dark:hover:text-white flex items-center gap-1 ${
                          isActive || hoveredServices
                            ? "text-primary dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {link.label}
                        {/* <ChevronDown className="w-3 h-3 mt-0.5" /> */}
                      </Link>

                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {hoveredServices && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-4 grid grid-cols-1 gap-1 z-50 overflow-hidden"
                          >
                            {[
                              { label: "Research Services", href: "/services" },
                              { label: "Courses", href: "/courses" },
                              {
                                label: "Wealth Management",
                                href: "/wealth-management",
                              },
                              { label: "Small Case", href: "/small-case" },
                              { label: "Workshops", href: "/workshops" },
                              { label: "Mutual Funds", href: "/mutual-funds" },
                              { label: "Placements", href: "/placements" },
                              { label: "Tools", href: "/tools" },
                              { label: "Blog", href: "/blog" },
                              { label: "FAQs", href: "/faqs" },
                            ].map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/5 hover:text-primary dark:hover:bg-white/5 dark:hover:text-white transition-all text-left"
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
                      className={`relative px-3 py-2 text-xs font-medium transition-colors hover:text-primary dark:hover:text-white ${
                        isActive
                          ? "text-primary dark:text-white"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-primary/10 dark:bg-white/10 rounded-lg -z-10"
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
            <a
              href="https://t.me/tradewithashwinisd6"
              target="_blank"
              className="hidden lg:flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all hover:scale-105 shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Free Channel</span>
            </a>
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-3">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    href="https://t.me/tradewithashwinisd6"
                    target="_blank"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
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
                    className="relative text-xs font-medium bg-primary text-white px-5 py-2.5 rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
              className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
                    alt="Ashwini SD Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                  Ashwini SD
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {isAuthenticated && (
                <div className="mb-4">
                  <UserMenu variant="inline" />
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mt-4" />
                </div>
              )}

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      pathname === link.href
                        ? "bg-primary/10 text-primary dark:bg-white/10 dark:text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

              <a
                href="https://t.me/tradewithashwinisd6"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors"
              >
                <Send className="w-5 h-5" />
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
                    className="px-4 py-3 rounded-xl text-sm font-bold text-center bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
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

