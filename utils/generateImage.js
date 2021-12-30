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

    // if (width || height) {
    //   await page.setViewport({
    //     width: width ? Number(width) : DEFAULT_WIDTH,
    //     height: height ? Number(height) : DEFAULT_HEIGHT
    //   });
    // }

    // Ref: https://github.blog/2021-06-22-framework-building-open-graph-images/#some-performance-gotchas
    // Set the content to our rendered HTML
    await page.setContent(content, { waitUntil: "domcontentloaded" });
    // Wait until all images and fonts have loaded
    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll("img"));
      await Promise.all([
        document.fonts.ready,
      ...selectors.map((img) => {
          // Image has already finished loading, let’s see if it worked
          if (img.complete) {
            // Image loaded and has presence
            if (img.naturalHeight !== 0) return;
            // Image failed, so it has no height
            throw new Error("Image failed to load");
          }
          // Image hasn’t loaded yet, added an event listener to know when it does
          return new Promise((resolve, reject) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", reject);
          });
        }),
      ]);
    });

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
