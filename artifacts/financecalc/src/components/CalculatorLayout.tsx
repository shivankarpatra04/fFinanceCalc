import { useEffect, ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
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

function FinancialDisclaimer() {
  return (
    <div style={{
      background: '#fff8e1',
      border: '1px solid #ffe082',
      borderRadius: '8px',
      padding: '12px 16px',
      marginTop: '24px',
      fontSize: '13px',
      color: '#5d4037'
    }}>
      <strong>Disclaimer:</strong> The results provided by this 
      calculator are for informational and educational purposes only. 
      They do not constitute financial, investment, or tax advice. 
      Please consult a certified financial advisor before making 
      any financial decisions.
    </div>
  );
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

  const canonical = `https://indiancalc.com/${slug}`;
  const title = meta ? `${meta.name} - IndianCalc.com` : "Calculator";
  const description = meta?.description || "";

  const jsonLd = meta ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://indiancalc.com/#organization",
        "name": "IndianCalc",
        "url": "https://indiancalc.com",
        "logo": "https://indiancalc.com/logo.png"
      },
      {
        "@type": "WebSite",
        "@id": "https://indiancalc.com/#website",
        "url": "https://indiancalc.com",
        "name": "IndianCalc",
        "publisher": { "@id": "https://indiancalc.com/#organization" }
      },
      {
        "@type": "WebApplication",
        "name": meta.name,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "url": canonical,
        "description": meta.description,
        "offers": { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      breadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: cat?.name || "Calculators", href: cat ? `/${cat.slug}` : undefined },
        { label: meta.name },
      ]),
      ...(content ? [faqJsonLd(content.faqs)] : []),
    ],
  } : undefined;

  if (!meta || !content) {
    return <div className="container mx-auto px-4 py-12">Calculator not found.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-6 max-w-6xl">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IndianCalc" />
        {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      </Helmet>
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: cat?.shortName || "", href: cat ? `/${cat.slug}` : undefined },
        { label: meta.shortName },
      ]} />

      <div className="mt-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{meta.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">
            <span>Last Updated: May 2025</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>FY 2025-26 Data</span>
          </div>
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
          {content.seoContent.split("\n\n").map((para, i) => {
            if (para.startsWith("### ")) {
              return <h3 key={i} className="text-lg font-bold mt-6 mb-2">{para.replace("### ", "")}</h3>;
            }
            if (para.startsWith("## ")) {
              return <h2 key={i} className="text-xl font-bold mt-8 mb-4">{para.replace("## ", "")}</h2>;
            }
            return <p key={i} className="mb-4">{para}</p>;
          })}
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
      
      <FinancialDisclaimer />
    </article>
  );
}
