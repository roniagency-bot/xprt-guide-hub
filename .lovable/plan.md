## Goal

Route submissions from your site to **different GHL workflows/forms** based on (a) which form was filled and (b) which line of business the contact picked (personal vs bonds, short app vs long app).

You have two clean ways to do this. I recommend **Option A** because it's simpler, doesn't require new GHL infrastructure, and matches how your forms are organized today.

---

## Option A (recommended) — One inbound webhook + GHL routing on `form_type`

Keep a single `GHL_WEBHOOK_URL` inbound webhook. We add a `form_type` field to every submission (and a `application_length` field where it applies). Inside GHL, one workflow receives everything and uses an **If/Else condition** on `form_type` to branch into the right sub-workflow (assign to "Personal Lines" pipeline, send the long-app email, etc.).

### What I'd change in code
- Add a `form_type` string to every form's submission payload. Values:
  - `homeowners_quote`
  - `bonds_quote`
  - `quiz_homeowners`
  - `gated_offer` (tripwire / lead magnet)
  - `contact_general`
- Add `application_length: "short" | "long"` where it makes sense (the homeowners + bonds quote forms).
- Add `line_of_business: "personal" | "bonds" | "commercial"` so GHL can branch on LOB without parsing strings.
- These fields go into the JSON we already POST to the webhook — no new endpoints, no new secrets.

### What you'd do in GHL (one-time)
1. In the existing workflow's Inbound Webhook trigger, send one test submission and click *Auto-detect fields* so `form_type`, `application_length`, and `line_of_business` show up as mappable variables.
2. Add an **If/Else** step right after the trigger:
   - `form_type = homeowners_quote AND application_length = long` → push into the Long Homeowners App workflow / form follow-up.
   - `form_type = homeowners_quote AND application_length = short` → short app follow-up.
   - `form_type = bonds_quote` → bonds pipeline.
   - `form_type = quiz_homeowners` → quiz nurture sequence.
   - `form_type = gated_offer` → tripwire nurture (note: we already send the bilingual tripwire email separately).
3. If you want the contact to **finish a GHL-hosted form** (your existing short/long applications in GHL), have the branch send them an email/SMS with the GHL form link, pre-filled with their contact ID. GHL's form links accept query params for prefill.

### Pros
- No new env vars, no new code paths to maintain.
- All routing rules live in GHL where you can change them without a deploy.
- Easy to add new branches later (auto, renters, landlord) — just add a new `form_type` value.

### Cons
- All branching logic is in one GHL workflow (still very manageable, but it's one place).

---

## Option B — Separate inbound webhook per form

Add multiple secrets (`GHL_WEBHOOK_URL_HOMEOWNERS`, `GHL_WEBHOOK_URL_BONDS`, `GHL_WEBHOOK_URL_QUIZ`, `GHL_WEBHOOK_URL_TRIPWIRE`, etc.) and have each server function pick the right URL. Falls back to `GHL_WEBHOOK_URL` if a specific one isn't set.

### Pros
- Each form maps 1:1 to its own GHL workflow — zero branching logic.

### Cons
- More secrets to manage.
- You can't change the routing without redeploying / editing secrets.
- Doesn't help with the short-vs-long distinction inside the **same** form (you'd still need a field for that).

---

## Recommended plan (Option A)

1. **Add routing fields to the submission payloads** in the three server functions:
   - `src/server/leads.functions.ts` — accept optional `form_type`, `application_length`, `line_of_business` on the input, validate them, store them in `notes` (JSON), and include them in the GHL webhook body.
   - `src/server/quiz.functions.ts` — already sends `type: "quiz_submission"`; we'll standardize that to `form_type: "quiz_homeowners"` (keep the old key for back-compat).
2. **Update the four forms to send those fields:**
   - `HomeownersLeadForm` → `form_type: "homeowners_quote"`, `line_of_business: "personal"`, `application_length: "short"` (or `"long"` if you have a long variant — see question below).
   - `BondsLeadForm` → `form_type: "bonds_quote"`, `line_of_business: "bonds"`.
   - `LeadCaptureForm` → `form_type: "gated_offer"`, `line_of_business` derived from the offer's category.
   - `HomeownersQuiz` → `form_type: "quiz_homeowners"`, `line_of_business: "personal"`.
3. **In GHL**, build the If/Else routing as described above. I'll give you the field names and example values so the *Auto-detect* picks them up cleanly.
4. **Test each form** end-to-end and confirm each one lands in the correct GHL workflow branch.

### Out of scope
- Building a new "long application" form on the site if you don't already have one — I assume the long app lives in GHL and we just route people to it.
- Replacing the tripwire email with a GHL email (keeping the existing transactional flow).

---

## One question before I build

I need to know how you want the **short vs long application** split to work. Pick one:

- **(i)** Both short and long live in GHL (as GHL forms). The site form is just the "lead capture", and based on what the contact picks (e.g. a radio: *"Quick quote"* vs *"Full application"*), GHL emails them the right form link.
- **(ii)** The short app is the on-site form (`HomeownersLeadForm`); the long app lives in GHL and the workflow sends a link if the contact opts into a full application.
- **(iii)** You want me to add a "Quick quote" vs "Full application" choice directly on the on-site form so `application_length` is set by the user, not derived.

If you tell me which one, I'll wire it up in the build step.