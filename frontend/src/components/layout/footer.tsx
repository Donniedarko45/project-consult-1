import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#050505] text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6 py-20 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 lg:mb-28">
          <div className="space-y-8">
            <Link
              href="/"
              className="flex items-center gap-3"
              suppressHydrationWarning
            >
              <div className="w-12 h-12 relative flex items-center justify-center bg-white rounded-xl overflow-hidden p-2 shadow-sm border border-gray-100">
                <Image
                  src="/images/Ashwini SD.png"
                  alt="Ashwini SD Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-gray-900 dark:text-white text-2xl font-black tracking-tighter transition-colors">Ashwini SD</span>
            </Link>
            <p className="text-sm leading-relaxed font-medium">
              Empowering global traders with institutional-grade ethical research 
               and professional educational frameworks. <br/>
              <span className="text-primary font-bold">SEBI Registered Research Analyst.</span>
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/tradewithashwinisd6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/5 shadow-sm"
                suppressHydrationWarning
                title="Join Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/ashwinisd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/5 shadow-sm"
                suppressHydrationWarning
                title="Follow Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/5 shadow-sm"
                suppressHydrationWarning
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/5 shadow-sm"
                suppressHydrationWarning
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs mb-8 transition-colors">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary origin-left scale-0 group-hover:scale-100 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary origin-left scale-0 group-hover:scale-100 transition-transform" />
                  About Agency
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary origin-left scale-0 group-hover:scale-100 transition-transform" />
                  Research Products
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary origin-left scale-0 group-hover:scale-100 transition-transform" />
                  Pricing Models
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs mb-8 transition-colors">E-Learning</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li>
                <a 
                  href="http://www.ashwinitradingacademy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-2 group"
                  suppressHydrationWarning
                >
                  <ExternalLink className="w-4 h-4" />
                  Ashwini Trading Academy
                </a>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  Mastery Courses
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  Live Workshops
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-primary transition-colors inline-flex items-center gap-2 group" suppressHydrationWarning>
                  VIP Mentorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs mb-8 transition-colors">Assistance</h4>
            <ul className="space-y-6 text-sm font-bold text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1 transition-transform group-hover:scale-110" />
                <span className="leading-relaxed">123, Financial Hub, <br/>Mumbai, India - 400001</span>
              </li>
              <li className="flex items-center gap-4 group text-gray-900 dark:text-white transition-colors">
                <Phone className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">support@ashwinisd.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 pt-12 text-center space-y-10">
          <div className="max-w-5xl mx-auto space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white transition-colors">Regulatory Disclaimer</h5>
            <p className="text-[11px] leading-[1.8] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-justify lg:text-center transition-colors">
              &quot;Investment in securities market are subject to market risks. Read all the related documents carefully before investing. 
              Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or 
              provide any assurance of returns to investors. The securities quoted are for illustration only and are not recommendatory.&quot; <br/><br/>
              Investment in the stock market involves risk. Returns are not guaranteed. We are SEBI Registered Research Analysts (INK200000000). 
              Research provided is for educational purposes and based on statistical analysis.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-200 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 transition-colors">
              &copy; {new Date().getFullYear()} Ashwini SD Research. All Strategic assets reserved.
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600">
              <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="/charter" className="hover:text-gray-900 dark:hover:text-white transition-colors">Investor Charter</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
