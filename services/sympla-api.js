const axios = require("axios").default;

const symplaApi = axios.create({
  baseURL: "https://api.sympla.com.br:443/public/v3",
  headers: {
    s_token: `${process.env.SYMPLA_SECRET}`,
  },
});

module.exports = { symplaApi };
