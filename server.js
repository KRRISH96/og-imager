
// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const Handlebars = require("handlebars");
const renderSocialImage = require("puppeteer-social-image");
const app = express();
const port = process.env.PORT || 7777;

app.get('/', async (req, res) => {
  res.send("Ok, This is deployed!");
})


app.get('/ogimage', async (req, res) => {
  const ogimage = await renderSocialImage.default({
    templateBody: '<div class="Main">Hello, {{name}}!</div>',
    templateStyles: ".Main { height: 100%; color: blue; background: pink; }",
    templateParams: {
      name: "asdasdasd"
    },
    output: "image.png",
    size: "1200x630"
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.send(ogimage, 'binary');
  // res.send(ogimage);
})

const templateStyles = `
body {
  background-image: url({{bg}});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
img {
  width: 120px; 
  height: 63px;
}
.Main {
  height: 100%;
  color: green;
}
`;

const templateHtml = `
<div class="Main">
  Hello, {{title}}!
  <img src="{{{logo}}}" alt="og image with puppy" />
  <p>{{tags}}</p>
  <p>{{path}}</p>
  <style>{{styles}}</style>
</div>
`;


app.get('/puppy', async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    const compiledStyles = Handlebars.compile(templateStyles)({ bg: req.query.bgUrl });
    const compiledHtml = Handlebars.compile(templateHtml)({
      logo: req.query.logoUrl,
      title: req.query.title,
      tags: req.query.tags,
      path: req.query.path,
      styles: compiledStyles,
    });

    await page.setContent(compiledHtml, { waitUntil: 'networkidle0' });
    const image = await page.screenshot({
      omitBackground: true
    });  
    await browser.close();

    res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': `public, immutable, no-transform, s-max-age=2592000, max-age=2592000` });
    res.send(image, 'binary');
})


app.listen(port, () => {
  console.log(`app listening at ${port}`)
})