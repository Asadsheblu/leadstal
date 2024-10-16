import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { urls } = req.body;

  let results = [];

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      const socialLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links
          .map(link => ({
            platform: getSocialPlatform(link.href),
            profile: link.href
          }))
          .filter(link => link.platform); // Filter out non-social links

        function getSocialPlatform(url) {
          if (url.includes('facebook.com')) return 'Facebook';
          if (url.includes('twitter.com')) return 'Twitter';
          if (url.includes('linkedin.com')) return 'LinkedIn';
          if (url.includes('instagram.com')) return 'Instagram';
          if (url.includes('youtube.com')) return 'YouTube';
          if (url.includes('pinterest.com')) return 'Pinterest';
          return null;
        }
      });

      results = results.concat(socialLinks.map(link => ({ url, ...link })));
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  await browser.close();

  res.status(200).json({ results });
}
