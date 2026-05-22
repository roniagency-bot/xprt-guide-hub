import * as React from "react";
import { Link } from "@tanstack/react-router";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { isHomeownersFaqSlug } from "@/lib/homeowners-faqs";
import { isBondsFaqSlug } from "@/lib/bonds-faqs";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqEntry = {
  slug: string;
  question: string;
  short_answer: string;
  funnel_stage?: "tofu" | "mofu" | "bofu";
};

const STAGE_LABEL: Record<string, string> = {
  tofu: "Understanding the Basics",
  mofu: "Coverage & Cost Details",
  bofu: "Ready for a Coverage Review?",
};

function MotionFaqContent({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <AccordionPrimitive.Content forceMount asChild>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    height: { type: "spring", stiffness: 260, damping: 32, mass: 0.9 },
                    opacity: { duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
                  }
            }
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }
              }
              className="pb-6 text-base leading-relaxed text-muted-foreground"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionPrimitive.Content>
  );
}

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openValue, setOpenValue] = React.useState<string>("");

  return (
    <Accordion
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
      className="w-full divide-y divide-border rounded-xl border border-border bg-card overflow-hidden"
    >
      {items.map((item) => {
        const isHomeowners = isHomeownersFaqSlug(item.slug);
        const isBonds = isBondsFaqSlug(item.slug);
        const isOpen = openValue === item.slug;

        return (
          <AccordionItem
            key={item.slug}
            value={item.slug}
            className={cn(
              "border-0 px-6 transition-colors duration-300 border-l-2 border-l-transparent",
              "hover:bg-accent/40",
              "data-[state=open]:bg-accent/60 data-[state=open]:border-l-gold",
            )}
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                className={cn(
                  "group flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground",
                  "outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm",
                )}
              >
                <span className="flex flex-1 items-center gap-3 pr-4">
                  {item.funnel_stage && (
                    <span className="hidden shrink-0 rounded-full border border-gold/40 bg-gold/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70 md:inline-flex">
                      {STAGE_LABEL[item.funnel_stage]}
                    </span>
                  )}
                  <span className="text-balance">{item.question}</span>
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-data-[state=open]:rotate-180 group-data-[state=open]:text-gold",
                  )}
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <MotionFaqContent open={isOpen}>
              <p>{item.short_answer}</p>
              {isHomeowners ? (
                <Link to="/faq/homeowners/$slug" params={{ slug: item.slug }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold">
                  Read the full answer
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : isBonds ? (
                <Link to="/faq/bonds/$slug" params={{ slug: item.slug }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold">
                  Read the full answer
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link to="/faq/$slug" params={{ slug: item.slug }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold">
                  Read the full answer
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </MotionFaqContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
