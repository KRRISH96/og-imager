const puppeteer = require("puppeteer");

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

async function generateImage({ width, height, content }) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    }
  });
  const page = await browser.newPage();

  if (width || height) {
    await page.setViewport({ width: width || DEFAULT_WIDTH, height: height || DEFAULT_HEIGHT});
  }

  await page.setContent(content, { waitUntil: 'networkidle0' });
  const element = await page.$('#body');  
  const image = await element.screenshot({ omitBackground: true });  

  await browser.close();

  return image;
};

module.exports = generateImage;