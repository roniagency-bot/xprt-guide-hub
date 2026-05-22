import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  delay?: 0 | 75 | 150 | 225 | 300;
  as?: "div" | "section" | "li" | "ol" | "ul" | "article";
  className?: string;
};

const DELAY_CLASS: Record<NonNullable<RevealProps["delay"]>, string> = {
  0: "",
  75: "[transition-delay:75ms]",
  150: "[transition-delay:150ms]",
  225: "[transition-delay:225ms]",
  300: "[transition-delay:300ms]",
};

export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  React.useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref as React.Ref<any>}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        !visible && DELAY_CLASS[delay],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
