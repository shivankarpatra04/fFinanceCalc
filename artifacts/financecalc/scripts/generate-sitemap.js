import fs from 'fs';
import path from 'path';

const SITE_URL = "https://www.indiancalc.com";

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
  { url: '/disclaimer', priority: '0.5', changefreq: 'yearly' },
  { url: '/emi-calculator', priority: '0.9', changefreq: 'monthly' },
  { url: '/home-loan-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/personal-loan-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/car-loan-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/loan-eligibility-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/sip-calculator', priority: '0.9', changefreq: 'monthly' },
  { url: '/fd-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/rd-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/cagr-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/mutual-fund-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/gst-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/income-tax-calculator-india', priority: '0.9', changefreq: 'monthly' },
  { url: '/hra-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/tds-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/in-hand-salary-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/salary-hike-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/pf-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/rent-vs-buy-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/stamp-duty-calculator', priority: '0.8', changefreq: 'monthly' },
  { url: '/roi-calculator', priority: '0.8', changefreq: 'monthly' },
];

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ url, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

const sitemap = generateSiteMap(pages);

// Ensure public directory exists
const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('sitemap.xml generated successfully!');
