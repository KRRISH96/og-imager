const puppeteer = require("puppeteer");

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

async function generateImage({ width, height, content }) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
      defaultViewport: {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      }
    });
    const page = await browser.newPage();

    if (width || height) {
      await page.setViewport({
        width: width ? Number(width) : DEFAULT_WIDTH,
        height: height ? Number(height) : DEFAULT_HEIGHT
      });
    }

    await page.setContent(content, { waitUntil: 'networkidle0' });
    const element = await page.$('#body');
    const image = await element.screenshot({ omitBackground: true });

    await browser.close();

    return image;
  } catch(e) {
    console.log(e);
    return null;
  }
};

module.exports = generateImage;