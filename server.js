
// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const Handlebars = require("handlebars");

const app = express();
const port = process.env.PORT || 3000;

const templateStyles = `
body {
  {{#if bg}}
  background-image: url({{bg}});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  {{else}}
  background: #004e92;
  background: linear-gradient(to right, #004e92, #000428);
  color: white;
  {{/if}}
  padding: 40px 30px;
  height: calc(100vh - 100px);
}

main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  width: 150px;
  height: 32px;
}

.title {
  font-size: {{fontSize}};
  text-transform: capitalize;
  margin: 4px 0;
}

ul {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  color: #fff700;
}

li {
  margin-right: 6px
}
`;

const templateHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>{{styles}}</style>
  </head>
  <body id="body">
    <main>
      <div class='logo'><img src="{{logo}}" /></div>
      <div class="title">{{title}}</div>
      {{#if tags}}
        <div>
          <ul>
          {{#each tags}}
            <li>{{this}}</li>
          {{/each}}
          </ul>
        </div>
      {{/if}}
    </main>
  </body>
</html>
`;

function getFontSize(title="") {
  if (!title || typeof title !== 'string') return "";

  if (title.length > 55) return "40px";
  if (title.length > 35) return "50px";
  if (title.length > 25) return "60px";

  return "70px";
}


app.get('/ogimage', async (req, res) => {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1200,
        height: 630,
      }
    });
    const page = await browser.newPage();

    const compiledStyles = Handlebars.compile(templateStyles)({
      bg: req.query.bgUrl,
      fontSize: getFontSize(req.query.title),
    });
    const compiledHtml = Handlebars.compile(templateHtml)({
      logo: req.query.logoUrl || `${__dirname}/static/logrocket-logo.svg`,
      title: req.query.title,
      tags: req.query.tags,
      path: req.query.path,
      styles: compiledStyles,
    });

    await page.setContent(compiledHtml, { waitUntil: 'networkidle0' });
    const element = await page.$('#body');  
    const image = await element.screenshot({ omitBackground: true });  
    await browser.close();

    res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': `public, immutable, no-transform, s-max-age=2592000, max-age=2592000` });
    res.end(image);
})


app.listen(port, () => {
  console.log(`app listening at ${port}`)
});