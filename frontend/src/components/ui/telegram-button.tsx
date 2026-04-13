"use client";

import Link from "next/link";

export function TelegramButton() {
  return (
    <Link
      href="https://t.me/yourchannel" // Replace with actual channel link
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full shadow-2xl transition-transform hover:scale-110 animate-bounce-slow"
      aria-label="Join our Telegram Channel"
      suppressHydrationWarning
    >
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="currentColor"
        className="fill-current"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48.98-.74 3.84-1.67 6.4-2.77 7.68-3.3 3.66-1.52 4.41-1.78 4.91-1.79.11 0 .35.03.51.15.13.11.17.26.19.37.02.12.02.26.01.4z" />
      </svg>
    </Link>
  );
}
