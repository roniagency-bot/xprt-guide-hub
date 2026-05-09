import { enqueueTransactionalEmail } from "./src/lib/email/enqueue.server";
import { supabaseAdmin } from "./src/integrations/supabase/client.server";

async function run(lang: "en" | "es", email: string) {
  const slug = lang === "es" ? "nevada-bond-cheat-sheet" : "auto-coverage-guide";
  const { data: magnet } = await supabaseAdmin
    .from("lead_magnets")
    .select("slug,title_en,title_es")
    .eq("slug", slug)
    .maybeSingle();
  const offerTitle = (lang === "es" ? magnet?.title_es : magnet?.title_en) || magnet?.title_en || slug;

  // Generate token + insert
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");

  const { error: tokErr } = await supabaseAdmin
    .from("download_tokens")
    .insert({ token, slug, email: email.toLowerCase(), lang });
  console.log(`[${lang}] token insert:`, tokErr || "ok", "token=", token.slice(0, 12) + "...");

  const downloadUrl = `https://www.xprtinsurance.com/api/public/downloads/${slug}?t=${token}`;
  const result = await enqueueTransactionalEmail({
    templateName: "tripwire-offer",
    recipientEmail: email,
    idempotencyKey: `test-${lang}-${Date.now()}`,
    templateData: { name: lang === "es" ? "Maria" : "Test", offerTitle, downloadUrl, lang },
  });
  console.log(`[${lang}] enqueue:`, result);
  return { token, slug, downloadUrl };
}

const en = await run("en", "test-en@example.com");
const es = await run("es", "test-es@example.com");
console.log("\nEN URL:", en.downloadUrl);
console.log("ES URL:", es.downloadUrl);
