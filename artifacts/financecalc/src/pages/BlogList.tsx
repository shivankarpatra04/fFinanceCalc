import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { Calendar, Clock } from "lucide-react";

export function BlogListPage() {

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Helmet>
        <title>Finance Blog - Tips, Guides & Calculators | FinanceCalc</title>
        <meta name="description" content="Read expert articles on EMI, SIP, tax planning, loans and personal finance in India." />
        <link rel="canonical" href="https://financecalc.in/blog" />
        <meta property="og:title" content="Finance Blog - Tips, Guides & Calculators | FinanceCalc" />
        <meta property="og:description" content="Read expert articles on EMI, SIP, tax planning, loans and personal finance in India." />
        <meta property="og:url" content="https://financecalc.in/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="FinanceCalc" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Blog" }]))}
        </script>
      </Helmet>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">Personal Finance Blog</h1>
      <p className="mt-2 text-muted-foreground">In-depth guides written for Indian readers — taxes, loans, investing, and saving more of what you earn.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all">
            <div className="text-xs font-medium text-primary uppercase tracking-wide">{p.category}</div>
            <h2 className="mt-2 font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readTime} read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
