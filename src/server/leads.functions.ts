import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent" }) }),
  lead_magnet_id: z.string().uuid().optional(),
  category_tag: z.string().max(80).optional(),
  source_path: z.string().max(300).optional(),
  state: z.enum(["NV", "CO"]).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("lead_submissions").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      consent: data.consent,
      lead_magnet_id: data.lead_magnet_id ?? null,
      category_tag: data.category_tag ?? null,
      source_path: data.source_path ?? null,
      state: data.state ?? null,
    });
    if (error) {
      console.error("submitLead failed:", error);
      return { ok: false as const, error: "Could not submit. Please try again." };
    }
    return { ok: true as const };
  });
