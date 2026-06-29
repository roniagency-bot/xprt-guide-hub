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

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 border-b border-gold/30 bg-gold px-4 py-2.5 text-center"
    >
      <p className="mx-auto max-w-4xl text-sm font-medium text-gold-foreground">
        {UI.holidayBanner[lang]}
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={UI.holidayBannerClose[lang]}
        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gold-foreground/80 transition-colors hover:bg-gold-foreground/10 hover:text-gold-foreground focus:outline-none focus:ring-2 focus:ring-gold-foreground/50"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
