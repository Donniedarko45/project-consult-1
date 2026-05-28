import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/plans", label: "Pricing" },
  { href: "/charter", label: "Investment Charter" },
  { href: "/contact", label: "Contact Us" },
];

const importantLinks = [
  { href: "/terms", label: "Terms & Condition", external: false },
  { href: "/privacy", label: "Privacy Policy", external: false },
  { href: "/refund", label: "Refund Policy", external: false },
  { href: "/disclaimer", label: "Disclaimer & Disclosure", external: false },
  { href: "/grievance", label: "Grievance Redressal", external: false },
];

const socialLinks = [
  {
    href: "https://wa.me/918861756040",
    label: "WhatsApp",
    icon: MessageCircle,
  },
  {
    href: "https://t.me/tradewithashwinisd6",
    label: "Telegram",
    icon: Send,
  },
  {
    href: "https://www.instagram.com/ashwinisd_researchanalyst?igsh=NjJhNTUyMHpxYjF0",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.youtube.com/channel/UCmXpfbIwQ6eGqkcrkoSpnjw",
    label: "YouTube",
    icon: Youtube,
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h4 className="text-2xl font-black uppercase tracking-tight text-white">
        {children}
      </h4>
      <div className="flex items-center gap-2">
        <div className="h-0.5 w-28 bg-primary" />
        <div className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-white" />
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[38%] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.28),transparent_62%)]" />
        <div className="absolute inset-y-0 right-0 w-[34%] bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.24),transparent_58%)]" />
        <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(125deg,transparent_0%,transparent_11%,rgba(29,78,216,0.16)_11%,transparent_32%,transparent_100%)]" />
      </div>

      {/* Global Telegram CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-3xl -z-1" />
        <div className="container mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Active Community Access
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight transition-colors">
            Ready to Trade with Clarity? <br />
            <span className="text-blue-500">Join our Telegram Channel</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">
            Get real-time insights, institutional setups, and trade plans shared by our SEBI-registered analysts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a
              href="https://t.me/tradewithashwinisd6"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-10 py-6 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-2xl text-lg transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 overflow-hidden"
            >
              <Send className="w-5 h-5 mr-3 transition-transform group-hover:rotate-12" />
              Join The Free Channel
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1.15fr]">
          <div className="space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-4"
              suppressHydrationWarning
            >
              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white p-2 shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                <Image
                  src="/images/Ashwini SD.png"
                  alt="Ashwini SD Logo"
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-lg font-black uppercase tracking-[0.2em] text-white">
                  Research Analyst
                </p>
              </div>
            </Link>

            <div className="space-y-6">
              <SectionTitle>ASHWINISD</SectionTitle>
              <p className="max-w-xl text-lg leading-9 text-white/82">
                Our Analyst is a SEBI-certified Research Analyst, adhering to
                all the guidelines to ensure that you always get authentic
                service.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-white/50">
                SEBI Registration
              </p>
              <div className="inline-flex rounded-2xl border border-primary/35 bg-white/[0.03] px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
                <span className="text-2xl font-black tracking-tight text-white">
                  INH000024453
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/[0.02] text-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white"
                  suppressHydrationWarning
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-7">
            <SectionTitle>Quick Links</SectionTitle>
            <ul className="space-y-5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-lg font-semibold text-white/84 transition-colors hover:text-white"
                    suppressHydrationWarning
                  >
                    <ChevronRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-7">
            <SectionTitle>Imp Links</SectionTitle>
            <ul className="space-y-5">
              {importantLinks.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-lg font-semibold text-white/84 transition-colors hover:text-white"
                      suppressHydrationWarning
                    >
                      <ChevronRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      <span>{item.label}</span>
                      <ExternalLink className="h-4 w-4 text-white/40 transition-colors group-hover:text-primary" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-3 text-lg font-semibold text-white/84 transition-colors hover:text-white"
                      suppressHydrationWarning
                    >
                      <ChevronRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-7">
            <SectionTitle>Contact Us</SectionTitle>
            <ul className="space-y-6 text-lg leading-8 text-white/84">
              <li className="flex items-start gap-4">
                <div className="mt-1 h-5 w-5 shrink-0 text-primary">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/45">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/918861756040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white transition-colors hover:text-primary"
                  >
                    +91 88617 56040
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/45">
                    Phone Support
                  </p>
                  <a
                    href="tel:+919845961990"
                    className="font-semibold text-white transition-colors hover:text-primary"
                  >
                    +91 98459 61990
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/45">
                    Email Support
                  </p>
                  <a
                    href="mailto:ashwini@ashwinisdresearch.com"
                    className="block font-semibold text-white transition-colors hover:text-primary"
                  >
                    ashwini@ashwinisdresearch.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/45">
                    Registered Office
                  </p>
                  <p className="font-semibold text-white">
                    2nd floor, 545/1, Chinmaya Mission Hospital Rd,
                    <br />
                    Stage 1, Indiranagar, Bengaluru,
                    <br />
                    Karnataka 560038
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
         

          <div className="flex flex-col items-center gap-5 text-center text-sm text-white/48 lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <p className="font-bold uppercase tracking-[0.22em]">
              © {new Date().getFullYear()} Ashwini SD Research. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-white/70 lg:justify-end">
              <Link
                href="/disclosures"
                className="transition-colors hover:text-primary"
              >
                Disclosures
              </Link>
              <Link
                href="/charter"
                className="transition-colors hover:text-primary"
              >
                Investor Charter
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
