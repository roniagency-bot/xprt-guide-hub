/**
 * Visible author byline — reinforces the Article/QAPage JSON-LD's
 * author + dateModified fields with on-page text Google/LLMs can cross-check
 * against the structured data. Critical for EEAT.
 */
type Props = {
  lastReviewed?: string | Date;
  lang?: "en" | "es";
};

function formatDate(d: string | Date, lang: "en" | "es"): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(lang === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AuthorByline({ lastReviewed, lang = "en" }: Props) {
  const name = "Roni Rivers";
  const role = lang === "es" ? "Asesora de seguros con licencia" : "Licensed Insurance Advisor";
  const reviewed = lang === "es" ? "Revisado" : "Reviewed";
  const dateStr = lastReviewed ? formatDate(lastReviewed, lang) : "";

  return (
    <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
      <span>
        {lang === "es" ? "Por" : "By"}{" "}
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted-foreground">, {role}</span>
      </span>
      {dateStr && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            {reviewed} <time dateTime={typeof lastReviewed === "string" ? lastReviewed : (lastReviewed as Date).toISOString()}>{dateStr}</time>
          </span>
        </>
      )}
    </p>
  );
}
