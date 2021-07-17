require("dotenv").config();

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    API_MEDIA_URL: process.env.API_MEDIA_URL,
  },
  images: {
    domains: [process.env.API_MEDIA_URL],
  },
};
