const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://documentation.digio.in/digistudio/integration/create_request_api/', { waitUntil: 'networkidle' });
  const blocks = await page.$$eval('pre', els => els.map(e => e.textContent));
  const codeBlocks = await page.$$eval('code', els => els.map(e => e.textContent));
  const urls = await page.$$eval('.api-endpoint, [class*="endpoint"], h2, h3, h4', els => els.map(e => e.textContent));
  
  console.log(JSON.stringify({ blocks, urls, codeBlocks }, null, 2));
  await browser.close();
})();
