import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLeadMagnet } from "@/server/content.functions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/thank-you/$slug")({
  loader: async ({ params }) => {
    const data = await getLeadMagnet({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return pageHead({
      title: `Thank you — ${loaderData.title_en} | XPRT Insurance`,
      description: "Your guide is ready. Thanks for trusting XPRT Insurance.",
      path: `/thank-you/${loaderData.slug}`,
    });
  },
  component: ThankYou,
  notFoundComponent: () => (
    <div className="container-prose py-20 text-center">
      <Link to="/" className="text-gold underline">Back home</Link>
    </div>
  ),
});

function ThankYou() {
  const lm = Route.useLoaderData();
  return (
    <section className="bg-cream-gradient">
      <div className="container-prose flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-balance font-display text-4xl md:text-5xl">Your guide is ready</h1>
        <p className="mt-4 max-w-xl text-pretty text-muted-foreground md:text-lg">
          {lm.thank_you_message_en ?? "Check your inbox in a few minutes. In the meantime, you can download it directly below."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={lm.asset_url ?? "#"} target="_blank" rel="noopener noreferrer">
              <Download className="mr-1.5 h-4 w-4" /> Download {lm.title_en}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/book">
              Book a Free Review
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Want more? <Link to="/faq" className="text-foreground underline hover:text-gold">Browse the knowledge base</Link>.
        </p>
      </div>
    </section>
  );
}
