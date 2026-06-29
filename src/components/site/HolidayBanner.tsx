"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLang, UI } from "@/lib/i18n";

// Display window: June 29, 2026 00:00 UTC through July 6, 2026 23:59:59 UTC
const SHOW_START = Date.UTC(2026, 5, 29);
const SHOW_END = Date.UTC(2026, 6, 6, 23, 59, 59, 999);
const STORAGE_KEY = "xprt-holiday-banner-2026-07-dismissed";

export function HolidayBanner() {
  const lang = useLang();
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined") {
        setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
      }
    } catch {
      // localStorage unavailable — leave banner visible
    }
  }, []);

  const now = Date.now();
  if (now < SHOW_START || now > SHOW_END) return null;

  if (!mounted || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      // ignore
    }
  };

  const message = UI.holidayBanner[lang];
  // Repeat the message a few times so the marquee fills the width on wide screens.
  const repeated = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="mx-12 inline-flex items-center gap-3">
      <span aria-hidden="true">★</span>
      <span>{message}</span>
    </span>
  ));

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 border-b border-gold/30 bg-gold py-3.5"
    >
      <div className="holiday-marquee overflow-hidden pr-12">
        <div className="holiday-marquee-track flex whitespace-nowrap text-base font-medium text-gold-foreground">
          <div className="flex shrink-0 items-center">{repeated}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {repeated}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={UI.holidayBannerClose[lang]}
        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gold-foreground/80 transition-colors hover:bg-gold-foreground/10 hover:text-gold-foreground focus:outline-none focus:ring-2 focus:ring-gold-foreground/50"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <style>{`
        .holiday-marquee-track {
          animation: holiday-marquee-scroll 40s linear infinite;
          width: max-content;
        }
        .holiday-marquee:hover .holiday-marquee-track {
          animation-play-state: paused;
        }
        @keyframes holiday-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .holiday-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
