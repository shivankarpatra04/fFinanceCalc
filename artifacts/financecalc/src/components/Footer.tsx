import { Link } from "wouter";
import { Calculator } from "lucide-react";
import { categories } from "@/data/categories";
import { popularSlugs, getCalculator } from "@/data/calculators";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </div>
            <div className="font-bold">FinanceCalc<span className="text-emerald-600">.in</span></div>
          </Link>
          <p className="text-sm text-muted-foreground">
            Free, accurate finance calculators built for Indian users. EMI, SIP, tax, salary and more.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-muted-foreground hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-3">Popular Calculators</h3>
          <ul className="space-y-2 text-sm">
            {popularSlugs.slice(0, 8).map((slug) => {
              const c = getCalculator(slug);
              return c ? (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-muted-foreground hover:text-primary">{c.name}</Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
            <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <div>© {new Date().getFullYear()} FinanceCalc.in — All Rights Reserved</div>
          <div>Calculators are for informational purposes only. Consult a qualified financial advisor for personal advice.</div>
        </div>
      </div>
    </footer>
  );
}
