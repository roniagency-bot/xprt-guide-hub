import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const QuizSchema = z.object({
  quiz_slug: z.string().min(1).max(80),
  category_tag: z.string().max(80).optional(),
  first_name: z.string().trim().min(1, "Please enter your first name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  state: z.enum(["NV", "CO"]),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent" }) }),
  answers: z
    .array(
      z.object({
        question: z.string().max(300),
        answer: z.enum(["yes", "no", "unsure"]),
      }),
    )
    .min(1)
    .max(40),
  score: z.number().int().min(0).max(100),
  result_type: z.enum(["low", "medium", "high"]),
  source_path: z.string().max(300).optional(),
  page_url: z.string().max(500).optional(),
});

export type QuizInput = z.infer<typeof QuizSchema>;

export const submitQuiz = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuizSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("quiz_submissions").insert({
      quiz_slug: data.quiz_slug,
      category_tag: data.category_tag ?? null,
      first_name: data.first_name,
      email: data.email,
      phone: data.phone || null,
      state: data.state,
      consent: data.consent,
      answers: data.answers,
      score: data.score,
      result_type: data.result_type,
      source_path: data.source_path ?? null,
      page_url: data.page_url ?? null,
    });
    if (error) {
      console.error("submitQuiz failed:", error);
      return { ok: false as const, error: "Could not submit. Please try again." };
    }

    // Optional GoHighLevel webhook forward (server-side, non-fatal).
    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "quiz_submission",
            quiz_slug: data.quiz_slug,
            category: data.category_tag ?? null,
            first_name: data.first_name,
            email: data.email,
            phone: data.phone || null,
            state: data.state,
            consent: data.consent,
            score: data.score,
            result_type: data.result_type,
            answers: data.answers,
            page_url: data.page_url ?? null,
            submitted_at: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("GHL webhook (quiz) forward failed:", err);
      }
    }

    return { ok: true as const };
  });
