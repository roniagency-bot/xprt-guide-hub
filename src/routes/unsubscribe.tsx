import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: z.object({ token: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Unsubscribe — XPRT Insurance" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UnsubscribePage,
});

type Status = "loading" | "valid" | "already" | "invalid" | "done" | "error";

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  async function confirm() {
    if (!token) return;
    setStatus("loading");
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json();
      if (data.success) setStatus("done");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="container-prose flex min-h-[60vh] items-center justify-center py-16">
      <div className="max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="font-display text-2xl">Email preferences</h1>
        {status === "loading" && (
          <p className="mt-4 text-muted-foreground">Working…</p>
        )}
        {status === "valid" && (
          <>
            <p className="mt-4 text-muted-foreground">
              Click below to unsubscribe from XPRT Insurance emails.
            </p>
            <button
              onClick={confirm}
              className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Confirm unsubscribe
            </button>
          </>
        )}
        {status === "already" && (
          <p className="mt-4 text-muted-foreground">You're already unsubscribed.</p>
        )}
        {status === "done" && (
          <p className="mt-4 text-muted-foreground">
            You've been unsubscribed. Sorry to see you go.
          </p>
        )}
        {status === "invalid" && (
          <p className="mt-4 text-muted-foreground">This unsubscribe link is invalid or expired.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-destructive">Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  );
}
