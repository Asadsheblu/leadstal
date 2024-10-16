// import puppeteer from 'puppeteer';

// const scrapeEmails = async (url) => {
//   try {
//     const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     const page = await browser.newPage();

//     // Set a user-agent to avoid bot detection
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

//     // Go to the page and wait for it to fully load
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // Optional: Simulate interactions if needed (e.g., clicking a button)
//     // await page.click('#loadMoreButton'); // Example: Click a button to load more content
//     // await page.waitForTimeout(3000); // Wait for content to load

//     // Get the page content
//     const htmlContent = await page.content();

//     // Find email addresses using regex
//     const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
//     const foundEmails = htmlContent.match(emailRegex);

//     await browser.close();

//     // Return unique emails found
//     return foundEmails ? [...new Set(foundEmails)] : [];
//   } catch (error) {
//     console.error(`Error scraping ${url}:`, error.message);
//     return [];
//   }
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { urls } = req.body;

//     if (!urls || !Array.isArray(urls)) {
//       return res.status(400).json({ error: 'Invalid input. Please provide an array of URLs.' });
//     }

//     const allEmails = [];
//     for (let url of urls) {
//       const emails = await scrapeEmails(url);
//       allEmails.push(...emails.map(email => ({ url, email })));
//     }

//     res.status(200).json({ emails: allEmails });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
import puppeteer from 'puppeteer';

const scrapeEmails = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set a user-agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    );

    // Go to the page and wait for it to fully load
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Get the page content
    const htmlContent = await page.content();

    // Find email addresses using regex
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = htmlContent.match(emailRegex);

    await browser.close();

    // Return unique emails found
    return foundEmails ? [...new Set(foundEmails)] : [];
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return [];
  }
};

const scrapeAllEmails = async (urls) => {
  const allEmails = [];
  
  for (const url of urls) {
    let emails = [];
    let retries = 3; // Set number of retries

    while (retries > 0) {
      emails = await scrapeEmails(url);
      if (emails.length > 0) break; // Exit loop if emails are found
      retries--;
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
    }

    if (emails.length > 0) {
      allEmails.push(...emails.map(email => ({ url, email })));
    } else {
      console.error(`Failed to scrape emails from ${url} after multiple attempts.`);
    }
  }

  return allEmails;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of URLs.' });
    }

    const allEmails = await scrapeAllEmails(urls);

    res.status(200).json({ emails: allEmails });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
