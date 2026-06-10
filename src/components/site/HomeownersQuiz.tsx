import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eyebrow } from "@/components/site/Section";
import { submitQuiz } from "@/lib/quiz.functions";

type Answer = "yes" | "no" | "unsure";

type Question = {
  q: string;
  /** Which answer is the "good" / low-risk signal. */
  good: Answer;
};

const QUESTIONS: Question[] = [
  { q: "Do you know your current dwelling coverage amount?", good: "yes" },
  { q: "Have you reviewed your policy in the last 12 months?", good: "yes" },
  { q: "Have you made renovations or major purchases recently?", good: "no" },
  { q: "Do you know if sewer backup is included in your policy?", good: "yes" },
  { q: "Do you know whether flood damage is excluded?", good: "yes" },
  { q: "Do you have enough liability coverage ($300K+ or umbrella)?", good: "yes" },
  { q: "Do you own jewelry, collectibles, tools, or high-value items?", good: "no" },
  { q: "Do you use your home for business purposes?", good: "no" },
];

type ResultType = "low" | "medium" | "high";

function classify(score: number): ResultType {
  // score = number of "good" answers out of QUESTIONS.length
  const pct = score / QUESTIONS.length;
  if (pct >= 0.75) return "low";
  if (pct >= 0.45) return "medium";
  return "high";
}

const RESULT_COPY: Record<
  ResultType,
  { label: string; headline: string; body: string; tone: string; Icon: typeof ShieldCheck }
> = {
  low: {
    label: "Low Risk",
    headline: "Your basics may be in good shape.",
    body: "Your basics may be in good shape, but a quick review can confirm.",
    tone: "text-emerald-700",
    Icon: ShieldCheck,
  },
  medium: {
    label: "Medium Risk",
    headline: "A few areas worth a closer look.",
    body: "You may have coverage areas worth reviewing before renewal.",
    tone: "text-amber-700",
    Icon: AlertTriangle,
  },
  high: {
    label: "High Risk",
    headline: "Possible coverage gaps.",
    body: "Your answers suggest possible coverage gaps. A review is strongly recommended.",
    tone: "text-destructive",
    Icon: AlertCircle,
  },
};

type Phase = "questions" | "capture" | "result";

export function HomeownersQuiz({
  cheatSheetSlug = "homeowners-cheat-sheet",
}: {
  cheatSheetSlug?: string;
}) {
  const submit = useServerFn(submitQuiz);
  const [phase, setPhase] = useState<Phase>("questions");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [state, setState] = useState<"NV" | "CO" | "">("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const score = useMemo(
    () => answers.reduce((acc, a, i) => (a === QUESTIONS[i].good ? acc + 1 : acc), 0),
    [answers],
  );
  const resultType = classify(score);
  const result = RESULT_COPY[resultType];

  function answer(value: Answer) {
    const next = [...answers, value];
    setAnswers(next);
    if (next.length >= QUESTIONS.length) {
      setPhase("capture");
    } else {
      setStep((s) => s + 1);
    }
  }

  function reset() {
    setPhase("questions");
    setStep(0);
    setAnswers([]);
    setErrors({});
  }

  async function onCaptureSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    if (!state) {
      setErrors({ state: "Please select your state" });
      return;
    }
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      quiz_slug: "homeowners-coverage-check",
      category_tag: "homeowners",
      first_name: String(fd.get("first_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      state,
      consent: fd.get("consent") === "on",
      answers: QUESTIONS.map((q, i) => ({ question: q.q, answer: answers[i] })),
      score,
      result_type: resultType,
      source_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
    };
    try {
      const res = await submit({ data: payload as never });
      if (!res.ok) {
        setErrors({ form: res.error });
        setLoading(false);
        return;
      }
      setPhase("result");
      setLoading(false);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not submit. Please try again.";
      setErrors({ form: msg });
      setLoading(false);
    }
  }

  // ---------- QUESTIONS ----------
  if (phase === "questions") {
    const current = QUESTIONS[step];
    return (
      <div className="rounded-2xl border border-border bg-card p-7 shadow-elegant md:p-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>
            Question {step + 1} of {QUESTIONS.length}
          </span>
          <span className="text-gold">Coverage check</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <p className="mt-6 font-display text-2xl leading-tight md:text-3xl">{current.q}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Button
            size="lg"
            onClick={() => answer("yes")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Yes
          </Button>
          <Button size="lg" variant="outline" onClick={() => answer("no")}>
            No
          </Button>
          <Button size="lg" variant="ghost" onClick={() => answer("unsure")}>
            Not sure
          </Button>
        </div>
      </div>
    );
  }

  // ---------- LEAD CAPTURE ----------
  if (phase === "capture") {
    return (
      <div className="rounded-2xl border border-border bg-card p-7 shadow-elegant md:p-10">
        <Eyebrow>Almost there</Eyebrow>
        <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
          Where should we send your detailed result?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll show your full result on the next screen and send a copy to your inbox.
        </p>
        <form onSubmit={onCaptureSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quiz_first_name">First name</Label>
            <Input
              id="quiz_first_name"
              name="first_name"
              required
              minLength={1}
              maxLength={80}
              placeholder="Jane"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz_email">Email</Label>
            <Input
              id="quiz_email"
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder="jane@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz_phone">
              Phone <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="quiz_phone"
              name="phone"
              type="tel"
              maxLength={40}
              placeholder="(702) 555-0100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quiz_state">State</Label>
            <Select value={state} onValueChange={(v) => setState(v as "NV" | "CO")}>
              <SelectTrigger id="quiz_state">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NV">Nevada</SelectItem>
                <SelectItem value="CO">Colorado</SelectItem>
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-destructive">{errors.state}</p>
            )}
          </div>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm">
            <Checkbox name="consent" required className="mt-0.5" />
            <span className="text-muted-foreground">
              I consent to receive my quiz results and occasional educational emails from
              XPRT Insurance. Unsubscribe anytime.
            </span>
          </label>
          {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-gold text-gold-foreground hover:bg-gold/90"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            See my detailed result
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            We never share your information. Educational content only.
          </p>
        </form>
      </div>
    );
  }

  // ---------- RESULT ----------
  const { Icon } = result;
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-elegant md:p-10">
      <div className={`flex items-center gap-3 ${result.tone}`}>
        <Icon className="h-6 w-6" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">
          {result.label}
        </span>
      </div>
      <p className="mt-4 font-display text-3xl leading-tight md:text-4xl">
        {result.headline}
      </p>
      <p className="mt-3 text-base text-muted-foreground md:text-lg">{result.body}</p>
      <p className="mt-6 text-sm text-muted-foreground">
        {score} / {QUESTIONS.length} coverage signals look solid.
      </p>
      <ul className="mt-6 space-y-3">
        {QUESTIONS.map((q, i) => {
          const isGood = answers[i] === q.good;
          return (
            <li key={q.q} className="flex items-start gap-3 text-sm">
              <CheckCircle2
                className={`mt-0.5 h-4 w-4 shrink-0 ${isGood ? "text-gold" : "text-muted-foreground"}`}
              />
              <span className="text-foreground">
                <span className="font-medium">{q.q}</span>
                <span className="ml-2 text-muted-foreground">
                  ({answers[i] === "unsure" ? "not sure" : answers[i]})
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Link to="/book">
            Book Your Free Coverage Review
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/offers/$slug" params={{ slug: cheatSheetSlug }}>
            <Download className="mr-1.5 h-4 w-4" />
            Download the Homeowners Cheat Sheet
          </Link>
        </Button>
      </div>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <RefreshCcw className="h-4 w-4" /> Retake quiz
      </button>
    </div>
  );
}
