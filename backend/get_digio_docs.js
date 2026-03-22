const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://documentation.digio.in/digistudio/integration/create_request_api/', { waitUntil: 'networkidle' });
  
  // Extract all request payloads and paths
  const blocks = await page.$$eval('pre', elements => elements.map(el => el.textContent));
  const codeBlocks = await page.$$eval('code', elements => elements.map(el => el.textContent));
  const divs = await page.$$eval('div', els => els.map(el => el.textContent).filter(text => text.includes('v3/client/kyc/requests') || text.includes('POST') || text.includes('v2/client/document/uploadv2')));
  
  console.log("=============== PRE ===============\n", blocks.join("\n\n"));
  console.log("=============== CODE ===============\n", [...new Set(codeBlocks)].join("\n"));
  console.log("=============== DIVS ===============\n", [...new Set(divs)].slice(0, 5).join("\n"));  
  
  await browser.close();
})();
