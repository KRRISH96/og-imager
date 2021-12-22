
// server.js
const express = require("express");
const generateImage = require("./utils/generateImage");
const { getCompiledHTML } = require("./utils/compileTemplate");

const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  const compiledHTML = getCompiledHTML(req.query);

  res.status(200).send(compiledHTML);
})


app.get('/ogimage', async (req, res) => {
  try {
    const compiledHTML = getCompiledHTML(req.query);
  
    const image = await generateImage({
      width: req.query.width,
      height: req.query.height,
      content: compiledHTML
    });
      
    res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': `public, immutable, no-transform, s-max-age=2592000, max-age=2592000` });
    res.end(image);
  } catch(e) {
    console.log(e);
    res.status(500).send('Internal Server Error!')
  }
});


app.listen(port, () => {
  console.log(`app listening at ${port}`)
});