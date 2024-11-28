import puppeteer from 'puppeteer';
import { writeFile } from 'fs';
import { join } from 'path';

// Helper function to extract metadata from each page
async function scrapePageData(page, url) {
  const title = await page.title(); // Page title

  // Trying to scrape description; if not found, fallback to 'No description available'
  let description = 'No description available';
  try {
    description = await page.$eval('meta[name="description"]', (meta) => meta.content || 'No description available');
  } catch (e) {
    // Handle case where meta[name="description"] is not found
    console.log(`No description found for ${url}`);
  }

  
  return {
    url,
    title,
    description,
    
  };
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      // Wait for links to load
      await page.waitForSelector('a'); // Wait for <a> tags to load

      // Scrape all the links on the page
      const links = await page.$$eval('a', (anchors) =>
        anchors.map((anchor) => anchor.href).filter((href) => href && href.startsWith('http'))
      );

      // Array to store all scraped data
      let allData = [];

      // Loop through each link and scrape metadata from each page
      for (let link of links) {
        const newPage = await browser.newPage();
        await newPage.goto(link, { waitUntil: 'domcontentloaded' });
        const pageData = await scrapePageData(newPage, link);
        allData.push(pageData);
        await newPage.close(); // Close the page after scraping
      }

      await browser.close(); // Close the browser when done

      // Prepare content for the llms.txt file
      const llmsContent = allData.map((data) => {
        return `
        URL: ${data.url}
        Title: ${data.title}
        Description: ${data.description}
       
        `;
      }).join('\n');

      // Write the content to a file
      const filePath = join(process.cwd(), 'public', 'llms.txt');
      writeFile(filePath, llmsContent, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error saving file' });
        }
        res.status(200).json({ success: true, message: 'File generated successfully. You can download it now.' });
      });

    } catch (error) {
      console.error('Error scraping URL:', error);
      res.status(500).json({ success: false, message: 'Error fetching or processing URL' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
