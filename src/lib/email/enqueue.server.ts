// Server-only helper to render a registered transactional template and
// enqueue it for delivery via the existing pgmq queue. Used by server
// functions that need to send emails on behalf of unauthenticated visitors
// (e.g. public lead/offer forms) where we can't go through the JWT-gated
// /lovable/email/transactional/send route.
import * as React from "react";
import { render } from "@react-email/components";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TEMPLATES } from "@/lib/email-templates/registry";

const SITE_NAME = "XPRT Insurance";
const SENDER_DOMAIN = "notify.www.xprtinsurance.com";
const FROM_DOMAIN = "notify.www.xprtinsurance.com";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface EnqueueOptions {
  templateName: string;
  recipientEmail: string;
  templateData?: Record<string, any>;
  idempotencyKey?: string;
}

export async function enqueueTransactionalEmail(opts: EnqueueOptions) {
  const template = TEMPLATES[opts.templateName];
  if (!template) {
    return { ok: false as const, error: `Unknown template: ${opts.templateName}` };
  }

  const recipient = (template.to || opts.recipientEmail || "").trim().toLowerCase();
  if (!recipient) return { ok: false as const, error: "Missing recipient" };

  // Suppression check (fail-closed)
  const { data: suppressed, error: supErr } = await supabaseAdmin
    .from("suppressed_emails")
    .select("email")
    .eq("email", recipient)
    .maybeSingle();
  if (supErr) {
    console.error("[enqueueTransactionalEmail] suppression read failed", supErr);
    return { ok: false as const, error: "Suppression check failed" };
  }
  if (suppressed) return { ok: false as const, error: "suppressed" };

  // Ensure unsubscribe token (one per email)
  const { data: existingToken } = await supabaseAdmin
    .from("email_unsubscribe_tokens")
    .select("token, used_at")
    .eq("email", recipient)
    .maybeSingle();

  let unsubscribeToken: string;
  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token;
  } else if (existingToken && existingToken.used_at) {
    return { ok: false as const, error: "unsubscribed" };
  } else {
    unsubscribeToken = generateToken();
    const { error: tErr } = await supabaseAdmin
      .from("email_unsubscribe_tokens")
      .upsert({ email: recipient, token: unsubscribeToken }, { onConflict: "email" });
    if (tErr) {
      console.error("[enqueueTransactionalEmail] token upsert failed", tErr);
      return { ok: false as const, error: "Token storage failed" };
    }
  }

  const data = opts.templateData ?? {};
  const element = React.createElement(template.component, data);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject =
    typeof template.subject === "function" ? template.subject(data) : template.subject;

  const messageId = crypto.randomUUID();
  const idempotencyKey = opts.idempotencyKey || messageId;

  await supabaseAdmin.from("email_send_log").insert({
    message_id: messageId,
    template_name: opts.templateName,
    recipient_email: recipient,
    status: "pending",
  });

  const { error: enqErr } = await supabaseAdmin.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: "transactional",
      label: opts.templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  });

  if (enqErr) {
    console.error("[enqueueTransactionalEmail] enqueue failed", enqErr);
    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: opts.templateName,
      recipient_email: recipient,
      status: "failed",
      error_message: "Failed to enqueue email",
    });
    return { ok: false as const, error: "Enqueue failed" };
  }

  return { ok: true as const, messageId };
}
