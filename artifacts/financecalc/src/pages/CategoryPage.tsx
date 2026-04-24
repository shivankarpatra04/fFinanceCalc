import { useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { getCategory } from "@/data/categories";
import { calculatorsByCategory } from "@/data/calculators";
import { CalculatorCard } from "@/components/CalculatorCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import NotFound from "./not-found";

export function CategoryPage() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";
  const cat = getCategory(slug);
  const calcs = cat ? calculatorsByCategory(slug) : [];



  if (!cat) return <NotFound />;
  const Icon = cat.icon;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Helmet>
        <title>{cat.name} - Free Online Tools | IndianCalc.com</title>
        <meta name="description" content={cat.description} />
        <link rel="canonical" href={`https://indiancalc.com/${slug}`} />
        <meta property="og:title" content={`${cat.name} - Free Online Tools | IndianCalc.com`} />
        <meta property="og:description" content={cat.description} />
        <meta property="og:url" content={`https://indiancalc.com/${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IndianCalc" />
      </Helmet>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: cat.shortName }]} />

      <div className="mt-4 flex items-start gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white`}>
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{cat.name}</h1>
          <p className="mt-1 text-muted-foreground">{cat.description}</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">{calcs.length} Calculators in this Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calcs.map((c) => <CalculatorCard key={c.slug} calc={c} />)}
        </div>
      </section>

      <AdSlot size="leaderboard" />

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-3">About {cat.name}</h2>
        <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert text-foreground/85">
          <p>{cat.intro}</p>
        </div>
      </section>
    </div>
  );
}
