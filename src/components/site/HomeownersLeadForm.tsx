import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/server/leads.functions";
import { Loader2 } from "lucide-react";

export function HomeownersLeadForm({
  leadMagnetId,
  leadMagnetSlug,
  resourceName,
  thankYouSlug,
  ctaLabel = "Get the Guide",
  leadSource = "homeowners-page",
}: {
  leadMagnetId?: string;
  leadMagnetSlug: string;
  resourceName: string;
  thankYouSlug: string;
  ctaLabel?: string;
  leadSource?: string;
}) {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<"NV" | "CO" | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    if (!state) {
      setErrors({ state: "Please select your state" });
      return;
    }

    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const first_name = String(fd.get("first_name") || "").trim();
    const last_name = String(fd.get("last_name") || "").trim();
    const full_name = `${first_name} ${last_name}`.trim();
    const page_url =
      typeof window !== "undefined" ? window.location.href : undefined;
    const source_path =
      typeof window !== "undefined" ? window.location.pathname : undefined;

    const payload = {
      full_name,
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      consent: fd.get("consent") === "on",
      lead_magnet_id: leadMagnetId,
      category_tag: "homeowners",
      source_path,
      state,
      meta: {
        first_name,
        last_name,
        lead_source: leadSource,
        resource_name: resourceName,
        page_url,
        submitted_at: new Date().toISOString(),
      },
    };

    try {
      const res = await submit({ data: payload as never });
      if (!res.ok) {
        setErrors({ form: res.error });
        setLoading(false);
        return;
      }
      navigate({ to: "/thank-you/$slug", params: { slug: thankYouSlug } });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not submit. Please try again.";
      setErrors({ form: msg });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${leadMagnetSlug}-first_name`}>First name</Label>
          <Input
            id={`${leadMagnetSlug}-first_name`}
            name="first_name"
            required
            minLength={1}
            maxLength={80}
            placeholder="Jane"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${leadMagnetSlug}-last_name`}>Last name</Label>
          <Input
            id={`${leadMagnetSlug}-last_name`}
            name="last_name"
            required
            minLength={1}
            maxLength={80}
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${leadMagnetSlug}-email`}>Email</Label>
        <Input
          id={`${leadMagnetSlug}-email`}
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder="jane@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${leadMagnetSlug}-phone`}>Phone</Label>
        <Input
          id={`${leadMagnetSlug}-phone`}
          name="phone"
          type="tel"
          required
          maxLength={40}
          placeholder="(702) 555-0100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${leadMagnetSlug}-state`}>State</Label>
        <Select value={state} onValueChange={(v) => setState(v as "NV" | "CO")}>
          <SelectTrigger id={`${leadMagnetSlug}-state`}>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NV">Nevada</SelectItem>
            <SelectItem value="CO">Colorado</SelectItem>
          </SelectContent>
        </Select>
        {errors.state && (
          <p className="text-sm text-destructive">{errors.state}</p>
        )}
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm">
        <Checkbox name="consent" required className="mt-0.5" />
        <span className="text-muted-foreground">
          I consent to receive my requested guide and occasional educational emails
          from XPRT Insurance. Unsubscribe anytime.
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
        {ctaLabel}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        We never share your information. Educational content only.
      </p>
    </form>
  );
}
