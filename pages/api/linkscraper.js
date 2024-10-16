import puppeteer from 'puppeteer';
import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  try {
    const { searchQuery } = req.body; // LinkedIn search query

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to LinkedIn login page
    await page.goto('https://www.linkedin.com/login');

    // Log into LinkedIn (you need to handle the login mechanism properly)
    await page.type('#username', 'YOUR_EMAIL'); // Add your email
    await page.type('#password', 'YOUR_PASSWORD'); // Add your password
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Perform search query on LinkedIn
    await page.goto(`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(searchQuery)}`);

    // Scrape profile links
    const profileLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href*="/in/"]'))
        .map((profile) => profile.href)
        .filter((link, index, self) => self.indexOf(link) === index); // Remove duplicates
    });

    let contactInfo = [];

    // Loop through profile links and scrape data
    for (let link of profileLinks) {
      try {
        await page.goto(link);
        await page.waitForTimeout(2000); // Wait to avoid being flagged as a bot

        const userData = await page.evaluate(() => {
          const email = document.querySelector('a[href^="mailto:"]')?.innerText || 'N/A';
          const contact = document.querySelector('section.contact-info')?.innerText || 'N/A';
          const name = document.querySelector('.pv-top-card--list li')?.innerText || 'N/A';

          return { name, email, contact };
        });

        contactInfo.push({ profileLink: link, ...userData });
      } catch (error) {
        console.error(`Failed to scrape profile: ${link}`, error);
        continue; // Skip failed profile
      }
    }

    await browser.close();

    // Convert scraped data to Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(contactInfo);
    XLSX.utils.book_append_sheet(wb, ws, 'Contact Info');
    const filePath = `/tmp/contact-info-${Date.now()}.xlsx`;
    XLSX.writeFile(wb, filePath);

    res.status(200).json({ message: 'Scraping Complete', filePath });

  } catch (error) {
    console.error('Error during LinkedIn scraping:', error);
    res.status(500).json({ error: 'Failed to scrape LinkedIn profiles. Please try again.' });
  }
}
