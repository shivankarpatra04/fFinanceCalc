/**
 * SSG (Static Site Generation) for IndianCalc
 *
 * This script runs AFTER `vite build`. It reads the compiled blog data and the
 * calculator data/content and generates a real `index.html` for every route so
 * the server returns HTTP 200 with actual, fully-rendered HTML — not just the
 * SPA shell. This is what Googlebot, the AdSense crawler and social-card
 * scrapers need in order to index real content and structured data, even when
 * they do not execute JavaScript.
 *
 * No Puppeteer / Chromium needed — the TypeScript data files are the single
 * source of truth and are imported here by stripping their type-only syntax.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

// Read dist/index.html (the Vite-built SPA shell)
if (!fs.existsSync(templatePath)) {
  console.error('❌  dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// ─── Load TypeScript data modules by stripping type-only syntax ──────────────
// These files use only a narrow slice of TS (interfaces, a couple of type
// annotations and helper functions). We strip those bits so the remaining
// source is valid ESM and import it dynamically. This keeps the .ts files as
// the single source of truth — editing content updates the SSG automatically.
async function importStripped(relPath, transforms) {
  const tsPath = path.resolve(__dirname, '..', relPath);
  let src = fs.readFileSync(tsPath, 'utf-8');
  for (const t of transforms) src = src.replace(t[0], t[1]);
  const tmpFile = path.join(__dirname, `.${path.basename(relPath)}.generated.mjs`);
  fs.writeFileSync(tmpFile, src, 'utf-8');
  try {
    return await import(pathToFileURL(tmpFile).href + `?t=${Date.now()}`);
  } finally {
    try { fs.unlinkSync(tmpFile); } catch {}
  }
}

async function loadBlogPosts() {
  const mod = await importStripped('src/data/blog.ts', [
    [/export\s+interface\s+BlogPost\s*\{[\s\S]*?\n\}\s*/m, ''],
    [/:\s*BlogPost\[\]/g, ''],
    [/export\s+function\s+getBlogPost[\s\S]*$/, ''],
  ]);
  return mod.blogPosts;
}

async function loadCalculators() {
  const mod = await importStripped('src/data/calculators.ts', [
    [/export\s+interface\s+CalculatorMeta\s*\{[\s\S]*?\n\}/, ''],
    [/:\s*CalculatorMeta\[\]/, ''],
    [/export\s+function[\s\S]*$/, ''], // drop helper functions + popularSlugs (unused here)
  ]);
  return mod.calculators;
}

async function loadCalculatorContent() {
  const mod = await importStripped('src/data/calculator-content.ts', [
    [/export\s+interface\s+FAQItem\s*\{[\s\S]*?\n\}/, ''],
    [/export\s+interface\s+CalculatorContent\s*\{[\s\S]*?\n\}/, ''],
    [/:\s*Record<[^=]*?>\s*=/, ' ='],
    [/export\s+function[\s\S]*$/, ''],
  ]);
  return mod.calculatorContent;
}

const blogPosts = await loadBlogPosts();
const calculators = await loadCalculators();
const calculatorContent = await loadCalculatorContent();

const categoryNames = {
  'loan-calculators': 'Loan Calculators',
  'investment-calculators': 'Investment Calculators',
  'tax-calculators': 'Tax Calculators',
  'salary-calculators': 'Salary Calculators',
  'property-calculators': 'Property Calculators',
};

