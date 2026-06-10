import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as content from "@/server/content.server";

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const categories = await content.fetchAllServiceCategories();
  return { categories };
});

export const getCategoryHub = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(80) }).parse(d))
  .handler(async ({ data }) => {
    const result = await content.fetchCategoryWithServices(data.slug);
    return result;
  });

export const getServicePage = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const result = await content.fetchServicePage(data.slug);
    return result;
  });

export const getFaqHub = createServerFn({ method: "GET" }).handler(async () => {
  return content.fetchAllFaqsGrouped();
});

export const getFaq = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(180) }).parse(d))
  .handler(async ({ data }) => {
    return content.fetchFaq(data.slug);
  });

export const getLeadMagnet = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    return content.fetchLeadMagnet(data.slug);
  });

export const getStateData = createServerFn({ method: "GET" })
  .inputValidator((d: { state: "NV" | "CO" }) => z.object({ state: z.enum(["NV", "CO"]) }).parse(d))
  .handler(async ({ data }) => {
    const rules = await content.fetchStateRules(data.state);
    return { rules };
  });
