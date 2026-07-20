import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { TelegramButton } from "@/components/ui/telegram-button";
import { InstagramButton } from "@/components/ui/instagram-button";
import { AuthProvider } from "@/contexts/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ashwini SD Research — SEBI Registered Research Analyst",
    template: "%s | Ashwini SD Research",
  },
  description: "Professional trading and research services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navbar />
            {children}
            <WhatsAppButton />
            <TelegramButton />
            <InstagramButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