const staticPages = [
  { slug: 'about', title: 'About Us | IndianCalc', description: 'Learn about IndianCalc.com - free, accurate, India-specific finance calculators.' },
  { slug: 'contact', title: 'Contact Us | IndianCalc', description: 'Get in touch with the IndianCalc team for queries, feedback or support.' },
  { slug: 'privacy-policy', title: 'Privacy Policy | IndianCalc', description: 'Read our privacy policy to understand how IndianCalc collects and uses your data.' },
  { slug: 'terms-of-service', title: 'Terms of Service | IndianCalc', description: 'Terms and conditions governing the use of IndianCalc.com finance tools.' },
  { slug: 'disclaimer', title: 'Disclaimer | IndianCalc', description: 'Financial disclaimer for IndianCalc.com - our tools are for informational purposes only.' },
  { slug: 'blog', title: 'Finance Blog - Tips, Guides & Calculators | IndianCalc', description: 'Read expert articles on EMI, SIP, tax planning, loans and personal finance in India.' },
  { slug: 'loan-calculators', title: 'Loan Calculators - Free Online Tools | IndianCalc', description: 'Calculate EMI, eligibility and total interest for every kind of loan in India.' },
  { slug: 'investment-calculators', title: 'Investment Calculators - Free Online Tools | IndianCalc', description: 'SIP, FD, RD, lumpsum and CAGR calculators tuned for Indian investors.' },
  { slug: 'tax-calculators', title: 'Tax Calculators - Free Online Tools | IndianCalc', description: 'Income tax, GST, HRA and TDS calculators for FY 2025-26.' },
  { slug: 'salary-calculators', title: 'Salary Calculators - Free Online Tools | IndianCalc', description: 'Convert CTC to in-hand, calculate hikes and project your EPF corpus.' },
  { slug: 'property-calculators', title: 'Property Calculators - Free Online Tools | IndianCalc', description: 'Rent vs buy, stamp duty and ROI calculators for Indian real estate.' },
];

// ─── Helper: inject page-specific meta + JSON-LD into the template ──────────

function buildHtml(opts) {
  const { title, description, canonical, bodyContent = '', headExtra = '' } = opts;
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);

  const descTag = `<meta name="description" content="${escHtml(description)}" />`;
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/, descTag);
  } else {
    html = html.replace('</head>', `  ${descTag}\n  </head>`);
  }

  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n  </head>`);
  }

  html = html.replace(/(<meta property="og:title"[^>]*>)/, `<meta property="og:title" content="${escHtml(title)}" />`);
  html = html.replace(/(<meta property="og:description"[^>]*>)/, `<meta property="og:description" content="${escHtml(description)}" />`);
  html = html.replace(/(<meta property="og:url"[^>]*>)/, `<meta property="og:url" content="${canonical}" />`);

  if (headExtra) {
    html = html.replace('</head>', `  ${headExtra}\n  </head>`);
  }

  if (bodyContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><div style="font-family:sans-serif;max-width:860px;margin:auto;padding:24px">${bodyContent}</div></div>`
    );
  }

  return html;
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Render a small subset of inline markdown (bold + links) inside an already
// HTML-escaped string. Order matters: links first so the URL/label aren't
// affected by the bold pass.
function renderInline(escaped) {
  let out = escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, href) => `<a href="${href}" style="color:#2563eb;text-decoration:underline">${label}</a>`,
  );
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

function mdToHtml(md) {
  if (!md) return '';
  const blocks = md.split('\n\n');
  return blocks.map(b => {
    if (b.startsWith('## ')) return `<h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">${renderInline(escHtml(b.slice(3)))}</h2>`;
    if (b.startsWith('### ')) return `<h3 style="font-size:1.2rem;font-weight:600;margin:1.5rem 0 0.5rem">${renderInline(escHtml(b.slice(4)))}</h3>`;
    if (b.startsWith('- ')) {
      const items = b.split('\n').filter(l => l.startsWith('- ')).map(l => `<li>${renderInline(escHtml(l.slice(2)))}</li>`);
      return `<ul style="margin:0.5rem 0 0.5rem 1.5rem">${items.join('')}</ul>`;
    }
    return `<p style="line-height:1.7;margin:0.75rem 0">${renderInline(escHtml(b))}</p>`;
  }).join('');
}

