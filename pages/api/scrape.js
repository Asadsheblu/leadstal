import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { url, maxPages = 5 } = req.body; // maxPages to limit number of pages to scrape

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log('Starting Puppeteer...');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    console.log(`Navigating to URL: ${url}`);
    
    let currentPage = 1;
    let allProducts = [];

    while (currentPage <= maxPages) {
      await page.goto(`${url}&page=${currentPage}`, { waitUntil: 'domcontentloaded' });

      const productInfo = await page.evaluate(() => {
        const currencySymbols = ['$', '€', '৳', '£', '¥', '₹'];

        // Find product title
        const productTitleElement = Array.from(document.querySelectorAll('*')).find(el => {
          const className = el.getAttribute('class')?.toLowerCase() || '';
          const idName = el.getAttribute('id')?.toLowerCase() || '';
          return className.includes('product') || idName.includes('product');
        });

        const title = productTitleElement ? productTitleElement.innerText.trim() : 'No title found';

        // Find product price
        const priceElement = Array.from(document.querySelectorAll('*')).find(el => {
          const text = el.innerText || '';
          return currencySymbols.some(symbol => text.includes(symbol));
        });

        const price = priceElement ? priceElement.innerText.match(/[\$€৳£¥₹]\s?\d+(,\d{3})*(\.\d{2})?/g)?.[0] || 'No price found' : 'No price found';

        // Find all image URLs
        const imageElements = Array.from(document.querySelectorAll('img'));
        const imageUrls = imageElements.map(img => img.src);

        return { title, price, imageUrls };
      });

      allProducts.push(productInfo);
      
      // Check if there's a next page link (example assumes the 'Next' button exists)
      const hasNextPage = await page.evaluate(() => {
        const nextButton = document.querySelector('a.next.ajax-page');
        return nextButton !== null;
      });

      if (!hasNextPage) {
        break; // No more pages, exit the loop
      }

      currentPage++;
    }

    await browser.close();
    console.log('Browser closed');

    res.status(200).json({ products: allProducts });

  } catch (error) {
    console.error('Error in web scraping:', error.message, error.stack);
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
}
