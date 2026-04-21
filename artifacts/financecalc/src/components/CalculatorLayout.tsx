import { useEffect, ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { getCalculator } from "@/data/calculators";
import { getCategory } from "@/data/categories";
import { getCalculatorContent } from "@/data/calculator-content";
import { Breadcrumbs, breadcrumbJsonLd } from "./Breadcrumbs";
import { Faq, faqJsonLd } from "./Faq";
import { ShareButtons } from "./ShareButtons";
import { AdSlot } from "./AdSlot";
import { isFavorite, toggleFavorite, pushRecent, onStorageChange } from "@/lib/storage";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  slug: string;
  children: ReactNode;
}

export function CalculatorLayout({ slug, children }: Props) {
  const meta = getCalculator(slug);
  const content = getCalculatorContent(slug);
  const cat = meta ? getCategory(meta.category) : undefined;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (slug) pushRecent(slug);
    setFav(isFavorite(slug));
    return onStorageChange(() => setFav(isFavorite(slug)));
  }, [slug]);

  const canonical = `https://financecalc.in/${slug}`;
  const title = meta ? `${meta.name} - FinanceCalc.in` : "Calculator";
  const description = meta?.description || "";

  const jsonLd = meta ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: meta.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: canonical,
        description: meta.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      breadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: cat?.name || "Calculators", href: cat ? `/${cat.slug}` : undefined },
        { label: meta.name },
      ]),
      ...(content ? [faqJsonLd(content.faqs)] : []),
    ],
  } : undefined;

  useSEO({ title, description, canonical, jsonLd });

  if (!meta || !content) {
    return <div className="container mx-auto px-4 py-12">Calculator not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-6 max-w-6xl">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: cat?.shortName || "", href: cat ? `/${cat.slug}` : undefined },
        { label: meta.shortName },
      ]} />

      <div className="mt-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{meta.name}</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">{meta.description}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleFavorite(slug)}
          className="gap-1.5"
        >
          <Star className={`h-4 w-4 ${fav ? "fill-amber-400 text-amber-400" : ""}`} />
          {fav ? "Saved" : "Save"}
        </Button>
      </div>

      <div className="mt-6">{children}</div>

      <div className="mt-6">
        <ShareButtons title={meta.name} url={canonical} />
      </div>

      <AdSlot size="leaderboard" />

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-3">Formula</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-line text-muted-foreground">
              {content.formula}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-3">Example</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-line text-muted-foreground">
              {content.example}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">About the {meta.name}</h2>
        <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert text-foreground/85">
          {content.seoContent.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <AdSlot size="rectangle" />

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <Faq items={content.faqs} />
      </section>

      {content.related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Related Calculators</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.related.map((rs) => {
              const r = getCalculator(rs);
              return r ? (
                <Link key={rs} href={`/${rs}`} className="rounded-lg border border-border p-4 hover:border-primary/50 hover:shadow-sm transition-all flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{r.name}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ) : null;
            })}
          </div>
        </section>
      )}
    </article>
  );
}