// ─── Sanitizer: guarantee NO localhost (or stale snapshot ad junk) survives ──
// A clean `vite build` template contains no localhost. But if a snapshot tool
// (react-snap / puppeteer / vite-plugin-prerender) ever rendered the page on a
// local dev server, it bakes the dev origin (e.g. http://localhost:3001) into
// the AdSense / DoubleClick request URLs (url=...localhost%3A3001...). Googlebot
// then sees a production page advertising a localhost URL — an AdSense red flag.
// We run every generated page through this pass so the production origin is the
// ONLY origin that can appear, regardless of how the template was produced.
const PROD_ORIGIN = 'https://indiancalc.com';
const PROD_HOST = 'indiancalc.com';
function sanitize(html) {
  return html
    // URL-encoded "localhost:3001" (as it appears inside AdSense iframe `url=` params)
    .replace(/localhost%3A\d+/gi, PROD_HOST)
    // "http://localhost:3001" / "https://localhost" → production origin
    .replace(/https?:\/\/localhost(?::\d+)?/gi, PROD_ORIGIN)
    // any remaining bare "localhost" or "localhost:PORT"
    .replace(/localhost(?::\d+)?/gi, PROD_HOST)
    // strip stale pre-rendered ad artifacts a snapshot may have injected
    // (the legitimate async adsbygoogle.js loader has no localhost and is kept)
    .replace(/<script[^>]*\bshow_ads_impl[^>]*><\/script>/gi, '')
    .replace(/<meta[^>]*http-equiv=["']origin-trial["'][^>]*>/gi, '');
}

function writeRoute(relPath, html) {
  const dir = path.join(distDir, relPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), sanitize(html), 'utf-8');
  console.log(`  ✅  /${relPath || ''}/index.html`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('\n🔧  IndianCalc SSG — generating static HTML pages...\n');

// 1. Blog posts — render the FULL article body into static HTML.
for (const post of blogPosts) {
  const canonical = `https://indiancalc.com/blog/${post.slug}`;
  const articleHtml = mdToHtml(post.content);
  const bodyContent = `
    <nav style="font-size:0.8rem;color:#666;margin-bottom:1rem">
      <a href="/">Home</a> › <a href="/blog">Blog</a> › ${escHtml(post.title)}
    </nav>
    <div style="font-size:0.75rem;color:#2563eb;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">${escHtml(post.category)}</div>
    <h1 style="font-size:2rem;font-weight:800;line-height:1.25;margin:0.5rem 0 1rem">${escHtml(post.title)}</h1>
    <p style="color:#555;margin-bottom:1.5rem">Published ${escHtml(post.date)} · ${escHtml(post.readTime)} read</p>
    <p style="font-size:1.05rem;line-height:1.75;margin-bottom:1.5rem">${escHtml(post.description)}</p>
    <article>${articleHtml}</article>
  `;
  const html = buildHtml({ title: `${post.title} | IndianCalc`, description: post.description, canonical, bodyContent });
  writeRoute(`blog/${post.slug}`, html);
}

// 2. Calculators — render full content (intro, formula, worked examples, the
// long-form SEO section, FAQ) plus WebApplication / BreadcrumbList / FAQPage
// JSON-LD so crawlers see rich content and structured data without running JS.
for (const meta of calculators) {
  const slug = meta.slug;
  const content = calculatorContent[slug];
  const canonical = `https://indiancalc.com/${slug}`;
  const title = meta.seoTitle ?? `${meta.name} - IndianCalc.com`;
  const description = meta.metaDescription ?? meta.description;
  const h1 = meta.h1 ?? meta.name;
  const catName = categoryNames[meta.category] || 'Calculators';

  const faqHtml = content
    ? content.faqs.map(f =>
        `<div style="margin:1rem 0"><h3 style="font-size:1.1rem;font-weight:600;margin:0 0 0.25rem">${escHtml(f.q)}</h3><p style="line-height:1.7;margin:0">${renderInline(escHtml(f.a))}</p></div>`
      ).join('')
    : '';

  const relatedHtml = content && content.related.length
    ? `<h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">Related Calculators</h2><ul style="margin:0.5rem 0 0.5rem 1.5rem">${
        content.related.map(rs => {
          const r = calculators.find(c => c.slug === rs);
          return r ? `<li><a href="/${rs}" style="color:#2563eb;text-decoration:underline">${escHtml(r.name)}</a></li>` : '';
        }).join('')
      }</ul>`
    : '';

  const bodyContent = `
    <nav style="font-size:0.8rem;color:#666;margin-bottom:1rem"><a href="/">Home</a> › <a href="/${meta.category}">${escHtml(catName)}</a> › ${escHtml(meta.name)}</nav>
    <h1 style="font-size:2rem;font-weight:800;margin:0.5rem 0 0.5rem">${escHtml(h1)}</h1>
    <p style="font-size:0.8rem;color:#16a34a;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 1rem">Last Updated: May 2026 · FY 2025-26 Data</p>
    <p style="font-size:1.05rem;line-height:1.75">${escHtml(meta.description)}</p>
    <p style="color:#555;font-style:italic;margin-top:1rem">Interactive calculator loads below. JavaScript required for live calculations.</p>
    ${content ? `
    <h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">Formula</h2>
    ${mdToHtml(content.formula)}
    <h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">Worked Examples</h2>
    ${mdToHtml(content.example)}
    <h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">About the ${escHtml(meta.name)}</h2>
    ${mdToHtml(content.seoContent)}
    <h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">Frequently Asked Questions</h2>
    ${faqHtml}
    ${relatedHtml}
    ` : ''}
  `;

  const graph = [
    {
      '@type': 'Organization',
      '@id': 'https://indiancalc.com/#organization',
      name: 'IndianCalc',
      url: 'https://indiancalc.com',
      logo: 'https://indiancalc.com/logo.png',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://indiancalc.com/#website',
      url: 'https://indiancalc.com',
      name: 'IndianCalc',
      publisher: { '@id': 'https://indiancalc.com/#organization' },
    },
    {
      '@type': 'WebApplication',
      name: h1,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      url: canonical,
      description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://indiancalc.com/' },
        { '@type': 'ListItem', position: 2, name: catName, item: `https://indiancalc.com/${meta.category}` },
        { '@type': 'ListItem', position: 3, name: meta.name },
      ],
    },
  ];
  if (content) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: content.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;

  const html = buildHtml({ title, description, canonical, bodyContent, headExtra });
  writeRoute(slug, html);
}

// 3. Static pages
for (const page of staticPages) {
  const canonical = `https://indiancalc.com/${page.slug}`;
  const html = buildHtml({ title: page.title, description: page.description, canonical });
  writeRoute(page.slug, html);
}

// 4. Homepage — the SPA shell left `<div id="root"></div>` empty, so crawlers
// (and the AdSense reviewer) saw a blank page. Inject real, crawlable content:
// a heading, an intro describing IndianCalc, and the full, linked list of every
// calculator grouped by category, plus WebSite + ItemList structured data.
{
  const canonical = 'https://indiancalc.com/';
  // Curated homepage sections (exact content per spec). Slugs validated against
  // src/data/calculators.ts — note "PF/EPF Calculator" maps to the real
  // /pf-calculator route (there is no /epf-calculator).
  const homeCategories = [
    { name: 'Loan Calculators', items: [
      ['EMI Calculator', '/emi-calculator'],
      ['Home Loan Calculator', '/home-loan-calculator'],
      ['Personal Loan Calculator', '/personal-loan-calculator'],
      ['Car Loan Calculator', '/car-loan-calculator'],
      ['Loan Eligibility Calculator', '/loan-eligibility-calculator'],
    ] },
    { name: 'Investment Calculators', items: [
      ['SIP Calculator', '/sip-calculator'],
      ['FD Calculator', '/fd-calculator'],
      ['RD Calculator', '/rd-calculator'],
      ['CAGR Calculator', '/cagr-calculator'],
      ['Mutual Fund Calculator', '/mutual-fund-calculator'],
    ] },
    { name: 'Tax Calculators', items: [
      ['Income Tax Calculator', '/income-tax-calculator-india'],
      ['GST Calculator', '/gst-calculator'],
      ['HRA Calculator', '/hra-calculator'],
      ['TDS Calculator', '/tds-calculator'],
    ] },
    { name: 'Salary Calculators', items: [
      ['In-Hand Salary Calculator', '/in-hand-salary-calculator'],
      ['Salary Hike Calculator', '/salary-hike-calculator'],
      ['PF/EPF Calculator', '/pf-calculator'],
    ] },
    { name: 'Property Calculators', items: [
      ['Rent vs Buy Calculator', '/rent-vs-buy-calculator'],
      ['Stamp Duty Calculator', '/stamp-duty-calculator'],
    ] },
  ];

  const homeBlog = [
    ['How EMI is Calculated', '/blog/how-emi-is-calculated'],
    ['SIP vs FD in India', '/blog/sip-vs-fd-india'],
    ['Best Tax Saving Options 2025', '/blog/best-tax-saving-options-india'],
    ['How to Improve Your CIBIL Score', '/blog/how-to-improve-credit-score'],
    ['Home Loan Tips for First-Time Buyers', '/blog/home-loan-tips-india'],
  ];

  const linkStyle = 'color:#2563eb;text-decoration:none';
  const h2Style = 'font-size:1.5rem;font-weight:700;margin:2rem 0 0.75rem;color:#0f172a';
  const h3Style = 'font-size:1.15rem;font-weight:700;margin:1.25rem 0 0.4rem;color:#1e40af';
  const ulStyle = 'margin:0 0 0.5rem 1.5rem;line-height:1.9';

  let calcListHtml = '';
  for (const cat of homeCategories) {
    calcListHtml += `<h3 style="${h3Style}">${escHtml(cat.name)}</h3><ul style="${ulStyle}">`;
    for (const [name, href] of cat.items) {
      calcListHtml += `<li><a href="${href}" style="${linkStyle}">${escHtml(name)}</a></li>`;
    }
    calcListHtml += '</ul>';
  }

  let blogListHtml = `<ul style="${ulStyle}">`;
  for (const [name, href] of homeBlog) {
    blogListHtml += `<li><a href="${href}" style="${linkStyle}">${escHtml(name)}</a></li>`;
  }
  blogListHtml += '</ul>';

  const bodyContent = `
    <section>
      <h1 style="font-size:2.1rem;font-weight:800;line-height:1.2;margin:0.5rem 0 1rem;color:#0f172a">Free Indian Finance Calculators — EMI, SIP, Tax &amp; More</h1>
      <p style="font-size:1.1rem;line-height:1.75;margin:0 0 1rem;color:#334155">IndianCalc offers 21 free, accurate finance calculators built specifically for Indian users. No login, no ads, instant results. Calculate EMI, SIP returns, income tax, HRA, in-hand salary, GST and more.</p>
    </section>
    <section>
      <h2 style="${h2Style}">Our Calculators</h2>
      ${calcListHtml}
    </section>
    <section>
      <h2 style="${h2Style}">Why Use IndianCalc?</h2>
      <p style="line-height:1.75;margin:0 0 1rem;color:#334155">All calculators use India-specific formulas — RBI-compliant EMI formula, FY 2025-26 income tax slabs, current GST rates, and EPF rules. Results are instant, accurate, and completely free. No registration required.</p>
    </section>
    <section>
      <h2 style="${h2Style}">Finance Guides for Indian Users</h2>
      ${blogListHtml}
    </section>
    <footer style="margin-top:2.5rem;padding-top:1rem;border-top:1px solid #e2e8f0;font-size:0.85rem;color:#64748b">
      <p style="margin:0 0 0.25rem">Last updated: May 2026 | FY 2025-26 data</p>
      <p style="margin:0">Not financial advice. For informational use only.</p>
    </footer>
  `;

  const homeLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': 'https://indiancalc.com/#organization', name: 'IndianCalc', url: 'https://indiancalc.com', logo: 'https://indiancalc.com/logo.png' },
      {
        '@type': 'WebSite', '@id': 'https://indiancalc.com/#website', url: 'https://indiancalc.com', name: 'IndianCalc',
        publisher: { '@id': 'https://indiancalc.com/#organization' },
        potentialAction: { '@type': 'SearchAction', target: 'https://indiancalc.com/?q={search_term_string}', 'query-input': 'required name=search_term_string' },
      },
      { '@type': 'ItemList', itemListElement: calculators.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: `https://indiancalc.com/${c.slug}` })) },
    ],
  };
  const headExtra = `<script type="application/ld+json">${JSON.stringify(homeLd).replace(/</g, '\\u003c')}</script>`;
  const title = 'IndianCalc.com - Free Indian Finance Calculators (EMI, SIP, Tax)';
  const description = `Free Indian finance calculators — EMI, SIP, income tax, GST, HRA, in-hand salary, FD, stamp duty and more. ${calculators.length} accurate, instant tools for FY 2025-26. No sign-up.`;
  const html = buildHtml({ title, description, canonical, bodyContent, headExtra });
  writeRoute('', html);
}

console.log('\n✅  SSG complete — all routes now return HTTP 200 with real HTML.\n');
