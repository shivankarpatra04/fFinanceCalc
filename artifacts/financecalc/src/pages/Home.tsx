import { Link } from "wouter";
import { Calculator, ArrowRight, Shield, Zap, Lock, IndianRupee } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";
import { categories } from "@/data/categories";
import { calculators, popularSlugs, getCalculator } from "@/data/calculators";
import { CalculatorCard } from "@/components/CalculatorCard";
import { SearchBar } from "@/components/SearchBar";
import { AdSlot } from "@/components/AdSlot";
import { useState, useEffect } from "react";
import { getFavorites, getRecent, onStorageChange } from "@/lib/storage";

export function HomePage() {
  const [favs, setFavs] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => { setFavs(getFavorites()); setRecent(getRecent()); };
    refresh();
    return onStorageChange(refresh);
  }, []);

  useSEO({
    title: "FinanceCalc.in - Free Indian Finance Calculators (EMI, SIP, Tax)",
    description: "21 free finance calculators built for India. Calculate EMI, SIP returns, income tax (new & old regime), GST, HRA, in-hand salary, stamp duty and more.",
    canonical: "https://financecalc.in/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "FinanceCalc.in",
      url: "https://financecalc.in",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://financecalc.in/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-4">
              <IndianRupee className="h-3 w-3" /> Built for India · Free forever
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Smart finance calculators<br />
              <span className="text-primary">for every Indian</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              EMI, SIP, income tax, GST, in-hand salary and 17 more — accurate, instant, no sign-up. Built with the actual formulas Indian banks and the IT department use.
            </p>
            <div className="mt-6 max-w-xl mx-auto">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {popularSlugs.slice(0, 5).map((s) => {
                const c = getCalculator(s);
                return c ? (
                  <Link key={s} href={`/${s}`} className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors">
                    {c.shortName}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Popular Calculators</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularSlugs.map((s) => {
              const c = getCalculator(s);
              return c ? <CalculatorCard key={s} calc={c} /> : null;
            })}
          </div>
        </section>

        <AdSlot size="leaderboard" />

        {recent.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-5">Recently Used</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recent.slice(0, 4).map((s) => {
                const c = getCalculator(s);
                return c ? <CalculatorCard key={s} calc={c} /> : null;
              })}
            </div>
          </section>
        )}

        {favs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-5">Your Favorites</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {favs.map((s) => {
                const c = getCalculator(s);
                return c ? <CalculatorCard key={s} calc={c} /> : null;
              })}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5">Browse by Category</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              const count = calculators.filter((x) => x.category === c.slug).length;
              return (
                <Link key={c.slug} href={`/${c.slug}`} className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-white mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{count} calculators</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5">All Calculators</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8 grid gap-6 md:grid-cols-3 mb-10">
          <div>
            <Zap className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Instant Results</h3>
            <p className="text-sm text-muted-foreground">Calculations update in real time as you change inputs. No "Calculate" button to click.</p>
          </div>
          <div>
            <Shield className="h-8 w-8 text-emerald-600 mb-3" />
            <h3 className="font-semibold mb-1">Built for India</h3>
            <p className="text-sm text-muted-foreground">FY 2024-25 tax slabs, EPF rate of 8.25%, state-wise stamp duty — all current and India-specific.</p>
          </div>
          <div>
            <Lock className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold mb-1">100% Private</h3>
            <p className="text-sm text-muted-foreground">All calculations happen in your browser. We never store your salary, loan amount or any personal data.</p>
          </div>
        </section>
      </div>
    </>
  );
}
