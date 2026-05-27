/**
 * SSG (Static Site Generation) for IndianCalc
 *
 * This script runs AFTER `vite build`. It reads the compiled blog data
 * and generates a real `index.html` for every blog post route so that
 * the server returns HTTP 200 with actual HTML content — not just the
 * SPA shell. This is what Google's AdSense crawler requires.
 *
 * No Puppeteer / Chromium needed.
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

// ─── Load real blog content from src/data/blog.ts ───────────────────────────
// blog.ts uses only a narrow slice of TypeScript syntax (an `interface`, a
// `: BlogPost[]` annotation, and one typed helper). We strip those bits so the
// remaining source is valid ESM and import it dynamically. This keeps blog.ts
// as the single source of truth — when an article is edited, the SSG output
// updates automatically on the next build.
async function loadBlogPosts() {
  const tsPath = path.resolve(__dirname, '..', 'src', 'data', 'blog.ts');
  const tsSource = fs.readFileSync(tsPath, 'utf-8');
  const jsSource = tsSource
    .replace(/export\s+interface\s+BlogPost\s*\{[\s\S]*?\n\}\s*/m, '')
    .replace(/:\s*BlogPost\[\]/g, '')
    .replace(/export\s+function\s+getBlogPost[\s\S]*$/, '');
  const tmpFile = path.join(__dirname, '.blog-data.generated.mjs');
  fs.writeFileSync(tmpFile, jsSource, 'utf-8');
  try {
    const mod = await import(pathToFileURL(tmpFile).href + `?t=${Date.now()}`);
    return mod.blogPosts;
  } finally {
    try { fs.unlinkSync(tmpFile); } catch {}
  }
}

// ─── Blog posts loaded from src/data/blog.ts at SSG time (see loadBlogPosts) ─
const blogPosts = await loadBlogPosts();

// ─── Calculator routes (copy index.html for each with updated title/meta) ───

