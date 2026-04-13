import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
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
    href: "https://t.me/tradewithashwinisd6",
    label: "Telegram",
    icon: Send,
  },
  {
    href: "https://www.instagram.com/ashwinitradingacademy/",
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
                <p className="text-xs font-black uppercase tracking-[0.35em] text-white">
                  Research Desk
                </p>
                <span className="text-3xl font-black tracking-tight text-white">
                  Ashwini SD
                </span>
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
                  <a
                    href="mailto:compliance@ashwinisdresearch.com"
                    className="block font-semibold text-white transition-colors hover:text-primary"
                  >
                    compliance@ashwinisdresearch.com
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
                    123, Financial District,
                    <br />
                    Mumbai, Maharashtra - 400001
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
