import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    // Launch Puppeteer with increased timeout and error handling for headless mode
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set navigation timeout to 60 seconds
    await page.setDefaultNavigationTimeout(60000);

    // Catch potential errors during navigation
    try {
      // Go to the provided URL, with a fallback for slower websites
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    } catch (navigationError) {
      console.error('Navigation Timeout or Error:', navigationError);
      await browser.close();
      return res.status(500).json({ message: 'Error navigating to the URL.' });
    }

    // Get the HTML content of the page
    const htmlContent = await page.content();

    // Log HTML content for debugging (optional)
    console.log('HTML Content:', htmlContent);

    // Get the response headers from the last request
    const response = await page.goto(url);
    const headers = response.headers();

    // Log headers for debugging (optional)
    console.log('Response Headers:', headers);

    // Close Puppeteer browser instance
    await browser.close();

    // Variables to store detected information
    let cms = '';
    let theme = '';
    let plugins = [];
    let programmingLanguage = '';

    // Detect CMS using meta tags or content paths
    if (htmlContent.includes('wp-content')) {
      cms = 'WordPress';
    } else if (htmlContent.includes('Joomla')) {
      cms = 'Joomla';
    } else if (htmlContent.includes('Drupal')) {
      cms = 'Drupal';
    } else if (htmlContent.includes('Magento')) {
      cms = 'Magento';
    } else if (htmlContent.includes('cdn.shopify.com')) {
      cms = 'Shopify';
    } else if (htmlContent.includes('Weebly')) {
      cms = 'Weebly';
    } else if (htmlContent.includes('Wix')) {
      cms = 'Wix';
    } else if (htmlContent.includes('Ghost')) {
      cms = 'Ghost';
    } else if (htmlContent.includes('PrestaShop')) {
      cms = 'PrestaShop';
    } else {
      cms = 'Not Detected';
    }

    // Detect Programming Language via headers
    if (headers['x-powered-by']) {
      const poweredBy = headers['x-powered-by'];
      if (poweredBy.includes('PHP')) {
        programmingLanguage = 'PHP';
      } else if (poweredBy.includes('ASP.NET')) {
        programmingLanguage = 'ASP.NET';
      } else if (poweredBy.includes('Node.js')) {
        programmingLanguage = 'Node.js';
      } else if (poweredBy.includes('Express')) {
        programmingLanguage = 'Node.js (Express)';
      }
    } else if (headers['server']) {
      const server = headers['server'].toLowerCase();
      if (server.includes('nginx')) {
        programmingLanguage = 'Possibly PHP, Node.js, or Python (Nginx)';
      } else if (server.includes('apache')) {
        programmingLanguage = 'Possibly PHP (Apache)';
      } else if (server.includes('iis')) {
        programmingLanguage = 'ASP.NET (IIS)';
      } else {
        programmingLanguage = 'Server not recognized';
      }
    } else {
      programmingLanguage = 'Not Detected';
    }

    // Detect Plugins for WordPress
    if (cms === 'WordPress') {
      const pluginRegex = /wp-content\/plugins\/([^\/]+)/g;
      let match;
      while ((match = pluginRegex.exec(htmlContent)) !== null) {
        plugins.push(match[1]);
      }
    }

    // Detect Theme for WordPress
    if (cms === 'WordPress') {
      const themeRegex = /wp-content\/themes\/([^\/]+)/g;
      const match = themeRegex.exec(htmlContent);
      if (match) {
        theme = match[1];
      } else {
        theme = 'Not Detected';
      }
    } else {
      theme = 'Not Detected';
    }

    // Return the detected data
    res.json({ cms, theme, plugins, programmingLanguage });

  } catch (error) {
    console.error('Error fetching website details:', error);
    res.status(500).json({ message: 'Error fetching website data' });
  }
}
