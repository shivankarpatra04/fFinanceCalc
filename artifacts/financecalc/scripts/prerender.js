import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import express from 'express';
import { fileURLToPath } from 'url';

import chromium from '@sparticuz/chromium';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.resolve(projectRoot, 'dist');

// Extract URLs from sitemap script
import { readFileSync } from 'fs';
const sitemapScriptContent = readFileSync(path.join(__dirname, 'generate-sitemap.js'), 'utf-8');

// Match all occurrences of { url: '/something', ... }
const urlRegex = /url:\s*'([^']+)'/g;
let match;
const urlsToPrerender = [];

while ((match = urlRegex.exec(sitemapScriptContent)) !== null) {
  urlsToPrerender.push(match[1]);
}

async function prerender() {
  console.log('Starting prerendering process...');
  
  // Start express server
  const app = express();
  
  // Serve static files but fallback to index.html for SPA routing
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  
  const server = app.listen(3001, () => {
    console.log('Local server started on port 3001');
  });

  try {
    const isVercel = process.env.VERCEL === '1';
    let browser;
    
    if (isVercel) {
      console.log('Running on Vercel: using @sparticuz/chromium');
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      console.log('Running locally: using default puppeteer');
      browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    
    for (const url of urlsToPrerender) {
      console.log(`Prerendering ${url}...`);
      const page = await browser.newPage();
      
      // Navigate to the page
      await page.goto(`http://localhost:3001${url}`, {
        waitUntil: 'networkidle0', // Wait until no network requests for 500ms
        timeout: 30000
      });
      
      // Wait for React to render (check for main content)
      await page.waitForSelector('#root > div', { timeout: 10000 }).catch(() => {});
      
      // Get the fully rendered HTML
      const html = await page.content();
      
      if (url !== '/') {
        const dirPath = path.join(distPath, url);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        // Save to index.html inside the route directory
        fs.writeFileSync(path.join(dirPath, 'index.html'), html);
      } else {
        // Overwrite root index.html
        fs.writeFileSync(path.join(distPath, 'index.html'), html);
      }
      
      await page.close();
    }
    
    await browser.close();
    console.log('Prerendering completed successfully!');
    server.close();
  } catch (error) {
    console.error('Error during prerendering:', error);
    server.close();
    process.exit(1); // Explicitly fail the build
  }
}

prerender();
