import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/server/leads.functions";
import { Loader2 } from "lucide-react";

export function LeadCaptureForm({
  leadMagnetId,
  leadMagnetSlug,
  categoryTag,
}: {
  leadMagnetId?: string;
  leadMagnetSlug: string;
  categoryTag?: string;
}) {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      consent: fd.get("consent") === "on",
      lead_magnet_id: leadMagnetId,
      category_tag: categoryTag,
      source_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    };
    try {
      const res = await submit({ data: payload as never });
      if (!res.ok) {
        setErrors({ form: res.error });
        setLoading(false);
        return;
      }
      navigate({ to: "/thank-you/$slug", params: { slug: leadMagnetSlug } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not submit. Please try again.";
      setErrors({ form: msg });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" name="full_name" required minLength={2} maxLength={120} placeholder="Jane Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={200} placeholder="jane@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="text-xs text-muted-foreground">(optional)</span>
        </Label>
        <Input id="phone" name="phone" type="tel" maxLength={40} placeholder="(702) 555-0100" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm">
        <Checkbox name="consent" required className="mt-0.5" />
        <span className="text-muted-foreground">
          I consent to receive my requested guide and occasional educational emails from XPRT
          Insurance. Unsubscribe anytime.
        </span>
      </label>
      {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send me the guide
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        We never share your information. Educational content only.
      </p>
    </form>
  );
}
