import fs from 'fs';
import path from 'path';

const SITE_URL = "https://indiancalc.com";

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/privacy-policy', priority: '0.5', changefreq: 'monthly' },
  { url: '/terms-of-service', priority: '0.5', changefreq: 'monthly' },
  { url: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
  { url: '/emi-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/home-loan-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/personal-loan-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/car-loan-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/loan-eligibility-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/sip-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/fd-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/rd-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/cagr-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/mutual-fund-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/gst-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/income-tax-calculator-india', priority: '0.9', changefreq: 'weekly' },
  { url: '/hra-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/tds-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/in-hand-salary-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/salary-hike-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/pf-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/rent-vs-buy-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/stamp-duty-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/roi-calculator', priority: '0.9', changefreq: 'weekly' },
  { url: '/loan-calculators', priority: '0.9', changefreq: 'weekly' },
  { url: '/investment-calculators', priority: '0.9', changefreq: 'weekly' },
  { url: '/tax-calculators', priority: '0.9', changefreq: 'weekly' },
  { url: '/salary-calculators', priority: '0.9', changefreq: 'weekly' },
  { url: '/property-calculators', priority: '0.9', changefreq: 'weekly' },
  // BLOG POSTS
  { url: '/blog/how-emi-is-calculated', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/sip-vs-fd-india', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/best-tax-saving-options-india', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/how-to-improve-credit-score', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/home-loan-tips-india', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/gst-explained-simply', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/personal-loan-guide', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/best-sip-for-beginners', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/how-to-save-salary-monthly', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/rent-vs-buy-in-india', priority: '0.8', changefreq: 'monthly' },
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
