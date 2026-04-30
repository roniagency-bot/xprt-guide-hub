import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";

export type FaqEntry = {
  slug: string;
  question: string;
  short_answer: string;
  funnel_stage?: "tofu" | "mofu" | "bofu";
};

const STAGE_LABEL: Record<string, string> = {
  tofu: "Start here",
  mofu: "Go deeper",
  bofu: "Ready to act",
};

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <Accordion type="single" collapsible className="w-full divide-y divide-border rounded-xl border border-border bg-card">
      {items.map((item) => (
        <AccordionItem key={item.slug} value={item.slug} className="border-0 px-6">
          <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline">
            <span className="flex flex-1 items-center gap-3 pr-4">
              {item.funnel_stage && (
                <span className="hidden shrink-0 rounded-full border border-gold/40 bg-gold/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70 md:inline-flex">
                  {STAGE_LABEL[item.funnel_stage]}
                </span>
              )}
              <span className="text-balance">{item.question}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
            <p>{item.short_answer}</p>
            <Link
              to="/faq/$slug"
              params={{ slug: item.slug }}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-gold"
            >
              Read the full answer
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
