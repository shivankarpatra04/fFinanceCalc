import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { ShareButtons } from "@/components/ShareButtons";
import { AdSlot } from "@/components/AdSlot";
import { Calendar, Clock } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import NotFound from "./not-found";

export const metadata = {
  alternates: {
    canonical: 'https://indiancalc.com/blog',
  },
};


function renderContent(md: string) {
  const blocks = md.split("\n\n");
  return blocks.map((b, i) => {
    if (b.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold mt-8 mb-3">{b.slice(3)}</h2>;
    if (b.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold mt-6 mb-2">{b.slice(4)}</h3>;
    if (b.startsWith("- ")) {
      const items = b.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2));
      return <ul key={i} className="list-disc pl-6 my-3 space-y-1">{items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    }
    return <p key={i} className="my-3 leading-relaxed">{b}</p>;
  });
}

export function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const post = blogPosts.find((p) => p.slug === slug);
  const url = `https://indiancalc.com/blog/${slug}`;



  if (!post) return <NotFound />;

  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="container mx-auto px-4 py-6 max-w-3xl">
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="IndianCalc" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]))}
        </script>
      </Helmet>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
      <div className="mt-4 text-xs font-medium text-primary uppercase tracking-wide">{post.category}</div>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime} read</span>
      </div>
      <div className="mt-2"><ShareButtons title={post.title} url={url} /></div>

      <AuthorCard date={post.date} />

      <div className="mt-6 prose prose-sm md:prose-base max-w-none dark:prose-invert text-foreground/90">
        {renderContent(post.content)}
      </div>

      <AuthorCard date={post.date} />

      <AdSlot size="rectangle" />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">More from the Blog</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-lg border border-border p-4 hover:border-primary/50 transition-all">
              <div className="text-xs text-primary font-medium">{p.category}</div>
              <h3 className="mt-1 font-semibold text-sm line-clamp-2">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
