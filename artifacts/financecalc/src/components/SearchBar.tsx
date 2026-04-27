import { useState, useMemo, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "wouter";
import { calculators } from "@/data/calculators";
import { trackEvent } from "@/components/GoogleAnalytics";
import { Input } from "@/components/ui/input";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.trim().toLowerCase();
    return calculators
      .filter((c) =>
        c.name.toLowerCase().includes(needle) ||
        c.shortName.toLowerCase().includes(needle) ||
        c.keywords.some((k) => k.includes(needle))
      )
      .slice(0, 8);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={compact ? "Search calculators..." : "Search 21 calculators (EMI, SIP, tax...)"}
          className="pl-9"
          value={q}
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg max-h-80 overflow-auto">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              onClick={() => {
                setQ("");
                setOpen(false);
                trackEvent("Search", "Result Click", r.name);
              }}
              className="block px-4 py-2 text-sm hover:bg-secondary border-b border-border last:border-b-0"
            >
              <div className="font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">{r.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
