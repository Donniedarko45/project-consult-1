import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
              suppressHydrationWarning
            >
              <Image
                src="/images/Ashwini SD.png"
                alt="Ashwini SD Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-white text-xl font-bold">Ashwini SD</span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed">
              Empowering traders with ethical research and professional
              education. Registered with Securities and Exchange Board of India.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/plans"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/disclosures"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Regulatory Disclosures
                </Link>
              </li>
              <li>
                <Link
                  href="/charter"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Investor Charter
                </Link>
              </li>
              <li>
                <Link
                  href="/complaints"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Complaint Redressal
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-cta transition-colors"
                  suppressHydrationWarning
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cta" />
                <span>123, Financial District, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cta" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cta" />
                <span>support@example.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://t.me/tradewithashwinisd6"
                target="_blank"
                className="hover:text-cta transition-colors flex items-center gap-1"
                suppressHydrationWarning
              >
                <Send className="w-5 h-5" />
                <span className="text-xs font-bold">Join Channel</span>
              </a>
              <a
                href="#"
                className="hover:text-cta transition-colors"
                suppressHydrationWarning
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-cta transition-colors"
                suppressHydrationWarning
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-cta transition-colors"
                suppressHydrationWarning
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-cta transition-colors"
                suppressHydrationWarning
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-xs text-center text-gray-500 space-y-4">
          <p>
            <strong>Disclaimer:</strong> Investment in securities market are
            subject to market risks. Read all the related documents carefully
            before investing. Registration granted by SEBI and certification
            from NISM in no way guarantee performance of the intermediary or
            provide any assurance of returns to investors. The securities quoted
            are for illustration only and are not recommendatory.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Ashwini SD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
