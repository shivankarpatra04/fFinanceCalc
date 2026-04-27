import { Link } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import { CalculatorMeta } from "@/data/calculators";
import { getCategory } from "@/data/categories";
import { isFavorite, toggleFavorite, onStorageChange } from "@/lib/storage";
import { useEffect, useState } from "react";
import { trackEvent } from "@/components/GoogleAnalytics";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  const cat = getCategory(calc.category);
  const Icon = cat?.icon;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(calc.slug));
    return onStorageChange(() => setFav(isFavorite(calc.slug)));
  }, [calc.slug]);

  return (
    <Link 
      href={`/${calc.slug}`} 
      className="group relative block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
      onClick={() => trackEvent("Calculator", "View", calc.name)}
    >
      <button
        type="button"
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => { 
          e.preventDefault(); 
          e.stopPropagation(); 
          const newState = !fav;
          toggleFavorite(calc.slug); 
          trackEvent("Calculator", newState ? "Favorite" : "Unfavorite", calc.name);
        }}
        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-secondary"
      >
        <Star className={`h-4 w-4 ${fav ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
      </button>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${cat?.color} text-white`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{calc.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{calc.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{cat?.shortName}</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
