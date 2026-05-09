import { enqueueTransactionalEmail } from "./src/lib/email/enqueue.server";
import { supabaseAdmin } from "./src/integrations/supabase/client.server";

async function run(lang: "en" | "es", email: string, slug: string) {
  const { data: magnet } = await supabaseAdmin
    .from("lead_magnets").select("slug,title_en,title_es").eq("slug", slug).maybeSingle();
  const offerTitle = (lang === "es" ? magnet?.title_es : magnet?.title_en) || magnet?.title_en || slug;
  const bytes = new Uint8Array(24); crypto.getRandomValues(bytes);
  const token = Array.from(bytes).map(b => b.toString(16).padStart(2,"0")).join("");
  await supabaseAdmin.from("download_tokens").insert({ token, slug, email: email.toLowerCase(), lang });
  const downloadUrl = `https://www.xprtinsurance.com/api/public/downloads/${slug}?t=${token}`;
  const result = await enqueueTransactionalEmail({
    templateName: "tripwire-offer", recipientEmail: email,
    idempotencyKey: `e2e-${lang}-${Date.now()}`,
    templateData: { name: lang === "es" ? "Maria" : "Test", offerTitle, downloadUrl, lang },
  });
  console.log(`[${lang}]`, result, "token=", token);
  return token;
}
const tEn = await run("en", "test-en@example.com", "homeowners-cheat-sheet");
const tEs = await run("es", "test-es@example.com", "nevada-dealership-cheat-sheet");
console.log("\nTOKEN_EN=" + tEn);
console.log("TOKEN_ES=" + tEs);
