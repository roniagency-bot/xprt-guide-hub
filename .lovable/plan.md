## Good news: the code is already in place

Both server functions that receive form submissions already forward to GoHighLevel when an env var named `GHL_WEBHOOK_URL` is present:

- `src/server/leads.functions.ts` — handles every "request the offer / quote / contact" submission from:
  - `HomeownersLeadForm`
  - `BondsLeadForm`
  - `LeadCaptureForm` (the generic tripwire/gated-offer form on `/offers/$slug`, etc.)
- `src/server/quiz.functions.ts` — handles `HomeownersQuiz` results.

Each one POSTs JSON with the contact's name, email, phone, state, consent, source page, and (for the quiz) score + answers. Failures are non-fatal so a GHL outage won't break your forms.

That means there is **nothing to build** — you only need to plug in the URL.

## Steps to connect your CRM

1. **Copy the inbound webhook URL from GHL.** In GoHighLevel: *Automation → Workflows → your workflow → Inbound Webhook trigger → copy the URL.* It looks like `https://services.leadconnectorhq.com/hooks/...`.

2. **Add it as a backend secret in Lovable** with the exact name `GHL_WEBHOOK_URL`. I'll trigger the secret form for you in the next step after you approve this plan. Once saved, it's immediately available to the server functions — no redeploy needed.

3. **Test end-to-end** (I'll do this after the secret is set):
   - Submit the homeowners lead form on `/personal/homeowners-insurance`.
   - Submit the bonds form on `/business-insurance/bonds`.
   - Submit a gated offer form (e.g. `/offers/...`) — this also triggers the tripwire email.
   - Submit the homeowners quiz.
   - For each one, confirm the contact appears in GHL and the workflow fires.

4. **In GHL, map the incoming fields to a contact.** The payload uses these keys (already standardized):
   - `full_name`, `email`, `phone`, `state`, `consent`
   - `category` (e.g. `homeowners`, `bonds`)
   - `source_path` (which page they came from)
   - `first_name`, `last_name`, `lead_source`, `resource_name`, `page_url`, `submitted_at` (when available)
   - Quiz only: `type: "quiz_submission"`, `quiz_slug`, `score`, `result_type`, `answers`

   In the GHL workflow's Inbound Webhook trigger, click *"Auto-detect fields"* after we send a test submission, then map them to the matching contact properties.

## Out of scope (intentionally)

- Per-form custom webhook URLs (right now everything goes to one inbound URL — clean and recommended).
- Removing or replacing the existing tripwire email flow.
- Swapping to GHL's API with OAuth (the inbound webhook is simpler and matches what you set up).

Approve and I'll request the `GHL_WEBHOOK_URL` secret, then run the test submissions and confirm delivery.