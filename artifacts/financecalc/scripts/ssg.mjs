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
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

// Read dist/index.html (the Vite-built SPA shell)
if (!fs.existsSync(templatePath)) {
  console.error('❌  dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// ─── Inline blog data (mirrors src/data/blog.ts) ────────────────────────────
// We duplicate the slug/title/description/category/date here so we have no
// TypeScript dependency at SSG time. Content is rendered by React client-side
// after hydration; the meta tags and the visible text snippet below give
// crawlers enough real content to confirm the page is not empty.

const blogPosts = [
  {
    slug: 'how-emi-is-calculated',
    title: 'How EMI is Calculated: Formula, Reducing Balance vs Flat Rate & Examples',
    description: 'Understand the EMI formula used by Indian banks, the difference between reducing and flat rates, and pro-tips to save on interest.',
    category: 'Loans',
    date: '2025-05-10',
    readTime: '12 min',
    intro: 'Equated Monthly Instalment (EMI) is the fixed amount you pay every month towards a loan. Understanding how this number is calculated puts you in control of your loan. Every regulated lender in India uses the reducing-balance EMI formula: EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]. This guide explains each part of the formula with real examples from Indian banks.',
  },
  {
    slug: 'sip-vs-fd-india',
    title: 'SIP vs FD in India: A Comprehensive Comparison for 2025',
    description: 'Which is better for you? We compare Systematic Investment Plans (SIP) and Fixed Deposits (FD) on returns, risk, and taxation in the Indian context.',
    category: 'Investing',
    date: '2025-05-12',
    readTime: '10 min',
    intro: 'Should you invest in a Systematic Investment Plan (SIP) in mutual funds or a Fixed Deposit (FD) at a bank? This is one of the most common financial dilemmas for Indian middle-class families. FDs offer safety and predictability; SIPs offer higher long-term returns with market risk. The right answer depends on your time horizon, tax bracket, and risk tolerance.',
  },
  {
    slug: 'best-tax-saving-options-india',
    title: 'Best Tax Saving Options in India 2025: Old vs New Regime',
    description: 'Navigate Section 80C, 80D, NPS, and Home Loan benefits. A complete guide for Indian salaried employees to save tax legally.',
    category: 'Tax',
    date: '2025-05-14',
    readTime: '11 min',
    intro: 'With the New Tax Regime becoming the default for FY 2025-26, many salaried Indians are confused about which regime to choose and which deductions they can still claim. Section 80C (up to ₹1.5 Lakh), 80D (health insurance), NPS (80CCD), and Home Loan interest (Section 24b) remain powerful tools under the Old Regime. This guide breaks down every option.',
  },
  {
    slug: 'how-to-improve-credit-score',
    title: 'How to Improve Your Credit Score in India: A Step-by-Step Guide',
    description: 'Unlock better loan rates and credit card offers. Learn 7 proven ways to raise your CIBIL score from 600 to 750+.',
    category: 'Credit',
    date: '2025-05-15',
    readTime: '9 min',
    intro: 'Your CIBIL score is a 3-digit number between 300 and 900 that determines whether you get a loan, at what interest rate, and with what credit limit. A score above 750 is considered excellent by most Indian banks. Here are the seven most effective strategies to improve your credit score in India.',
  },
  {
    slug: 'home-loan-tips-india',
    title: 'Home Loan Tips for First-Time Buyers in India (2025)',
    description: "Don't just sign the sanction letter. Learn about RLLR, hidden charges, PMAY, and how to negotiate the best home loan deal.",
    category: 'Loans',
    date: '2025-05-18',
    readTime: '11 min',
    intro: 'Buying a home is often the most significant financial decision for an Indian family. A 0.5% difference in interest rate on an ₹80 Lakh loan can save you ₹12 Lakh over 20 years. Since 2019, most bank home loans are linked to the RBI\'s Repo Rate (RLLR). Here are 9 essential tips for first-time home buyers in India.',
  },
  {
    slug: 'gst-explained-simply',
    title: 'GST Explained Simply for Indian Consumers (2025)',
    description: 'What GST really is, how the four rates work, and how to read a GST invoice without confusion. A guide for every Indian shopper.',
    category: 'Tax',
    date: '2025-05-20',
    readTime: '9 min',
    intro: 'Goods and Services Tax (GST) replaced a tangle of central excise, service tax, VAT, octroi, and entry taxes in July 2017. India has a four-tier GST structure: 5% for essentials, 12% for processed food, 18% for most services and goods, and 28% for luxury and sin goods. This guide explains everything a consumer needs to know about GST in plain English.',
  },
  {
    slug: 'personal-loan-guide',
    title: 'Complete Personal Loan Guide for India (2025)',
    description: 'When to take a personal loan, how to compare lenders, and the traps to avoid. A guide to smart borrowing in India.',
    category: 'Loans',
    date: '2025-05-22',
    readTime: '10 min',
    intro: 'A personal loan is an unsecured, paperwork-light form of credit. Rates in India typically range from 10.5% to 24% per year. This guide covers when to take a personal loan, how to compare offers from banks and NBFCs, how to avoid common traps like processing fees and insurance bundling, and how to use our EMI calculator to plan your repayment.',
  },
  {
    slug: 'best-sip-for-beginners',
    title: 'Best SIP Plans for Beginners in India: A 2025 Starter Guide',
    description: 'How to start your first Mutual Fund SIP. Learn about Index funds, Flexi-caps, and how to build a portfolio for long-term wealth.',
    category: 'Investing',
    date: '2025-05-24',
    readTime: '11 min',
    intro: 'Starting your first SIP (Systematic Investment Plan) is perhaps the most important financial milestone for a young professional in India. With over 2,500 mutual fund schemes available, the choice can be overwhelming. A great starter portfolio for 2025 has just 2-3 funds: a Nifty 50 Index fund, a Flexi-Cap fund, and an ELSS tax-saver. Always choose Direct Plans to avoid paying 1% annual commission.',
  },
  {
    slug: 'how-to-save-salary-monthly',
    title: 'How to Save Money from Your Monthly Salary: An Indian Guide',
    description: 'Tired of having zero balance at month-end? Learn the 50-30-20 rule and practical ways to save 20% of your salary in Indian cities.',
    category: 'Salary',
    date: '2025-05-26',
    readTime: '10 min',
    intro: 'Many young Indians earning ₹50,000 to ₹1,00,000 find themselves waiting for the next salary with just a few hundred rupees left. The 50-30-20 rule is a simple framework: 50% for Needs (rent, groceries), 30% for Wants (dining out, OTT), 20% for Savings (SIPs, emergency fund). The key is to pay yourself first — transfer 20% to savings the moment your salary arrives.',
  },
  {
    slug: 'rent-vs-buy-in-india',
    title: 'Rent vs Buy a House in India: The Definitive Guide (2025)',
    description: 'A clear framework, with real numbers, for deciding whether to keep renting or buy your home in Indian cities like Bengaluru, Mumbai and NCR.',
    category: 'Property',
    date: '2025-05-28',
    readTime: '12 min',
    intro: 'In major Indian cities like Mumbai, Bengaluru, or Delhi, rental yields are notoriously low — typically 2% to 3.5%. A flat worth ₹1.5 Crore might rent for ₹40,000 but have an EMI of ₹1.08 Lakh — a gap of ₹68,000 per month. Renting and investing the difference in an equity SIP often produces a higher net worth over 15 years than buying. This guide gives you the framework and real numbers to decide.',
  },
];

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

function mdToHtml(md) {
  if (!md) return '';
  const blocks = md.split('\n\n');
  return blocks.map(b => {
    if (b.startsWith('## ')) return `<h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.5rem">${escHtml(b.slice(3))}</h2>`;
    if (b.startsWith('### ')) return `<h3 style="font-size:1.2rem;font-weight:600;margin:1.5rem 0 0.5rem">${escHtml(b.slice(4))}</h3>`;
    if (b.startsWith('- ')) {
      const items = b.split('\n').filter(l => l.startsWith('- ')).map(l => `<li>${escHtml(l.slice(2))}</li>`);
      return `<ul style="margin:0.5rem 0 0.5rem 1.5rem">${items.join('')}</ul>`;
    }
    return `<p style="line-height:1.7;margin:0.75rem 0">${escHtml(b)}</p>`;
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

// 1. Blog posts
for (const post of blogPosts) {
  const canonical = `https://indiancalc.com/blog/${post.slug}`;
  const bodyContent = `
    <nav style="font-size:0.8rem;color:#666;margin-bottom:1rem">
      <a href="/">Home</a> › <a href="/blog">Blog</a> › ${escHtml(post.title)}
    </nav>
    <div style="font-size:0.75rem;color:#2563eb;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">${escHtml(post.category)}</div>
    <h1 style="font-size:2rem;font-weight:800;line-height:1.25;margin:0.5rem 0 1rem">${escHtml(post.title)}</h1>
    <p style="color:#555;margin-bottom:1.5rem">Published ${escHtml(post.date)} · ${escHtml(post.readTime)} read</p>
    <p style="font-size:1.05rem;line-height:1.75;margin-bottom:1rem">${escHtml(post.intro)}</p>
    <p style="color:#555;font-style:italic">Full article loads below. JavaScript required for complete interactive content.</p>
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
