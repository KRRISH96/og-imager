// server.js
require("dotenv").config();
const express = require("express");
const generateImage = require("./utils/generateImage");
const { getCompiledHTML } = require("./utils/compileTemplate");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { symplaApi } = require("./services/sympla-api");

app.use(cors({ credentials: true, origin: true }));

app.get("/imgs/:id/ticket.png", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data: { data },
    } = await symplaApi.get(`/events/1606667/participants/ticketNumber/${id}`);
    const numberId = data.id - 118790000;
    console.log(numberId);
    const zeroString = [...Array(9 - numberId.toString().length).keys()].reduce(
      (n, c) => n + "0",
      [""]
    );
    console.log(zeroString);
    const compiledHTML = getCompiledHTML({
      title: `${data.first_name} ${data.last_name}`,
      ticketNumber: `#${zeroString}${numberId}`,
    });

    const image = await generateImage({
      width: req.query.width,
      height: req.query.height,
      content: compiledHTML,
    });
    fs.writeFileSync(`./tmp/${id}.png`, image);

    res.statusCode = 200;

    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );
    res.end(image);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error!");
  }
});

app.listen(port, () => {
  console.log(`app listening at ${port}`);
});
