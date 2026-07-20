"use client";

import Link from "next/link";

export function InstagramButton() {
  return (
    <Link
      href="https://www.instagram.com/ashwinisd_researchanalyst?igsh=NjJhNTUyMHpxYjF0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[10.5rem] right-6 z-50 flex items-center justify-center w-14 h-14 text-white rounded-full shadow-2xl transition-transform hover:scale-110 animate-bounce-slow bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)]"
      aria-label="Follow us on Instagram (opens in a new tab)"
      suppressHydrationWarning
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="currentColor"
        className="fill-current"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.396 3.635 1.363 2.668 2.33 2.403 3.503 2.344 4.78 2.285 6.06 2.272 6.469 2.272 12s.013 5.94.072 7.22c.059 1.277.324 2.45 1.291 3.417.967.967 2.14 1.232 3.417 1.291C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.324 3.417-1.291.967-.967 1.232-2.14 1.291-3.417.059-1.28.072-1.689.072-7.22s-.013-5.94-.072-7.22c-.059-1.277-.324-2.45-1.291-3.417C19.398.396 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    </Link>
  );
}