const calculators = [
  { slug: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate Equated Monthly Instalment (EMI) for any loan amount, rate and tenure.' },
  { slug: 'home-loan-calculator', name: 'Home Loan Calculator', description: 'Calculate home loan EMI with full amortisation schedule for Indian banks.' },
  { slug: 'personal-loan-calculator', name: 'Personal Loan Calculator', description: 'Find the EMI and total interest on any personal loan instantly.' },
  { slug: 'car-loan-calculator', name: 'Car Loan Calculator', description: 'Calculate car loan EMI for new and used vehicle financing in India.' },
  { slug: 'loan-eligibility-calculator', name: 'Loan Eligibility Calculator', description: 'Find out the maximum loan amount you can borrow based on your income.' },
  { slug: 'sip-calculator', name: 'SIP Calculator', description: 'Calculate the future value of your monthly SIP in mutual funds.' },
  { slug: 'fd-calculator', name: 'FD Calculator', description: 'Calculate maturity amount on your fixed deposit with quarterly compounding.' },
  { slug: 'rd-calculator', name: 'RD Calculator', description: 'Calculate maturity value of a recurring deposit at any bank or post office.' },
  { slug: 'cagr-calculator', name: 'CAGR Calculator', description: 'Find the compound annual growth rate of any investment over time.' },
  { slug: 'mutual-fund-calculator', name: 'Mutual Fund Returns Calculator', description: 'Calculate future value of a lumpsum mutual fund investment.' },
  { slug: 'gst-calculator', name: 'GST Calculator', description: 'Add or remove GST from any amount at 5%, 12%, 18% or 28% rates.' },
  { slug: 'income-tax-calculator-india', name: 'Income Tax Calculator India', description: 'Calculate income tax under new and old regime for FY 2025-26.' },
  { slug: 'hra-calculator', name: 'HRA Calculator', description: 'Calculate maximum HRA exemption you can claim under section 10(13A).' },
  { slug: 'tds-calculator', name: 'TDS Calculator', description: 'Estimate the monthly TDS your employer deducts from your salary.' },
  { slug: 'in-hand-salary-calculator', name: 'In-Hand Salary Calculator', description: 'Convert your CTC to monthly take-home salary after PF, PT and tax.' },
  { slug: 'salary-hike-calculator', name: 'Salary Hike Calculator', description: 'Calculate your new salary after a hike percentage or back-calculate the percentage.' },
  { slug: 'pf-calculator', name: 'PF / EPF Calculator', description: 'Project your EPF retirement corpus at the current 8.25% interest rate.' },
  { slug: 'rent-vs-buy-calculator', name: 'Rent vs Buy Calculator', description: 'Compare the long-term cost of renting versus buying a home in India.' },
  { slug: 'stamp-duty-calculator', name: 'Stamp Duty Calculator', description: 'Calculate stamp duty and registration charges for any Indian state.' },
  { slug: 'roi-calculator', name: 'ROI Calculator', description: 'Calculate absolute and annualised return on investment.' },
];

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

// ─── Helper: inject page-specific meta into the template ────────────────────

function buildHtml(opts) {
  const { title, description, canonical, bodyContent = '' } = opts;
  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escHtml(title)}</title>`
  );

  // Inject meta description (add if not present, replace if present)
  const descTag = `<meta name="description" content="${escHtml(description)}" />`;
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/, descTag);
  } else {
    html = html.replace('</head>', `  ${descTag}\n  </head>`);
  }

  // Inject canonical
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/, canonicalTag);
  } else {
    html = html.replace('</head>', `  ${canonicalTag}\n  </head>`);
  }

  // Inject OG tags
  html = html.replace(/(<meta property="og:title"[^>]*>)/, `<meta property="og:title" content="${escHtml(title)}" />`);
  html = html.replace(/(<meta property="og:description"[^>]*>)/, `<meta property="og:description" content="${escHtml(description)}" />`);
  html = html.replace(/(<meta property="og:url"[^>]*>)/, `<meta property="og:url" content="${canonical}" />`);

  // Inject noscript / pre-render content inside #root for crawlers that don't run JS
  if (bodyContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><div style="font-family:sans-serif;max-width:860px;margin:auto;padding:24px">${bodyContent}</div></div>`
    );
  }

  return html;
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Render a small subset of inline markdown (bold + links) inside an already
// HTML-escaped string. Order matters: links first so the URL/label aren't
// affected by the bold pass.
function renderInline(escaped) {
  // [label](href) — both sides were HTML-escaped above, so brackets/parens
  // are still literal characters here.
  let out = escaped.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, href) => `<a href="${href}" style="color:#2563eb;text-decoration:underline">${label}</a>`,
  );
  // **bold**
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

function writeRoute(relPath, html) {
  const dir = path.join(distDir, relPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`  ✅  /${relPath}/index.html`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('\n🔧  IndianCalc SSG — generating static HTML pages...\n');

// 1. Blog posts — render the FULL article body into static HTML so crawlers
// (AdSense, Googlebot without JS, social-card scrapers) see real content.
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

// 2. Calculators
for (const calc of calculators) {
  const canonical = `https://indiancalc.com/${calc.slug}`;
  const bodyContent = `
    <nav style="font-size:0.8rem;color:#666;margin-bottom:1rem"><a href="/">Home</a> › ${escHtml(calc.name)}</nav>
    <h1 style="font-size:2rem;font-weight:800;margin:0.5rem 0 1rem">${escHtml(calc.name)}</h1>
    <p style="font-size:1.05rem;line-height:1.75">${escHtml(calc.description)}</p>
    <p style="color:#555;font-style:italic;margin-top:1rem">Interactive calculator loads below. JavaScript required.</p>
  `;
  const html = buildHtml({ title: `${calc.name} - IndianCalc.com`, description: calc.description, canonical, bodyContent });
  writeRoute(calc.slug, html);
}

// 3. Static pages
for (const page of staticPages) {
  const canonical = `https://indiancalc.com/${page.slug}`;
  const html = buildHtml({ title: page.title, description: page.description, canonical });
  writeRoute(page.slug, html);
}

console.log('\n✅  SSG complete — all routes now return HTTP 200 with real HTML.\n');
