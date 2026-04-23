import fs from 'fs';
import path from 'path';

const SITE_URL = "https://financecalc.in";

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
  { url: '/disclaimer', priority: '0.5', changefreq: 'yearly' },
  { url: '/emi', priority: '0.9', changefreq: 'monthly' },
  { url: '/sip', priority: '0.9', changefreq: 'monthly' },
  { url: '/income-tax', priority: '0.9', changefreq: 'monthly' },
  { url: '/home-loan', priority: '0.8', changefreq: 'monthly' },
  { url: '/personal-loan', priority: '0.8', changefreq: 'monthly' },
  { url: '/car-loan', priority: '0.8', changefreq: 'monthly' },
  { url: '/fd', priority: '0.8', changefreq: 'monthly' },
  { url: '/rd', priority: '0.8', changefreq: 'monthly' },
  { url: '/cagr', priority: '0.8', changefreq: 'monthly' },
  { url: '/mutual-fund', priority: '0.8', changefreq: 'monthly' },
  { url: '/gst', priority: '0.8', changefreq: 'monthly' },
  { url: '/hra', priority: '0.8', changefreq: 'monthly' },
  { url: '/tds', priority: '0.8', changefreq: 'monthly' },
  { url: '/salary', priority: '0.8', changefreq: 'monthly' },
  { url: '/epf', priority: '0.8', changefreq: 'monthly' },
  { url: '/rent-vs-buy', priority: '0.8', changefreq: 'monthly' },
  { url: '/stamp-duty', priority: '0.8', changefreq: 'monthly' },
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
