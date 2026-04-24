import { Link, useLocation } from "wouter";
import { Calculator, Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [location]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-base text-foreground">IndianCalc<span className="text-emerald-600">.com</span></div>
            <div className="text-[10px] text-muted-foreground hidden sm:block">Smart Finance Calculators for India</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {categories.map((c) => {
            const active = location === `/${c.slug}` || location.includes(c.slug.replace("-calculators", ""));
            return (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className={`relative transition-colors ${active ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"}`}
              >
                {c.shortName}
                {active && <span className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </Link>
            );
          })}
          <Link
            href="/blog"
            className={`relative transition-colors ${location.startsWith("/blog") ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"}`}
          >
            Blog
            {location.startsWith("/blog") && <span className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-primary rounded-full" />}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block w-72">
            <SearchBar compact />
          </div>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <SearchBar compact />
            <nav className="grid grid-cols-2 gap-2 pt-2">
              {categories.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="rounded-md p-3 text-sm font-medium hover:bg-secondary">
                  {c.name}
                </Link>
              ))}
              <Link href="/blog" className="rounded-md p-3 text-sm font-medium hover:bg-secondary">Blog</Link>
              <Link href="/about" className="rounded-md p-3 text-sm font-medium hover:bg-secondary">About</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
