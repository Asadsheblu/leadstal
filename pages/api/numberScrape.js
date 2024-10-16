import puppeteer from 'puppeteer';

const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;

const scrapePhoneNumbers = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    const bodyText = await page.evaluate(() => document.body.innerText);
    const phoneNumbers = bodyText.match(phoneRegex);

    await browser.close();

    return phoneNumbers ? [...new Set(phoneNumbers)] : [];
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    await browser.close();
    return [];
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { urls } = req.body;
    const results = [];

    for (const url of urls) {
      const phoneNumbers = await scrapePhoneNumbers(url);
      console.log(phoneNumbers);
      
      results.push({ url, phoneNumbers });
    }

    res.status(200).json({ results });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
