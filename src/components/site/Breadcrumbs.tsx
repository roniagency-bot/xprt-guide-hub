import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.path ? (
              <Link to={item.path} className="hover:text-foreground">
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground">{item.name}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
