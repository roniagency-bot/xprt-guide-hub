/**
 * Server-side content fetchers — used inside server functions only.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export async function fetchAllServiceCategories() {
  const { data, error } = await supabaseAdmin
    .from("service_categories")
    .select("*")
    .order("display_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchCategoryWithServices(slug: string) {
  const { data: category, error } = await supabaseAdmin
    .from("service_categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!category) return null;
  const { data: services } = await supabaseAdmin
    .from("service_pages")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_published", true)
    .order("display_order");
  const { data: lead_magnets } = await supabaseAdmin
    .from("lead_magnets")
    .select("*")
    .eq("category_id", category.id)
    .eq("is_published", true);
  return { category, services: services ?? [], lead_magnets: lead_magnets ?? [] };
}

export async function fetchServicePage(slug: string) {
  const { data: page, error } = await supabaseAdmin
    .from("service_pages")
    .select("*, service_categories(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!page) return null;
  const { data: faqs } = await supabaseAdmin
    .from("faq_items")
    .select("id, slug, question_en, short_answer_en, funnel_stage, is_speakable")
    .eq("service_page_id", page.id)
    .eq("is_published", true)
    .order("funnel_stage");
  const { data: lead_magnets } = await supabaseAdmin
    .from("lead_magnets")
    .select("*")
    .eq("service_page_id", page.id)
    .eq("is_published", true);
  return { page, faqs: faqs ?? [], lead_magnets: lead_magnets ?? [] };
}

export async function fetchAllFaqsGrouped() {
  const { data: cats } = await supabaseAdmin
    .from("faq_categories")
    .select("*")
    .order("display_order");
  const { data: items } = await supabaseAdmin
    .from("faq_items")
    .select("id, slug, question_en, short_answer_en, funnel_stage, category_id")
    .eq("is_published", true)
    .order("funnel_stage");
  return { categories: cats ?? [], items: items ?? [] };
}

export async function fetchFaq(slug: string) {
  const { data: faq, error } = await supabaseAdmin
    .from("faq_items")
    .select("*, faq_categories(*), service_pages(slug, name_en), lead_magnets:cta_lead_magnet_id(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!faq) return null;
  type RelatedRow = { id: string; slug: string; question_en: string; short_answer_en: string; funnel_stage: string };
  let relatedExplicit: RelatedRow[] = [];
  if (faq.related_faq_ids && faq.related_faq_ids.length > 0) {
    const { data } = await supabaseAdmin
      .from("faq_items")
      .select("id, slug, question_en, short_answer_en, funnel_stage")
      .in("id", faq.related_faq_ids)
      .eq("is_published", true);
    relatedExplicit = (data as RelatedRow[]) ?? [];
  }

  // Always derive a funnel-aware nav: 2 MOFU + 1 BOFU from same category, excluding self.
  const { data: sameCat } = await supabaseAdmin
    .from("faq_items")
    .select("id, slug, question_en, short_answer_en, funnel_stage")
    .eq("category_id", faq.category_id ?? "")
    .eq("is_published", true)
    .neq("id", faq.id);
  const pool = (sameCat as RelatedRow[]) ?? [];
  const goDeeper = pool.filter((r) => r.funnel_stage === "mofu").slice(0, 2);
  const readyToAct = pool.filter((r) => r.funnel_stage === "bofu").slice(0, 1);

  // Merge explicit related with funnel nav, dedup by id
  const seen = new Set<string>();
  const related: RelatedRow[] = [];
  for (const r of [...relatedExplicit, ...goDeeper, ...readyToAct]) {
    if (!seen.has(r.id)) { seen.add(r.id); related.push(r); }
  }
  return { faq, related, goDeeper, readyToAct };
}

export async function fetchLeadMagnet(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("lead_magnets")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchStateRules(state: "NV" | "CO") {
  const { data } = await supabaseAdmin.from("state_rules").select("*").eq("state", state);
  return data ?? [];
}

export async function fetchAllSlugs() {
  const [services, faqs, magnets, cats] = await Promise.all([
    supabaseAdmin.from("service_pages").select("slug, updated_at").eq("is_published", true),
    supabaseAdmin.from("faq_items").select("slug, updated_at").eq("is_published", true),
    supabaseAdmin.from("lead_magnets").select("slug, updated_at").eq("is_published", true),
    supabaseAdmin.from("service_categories").select("slug, updated_at"),
  ]);
  return {
    services: services.data ?? [],
    faqs: faqs.data ?? [],
    magnets: magnets.data ?? [],
    categories: cats.data ?? [],
  };
}
