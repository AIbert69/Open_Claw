const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });

  // Wait for hero animations to finish
  await new Promise(r => setTimeout(r, 1500));

  // Trigger all scroll reveals by scrolling to bottom slowly
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < totalHeight; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 150));
  }
  // Scroll back to top and wait for all transitions
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));

  // Full page screenshot
  await page.screenshot({ path: '/home/user/Open_Claw/screenshot-full.png', fullPage: true });
  console.log('Full page screenshot saved');

  // Hero section only
  await page.screenshot({ path: '/home/user/Open_Claw/screenshot-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Hero screenshot saved');

  await browser.close();
})();
